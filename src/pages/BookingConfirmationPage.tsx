
import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { CalendarCheck, CheckCircle } from "lucide-react";

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const booking = location.state?.booking;
  
  useEffect(() => {
    // If no booking data is available, redirect to home
    if (!booking) {
      navigate("/");
    }
  }, [booking, navigate]);
  
  if (!booking) {
    return null;
  }
  
  return (
    <Layout>
      <div className="container py-12 sm:py-16 md:py-24">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="h-20 w-20 rounded-full bg-teal-100 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-teal-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-3">Booking Confirmed!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Your appointment has been scheduled successfully
          </p>
          
          <Card className="text-left mb-8">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3 border-b pb-2">Appointment Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Provider</p>
                      <p className="font-medium">{booking.provider}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Service</p>
                      <p className="font-medium">{booking.service}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Date</p>
                      <p className="font-medium">
                        {new Date(booking.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Time</p>
                      <p className="font-medium">{booking.time}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3 border-b pb-2">Patient Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Name</p>
                      <p className="font-medium">{booking.firstName} {booking.lastName}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Email</p>
                      <p className="font-medium">{booking.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Phone</p>
                      <p className="font-medium">{booking.phone}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3 border-b pb-2">Reason for Visit</h2>
                  <p>{booking.reason}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/50 p-6">
              <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground text-center sm:text-left">
                  A confirmation email has been sent to {booking.email}. You'll also receive a reminder 24 hours before your appointment.
                </p>
                <Button variant="outline" className="whitespace-nowrap">
                  <CalendarCheck className="mr-2 h-4 w-4" />
                  Add to Calendar
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link to="/">Return to Home</Link>
            </Button>
            <Button asChild>
              <Link to={`/providers/${booking.providerId}`}>View Provider Details</Link>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingConfirmationPage;
