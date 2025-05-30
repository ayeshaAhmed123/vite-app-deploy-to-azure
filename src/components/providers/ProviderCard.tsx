
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { MapPin, Star, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Provider } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { appServices } from "@/shared/redux/actions/appServices";
import { useQuery } from "@/shared/hooks/useQuery";
import dayjs from "dayjs";

interface ProviderCardProps {
  provider: Provider | any;
  image?: any;
  isReschedule?: any;
}

export const ProviderCard = ({ provider, image,isReschedule }: ProviderCardProps) => {
  const query = useQuery()
  const dispatch = useDispatch<ThunkDispatch<any, undefined, AnyAction>>();

  const { GetDayRoasterData, isGetDayRoasterDataLoading } = useSelector((state: any) => state.GetDayRoaster);
  const { GetOctansServicesData } = useSelector((state: any) => state.GetOctansServices);
  const { eSamAddressData, iseSamAddressDataLoading } = useSelector((state: any) => state.eSamAddress);
  const { eSAMGetByIDData } = useSelector((state: any) => state.eSAMGetByID);
  const { GetLocationFromOctansServiceData, isGetLocationFromOctansServiceDataLoading } = useSelector((state: any) => state.GetLocationFromOctansService);
 const navigate = useNavigate();
 const { id } = useParams<{ id: string }>();
 const [searchParams] = useSearchParams();
  const [DateFrom, setDateFrom] = useState<string | any>();
  const [DateTo, setDateTo] = useState<string | any>();
  const [DayRoaster, setDayRoaster] = useState<any[]>([]);
 
 const providerParam = searchParams.get("providerId");

  const handleProviderNameClick = () => {
    const fromDate = new Date();
    const toDate = new Date();   
    toDate.setMonth(toDate.getMonth() + 3); 

      const obj = {
        ProviderID: provider?.providerID,
        PracticeID: query.get("practice"),
        PracticeLocationID: query.get("location"),
        FromDate: fromDate.toUTCString(), 
        ToDate: toDate.toUTCString(),    
      };
      dispatch(appServices.GetDayRoaster(obj)); 
    
  };


  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={provider.providerPhoto}
          alt={provider.providerName}
          className="w-full h-full object-cover"
        />
      </div>

      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <h3
            className="font-semibold text-lg cursor-pointer"
          >
            {provider?.providerName}
          </h3>
          <div className="flex items-center gap-1">
            <span className="font-medium">{provider?.discription}</span>
          </div>
        </div>

        <div className="flex items-center text-muted-foreground text-sm mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>
            {provider.location ? provider.location + "," : ""}{" "}
            {provider.city ? provider.city + "," : ""} {provider.country}
          </span>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {provider?.service?.slice(0, 3).map((item, index) => (
            <Badge key={index} variant="secondary" className="font-normal">
              {item?.serviceName}
            </Badge>
          ))}
          {provider.service.length > 3 && (
            <Badge variant="outline" className="font-normal">
              +{provider.service.length - 3} more
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex items-center gap-3">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/providers/${provider?.providerID}`}>Profile</Link>
        </Button>
        <Button asChild className="flex-1" onClick={handleProviderNameClick }>
          <Link to={`/booking?providerid=${provider?.providerID}&providername=${provider?.providerName}&practice=${query.get("practice")}&location=${query.get("location")}&service=${query.get("service")}`}>Book Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
