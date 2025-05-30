
import { Layout } from "@/components/layout/Layout";
import { ServiceCategoryCard } from "@/components/home/ServiceCategoryCard";
import { serviceCategories } from "@/data/mockData";
import { BriefcaseMedical, CheckCircle, CircleUser, Heart, User, Video } from "lucide-react";

const ServicesPage = () => {
  const icons: Record<string, React.ReactNode> = {
    "user": <User className="h-6 w-6 text-health-500" />,
    "circle-user": <CircleUser className="h-6 w-6 text-teal-300" />,
    "heart": <Heart className="h-6 w-6 text-health-400" />,
    "circle-check": <CheckCircle className="h-6 w-6 text-teal-400" />,
    "briefcase-medical": <BriefcaseMedical className="h-6 w-6 text-health-600" />,
    "video": <Video className="h-6 w-6 text-teal-500" />
  };

  return (
    <Layout>
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Our Healthcare Services</h1>
            <p className="text-xl text-muted-foreground">
              Discover the wide range of healthcare services available through our network of trusted providers.
            </p>
          </div>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((category) => (
              <ServiceCategoryCard 
                key={category.id}
                title={category.title}
                description={category.description}
                icon={icons[category.icon]}
                href={`/services/${category.id}`}
                color={category.color}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Services</h2>
            <p className="text-muted-foreground">
              We're committed to connecting you with the best healthcare providers and making booking appointments seamless.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="bg-health-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-health-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Care</h3>
              <p className="text-muted-foreground">
                We partner with trusted healthcare providers who deliver exceptional patient care.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="bg-teal-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CircleUser className="h-8 w-8 text-teal-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Experienced Providers</h3>
              <p className="text-muted-foreground">
                Our network includes experienced practitioners across various healthcare specialties.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg text-center">
              <div className="bg-health-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BriefcaseMedical className="h-8 w-8 text-health-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Comprehensive Care</h3>
              <p className="text-muted-foreground">
                From preventive care to specialized treatments, we cover a wide range of healthcare needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicesPage;
