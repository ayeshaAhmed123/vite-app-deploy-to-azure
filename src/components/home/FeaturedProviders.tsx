
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ProviderCard } from "@/components/providers/ProviderCard";
import { Allproviders, mockProviders } from "@/data/mockData";

export const FeaturedProviders = () => {
  // Get 3 featured providers
  const featuredProviders = Allproviders.slice(0, 3);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Featured Healthcare Providers</h2>
            <p className="text-muted-foreground">Top-rated clinics and healthcare professionals</p>
          </div>
          <Button asChild variant="outline" className="mt-4 md:mt-0">
            <Link to="/providers">View all providers</Link>
          </Button>
        </div>
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} image={provider?.image} />
          ))}
        </div>
      </div>
    </section>
  );
};
