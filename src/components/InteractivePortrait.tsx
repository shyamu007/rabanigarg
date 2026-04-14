import { useEffect, useRef, useState } from "react";
import profileImg from "@/assets/profile-nobg.png";

const InteractivePortrait = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height * 0.32; // approximate eye level
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxOffset = 3;
      const factor = Math.min(dist / 300, 1);
      setEyeOffset({
        x: (dx / (dist || 1)) * maxOffset * factor,
        y: (dy / (dist || 1)) * maxOffset * factor,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-6">
      {/* Profile image */}
      <img
        src={profileImg}
        alt="R. Garg"
        width={512}
        height={512}
        className="w-full h-full object-cover object-top rounded-full"
      />
      {/* Eye overlay - two small circles that follow the mouse */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
      >
        {/* Left eye pupil */}
        <circle
          cx={43.5 + eyeOffset.x}
          cy={36 + eyeOffset.y}
          r="1.8"
          fill="#1a1a1a"
          opacity="0.85"
        />
        {/* Right eye pupil */}
        <circle
          cx={56 + eyeOffset.x}
          cy={36 + eyeOffset.y}
          r="1.8"
          fill="#1a1a1a"
          opacity="0.85"
        />
      </svg>
    </div>
  );
};

export default InteractivePortrait;
