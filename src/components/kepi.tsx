"use client"

export type KepiVariant =
  | "large"
  | "neutral" | "happy" | "grin" | "thinking" | "confused" | "sad" | "angry" | "celebrate"
  | "p0" | "p25" | "p50" | "p75" | "p100"
  | "streak1" | "streak3" | "streak5"

interface KepiProps {
  variant?: KepiVariant
  size?: number  // display size in px (the crop will be scaled to fit)
  className?: string
}

// Each entry: [srcX, srcY, srcW, srcH] in original image pixels
const SPRITES: Record<KepiVariant, [number, number, number, number]> = {
  large:     [0,    0,    460, 400],
  neutral:   [0,    390,  192, 320],
  happy:     [192,  390,  192, 320],
  grin:      [384,  390,  192, 320],
  thinking:  [576,  390,  192, 320],
  confused:  [768,  390,  192, 320],
  sad:       [960,  390,  192, 320],
  angry:     [1152, 390,  192, 320],
  celebrate: [1344, 390,  192, 320],
  p0:        [0,    710,  307, 300],
  p25:       [307,  710,  307, 300],
  p50:       [614,  710,  307, 300],
  p75:       [921,  710,  307, 300],
  p100:      [1228, 710,  306, 300],
  streak1:   [0,    1010, 220, 477],
  streak3:   [185,  1010, 220, 477],
  streak5:   [370,  990,  350, 497],
}

export function Kepi({ variant = "happy", size = 80, className = "" }: KepiProps) {
  const [sx, sy, sw, sh] = SPRITES[variant]
  // Scale: fill the display size while keeping aspect
  const aspect = sw / sh
  const dispW = size
  const dispH = Math.round(size / aspect)
  // background-size scales the full 1534x1487 image
  const scaleX = dispW / sw
  const scaleY = dispH / sh
  const bgW = Math.round(1534 * scaleX)
  const bgH = Math.round(1487 * scaleY)
  const bgX = -Math.round(sx * scaleX)
  const bgY = -Math.round(sy * scaleY)

  return (
    <div
      className={className}
      style={{
        width: dispW,
        height: dispH,
        backgroundImage: "url('/kepi.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: `${bgW}px ${bgH}px`,
        backgroundPosition: `${bgX}px ${bgY}px`,
        flexShrink: 0,
      }}
    />
  )
}

// Helper: pick progress variant based on percentage
export function kepiForProgress(pct: number): KepiVariant {
  if (pct >= 100) return "p100"
  if (pct >= 75) return "p75"
  if (pct >= 50) return "p50"
  if (pct >= 25) return "p25"
  return "p0"
}

// Helper: pick mood based on KPI score
export function kepiMoodForScore(score: number): KepiVariant {
  if (score >= 90) return "celebrate"
  if (score >= 75) return "grin"
  if (score >= 50) return "happy"
  if (score >= 25) return "neutral"
  return "sad"
}
