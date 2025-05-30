
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { CalendarCheck, Check, Clock, Search, Settings } from "lucide-react";

const HowItWorksPage = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-health-500" />,
      title: "Find Healthcare Providers",
      description: "Search for healthcare providers based on location, specialty, or service type. Browse through detailed profiles and read patient reviews to find the right provider for your needs."
    },
    {
      icon: <CalendarCheck className="h-8 w-8 text-health-500" />,
      title: "Select a Suitable Time",
      description: "Browse real-time availability and select a date and time that works best for you. Our system shows you all available slots, making it easy to find a convenient appointment."
    },
    {
      icon: <Settings className="h-8 w-8 text-health-500" />,
      title: "Enter Your Details",
      description: "Provide your personal information and the reason for your visit. This helps the healthcare provider prepare for your appointment and ensures a more efficient consultation."
    },
    {
      icon: <Check className="h-8 w-8 text-health-500" />,
      title: "Confirm Your Booking",
      description: "Review your booking details and confirm your appointment. You'll receive an instant confirmation via email or SMS with all the information you need for your visit."
    },
    {
      icon: <Clock className="h-8 w-8 text-health-500" />,
      title: "Visit at Your Scheduled Time",
      description: "Arrive at the clinic at your scheduled appointment time. Your healthcare provider will be ready for your visit, and you'll skip the long waiting times typically associated with walk-ins."
    }
  ];
  
  const faqs = [
    {
      question: "How do I book an appointment?",
      answer: "You can book an appointment by searching for a healthcare provider, selecting a suitable time slot, entering your details, and confirming your booking. The entire process takes just a few minutes."
    },
    {
      question: "Can I cancel or reschedule my appointment?",
      answer: "Yes, you can cancel or reschedule your appointment through your account dashboard. Please note that some providers may have specific cancellation policies."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security seriously. All your personal and medical information is encrypted and securely stored in compliance with privacy regulations."
    },
    {
      question: "How do I know if my booking is confirmed?",
      answer: "Once you complete the booking process, you'll receive an immediate confirmation via email or SMS. You can also view your upcoming appointments in your account dashboard."
    },
    {
      question: "Are there any fees for using the booking service?",
      answer: "No, our booking service is completely free for patients. You only pay for your healthcare services as per the provider's fees."
    }
  ];

  return (
    <Layout>
      {/* <section className="bg-gradient-to-r from-health-400 to-health-500 text-white py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">How It Works</h1>
            <p className="text-xl text-white/90">
              Booking healthcare appointments has never been easier. Our platform simplifies the process, saving you time and ensuring you get the care you need.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" variant="secondary" className="text-health-600">
                <Link to="/providers">Find Providers Now</Link>
              </Button>
            </div>
          </div>
        </div>
      </section> */}
      
      <section className="py-16">
        <div className="container">
          <div className="max-w-4xl mx-auto space-y-16">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="flex-shrink-0 flex items-center justify-center">
                  <div className="h-20 w-20 rounded-full bg-health-100 flex items-center justify-center relative">
                    {step.icon}
                    <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-health-500 flex items-center justify-center text-white font-medium">
                      {index + 1}
                    </div>
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold mb-3">{step.title}</h2>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
         {/* Updated CTA section to match the styling from the homepage */}
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
      <section className="py-16 bg-muted/50">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
              <p className="text-muted-foreground">
                Find answers to common questions about our booking process.
              </p>
            </div>
            
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-lg shadow-sm"
                >
                  <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="mb-4 text-muted-foreground">
                Still have questions? We're here to help!
              </p>
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Updated CTA section to match the styling from the homepage */}
      {/* <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-400 text-white">
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
          </div> */}
        {/* </div>
      </section> */}
    </Layout>
  );
};

export default HowItWorksPage;
