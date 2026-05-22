
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface CommercialHeaderProps {
  title: string;
  description?: string;
  showBack?: boolean;
}

export function CommercialHeader({ title, description, showBack = true }: CommercialHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-start">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        {description && (
          <p className="text-muted-foreground text-lg">{description}</p>
        )}
      </div>
      <div className="flex gap-2">
        {showBack && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate(-1)}
          >
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        )}
        <Button 
          variant="outline"
          size="sm"
          onClick={() => navigate("/commercial/dashboard")}
        >
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
      </div>
    </div>
  );
}
