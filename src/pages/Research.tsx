import PageLayout from "@/components/PageLayout";
import { researchStatement, researchExperience } from "@/data/cv";

const Research = () => {
  return (
    <PageLayout title={researchStatement.title} subtitle={researchStatement.subtitle}>
      <div className="space-y-12">
        <div className="space-y-6 font-serif">
          <p className="text-lg md:text-xl leading-relaxed font-sans">{researchStatement.description}</p>
          <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-sans">{researchStatement.extended}</p>
        </div>

        <hr className="border-foreground/10" />

        <div>
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight font-sans mb-8">
            Research Experience
          </h2>
          <div className="space-y-8">
            {researchExperience.map((exp, i) => (
              <div key={i} className="border-l-2 border-foreground/20 pl-6">
                <div className="text-sm font-bold font-sans uppercase tracking-wide text-foreground/60 mb-1">
                  {exp.years}
                </div>
                <h3 className="text-xl font-bold font-sans mb-1">{exp.title}</h3>
                <p className="text-lg italic mb-2 font-sans">{exp.project}</p>
                {exp.pi && <p className="text-sm text-foreground/70 font-sans">{exp.pi}</p>}
                <p className="text-base text-foreground/80 mt-2 font-sans font-light">{exp.details}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default Research;
