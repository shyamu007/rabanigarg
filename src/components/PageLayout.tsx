import { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
}

const PageLayout = ({ children, title, subtitle }: PageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="px-5 md:px-20 pt-12 md:pt-20 pb-8 md:pb-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold uppercase tracking-tight font-sans mb-4 leading-tight">
              {title}
            </h1>
            {subtitle && (
              <p className="text-lg md:text-xl text-foreground/70 mb-8 font-sans font-semibold">
                {subtitle}
              </p>
            )}
          </div>
        </section>
        <section className="px-5 md:px-20 pb-16 md:pb-24">
          <div className="max-w-4xl mx-auto">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default PageLayout;
