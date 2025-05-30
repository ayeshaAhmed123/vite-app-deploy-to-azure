import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const CancelAppointmentById = createAsyncThunk("CancelAppointmentById",
    async (obj: any, { dispatch }) => {
        dispatch(CancelAppointmentByIdData(''))
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

        fetch(`https://gateway.octanscare.nz/CancelAppointmentById?AppointmentID=${obj.AppointmentID}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(CancelAppointmentByIdDataSuccess(result));
                } else {
                    dispatch(CancelAppointmentByIdFailedData(result));
                }
            })

            .catch(error => {
                dispatch(CancelAppointmentByIdFailedData(error))
            })
    }
);
const CancelAppointmentByIdSlice = createSlice({
    name: "CancelAppointmentById",
    initialState: {
        CancelAppointmentByIdData: null,
        CancelAppointmentByIdDataSuccess: false,
        isCancelAppointmentByIdDataError: null,
        isCancelAppointmentByIdDataLoading: false,
    },
    reducers: {
        CancelAppointmentByIdData: (state, action) => {
            state.CancelAppointmentByIdData = null;
            state.CancelAppointmentByIdDataSuccess = false;
            state.isCancelAppointmentByIdDataError = false;
            state.isCancelAppointmentByIdDataLoading = true;
        },
        CancelAppointmentByIdDataSuccess: (state, action) => {
            state.CancelAppointmentByIdData = action.payload;
            state.CancelAppointmentByIdDataSuccess = true;
            state.isCancelAppointmentByIdDataError = false;
            state.isCancelAppointmentByIdDataLoading = false;
        },
        CancelAppointmentByIdFailedData: (state, action) => {
            state.CancelAppointmentByIdData = null;
            state.CancelAppointmentByIdDataSuccess = false;
            state.isCancelAppointmentByIdDataError = true;
            state.isCancelAppointmentByIdDataLoading = false;
        },
        CancelAppointmentByIdDataClear: (state, action) => {
            state.CancelAppointmentByIdData = null;
            state.CancelAppointmentByIdDataSuccess = false;
            state.isCancelAppointmentByIdDataError = null;
            state.isCancelAppointmentByIdDataLoading = false;
        }
    },
});
export const {
    CancelAppointmentByIdData,
    CancelAppointmentByIdDataSuccess,
    CancelAppointmentByIdFailedData,
    CancelAppointmentByIdDataClear
} = CancelAppointmentByIdSlice.actions;
export default CancelAppointmentByIdSlice.reducer;