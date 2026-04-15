import { useCallback, useRef, useState, useEffect } from "react";
import {
  Sparkles, Star, Heart, Zap, Globe, BookOpen, Film, Mic,
  Lightbulb, Pen, Camera, Music, Coffee, Rocket, Award
} from "lucide-react";

const ICONS = [Sparkles, Star, Heart, Zap, Globe, BookOpen, Film, Mic, Lightbulb, Pen, Camera, Music, Coffee, Rocket, Award];
const COLORS = [
  "text-vibrant-purple", "text-vibrant-coral", "text-vibrant-yellow",
  "text-vibrant-mint", "text-vibrant-blue", "text-primary"
];

interface FloatingIcon {
  id: number;
  x: number;
  y: number;
  Icon: typeof Star;
  color: string;
  size: number;
}

let iconId = 0;

const FloatingIcons = () => {
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const lastSpawn = useRef(0);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    if (now - lastSpawn.current < 100) return;
    lastSpawn.current = now;

    const newIcon: FloatingIcon = {
      id: iconId++,
      x: e.pageX + (Math.random() - 0.5) * 40,
      y: e.pageY + (Math.random() - 0.5) * 40,
      Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 14 + Math.random() * 14,
    };

    setIcons((prev) => [...prev.slice(-20), newIcon]);
    setTimeout(() => {
      setIcons((prev) => prev.filter((i) => i.id !== newIcon.id));
    }, 900);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {icons.map(({ id, x, y, Icon, color, size }) => (
        <span
          key={id}
          className={`absolute ${color} animate-icon-pop`}
          style={{ left: x, top: y, transform: "translate(-50%,-50%)" }}
        >
          <Icon size={size} />
        </span>
      ))}
    </div>
  );
};

export default FloatingIcons;
