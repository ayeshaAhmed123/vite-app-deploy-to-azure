
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const ProvidersEmptyState = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center h-64">
      <div className="text-center">
        <p className="text-xl font-medium mb-2">No providers found</p>
        <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
        <Button variant="outline" onClick={() => navigate("/")}>
          Back to home
        </Button>
      </div>
    </div>
  );
};
