import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetPatientByID = createAsyncThunk("GetPatientByID",
    async (obj:any, { dispatch }) => {
        dispatch(GetPatientByIDData(''))
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
       
        fetch(`https://gateway.octanscare.nz/GetPatientByID?PatientID=${obj.PatientID}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(GetPatientByIDDataSuccess(result));
                } else {
                    dispatch(GetPatientByIDFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(GetPatientByIDFailedData(error))
            })
    }
);
const GetPatientByIDSlice = createSlice({
    name: "GetPatientByID",
    initialState: {
        GetPatientByIDData: null,
        GetPatientByIDDataSuccess: false,
        isGetPatientByIDDataError: null,
        isGetPatientByIDDataLoading: false,
    },
    reducers: {
        GetPatientByIDData: (state, action) => {
            state.GetPatientByIDData = null;
            state.GetPatientByIDDataSuccess = false;
            state.isGetPatientByIDDataError = false;
            state.isGetPatientByIDDataLoading = true;
        },
        GetPatientByIDDataSuccess: (state, action) => {
            state.GetPatientByIDData = action.payload;
            state.GetPatientByIDDataSuccess = true;
            state.isGetPatientByIDDataError = false;
            state.isGetPatientByIDDataLoading = false;
        },
        GetPatientByIDFailedData: (state, action) => {
            state.GetPatientByIDData = null;
            state.GetPatientByIDDataSuccess = false;
            state.isGetPatientByIDDataError = true;
            state.isGetPatientByIDDataLoading = false;
        },
        GetPatientByIDDataClear: (state, action) => {
            state.GetPatientByIDData = null;
            state.GetPatientByIDDataSuccess = false;
            state.isGetPatientByIDDataError = null;
            state.isGetPatientByIDDataLoading = false;
        }
    },
});
export const {
    GetPatientByIDData,
    GetPatientByIDDataSuccess,
    GetPatientByIDFailedData,
    GetPatientByIDDataClear
} = GetPatientByIDSlice.actions;
export default GetPatientByIDSlice.reducer;