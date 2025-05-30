import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const CreatePayment = createAsyncThunk("CreatePayment",
    async (obj:any, { dispatch }) => {
        dispatch(CreatePaymentData(''))
        var myHeaders = new Headers();
        myHeaders.append("x-api-key", "{{x-api-key}}");

        var localData = JSON.parse(localStorage.getItem('PublicToken'));
        console.log(localData,"localData")
        myHeaders.append("Content-Type", "application/json");
     myHeaders.append("Authorization", `Bearer ${localData?.token}`);

        var requestOptions: RequestInit = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(obj),
            redirect: 'follow' as RequestRedirect  
        };

       
        fetch(`https://gateway.octanscare.nz/CreatePayment`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(CreatePaymentDataSuccess(result));
                } else {
                    dispatch(CreatePaymentFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(CreatePaymentFailedData(error))
            })
    }
);
const CreatePaymentSlice = createSlice({
    name: "CreatePayment",
    initialState: {
        CreatePaymentData: null,
        CreatePaymentDataSuccess: false,
        isCreatePaymentDataError: null,
        isCreatePaymentDataLoading: false,
    },
    reducers: {
        CreatePaymentData: (state, action) => {
            state.CreatePaymentData = null;
            state.CreatePaymentDataSuccess = false;
            state.isCreatePaymentDataError = false;
            state.isCreatePaymentDataLoading = true;
        },
        CreatePaymentDataSuccess: (state, action) => {
            state.CreatePaymentData = action.payload;
            state.CreatePaymentDataSuccess = true;
            state.isCreatePaymentDataError = false;
            state.isCreatePaymentDataLoading = false;
        },
        CreatePaymentFailedData: (state, action) => {
            state.CreatePaymentData = null;
            state.CreatePaymentDataSuccess = false;
            state.isCreatePaymentDataError = true;
            state.isCreatePaymentDataLoading = false;
        },
        CreatePaymentDataClear: (state, action) => {
            state.CreatePaymentData = null;
            state.CreatePaymentDataSuccess = false;
            state.isCreatePaymentDataError = null;
            state.isCreatePaymentDataLoading = false;
        }
    },
});
export const {
    CreatePaymentData,
    CreatePaymentDataSuccess,
    CreatePaymentFailedData,
    CreatePaymentDataClear
} = CreatePaymentSlice.actions;
export default CreatePaymentSlice.reducer;