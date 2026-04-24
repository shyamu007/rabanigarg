import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface SectionCardProps {
  title: string;
  description: string;
  to: string;
  colorClass: string;
}

const SectionCard = ({ title, description, to, colorClass }: SectionCardProps) => {
  return (
    <Link to={to} className="block">
      <article
        className={cn(
          "card-hover rounded-3xl overflow-hidden p-8 md:p-10 flex flex-col justify-between h-[260px]",
          colorClass
        )}
      >
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold uppercase tracking-tight font-sans mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-base md:text-lg leading-relaxed text-foreground/80 font-serif line-clamp-3">
            {description}
          </p>
        </div>
        <div className="mt-6 flex items-center gap-2 font-sans font-bold uppercase text-sm tracking-wide">
          EXPLORE <ArrowRight className="w-4 h-4" />
        </div>
      </article>
    </Link>
  );
};

export default SectionCard;
