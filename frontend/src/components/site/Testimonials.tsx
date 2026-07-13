import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTestimonials } from "@/hooks/queries";

type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  content: string;
  rating: number;
};

export function Testimonials() {
  const { data: items = [] } = useTestimonials();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);

  useEffect(() => {
    if (items.length <= 1 || paused) return;
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [items.length, paused, next]);

  if (items.length === 0) return null;

  const t = items[index % items.length];

  return (
    <section className="py-24 lg:py-40 bg-sage-soft/30">
      <div className="container-editorial">
        <p className="eyebrow text-forest mb-12 text-center">— Müşterilerimiz Ne Diyor</p>

        <div
          className="relative max-w-3xl mx-auto min-h-[240px] flex flex-col items-center justify-center text-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="text-sage text-2xl mb-6 tracking-widest">
                {"★".repeat(Math.max(1, Math.min(5, t.rating)))}
              </div>
              <p className="font-display text-2xl md:text-3xl text-forest-deep leading-snug">
                "{t.content}"
              </p>
              <footer className="mt-8">
                <p className="font-display text-lg text-forest-deep">{t.name}</p>
                {t.role && <p className="text-sm text-muted-foreground mt-1">{t.role}</p>}
              </footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {items.length > 1 && (
          <div className="flex justify-center gap-2 mt-12">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Yorum ${i + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-forest-deep" : "w-2 bg-forest-deep/30 hover:bg-forest-deep/50"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
