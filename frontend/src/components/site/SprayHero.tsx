import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import gunImgSrc from "@/assets/gun.png"
import { useSliders, useGallery } from "@/hooks/queries"
import { SERVICES } from "@/lib/services"

type Props = { headline: string; subheadline: string; onComplete?: () => void }

/* ── Photo slider — blurred, continuous L→R scroll ───────── */
function PhotoSlider() {
  const { data: sliders = [] } = useSliders()
  const { data: gallery = [] } = useGallery()

  const imgs = useMemo(() => {
    const api = sliders.filter((s) => s.image_url).map((s) => s.image_url!)
    const gal = gallery.filter((g) => g.image_url).map((g) => g.image_url!)
    const svc = SERVICES.map((s) => s.image)
    return [...api, ...gal, ...svc]
  }, [sliders, gallery])

  if (imgs.length === 0) return null

  // Duplicate for seamless loop
  const doubled = [...imgs, ...imgs]

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <style>{`
        @keyframes slideLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .slide-track { display: flex; width: max-content; animation: slideLeft ${imgs.length * 6}s linear infinite; }
        .slide-img { height: 100vh; width: 100vw; object-fit: cover; filter: blur(5px); flex-shrink: 0; }
      `}</style>
      <div className="slide-track">
        {doubled.map((u, i) => (
          <img key={`${u}-${i}`} src={u} className="slide-img" alt="" />
        ))}
      </div>
      <div className="absolute inset-0 bg-white/50" />
    </div>
  )
}

/* ── Spray particles ─────────────────────────────────────── */
type Particle = { x: number; y: number; vx: number; vy: number; life: number; r: number; color: string }

function spawnParticles(particles: Particle[], px: number, py: number, angle: number, color: string) {
  for (let i = 0; i < 4; i++) {
    const spread = (Math.random() - 0.5) * 0.9
    const speed = 2 + Math.random() * 2.5
    particles.push({
      x: px, y: py,
      vx: Math.cos(angle + spread) * speed * 0.6,
      vy: Math.sin(angle + spread) * speed * 0.6 + 0.4,
      life: 1,
      r: 1 + Math.random() * 2,
      color,
    })
  }
}

function stepParticles(ctx: CanvasRenderingContext2D, particles: Particle[]) {
  ctx.save()
  for (const p of particles) {
    p.x += p.vx; p.y += p.vy
    p.vy += 0.06
    p.life -= 0.045
    ctx.globalAlpha = Math.max(p.life, 0)
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
    ctx.fill()
  }
  ctx.restore()
}

function easeInOut(t: number) { return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2 }

/* ── GUN IMAGE CONSTANTS (adjust if different image) ─────── */
const GUN_NATURAL_W = 468, GUN_NATURAL_H = 895
const NOZZLE_X = 4, NOZZLE_Y = 465

