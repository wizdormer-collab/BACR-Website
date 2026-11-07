#!/usr/bin/env python3
"""
trace-mark.py — fit the BACR petal mark's geometry and emit it as vector curves.

The repo only ever contained raster PNGs of the logo (the client's original
source was a bitmap; tools/mklogo.ps1 only recoloured it). The first version
of this tool traced the alpha contour and simplified it with Douglas-Peucker.
A simplified polygon keeps a visible stair-step, and at hero size the mark
read as "pixelated".

This version fits the mark's actual construction instead, measured from the
raster rather than assumed:

    * four equal square petals on a grid with an even gap
    * indigo petals: squares with one rounded outer corner
    * green petals: leaves with two opposite corners rounded
    * each colour's corner curve is one cubic (edge tangents + handle),
      least-squares fitted to every rounded corner's contour — the curves
      are measurably fuller than circular arcs (a circle is 3-6px off)

so the emitted path is straight edges + cubic curves: smooth at any size.
The fitted geometry is rasterised back and compared to the source mask
(IoU), and the same flattened polygons drive the favicon.

Run:  python3 tools/trace-mark.py
Out:  src/assets/bacr-mark.svg  and  public/favicon.png
"""
import math
import os
import sys

from PIL import Image

SRC = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'bacr-mark.png')
DST = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'bacr-mark.svg')

ALPHA_T = 128          # opaque threshold
MIN_AREA = 200         # ignore specks
ROUND_T = 8            # diagonal probe (px): a corner this far in is rounded;
                       # sharp corners measure 1px (pure antialias)
CORNER_SPAN = 110      # px of each petal edge to sample when fitting a corner
CURVE_STEPS = 20       # flatten each cubic to this many segments for IoU/favicon

# 8-neighbourhood, clockwise from east
NB = [(1, 0), (1, 1), (0, 1), (-1, 1), (-1, 0), (-1, -1), (0, -1), (1, -1)]


def load_masks(path):
    """Return (indigo_mask, green_mask, colour_table, size)."""
    from collections import Counter

    im = Image.open(path).convert('RGBA')
    w, h = im.size
    px = im.load()
    indigo, green = set(), set()
    cores = {'indigo': Counter(), 'green': Counter()}
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < ALPHA_T:
                continue
            key = 'green' if (g > r + 60 and g > b + 60) else 'indigo'
            (green if key == 'green' else indigo).add((x, y))
            # modal colour over solid pixels: averaging drags the brand fills
            # off-value (#554ce5 -> #544de8) by mixing in antialiased edges
            if a >= 250:
                cores[key][(r, g, b)] += 1
    table = {}
    for k, c in cores.items():
        if c:
            (r, g, b), n = c.most_common(1)[0]
            table[k] = '#%02x%02x%02x' % (r, g, b)
    return indigo, green, table, (w, h)


def components(mask):
    """Split a pixel set into 8-connected blobs, largest first."""
    seen, out = set(), []
    for start in mask:
        if start in seen:
            continue
        stack, blob = [start], []
        seen.add(start)
        while stack:
            p = stack.pop()
            blob.append(p)
            x, y = p
            for dx, dy in NB:
                q = (x + dx, y + dy)
                if q in mask and q not in seen:
                    seen.add(q)
                    stack.append(q)
        if len(blob) >= MIN_AREA:
            out.append(blob)
    out.sort(key=len, reverse=True)
    return out


def corner_contour(x0, y0, x1, y1, bset, corner, span=CORNER_SPAN):
    """Boundary of one corner in corner-local coordinates.

    u = distance from the corner along its horizontal edge,
    v = distance from the corner along its vertical edge (both >= 0,
    interior of the petal). The curve is v as a monotone function of u,
    which is what the fit exploits.
    """
    pts = []
    top = range(y0, min(y0 + span, y1 + 1))
    bottom = range(max(y1 - span + 1, y0), y1 + 1)
    if corner == 'tl':
        cols = range(x0, min(x0 + span, x1 + 1))
        for x in cols:
            ys = [y for y in top if (x, y) in bset]
            if ys:
                pts.append((x - x0, min(ys) - y0))
    elif corner == 'tr':
        for x in range(x1, max(x1 - span, x0 - 1), -1):
            ys = [y for y in top if (x, y) in bset]
            if ys:
                pts.append((x1 - x, min(ys) - y0))
    elif corner == 'br':
        for x in range(x1, max(x1 - span, x0 - 1), -1):
            ys = [y for y in bottom if (x, y) in bset]
            if ys:
                pts.append((x1 - x, y1 - max(ys)))
    elif corner == 'bl':
        for x in range(x0, min(x0 + span, x1 + 1)):
            ys = [y for y in bottom if (x, y) in bset]
            if ys:
                pts.append((x - x0, y1 - max(ys)))
    return pts


