import PageLayout from "@/components/PageLayout";
import { portfolioProjects } from "@/data/portfolio";
import { ExternalLink } from "lucide-react";

const categoryLabels = {
  video: "Video / Film",
  curation: "Curation",
  participatory: "Participatory Media",
};

const categoryColors = {
  video: "bg-vibrant-purple",
  curation: "bg-vibrant-coral",
  participatory: "bg-vibrant-mint",
};

const Portfolio = () => {
  const categories = ["video", "curation", "participatory"] as const;

  return (
    <PageLayout title="Creative Portfolio" subtitle="Documentary shorts, audio storytelling, multimodal media festival curation, and participatory media projects.">
      <div className="space-y-16">
        {categories.map((cat) => {
          const projects = portfolioProjects.filter((p) => p.category === cat);
          if (projects.length === 0) return null;
          return (
            <section key={cat}>
              <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-tight font-sans mb-8 border-b-2 border-foreground/10 pb-3">
                {categoryLabels[cat]}
              </h2>
              <div className="space-y-8">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`rounded-3xl p-6 md:p-8 ${categoryColors[cat]}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-extrabold font-sans tracking-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm font-sans font-bold uppercase tracking-wide text-foreground/60 mt-1">
                          {project.year} · {project.role}
                        </p>
                        <p className="text-sm font-sans text-foreground/70">{project.type}</p>
                      </div>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-transparent text-xs py-2 px-5 self-start flex items-center gap-2 mt-2 md:mt-0"
                        >
                          VIEW <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <p className="text-base leading-relaxed text-foreground/85 font-sans">
                      {project.description}
                    </p>
                    {project.password && (
                      <p className="text-xs font-sans mt-4 text-foreground/50 uppercase tracking-wide">
                        Password: {project.password}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </PageLayout>
  );
};

export default Portfolio;
