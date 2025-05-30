
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MdCheckCircle, MdLocationOn, MdApartment } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useQuery } from "@/shared/hooks/useQuery";

export function BookingConfirmationModal({
  open,
  rescheduleSelectedSlot,
  onOpenChange,
  patientName,
  setconfirmationmodalOpen,
  confirmationmodalOpen,
  selectedSlot,
}) {
  const navigate = useNavigate();
  const query = useQuery();
  const isReschedule = query.get("isReschedule");
  const { UpdatePatientForPaymentsData } = useSelector((state: any) => state.UpdatePatientForPayments);
  const { SearchListOfSlotData, SearchListOfSlotDataClear } = useSelector((state: any) => state.SearchListOfSlot);
  const { GetAppointmentByIDData, GetAppointmentByIDDataClear } = useSelector((state: any) => state.GetAppointmentByID);
  const {CheckOtpAgainstAppointmentData,CheckOtpAgainstAppointmentDataClear,} = useSelector((state: any) => state.CheckOtpAgainstAppointment);
  const { AddAppointmentDataClear, AddAppointmentData } = useSelector((state: any) => state.AddAppointment);
  const { UpdatePatientForPaymentsClear } = useSelector((state: any) => state.UpdatePatientForPayments);

  const [userinfo, setUserInfo] = useState({
    userName: "",
    ProviderName: "",
    time: "",
    date: "",
    location: "",
    address: "",
  });

  useEffect(() => {
    if (UpdatePatientForPaymentsData && SearchListOfSlotData?.length > 0) {
      if (selectedSlot) {
        setUserInfo({
          userName: patientName,
          ProviderName: selectedSlot?.providerName,
          date: selectedSlot?.diaryDate,
          location: selectedSlot?.practiceLocationName,
          address: selectedSlot?.practiceLocationAddress,
          time: selectedSlot?.startTime,
        });
      } else {
        console.warn("No matching slot found for slotID:",UpdatePatientForPaymentsData?.slotID );
      }
    }
  }, [open]);

  useEffect(() => {
    if (isReschedule == "true" && GetAppointmentByIDData && AddAppointmentData) {
      setUserInfo({
        userName: GetAppointmentByIDData[0]?.patientName,
        ProviderName: GetAppointmentByIDData[0]?.providerName,
        date: GetAppointmentByIDData[0]?.appointmentDate,
        location: GetAppointmentByIDData[0]?.practiceLocationName,
        address: GetAppointmentByIDData[0]?.practiceLocationAddress,
        time: GetAppointmentByIDData[0]?.appointmentStartTime,
      });
    }

  }, [open, GetAppointmentByIDData, AddAppointmentData]);

  useEffect(() => {
    if (CheckOtpAgainstAppointmentData && UpdatePatientForPaymentsData && SearchListOfSlotData?.length > 0) {
      if (selectedSlot) {
        setUserInfo({
          userName: patientName,
          ProviderName: selectedSlot?.providerName,
          date: selectedSlot?.diaryDate,
          location: selectedSlot?.practiceLocationName,
          address: selectedSlot?.practiceLocationAddress,
          time: selectedSlot?.startTime,
        });
      } else {
        console.warn("No matching slot found for slotID:", UpdatePatientForPaymentsData?.slotID);
      }
    }
  }, [open, UpdatePatientForPaymentsData]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center p-6 space-y-4">
        <MdCheckCircle className="mx-auto h-20 w-20 text-green-500" />
        <h2 className="text-2xl font-bold"> See You Soon, {userinfo.userName}!</h2>
        <p className="text-sm text-gray-600">Thanks for booking with us.</p>
        <p className="text-sm text-gray-600">
          We are delighted to inform you that your appointment has been
          successfully booked with{" "}
          <span className="font-semibold">{userinfo.ProviderName}</span> at{" "}
          <span className="font-semibold">{userinfo.time}</span> on{" "}
          <span className="font-semibold">{userinfo.date}</span>.
        </p>
        <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
          <MdLocationOn className="h-5 w-5 text-muted-foreground" />
          <span className="font-medium">{userinfo.location}</span>
        </div>

        <div className="flex items-center justify-center gap-2 text-sm text-gray-700">
          <MdApartment className="h-5 w-5 text-muted-foreground" />
          <span>{userinfo.address}</span>
        </div>

        <Button
          className="mt-4 w-full"
          onClick={() => {
            navigate("/");
            CheckOtpAgainstAppointmentDataClear("");
            AddAppointmentDataClear("");
            GetAppointmentByIDDataClear("");
            SearchListOfSlotDataClear("");
            UpdatePatientForPaymentsClear("");
          }}
        >
          Go to Homepage
        </Button>
      </DialogContent>
    </Dialog>
  );
}