def fit_petal(blob):
    """Measure one petal: bbox + which corners are rounded + their contours."""
    bset = set(blob)
    xs = [p[0] for p in blob]
    ys = [p[1] for p in blob]
    x0, x1, y0, y1 = min(xs), max(xs), min(ys), max(ys)

    def probe(sx, sy):
        """First opaque step along the diagonal leaving a corner."""
        cx = x0 if sx < 0 else x1
        cy = y0 if sy < 0 else y1
        for d in range(1, min(x1 - x0, y1 - y0) + 1):
            if (cx - sx * d, cy - sy * d) in bset:
                return d
        return None

    rounded, contours = [], {}
    for name, (sx, sy) in (('tl', (-1, -1)), ('tr', (1, -1)),
                           ('br', (1, 1)), ('bl', (-1, 1))):
        d = probe(sx, sy)
        if d is not None and d >= ROUND_T:
            rounded.append(name)
            contours[name] = corner_contour(x0, y0, x1, y1, bset, name)
    bbox = (x0, y0, x1 - x0 + 1, y1 - y0 + 1)
    return bbox, rounded, contours


def fit_grid(petals):
    """Snap the measured bboxes onto one uniform grid.

    Returns (origin, petal_size, gap): four equal petals at
    col/row * (size + gap), so the mark comes out perfectly regular instead
    of inheriting the raster's +-1px bbox noise.
    """
    centers_x = [x + w / 2 for (x, y, w, h) in petals]
    centers_y = [y + h / 2 for (x, y, w, h) in petals]
    mid_x = sum(centers_x) / len(centers_x)
    mid_y = sum(centers_y) / len(centers_y)

    size = int(round(sum(w for (_, _, w, _) in petals) / len(petals)))
    col0 = [p for p, c in zip(petals, centers_x) if c < mid_x]
    col1 = [p for p, c in zip(petals, centers_x) if c >= mid_x]
    row0 = [p for p, c in zip(petals, centers_y) if c < mid_y]
    row1 = [p for p, c in zip(petals, centers_y) if c >= mid_y]
    gx = min(p[0] for p in col1) - min(p[0] for p in col0) - size
    gy = min(p[1] for p in row1) - min(p[1] for p in row0) - size
    gap = int(round((gx + gy) / 2))
    origin = (min(p[0] for p in petals), min(p[1] for p in petals))
    return origin, size, gap


def model_v(u, r, h):
    """v of the local corner cubic at horizontal position u.

    Local model: P0=(r,0) P1=(r-h,0) P2=(0,r-h) P3=(0,r) — endpoints on the
    two edge tangents, handles along the edges, corner at the origin.
    u(t) decreases from r to 0, so bisect for t.
    """
    if u <= 0:
        return r
    if u >= r:
        return 0.0
    lo, hi = 0.0, 1.0
    for _ in range(28):
        t = (lo + hi) / 2
        mt = 1 - t
        cu = mt ** 3 * r + 3 * t * mt * mt * (r - h)
        if cu > u:
            lo = t
        else:
            hi = t
    t = (lo + hi) / 2
    return 3 * t * t * (1 - t) * (r - h) + t ** 3 * r


def fit_curve(contours):
    """Least-squares fit (radius, handle) of the corner cubic to contours.

    Grid search over endpoint radius and handle fraction, minimising mean
    absolute vertical error (the curve is monotone in both axes, so v(u)
    is well defined everywhere including the steep end).
    """
    best = None
    r = 70.0
    while r <= 92.0:
        k = 0.36
        while k <= 0.70:
            h = k * r
            total, n = 0.0, 0
            for pts in contours:
                for u, v in pts:
                    total += abs(v - model_v(u, r, h))
                    n += 1
            mean = total / n
            if best is None or mean < best[0]:
                best = (mean, r, k)
            k += 0.01
        r += 0.5
    mean, r, k = best
    return int(round(r)), int(round(r * k)), mean


