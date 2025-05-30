import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetOctansServices = createAsyncThunk("GetOctansServices",
    async (obj, { dispatch }) => {
        dispatch(GetOctansServicesData(''))
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

        // const apiUrl = process.env.REACT_APP_API_URL;
        // console.log("API URL:"+ apiUrl);
        fetch("https://gateway.octanscare.nz/GetOctansServices", requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(GetOctansServicesDataSuccess(result));
                } else {
                    dispatch(GetOctansServicesFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(GetOctansServicesFailedData(error))
            })
    }
);
const GetOctansServicesSlice = createSlice({
    name: "GetOctansServices",
    initialState: {
        GetOctansServicesData: null,
        GetOctansServicesDataSuccess: false,
        isGetOctansServicesDataError: null,
        isGetOctansServicesDataLoading: false,
    },
    reducers: {
        GetOctansServicesData: (state, action) => {
            state.GetOctansServicesData = null;
            state.GetOctansServicesDataSuccess = false;
            state.isGetOctansServicesDataError = false;
            state.isGetOctansServicesDataLoading = true;
        },
        GetOctansServicesDataSuccess: (state, action) => {
            state.GetOctansServicesData = action.payload;
            state.GetOctansServicesDataSuccess = true;
            state.isGetOctansServicesDataError = false;
            state.isGetOctansServicesDataLoading = false;
        },
        GetOctansServicesFailedData: (state, action) => {
            state.GetOctansServicesData = null;
            state.GetOctansServicesDataSuccess = false;
            state.isGetOctansServicesDataError = true;
            state.isGetOctansServicesDataLoading = false;
        },
        GetOctansServicesDataClear: (state, action) => {
            state.GetOctansServicesData = null;
            state.GetOctansServicesDataSuccess = false;
            state.isGetOctansServicesDataError = null;
            state.isGetOctansServicesDataLoading = false;
        }
    },
});
export const {
    GetOctansServicesData,
    GetOctansServicesDataSuccess,
    GetOctansServicesFailedData,
    GetOctansServicesDataClear
} = GetOctansServicesSlice.actions;
export default GetOctansServicesSlice.reducer;