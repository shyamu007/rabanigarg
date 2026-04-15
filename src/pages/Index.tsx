import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SectionCard from "@/components/SectionCard";
import InteractivePortrait from "@/components/InteractivePortrait";
import FloatingIcons from "@/components/FloatingIcons";
import { researchStatement } from "@/data/cv";

const sections = [
  {
    title: "Research",
    description: "Youth cultures, new media technologies, AI, and digital infrastructures in education.",
    to: "/research",
    colorClass: "bg-vibrant-purple",
  },
  {
    title: "Publications",
    description: "Peer-reviewed articles, book chapters, edited volumes, and conference proceedings.",
    to: "/publications",
    colorClass: "bg-vibrant-yellow",
  },
  {
    title: "Creative Portfolio",
    description: "Documentary films, media festival curation, and participatory media projects.",
    to: "/portfolio",
    colorClass: "bg-vibrant-coral",
  },
  {
    title: "Talks & Presentations",
    description: "Invited talks, workshops, and conference presentations across institutions worldwide.",
    to: "/talks",
    colorClass: "bg-vibrant-mint",
  },
  {
    title: "Curriculum Vitae",
    description: "Education, awards, teaching experience, professional service, and more.",
    to: "/cv",
    colorClass: "bg-vibrant-blue",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <FloatingIcons />
      <Header />

      <main>
        {/* Hero Section */}
        <section className="px-5 md:px-20 pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto text-center">
            <InteractivePortrait />
            <h1 className="text-5xl md:text-[100px] font-extrabold uppercase text-center mb-8 leading-[0.8] tracking-[-2px] max-[700px]:tracking-[-1px]">
              R. GARG
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80 max-w-3xl mx-auto mb-4 font-serif">
              {researchStatement.description}
            </p>
            <p className="text-base md:text-lg leading-relaxed text-foreground/60 max-w-3xl mx-auto font-serif">
              {researchStatement.extended}
            </p>
          </div>
        </section>

        {/* Section Cards Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-5 gap-5 md:pt-8 md:px-20 md:pb-16 md:gap-8">
          {sections.map((section) => (
            <SectionCard key={section.to} {...section} />
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
