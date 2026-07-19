import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

/**
 * Acik/koyu tema degistirici. Secimi localStorage'a kaydeder.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const el = document.documentElement;
    const next = !el.classList.contains("dark");
    el.classList.toggle("dark", next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch { /* yoksay */ }
    setDark(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label={dark ? "Açık temaya geç" : "Koyu temaya geç"}
      className={`inline-flex items-center justify-center w-10 h-10 rounded-full border border-current/20 text-forest-deep hover:bg-forest-deep hover:text-bone transition-colors ${className}`}
    >
      {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
    </button>
  );
}
