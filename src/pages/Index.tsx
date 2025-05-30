import { Layout } from "@/components/layout/Layout";
import { SearchForm } from "@/components/home/SearchForm";
import { ServiceCategoryCard } from "@/components/home/ServiceCategoryCard";
import { FeaturedProviders } from "@/components/home/FeaturedProviders";
import { HowItWorks } from "@/components/home/HowItWorks";
import { Testimonials } from "@/components/home/Testimonials";
import { Button } from "@/components/ui/button";
import { ArrowRight, BriefcaseMedical, CheckCircle, CircleUser, Heart, User, Video } from "lucide-react";
import { serviceCategories } from "@/data/mockData";
import { Link } from "react-router-dom";

const Index = () => {
  const icons: Record<string, React.ReactNode> = {
    "user": <User className="h-6 w-6 text-blue-500" />,
    "circle-user": <CircleUser className="h-6 w-6 text-teal-500" />,
    "heart": <Heart className="h-6 w-6 text-blue-400" />,
    "circle-check": <CheckCircle className="h-6 w-6 text-teal-500" />,
    "briefcase-medical": <BriefcaseMedical className="h-6 w-6 text-blue-600" />,
    "video": <Video className="h-6 w-6 text-teal-500" />
  };
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 hero-pattern">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 gradient-heading">
              Book Healthcare Appointments Online
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Find and book appointments with doctors, dentists, and other healthcare providers near you.
            </p>
            <SearchForm />
          </div>
        </div>
      </section>

      {/* Service Categories */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Browse by Service</h2>
              <p className="text-muted-foreground">Discover healthcare services tailored to your needs</p>
            </div>
            <Button asChild variant="outline" className="mt-4 md:mt-0">
              <Link to="/services" className="flex items-center gap-2">
                <span>All Services</span>
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category) => (
              <ServiceCategoryCard 
                key={category.id}
                title={category.title}
                description={category.description}
                icon={icons[category.icon]}
                href={`/services/${category.id}`}
                color={category.color.replace('health', 'blue')}
              />
            ))}
          </div>
          
        </div>
      </section>
      
      {/* Featured Providers Section */}
      <FeaturedProviders />
      
      {/* How It Works Section */}
      <HowItWorks />
         {/* CTA Section */}
       <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 max-w-2xl">
              <h2 className="text-3xl font-bold mb-3">Ready to Book Your Appointment?</h2>
              <p className="text-white/90 text-lg">
                Find healthcare providers near you and book appointments instantly.
              </p>
            </div>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/providers" className="text-blue-600">Find Providers</Link>
            </Button>
          </div>
        </div>
      </section> 
      {/* Testimonials Section */}
      <Testimonials />
      
   
    </Layout>
  );
};

export default Index;