import { useRef, useEffect, useState, useCallback, useMemo } from "react"
import gunImgSrc from "@/assets/gun.png"
import { useSliders, useGallery } from "@/hooks/queries"
import { SERVICES } from "@/lib/services"

type Props = { headline: string; subheadline: string; onComplete?: () => void }

function PhotoSlider() {
  const { data: sliders = [] } = useSliders()
  const { data: gallery = [] } = useGallery()
  const imgs = useMemo(() => {
    const api = sliders.filter((s) => s.image_url).map((s) => s.image_url!)
    const gal = gallery.filter((g) => g.image_url).map((g) => g.image_url!)
    return [...api, ...gal, ...SERVICES.map((s) => s.image)]
  }, [sliders, gallery])
  if (imgs.length === 0) return null
  const doubled = [...imgs, ...imgs]
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <style>{`@keyframes slideLeft{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}.slide-track{display:flex;width:max-content;animation:slideLeft ${imgs.length*6}s linear infinite}.slide-img{height:100vh;width:100vw;object-fit:cover;filter:blur(5px);flex-shrink:0;min-width:100vw}`}</style>
      <div className="slide-track">{doubled.map((u,i)=><img key={`${u}-${i}`} src={u} className="slide-img" alt="" />)}</div>
      <div className="absolute inset-0 bg-white/50" />
    </div>
  )
}

type Particle = { x: number; y: number; vx: number; vy: number; life: number; r: number; color: string }
function spawnParticles(p: Particle[], px: number, py: number, angle: number, color: string) {
  for (let i=0;i<3;i++){const s=(Math.random()-.5)*.9;const sp=2+Math.random()*2.5;p.push({x:px,y:py,vx:Math.cos(angle+s)*sp*.6,vy:Math.sin(angle+s)*sp*.6+.4,life:1,r:1+Math.random()*2,color})}
}
function stepParticles(ctx: CanvasRenderingContext2D, p: Particle[]) {
  ctx.save();for(const x of p){x.x+=x.vx;x.y+=x.vy;x.vy+=.06;x.life-=.045;ctx.globalAlpha=Math.max(x.life,0);ctx.fillStyle=x.color;ctx.beginPath();ctx.arc(x.x,x.y,x.r,0,Math.PI*2);ctx.fill()}ctx.restore()
}
function easeInOut(t:number){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}

const GUN_W=468,GUN_H=895,NX=4,NY=465
function drawGun(ctx:CanvasRenderingContext2D,img:HTMLImageElement,ready:boolean,x:number,y:number,angle:number,scale:number,da=1){
  if(!ready)return;ctx.save();ctx.translate(x,y);ctx.rotate(angle)
  ctx.save();ctx.globalAlpha=.12*da;ctx.fillStyle="#000";ctx.beginPath();ctx.ellipse(-scale*90,scale*60,scale*70,scale*16,0,0,Math.PI*2);ctx.fill();ctx.restore()
  ctx.scale(-scale,scale);ctx.globalAlpha=da;ctx.drawImage(img,-NX,-NY,GUN_W,GUN_H);ctx.restore()
}

