import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const cards = [
  {
    src: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=800&fit=crop",
    color: "bg-vibrant-purple",
    rot: -8,
  },
  {
    src: "https://images.unsplash.com/photo-1488751045188-3c55bbf9a3fa?w=800&h=800&fit=crop",
    color: "bg-vibrant-yellow",
    rot: 6,
  },
  {
    src: "https://images.unsplash.com/photo-1485579149621-3123dd979885?w=800&h=800&fit=crop",
    color: "bg-vibrant-coral",
    rot: -4,
  },
  {
    src: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=800&fit=crop",
    color: "bg-vibrant-mint",
    rot: 9,
  },
  {
    src: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&h=800&fit=crop",
    color: "bg-vibrant-blue",
    rot: -10,
  },
  {
    src: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?w=800&h=800&fit=crop",
    color: "bg-vibrant-lavender",
    rot: 5,
  },
];

const ScrollCardStack = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = rect.height - vh;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(total > 0 ? scrolled / total : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Pacing: each card has its own active window
  const n = cards.length;
  const segment = 1 / n;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: `${n * 90}vh` }}
      aria-label="Featured visual gallery"
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* heading overlay */}
        <div className="absolute top-10 md:top-16 left-1/2 -translate-x-1/2 text-center px-5 z-20 pointer-events-none">
          <p className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold font-sans text-background/70 mb-3">
            A field of inquiry
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold uppercase font-sans text-background leading-[0.9]">
            Youth · Media · Technology
          </h2>
        </div>

        <div className="relative w-[78vmin] h-[78vmin] max-w-[640px] max-h-[640px]">
          {[...cards].reverse().map((card, i) => {
            const start = i * segment;
            const end = start + segment * 1.6;
            const local = (progress - start) / (end - start);
            const t = Math.min(Math.max(local, 0), 1);

            // Each card starts tiny + behind, scales up to full, then drifts away
            const enter = Math.min(t * 2, 1); // 0..1 for entry
            const exit = Math.max(t * 2 - 1, 0); // 0..1 for exit

            const scale = 0.4 + enter * 0.7 - exit * 0.15;
            const opacity = enter - exit * 0.9;
            const rotate = card.rot * (1 - exit) + (i % 2 === 0 ? -25 : 25) * exit;
            const translateY = (1 - enter) * 60 + exit * -120;
            const translateX = exit * (i % 2 === 0 ? -180 : 180);

            return (
              <div
                key={i}
                className="absolute inset-0 will-change-transform"
                style={{
                  transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
                  opacity: Math.max(opacity, 0),
                  zIndex: 10 + i,
                  transition: "none",
                }}
              >
                <div
                  className={cn(
                    "relative w-full h-full rounded-3xl overflow-hidden border-2 border-foreground shadow-2xl",
                    card.color
                  )}
                >
                  <img
                    src={card.src}
                    alt=""
                    loading="lazy"
                    className="w-full h-full object-cover grayscale"
                  />
                  <div className={cn("absolute inset-0 mix-blend-multiply opacity-60", card.color)} />
                </div>
              </div>
            );
          })}
        </div>

        {/* scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-background/60 text-xs uppercase tracking-[0.3em] font-bold font-sans">
          Scroll
        </div>
      </div>
    </section>
  );
};

export default ScrollCardStack;