function drawGun(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  ready: boolean,
  x: number, y: number, angle: number, scale: number,
  dissolveAlpha = 1,
) {
  if (!ready) return
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(angle)
  // soft shadow
  ctx.save()
  ctx.globalAlpha = 0.12 * dissolveAlpha
  ctx.fillStyle = "#000"
  ctx.beginPath()
  ctx.ellipse(-scale * 90, scale * 60, scale * 70, scale * 16, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
  ctx.scale(-scale, scale)
  ctx.globalAlpha = dissolveAlpha
  ctx.drawImage(img, -NOZZLE_X, -NOZZLE_Y, GUN_NATURAL_W, GUN_NATURAL_H)
  ctx.restore()
}

/* ── MAIN ────────────────────────────────────────────────── */
export function SprayHero({ headline, subheadline, onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ghost1Ref = useRef<HTMLSpanElement>(null)
  const ghost2Ref = useRef<HTMLSpanElement>(null)
  const paint1Ref = useRef<HTMLSpanElement>(null)
  const paint2Ref = useRef<HTMLSpanElement>(null)
  const [animDone, setAnimDone] = useState(false)
  const runningRef = useRef(false)

  const gunImg = useRef<HTMLImageElement | null>(null)
  const gunReady = useRef(false)

  // Load gun image
  useEffect(() => {
    const img = new Image()
    img.onload = () => { gunReady.current = true }
    img.src = gunImgSrc
    gunImg.current = img
  }, [])

  const play = useCallback(() => {
    if (runningRef.current) return
    runningRef.current = true

    const container = containerRef.current
    if (!canvasRef.current || !container) return
    const canvas: HTMLCanvasElement = canvasRef.current
    const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      const r = container.getBoundingClientRect()
      canvas.width = r.width * dpr
      canvas.height = r.height * dpr
      canvas.style.width = r.width + "px"
      canvas.style.height = r.height + "px"
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    // Reset
    if (paint1Ref.current) paint1Ref.current.style.clipPath = "inset(0 100% 0 0)"
    if (paint2Ref.current) paint2Ref.current.style.clipPath = "inset(0 100% 0 0)"
    const particles: Particle[] = []
    let raf = 0

    const measure = (el: HTMLElement) => {
      const sr = container.getBoundingClientRect()
      const r = el.getBoundingClientRect()
      return { x: r.left - sr.left, y: r.top - sr.top, w: r.width, h: r.height }
    }

    const g1 = ghost1Ref.current ? measure(ghost1Ref.current) : { x: 0, y: 0, w: 300, h: 60 }
    const g2 = ghost2Ref.current ? measure(ghost2Ref.current) : { x: 0, y: 80, w: 300, h: 60 }

    const T1_END = 0.42, TRAVEL_END = 0.55
    const DURATION = 3400
    const GUN_SCALE = Math.min(0.16, container.getBoundingClientRect().width / 3600)
    const start = performance.now()

    function frame(now: number) {
      const t = Math.min((now - start) / DURATION, 1)
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height)

      let gx: number, gy: number, angle: number

      if (t <= T1_END) {
        const local = easeInOut(t / T1_END)
        if (paint1Ref.current) paint1Ref.current.style.clipPath = `inset(0 ${Math.max(-3, 100 - local * 103)}% 0 0)`
        gx = g1.x + local * g1.w
        gy = g1.y + g1.h * 0.62
        angle = -0.1
        if (local > 0.02 && local < 0.99) spawnParticles(particles, gx, gy, angle, "#111")
      } else if (t <= TRAVEL_END) {
        const local = easeInOut((t - T1_END) / (TRAVEL_END - T1_END))
        const fromX = g1.x + g1.w, fromY = g1.y + g1.h * 0.62
        const toX = g2.x, toY = g2.y + g2.h * 0.58
        gx = fromX + (toX - fromX) * local
        gy = fromY + (toY - fromY) * local
        angle = -0.1 + 0.15 * local
      } else {
        const local = easeInOut((t - TRAVEL_END) / (1 - TRAVEL_END))
        if (paint2Ref.current) paint2Ref.current.style.clipPath = `inset(0 ${Math.max(-3, 100 - local * 103)}% 0 0)`
        gx = g2.x + local * g2.w
        gy = g2.y + g2.h * 0.58
        angle = 0.05
        if (local > 0.02 && local < 0.99) spawnParticles(particles, gx, gy, angle, "#7fa98e")
      }

      // Gun dissolve at end — breaks into particles
      if (t > 0.88) {
        const dp = Math.min((t - 0.88) / 0.12, 1)
        drawGun(ctx!, gunImg.current!, gunReady.current, gx, gy, angle, GUN_SCALE, 1 - dp)
        // Spawn colored dissolve particles from gun body
        if (t < 0.995) {
          const bodyColors = ["#3a3632", "#2e2a27", "#4a4640", "#2c2824", "#1c1a18"]
          for (let i = 0; i < 10; i++) {
            particles.push({
              x: gx + (Math.random() - 0.5) * 80,
              y: gy + (Math.random() - 0.5) * 100,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4 - 2,
              life: 0.4 + Math.random() * 0.6,
              r: 1.5 + Math.random() * 4,
              color: bodyColors[Math.floor(Math.random() * bodyColors.length)],
            })
          }
        }
      } else {
        drawGun(ctx!, gunImg.current!, gunReady.current, gx, gy, angle, GUN_SCALE)
      }
      stepParticles(ctx!, particles)

      if (t < 1 || particles.length > 0) {
        raf = requestAnimationFrame(frame)
      } else {
        setAnimDone(true)
        onComplete?.()
      }
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [onComplete])

  useEffect(() => {
    if (animDone) return
    const el = containerRef.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { setTimeout(() => { play(); io.disconnect() }, 1200) } }) },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [play, animDone])

  return (
    <div ref={containerRef} className="relative w-full min-h-screen overflow-hidden" style={{ background: "linear-gradient(180deg, #f4f4f2, #e9e9e6)" }}>
      <PhotoSlider />

      <canvas ref={canvasRef} className="absolute inset-0 z-30 pointer-events-none" />

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <p className="eyebrow text-[#9aa39c] mb-4 tracking-[0.2em] text-xs font-semibold" style={{ letterSpacing: "0.2em" }}>
          <span style={{ color: "#7fa98e" }}>— </span>EST. ENDÜSTRİYEL YALITIM
        </p>

        {/* Line 1 */}
        <h1 className="text-[clamp(40px,7vw,72px)] font-bold leading-[1.08] text-[#111] m-0 relative inline-block">
          <span ref={ghost1Ref} className="opacity-10">{headline}</span>
          <span ref={paint1Ref} className="absolute left-0 top-0 whitespace-nowrap text-[#111]" style={{ clipPath: "inset(0 100% 0 0)" }}>{headline}</span>
        </h1>

        {/* Line 2 */}
        <h1 className="text-[clamp(40px,7vw,72px)] font-medium italic leading-[1.08] m-0 mt-0 relative inline-block" style={{ fontFamily: "Georgia, 'Times New Roman', serif", WebkitTextStroke: "1px rgba(0,0,0,0.4)" }}>
          <span ref={ghost2Ref} className="opacity-10" style={{ WebkitTextStroke: "0" }}>{subheadline}</span>
          <span ref={paint2Ref} className="absolute left-0 top-0 whitespace-nowrap" style={{ clipPath: "inset(0 100% 0 0)", WebkitTextStroke: "1px rgba(0,0,0,0.4)", color: "#7fa98e" }}>{subheadline}</span>
        </h1>
      </div>
    </div>
  )
}
