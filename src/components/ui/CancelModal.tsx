import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useQuery } from "@/shared/hooks/useQuery";

export function CancelModal({ open, onOpenChange }) {
  const navigate = useNavigate();
  const query = useQuery();
  const isCancel = query.get("isCancel");

  const { GetAppointmentByIDData, GetAppointmentByIDDataClear } = useSelector((state: any) => state.GetAppointmentByID);
  const { AddAppointmentData, AddAppointmentDataClear } = useSelector((state: any) => state.AddAppointment);
  const { UpdatePatientForPaymentsClear } = useSelector((state: any) => state.UpdatePatientForPayments);
  const { SearchListOfSlotDataClear } = useSelector((state: any) => state.SearchListOfSlot);
  const { CheckOtpAgainstAppointmentDataClear } = useSelector((state: any) => state.CheckOtpAgainstAppointment);

  const [userinfo, setUserInfo] = useState({
    userName: '',
    ProviderName: '',
    time: '',
    date: '',
  });

  useEffect(() => {
    if (isCancel === "true" && GetAppointmentByIDData) {
      setUserInfo({
        userName: GetAppointmentByIDData[0]?.patientName,
        ProviderName: GetAppointmentByIDData[0]?.providerName,
        date: GetAppointmentByIDData[0]?.appointmentDate,
        time: GetAppointmentByIDData[0]?.appointmentStartTime
      });
    }
  }, [open, GetAppointmentByIDData]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md text-center p-6 space-y-4">
        <h2 className="text-2xl font-bold">
          Dear {userinfo.userName}, Your Appointment
        </h2>
        <span className="font-semibold">
          Your Spot Check appointment at {userinfo.date} {userinfo.time} with {userinfo.ProviderName} has been cancelled.
        </span>

        <Button className="mt-4 w-full"
          onClick={() => {
            navigate("/");
          }}
        >
          Go to Homepage
        </Button>
      </DialogContent>
    </Dialog>
  );
}
