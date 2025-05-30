import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetPracticeforPaymentConfigration = createAsyncThunk("GetPracticeforPaymentConfigration",
    async (obj:any, { dispatch }) => {
        dispatch(GetPracticeforPaymentConfigrationData(''))
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

       
        fetch(`https://gateway.octanscare.nz/GetPracticeforPaymentConfigration?practiceID=${obj.practiceID}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(GetPracticeforPaymentConfigrationDataSuccess(result));
                } else {
                    dispatch(GetPracticeforPaymentConfigrationFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(GetPracticeforPaymentConfigrationFailedData(error))
            })
    }
);
const GetPracticeforPaymentConfigrationSlice = createSlice({
    name: "GetPracticeforPaymentConfigration",
    initialState: {
        GetPracticeforPaymentConfigrationData: null,
        GetPracticeforPaymentConfigrationDataSuccess: false,
        isGetPracticeforPaymentConfigrationDataError: null,
        isGetPracticeforPaymentConfigrationDataLoading: false,
    },
    reducers: {
        GetPracticeforPaymentConfigrationData: (state, action) => {
            state.GetPracticeforPaymentConfigrationData = null;
            state.GetPracticeforPaymentConfigrationDataSuccess = false;
            state.isGetPracticeforPaymentConfigrationDataError = false;
            state.isGetPracticeforPaymentConfigrationDataLoading = true;
        },
        GetPracticeforPaymentConfigrationDataSuccess: (state, action) => {
            state.GetPracticeforPaymentConfigrationData = action.payload;
            state.GetPracticeforPaymentConfigrationDataSuccess = true;
            state.isGetPracticeforPaymentConfigrationDataError = false;
            state.isGetPracticeforPaymentConfigrationDataLoading = false;
        },
        GetPracticeforPaymentConfigrationFailedData: (state, action) => {
            state.GetPracticeforPaymentConfigrationData = null;
            state.GetPracticeforPaymentConfigrationDataSuccess = false;
            state.isGetPracticeforPaymentConfigrationDataError = true;
            state.isGetPracticeforPaymentConfigrationDataLoading = false;
        },
        GetPracticeforPaymentConfigrationDataClear: (state, action) => {
            state.GetPracticeforPaymentConfigrationData = null;
            state.GetPracticeforPaymentConfigrationDataSuccess = false;
            state.isGetPracticeforPaymentConfigrationDataError = null;
            state.isGetPracticeforPaymentConfigrationDataLoading = false;
        }
    },
});
export const {
    GetPracticeforPaymentConfigrationData,
    GetPracticeforPaymentConfigrationDataSuccess,
    GetPracticeforPaymentConfigrationFailedData,
    GetPracticeforPaymentConfigrationDataClear
} = GetPracticeforPaymentConfigrationSlice.actions;
export default GetPracticeforPaymentConfigrationSlice.reducer;