
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./button";
// import { useAppSelector } from "../../shared/utils";
// import { IButton } from "../Elements/IButton";
// import TagManager from 'react-gtm-module';
import { useDispatch, useSelector } from "react-redux";
type CheckoutProps = {
    setStripeError?: any;
    stripeError?: any;
    IsPaymentTrue?: any
    UpdatePatientForPayments?: any
    appliedFundingRulesArray?: any
    isStripeProcessing: any
    setIsStripeProcessing: any

}
const CheckoutForm: React.FC<CheckoutProps> = ({ setIsStripeProcessing, isStripeProcessing, setStripeError, stripeError, UpdatePatientForPayments, appliedFundingRulesArray }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<any>(null);
    const { StripeCheckOutSession, isStripeCheckOutSessionLoading }: any = useSelector((state: any) => state.StripeCheckOutSession);
    const { isUpdatePatientForPaymentsLoading }: any = useSelector((state: any) => state.UpdatePatientForPayments);
    //    const { ApplyFunding, isApplyFundingLoading }: any = useAppSelector(state => state.ApplyFundingRule);
    const PaymentEvent = () => {
        // Generate an event when the button is clicked
        // TagManager.dataLayer({
        //   dataLayer: {
        //     event: 'Success Payment',
        //     page: window.location.pathname + window.location.search,
        //   },
        // });
    };
    useEffect(() => {
        // if (!stripe) {

        //     return;
        // }
        const event = new Event("submit");
        event.preventDefault()
        const clientSecret = new URLSearchParams(window.location.search).get(
            "payment_intent_client_secret"
        );
        console.log("clientSecret", clientSecret);
        if (!clientSecret) {

            return;

        }
        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            switch (paymentIntent?.status) {
                case "succeeded":
                    setStripeError("Payment succeeded!")
                    break;
                case "processing":
                    setStripeError("Your payment is processing.")

                    break;
                case "requires_payment_method":

                    setStripeError("Your payment was not successful, please try again.")
                    break;
                default:

                    setStripeError("Something went wrong.")
                    break;
            }
        });

    }, [stripe]);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // console.log(stripe,"stripe",elements,"elements")
        if (!stripe || !elements) {
            return;
        }
        setIsStripeProcessing(true)

        const { error } = await stripe.confirmPayment({

            elements,
            confirmParams: {
                return_url: "http://localhost:8080/booking/EB823053-266E-4349-BB06-4B2D58673AE1?practicename=undefined&providername=Anna%20%20NURSE&practice=A882A928-BA39-4CEA-A0FB-5D2852BA7B4B&location=355BB77D-016A-4738-A26D-14C952A1497A&service=E80F9A64-975C-4C3A-A07E-67CACBC428F2",

            },
            redirect: 'if_required'

        })
        if (error?.type === "card_error" || error?.type === "validation_error" || error) {

            setStripeError(error?.message)
            setIsStripeProcessing(false)
        } else {
            // if (ApplyFunding != null) {
            //     if (ApplyFunding && ApplyFunding?.message == "") {

            //         UpdatePatientForPayments(appliedFundingRulesArray)

            //     }
            // }
            // else{

            //
            UpdatePatientForPayments("")
            // }
            //  }
            //   PaymentEvent()
            setIsStripeProcessing(false)
        }
    };
    return (

        <form id="payment-form" className="d-flex flex-column h-100" onSubmit={handleSubmit}>
            <PaymentElement id="payment-element" className="h-100" />
            <div className="w-100 justify-content-end d-flex" style={{ display: 'flex' }}>
                <Button className="btn ms-auto btn-primary  mt-4"
                    // onLoad={isStripeCheckOutSessionLoading}
                    disabled={isStripeProcessing || isUpdatePatientForPaymentsLoading || !stripe || !elements} id="submit"
                >
                    <span id="button-text"> {isStripeProcessing || isUpdatePatientForPaymentsLoading ? "Processing ... " : "Pay now"} </span>

                </Button>
            </div>
            <div className="w-100 pull-left text-center required">
                {stripeError != "" && <div id="payment-message">{stripeError}</div>}

            </div>
        </form>
    );
}
export default CheckoutForm








