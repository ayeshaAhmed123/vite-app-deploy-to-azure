import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const CreateInvoicewithItems = createAsyncThunk("CreateInvoicewithItems", async (obj: any, { dispatch }) => {
    dispatch(CreateInvoicewithItemsData(''));

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
        
        const response = await fetch("https://gateway.octanscare.nz/CreateInvoicewithItems", requestOptions);
        const result = await response.json();

        if (result) {
            dispatch(CreateInvoicewithItemsSuccess(result));
        } else {
            dispatch(CreateInvoicewithItemsFailed(result));
        }
    } catch (error) {
        dispatch(CreateInvoicewithItemsFailed(error));
    }
});

const CreateInvoicewithItemsSlice = createSlice({
    name: "CreateInvoicewithItems",
    initialState: {
        CreateInvoicewithItemsData: null,
        CreateInvoicewithItemsSuccess: false,
        isCreateInvoicewithItemsError: null,
        isCreateInvoicewithItemsLoading: false,
    },
    reducers: {
        CreateInvoicewithItemsData: (state, action) => {
            state.CreateInvoicewithItemsData = null;
            state.CreateInvoicewithItemsSuccess = false;
            state.isCreateInvoicewithItemsError = false;
            state.isCreateInvoicewithItemsLoading = true;
        },
        CreateInvoicewithItemsSuccess: (state, action) => {
            state.CreateInvoicewithItemsData = action.payload;
            state.CreateInvoicewithItemsSuccess = true;
            state.isCreateInvoicewithItemsError = false;
            state.isCreateInvoicewithItemsLoading = false;
        },
        CreateInvoicewithItemsFailed: (state, action) => {
            state.CreateInvoicewithItemsData = null;
            state.CreateInvoicewithItemsSuccess = false;
            state.isCreateInvoicewithItemsError = true;
            state.isCreateInvoicewithItemsLoading = false;
        },
        CreateInvoicewithItemsClear: (state, action) => {
            state.CreateInvoicewithItemsData = null;
            state.CreateInvoicewithItemsSuccess = false;
            state.isCreateInvoicewithItemsError = null;
            state.isCreateInvoicewithItemsLoading = false;
        }
    },
});

export const {
    CreateInvoicewithItemsData,
    CreateInvoicewithItemsSuccess,
    CreateInvoicewithItemsFailed,
    CreateInvoicewithItemsClear
} = CreateInvoicewithItemsSlice.actions;

export default CreateInvoicewithItemsSlice.reducer;
