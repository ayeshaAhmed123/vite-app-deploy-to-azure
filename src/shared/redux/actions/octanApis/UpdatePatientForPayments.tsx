import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const UpdatePatientForPayments = createAsyncThunk("UpdatePatientForPayments", async (obj:any, { dispatch }) => {
    dispatch(UpdatePatientForPaymentsData(''));

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "{{x-api-key}}");

    var localData = JSON.parse(localStorage.getItem('PublicToken'));
    console.log(localData, "localData")
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
        const response = await fetch("https://gateway.octanscare.nz/UpdatePatientForPayments", requestOptions);
        const result = await response.json();

        if (result) {
            console.log("UpdatePatientForPaymentsSuccess:"+JSON.stringify(result))
            dispatch(UpdatePatientForPaymentsSuccess(result));
            //localStorage.setItem('PublicToken', JSON.stringify(result));
        } else {
            dispatch(UpdatePatientForPaymentsFailed(result));
        }
    } catch (error) {
        dispatch(UpdatePatientForPaymentsFailed(error));
    }
});

const UpdatePatientForPaymentsSlice = createSlice({
    name: "UpdatePatientForPayments",
    initialState: {
        UpdatePatientForPaymentsData: null,
        UpdatePatientForPaymentsSuccess: false,
        isUpdatePatientForPaymentsError: null,
        isUpdatePatientForPaymentsLoading: false,
    },
    reducers: {
        UpdatePatientForPaymentsData: (state, action) => {
            state.UpdatePatientForPaymentsData = null;
            state.UpdatePatientForPaymentsSuccess = false;
            state.isUpdatePatientForPaymentsError = false;
            state.isUpdatePatientForPaymentsLoading = true;
        },
        UpdatePatientForPaymentsSuccess: (state, action) => {
            state.UpdatePatientForPaymentsData = action.payload;
            state.UpdatePatientForPaymentsSuccess = true;
            state.isUpdatePatientForPaymentsError = false;
            state.isUpdatePatientForPaymentsLoading = false;
        },
        UpdatePatientForPaymentsFailed: (state, action) => {
            state.UpdatePatientForPaymentsData = null;
            state.UpdatePatientForPaymentsSuccess = false;
            state.isUpdatePatientForPaymentsError = true;
            state.isUpdatePatientForPaymentsLoading = false;
        },
        UpdatePatientForPaymentsClear: (state, action) => {
            state.UpdatePatientForPaymentsData = null;
            state.UpdatePatientForPaymentsSuccess = false;
            state.isUpdatePatientForPaymentsError = null;
            state.isUpdatePatientForPaymentsLoading = false;
        }
    },
});

export const {
    UpdatePatientForPaymentsData,
    UpdatePatientForPaymentsSuccess,
    UpdatePatientForPaymentsFailed,
    UpdatePatientForPaymentsClear
} = UpdatePatientForPaymentsSlice.actions;

export default UpdatePatientForPaymentsSlice.reducer;