def curve_points(r, h, steps=CURVE_STEPS):
    """The local corner cubic flattened to a polyline (t = 0 -> 1)."""
    pts = []
    for i in range(steps + 1):
        t = i / steps
        mt = 1 - t
        u = mt ** 3 * r + 3 * t * mt * mt * (r - h)
        v = 3 * t * t * mt * (r - h) + t ** 3 * r
        pts.append((u, v))
    return pts


def corner_transform(x, y, s, corner):
    """Map local corner space (u toward interior along the horizontal edge,
    v along the vertical edge) to petal coordinates."""
    if corner == 'tl':
        return lambda u, v: (x + u, y + v)
    if corner == 'tr':
        return lambda u, v: (x + s - u, y + v)
    if corner == 'br':
        return lambda u, v: (x + s - u, y + s - v)
    return lambda u, v: (x + u, y + s - v)


def petal_path(x, y, s, rounded, r, h):
    """SVG path for one petal: clockwise edges + cubic corner curves.

    Traversal: top -> TR -> right -> BR -> bottom -> BL -> left -> TL.
    Corners run model-forward (P0 -> P3) except TL and BR, which the
    clockwise traversal meets backwards; reversed cubics swap controls.
    """
    rt = r if 'tl' in rounded else 0
    rr = r if 'tr' in rounded else 0
    rb = r if 'br' in rounded else 0
    rl = r if 'bl' in rounded else 0
    d = ['M{} {}'.format(x + rt, y)]
    d.append('L{} {}'.format(x + s - rr, y))
    if rr:
        d.append('C{} {} {} {} {} {}'.format(
            x + s - rr + h, y, x + s, y + rr - h, x + s, y + rr))
    d.append('L{} {}'.format(x + s, y + s - rb))
    if rb:
        d.append('C{} {} {} {} {} {}'.format(
            x + s, y + s - rb + h, x + s - rb + h, y + s, x + s - rb, y + s))
    d.append('L{} {}'.format(x + rl, y + s))
    if rl:
        d.append('C{} {} {} {} {} {}'.format(
            x + rl - h, y + s, x, y + s - rl + h, x, y + s - rl))
    d.append('L{} {}'.format(x, y + rt))
    if rt:
        d.append('C{} {} {} {} {} {}'.format(
            x, y + rt - h, x + rt - h, y, x + rt, y))
    d.append('Z')
    return ''.join(d)


def petal_points(x, y, s, rounded, r, h):
    """Same petal flattened to a polygon (for IoU + favicon rasterisation)."""
    pts = []
    model = curve_points(r, h) if (rounded and r) else []
    rev = lambda seq: list(reversed(seq))

    def emit(corner, forward=True):
        T = corner_transform(x, y, s, corner)
        seq = [T(u, v) for u, v in model]
        pts.extend(seq if forward else rev(seq))

    # top edge starts after the TL curve; TL closes the path at the end
    pts.append((x + rt_x(rounded, r), y))
    pts.append((x + s - rr_x(rounded, r), y) if 'tr' in rounded else (x + s, y))
    if 'tr' in rounded:
        emit('tr', forward=True)
    pts.append((x + s, y + s - rb_x(rounded, r)) if 'br' in rounded else (x + s, y + s))
    if 'br' in rounded:
        emit('br', forward=False)
    pts.append((x + rl_x(rounded, r), y + s) if 'bl' in rounded else (x, y + s))
    if 'bl' in rounded:
        emit('bl', forward=True)
    pts.append((x, y + rt_x(rounded, r)) if 'tl' in rounded else (x, y))
    if 'tl' in rounded:
        emit('tl', forward=False)
    return pts


def rt_x(rounded, r):
    return r if 'tl' in rounded else 0


def rr_x(rounded, r):
    return r if 'tr' in rounded else 0


def rb_x(rounded, r):
    return r if 'br' in rounded else 0


def rl_x(rounded, r):
    return r if 'bl' in rounded else 0


