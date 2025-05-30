
import { Provider } from "@/types";
import { ProvidersEmptyState } from "./ProvidersEmptyState";
import { ProvidersLoadingState } from "./ProvidersLoadingState";
import { ProvidersSortBar } from "./ProvidersSortBar";
import { Link } from "react-router-dom";
import { MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { mockProviders } from "@/data/mockData";

interface ProvidersListViewProps {
  providers: Provider[];
  loading: boolean;
  onSortChange?: (sortBy: string) => void;
}

export const ProvidersListView = ({ providers, loading, onSortChange }: ProvidersListViewProps) => {
  if (loading) {
    return <ProvidersLoadingState />;
  }

  if (providers.length === 0) {
    return <ProvidersEmptyState />;
  }

  const mockData = mockProviders
  return (
    <div>
      <ProvidersSortBar count={providers.length} onSortChange={onSortChange} />
      
      <div className="flex flex-col gap-4 mt-6">
        {providers.map((provider:any, index) => {
        
        return(
          <div 
            key={provider.id} 
            className="border bg-white rounded-lg overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="md:w-1/4 aspect-video md:aspect-auto">
              <img
                src={mockData[index]?.image}
                alt={provider.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4 md:p-6 flex-grow flex flex-col">
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-lg">{provider.providerName}</h3>
                <div className="flex items-center gap-1">
                  {/* <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" /> */}
                  <span className="font-medium">{provider.discription}</span>
                </div>
              </div>
              
              <div className="flex items-center text-muted-foreground text-sm mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{provider.location? provider.location+"," : ""} {provider.city? provider.city+"," : ""} {provider.country}</span>
              </div>
              
              <div className="flex items-center text-muted-foreground text-sm mt-1 mb-3">
                <Clock className="h-4 w-4 mr-1" />
                <span>{provider.hours}</span>
              </div>
              
              <div className="mt-auto">
                <div className="flex flex-wrap gap-2 mb-4">
                  {provider.service.slice(0, 3).map((item, index) => (
                    <Badge key={index} variant="secondary" className="font-normal">
                      {item?.serviceName}
                    </Badge>
                  ))}
                  {provider.service.length > 3 && (
                    <Badge variant="outline" className="font-normal">
                      +{provider.service.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-3 mt-2">
                  {provider.isOpen && (
                    <Badge className="bg-teal-500/90">
                      <span className="flex items-center">
                        <span className="mr-1.5 h-2 w-2 rounded-full bg-white animate-pulse" />
                        Open Now
                      </span>
                    </Badge>
                  )}
                  
                  <div className="flex items-center gap-2 ml-auto">
                    <Button asChild variant="outline" size="sm">
                      <Link to={`/providers/${provider.id}`}>View Profile</Link>
                    </Button>
                    <Button asChild size="sm">
                      <Link to={`/booking?providerid=${provider?.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
};