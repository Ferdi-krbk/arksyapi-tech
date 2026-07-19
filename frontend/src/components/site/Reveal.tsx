import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Gecikme (saniye) — sirali giris icin */
  delay?: number;
  /** Giris yonu */
  from?: "up" | "down" | "left" | "right";
  className?: string;
};

const OFFSET = 28;

/**
 * Icerigi, ekrana girdiginde yumusakca (fade + kaydirma) gosterir.
 * Kullanim:  <Reveal><h2>...</h2></Reveal>
 */
export function Reveal({ children, delay = 0, from = "up", className }: RevealProps) {
  const initial =
    from === "up" ? { opacity: 0, y: OFFSET } :
    from === "down" ? { opacity: 0, y: -OFFSET } :
    from === "left" ? { opacity: 0, x: -OFFSET } :
    { opacity: 0, x: OFFSET };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
