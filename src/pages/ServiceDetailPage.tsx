// import { useParams, useNavigate } from "react-router-dom";
// import { Layout } from "@/components/layout/Layout";
// import { Button } from "@/components/ui/button";
// import { serviceCategories } from "@/data/mockData";
// import { ChevronLeft, CheckCircle } from "lucide-react";
// import { Link } from "react-router-dom";

// const ServiceDetailPage = () => {
//   const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();

//   // Find the service category by id
//   const serviceCategory = serviceCategories.find(
//     (category) => category.id === id
//   );

//   const handleGoBack = () => {
//     navigate(-1);
//   };

//   // Mock service specific details
//   const serviceDetails = [
//     "Complete health checkups and screenings",
//     "Preventative care and wellness counseling",
//     "Treatment for common illnesses and injuries",
//     "Management of chronic conditions", 
//     "Referrals to specialists when needed"
//   ];

//   // Mock providers offering this service
//   const relatedProviders = [
//     "Auckland Medical Centre",
//     "City Health Practitioners",
//     "Family Care Clinic",
//     "Wellness Healthcare Group"
//   ];

//   if (!serviceCategory) {
//     return (
//       <Layout>
//         <div className="container py-12">
//           <Button variant="ghost" onClick={handleGoBack} className="mb-4 flex items-center">
//             <ChevronLeft className="mr-1 h-5 w-5" />
//             Back to Services
//           </Button>
//           <div className="text-center py-12">
//             <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
//             <p className="text-muted-foreground mb-6">
//               Sorry, we couldn't find the service you're looking for.
//             </p>
//             <Button asChild>
//               <Link to="/services">View All Services</Link>
//             </Button>
//           </div>
//         </div>
//       </Layout>
//     );
//   }

//   return (
//     <Layout>
//       <div className="container mt-4">
//         <Button 
//           variant="ghost" 
//           onClick={handleGoBack}
//           size="sm"
//           className="flex items-center"
//         >
//           <ChevronLeft className="h-5 w-5 mr-1" />
//           Back to Services
//         </Button>
//       </div>

//       <section className="bg-gradient-to-r from-blue-600 to-blue-400 py-16 text-white">
//         <div className="container">
//           <div className="max-w-3xl">
//             <h1 className="text-4xl font-bold mb-4">{serviceCategory.title}</h1>
//             <p className="text-xl text-white/90">{serviceCategory.description}</p>
//           </div>
//         </div>
//       </section>

//       <section className="py-16">
//         <div className="container">
//           <div className="grid md:grid-cols-3 gap-8">
//             <div className="md:col-span-2">
//               <h2 className="text-2xl font-bold mb-6">About This Service</h2>
//               <p className="text-muted-foreground mb-8">
//                 Our {serviceCategory.title.toLowerCase()} services are designed to provide comprehensive care 
//                 that addresses your specific health needs. Our network of trusted healthcare providers offers 
//                 professional care in comfortable and convenient settings.
//               </p>

//               <h3 className="text-xl font-semibold mb-4">What's Included</h3>
//               <ul className="space-y-3 mb-8">
//                 {serviceDetails.map((detail, index) => (
//                   <li key={index} className="flex items-start">
//                     <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
//                     <span>{detail}</span>
//                   </li>
//                 ))}
//               </ul>

//               <div className="mt-8">
//                 <Button asChild size="lg">
//                   <Link to={`/providers?service=${id}`}>Find Providers</Link>
//                 </Button>
//               </div>
//             </div>

//             <div className="bg-muted p-6 rounded-lg">
//               <h3 className="text-xl font-semibold mb-4">Popular Providers</h3>
//               <ul className="space-y-3 mb-6">
//                 {relatedProviders.map((provider, index) => (
//                   <li key={index} className="pb-2 border-b border-muted-foreground/20">
//                     {provider}
//                   </li>
//                 ))}
//               </ul>
//               <Button variant="outline" asChild className="w-full">
//                 <Link to="/providers">View All Providers</Link>
//               </Button>

//               <div className="mt-8 pt-6 border-t">
//                 <h4 className="font-medium mb-3">Need Help?</h4>
//                 <p className="text-sm text-muted-foreground mb-4">
//                   Have questions about our {serviceCategory.title.toLowerCase()} services?
//                 </p>
//                 <Button variant="secondary" asChild>
//                   <Link to="/contact">Contact Support</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-16 bg-muted/50">
//         <div className="container">
//           <div className="text-center max-w-3xl mx-auto">
//             <h2 className="text-3xl font-bold mb-4">How It Works</h2>
//             <p className="text-muted-foreground mb-8">
//               Booking a {serviceCategory.title.toLowerCase()} appointment is easy and convenient.
//             </p>
            
//             <div className="grid sm:grid-cols-3 gap-6 text-center">
//               <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-blue-600 font-bold text-lg">1</span>
//                 </div>
//                 <h3 className="font-semibold mb-2">Find a Provider</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Search for providers offering {serviceCategory.title.toLowerCase()} services in your area.
//                 </p>
//               </div>
              
//               <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-blue-600 font-bold text-lg">2</span>
//                 </div>
//                 <h3 className="font-semibold mb-2">Book Appointment</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Select a convenient time and date for your appointment.
//                 </p>
//               </div>
              
//               <div className="bg-white p-6 rounded-lg shadow-sm">
//                 <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                   <span className="text-blue-600 font-bold text-lg">3</span>
//                 </div>
//                 <h3 className="font-semibold mb-2">Receive Care</h3>
//                 <p className="text-sm text-muted-foreground">
//                   Visit your provider and receive the care you need.
//                 </p>
//               </div>
//             </div>
            
//             <div className="mt-10">
//               <Button asChild size="lg">
//                 <Link to={`/providers?service=${id}`}>Find {serviceCategory.title} Providers</Link>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </section>
//     </Layout>
//   );
// };

// export default ServiceDetailPage;