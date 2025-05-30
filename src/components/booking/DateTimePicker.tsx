
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import ICollapse from "../ui/ICollapse";
import { appServices } from "@/shared/redux/actions/appServices";
import { AnyAction, AsyncThunkAction, ThunkDispatch, UnknownAction } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@/shared/hooks/useQuery";
import { useParams } from "react-router-dom";
import { Spin } from "antd";

interface DateTimePickerProps {

  onDateTimeChange: (date: Date | undefined, time: string | undefined) => void;
  disabledDates?: (date: Date | undefined) => boolean,
  slots?: any,
  setServiceData: (data: any) => void;
  setSelectedSlot: (data: any) => void;
  serviceData?: any;
  CancelAppointment?: any;
  isReschedule?: any;
  setconfirmationmodalOpen?: any,
}

export const DateTimePicker = ({ onDateTimeChange, disabledDates, setconfirmationmodalOpen,
  // slots, 
  serviceData,
  CancelAppointment, isReschedule,
  setServiceData, setSelectedSlot }: DateTimePickerProps) => {
  const query = useQuery()
  const dispatch = useDispatch<ThunkDispatch<any, undefined, AnyAction>>();

  const [slots, setSlots] = useState<any>({
    morning: [],
    afternoon: [],
    evening: []
  })
  const [serviceForPayload, setServiceForPayload] = useState<any[]>([])
  const [EnabledDates, setEnabledDates] = useState<any[]>([])
  // const [isReschedule, setisReschedule] = useState<any>(false)
  // const [CancelAppointment, setCancelAppointment] = useState<any>(false)
  //  const { providerId } = useParams<{ providerId: string }>();
  const providerId = query.get("providerid")

  const [date, setDate] = useState<Date>();
  const { GetAppointmentByIDData } = useSelector((state: any) => state.GetAppointmentByID);
  const [time, setTime] = useState<string>();
  const { GetDayRoasterData, isGetDayRoasterDataLoading } = useSelector((state: any) => state.GetDayRoaster);
  const { PublicAccessTokenData } = useSelector((state: any) => state.PublicAccessToken);
  const { GetPatientByIDData } = useSelector((state: any) => state.GetPatientByID);
  const { GetLocationFromOctansServiceData, isGetLocationFromOctansServiceDataLoading } = useSelector((state: any) => state.GetLocationFromOctansService);
  // Example available time slots
  const { AddCustomerdata } = useSelector((state: any) => state.AddCustomerData);
  const { AddAppointmentData } = useSelector((state: any) => state.AddAppointment);
  const { AddPatientForMedicareData } = useSelector((state: any) => state.AddPatientForMedicare);
  const { CreateInvoicewithItemsData } = useSelector((state: any) => state.CreateInvoicewithItems);
  const { SearchProvidersFromOctansServiceData } = useSelector((state: any) => state.SearchProvidersFromOctansService);
  const { GetPracticeforPaymentConfigrationData } = useSelector((state: any) => state.GetPracticeforPaymentConfigration);
  const { GetOctansServicesData } = useSelector((state: any) => state.GetOctansServices);
  const { SearchListOfSlotData, SearchListOfAllSlotData, isSearchListOfSlotDataLoading } = useSelector((state: any) => state.SearchListOfSlot);

  const handleDateChange = (newDate: Date | undefined) => {
    setDate(newDate);
    setTime(null);
    setSelectedSlot(null)
    onDateTimeChange(newDate, undefined);
  };

  useEffect(() => {
    if (GetAppointmentByIDData) {
      handleDateChange(GetAppointmentByIDData[0]?.appointmentDate)

      // handleTimeChange(GetAppointmentByIDData[0]?.slotID)
    }
  }, [GetAppointmentByIDData, GetLocationFromOctansServiceData]);

  useEffect(() => {

    if (SearchListOfAllSlotData && GetAppointmentByIDData) {
      let selectedSlot = null;
      console.log(GetAppointmentByIDData[0]?.slotID[0], "Slots List:", SearchListOfAllSlotData)
      selectedSlot = SearchListOfAllSlotData?.find((item) => item?.slotID == GetAppointmentByIDData[0]?.slotID[0])
      console.log(GetAppointmentByIDData[0]?.slotID[0], "<<>>", SearchListOfAllSlotData, "selectedSlot:::1:", selectedSlot)

      // if(selectedSlot == null)
      // {
      //   selectedSlot = slots?.afternoon?.find((item) => item?.slotID == GetAppointmentByIDData[0]?.slotID[0])
      //   console.log("selectedSlot:::2:", selectedSlot)
      //   if(selectedSlot == null)
      //     {
      //       selectedSlot = slots?.evening?.find((item) => item?.slotID == GetAppointmentByIDData[0]?.slotID[0])
      //       console.log("selectedSlot:::3:", selectedSlot)
      //     }
      // }
      if (selectedSlot) {
        dispatch(appServices.SearchListOfRescheduleSlotDataSuccess(selectedSlot))

        handleTimeChange(selectedSlot)
      }
      console.log("selectedSlot::::", selectedSlot)
    }
  }, [SearchListOfAllSlotData])


  //   useEffect(() => {
  //     const customTimeFormatter = (Time: string, format: string) => {
  //   return dayjs(Time).format(format);
  // };
  //   if (SearchListOfSlotData?.numberOfAppointmentBooking < SearchListOfSlotData?.numberOfParallelBooking && SearchListOfSlotData?.leaveTitle !== "Half Leave" || selectedAppointment.length > 0 && SearchListOfSlotData?.slotID == selectedAppointment[0].slotID[0]) {
  //     if (customTimeFormatter(slot.startTime, "h:mm a").split(" ")[1] == 'am' && (ServicesInSlot || slot.service.length == 0) && (servicecanbook || selectedAppointment.length > 0 && SearchListOfSlotData?.slotID == selectedAppointment[0].slotID[0])) {
  //         morning.push(slot)
  //     }
  //     if (customTimeFormatter(slot.startTime, "h:mm a").split(" ")[1] == 'pm' && (ServicesInSlot || slot.service.length == 0) && (servicecanbook || selectedAppointment.length > 0 && slot.slotID == selectedAppointment[0].slotID[0])) {
  //         evening.push(slot)
  //     }
  // }
  // }, []);

  useEffect(() => {
    if (SearchListOfSlotData) {
      console.log("Slots Updateddd", SearchListOfSlotData)
      categorizeEvents(SearchListOfSlotData)
    }
  }, [SearchListOfSlotData])

  const categorizeEvents = (events) => {
    const morning = [];
    const afternoon = [];
    const evening = [];

    // Define time ranges (as dayjs objects with only time part)
    const getMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':');
      return parseInt(hours) * 60 + parseInt(minutes);
    };

    events?.forEach(event => {
      const start = dayjs(event.startTime);
      const startMinutes = getMinutes(start.format('HH:mm'));

      if (startMinutes < 720) { // before 12:00 PM (720 minutes)
        morning.push(event);
      } else if (startMinutes >= 720 && startMinutes < 1080) { // 12:00 PM to before 6:00 PM
        afternoon.push(event);
      } else { // 6:00 PM to 11:59 PM
        evening.push(event);
      }
    });
    const sortByStartTime = (a, b) => dayjs(a.startTime).isAfter(dayjs(b.startTime)) ? 1 : -1;

    morning.sort(sortByStartTime);
    afternoon.sort(sortByStartTime);
    evening.sort(sortByStartTime);
    setSlots({ morning, afternoon, evening })
    // return { morning, afternoon, evening };
  };

  useEffect(() => {
    if (isReschedule !== "true") {
      const updatedArray: any[] = serviceForPayload
      let index = SearchProvidersFromOctansServiceData?.findIndex((item) => {
        return item?.providerID == providerId
      })
      // console.log("indexssss", index)
      let data = null
      if (index != -1) {
        data = SearchProvidersFromOctansServiceData[index]?.service?.find((item) => {
          return item.octansServiceID === query.get("service");
          // return item.octansServiceID === GetOctansServicesData?.GetOctansServices;
        });
      }
      //data.map((item: any) => {
      updatedArray.push({
        reasonforContact: "",
        service: data,

      })
      // })
      setServiceForPayload([...updatedArray]);
    } else {
      if (isReschedule == "true") {
        const updatedArray: any[] = serviceForPayload
        updatedArray.push({
          reasonforContact: GetAppointmentByIDData[0]?.appointmentServices[0]?.reasonforContact,
          service: GetAppointmentByIDData[0]?.appointmentServices[0]?.service,

        })
        setServiceForPayload([...updatedArray]);
      }
    }

  }, [])

  const handleTimeChange = (newTime: any) => {
    setTime(newTime);
    setSelectedSlot(newTime);
    let isReschedule = query.get("isReschedule");
    if (GetLocationFromOctansServiceData || isReschedule) {
      let ind = GetLocationFromOctansServiceData?.findIndex((item) => {
        return item.practiceLocationID === query.get("location");
      });
      console.log(newTime, "newTime")
      const combinedDateTime = dayjs(date).format("YYYY-MM-DD[T]HH:MM:SS");

      var obj: any = {
        AppointmentID: isReschedule == "true" ? GetAppointmentByIDData[0]?.appointmentID : '',
        // PracticeID: isReschedule == "true" ? GetAppointmentByIDData[0]?.practiceID : query.get("practice"),
        PracticeID: isReschedule === "true" ? GetAppointmentByIDData[0]?.practiceID : query.get("practice"),
        PracticeName: isReschedule == "true" ? GetAppointmentByIDData[0]?.practiceName : GetLocationFromOctansServiceData[ind]?.practiceLocationName,
        PracticeAddress: '',
        AppointmentCode: isReschedule == "true" ? GetAppointmentByIDData[0]?.appointmentCode : '',
        PracticeLocationID: isReschedule == "true" ? GetAppointmentByIDData[0]?.practiceLocationID : newTime?.practiceLocationID,
        PracticeLocationName: isReschedule == "true" ? GetAppointmentByIDData[0]?.practiceLocationName : newTime?.practiceLocationName,
        ProviderID: newTime?.providerID,
        ProviderName: newTime?.providerName,
        AppointmentDate: dayjs(newTime?.diaryDate).format("YYYY-MM-DD[T]00:00:00"),
        AppointmentTypeID: newTime?.appointmentType[0].appointmentTypeID,
        //AppointmentType: payloadForAppointment?.appointmentTypeName == null ? '' : payloadForAppointment?.appointmentTypeName,
        AppointmentType: newTime?.appointmentType[0].appointmentTypeName,
        AppointmentStartTime: dayjs(newTime?.startTime).format("YYYY-MM-DD") + "T00:00:00",
        appointmentEndTime: dayjs(newTime?.endTime).format("YYYY-MM-DD") + "T00:00:00",
        PatientID: isReschedule == "true" ? GetAppointmentByIDData[0]?.patientID : '',
        PatientName: isReschedule == "true" ? GetAppointmentByIDData[0]?.patientName : '',
        PatientPhoneNumber: isReschedule == "true" ? GetAppointmentByIDData[0]?.patientPhoneNumber : '',
        PatientMobileNumber: '',
        PatientEmail: isReschedule == "true" ? GetAppointmentByIDData[0]?.patientEmail : '',
        ProviderPhoto: '',
        PracticeLocationPhone1: isReschedule == "true" ? GetAppointmentByIDData[0]?.practiceLocationPhone1 : newTime?.practiceLocationPhone1,
        PracticeLocationPhone2: '',
        appointmentCode: isReschedule == "true" ? GetAppointmentByIDData[0]?.appointmentCode : '',
        PracticeLocationEmail: isReschedule == "true" ? GetAppointmentByIDData[0]?.practiceLocationEmail : newTime?.practiceLocationEmail,
        PracticeLocationAddress: isReschedule == "true" ? GetAppointmentByIDData[0]?.practiceLocationAddress : newTime?.practiceLocationAddress,
        PracticeLocationLongitude: '',
        PracticeLocationLatitude: '',
        PracticeWebURL: '',
        nhiNumber: '',
        PracticeLogo: '',
        InternalSourceSystemID: '',
        customerID: isReschedule == "true" ? GetAppointmentByIDData[0]?.customerID : AddCustomerdata?.id,
        invoiceID: isReschedule == "true" ? GetAppointmentByIDData[0]?.invoiceID : CreateInvoicewithItemsData?.id,
        AppointmentStatusID: isReschedule == "true" ? GetAppointmentByIDData[0]?.appointmentStatusID : '22',
        //AppointmentTypeID: payloadForAppointment?.appointmentTypeID,
        AppointmentStatus: isReschedule == "true" ? GetAppointmentByIDData[0]?.appointmentStatus : 'Not Confirmed',
        Charges: isReschedule == "true" ? GetAppointmentByIDData[0]?.charges : 0,
        isBooked: true,
        bookingSource: "online",
        //services: payloadForAppointment?.selectedService,
        appointmentServices: serviceForPayload,
        isActive: true,
        Cancel: CancelAppointment == true ? true : false,
        SlotID: [newTime.slotID],
        indiciPatientID: isReschedule == "true" ? GetAppointmentByIDData[0]?.indiciPatientID : '',
        gender: isReschedule == "true" ? GetAppointmentByIDData[0]?.gender : '',
        indiciPracticeLocationID: isReschedule == "true" ? GetAppointmentByIDData[0]?.indiciPracticeLocationID : newTime?.indiciPracticeLocationID,
        age: isReschedule == "true" ? GetAppointmentByIDData[0]?.age : 0,
        fundingRule: isReschedule == "true" ? GetAppointmentByIDData[0]?.fundingRule : [],
        dateOfBirth: isReschedule == "true" ? GetAppointmentByIDData[0]?.dateOfBirth : dayjs(newTime?.insertedAt).format("YYYY-MM-DDTHH:mm:ss"),
        paymentIntentId: isReschedule == "true" ? GetAppointmentByIDData[0]?.paymentIntentId : '',
        paymentMethod: isReschedule == "true" ? GetAppointmentByIDData[0]?.paymentMethod : '',
        paymentStatus: isReschedule == "true" ? GetAppointmentByIDData[0]?.paymentStatus : '',
        isReschedule: isReschedule == "true" ? true : false,
        paymentFailureReason: isReschedule == "true" ? GetAppointmentByIDData[0]?.paymentFailureReason : '',
        isBackButtonClick: false,
        insertedAt: isReschedule == "true" ? GetAppointmentByIDData[0]?.insertedAt : dayjs(newTime?.insertedAt).format("YYYY-MM-DDTHH:mm:ss"),
        AgeType: isReschedule == "true" ? GetAppointmentByIDData[0]?.ageType : '',
        promotionCode: isReschedule == "true" ? GetAppointmentByIDData[0]?.promotionCode : '',
        couponID: isReschedule == "true" ? GetAppointmentByIDData[0]?.couponID : '',
      }

      dispatch(appServices.AddAppointment(obj));
    };
    if (!isReschedule) {
      let objj = {
        "customerID": ""
      }
      dispatch(appServices.AddCustomerData(objj));

      let raw = {
        "patientID": "",
        "customerID": "",
        "isAddCustomer": false,
        "ResidentialStatus": "",
        "insurance": []
      }
      dispatch(appServices.AddPatientForMedicare(raw));

      dispatch(appServices.GetPracticeforPaymentConfigration({ practiceID: query.get("practice") }));
    }
  }

  useEffect(() => {
    const isReschedule = query.get("isReschedule") === "true";

    if (isReschedule && AddAppointmentData && GetPatientByIDData) {
      const timeout = setTimeout(() => {
        setconfirmationmodalOpen(true);
      }, 2000); // 2 seconds

      // Clear timeout if component unmounts or dependencies change
      return () => clearTimeout(timeout);
    }
  }, [AddAppointmentData, GetPatientByIDData]);

  useEffect(() => {
    // console.log(AddCustomerdata, "AddCustomerdata")
    // console.log(SearchProvidersFromOctansServiceData, "SearchProvidersFromOctansServiceData")
    if (SearchProvidersFromOctansServiceData && AddCustomerdata) {
      let index = SearchProvidersFromOctansServiceData?.findIndex((item) => {
        return item?.providerID == providerId
      })
      // console.log("indexssss", index)
      let data = null
      if (index != -1) {
        data = SearchProvidersFromOctansServiceData[index]?.service?.find((item) => {
          return item.octansServiceID === query.get("service");
        });

        setServiceData(data);


        if (data != null) {
          let raww =
            [
              {
                priceID: data?.priceID,
                Customerid: AddCustomerdata?.id,
                InvoiceId: ""
              }
            ];
          // console.log(raww, "raww", data, "data", AddCustomerdata, "AddCustomerdata")
          dispatch(appServices.CreateInvoicewithItems(raww));
        }
      }

    }
  }, [AddCustomerdata])



  return (
    <div>
      <div className="space-y-2">
        <label className="text-sm font-medium">Select Date</label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-between text-left font-normal", // changed justify-start to justify-between
                !date && "text-muted-foreground"
              )}
            >
              <div className="flex items-center space-x-2">
                <CalendarIcon className="mr-2 h-4 w-4" />
                <span>{date ? format(date, "PPP") : "Select a date"}</span>
              </div>
              {isGetDayRoasterDataLoading && (
                <Spin size="small" className="ml-2" />
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateChange}
              initialFocus
              disabled={(date) => disabledDates(date)}
            />
          </PopoverContent>
        </Popover>
      </div>

      {date && (
        <Spin spinning={isSearchListOfSlotDataLoading} tip="">
          <div className="mt-6">
            <label className="text-sm font-medium">Select Time</label>

            <div className="mt-3 space-y-4">
              <h4 className="text-sm text-muted-foreground mb-2 fw-bold">Morning</h4>
              <div className="grid grid-cols-3 gap-2">
                {slots?.morning.map((slot) => (
                  <Button
                    key={slot}
                    type="button"
                    variant={time === slot ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => handleTimeChange(slot)}
                  >
                    {dayjs(slot?.startTime).format("HH:mm")
                      // + " - " + dayjs(slot?.endTime).format("HH:mm")
                    }
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm text-muted-foreground mb-2 fw-bold">Afternoon</h4>
              <div className="grid grid-cols-3 gap-2">
                {slots?.afternoon.map((slot) => (
                  <Button
                    key={slot}
                    type="button"
                    variant={time === slot ? "default" : "outline"}
                    className="text-sm"
                    onClick={() => handleTimeChange(slot)}
                  >
                    {dayjs(slot?.startTime).format("HH:mm")
                      //  + " - " + dayjs(slot?.endTime).format("HH:mm")
                    }
                  </Button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <h4 className="text-sm text-muted-foreground mb-2 fw-bold">Evening</h4>
              <div className="grid grid-cols-3 gap-2">
                {slots?.evening?.length > 0 ? (
                  slots?.evening.map((slot) => (
                    <Button
                      key={slot}
                      type="button"
                      variant={time === slot ? "default" : "outline"}
                      className="text-sm"
                      onClick={() => handleTimeChange(slot)}
                    >
                      {dayjs(slot?.startTime).format("HH:mm")
                        // + " - " + dayjs(slot?.endTime).format("HH:mm")
                      }
                    </Button>
                  ))
                ) : (
                  <p>No slots available</p>
                )}
              </div>
            </div>
          </div>
        </Spin>
      )}


      <div>
      </div>
    </div >
  );
};
