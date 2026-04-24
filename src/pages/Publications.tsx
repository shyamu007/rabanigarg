import { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { publications, type Publication } from "@/data/cv";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const sectionColors = [
  "bg-vibrant-purple",
  "bg-vibrant-yellow",
  "bg-vibrant-mint",
  "bg-vibrant-coral",
  "bg-vibrant-lavender",
];

const PubSection = ({
  title,
  items,
  index,
}: {
  title: string;
  items: Publication[];
  index: number;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      className={cn(
        "rounded-3xl border-2 border-foreground overflow-hidden transition-all duration-500 ease-out",
        sectionColors[index % sectionColors.length]
      )}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 p-6 md:p-8 text-left"
        aria-expanded={open}
      >
        <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans leading-tight">
          {title}
        </h2>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-sm font-bold font-sans text-foreground/70">
            {items.length}
          </span>
          <ChevronDown
            className={cn(
              "w-6 h-6 transition-transform duration-500 ease-out",
              open ? "rotate-180" : "rotate-0"
            )}
          />
        </div>
      </button>

      <div
        className={cn(
          "grid transition-all duration-500 ease-out",
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-6 md:px-8 pb-6 md:pb-8 pt-2 border-t-2 border-foreground/20">
            <div className="space-y-4 mt-4">
              {items.map((pub, i) => (
                <div key={i} className="flex gap-4">
                  {pub.year && (
                    <span className="text-sm font-bold font-sans text-foreground/70 min-w-[50px] pt-1">
                      {pub.year}
                    </span>
                  )}
                  <p className="text-base leading-relaxed flex-1 font-light font-sans text-justify">
                    {pub.citation}
                    {pub.link && (
                      <>
                        {" "}
                        <a
                          href={pub.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline font-medium hover:text-foreground transition-colors"
                        >
                          [Link]
                        </a>
                      </>
                    )}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Publications = () => {
  const sections = [
    { title: "Edited Volumes", items: publications.editedVolumes },
    { title: "Peer-Reviewed Journal Articles", items: publications.peerReviewed },
    { title: "Book Chapters", items: publications.bookChapters },
    { title: "Conference Proceedings", items: publications.conferenceProceedings },
    { title: "Manuscripts in Preparation", items: publications.manuscriptsInPrep },
  ];

  return (
    <PageLayout
      title="Publications"
      subtitle="Peer-reviewed articles, book chapters, edited volumes, and manuscripts in preparation."
    >
      <div className="space-y-6 md:space-y-8">
        {sections.map((s, i) => (
          <PubSection key={s.title} title={s.title} items={s.items} index={i} />
        ))}
      </div>
    </PageLayout>
  );
};

export default Publications;
