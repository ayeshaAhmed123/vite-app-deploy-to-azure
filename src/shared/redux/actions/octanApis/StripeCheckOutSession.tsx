// import { baseURL } from "../../../config/AppSetting";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { useOASAPI } from "../../../utils";

interface InitialState {
    isStripeCheckOutSessionLoading: boolean;
    StripeCheckOutSessionStatus: string;
    isStripeCheckOutSessionError: boolean;
    StripeCheckOutSessionErrorMessage: string | null;
    StripeCheckOutSession: null | []
}

// interface Value {
//   Amount: any;
//   InvoiceID: any;
//   PracticeID: any;
//   AppointmentID:any

// }

const initialState: InitialState = {
    isStripeCheckOutSessionLoading: false,
    StripeCheckOutSessionStatus: 'idle',
    isStripeCheckOutSessionError: false,
    StripeCheckOutSessionErrorMessage: null,
    StripeCheckOutSession: null,
};

export const StripeCheckOutSession = createAsyncThunk("StripeCheckOutSession",
    async (obj: any, { dispatch, getState }) => {
            dispatch(gettingStripeCheckOutSessionResponse(''))
            var myHeaders = new Headers();
            myHeaders.append("x-api-key", "{{x-api-key}}");

            var localData = JSON.parse(localStorage.getItem('PublicToken'));

            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Authorization", `Bearer ${localData?.token}`);
            const raw = JSON.stringify(obj);
            const requestOptions: RequestInit = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow' as RequestRedirect,
            };
            try {
                // dispatch(gettingStripeCheckOutSessionResponse(''))
                // const callAPI = useOASAPI('post', `${baseURL}/CreatePayment`,value, true)
                // const response = await callAPI
                // if (response.status === "SUCCESS") {
                fetch(`https://gateway.octanscare.nz/CreatePayment`, requestOptions)
                    .then(response => response.json())
                    .then(result => {
                        if (result) {
                            dispatch(gettingStripeCheckOutSessionResponseSuccess(result));
                        } else {
                            dispatch(gettingStripeCheckOutSessionResponseError(result));
                        }
                    })

            } catch (error) {
                dispatch(gettingStripeCheckOutSessionResponseError(error));
            }
        })


const StripeCheckOutSessionSlice = createSlice({
    name: "StripeCheckOutSession",
    initialState: initialState,
    reducers: {
        gettingStripeCheckOutSessionResponse: (state, action) => {

            state.isStripeCheckOutSessionLoading = true;
            state.StripeCheckOutSessionStatus = 'loading';
            state.isStripeCheckOutSessionError = false;
            state.StripeCheckOutSessionErrorMessage = null;
            state.StripeCheckOutSession = null;
        },
        gettingStripeCheckOutSessionResponseSuccess: (state, action) => {
            state.isStripeCheckOutSessionLoading = false;
            state.StripeCheckOutSessionStatus = 'success';
            state.isStripeCheckOutSessionError = false;
            state.StripeCheckOutSessionErrorMessage = null;
            state.StripeCheckOutSession = action.payload;
        },
        gettingStripeCheckOutSessionResponseError: (state, action) => {
            state.isStripeCheckOutSessionLoading = false;
            state.StripeCheckOutSessionStatus = 'error';
            state.isStripeCheckOutSessionError = true;
            state.StripeCheckOutSessionErrorMessage = 'error_message_write_here';
            state.StripeCheckOutSession = null;
        },
        clearStripeCheckOutSessionData: (state, action) => {
            state.isStripeCheckOutSessionLoading = false;
            state.StripeCheckOutSessionStatus = 'clear';
            state.isStripeCheckOutSessionError = false;
            state.StripeCheckOutSessionErrorMessage = null;
            state.StripeCheckOutSession = null;
        },
    },
});

export const {
    gettingStripeCheckOutSessionResponse,
    gettingStripeCheckOutSessionResponseSuccess,
    gettingStripeCheckOutSessionResponseError,
    clearStripeCheckOutSessionData,
} = StripeCheckOutSessionSlice.actions;
export default StripeCheckOutSessionSlice.reducer;