import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetLocationFromOctansService = createAsyncThunk("GetLocationFromOctansService",
    async (obj:any, { dispatch }) => {
        dispatch(GetLocationFromOctansServiceData(''))
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

       
        fetch(`https://gateway.octanscare.nz/GetLocationFromOctansService?OctansServiceID=${obj.OctansServiceID}&Latitude=${obj.Latitude}&Longitude=${obj.Longitude}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(GetLocationFromOctansServiceDataSuccess(result));
                } else {
                    dispatch(GetLocationFromOctansServiceFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(GetLocationFromOctansServiceFailedData(error))
            })
    }
);
const GetLocationFromOctansServiceSlice = createSlice({
    name: "GetLocationFromOctansService",
    initialState: {
        GetLocationFromOctansServiceData: null,
        GetLocationFromOctansServiceDataSuccess: false,
        isGetLocationFromOctansServiceDataError: null,
        isGetLocationFromOctansServiceDataLoading: false,
    },
    reducers: {
        GetLocationFromOctansServiceData: (state, action) => {
            state.GetLocationFromOctansServiceData = null;
            state.GetLocationFromOctansServiceDataSuccess = false;
            state.isGetLocationFromOctansServiceDataError = false;
            state.isGetLocationFromOctansServiceDataLoading = true;
        },
        GetLocationFromOctansServiceDataSuccess: (state, action) => {
            state.GetLocationFromOctansServiceData = action.payload;
            state.GetLocationFromOctansServiceDataSuccess = true;
            state.isGetLocationFromOctansServiceDataError = false;
            state.isGetLocationFromOctansServiceDataLoading = false;
        },
        GetLocationFromOctansServiceFailedData: (state, action) => {
            state.GetLocationFromOctansServiceData = null;
            state.GetLocationFromOctansServiceDataSuccess = false;
            state.isGetLocationFromOctansServiceDataError = true;
            state.isGetLocationFromOctansServiceDataLoading = false;
        },
        GetLocationFromOctansServiceDataClear: (state, action) => {
            state.GetLocationFromOctansServiceData = null;
            state.GetLocationFromOctansServiceDataSuccess = false;
            state.isGetLocationFromOctansServiceDataError = null;
            state.isGetLocationFromOctansServiceDataLoading = false;
        }
    },
});
export const {
    GetLocationFromOctansServiceData,
    GetLocationFromOctansServiceDataSuccess,
    GetLocationFromOctansServiceFailedData,
    GetLocationFromOctansServiceDataClear
} = GetLocationFromOctansServiceSlice.actions;
export default GetLocationFromOctansServiceSlice.reducer;