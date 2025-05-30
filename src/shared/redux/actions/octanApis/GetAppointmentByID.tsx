
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetAppointmentByID = createAsyncThunk("GetAppointmentByID",
    async (obj:any, { dispatch }) => {
        dispatch(GetAppointmentByIDData(''))
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", "{{x-api-key}}");

        var localData = JSON.parse(localStorage.getItem('PublicToken'));
        console.log(localData,"localData")
        myHeaders.append("Content-Type", "application/json");
     myHeaders.append("Authorization", `Bearer ${localData?.token}`);

        var requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect  
        };

       
        fetch(`https://gateway.octanscare.nz/GetAppointmentByAppId?AppointmentID=${obj.AppointmentID}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(GetAppointmentByIDDataSuccess(result));
                } else {
                    dispatch(GetAppointmentByIDFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(GetAppointmentByIDFailedData(error))
            })
    }
);
const GetAppointmentByIDSlice = createSlice({
    name: "GetAppointmentByID",
    initialState: {
        GetAppointmentByIDData: null,
        GetAppointmentByIDDataSuccess: false,
        isGetAppointmentByIDDataError: null,
        isGetAppointmentByIDDataLoading: false,
    },
    reducers: {
        GetAppointmentByIDData: (state, action) => {
            state.GetAppointmentByIDData = null;
            state.GetAppointmentByIDDataSuccess = false;
            state.isGetAppointmentByIDDataError = false;
            state.isGetAppointmentByIDDataLoading = true;
        },
        GetAppointmentByIDDataSuccess: (state, action) => {
            state.GetAppointmentByIDData = action.payload;
            state.GetAppointmentByIDDataSuccess = true;
            state.isGetAppointmentByIDDataError = false;
            state.isGetAppointmentByIDDataLoading = false;
        },
        GetAppointmentByIDFailedData: (state, action) => {
            state.GetAppointmentByIDData = null;
            state.GetAppointmentByIDDataSuccess = false;
            state.isGetAppointmentByIDDataError = true;
            state.isGetAppointmentByIDDataLoading = false;
        },
        GetAppointmentByIDDataClear: (state, action) => {
            state.GetAppointmentByIDData = null;
            state.GetAppointmentByIDDataSuccess = false;
            state.isGetAppointmentByIDDataError = null;
            state.isGetAppointmentByIDDataLoading = false;
        }
    },
});
export const {
    GetAppointmentByIDData,
    GetAppointmentByIDDataSuccess,
    GetAppointmentByIDFailedData,
    GetAppointmentByIDDataClear
} = GetAppointmentByIDSlice.actions;
export default GetAppointmentByIDSlice.reducer;