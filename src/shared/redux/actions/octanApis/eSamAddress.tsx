import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const eSamAddress = createAsyncThunk("eSamAddress",
    async (obj:string, { dispatch }) => {
        dispatch(eSamAddressData(''))
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

       
        fetch(`https://gateway.octanscare.nz/eSamAddress?searchFor=${obj}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(eSamAddressDataSuccess(result));
                } else {
                    dispatch(eSamAddressFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(eSamAddressFailedData(error))
            })
    }
);
const eSamAddressSlice = createSlice({
    name: "eSamAddress",
    initialState: {
        eSamAddressData: null,
        eSamAddressDataSuccess: false,
        iseSamAddressDataError: null,
        iseSamAddressDataLoading: false,
    },
    reducers: {
        eSamAddressData: (state, action) => {
            state.eSamAddressData = null;
            state.eSamAddressDataSuccess = false;
            state.iseSamAddressDataError = false;
            state.iseSamAddressDataLoading = true;
        },
        eSamAddressDataSuccess: (state, action) => {
            state.eSamAddressData = action.payload;
            state.eSamAddressDataSuccess = true;
            state.iseSamAddressDataError = false;
            state.iseSamAddressDataLoading = false;
        },
        eSamAddressFailedData: (state, action) => {
            state.eSamAddressData = null;
            state.eSamAddressDataSuccess = false;
            state.iseSamAddressDataError = true;
            state.iseSamAddressDataLoading = false;
        },
        eSamAddressDataClear: (state, action) => {
            state.eSamAddressData = null;
            state.eSamAddressDataSuccess = false;
            state.iseSamAddressDataError = null;
            state.iseSamAddressDataLoading = false;
        }
    },
});
export const {
    eSamAddressData,
    eSamAddressDataSuccess,
    eSamAddressFailedData,
    eSamAddressDataClear
} = eSamAddressSlice.actions;
export default eSamAddressSlice.reducer;