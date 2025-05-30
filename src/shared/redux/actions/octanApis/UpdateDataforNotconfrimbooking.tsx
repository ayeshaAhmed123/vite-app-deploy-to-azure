import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const UpdateDataforNotconfrimbooking = createAsyncThunk("UpdateDataforNotconfrimbooking", async (obj:any, { dispatch }) => {
    dispatch(UpdateDataforNotconfrimbookingData(''));

   
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

    try {
        const response = await fetch("https://gateway.octanscare.nz/UpdateDataforNotconfrimbooking", requestOptions);
        const result = await response.json();
        
        if (result) {
             dispatch(UpdateDataforNotconfrimbookingDataSuccess(result));
           // localStorage.setItem('PublicToken', JSON.stringify(result));
        } else {
            dispatch(UpdateDataforNotconfrimbookingDataFailed(result));
        }
    } catch (error) {
        dispatch(UpdateDataforNotconfrimbookingDataFailed(error));
    }
});

const UpdateDataforNotconfrimbookingSlice = createSlice({
    name: "UpdateDataforNotconfrimbooking",
    initialState: {
        UpdateDataforNotconfrimbookingData: null,
        UpdateDataforNotconfrimbookingDataSuccess: false,
        isUpdateDataforNotconfrimbookingDataError: null,
        isUpdateDataforNotconfrimbookingDataLoading: false,
    },
    reducers: {
        UpdateDataforNotconfrimbookingData: (state, action) => {
            state.UpdateDataforNotconfrimbookingData = null;
            state.UpdateDataforNotconfrimbookingDataSuccess = false;
            state.isUpdateDataforNotconfrimbookingDataError = false;
            state.isUpdateDataforNotconfrimbookingDataLoading = true;
        },
        UpdateDataforNotconfrimbookingDataSuccess: (state, action) => {
            state.UpdateDataforNotconfrimbookingData = action.payload;
            state.UpdateDataforNotconfrimbookingDataSuccess = true;
            state.isUpdateDataforNotconfrimbookingDataError = false;
            state.isUpdateDataforNotconfrimbookingDataLoading = false;
        },
        UpdateDataforNotconfrimbookingDataFailed: (state, action) => {
            state.UpdateDataforNotconfrimbookingData = null;
            state.UpdateDataforNotconfrimbookingDataSuccess = false;
            state.isUpdateDataforNotconfrimbookingDataError = true;
            state.isUpdateDataforNotconfrimbookingDataLoading = false;
        },
        UpdateDataforNotconfrimbookingDataClear: (state, action) => {
            state.UpdateDataforNotconfrimbookingData = null;
            state.UpdateDataforNotconfrimbookingDataSuccess = false;
            state.isUpdateDataforNotconfrimbookingDataError = null;
            state.isUpdateDataforNotconfrimbookingDataLoading = false;
        }
    },
});

export const {
    UpdateDataforNotconfrimbookingData,
    UpdateDataforNotconfrimbookingDataSuccess,
    UpdateDataforNotconfrimbookingDataFailed,
    UpdateDataforNotconfrimbookingDataClear
} = UpdateDataforNotconfrimbookingSlice.actions;

export default UpdateDataforNotconfrimbookingSlice.reducer;
