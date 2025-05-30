
import { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface Testimonial {
  id: number;
  name: string;
  position: string;
  content: string;
  image: string;
}

export const Testimonials = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Auckland",
      content: "Octans Care made it so easy to find a doctor and book an appointment. The whole process took less than 5 minutes!",
      image: "https://i.pravatar.cc/150?img=32"
    },
    {
      id: 2,
      name: "Mark Thompson",
      position: "Wellington",
      content: "I was able to find a dentist near me with great reviews and available time slots. Highly recommend this service!",
      image: "https://i.pravatar.cc/150?img=53"
    },
    {
      id: 3,
      name: "Emma Wilson",
      position: "Christchurch",
      content: "As a busy parent, being able to book appointments for my family online has been a game-changer. The reminders are also helpful.",
      image: "https://i.pravatar.cc/150?img=44"
    },
    {
      id: 4,
      name: "David Lee",
      position: "Hamilton",
      content: "I needed an urgent appointment and was able to find one for the same day. The booking process was seamless.",
      image: "https://i.pravatar.cc/150?img=59"
    }
  ];
  
  return (
    <section className="py-16 bg-muted">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">What Our Users Say</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from people who have used Octans Care to find and book healthcare services.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "center",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 rounded-full overflow-hidden mb-4 border-2 border-health-200">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="mb-4 italic text-muted-foreground">"{testimonial.content}"</p>
                        <h4 className="font-medium">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="hidden md:flex">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        </Carousel>
      </div>
    </section>
  );
};
