#!/usr/bin/env python3
"""
trace-mark.py — reconstruct the BACR petal mark as a true vector SVG.

The repo only ever contained raster PNGs of the logo (the client's original
source was a bitmap; tools/mklogo.ps1 only recoloured it). This traces the
alpha contour of bacr-mark.png and emits a scalable, recolourable SVG.

Run:  python3 tools/trace-mark.py
Out:  src/assets/bacr-mark.svg
"""
import os
import sys

from PIL import Image

SRC = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'bacr-mark.png')
DST = os.path.join(os.path.dirname(__file__), '..', 'src', 'assets', 'bacr-mark.svg')

ALPHA_T = 128          # opaque threshold
SPLIT_T = 128          # colour split threshold (indigo is blue-dominant, green is green-dominant)
RDP_TOL = 1.0          # Douglas-Peucker tolerance, in px. Swept 0.3-3.0:
                       # 1.0 gives the best IoU (0.9853) at 100 points / 1.1KB;
                       # tighter keeps 1px raster staircase (worse IoU, 4x the
                       # bytes), looser facets the 80px corner arcs.
MIN_AREA = 200         # ignore specks

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


def trace(blob):
    """Exact boundary polygon of a pixel blob via directed edge chaining.

    Each opaque pixel contributes its four unit edges, but only on sides where
    the neighbour is absent. Chaining those gives the exact outline (a 1px
    staircase), which Douglas-Peucker then smooths. No neighbour-direction
    bookkeeping, so it can't lose the contour.
    """
    bset = set(blob)
    out = {}
    for (x, y) in bset:
        if (x, y - 1) not in bset:
            out.setdefault((x, y), []).append((x + 1, y))
        if (x + 1, y) not in bset:
            out.setdefault((x + 1, y), []).append((x + 1, y + 1))
        if (x, y + 1) not in bset:
            out.setdefault((x + 1, y + 1), []).append((x, y + 1))
        if (x - 1, y) not in bset:
            out.setdefault((x, y + 1), []).append((x, y))

    loops = []
    while out:
        start = next(iter(out))
        loop, cur = [], start
        while True:
            loop.append(cur)
            opts = out.get(cur)
            if not opts:
                break
            if len(opts) == 1:
                nxt = opts.pop()
            else:
                # diagonal self-touch: take the sharpest right turn so the two
                # lobes stay separate loops instead of merging
                pi = loop[-2] if len(loop) > 1 else None
                if pi is None:
                    nxt = opts.pop()
                else:
                    d = (cur[0] - pi[0], cur[1] - pi[1])
                    best, bestscore = None, None
                    for cand in list(opts):
                        e = (cand[0] - cur[0], cand[1] - cur[1])
                        cross = d[0] * e[1] - d[1] * e[0]
                        dot = d[0] * e[0] + d[1] * e[1]
                        score = (-cross, -dot)          # prefer right turn, then straight
                        if bestscore is None or score < bestscore:
                            best, bestscore = cand, score
                    nxt = best
                    opts.remove(best)
            if not out.get(cur):
                out.pop(cur, None)
            if nxt == start:
                break
            cur = nxt
            if len(loop) > 400000:
                break
        if len(loop) >= 8:
            loops.append(loop)
    if not loops:
        return []
    return max(loops, key=len)


def rdp(pts, tol):
    """Douglas-Peucker simplification (iterative, no recursion limit)."""
    if len(pts) < 3:
        return pts
    keep = [False] * len(pts)
    keep[0] = keep[-1] = True
    stack = [(0, len(pts) - 1)]
    while stack:
        a, b = stack.pop()
        if b <= a + 1:
            continue
        ax, ay = pts[a]
        bx, by = pts[b]
        dx, dy = bx - ax, by - ay
        norm = (dx * dx + dy * dy) ** 0.5 or 1e-9
        worst, wi = -1.0, -1
        for i in range(a + 1, b):
            px, py = pts[i]
            dist = abs(dy * px - dx * py + bx * ay - by * ax) / norm
            if dist > worst:
                worst, wi = dist, i
        if worst > tol:
            keep[wi] = True
            stack.append((a, wi))
            stack.append((wi, b))
    return [p for p, k in zip(pts, keep) if k]


