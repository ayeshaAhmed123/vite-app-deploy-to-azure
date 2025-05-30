import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddCustomerData = createAsyncThunk("AddCustomerData", async (obj:any, { dispatch }) => {
    dispatch(AddCustomerdata(''));

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "{{x-api-key}}");

    var localData = JSON.parse(localStorage.getItem('PublicToken'));
  
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
        const response = await fetch("https://gateway.octanscare.nz/AddCustomerData", requestOptions);
        const result = await response.json();

        if (result) {
            dispatch(AddCustomerdataSuccess(result));
        } else {
            dispatch(AddCustomerdataFailed(result));
        }
    } catch (error) {
        dispatch(AddCustomerdataFailed(error));
    }
});

const AddCustomerDataSlice = createSlice({
    name: "AddCustomerData",
    initialState: {
        AddCustomerdata: null,
        AddCustomerdataSuccess: false,
        isAddCustomerdataError: null,
        isAddCustomerdataLoading: false,
    },
    reducers: {
        AddCustomerdata: (state, action) => {
            state.AddCustomerdata = null;
            state.AddCustomerdataSuccess = false;
            state.isAddCustomerdataError = false;
            state.isAddCustomerdataLoading = true;
        },
        AddCustomerdataSuccess: (state, action) => {
            state.AddCustomerdata = action.payload;
            state.AddCustomerdataSuccess = true;
            state.isAddCustomerdataError = false;
            state.isAddCustomerdataLoading = false;
        },
        AddCustomerdataFailed: (state, action) => {
            state.AddCustomerdata = null;
            state.AddCustomerdataSuccess = false;
            state.isAddCustomerdataError = true;
            state.isAddCustomerdataLoading = false;
        },
        AddCustomerdataClear: (state, action) => {
            state.AddCustomerdata = null;
            state.AddCustomerdataSuccess = false;
            state.isAddCustomerdataError = null;
            state.isAddCustomerdataLoading = false;
        }
    },
});

export const {
    AddCustomerdata,
    AddCustomerdataSuccess,
    AddCustomerdataFailed,
    AddCustomerdataClear
} = AddCustomerDataSlice.actions;

export default AddCustomerDataSlice.reducer;
