import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddAppointment = createAsyncThunk("AddAppointment", async (obj, { dispatch }) => {
    dispatch(AddAppointmentData(''));
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
        const response = await fetch("https://gateway.octanscare.nz/AddAppointment", requestOptions);
        const result = await response.json();
        
        if (result) {
             dispatch(AddAppointmentDataSuccess(result));
        } else {
            dispatch(AddAppointmentDataFailed(result));
        }
    } catch (error) {
        dispatch(AddAppointmentDataFailed(error));
    }
});

const AddAppointmentSlice = createSlice({
    name: "AddAppointment",
    initialState: {
        AddAppointmentData: null,
        AddAppointmentDataSuccess: false,
        isAddAppointmentDataError: null,
        isAddAppointmentDataLoading: false,
    },
    reducers: {
        AddAppointmentData: (state, action) => {
            state.AddAppointmentData = null;
            state.AddAppointmentDataSuccess = false;
            state.isAddAppointmentDataError = false;
            state.isAddAppointmentDataLoading = true;
        },
        AddAppointmentDataSuccess: (state, action) => {
            state.AddAppointmentData = action.payload;
            state.AddAppointmentDataSuccess = true;
            state.isAddAppointmentDataError = false;
            state.isAddAppointmentDataLoading = false;
        },
        AddAppointmentDataFailed: (state, action) => {
            state.AddAppointmentData = null;
            state.AddAppointmentDataSuccess = false;
            state.isAddAppointmentDataError = true;
            state.isAddAppointmentDataLoading = false;
        },
        AddAppointmentDataClear: (state, action) => {
            state.AddAppointmentData = null;
            state.AddAppointmentDataSuccess = false;
            state.isAddAppointmentDataError = null;
            state.isAddAppointmentDataLoading = false;
        }
    },
});

export const {
    AddAppointmentData,
    AddAppointmentDataSuccess,
    AddAppointmentDataFailed,
    AddAppointmentDataClear
} = AddAppointmentSlice.actions;

export default AddAppointmentSlice.reducer;
