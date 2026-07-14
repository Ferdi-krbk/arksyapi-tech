import { useRef, useEffect, useCallback, useState } from "react";
import gsap from "gsap";

type Particle = {
  x: number;
  y: number;
  tx: number;
  ty: number;
  life: number;
  maxLife: number;
  radius: number;
  type: "main" | "overspray" | "mist";
  color: string;
  settled: boolean;
};

type Props = {
  headline: string;
  subheadline: string;
  onComplete?: () => void;
};

const PARTICLE_COUNT = 1300;
const NOZZLE_X_RATIO = 0.08;
const NOZZLE_Y_RATIO = 0.55;
const SPRAY_DURATION = 2.5; // seconds particles fly
const HARDEN_DURATION = 0.5; // seconds coating settles
const TOTAL_DURATION = 5.0;

const COLORS = {
  main: [
    "rgba(31,58,42,0.95)",
    "rgba(26,52,38,0.9)",
    "rgba(36,65,48,0.92)",
    "rgba(28,55,40,0.88)",
  ],
  overspray: [
    "rgba(26,52,38,0.35)",
    "rgba(31,58,42,0.28)",
    "rgba(36,65,48,0.22)",
  ],
  mist: [
    "rgba(31,58,42,0.12)",
    "rgba(26,52,38,0.1)",
    "rgba(46,75,55,0.08)",
  ],
};

function rng(min: number, max: number) {
  return min + Math.random() * (max - min);
}
function pick<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

