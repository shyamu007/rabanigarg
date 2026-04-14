import PageLayout from "@/components/PageLayout";
import { education, awards, teaching, languages, professionalOrgs } from "@/data/cv";

const CV = () => {
  return (
    <PageLayout title="Curriculum Vitae">
      <div className="space-y-12">
        {/* Education */}
        <section>
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans mb-6 border-b-2 border-foreground/10 pb-3">
            Education
          </h2>
          <div className="space-y-6">
            {education.map((edu, i) => (
              <div key={i} className="border-l-2 border-foreground/20 pl-6">
                <div className="text-sm font-bold font-sans uppercase tracking-wide text-foreground/60 mb-1">{edu.year}</div>
                <h3 className="text-lg font-bold font-sans">{edu.degree}</h3>
                {edu.division && <p className="text-sm text-foreground/70 font-sans">{edu.division}</p>}
                <p className="text-base font-serif">{edu.institution}</p>
                {edu.details && <p className="text-sm text-foreground/70 font-serif mt-1 italic">{edu.details}</p>}
              </div>
            ))}
          </div>
        </section>

        {/* Awards */}
        <section>
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans mb-6 border-b-2 border-foreground/10 pb-3">
            Awards, Grants & Fellowships
          </h2>
          <div className="space-y-3">
            {awards.map((award, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-sm font-bold font-sans text-foreground/50 min-w-[70px] pt-0.5">{award.year}</span>
                <p className="text-base font-serif flex-1">{award.title}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teaching */}
        <section>
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans mb-6 border-b-2 border-foreground/10 pb-3">
            Teaching Experience
          </h2>
          <div className="space-y-8">
            {teaching.map((t, i) => (
              <div key={i}>
                <h3 className="text-lg font-bold font-sans mb-1">{t.role}</h3>
                <p className="text-sm text-foreground/70 font-sans mb-3">{t.institution}</p>
                <ul className="space-y-1.5 pl-4">
                  {t.courses.map((course, j) => (
                    <li key={j} className="text-base font-serif list-disc">{course}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Languages */}
        <section>
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans mb-6 border-b-2 border-foreground/10 pb-3">
            Language Proficiency
          </h2>
          <ul className="space-y-2">
            {languages.map((lang, i) => (
              <li key={i} className="text-base font-serif">{lang}</li>
            ))}
          </ul>
        </section>

        {/* Professional Organizations */}
        <section>
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans mb-6 border-b-2 border-foreground/10 pb-3">
            Professional Organizations
          </h2>
          <ul className="space-y-2">
            {professionalOrgs.map((org, i) => (
              <li key={i} className="text-base font-serif">{org}</li>
            ))}
          </ul>
        </section>
      </div>
    </PageLayout>
  );
};

export default CV;
