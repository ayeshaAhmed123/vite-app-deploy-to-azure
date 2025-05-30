import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const CheckOtpAgainstAppointment = createAsyncThunk("CheckOtpAgainstAppointment",
    async (obj: any, { dispatch }) => {
        dispatch(CheckOtpAgainstAppointmentData(''))
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", "{{x-api-key}}");

        var localData = JSON.parse(localStorage.getItem('PublicToken'));

        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${localData?.token}`);

        var requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };

        fetch(`https://gateway.octanscare.nz/CheckOtpAgainstAppointment?appointmentID=${obj.appointmentID}&mobileCode=${obj.mobileCode}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(CheckOtpAgainstAppointmentDataSuccess(result));
                } else {
                    dispatch(CheckOtpAgainstAppointmentFailedData(result));
                }
            })

            .catch(error => {
                dispatch(CheckOtpAgainstAppointmentFailedData(error))
            })
    }
);
const CheckOtpAgainstAppointmentSlice = createSlice({
    name: "CheckOtpAgainstAppointment",
    initialState: {
        CheckOtpAgainstAppointmentData: null,
        CheckOtpAgainstAppointmentDataSuccess: false,
        isCheckOtpAgainstAppointmentDataError: null,
        isCheckOtpAgainstAppointmentDataLoading: false,
    },
    reducers: {
        CheckOtpAgainstAppointmentData: (state, action) => {
            state.CheckOtpAgainstAppointmentData = null;
            state.CheckOtpAgainstAppointmentDataSuccess = false;
            state.isCheckOtpAgainstAppointmentDataError = false;
            state.isCheckOtpAgainstAppointmentDataLoading = true;
        },
        CheckOtpAgainstAppointmentDataSuccess: (state, action) => {
            state.CheckOtpAgainstAppointmentData = action.payload;
            state.CheckOtpAgainstAppointmentDataSuccess = true;
            state.isCheckOtpAgainstAppointmentDataError = false;
            state.isCheckOtpAgainstAppointmentDataLoading = false;
        },
        CheckOtpAgainstAppointmentFailedData: (state, action) => {
            state.CheckOtpAgainstAppointmentData = null;
            state.CheckOtpAgainstAppointmentDataSuccess = false;
            state.isCheckOtpAgainstAppointmentDataError = true;
            state.isCheckOtpAgainstAppointmentDataLoading = false;
        },
        CheckOtpAgainstAppointmentDataClear: (state, action) => {
            state.CheckOtpAgainstAppointmentData = null;
            state.CheckOtpAgainstAppointmentDataSuccess = false;
            state.isCheckOtpAgainstAppointmentDataError = null;
            state.isCheckOtpAgainstAppointmentDataLoading = false;
        }
    },
});
export const {
    CheckOtpAgainstAppointmentData,
    CheckOtpAgainstAppointmentDataSuccess,
    CheckOtpAgainstAppointmentFailedData,
    CheckOtpAgainstAppointmentDataClear
} = CheckOtpAgainstAppointmentSlice.actions;
export default CheckOtpAgainstAppointmentSlice.reducer;