def rdp_closed(pts, tol):
    """Douglas-Peucker for a closed ring.

    Plain DP fails on rings: pts[0] == pts[-1] makes the baseline zero-length,
    so every point measures 0 distance and the whole loop collapses to 2
    points. Anchor on the point farthest from pts[0] instead and simplify the
    two resulting open chains.
    """
    if len(pts) > 1 and pts[0] == pts[-1]:
        pts = pts[:-1]
    if len(pts) < 4:
        return list(pts)
    ax, ay = pts[0]
    far = max(range(len(pts)), key=lambda i: (pts[i][0] - ax) ** 2 + (pts[i][1] - ay) ** 2)
    head = rdp(pts[:far + 1], tol)
    tail = rdp(pts[far:] + [pts[0]], tol)
    return head[:-1] + tail[:-1]


def polygon_area(pts):
    s = 0.0
    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        s += x1 * y2 - x2 * y1
    return abs(s) / 2.0


def to_svg_path(pts, ox, oy):
    p = [(round(x - ox, 2), round(y - oy, 2)) for x, y in pts]
    d = ['M{} {} '.format(*p[0])]
    d += ['L{} {} '.format(*c) for c in p[1:]]
    return ''.join(d) + 'Z'


def render_favicon(polys, ox, oy, vw, vh, dst, size=64, ss=4):
    """Rasterise the traced polygons into a crisp favicon.

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

    # bbox of the whole mark, so the SVG has no dead margin
    allpx = indigo | green
    xs = [p[0] for p in allpx]
    ys = [p[1] for p in allpx]
    ox, oy = min(xs), min(ys)
    vw = max(xs) - ox + 1
    vh = max(ys) - oy + 1

    paths = []
    polys = []
    for label, mask in (('indigo', indigo), ('green', green)):
        for blob in components(mask):
            raw = trace(blob)
            if len(raw) < 8:
                continue
            simple = rdp_closed(raw + [raw[0]], RDP_TOL)
            area = polygon_area(simple)
            if area < MIN_AREA:
                continue
            fill = table.get(label, '#554ce5')
            paths.append((area, fill, to_svg_path(simple, ox, oy), len(simple)))
            polys.append((label, simple))

    paths.sort(key=lambda t: -t[0])

    # ---- verify: rasterise the simplified polygons and compare to the source
    from PIL import ImageDraw
    canvas = Image.new('1', (W, H), 0)
    draw = ImageDraw.Draw(canvas)
    for _, p in polys:
        draw.polygon(p, fill=1)
    dpix = canvas.load()
    traced = {(x, y) for y in range(H) for x in range(W) if dpix[x, y]}
    source = indigo | green
    union = len(traced | source)
    iou = len(traced & source) / union if union else 0.0

    body = '\n'.join(
        '    <path fill="{}" d="{}" />'.format(fill, d)
        for _, fill, d, _ in paths
    )
    svg = (
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {vw} {vh}" '
        'role="img" aria-label="BACR">\n'
        '  <title>BACR mark</title>\n{body}\n</svg>\n'
    ).format(vw=vw, vh=vh, body=body)

    with open(dst, 'w') as f:
        f.write(svg)

    total_pts = sum(n for _, _, _, n in paths)
    print('source      : {} ({}x{})'.format(os.path.relpath(src), W, H))
    print('viewBox     : 0 0 {} {}'.format(vw, vh))
    print('petals      : {} (indigo {}, green {})'.format(
        len(paths),
        sum(1 for _, f, _, _ in paths if f == table.get('indigo')),
        sum(1 for _, f, _, _ in paths if f == table.get('green')),
    ))
    print('colours     : ' + '  '.join('{}={}'.format(k, v) for k, v in table.items()))
    print('path points : {}'.format(total_pts))
    print('accuracy    : IoU {:.4f} (src {}px, traced {}px, {}px differ)'.format(
        iou, len(source), len(traced), len(source ^ traced)))
    print('wrote       : {} ({} bytes)'.format(
        os.path.relpath(dst), os.path.getsize(dst)))

    FAVICON_COLOURS.update(table)
    fav = os.path.abspath(os.path.join(
        os.path.dirname(__file__), '..', 'public', 'favicon.png'))
    render_favicon(polys, ox, oy, vw, vh, fav)
    print('wrote       : {} ({} bytes, 64x64)'.format(
        os.path.relpath(fav), os.path.getsize(fav)))

    if iou < 0.98:
        print('WARNING: trace below 0.98 IoU - raise fidelity before shipping.',
              file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
