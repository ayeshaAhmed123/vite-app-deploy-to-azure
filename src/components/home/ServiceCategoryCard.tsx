
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ServiceCategoryCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export const ServiceCategoryCard = ({ 
  title, 
  description, 
  icon, 
  href, 
  color 
}: ServiceCategoryCardProps) => {
  return (
    <Link
      to={href}
      className={cn(
        "block group relative overflow-hidden rounded-xl p-6 card-shadow hover:shadow-md transition-all duration-300 bg-white",
        "border hover:border-health-200"
      )}
    >
      <div 
        className={cn(
          "absolute top-0 left-0 w-1 h-full transition-all duration-300",
          color
        )}
      />
      <div className="mb-4">
        <div className={cn("p-2 rounded-full inline-flex items-center justify-center", `bg-${color.split('-')[0]}-100`)}>
          {icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
      <div className="mt-4 flex items-center text-sm font-medium text-health-500 group-hover:text-health-600 transition-colors">
        <span>Learn more</span>
        <ArrowRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
      </div>
    </Link>
  );
};
