// Effet de saut hyperspatial — hyperspace canvas (Star Wars style)
import { useEffect, useRef, useState } from 'react'

const DURATION = 2600 // ms
const NUM_STREAKS = 220

interface StreakDef {
  angle: number
  baseSpeed: number
  brightness: number
  width: number
}

function makeStreaks(): StreakDef[] {
  return Array.from({ length: NUM_STREAKS }, () => ({
    angle: Math.random() * Math.PI * 2,
    baseSpeed: 0.6 + Math.random() * 2.2,
    brightness: 0.35 + Math.random() * 0.65,
    width: 0.3 + Math.random() * 1.4,
  }))
}

export default function WarpEffect({ trigger }: Readonly<{ trigger: number }>) {
  const [active, setActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const startRef = useRef<number>(0)
  const streaksRef = useRef<StreakDef[]>([])

  useEffect(() => {
    if (trigger > 0) {
      streaksRef.current = makeStreaks()
      startRef.current = performance.now()
      setActive(true)
    }
  }, [trigger])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
    }
    resize()

    function draw(timestamp: number) {
      if (!canvas) return
      const elapsed = timestamp - startRef.current
      const t = Math.min(elapsed / DURATION, 1)

      if (t >= 1) {
        setActive(false)
        return
      }

      const W = canvas.offsetWidth
      const H = canvas.offsetHeight
      const cx = W / 2
      const cy = H / 2
      const maxDist = Math.sqrt(cx * cx + cy * cy) * 1.4

      // Speed multiplier: ease-in → peak → ease-out
      let speedMult: number
      if (t < 0.25) {
        speedMult = (t / 0.25) ** 2 * 4
      } else if (t < 0.72) {
        speedMult = 4 + ((t - 0.25) / 0.47) * 14
      } else {
        speedMult = 18 * (1 - (t - 0.72) / 0.28)
      }

      ctx.clearRect(0, 0, W, H)

      // Dark tunnel overlay
      const tunnelAlpha = t < 0.15
        ? (t / 0.15) * 0.55
        : t > 0.82
          ? ((1 - t) / 0.18) * 0.55
          : 0.55
      ctx.fillStyle = `rgba(0,0,12,${tunnelAlpha})`
      ctx.fillRect(0, 0, W, H)

      // Streaks
      for (const { angle, baseSpeed, brightness, width } of streaksRef.current) {
        const speed = baseSpeed * speedMult
        const startDist = maxDist * 0.015 * Math.max(speedMult, 0.5)
        const endDist = Math.min(startDist + speed * 22, maxDist)
        if (endDist <= startDist + 1) continue

        let alpha = brightness
        if (t < 0.12) alpha *= t / 0.12
        if (t > 0.78) alpha *= (1 - t) / 0.22

        const sx = cx + Math.cos(angle) * startDist
        const sy = cy + Math.sin(angle) * startDist
        const ex = cx + Math.cos(angle) * endDist
        const ey = cy + Math.sin(angle) * endDist

        const grad = ctx.createLinearGradient(sx, sy, ex, ey)
        grad.addColorStop(0, `rgba(120,190,255,0)`)
        grad.addColorStop(0.25, `rgba(180,220,255,${alpha * 0.5})`)
        grad.addColorStop(1, `rgba(255,255,255,${alpha})`)

        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(ex, ey)
        ctx.strokeStyle = grad
        ctx.lineWidth = width * (1 + speedMult * 0.04)
        ctx.stroke()
      }

      // Edge vignette
      const vGrad = ctx.createRadialGradient(cx, cy, maxDist * 0.45, cx, cy, maxDist)
      vGrad.addColorStop(0, 'rgba(0,0,0,0)')
      vGrad.addColorStop(1, `rgba(0,0,10,${tunnelAlpha * 0.7})`)
      ctx.fillStyle = vGrad
      ctx.fillRect(0, 0, W, H)

      animRef.current = requestAnimationFrame(draw)
    }

    animRef.current = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(animRef.current)
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        zIndex: 25,
        pointerEvents: 'none',
      }}
    />
  )
}
