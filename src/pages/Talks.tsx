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
  // Flat list of all cards with their year
  const allCards = years.flatMap((year) => grouped[year].map((talk) => ({ year, talk })));
  const [activeYear, setActiveYear] = useState(years[0]);
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToYear = (year: string) => {
    const index = allCards.findIndex((c) => c.year === year);
    if (index < 0) return;
    setActiveYear(year);
    const container = scrollRef.current;
    if (container) {
      const card = container.children[index] as HTMLElement;
      card?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  return (
    <div className="space-y-4">
      {/* Year pills */}
      <div className="flex gap-2 flex-wrap mb-2">
        {years.map((year) => (
          <button
            key={year}
            onClick={() => scrollToYear(year)}
            className={`px-4 py-1.5 rounded-full text-sm font-bold font-sans uppercase tracking-wide transition-all ${
              year === activeYear
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
            const clamped = Math.max(0, Math.min(newIndex, allCards.length - 1));
            if (allCards[clamped]?.year !== activeYear) {
              setActiveYear(allCards[clamped]?.year);
            }
            setActiveCardIndex(clamped);
          }}
        >
          {years.map((year, yi) =>
            grouped[year].map((talk, ti) => (
              <div
                key={`${year}-${ti}`}
                className="snap-center shrink-0 w-[85vw] md:w-[400px] rounded-2xl p-6 md:p-8 shadow-lg flex flex-col justify-between min-h-[220px]"
                style={{
                  backgroundColor: cardColors[(yi + sectionIndex * 2 + ti) % cardColors.length],
                }}
              >
                <p className="text-sm md:text-base leading-relaxed font-sans text-foreground/85 flex-1">
                  {talk.citation}
                </p>
                <span className="mt-4 text-xs font-bold font-sans uppercase tracking-widest text-foreground/40">
                  {year}
                </span>
              </div>
            ))
          )}
        </div>

        {/* Navigation arrows */}
        {allCards.length > 1 && (
          <>
            <button
              onClick={() => {
                const prev = Math.max(0, activeCardIndex - 1);
                setActiveCardIndex(prev);
                const card = scrollRef.current?.children[prev] as HTMLElement;
                card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
              disabled={activeCardIndex === 0}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 md:-translate-x-5 bg-background/90 backdrop-blur border border-foreground/10 rounded-full p-2 shadow-md disabled:opacity-30 transition-opacity hover:bg-background"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                const next = Math.min(allCards.length - 1, activeCardIndex + 1);
                setActiveCardIndex(next);
                const card = scrollRef.current?.children[next] as HTMLElement;
                card?.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
              }}
              disabled={activeCardIndex === allCards.length - 1}
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
