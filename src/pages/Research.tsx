import { useEffect, useRef, useState } from "react";
import PageLayout from "@/components/PageLayout";
import { researchStatement, researchExperience } from "@/data/cv";
import { cn } from "@/lib/utils";

const cardColors = ["bg-vibrant-purple", "bg-vibrant-yellow"];

const RevealCard = ({
  exp,
  index,
}: {
  exp: typeof researchExperience[number];
  index: number;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-3xl p-6 md:p-10 border-2 border-foreground transition-all duration-700 ease-out",
        cardColors[index % cardColors.length],
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-16"
      )}
      style={{ transitionDelay: visible ? `${(index % 2) * 80}ms` : "0ms" }}
    >
      <div className="text-sm font-bold font-sans uppercase tracking-wide text-foreground/70 mb-2">
        {exp.years}
      </div>
      <h3 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight font-sans mb-2 leading-tight">
        {exp.title}
      </h3>
      <p className="text-lg italic mb-3 font-serif">{exp.project}</p>
      {exp.pi && (
        <p className="text-sm text-foreground/80 font-sans mb-3">{exp.pi}</p>
      )}
      <p className="text-base md:text-lg text-foreground/90 font-sans font-light leading-relaxed">
        {exp.details}
      </p>
    </div>
  );
};

const Research = () => {
  return (
    <PageLayout title={researchStatement.title} subtitle={researchStatement.subtitle}>
      <div className="space-y-12">
        <div className="space-y-6">
          <p className="text-lg md:text-xl leading-relaxed font-sans text-justify">
            {researchStatement.description}
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-sans text-justify">
            {researchStatement.extended}
          </p>
        </div>

        <hr className="border-foreground/10" />

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight font-sans mb-8">
            Research Experience
          </h2>
          <div className="space-y-6 md:space-y-8">
            {researchExperience.map((exp, i) => (
              <RevealCard key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Research;