def render_favicon(polys, ox, oy, vw, vh, dst, size=64, ss=4):
    """Rasterise the fitted polygons into a crisp favicon.

    PIL's polygon fill is aliased, so draw at 4x and downsample with Lanczos
    for smooth edges. Mark is ~square, so it fills the tile like the original.
    """
    from PIL import ImageDraw
    big = size * ss
    img = Image.new('RGBA', (big, big), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    k = big / max(vw, vh)
    for label, pts in polys:
        fill = FAVICON_COLOURS.get(label, '#534cea')
        rgb = tuple(int(fill[i:i + 2], 16) for i in (1, 3, 5)) + (255,)
        draw.polygon([((x - ox) * k, (y - oy) * k) for x, y in pts], fill=rgb)
    img.resize((size, size), Image.LANCZOS).save(dst)


FAVICON_COLOURS = {}


def main():
    src = os.path.abspath(SRC)
    dst = os.path.abspath(DST)
    indigo, green, table, (W, H) = load_masks(src)

    # ---- measure every petal: bbox + rounded corners + corner contours
    fitted = []  # (label, bbox, rounded, contours)
    for label, mask in (('indigo', indigo), ('green', green)):
        blobs = components(mask)
        if len(blobs) != 2:
            print('ERROR: expected 2 {} petals, found {}'.format(label, len(blobs)),
                  file=sys.stderr)
            return 1
        for blob in blobs:
            fitted.append((label,) + fit_petal(blob))

    # ---- fit one corner curve per colour across all its rounded corners
    curves = {}
    for label in ('indigo', 'green'):
        contours = [c for lb, _, rounded, cts in fitted if lb == label
                    for c in cts.values()]
        if not contours:
            print('ERROR: no rounded {} corners found'.format(label), file=sys.stderr)
            return 1
        r, h, err = fit_curve(contours)
        curves[label] = (r, h)
        print('curve      : {} r={} h={} (mean abs {:.2f}px over {} corners)'.format(
            label, r, h, err,
            sum(1 for lb, _, rd, _ in fitted if lb == label for _ in rd)))

    # ---- snap to a uniform grid
    origin, S, G = fit_grid([b for _, b, _, _ in fitted])
    ox, oy = origin
    span = 2 * S + G

    # ---- build paths + flattened polygons in grid coordinates
    paths, polys = [], []
    for label, (bx, by, bw, bh), rounded, _ in fitted:
        col = 0 if bx + bw / 2 < ox + span / 2 else 1
        row = 0 if by + bh / 2 < oy + span / 2 else 1
        gx, gy = col * (S + G), row * (S + G)
        r, h = curves[label]
        fill = table.get(label, '#554ce5')
        paths.append((label, fill, petal_path(gx, gy, S, rounded, r, h)))
        polys.append((label, petal_points(ox + gx, oy + gy, S, rounded, r, h)))

    # ---- verify: rasterise the fitted geometry and compare to the source
    from PIL import ImageDraw
    canvas = Image.new('1', (W, H), 0)
    draw = ImageDraw.Draw(canvas)
    for _, pts in polys:
        draw.polygon(pts, fill=1)
    dpix = canvas.load()
    traced = {(x, y) for y in range(H) for x in range(W) if dpix[x, y]}
    source = indigo | green
    union = len(traced | source)
    iou = len(traced & source) / union if union else 0.0

    body = '\n'.join(
        '    <path fill="{}" d="{}" />'.format(fill, d)
        for _, fill, d in paths
    )
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {span} {span}" '
        'role="img" aria-label="BACR">\n'
        '  <title>BACR mark</title>\n{body}\n</svg>\n'
    ).format(span=span, body=body)

    with open(dst, 'w') as f:
        f.write(svg)

    total_pts = sum(len(p) for _, p in polys)
    print('source      : {} ({}x{})'.format(os.path.relpath(src), W, H))
    print('viewBox     : 0 0 {} {}  (petal {}, gap {})'.format(span, span, S, G))
    print('petals      : {} (indigo {}, green {})'.format(
        len(paths),
        sum(1 for l, _, _ in paths if l == 'indigo'),
        sum(1 for l, _, _ in paths if l == 'green'),
    ))
    print('colours     : ' + '  '.join('{}={}'.format(k, v) for k, v in table.items()))
    print('curve points: {}'.format(total_pts))
    print('accuracy    : IoU {:.4f} (src {}px, fitted {}px, {}px differ)'.format(
        iou, len(source), len(traced), len(source ^ traced)))
    print('wrote       : {} ({} bytes)'.format(
        os.path.relpath(dst), os.path.getsize(dst)))

    FAVICON_COLOURS.update(table)
    fav = os.path.abspath(os.path.join(
        os.path.dirname(__file__), '..', 'public', 'favicon.png'))
    render_favicon(polys, ox, oy, span, span, fav)
    print('wrote       : {} ({} bytes, 64x64)'.format(
        os.path.relpath(fav), os.path.getsize(fav)))

    if iou < 0.98:
        print('WARNING: fitted geometry below 0.98 IoU - raise fidelity before shipping.',
              file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