export function SprayHero({ headline, subheadline, onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ghost1Ref = useRef<HTMLSpanElement>(null)
  const ghost2Ref = useRef<HTMLSpanElement>(null)
  const measure1Ref = useRef<HTMLSpanElement>(null)
  const measure2Ref = useRef<HTMLSpanElement>(null)
  const paint1Ref = useRef<HTMLSpanElement>(null)
  const paint2Ref = useRef<HTMLSpanElement>(null)
  const [animDone, setAnimDone] = useState(false)
  const runningRef = useRef(false)
  const cleanupRef = useRef<(()=>void)|null>(null)
  const gunImg = useRef<HTMLImageElement|null>(null)
  const gunReady = useRef(false)

  useEffect(()=>{const i=new Image();i.onload=()=>{gunReady.current=true};i.src=gunImgSrc;gunImg.current=i},[])

  const clearCanvas = useCallback(()=>{const c=canvasRef.current;if(!c)return;const cx=c.getContext("2d");if(cx)cx.clearRect(0,0,c.width,c.height)},[])

  const play = useCallback(() => {
    if(runningRef.current)return;runningRef.current=true
    const container=containerRef.current
    if(!canvasRef.current||!container)return
    const canvas=canvasRef.current
    const ctx=canvas.getContext("2d")
    if(!ctx)return

    const dpr=window.devicePixelRatio||1
    const resize=()=>{const r=container.getBoundingClientRect();canvas.width=r.width*dpr;canvas.height=r.height*dpr;canvas.style.width=r.width+"px";canvas.style.height=r.height+"px";ctx.setTransform(dpr,0,0,dpr,0,0)}
    resize();window.addEventListener("resize",resize)

    if(paint1Ref.current)paint1Ref.current.style.clipPath="inset(0 100% 0 0)"
    if(paint2Ref.current)paint2Ref.current.style.clipPath="inset(0 100% 0 0)"
    const particles:Particle[]=[]
    let raf=0

    // Measure ghost spans — they render at the ACTUAL text position (centered via flex)
    const measure=(el:HTMLElement)=>{const sr=container.getBoundingClientRect();const r=el.getBoundingClientRect();return{x:r.left-sr.left,y:r.top-sr.top,w:r.width,h:r.height}}
    // Position from paint spans (correct screen location), width from measure spans (nowrap exact width)
    const p1=paint1Ref.current?measure(paint1Ref.current):{x:0,y:0,w:300,h:60}
    const p2=paint2Ref.current?measure(paint2Ref.current):{x:0,y:80,w:300,h:60}
    const m1=measure1Ref.current?measure(measure1Ref.current):{x:0,y:0,w:300,h:60}
    const m2=measure2Ref.current?measure(measure2Ref.current):{x:0,y:0,w:300,h:60}
    // Use paint position + measure width
    const g1={x:p1.x, y:p1.y, h:p1.h, w:m1.w}
    const g2={x:p2.x, y:p2.y, h:p2.h, w:m2.w}

    const T1_END=.55,TRAVEL_END=.65,DURATION=5000
    const GUN_SCALE=Math.min(.16,container.getBoundingClientRect().width/5500)
    const start=performance.now()

    function frame(now:number){
      const t=Math.min((now-start)/DURATION,1)
      ctx!.clearRect(0,0,canvas!.width,canvas!.height)
      let gx:number,gy:number,angle:number

      if(t<=T1_END){
        const local=easeInOut(t/T1_END)
        if(paint1Ref.current)paint1Ref.current.style.clipPath=`inset(0 ${Math.max(0,100-local*100)}% 0 0)`
        gx=g1.x+local*g1.w;gy=g1.y+g1.h*.62;angle=-.1
        if(local>.02&&local<.99)spawnParticles(particles,gx,gy,angle,"#111")
      }else if(t<=TRAVEL_END){
        const local=easeInOut((t-T1_END)/(TRAVEL_END-T1_END))
        gx=(g1.x+g1.w)+((g2.x)-(g1.x+g1.w))*local;gy=(g1.y+g1.h*.62)+((g2.y+g2.h*.58)-(g1.y+g1.h*.62))*local;angle=-.1+.15*local
      }else{
        const local=easeInOut((t-TRAVEL_END)/(1-TRAVEL_END))
        if(paint2Ref.current)paint2Ref.current.style.clipPath=`inset(0 ${Math.max(0,100-local*100)}% 0 0)`
        gx=g2.x+local*g2.w;gy=g2.y+g2.h*.58;angle=.05
        if(local>.02&&local<.99)spawnParticles(particles,gx,gy,angle,"#7fa98e")
      }

      if(t>.88){const dp=Math.min((t-.88)/.12,1);drawGun(ctx!,gunImg.current!,gunReady.current,gx,gy,angle,GUN_SCALE,1-dp);if(t<.995)for(let i=0;i<10;i++)particles.push({x:gx+(Math.random()-.5)*80,y:gy+(Math.random()-.5)*100,vx:(Math.random()-.5)*4,vy:(Math.random()-.5)*4-2,life:.4+Math.random()*.6,r:1.5+Math.random()*4,color:["#3a3632","#2e2a27","#4a4640","#2c2824","#1c1a18"][Math.floor(Math.random()*5)]})}
      else drawGun(ctx!,gunImg.current!,gunReady.current,gx,gy,angle,GUN_SCALE)
      stepParticles(ctx!,particles)
      if(t<1||particles.length>0)raf=requestAnimationFrame(frame)
      else{setAnimDone(true);onComplete?.()}
    }
    raf=requestAnimationFrame(frame)
    cleanupRef.current=()=>{cancelAnimationFrame(raf);window.removeEventListener("resize",resize)}
    return cleanupRef.current
  },[onComplete])

  const replay=useCallback(()=>{cleanupRef.current?.();clearCanvas();if(paint1Ref.current)paint1Ref.current.style.clipPath="inset(0 100% 0 0)";if(paint2Ref.current)paint2Ref.current.style.clipPath="inset(0 100% 0 0)";runningRef.current=false;setAnimDone(false);setTimeout(()=>play(),50)},[play,clearCanvas])

  useEffect(()=>{if(animDone)return;const el=containerRef.current;if(!el)return;const io=new IntersectionObserver((e)=>{e.forEach((x)=>{if(x.isIntersecting){setTimeout(()=>{play();io.disconnect()},1200)}})},{threshold:.4});io.observe(el);return()=>io.disconnect()},[play,animDone])

  return (
    <div ref={containerRef} className="relative w-full min-h-dvh overflow-hidden" style={{background:"linear-gradient(180deg,#f4f4f2,#e9e9e6)"}}>
      <PhotoSlider />
      <canvas ref={canvasRef} className="absolute inset-0 z-30 pointer-events-none" />

      {/* Hidden measurement spans — nowrap for exact width, never visible */}
      <div className="absolute overflow-hidden pointer-events-none" style={{opacity:0,visibility:"hidden",left:0,top:0}}>
        <span ref={measure1Ref} className="text-[clamp(28px,7vw,72px)] font-bold" style={{whiteSpace:"nowrap"}}>{headline}</span>
        <br />
        <span ref={measure2Ref} className="text-[clamp(28px,7vw,72px)] font-medium italic" style={{whiteSpace:"nowrap"}}>{subheadline}</span>
      </div>

      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4 w-full">
        <p className="eyebrow text-[#9aa39c] mb-4 tracking-[0.2em] text-xs font-semibold" style={{letterSpacing:".2em"}}><span style={{color:"#7fa98e"}}>— </span>EST. ENDÜSTRİYEL YALITIM</p>

        <h1 className="text-[clamp(28px,7vw,72px)] font-bold leading-[1.08] text-[#111] m-0 relative" style={{overflowWrap:"break-word",wordBreak:"break-word",maxWidth:"100%"}}>
          <span className="opacity-10" style={{overflowWrap:"break-word"}}>{headline}</span>
          <span ref={paint1Ref} className="absolute left-0 top-0 text-[#111]" style={{clipPath:"inset(0 100% 0 0)",overflowWrap:"break-word"}}>{headline}</span>
        </h1>

        <h1 className="text-[clamp(28px,7vw,72px)] font-medium italic leading-[1.08] m-0 mt-0 relative" style={{WebkitTextStroke:"1px rgba(0,0,0,0.4)",overflowWrap:"break-word",maxWidth:"100%"}}>
          <span className="opacity-10" style={{overflowWrap:"break-word",WebkitTextStroke:"0"}}>{subheadline}</span>
          <span ref={paint2Ref} className="absolute left-0 top-0" style={{clipPath:"inset(0 100% 0 0)",overflowWrap:"break-word",WebkitTextStroke:"1px rgba(0,0,0,0.4)",color:"#7fa98e"}}>{subheadline}</span>
        </h1>
      </div>

      {animDone&&<button onClick={replay} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#111] text-white border-none py-2.5 px-6 rounded-full text-sm cursor-pointer opacity-80 hover:opacity-100 transition-opacity">▶ Animasyonu tekrar oynat</button>}
    </div>
  )
}
