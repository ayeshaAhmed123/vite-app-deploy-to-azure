import React, { useState } from 'react';
import { Modal, Input, Button, notification } from 'antd';
import { useEffect } from 'react';
import { OTPProps } from 'antd/es/input/OTP';
import { useDispatch, useSelector } from 'react-redux';
import { appServices } from '@/shared/redux/actions/appServices';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { BookingConfirmationModal } from '../ui/BookingConfirmationModal';

const OtpModal = ({ visible, onCancel, setShowOtpModal }) => { // Controls modal visibility
  const [otp, setOtp] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);
  const [confirmationmodalOpen, setconfirmationmodalOpen] = useState<boolean>(false);
  const [isOtpValid, setIsOtpValid] = useState<boolean>(true); // For OTP validation
  const { AddAppointmentData } = useSelector((state: any) => state.AddAppointment);
  const { CheckOtpAgainstAppointmentData, isCheckOtpAgainstAppointmentDataLoading } = useSelector((state: any) => state.CheckOtpAgainstAppointment);
  const closeModal = () => onCancel();
  const dispatch = useDispatch<ThunkDispatch<any, undefined, AnyAction>>();

  const handleSubmit = () => {
    const raw = {
      appointmentID: AddAppointmentData?.appointmentID,
      mobileCode: otp
    };
    dispatch(appServices.CheckOtpAgainstAppointment(raw))
  };


  useEffect(() => {
    if (CheckOtpAgainstAppointmentData) {
      if (CheckOtpAgainstAppointmentData?.status === "success") {
        notification.success({ message: "OTP Verified Successfully!" });
        // setShowOtpModal(false); // Close OTP modal
        // setconfirmationmodalOpen(true);
        onCancel(false,true);
      } else {
        setIsOtpValid(false);
        notification.error({
          message: "Invalid OTP, please try again",
        });
      }
    }
    console.log(confirmationmodalOpen,"setconfirmationmodalOpen")
  }, [CheckOtpAgainstAppointmentData]);

  const onChange: OTPProps['onChange'] = (text) => {
    setOtp(text);
  };

  const onInput: OTPProps['onInput'] = (value) => {
    setIsDisabled(value.length !== 4);
  };

  const sharedProps: OTPProps = {
    onChange,
    onInput,
  };
  return (
    <div>
      <Modal
        title=""
        maskClosable={false} 
        open={visible}
        onCancel={()=>{onCancel(false,false)}}
        footer={null}
        centered
      >
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontWeight: "bold", marginBottom: "10px", fontSize: '20px' }}>OTP Verification</p>
          <h4 style={{ marginBottom: "10px" }}>Enter the 4-digit OTP sent to your phone</h4>

          <Input.OTP length={4} formatter={(str) => str.toUpperCase()} {...sharedProps} value={otp} />
          {/* {!isOtpValid && <p style={{ color: 'red' }}>Invalid OTP, please try again</p>} */}

          <div style={{ marginTop: '20px' }}>
            <Button
              style={{ backgroundColor: "#013174", color: "white", height: '40px', width: '140px', fontSize: '16px' }}
              onClick={handleSubmit}
              loading={isCheckOtpAgainstAppointmentDataLoading}
              disabled={isDisabled}
            >
              Verify OTP
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OtpModal;
