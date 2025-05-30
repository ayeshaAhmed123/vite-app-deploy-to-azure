
import { loadStripe } from '@stripe/stripe-js'
import React, { useEffect, useState } from 'react'
import { Elements } from "@stripe/react-stripe-js";
// import { actionAPI, useAppDispatch, useAppSelector } from '../../shared/utils'
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { appServices } from "@/shared/redux/actions/appServices";
import CheckoutForm from './CheckoutForm';
import { useQuery } from '@/shared/hooks/useQuery';
import { Modal, Spin } from 'antd';

// import { TRUE } from 'sass';
type PaymentGatewayProps = {
    UpdatePatientForPayments?: any
    isPaymentMethod?: boolean
    setIsPaymentMethod?: any
    seletedFundingRules: any
    payloadForAppointment: any
    payloadForPatient: any
    appliedFundingRulesArray: any
    stripeError: any
    setStripeError: any
    isStripeProcessing: any
    setIsStripeProcessing: any
}
const stripePromise = loadStripe("pk_test_51M3wzqGXSRcMomUFZYRA4KYDwy57ADi3KPyw5pgL6TsXeftuoV0BibkhE4UhRF0DhMzJSo5UAI3BXldqUvOANxA0004j02VNTx");

const StripePayment: React.FC<PaymentGatewayProps> = ({ setIsStripeProcessing, isStripeProcessing, stripeError, setStripeError,
    UpdatePatientForPayments, appliedFundingRulesArray, setIsPaymentMethod,
    isPaymentMethod, seletedFundingRules, payloadForPatient, payloadForAppointment }) => {
    const dispatch = useDispatch<ThunkDispatch<any, undefined, AnyAction>>();
    const query = useQuery()
    const [clientSecret, setClientSecret] = useState<string | undefined>('');
    // const apiDispatcher = useAppDispatch()
    const { AddCustomerdata } = useSelector((state: any) => state.AddCustomerData);
    const { AddAppointmentData } = useSelector((state: any) => state.AddAppointment);
    const { CreateInvoicewithItemsData } = useSelector((state: any) => state.CreateInvoicewithItems);
    const { StripeCheckOutSession }: any = useSelector((state: any) => state.StripeCheckOutSession);
    // const { StripeCheckOutSession, isStripeCheckOutSessionLoading }: any = useAppSelector(state => state.StripeCheckOutSession);
    // const { PaymentConfigrations }: any = useAppSelector(state => state.GetPracticeforPaymentConfigration);
    // const { ApplyPromotion, isApplyPromotionLoading }: any = useAppSelector(state => state.ApplyPromotionCode);
    // const { ApplyFunding, isApplyFundingLoading }: any = useAppSelector(state => state.ApplyFundingRule);
    const {isCreatePaymentDataLoading } = useSelector((state: any) => state.CreatePayment);
    useEffect(() => {
        if (isPaymentMethod == true) {

            let obj = {
                //state: isPaymentMethod>0 to paymenet else booking
                //invoive responce total 
                Amount: CreateInvoicewithItemsData?.total,
                // Amount: ApplyPromotion != null && ApplyPromotion?.message == "" ? ApplyPromotion.total : ApplyFunding?.message == "" ? ApplyFunding?.total : CreateInvoicewithItemsData?.message == "" ? CreateInvoicewithItemsData?.total : "",
                //invoive responce id
                InvoiceID: CreateInvoicewithItemsData?.id,
                PracticeID: query.get("practice"),
                AppointmentID: AddAppointmentData.appointmentID,
            }
            console.log(obj, "obj");
            dispatch(appServices.StripeCheckOutSession(obj))

        }

    }, [isPaymentMethod])
    console.log("stripePromise", stripePromise);
    // useEffect(() => {
    //     if (isPaymentMethod && ApplyPromotion!=null && PaymentConfigrations?.paymentEnvironment === "") {
    //         let obj = {
    //             Amount: ApplyPromotion != null && ApplyPromotion?.message == "" ? ApplyPromotion.total : ApplyFunding?.message == "" ? ApplyFunding?.total : CreateInvoicewithItemsData?.message == "" ? CreateInvoicewithItemsData?.total : "",
    //             InvoiceID: CreateInvoicewithItemsData != null && CreateInvoicewithItemsData != undefined ? CreateInvoicewithItemsData?.id : null,
    //             PracticeID: payloadForAppointment?.isSelectedSlotData?.practiceID,
    //             AppointmentID: payloadForPatient.appointmentID,
    //         }
    //       apiDispatcher(actionAPI.StripeCheckOutSession(obj))

    //     }
    //   }
    //     , [isPaymentMethod,ApplyPromotion])

    const appearance: any = {
        theme: 'stripe',
        variables: {
            colorPrimary: '#09e5ab',
        },
    };
    const options = {
        clientSecret: StripeCheckOutSession != null ? StripeCheckOutSession.clientSecret : '',
        appearance
    };
    const shouldRenderElements = StripeCheckOutSession != null ? StripeCheckOutSession.clientSecret : '';
    return (
        <Modal
            title=""
            open={isPaymentMethod}
            onCancel={() => { setIsPaymentMethod(false) }}
            footer={null}
            width={700}
            maskClosable={false} 
            centered
        >
            
            
            <div className="drop-down-select2  p-2 ">
                <div className="d-flex gap-2 flex-column p-2 h-100">
                    <span
                        style={{
                            fontWeight: 'bold',
                            borderBottom: '1px solid',
                            paddingBottom: '8px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '18px',
                            marginBottom: '10px'
                        }}
                    >
                        Proceed to Payment
                    </span>
                    <div className='h-100 overflowy-auto position-relative'>
                        {shouldRenderElements &&
                            <Elements
                                options={options}
                                stripe={stripePromise}>
                                <CheckoutForm
                                    UpdatePatientForPayments={UpdatePatientForPayments}
                                    stripeError={stripeError}
                                    setStripeError={setStripeError}
                                    appliedFundingRulesArray={appliedFundingRulesArray}
                                    isStripeProcessing={isStripeProcessing}
                                    setIsStripeProcessing={setIsStripeProcessing}
                                />
                            </Elements>
                        }
                    </div>

                </div>
              
            </div>
      
        </Modal>
    );

}

export default StripePayment