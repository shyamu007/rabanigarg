import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth 0..1
  r: number;
  tw: number; // twinkle phase
  twSpeed: number;
}

const Starfield = ({ density = 0.00018 }: { density?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;

    const seed = () => {
      const count = Math.floor(w * h * density);
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        const z = Math.pow(Math.random(), 2); // bias toward far (small)
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          r: 0.3 + z * 1.6,
          tw: Math.random() * Math.PI * 2,
          twSpeed: 0.005 + Math.random() * 0.02,
        });
      }
      starsRef.current = stars;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    let mouseX = 0;
    let mouseY = 0;
    let targetMX = 0;
    let targetMY = 0;
    const onMouse = (e: MouseEvent) => {
      targetMX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = () => {
      mouseX += (targetMX - mouseX) * 0.05;
      mouseY += (targetMY - mouseY) * 0.05;

      ctx.clearRect(0, 0, w, h);
      // deep space gradient
      const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
      g.addColorStop(0, "rgba(20, 12, 30, 1)");
      g.addColorStop(0.6, "rgba(8, 4, 18, 1)");
      g.addColorStop(1, "rgba(0, 0, 0, 1)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);

      const stars = starsRef.current;
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.tw += s.twSpeed;
        const twinkle = 0.55 + Math.sin(s.tw) * 0.45;
        const px = s.x + mouseX * (1 - s.z) * 18;
        const py = s.y + mouseY * (1 - s.z) * 18;
        const alpha = (0.35 + s.z * 0.65) * twinkle;
        ctx.beginPath();
        ctx.arc(px, py, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 250, 240, ${alpha})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [density]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 w-full h-full pointer-events-none -z-10"
    />
  );
};

export default Starfield;
