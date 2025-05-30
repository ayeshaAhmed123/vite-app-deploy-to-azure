import { Check, CalendarCheck, Clock, Search } from "lucide-react";

export const HowItWorks = () => {
  const steps = [
    {
      icon: <Search className="h-8 w-8 text-white" />,
      title: "Find",
      description: "Search for healthcare providers by location and specialty"
    },
    {
      icon: <CalendarCheck className="h-8 w-8 text-white" />,
      title: "Book",
      description: "Select your preferred time slot and book instantly"
    },
    {
      icon: <Check className="h-8 w-8 text-white" />,
      title: "Confirm",
      description: "Receive booking confirmation via email or SMS"
    },
    {
      icon: <Clock className="h-8 w-8 text-white" />,
      title: "Visit",
      description: "Visit the clinic at your scheduled appointment time"
    }
  ];

  return (
    <section className="py-16">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Booking your next healthcare appointment is simple and quick with our streamlined process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="flex items-center justify-center h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-400">
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 left-full -translate-y-1/2 w-full h-0.5 bg-gradient-to-r from-blue-400/50 to-transparent" />
                )}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
