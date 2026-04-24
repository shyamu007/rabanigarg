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
          "card-hover rounded-3xl overflow-hidden p-6 md:p-8 flex flex-col justify-between aspect-[4/3]",
          colorClass
        )}
      >
        <div className="px-1">
          <h2 className="text-2xl md:text-3xl font-extrabold uppercase tracking-tight font-sans mb-3 leading-tight">
            {title}
          </h2>
          <p className="text-sm md:text-base leading-relaxed text-foreground/80 font-serif line-clamp-3">
            {description}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2 font-sans font-bold uppercase text-xs tracking-wide px-1">
          EXPLORE <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
        </div>
      </article>
    </Link>
  );
};

export default SectionCard;
