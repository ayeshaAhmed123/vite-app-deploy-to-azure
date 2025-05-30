
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CalendarCheck, Clock, Globe, Mail, MapPin, Phone, Star } from "lucide-react";
import { Provider } from "@/types";
import { mockProviders } from "@/data/mockData";
import { useSelector } from "react-redux";

const ProviderDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [provider, setProvider] = useState<Provider | null | any>(null);
  const [loading, setLoading] = useState(true);
  const { SearchProvidersFromOctansServiceData, isSearchProvidersFromOctansServiceDataLoading } = useSelector((state: any) => state.SearchProvidersFromOctansService);
  
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const foundProvider =SearchProvidersFromOctansServiceData && SearchProvidersFromOctansServiceData?.find(p => p.providerID === id);
      if (foundProvider) {
        setProvider({...foundProvider, image: mockProviders[0]?.image});
      }
      setLoading(false);
    }, 500);
  }, [id]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-health-200 border-t-health-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading provider details...</p>
          </div>
        </div>
      </Layout>
    );
  }
  
  if (!provider) {
    return (
      <Layout>
        <div className="container py-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-3">Provider Not Found</h2>
            <p className="text-muted-foreground mb-6">
              Sorry, we couldn't find the provider you're looking for.
            </p>
            <Button asChild>
              <Link to="/providers">Browse All Providers</Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="bg-muted/30 py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">{provider?.providerName}</h1>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground mb-4">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{provider.location? provider.location+"," : ""} {provider.city? provider.city+"," : ""} {provider.country}</span>
                </div>
                <div className="flex items-center">
                  {/* <Star className="h-4 w-4 mr-1 text-yellow-400 fill-yellow-400" /> */}
                  <span>{provider?.discription}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {provider.service.slice(0, 5).map((item, index) => (
                  <Badge key={index} variant="secondary" className="font-normal">
                    {item?.serviceName}
                  </Badge>
                ))}
                {provider.service.length > 5 && (
                  <Badge variant="outline" className="font-normal">
                    +{provider.service.length - 5} more
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-start md:items-center gap-3">
              <Button variant="outline" onClick={() => navigate(-1)}>
                Go Back
              </Button>
              <Button asChild>
                <Link to={`/booking?${provider.id}`}>Book Appointment</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="about" className="w-full">
              <TabsList className="mb-6 w-full justify-start">
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="services">Services</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold mb-3">About {provider.providerName}</h2>
                    <p className="text-muted-foreground">
                      {provider.discription}
                    </p>
                  </div>
                  
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={provider.image}
                      alt={provider.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* <div>
                    <h3 className="text-lg font-medium mb-3">Facility Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Operating Hours
                        </h4>
                        <p className="text-muted-foreground">{provider.hours}</p>
                      </div>
                      
                      <div className="bg-muted/50 p-4 rounded-lg">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Phone className="h-4 w-4 mr-1" />
                          Contact Information
                        </h4>
                        <div className="space-y-1 text-muted-foreground">
                          <p>{provider.phone}</p>
                          <p>{provider.email}</p>
                          <p>{provider.website}</p>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </TabsContent>
              
              <TabsContent value="services">
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold mb-3">Services Offered</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {provider.service.map((item, index) => (
                      <div 
                        key={index} 
                        className="bg-white p-4 rounded-lg border border-border hover:border-health-200 transition-colors"
                      >
                        <h3 className="font-medium mb-2">{item?.serviceName}</h3>
                        {/* <p className="text-sm text-muted-foreground">
                          Comprehensive {service.toLowerCase()} services provided by our experienced healthcare professionals.
                        </p> */}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              {/* 
              <TabsContent value="reviews">
                <div className="space-y-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-xl font-semibold">Patient Reviews</h2>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-5 w-5 ${
                              star <= Math.round(provider.rating) 
                                ? "text-yellow-400 fill-yellow-400" 
                                : "text-gray-300"
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="font-medium">{provider.rating}/5</span>
                      <span className="text-muted-foreground">({provider.reviews} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    {[...Array(3)].map((_, index) => (
                      <div key={index} className="border-b pb-4 mb-4 last:border-0">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">
                              {["John D.", "Sarah M.", "Michael R."][index]}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {["2 weeks ago", "1 month ago", "3 months ago"][index]}
                            </p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${
                                  star <= [5, 4, 5][index] 
                                    ? "text-yellow-400 fill-yellow-400" 
                                    : "text-gray-300"
                                }`} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-muted-foreground">
                          {[
                            "Excellent service and care. Dr. Smith was thorough and took the time to explain everything. The staff was friendly and efficient. Highly recommend!",
                            "Very professional clinic. Wait times were minimal and the facilities were clean. The doctor was attentive and answered all my questions.",
                            "Fantastic experience from start to finish. Booking was easy, reception was welcoming, and the treatment was excellent. Will definitely return."
                          ][index]}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="text-center">
                    <Button variant="outline">View All Reviews</Button>
                  </div>
                </div>
              </TabsContent> */}
            </Tabs>
          </div>
          
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg border sticky top-24">
              <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-health-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Address</h4>
                    <p className="text-muted-foreground">
                    {provider.location? provider.location+"," : ""} {provider.city? provider.city+"," : ""} {provider.country}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-health-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Phone</h4>
                    <p className="text-muted-foreground">{provider.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-health-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Email</h4>
                    <p className="text-muted-foreground">{provider.providerEmail}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Globe className="h-5 w-5 text-health-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Website</h4>
                    <p className="text-muted-foreground">{provider.websiteURL}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-health-500 mr-3 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Hours</h4>
                    <p className="text-muted-foreground">{provider.hours}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button asChild className="w-full">
                  <Link to={`/booking?providerid=${provider?.id}`}>
                    <CalendarCheck className="mr-2 h-4 w-4" />
                    Book Appointment
                  </Link>
                </Button>
                
                <Button variant="outline" className="w-full">
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProviderDetailPage;
