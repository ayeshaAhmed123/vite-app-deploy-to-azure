import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GetAllGenders = createAsyncThunk("GetAllGenders",
    async (obj:any, { dispatch }) => {
        dispatch(GetAllGendersData(''))
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

       
        fetch(`https://gateway.octanscare.nz/GetAllGenders`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(GetAllGendersDataSuccess(result));
                } else {
                    dispatch(GetAllGendersFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(GetAllGendersFailedData(error))
            })
    }
);
const GetAllGendersSlice = createSlice({
    name: "GetAllGenders",
    initialState: {
        GetAllGendersData: null,
        GetAllGendersDataSuccess: false,
        isGetAllGendersDataError: null,
        isGetAllGendersDataLoading: false,
    },
    reducers: {
        GetAllGendersData: (state, action) => {
            state.GetAllGendersData = null;
            state.GetAllGendersDataSuccess = false;
            state.isGetAllGendersDataError = false;
            state.isGetAllGendersDataLoading = true;
        },
        GetAllGendersDataSuccess: (state, action) => {
            state.GetAllGendersData = action.payload;
            state.GetAllGendersDataSuccess = true;
            state.isGetAllGendersDataError = false;
            state.isGetAllGendersDataLoading = false;
        },
        GetAllGendersFailedData: (state, action) => {
            state.GetAllGendersData = null;
            state.GetAllGendersDataSuccess = false;
            state.isGetAllGendersDataError = true;
            state.isGetAllGendersDataLoading = false;
        },
        GetAllGendersDataClear: (state, action) => {
            state.GetAllGendersData = null;
            state.GetAllGendersDataSuccess = false;
            state.isGetAllGendersDataError = null;
            state.isGetAllGendersDataLoading = false;
        }
    },
});
export const {
    GetAllGendersData,
    GetAllGendersDataSuccess,
    GetAllGendersFailedData,
    GetAllGendersDataClear
} = GetAllGendersSlice.actions;
export default GetAllGendersSlice.reducer;