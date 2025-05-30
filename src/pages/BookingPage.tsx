
import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { BookingForm } from "@/components/booking/BookingForm";
import { Button } from "@/components/ui/button";
import { mockProviders } from "@/data/mockData";
import { Provider } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@/shared/hooks/useQuery";
import { appServices } from "@/shared/redux/actions/appServices";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { notification, Typography } from "antd";
import { CancelModal } from "@/components/ui/CancelModal";

const BookingPage = () => {
  const query = useQuery()
  const isReschedule = query.get("isReschedule");
  const isCancel = query.get("isCancel");
  const [cancelmodal, setcancelmodal] = useState(false)
  const [cancelmodalOpen, setcancelmodalOpen] = useState<boolean>(false);

  // const { providerId } = useParams<{ providerId: string }>();
  const providerId = query.get("providerid")
  const [provider, setProvider] = useState<Provider | null | any>(null);
  const [loading, setLoading] = useState(true);
  const [cancelMessage, setCancelMessage] = useState(null);
  const [CancelAppointment, setCancelAppointment] = useState("false");
  const { GetDayRoasterData, isGetDayRoasterDataLoading } = useSelector((state: any) => state.GetDayRoaster);
  const { CancelAppointmentByIdData } = useSelector((state: any) => state.CancelAppointmentById);
  const { PublicAccessTokenData } = useSelector((state: any) => state.PublicAccessToken);
  const { SearchProvidersFromOctansServiceData, isSearchProvidersFromOctansServiceDataLoading, selectedProvider } = useSelector((state: any) => state.SearchProvidersFromOctansService);
  const { GetAppointmentByIDData, GetAppointmentByAppIdData } = useSelector((state: any) => state.GetAppointmentByID);
  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, undefined, AnyAction>>();
  
  useEffect(() => {
    if (isCancel == "true") {
      dispatch(appServices.PublicAccessToken());
    }
  }, [isCancel]);

  useEffect(() => {

    if (isReschedule == "true" || isCancel == "true"
    ) {
      // dispatch(appServices.GetAppointmentByID({ AppointmentID:"D7837549-8958-4A34-9CA0-1B5BFB70D08B" }));
      dispatch(appServices.GetAppointmentByID({ AppointmentID: query.get("Appointment-ID") }));
    }
  }, []);


  useEffect(() => {
    const isCancel = query.get("isCancel");
    if (isCancel) {
      dispatch(appServices.CancelAppointmentById({ AppointmentID: query.get("Appointment-ID") }));
    }

  }, [])

  useEffect(() => {
    if (CancelAppointmentByIdData) {
      if (CancelAppointmentByIdData?.status === "succes") {
        // notification.success({ message: "Your appointment is cancelled" });
        setcancelmodalOpen(true)
      } else {
        // notification.success({ message: "Your Appointment is already Cancelled" });
        setcancelmodalOpen(true)
      }
      // dispatch(appServices.CancelAppointmentByIdDataClear(''))
    }
  }, [CancelAppointmentByIdData])


  useEffect(() => {
    if (isReschedule == "true" && Array.isArray(GetAppointmentByIDData) && GetAppointmentByIDData.length > 0) {
      const appointment = GetAppointmentByIDData[0];

      if (appointment?.practiceID && appointment?.providerID && appointment?.practiceLocationID && appointment?.appointmentServices?.[0]?.service?.octansServiceID) {
        const obj = {
          PracticeID: appointment.practiceID,
          PracticeLocationID: appointment.practiceLocationID,
          octansServiceID: appointment.appointmentServices[0].service.octansServiceID,
          ProviderID: appointment.providerID
        };
        dispatch(appServices.SearchProvidersFromOctansService(obj));
        console.log("Payload for SearchProvidersFromOctansService:", obj);
      }
      else {
        console.warn("Missing required fields in appointment data", appointment);
      }
      if (appointment?.practiceID && appointment?.providerID && appointment?.practiceLocationID) {
        const fromDate = new Date();
        const toDate = new Date();
        toDate.setMonth(toDate.getMonth() + 3);

        let requestPayload = {
          ProviderID: appointment?.providerID,
          PracticeID: appointment?.practiceID,
          PracticeLocationID: appointment?.practiceLocationID,
          FromDate: fromDate.toUTCString(),
          ToDate: toDate.toUTCString(),
        };

        dispatch(appServices.GetDayRoaster(requestPayload));
      }

    }
  }, [GetAppointmentByIDData]);

  useEffect(() => {
    setTimeout(() => {
      if (SearchProvidersFromOctansServiceData) {
        let foundProvider = null
        if (isReschedule == "true") {
          foundProvider = SearchProvidersFromOctansServiceData && SearchProvidersFromOctansServiceData.find(p => p.providerID === GetAppointmentByIDData[0].providerID);
        }
        else
          foundProvider = SearchProvidersFromOctansServiceData && SearchProvidersFromOctansServiceData.find(p => p.providerID === providerId);
        if (foundProvider) {
          setProvider(foundProvider);
        }
      }
      setLoading(false);
    }, 500);
  }, [providerId, SearchProvidersFromOctansServiceData]);

  
  if (loading) {
    return (
      <Layout>
        <div className="container py-16 flex items-center justify-center">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-health-200 border-t-health-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading booking form...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (!provider && isReschedule == "false") {
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
    <>
    <Layout>
      <div className="bg-muted/30 py-12">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">Book an Appointment</h1>
              <p className="text-muted-foreground">
                Fill out the form below to schedule your appointment with
                {provider && provider?.providerName}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 sm:p-8 rounded-lg border shadow-sm mb-6">
            {provider &&
              <div className="flex items-center gap-4 pb-6 border-b mb-6">
                <div className="h-16 w-16 rounded-full overflow-hidden">
                  <img
                    src={provider.providerPhoto}
                    alt={provider.providerName}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-semibold text-xl">{provider.providerName}</h2>
                  <p className="text-muted-foreground">{provider.city ? provider.city + "," : ""} {provider.country}</p>
                </div>
              </div>
            }
            {provider &&
              <BookingForm provider={provider} />
            }
          </div>
        </div>
      </div>

    </Layout>
     {
            cancelmodalOpen &&
            <>
              <CancelModal
                open={cancelmodalOpen}
                onOpenChange={setcancelmodalOpen} />
            </>
    
          }
          </>
  );
};

export default BookingPage;
