
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Loader2, MapPin, Search } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { appServices } from "@/shared/redux/actions/appServices";
import { getOptionsArray } from "@/shared/utils/utils";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { toast } from "@/components/ui/use-toast";
import { BookingForm } from "../booking/BookingForm";
import { useQuery } from "@/shared/hooks/useQuery";
import { Spin } from "antd";

export const SearchForm = () => {
  const query = useQuery()
  const [practiceLocation, setPracticeLocation] = useState<any | null>(null);
  const [availablePracticeLocations, setAvailablePracticeLocations] = useState<any[]>([]);
  const [serviceType, setServiceType] = useState("");
  const [serviceTypeOptions, setServiceTypeOptions] = useState([]);
  const [locationInput, setLocationInput] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [selectedLocationName, setSelectedLocationName] = useState("");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch<ThunkDispatch<any, undefined, AnyAction>>();
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { GetOctansServicesData, isGetOctansServicesDataLoading } = useSelector((state: any) => state.GetOctansServices);
  const { eSamAddressData, iseSamAddressDataLoading } = useSelector((state: any) => state.eSamAddress);
  const { eSAMGetByIDData } = useSelector((state: any) => state.eSAMGetByID);
  const { GetLocationFromOctansServiceData, isGetLocationFromOctansServiceDataLoading } = useSelector((state: any) => state.GetLocationFromOctansService);
  const { PublicAccessTokenData } = useSelector((state: any) => state.PublicAccessToken);
  const { GetAppointmentByIDData } = useSelector((state: any) => state.GetAppointmentByID);

  useEffect(() => {
    if (PublicAccessTokenData) {
      dispatch(appServices.GetOctansServices());
    }
  }, [PublicAccessTokenData]);

  // useEffect(() => {
  //     dispatch(appServices.GetOctansServices());

  // }, []);

  useEffect(() => {
    if (GetOctansServicesData) {
      const options = getOptionsArray(
        GetOctansServicesData,
        "octansServiceName",
        "octansServiceID"
      );
      setServiceTypeOptions(options);
    }
  }, [GetOctansServicesData]);

  const handleLocationInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    e.preventDefault();
    setLocationInput(query);
    setIsPopoverOpen(true);
    dispatch(appServices.eSamAddress(query));
  };

  const handleLocationSelect = (uniqueId: string, fullAddress: string) => {
    setSelectedLocationId(uniqueId);
    setSelectedLocationName(fullAddress);
    setLocationInput(fullAddress);
    setIsPopoverOpen(false);
    dispatch(appServices.eSAMGetByID({ uniqueId }));
  };

  const handleLocationKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (eSamAddressData && eSamAddressData.length > 0) {
        handleLocationSelect(
          eSamAddressData[0].uniqueId,
          eSamAddressData[0].fullAddress
        );
      }
    }
  };

  useEffect(() => {
    if (selectedLocationId && serviceType && eSAMGetByIDData) {
      const obj = {
        OctansServiceID: serviceType,
        Latitude: eSAMGetByIDData?.nzgD2KYCoord,
        Longitude: eSAMGetByIDData?.nzgD2KXCoord
      };
      dispatch(appServices.GetLocationFromOctansService(obj));
    }
  }, [selectedLocationId, serviceType, eSAMGetByIDData]);

  useEffect(() => {
    if (GetLocationFromOctansServiceData && Array.isArray(GetLocationFromOctansServiceData)) {
      setAvailablePracticeLocations(GetLocationFromOctansServiceData);
    } else {
      setAvailablePracticeLocations([]);
    }
  }, [GetLocationFromOctansServiceData]);

  const [isReschedule, setisReschedule] = useState<boolean>(false)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLocationId || !serviceType) {
      toast({
        title: "Missing information",
        description: "Please select a location and service type",
        variant: "destructive",
      });
      return;
    }

    let obj = {
      // ProviderID: practiceLocation?.practiceLocationID,
      PracticeID: practiceLocation?.practiceID,
      PracticeLocationID: practiceLocation?.practiceLocationID,
      octansServiceID: serviceType
    }
    navigate(`/providers?location=${obj?.PracticeLocationID}&service=${obj?.octansServiceID}&practice=${obj?.PracticeID}`);
  };

  const handleReschedule = () => {
    // dispatch(appServices.PublicAccessToken());
    // setisReschedule(true)
    // navigate("/booking?practice=A882A928-BA39-4CEA-A0FB-5D2852BA7B4B&AppointmentID=16AAC405-BC60-4B19-B8E8-34C5B2634A2E&isReschedule=true");
    // navigate("/booking/EB823053-266E-4349-BB06-4B2D58673AE1?providername=Annas%20%20NURSE&practice=A882A928-BA39-4CEA-A0FB-5D2852BA7B4B&location=355BB77D-016A-4738-A26D-14C952A1497A&service=E80F9A64-975C-4C3A-A07E-67CACBC428F2&AppointmentID=16AAC405-BC60-4B19-B8E8-34C5B2634A2E&isReschedule=true");
    // navigate(`/booking?practice=${GetAppointmentByIDData[0]?.practiceID}&AppointmentID=${GetAppointmentByIDData[0]?.appointmentID}&isReschedule=${GetAppointmentByIDData[0]?.isReschedule}`);
    // ); 
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg p-[30px] shadow-lg animate-scale-in w-[900px] h-[100px]"
    // className="bg-white rounded-lg p-5 shadow-lg max-w-4xl w-full animate-scale-in"
    >
      <div style={{ display: "flex", width: '100%', gap: '6px' }} className="d-flex w-100">
        {/* <div className="grid grid-cols-1 md:grid-cols-12 gap-4 ps-1 pe-1"> */}
        <div className="relative ps-0 pe-0 " style={{ width: '300px' }}>
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} >
            <PopoverTrigger asChild>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search for a location"
                  className="pl-10"
                  value={locationInput}
                  autoFocus
                  onChange={handleLocationInputChange}
                  onKeyDown={handleLocationKeyDown}
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-[300px] max-h-[250px] overflow-y-auto" align="start">
              {iseSamAddressDataLoading ? (
                <div className="py-2 px-3 text-center">
                  <Loader2 className="h-4 w-4 animate-spin mx-auto" />
                  <span className="text-sm text-muted-foreground mt-1">Searching...</span>
                </div>
              ) : eSamAddressData && eSamAddressData.length > 0 ? (
                <div>
                  {eSamAddressData.map((location: any) => (
                    <div
                      key={location.uniqueId}
                      className="flex flex-col py-2 px-3 hover:bg-muted cursor-pointer"
                      onClick={() => handleLocationSelect(location.uniqueId, location.fullAddress)}
                    >
                      <span className="font-medium">{location.fullAddress}</span>
                    </div>
                  ))}
                </div>
              ) : locationInput.trim().length > 0 ? (
                <div className="py-2 px-3 text-center">
                  <span className="text-sm text-muted-foreground">No locations found</span>
                </div>
              ) : null}
            </PopoverContent>
          </Popover>
        </div>

        <div style={{ width: '250px' }}>
          <Select
            value={serviceType}
            onValueChange={setServiceType}
            required
            disabled={isGetOctansServicesDataLoading}
          >
            <SelectTrigger className="flex items-center justify-between">
              <div className="flex-1 text-left">
                <SelectValue placeholder="Select service" />
              </div>
              {isGetOctansServicesDataLoading && (
                <Spin size="small" className="ml-2" />
              )}
            </SelectTrigger>

            <SelectContent>
              {serviceTypeOptions.map((option: any) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>


        <div className="" style={{ width: '320px', padding: '2px' }}>
          <Select
            value={practiceLocation?.practiceLocationName || ""}
            onValueChange={(value) => {
              const selected = availablePracticeLocations.find(
                (p) => p.practiceLocationName === value
              );
              setPracticeLocation(selected || null);
            }}
          >
            <SelectTrigger className="px-4 text-left">
              <SelectValue
                className="text-left"
                placeholder={
                  isGetLocationFromOctansServiceDataLoading
                    ? "Loading practice locations..."
                    : availablePracticeLocations.length === 0
                      ? "No practice locations available"
                      : "Select practice location"
                }
              />
              {isGetLocationFromOctansServiceDataLoading && (
                <Spin size="small" className="ml-2" />
              )}
            </SelectTrigger>

            <SelectContent className="p-1">
              {availablePracticeLocations.map((practice: any) => (
                <SelectItem key={practice.practiceLocationName} value={practice.practiceLocationName} className="my-1"
                  style={{ border: '1px solid gray' }}>
                  <div>
                    <p className="font-medium ">{practice.practiceLocationName}</p>
                    <p className="text-xs text-muted-foreground">{practice.practiceLocationAddress}</p>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className=" d-flex gap-2">
          <Search className="w-4 h-4" /> Search
        </Button>
      </div>
    </form>

  );
};
