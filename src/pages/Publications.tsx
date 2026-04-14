import PageLayout from "@/components/PageLayout";
import { publications, type Publication } from "@/data/cv";

const PubSection = ({ title, items }: { title: string; items: Publication[] }) => (
  <div className="mb-10">
    <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans mb-6 border-b-2 border-foreground/10 pb-3">
      {title}
    </h2>
    <div className="space-y-4">
      {items.map((pub, i) => (
        <div key={i} className="flex gap-4">
          {pub.year && (
            <span className="text-sm font-bold font-sans text-foreground/50 min-w-[50px] pt-1">{pub.year}</span>
          )}
          <p className="text-base leading-relaxed font-serif flex-1">
            {pub.citation}
            {pub.link && (
              <>
                {" "}
                <a href={pub.link} target="_blank" rel="noopener noreferrer" className="underline text-foreground/70 hover:text-foreground transition-colors">
                  [Link]
                </a>
              </>
            )}
          </p>
        </div>
      ))}
    </div>
  </div>
);

const Publications = () => {
  return (
    <PageLayout title="Publications" subtitle="Peer-reviewed articles, book chapters, edited volumes, and manuscripts in preparation.">
      <PubSection title="Edited Volumes" items={publications.editedVolumes} />
      <PubSection title="Peer-Reviewed Journal Articles" items={publications.peerReviewed} />
      <PubSection title="Book Chapters" items={publications.bookChapters} />
      <PubSection title="Conference Proceedings" items={publications.conferenceProceedings} />
      <PubSection title="Manuscripts in Preparation" items={publications.manuscriptsInPrep} />
    </PageLayout>
  );
};

export default Publications;
