
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { differenceInYears, parse } from 'date-fns';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css'; // 
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { notification, Typography } from "antd";
import { CancelModal } from "@/components/ui/CancelModal";
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { DateTimePicker } from "@/components/booking/DateTimePicker";
import { Provider } from "@/types";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { appServices } from "@/shared/redux/actions/appServices";
import { useQuery } from "@/shared/hooks/useQuery";
import { getOptionsArray } from "@/shared/utils/utils";
import IndiciPhoneInput from "../ui/IndiciPhoneInput";
import OtpModal from "../ui/OtpModal";
import { BookingConfirmationModal } from "../ui/BookingConfirmationModal";
import StripePayment from "../ui/StripePayment";
import { Spin } from "antd";


interface BookingFormProps {
  provider: Provider | any;
}

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  DateOfBirth: z.string().min(1, "DateOfBirth is required"),
  Gender: z.string().min(1, "Gender is required"),
  Age: z.number().min(15, "Age must be 15 or older"),
  Ethnicity: z.string().min(1, "Ethnicity is required"),

});

export const BookingForm = ({ provider }: BookingFormProps) => {
  const navigate = useNavigate();
  const query = useQuery()
  const isCancel = query.get("isCancel");

  const [formValues, setFormValues] = useState<z.infer<typeof formSchema> | null>(null);
  // const { providerId, practice, location } = useParams<{ providerId: string, practice: string, location: string }>();
  const providerId = query.get("providerid")
  const isReschedule = query.get("isReschedule");
  const [cancelMessage, setCancelMessage] = useState(null);
  const [CancelAppointment, setCancelAppointment] = useState("false");
  const { GetDayRoasterData, isGetDayRoasterDataLoading } = useSelector((state: any) => state.GetDayRoaster);
  const { CancelAppointmentByIdData } = useSelector((state: any) => state.CancelAppointmentById);
  const { PublicAccessTokenData } = useSelector((state: any) => state.PublicAccessToken);
  const dispatch = useDispatch<ThunkDispatch<any, undefined, AnyAction>>();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [isPaymentMethod, setIsPaymentMethod] = useState<boolean>(false)
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [enabledDatesArray, setEnabledDatesArray] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [GenderArr, setGenderArr] = useState([]);
  const [EthnicityArr, setEthnicityArr] = useState([]);
  const [ShowOtpModal, setShowOtpModal] = useState(false);
  const [isAddingAppointment, setIsAddingAppointment] = useState(false);

  const [confirmationmodalOpen, setconfirmationmodalOpen] = useState<boolean>(false);
  const [isStripeProcessing, setIsStripeProcessing] = useState<boolean>(false);
  const [stripeError, setStripeError] = useState<string>('');
  const { GenerateInvitationData } = useSelector((state: any) => state.GenerateInvitation);
  const { GetAllGendersData, isGetAllGendersDataLoading } = useSelector((state: any) => state.GetAllGenders);
  const { GetAllEthnicityData, isGetAllEthnicityDataLoading } = useSelector((state: any) => state.GetAllEthnicity);
  const { isUpdateDataforNotconfrimbookingDataLoading, UpdateDataforNotconfrimbookingData } = useSelector((state: any) => state.UpdateDataforNotconfrimbooking);
  const { SearchListOfSlotData } = useSelector((state: any) => state.SearchListOfSlot);
  const { AddPatientForMedicareData } = useSelector((state: any) => state.AddPatientForMedicare);
  const { AddCustomerdata } = useSelector((state: any) => state.AddCustomerData);
  const { CreateInvoicewithItemsData } = useSelector((state: any) => state.CreateInvoicewithItems);
  const { CheckOtpAgainstAppointmentData } = useSelector((state: any) => state.CheckOtpAgainstAppointment);
  const { UpdatePatientForPaymentsData } = useSelector((state: any) => state.UpdatePatientForPayments);
  const { SearchProvidersFromOctansServiceData } = useSelector((state: any) => state.SearchProvidersFromOctansService);
  const { GetLocationFromOctansServiceData, isGetLocationFromOctansServiceDataLoading } = useSelector((state: any) => state.GetLocationFromOctansService);
  const { AddAppointmentData } = useSelector((state: any) => state.AddAppointment);
  const [EnableAfterSelectSlot, setEnableAfterSelectSlot] = useState(true)
  const { GetAppointmentByIDData } = useSelector((state: any) => state.GetAppointmentByID);
  const { GetPatientByIDData } = useSelector((state: any) => state.GetPatientByID);
  const { CreatePaymentData } = useSelector((state: any) => state.CreatePayment);
  const [paymentcharges, setPaymentCharges] = useState<number>(0);
  const [serviceData, setServiceData] = useState<any>(null);
  const [selectedSlot, setSelectedSlot] = useState<any>(null);
  const [rescheduleSelectedSlot, setrescheduleSelectedSlot] = useState<any>(null);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      Age: 0,
      DateOfBirth: "",
      Ethnicity: "",
      Gender: "",
    },
  });

  const [patientName, setPatientName] = useState('');
  const gendersArray = [
    {
      genderID: "8F9D909A-12DD-43E9-A3BA-9E23EDDED130",
      genderName: "Male",
      genderCode: ""
    },
    {
      genderID: "14BA173C-DED2-47A9-9E5D-434B6384121C",
      genderName: "Female",
      genderCode: ""
    },
    {
      genderID: "26A22C1F-5428-4673-B5D2-E0DBFD00D809",
      genderName: "Other",
      genderCode: ""
    }
  ];

  // You can transform this into a simpler format if needed:
  const genderOptions = gendersArray.map(g => ({
    value: g.genderID,
    label: g.genderName
  }));
  const years = Array.from({ length: 130 }, (_, i) => new Date().getFullYear() - i);
  const handleDateTimeChange = (date: Date | undefined) => {
    // setSelectedDate(date);
    // setSelectedTime(time);
    let obj = {
      ProviderID: isReschedule == "true" ? GetAppointmentByIDData[0]?.providerID : providerId,
      PracticeLocationID: isReschedule == "true" ? GetAppointmentByIDData[0]?.practiceLocationID : query.get("location"),
      PracticeID: isReschedule == "true" ? GetAppointmentByIDData[0]?.practiceID : query.get("practice"),
      AppointmentDate: dayjs(date).format("DD-MM-YYYY")
    }

    dispatch(appServices.SearchListOfSlot(obj));
  };


  useEffect(() => {
    // dispatch(appServices.GetAllGenders(''));
    dispatch(appServices.GetAllEthnicity(''));
  }, [dispatch]);

  useEffect(() => {
    if (GetAllEthnicityData) {
      const options = getOptionsArray(
        GetAllEthnicityData,
        "ethnicityID",
        "ethnicGroupDescription"
      );
      setEthnicityArr(options);
    }
  }, [GetAllEthnicityData]);

  const handleBookingAppointment = () => {
    const formValues = form.getValues();
    const selectedGender = genderOptions.find(
      (item) => item.value === formValues?.Gender
    );
    if (isReschedule !== "true") {
      let obj = {
        "appointmentID": AddAppointmentData?.appointmentID,
        "patientID": AddPatientForMedicareData?.patientID,
        "firstName": formValues?.firstName,
        "lastName": formValues?.lastName,
        "email": formValues?.email,
        "patientPhoneNumber": formValues?.phone,
        "dateOfBirth": dayjs(formValues?.DateOfBirth).format("YYYY-MM-DD"),
        // "gender": GenderArr?.find((item) => item?.value === formValues?.Gender)?.label,
        "gender": selectedGender?.label || "",
        "patientRelationship": "",
        "isDependent": false,
        "chronicMedicalCondition": false,
        "age": formValues?.Age,
        "ethnicityLookup": [
          {
            "ethnicityID": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.ethnicityID,
            "ethnicGroupcode": 0,
            "ethnicGroupDescription": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.ethnicGroupDescription,
            "isDeleted": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.isDeleted,
            "sequenceNo": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.sequenceNo,
            "updatedBy": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.updatedBy,
            "updatedByID": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.updatedByID,
            "insertedBy": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.insertedBy,
            "insertedByID": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.insertedByID,
            "insertedAt": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.insertedAt,
            "updatedAt": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.updatedAt
          }
        ],
        "indiciPracticeLocationID": null,
        "customerID": AddCustomerdata?.id,
        "paymentIntentId": "",
        "invoiceID": CreateInvoicewithItemsData?.id,
        "charges": CreateInvoicewithItemsData?.total,
        "promotionCode": "",
        "couponID": "",
        "practiceLocationID": query.get("location")
      }
      dispatch(appServices.UpdateDataforNotconfrimbooking(obj));
    }
  }


  useEffect(() => {
    if (UpdatePatientForPaymentsData) {
      setIsPaymentMethod(false)
      setconfirmationmodalOpen(true);

    }
  }, [UpdatePatientForPaymentsData])

  useEffect(() => {
    if (CheckOtpAgainstAppointmentData) {
      handleUpdateForPyament()
      setconfirmationmodalOpen(true);

    }
    console.log(patientName, "setPatientName")
  }, [CheckOtpAgainstAppointmentData])

  const handleUpdateForPyament = () => {
    const formValues = form.getValues();
    const name = `${formValues?.firstName} ${formValues?.lastName}`;
    const encodedName = encodeURIComponent(name);
    console.log(encodedName, "encodedName")
    setPatientName(name)
    const selectedGender = genderOptions.find(
      (item) => item.value === formValues?.Gender
    );
    if (isReschedule !== "true") {
      let raw = {
        "appointmentID": AddAppointmentData?.appointmentID,
        "patientID": AddPatientForMedicareData?.patientID,
        "firstName": formValues?.firstName,
        "lastName": formValues?.lastName,
        "email": formValues?.email,
        "patientPhoneNumber": formValues?.phone,
        "dateOfBirth": dayjs(formValues?.DateOfBirth).format("YYYY-MM-DD"),
        "gender": selectedGender?.label || "",
        // "gender": GenderArr?.find((item) => item?.value === formValues?.Gender)?.label,
        "patientRelationship": "",
        "isDependent": false,
        "chronicMedicalCondition": false,
        "age": formValues?.Age,
        "ethnicityLookup": [
          {
            "ethnicityID": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.ethnicityID,
            "ethnicGroupcode": 0,
            "ethnicGroupDescription": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.ethnicGroupDescription,
            "isDeleted": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.isDeleted,
            "sequenceNo": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.sequenceNo,
            "updatedBy": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.updatedBy,
            "updatedByID": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.updatedByID,
            "insertedBy": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.insertedBy,
            "insertedByID": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.insertedByID,
            "insertedAt": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.insertedAt,
            "updatedAt": GetAllEthnicityData?.find((item) => item?.ethnicGroupDescription === formValues?.Ethnicity)?.updatedAt
          }
        ],
        // "indiciPracticeLocationID": null,
        "fundingRule": [],
        "genderID": "8F9D909A-12DD-43E9-A3BA-9E23EDDED130",
        "insuranceID": "",
        "insuranceName": "",
        "isPatientExist": false,
        "isPatientInsured": false,
        "notes": "123456",
        "patientMobileNumber": formValues?.phone,
        "policyNumber": "",
        "customerID": AddCustomerdata?.id,
        "invoiceID": CreateInvoicewithItemsData?.id,
        "charges": CreateInvoicewithItemsData?.total,
        "isEmailSend": true,
        "promotionCode": "",
        "couponID": "",
        "practiceLocationID": query.get("location"),
        "practiceID": query.get("practice"),
        "communicationMedium": [],
        "paymentStatus": CreateInvoicewithItemsData?.total > 0 ? "paid" : "notpaid",
        "paymentMethod": CreateInvoicewithItemsData?.total > 0 ? "online" : "",
      }

      dispatch(appServices.UpdatePatientForPayments(raw));
    }
  }

  useEffect(() => {
    if (UpdateDataforNotconfrimbookingData) {
      const formValues = form.getValues();
      if (CreateInvoicewithItemsData && CreateInvoicewithItemsData?.total > 0) {
        setIsPaymentMethod(true);
      }
      else {
        const name = `${formValues?.firstName} ${formValues?.lastName}`;
        const encodedName = encodeURIComponent(name);

        let raw = {
          appointmentID: AddAppointmentData?.appointmentID,
          patientEmail: formValues?.email,
          patientPhoneNumber: formValues?.phone,
          patientName: encodedName,
        };

        dispatch(appServices.GenerateInvitation(raw));

        setShowOtpModal(true);
      }
    }
  }, [UpdateDataforNotconfrimbookingData]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select both a date and time for your appointment");
      return;
    }
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);

      toast.success("Appointment booked successfully!");

      // Navigate to confirmation page
      navigate("/booking/confirmation", {
        state: {
          booking: {
            ...values,
            provider: provider.name,
            providerId: provider.id,
            date: selectedDate,
            time: selectedTime,
          }
        }
      });
    }, 1500);
  };
  // const enabledDatesArray = GetDayRoasterData?.map(item => dayjs(item?.date).format('YYYY-MM-DD'));
  const disabledDates = (date: Date | undefined) => {
    return !enabledDatesArray?.includes(dayjs(date).format('YYYY-MM-DD'));
  };
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

    return { morning, afternoon, evening };
  };
  useEffect(() => {
    setEnabledDatesArray(GetDayRoasterData?.map(item =>

      dayjs(item?.date).format('YYYY-MM-DD')));
  }, [GetDayRoasterData])


  // useEffect(() => {
  //   if (displayRoasterDates.length > 0 && providerDate != null) {

  //     const Dates: any[] = []
  //     const datesArray: any[] = []

  //     if (preBookingService != "" && preBookingService != 0) {
  //       if (providerDate.allowWorkonHoliday == true) {
  //         for (let i = 0; i < preBookingService; i++) {
  //           const date = dayjs().add(i, "day").format('YYYY-MM-DD')
  //           datesArray.push(date)
  //         }
  //         displayRoasterDates.filter((item: any) => !datesArray.includes(prebookingDateFormat(item.date)) && item.leaveTitle.trim().toLowerCase() !== "full leave").map((dayRoaterDate: any) => {
  //           Dates.push(prebookingDateFormat(dayRoaterDate.date))
  //         })
  //       } else {
  //         for (let i = 0; i < preBookingService; i++) {
  //           const date = dayjs().add(i, "day").format('YYYY-MM-DD')
  //           datesArray.push(date)
  //         }

  //         displayRoasterDates.filter((item: any) => !datesArray.includes(prebookingDateFormat(item.date)) && item.leaveTitle.trim().toLowerCase() !== "full leave" && item.holidayID == "").map((dayRoaterDate: any) => {
  //           Dates.push(prebookingDateFormat(dayRoaterDate.date))
  //         })
  //       }

  //     } else {

  //       if (providerDate.allowWorkonHoliday == true) {
  //         displayRoasterDates.filter((days: any) => days.leaveTitle.trim().toLowerCase() !== "full leave").map((dayRoaterDate: any) => {
  //           Dates.push(prebookingDateFormat(dayRoaterDate.date))
  //         })
  //       } else {
  //         displayRoasterDates.filter((days: any) => days.leaveTitle.trim().toLowerCase() !== "full leave" && days.holidayID == "").map((dayRoaterDate: any) => {
  //           Dates.push(prebookingDateFormat(dayRoaterDate.date))
  //         })
  //       }
  //     }

  //     setEnabledDates(Dates)
  //   }
  // }, [displayRoasterDates, preBookingService, providerDate])


  const handlePaymentComplete = () => {
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsPaymentMethod(false);

      toast.success("Appointment booked successfully!");

      // Navigate to confirmation page
      navigate("/booking/confirmation", {
        state: {
          booking: {
            ...formValues,
            provider: provider.name,
            providerId: provider.id,
            date: selectedDate,
            time: selectedTime,
          }
        }
      });
    }, 1500);
  };

  useEffect(() => {
    if (SearchListOfSlotData) {
      setEnableAfterSelectSlot(false)
    }
  }, [SearchListOfSlotData])

  useEffect(() => {
    let reschedule = query.get("isReschedule");
    if (reschedule && GetAppointmentByIDData) {

      dispatch(appServices.GetPatientByID({ PatientID: GetAppointmentByIDData[0]?.patientID }));
      // dispatch(appServices.GetPatientByID({ PatientID: "29dcccb1-d827-49cc-9a6d-3b7904e92c97" }));
    }
  }, [GetAppointmentByIDData])

  useEffect(() => {
    if (GetAppointmentByIDData && GetAppointmentByIDData.length > 0 && GetPatientByIDData) {
      const patientName = GetAppointmentByIDData[0]?.patientName || "";
      const nameParts = patientName.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const selectedGender = genderOptions.find(
        (item) => item.label === GetAppointmentByIDData[0]?.gender
      );

      console.log(selectedGender, "selectedGender")
      form.reset({
        firstName,
        lastName,
        email: GetAppointmentByIDData[0]?.patientEmail || "",
        phone: GetAppointmentByIDData[0]?.patientPhoneNumber || "",
        DateOfBirth: GetAppointmentByIDData[0]?.dateOfBirth || "",
        Gender: selectedGender?.value || '',
        Age: GetAppointmentByIDData[0]?.age || 0,
        Ethnicity: GetPatientByIDData[0]?.ethnicityLookup[0]?.ethnicGroupDescription,

      });
      // handleDateTimeChange(GetAppointmentByIDData[0]?.appointmentDate)
    }

  }, [GetAppointmentByIDData, GetPatientByIDData]);


  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-4">Select Date & Time</h3>
                <DateTimePicker onDateTimeChange={handleDateTimeChange}
                  //  slotClick={slotClick}
                  disabledDates={disabledDates}
                  slots={SearchListOfSlotData && categorizeEvents(SearchListOfSlotData)}
                  setServiceData={setServiceData}
                  setSelectedSlot={setSelectedSlot}
                  serviceData={serviceData}
                  isReschedule={isReschedule}
                  CancelAppointment={CancelAppointment}
                  setconfirmationmodalOpen={setconfirmationmodalOpen}
                />
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Booking Summary</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Provider:</span>
                    {SearchProvidersFromOctansServiceData?.[0]?.providerName || "No provider available"}
                    {/* <span className="">{SearchProvidersFromOctansServiceData[0]?.providerName}</span> */}
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground font-medium">Location:</span>
                    <span>
                      {SearchProvidersFromOctansServiceData?.[0]?.providerPractice?.[1]?.practiceLocationName}
                    </span>

                  </div>
                  {selectedDate && selectedTime && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground font-medium">Appointment:</span>
                      <span>{format(selectedDate, "PPP")} at {selectedTime}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Service:</span>
{/* const AlloctansServiceName=SearchProvidersFromOctansServiceData?.[0]?.service?.find(u=u.octansServiceID===octansServiceName) */}
                    <span>   {SearchProvidersFromOctansServiceData?.[0]?.service?.[2]?.octansServiceName}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John" {...field} required disabled={EnableAfterSelectSlot || isReschedule == "true"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Doe" {...field} required disabled={EnableAfterSelectSlot || isReschedule == "true"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="john.doe@example.com" {...field} required disabled={EnableAfterSelectSlot || isReschedule == "true"} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                disabled={EnableAfterSelectSlot || isReschedule == "true"}  // This only affects FormField
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <IndiciPhoneInput
                        placeholder="Enter Phone Number"
                        value={field.value}
                        disabled={EnableAfterSelectSlot || isReschedule == "true"}  // <== Pass disabled here
                        onChange={(newValue) => {
                          field.onChange(newValue);
                          if (newValue) {
                            try {
                              const phoneNumber = parsePhoneNumberWithError(newValue, "NZ");
                              const formattedPhoneNumber = phoneNumber.format("E.164");
                              field.onChange(formattedPhoneNumber); // Update with formatted phone number
                            } catch (error) {
                              console.error("Error parsing phone number:", error.message);
                            }
                          }
                        }}
                        onBlur={field.onBlur}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <FormField
                  control={form.control}
                  name="DateOfBirth"
                  disabled={EnableAfterSelectSlot || isReschedule == "true"}
                  render={({ field }) => {
                    const [year, setYear] = useState(new Date().getFullYear());
                    const [month, setMonth] = useState(new Date().getMonth());

                    const handleDateChange = (date: Date) => {
                      const isoDate = date.toISOString();
                      const age = calculateAge(date);

                      field.onChange(isoDate);
                      form.setValue("Age", age);
                    };

                    const calculateAge = (dob: Date) => {
                      const today = new Date();
                      let age = today.getFullYear() - dob.getFullYear();
                      const m = today.getMonth() - dob.getMonth();
                      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
                        age--;
                      }
                      return age;
                    };

                    return (
                      <FormItem >
                        <FormLabel>Date of Birth</FormLabel>
                        <FormControl >
                          <Popover >
                            <PopoverTrigger asChild>
                              <Button variant="outline" className="w-full justify-content-space-between">
                                {field.value ? new Date(field.value).toLocaleDateString() : "Select Date"}
                                <CalendarIcon className="ml-2 h-4 w-4" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-2">
                              <div className="flex justify-between mb-2">
                                <select
                                  className="border rounded px-2 py-1"
                                  value={year}
                                  onChange={(e) => {
                                    const newYear = parseInt(e.target.value, 10);
                                    setYear(newYear);
                                  }}
                                >
                                  {years.map((y) => (
                                    <option key={y} value={y}>
                                      {y}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              <Calendar
                                month={new Date(year, month)}
                                selected={field.value ? new Date(field.value) : undefined}
                                onMonthChange={(date) => {
                                  setMonth(date.getMonth());
                                  setYear(date.getFullYear());
                                }}
                                disabled={(date) => date > new Date()}
                                onDayClick={(date) => handleDateChange(date)}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />

                <FormField
                  control={form.control}
                  name="Age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input value={field.value} readOnly disabled={EnableAfterSelectSlot || isReschedule == "true"} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <FormField
                  control={form.control}
                  name="Gender"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          disabled={EnableAfterSelectSlot || isReschedule === "true"}
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                          </SelectTrigger>
                          <SelectContent>
                            {genderOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />


                <FormField
                  control={form.control}
                  name="Ethnicity"
                  disabled={EnableAfterSelectSlot || isReschedule == "true"}
                  render={({ field }) => {
                    const selectedLabel = EthnicityArr.find(
                      (option: any) => option.value === field.value
                    )?.value;

                    return (
                      <FormItem>
                        <FormLabel>Ethnicity</FormLabel>
                        <FormControl>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                            disabled={field.disabled}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select Ethnicity">
                                {selectedLabel}
                              </SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {EthnicityArr.map((option: any) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.value}

                                </SelectItem>
                              ))}

                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
            </div>

          </div>

          <div className="border-t pt-6 flex justify-end">
            <Button
              type="submit"
              size="lg"
              onClick={handleBookingAppointment}
              disabled={isUpdateDataforNotconfrimbookingDataLoading}
              className="flex items-center gap-2"
            >
              Book Appointment
              {isUpdateDataforNotconfrimbookingDataLoading && (
                <Spin size="small" style={{ color: "#ffffff" }} />
              )}
            </Button>
          </div>

        </form>

      </Form>
      {ShowOtpModal &&
        <>
          <OtpModal
            visible={ShowOtpModal}
            onCancel={(otp, confirm) => {
              setShowOtpModal(otp);
              setconfirmationmodalOpen(confirm)

            }}
            setShowOtpModal={setShowOtpModal}
          />
        </>
      }

      {
        isPaymentMethod &&

        <StripePayment
          isStripeProcessing={isStripeProcessing}
          setIsStripeProcessing={setIsStripeProcessing}
          stripeError={stripeError}
          setStripeError={setStripeError}
          UpdatePatientForPayments={handleUpdateForPyament}
          isPaymentMethod={isPaymentMethod}
          setIsPaymentMethod={setIsPaymentMethod}
          seletedFundingRules={''} payloadForAppointment={''} payloadForPatient={''} appliedFundingRulesArray={undefined} />
      }
      {
        confirmationmodalOpen &&
        <>
          <BookingConfirmationModal
            open={confirmationmodalOpen}
            onOpenChange={setconfirmationmodalOpen}
            setconfirmationmodalOpen={setconfirmationmodalOpen}
            confirmationmodalOpen={confirmationmodalOpen}
            patientName={patientName}
            selectedSlot={selectedSlot}
            rescheduleSelectedSlot={rescheduleSelectedSlot}

          />
        </>
      }


    </>
  );
};

// Helper function for date formatting
function format(date: Date, formatString: string): string {
  // Simple date formatting function since we can't import date-fns
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  return date.toLocaleDateString('en-US', options);
}
