import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const eSAMGetByID = createAsyncThunk("eSAMGetByID",
    async (obj:any, { dispatch }) => {
        dispatch(eSAMGetByIDData(''))
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

       
        fetch(`https://gateway.octanscare.nz/eSAMGetByID?uniqueId=${obj.uniqueId}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(eSAMGetByIDDataSuccess(result));
                } else {
                    dispatch(eSAMGetByIDFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(eSAMGetByIDFailedData(error))
            })
    }
);
const eSAMGetByIDSlice = createSlice({
    name: "eSAMGetByID",
    initialState: {
        eSAMGetByIDData: null,
        eSAMGetByIDDataSuccess: false,
        iseSAMGetByIDDataError: null,
        iseSAMGetByIDDataLoading: false,
    },
    reducers: {
        eSAMGetByIDData: (state, action) => {
            state.eSAMGetByIDData = null;
            state.eSAMGetByIDDataSuccess = false;
            state.iseSAMGetByIDDataError = false;
            state.iseSAMGetByIDDataLoading = true;
        },
        eSAMGetByIDDataSuccess: (state, action) => {
            state.eSAMGetByIDData = action.payload;
            state.eSAMGetByIDDataSuccess = true;
            state.iseSAMGetByIDDataError = false;
            state.iseSAMGetByIDDataLoading = false;
        },
        eSAMGetByIDFailedData: (state, action) => {
            state.eSAMGetByIDData = null;
            state.eSAMGetByIDDataSuccess = false;
            state.iseSAMGetByIDDataError = true;
            state.iseSAMGetByIDDataLoading = false;
        },
        eSAMGetByIDDataClear: (state, action) => {
            state.eSAMGetByIDData = null;
            state.eSAMGetByIDDataSuccess = false;
            state.iseSAMGetByIDDataError = null;
            state.iseSAMGetByIDDataLoading = false;
        }
    },
});
export const {
    eSAMGetByIDData,
    eSAMGetByIDDataSuccess,
    eSAMGetByIDFailedData,
    eSAMGetByIDDataClear
} = eSAMGetByIDSlice.actions;
export default eSAMGetByIDSlice.reducer;