export function SprayHero({ headline, subheadline, onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gunRef = useRef<HTMLDivElement | null>(null);
  const [phase, setPhase] = useState<"idle" | "gun-enter" | "spraying" | "hardening" | "complete">("idle");
  const rafRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);
  const startTimeRef = useRef(0);
  const completeRef = useRef(false);

  // Memoized dimensions
  const dims = useRef({ w: 0, h: 0, dpr: 1 });

  const getDims = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w !== dims.current.w || h !== dims.current.h) {
      dims.current = { w, h, dpr };
      canvas.width = w * dpr;
      canvas.height = h * dpr;
    }
    return dims.current;
  }, []);

  const buildTextMap = useCallback(() => {
    const d = dims.current;
    if (d.w === 0) return new Float64Array(0);
    const offscreen = document.createElement("canvas");
    offscreen.width = d.w;
    offscreen.height = d.h;
    const octx = offscreen.getContext("2d")!;
    const fontSize = Math.max(d.w * 0.055, 28);
    const lh = fontSize * 1.25;

    octx.font = `500 ${fontSize}px Urbanist, sans-serif`;
    const m1 = octx.measureText(headline);
    octx.font = `300 italic ${fontSize}px Urbanist, sans-serif`;
    const m2 = octx.measureText(subheadline);

    const totalH = lh * 2;
    const startY = d.h * 0.35;
    const x1 = (d.w - m1.width) / 2;
    const x2 = (d.w - m2.width) / 2;

    octx.fillStyle = "#000";
    octx.font = `500 ${fontSize}px Urbanist, sans-serif`;
    octx.fillText(headline, x1, startY);
    octx.font = `300 italic ${fontSize}px Urbanist, sans-serif`;
    octx.fillText(subheadline, x2, startY + lh);

    const data = octx.getImageData(0, 0, d.w, d.h).data;
    const pixels: number[] = [];
    const step = 3;
    for (let y = 0; y < d.h; y += step) {
      for (let x = 0; x < d.w; x += step) {
        const i = (y * d.w + x) * 4;
        if (data[i] > 10) pixels.push(x, y);
      }
    }
    return new Float64Array(pixels);
  }, [headline, subheadline]);

  /* Run once on mount */
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setPhase("complete");
      onComplete?.();
      return;
    }

    // Initialize dimensions
    getDims();
    const textMap = buildTextMap();
    if (textMap.length === 0) return;
    const d = dims.current;
    const nozzleX = d.w * NOZZLE_X_RATIO;
    const nozzleY = d.h * NOZZLE_Y_RATIO;
    const halfLen = textMap.length / 2;

    // Spawn all particles once
    const parts: Particle[] = [];
    const mainCount = Math.min(Math.floor(PARTICLE_COUNT * 0.7), halfLen);
    for (let i = 0; i < mainCount; i++) {
      const idx = Math.floor(Math.random() * halfLen) * 2;
      const tx = textMap[idx];
      const ty = textMap[idx + 1];
      parts.push({
        x: nozzleX + rng(-30, 30),
        y: nozzleY + rng(-20, 20),
        tx,
        ty,
        life: 0,
        maxLife: rng(0.4, 1) * SPRAY_DURATION,
        radius: rng(1.5, 4.5),
        type: "main",
        color: pick(COLORS.main),
        settled: false,
      });
    }

    for (let i = 0; i < Math.floor(PARTICLE_COUNT * 0.2); i++) {
      const idx = Math.floor(Math.random() * halfLen) * 2;
      const tx = textMap[idx] + rng(-25, 25);
      const ty = textMap[idx + 1] + rng(-25, 25) || d.h * 0.4;
      parts.push({
        x: nozzleX + rng(-40, 40),
        y: nozzleY + rng(-25, 25),
        tx: tx || d.w * 0.5,
        ty: ty || d.h * 0.4,
        life: 0,
        maxLife: rng(0.2, 0.6) * SPRAY_DURATION,
        radius: rng(1, 2.5),
        type: "overspray",
        color: pick(COLORS.overspray),
        settled: false,
      });
    }

    for (let i = 0; i < Math.floor(PARTICLE_COUNT * 0.1); i++) {
      parts.push({
        x: nozzleX + rng(-50, 50),
        y: nozzleY + rng(-40, 40),
        tx: d.w * 0.25 + rng(0, d.w * 0.6),
        ty: d.h * 0.2 + rng(0, d.h * 0.5),
        life: 0,
        maxLife: rng(0.1, 0.3) * SPRAY_DURATION,
        radius: rng(0.8, 2),
        type: "mist",
        color: pick(COLORS.mist),
        settled: false,
      });
    }

    particlesRef.current = parts;

    // GSAP timeline for gun + phases
    const tl = gsap.timeline({ paused: true });
    const gun = gunRef.current;

    if (gun) {
      // Enter
      tl.fromTo(gun, { x: -200, opacity: 0, rotate: -6 }, { x: 0, opacity: 1, rotate: 0, duration: 0.7, ease: "power3.out" }, 0);
      // Recoil
      tl.to(gun, { x: 8, duration: 0.04, ease: "power2.out", repeat: 16, yoyo: true, repeatDelay: 0.1 }, 0.7);
      // Exit
      tl.to(gun, { x: 180, opacity: 0, rotate: 10, duration: 0.6, ease: "power3.in" }, 3.9);
    }

    // Phase callbacks
    tl.call(() => setPhase("gun-enter"), [], 0);
    tl.call(() => { setPhase("spraying"); startTimeRef.current = performance.now() / 1000; }, [], 0.7);
    tl.call(() => setPhase("hardening"), [], 3.5);
    tl.call(() => {
      setPhase("complete");
      if (!completeRef.current) { completeRef.current = true; onComplete?.(); }
    }, [], TOTAL_DURATION);

    tl.play();

    // Canvas render loop
    const ctx = canvasRef.current?.getContext("2d");
    if (!canvasRef.current || !ctx) return;
    ctx.scale(d.dpr, d.dpr);

    let frame = 0;
    function render() {
      frame++;
      const { w, h } = dims.current;
      const now = performance.now() / 1000;
      const elapsed = startTimeRef.current ? now - startTimeRef.current : 0;
      const sprayProgress = Math.min(elapsed / SPRAY_DURATION, 1);
      const hardenProgress = elapsed > SPRAY_DURATION ? Math.min((elapsed - SPRAY_DURATION) / HARDEN_DURATION, 1) : 0;

      ctx!.clearRect(0, 0, w, h);

      // Glossy texture overlay during hardening
      if (hardenProgress > 0) {
        const grad = ctx!.createLinearGradient(0, h * 0.28, 0, h * 0.65);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.4, `rgba(255,255,255,${0.07 * hardenProgress})`);
        grad.addColorStop(0.6, `rgba(255,255,255,${0.03 * hardenProgress})`);
        grad.addColorStop(1, `rgba(255,255,255,0)`);
        ctx!.fillStyle = grad;
        ctx!.fillRect(0, 0, w, h);
      }

      // Draw particles
      let anyUnsettled = false;
      for (const p of particlesRef.current) {
        if (p.settled) {
          ctx!.fillStyle = p.color;
          ctx!.beginPath();
          ctx!.arc(p.tx, p.ty, p.radius * 0.85, 0, Math.PI * 2);
          ctx!.fill();
          continue;
        }

        // Animate each particle independently
        p.life += 1 / 60; // assume ~60fps step
        const localT = Math.min(p.life / p.maxLife, 1);
        const t = easeOutCubic(localT);

        if (localT >= 1) {
          p.settled = true;
          continue;
        }
        anyUnsettled = true;

        const nx = p.x + (p.tx - p.x) * t;
        const ny = p.y + (p.ty - p.y) * t;
        const turbulence = 10 * (1 - t);
        const dx = nx + Math.sin(p.life * 12 + p.tx) * turbulence;
        const dy = ny + Math.cos(p.life * 10 + p.ty) * turbulence;

        const alpha = t > 0.75 ? 1 - (t - 0.75) / 0.25 : 1;

        ctx!.globalAlpha = alpha;
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(dx, dy, p.radius * (1 - t * 0.35), 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;

      if (frame < 400) rafRef.current = requestAnimationFrame(render);
    }
    rafRef.current = requestAnimationFrame(render);

    return () => {
      tl.kill();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  /* Resize handler */
  useEffect(() => {
    const onResize = () => getDims();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [getDims]);

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-bone">
      <div className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: "radial-gradient(circle, var(--forest-deep,#1f3a2a) 0.5px, transparent 0.5px)", backgroundSize: "24px 24px" }} />
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      <div ref={gunRef} className="absolute z-20 pointer-events-none" style={{ left: "6%", top: "53%", transform: "translateY(-50%)" }}>
        <svg viewBox="0 0 160 100" className="w-28 h-auto md:w-36" fill="var(--forest-deep,#1f3a2a)" style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.35))" }}>
          <rect x="16" y="22" width="104" height="32" rx="6" />
          <rect x="38" y="54" width="8" height="34" rx="3" />
          <rect x="28" y="76" width="28" height="5" rx="2" />
          <polygon points="116,28 148,34 148,42 116,48" />
          <circle cx="150" cy="38" r="6" />
          <rect x="56" y="0" width="28" height="22" rx="5" />
          <rect x="60" y="4" width="20" height="16" rx="3" opacity="0.5" />
          <path d="M12 32 L2 32 Q0 32 0 30 L0 18" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
          <rect x="44" y="56" width="3" height="12" rx="1" />
        </svg>
      </div>
      <div className={`absolute left-0 right-0 z-30 text-center transition-opacity duration-700 ${phase === "complete" ? "opacity-100" : "opacity-0"}`} style={{ top: "15%" }}>
        <p className="eyebrow text-forest">— Est. Endüstriyel Yalıtım</p>
      </div>
      <div className={`absolute left-0 right-0 z-30 text-center transition-opacity duration-1000 px-4 ${phase === "complete" ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        style={{ top: "50%", transform: "translateY(-50%)" }}>
        <h1 className="font-display text-[clamp(2rem,6vw,5rem)] font-medium text-forest-deep leading-[1.05] tracking-[-0.02em]">
          {headline}
        </h1>
        <p className="font-display text-[clamp(1.8rem,5vw,4rem)] italic font-light text-forest mt-1 leading-[1.05] tracking-[-0.02em]">
          {subheadline}
        </p>
      </div>
    </div>
  );
}
