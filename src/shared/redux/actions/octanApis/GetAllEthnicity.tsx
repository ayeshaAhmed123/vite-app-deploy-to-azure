import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllEthnicity = createAsyncThunk("GetAllEthnicity",
    async (obj:any, { dispatch }) => {
        dispatch(GetAllEthnicityData(''))
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

       
        fetch(`https://gateway.octanscare.nz/GetAllEthnicity`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(GetAllEthnicityDataSuccess(result));
                } else {
                    dispatch(GetAllEthnicityFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(GetAllEthnicityFailedData(error))
            })
    }
);
const GetAllEthnicitySlice = createSlice({
    name: "GetAllEthnicity",
    initialState: {
        GetAllEthnicityData: null,
        GetAllEthnicityDataSuccess: false,
        isGetAllEthnicityDataError: null,
        isGetAllEthnicityDataLoading: false,
    },
    reducers: {
        GetAllEthnicityData: (state, action) => {
            state.GetAllEthnicityData = null;
            state.GetAllEthnicityDataSuccess = false;
            state.isGetAllEthnicityDataError = false;
            state.isGetAllEthnicityDataLoading = true;
        },
        GetAllEthnicityDataSuccess: (state, action) => {
            state.GetAllEthnicityData = action.payload;
            state.GetAllEthnicityDataSuccess = true;
            state.isGetAllEthnicityDataError = false;
            state.isGetAllEthnicityDataLoading = false;
        },
        GetAllEthnicityFailedData: (state, action) => {
            state.GetAllEthnicityData = null;
            state.GetAllEthnicityDataSuccess = false;
            state.isGetAllEthnicityDataError = true;
            state.isGetAllEthnicityDataLoading = false;
        },
        GetAllEthnicityDataClear: (state, action) => {
            state.GetAllEthnicityData = null;
            state.GetAllEthnicityDataSuccess = false;
            state.isGetAllEthnicityDataError = null;
            state.isGetAllEthnicityDataLoading = false;
        }
    },
});
export const {
    GetAllEthnicityData,
    GetAllEthnicityDataSuccess,
    GetAllEthnicityFailedData,
    GetAllEthnicityDataClear
} = GetAllEthnicitySlice.actions;
export default GetAllEthnicitySlice.reducer;