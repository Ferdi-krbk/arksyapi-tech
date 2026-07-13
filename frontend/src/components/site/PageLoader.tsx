import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import emblem from "@/assets/arks-emblem-light.png";

/**
 * Acilis / yukleme ekrani. Sayfa ilk yuklendiginde koyu yesil zeminde
 * ARKS amblemi ile kisa bir splash gosterir, sonra yumusakca kaybolur.
 */
export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          className="fixed inset-0 z-[200] bg-forest-deep flex flex-col items-center justify-center gap-6"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          <motion.img
            src={emblem}
            alt="ARKS"
            className="w-24 h-auto md:w-28"
            width={112}
            height={138}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* ince yukleme cizgisi */}
          <div className="w-32 h-px bg-bone/20 overflow-hidden">
            <motion.div
              className="h-full bg-sage"
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ duration: 0.9, ease: "easeInOut", repeat: Infinity }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
