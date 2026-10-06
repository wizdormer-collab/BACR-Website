param(
  [string]$Src,
  [string]$Dst,
  [switch]$ToWhite
)

Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap($Src)
$rect = New-Object System.Drawing.Rectangle(0, 0, $bmp.Width, $bmp.Height)
$bd = $bmp.LockBits($rect, [System.Drawing.Imaging.ImageLockMode]::ReadWrite, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$len = $bd.Stride * $bmp.Height
$bytes = New-Object byte[] $len
[System.Runtime.InteropServices.Marshal]::Copy($bd.Scan0, $bytes, 0, $len)

for ($y = 0; $y -lt $bmp.Height; $y++) {
  $row = $y * $bd.Stride
  for ($x = 0; $x -lt $bmp.Width; $x++) {
    $i = $row + $x * 4
    $b = [int]$bytes[$i]
    $g = [int]$bytes[$i + 1]
    $r = [int]$bytes[$i + 2]
    $a = [int]$bytes[$i + 3]
    if ($a -eq 0) { continue }

    $min = [Math]::Min([Math]::Min($r, $g), $b)
    $d = 255 - $min
    $na = [Math]::Min(255, $d * 3)

    if ($ToWhite) {
      $bytes[$i] = 255
      $bytes[$i + 1] = 255
      $bytes[$i + 2] = 255
    }
    $bytes[$i + 3] = [byte]$na
  }
}

[System.Runtime.InteropServices.Marshal]::Copy($bytes, 0, $bd.Scan0, $len)
$bmp.UnlockBits($bd)
$bmp.Save($Dst, [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

$check = New-Object System.Drawing.Bitmap($Dst)
$out = "$Dst :: " + $check.Width + "x" + $check.Height + " corner alpha=" + $check.GetPixel(0, 0).A
$check.Dispose()
Write-Output $out
