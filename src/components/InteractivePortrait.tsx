import { useCallback, useRef, useState } from "react";
import profileImg from "@/assets/profile-photo.png";
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

const InteractivePortrait = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [icons, setIcons] = useState<FloatingIcon[]>([]);
  const lastSpawn = useRef(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastSpawn.current < 120) return;
    lastSpawn.current = now;

    const rect = containerRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newIcon: FloatingIcon = {
      id: iconId++,
      x: x + (Math.random() - 0.5) * 40,
      y: y + (Math.random() - 0.5) * 40,
      Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 14 + Math.random() * 10,
    };

    setIcons((prev) => [...prev.slice(-12), newIcon]);
    setTimeout(() => {
      setIcons((prev) => prev.filter((i) => i.id !== newIcon.id));
    }, 800);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6 cursor-pointer"
    >
      <img
        src={profileImg}
        alt="R. Garg"
        width={512}
        height={512}
        className="w-full h-full object-cover object-top rounded-full"
      />
      {icons.map(({ id, x, y, Icon, color, size }) => (
        <span
          key={id}
          className={`absolute pointer-events-none ${color} animate-icon-pop`}
          style={{ left: x, top: y, transform: "translate(-50%,-50%)" }}
        >
          <Icon size={size} />
        </span>
      ))}
    </div>
  );
};

export default InteractivePortrait;
