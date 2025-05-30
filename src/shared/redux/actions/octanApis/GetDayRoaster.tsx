import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetDayRoaster = createAsyncThunk("GetDayRoaster",
    async (obj: any, { dispatch }) => {
        dispatch(GetDayRoasterData(''))
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", "{{x-api-key}}");

        var localData = JSON.parse(localStorage.getItem('PublicToken'));
        console.log(localData, "localData")
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", `Bearer ${localData?.token}`);

        var requestOptions: RequestInit = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow' as RequestRedirect
        };

        fetch(`https://gateway.octanscare.nz/GetDayRoaster?PracticeID=${obj.PracticeID}&ProviderID=${obj.ProviderID}&PracticeLocationID=${obj.PracticeLocationID}&FromDate=${obj.FromDate}&ToDate=${obj.ToDate}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(GetDayRoasterDataSuccess(result));
                } else {
                    dispatch(GetDayRoasterFailedData(result));
                }
            })

            .catch(error => {
                dispatch(GetDayRoasterFailedData(error))
            })
    }
);
const GetDayRoasterSlice = createSlice({
    name: "GetDayRoaster",
    initialState: {
        GetDayRoasterData: null,
        GetDayRoasterDataSuccess: false,
        isGetDayRoasterDataError: null,
        isGetDayRoasterDataLoading: false,
    },
    reducers: {
        GetDayRoasterData: (state, action) => {
            state.GetDayRoasterData = null;
            state.GetDayRoasterDataSuccess = false;
            state.isGetDayRoasterDataError = false;
            state.isGetDayRoasterDataLoading = true;
        },
        GetDayRoasterDataSuccess: (state, action) => {
            state.GetDayRoasterData = action.payload;
            state.GetDayRoasterDataSuccess = true;
            state.isGetDayRoasterDataError = false;
            state.isGetDayRoasterDataLoading = false;
        },
        GetDayRoasterFailedData: (state, action) => {
            state.GetDayRoasterData = null;
            state.GetDayRoasterDataSuccess = false;
            state.isGetDayRoasterDataError = true;
            state.isGetDayRoasterDataLoading = false;
        },
        GetDayRoasterDataClear: (state, action) => {
            state.GetDayRoasterData = null;
            state.GetDayRoasterDataSuccess = false;
            state.isGetDayRoasterDataError = null;
            state.isGetDayRoasterDataLoading = false;
        }
    },
});
export const {
    GetDayRoasterData,
    GetDayRoasterDataSuccess,
    GetDayRoasterFailedData,
    GetDayRoasterDataClear
} = GetDayRoasterSlice.actions;
export default GetDayRoasterSlice.reducer;