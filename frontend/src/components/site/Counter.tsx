import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

type CounterProps = {
  /** Hedef sayi (orn. 100) */
  value: number;
  /** Sayidan sonra gelen ek (orn. "+") */
  suffix?: string;
  /** Basa gelen ek (orn. "0") */
  prefix?: string;
  duration?: number;
  className?: string;
};

/**
 * Ekrana girdiginde 0'dan hedef degere kadar sayan animasyonlu sayac.
 */
export function Counter({ value, suffix = "", prefix = "", duration = 1500, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}{display}{suffix}
    </span>
  );
}
