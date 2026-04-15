import { useState, useRef } from "react";
import PageLayout from "@/components/PageLayout";
import { invitedTalks, conferencePresentations } from "@/data/talks";
import type { Talk } from "@/data/talks";
import { ChevronLeft, ChevronRight } from "lucide-react";

const cardColors = [
  "var(--card-yellow)",
  "var(--card-purple)",
  "var(--color-primary)",
  "var(--accent-pink)",
];

const YearCardDeck = ({ items, sectionIndex }: { items: Talk[]; sectionIndex: number }) => {
  const grouped = items.reduce<Record<string, Talk[]>>((acc, talk) => {
    (acc[talk.year] = acc[talk.year] || []).push(talk);
    return acc;
  }, {});

  const years = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollTo = (index: number) => {
    const clamped = Math.max(0, Math.min(index, years.length - 1));
    setActiveIndex(clamped);
    const container = scrollRef.current;
    if (container) {
      const card = container.children[clamped] as HTMLElement;
      card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
    }
  };

  return (
    <div className="space-y-4">
      {/* Year pills */}
      <div className="flex gap-2 flex-wrap mb-2">
        {years.map((year, i) => (
          <button
            key={year}
            onClick={() => scrollTo(i)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold font-sans uppercase tracking-wide transition-all ${
              i === activeIndex
                ? "bg-foreground text-background scale-105"
                : "bg-foreground/10 text-foreground/60 hover:bg-foreground/20"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Card slider */}
      <div className="relative">
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
          onScroll={() => {
            const container = scrollRef.current;
            if (!container) return;
            const scrollLeft = container.scrollLeft;
            const cardWidth = (container.children[0] as HTMLElement)?.offsetWidth || 300;
            const gap = 20;
            const newIndex = Math.round(scrollLeft / (cardWidth + gap));
            if (newIndex !== activeIndex && newIndex >= 0 && newIndex < years.length) {
              setActiveIndex(newIndex);
            }
          }}
        >
          {years.map((year, yi) => (
            <div
              key={year}
              className="snap-center shrink-0 w-[85vw] md:w-[600px] rounded-2xl p-6 md:p-8 shadow-lg transition-transform"
              style={{
                backgroundColor: cardColors[(yi + sectionIndex * 2) % cardColors.length],
              }}
            >
              <h3 className="text-3xl md:text-4xl font-extrabold font-sans mb-5 text-foreground/90">
                {year}
              </h3>
              <div className="space-y-4">
                {grouped[year].map((talk, i) => (
                  <div
                    key={i}
                    className="bg-background/40 backdrop-blur-sm rounded-xl p-4"
                  >
                    <p className="text-sm md:text-base leading-relaxed font-sans text-foreground/85">
                      {talk.citation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {years.length > 1 && (
          <>
            <button
              onClick={() => scrollTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 bg-background/90 backdrop-blur border border-foreground/10 rounded-full p-2 shadow-md disabled:opacity-30 transition-opacity hover:bg-background"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scrollTo(activeIndex + 1)}
              disabled={activeIndex === years.length - 1}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 md:translate-x-5 bg-background/90 backdrop-blur border border-foreground/10 rounded-full p-2 shadow-md disabled:opacity-30 transition-opacity hover:bg-background"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

const Talks = () => {
  return (
    <PageLayout title="Talks & Presentations" subtitle="Invited talks, workshops, and conference presentations.">
      <div className="space-y-14">
        <section>
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans mb-8 border-b-2 border-foreground/10 pb-3">
            Invited Talks & Workshops
          </h2>
          <YearCardDeck items={invitedTalks} sectionIndex={0} />
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans mb-8 border-b-2 border-foreground/10 pb-3">
            Conference Presentations
          </h2>
          <YearCardDeck items={conferencePresentations} sectionIndex={1} />
        </section>
      </div>
    </PageLayout>
  );
};

export default Talks;
