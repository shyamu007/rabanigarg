import PageLayout from "@/components/PageLayout";
import { invitedTalks, conferencePresentations } from "@/data/talks";
import type { Talk } from "@/data/talks";

const TalkList = ({ items }: { items: Talk[] }) => {
  const grouped = items.reduce<Record<string, Talk[]>>((acc, talk) => {
    (acc[talk.year] = acc[talk.year] || []).push(talk);
    return acc;
  }, {});

  return (
    <div className="space-y-6">
      {Object.entries(grouped)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([year, talks]) => (
          <div key={year}>
            <h3 className="text-sm font-bold font-sans uppercase tracking-wide text-foreground/50 mb-3">{year}</h3>
            <div className="space-y-3 pl-4 border-l-2 border-foreground/10">
              {talks.map((talk, i) => (
                <p key={i} className="text-base leading-relaxed font-sans">{talk.citation}</p>
              ))}
            </div>
          </div>
        ))}
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
          <TalkList items={invitedTalks} />
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans mb-8 border-b-2 border-foreground/10 pb-3">
            Conference Presentations
          </h2>
          <TalkList items={conferencePresentations} />
        </section>
      </div>
    </PageLayout>
  );
};

export default Talks;
