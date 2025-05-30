
import { Select } from "@/components/ui/select";
import { 
  Select as SelectPrimitive,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface ProvidersSortBarProps {
  count: number;
  onSortChange?: (sortBy: string) => void;
}

export const ProvidersSortBar = ({ count, onSortChange }: ProvidersSortBarProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <p className="text-muted-foreground">
        {count} providers found
      </p>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Sort by:</span>
        <SelectPrimitive value="relevance" onValueChange={onSortChange}>
          <SelectTrigger className="text-sm border rounded px-2 py-1 w-[140px]">
            <SelectValue placeholder="Relevance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="rating_high_to_low">Rating (High to Low)</SelectItem>
            <SelectItem value="distance">Distance</SelectItem>
          </SelectContent>
        </SelectPrimitive>
      </div>
    </div>
  );
};
