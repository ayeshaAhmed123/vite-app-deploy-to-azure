import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const SearchProvidersFromOctansService = createAsyncThunk("SearchProvidersFromOctansService",
    async (obj:any, { dispatch }) => {
        dispatch(SearchProvidersFromOctansServiceData(''))
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
       
        fetch(`https://gateway.octanscare.nz/SearchProvidersFromOctansService?PracticeID=${obj.PracticeID}&PracticeLocationID=${obj.PracticeLocationID}&octansServiceID=${obj.octansServiceID}&ProviderID=${obj.ProviderID}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log("SearchProvidersFromOctansServiceDataSuccess:"+JSON.stringify(result))
                if (result) {
                    dispatch(SearchProvidersFromOctansServiceDataSuccess(result));
                } else {
                    dispatch(SearchProvidersFromOctansServiceFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(SearchProvidersFromOctansServiceFailedData(error))
            })
    }
);
const SearchProvidersFromOctansServiceSlice = createSlice({
    name: "SearchProvidersFromOctansService",
    initialState: {
        SearchProvidersFromOctansServiceData: null,
        SearchProvidersFromOctansServiceDataSuccess: false,
        isSearchProvidersFromOctansServiceDataError: null,
        isSearchProvidersFromOctansServiceDataLoading: false,
        selectedProvider:null
    },
    reducers: {
        SearchProvidersFromOctansServiceData: (state, action) => {
            state.SearchProvidersFromOctansServiceData = null;
            state.SearchProvidersFromOctansServiceDataSuccess = false;
            state.isSearchProvidersFromOctansServiceDataError = false;
            state.isSearchProvidersFromOctansServiceDataLoading = true;
        },
        SearchProvidersFromOctansServiceDataSuccess: (state, action) => {
            state.SearchProvidersFromOctansServiceData = action.payload;
            state.SearchProvidersFromOctansServiceDataSuccess = true;
            state.isSearchProvidersFromOctansServiceDataError = false;
            state.isSearchProvidersFromOctansServiceDataLoading = false;
        },
        SearchProvidersFromOctansServiceFailedData: (state, action) => {
            state.SearchProvidersFromOctansServiceData = null;
            state.SearchProvidersFromOctansServiceDataSuccess = false;
            state.isSearchProvidersFromOctansServiceDataError = true;
            state.isSearchProvidersFromOctansServiceDataLoading = false;
        },
        SearchProvidersFromOctansServiceDataClear: (state, action) => {
            state.SearchProvidersFromOctansServiceData = null;
            state.SearchProvidersFromOctansServiceDataSuccess = false;
            state.isSearchProvidersFromOctansServiceDataError = null;
            state.isSearchProvidersFromOctansServiceDataLoading = false;
        },
        setSelectedProvider: (state, action) => {
            state.selectedProvider = action.payload;
        }

    },
});
export const {
    SearchProvidersFromOctansServiceData,
    SearchProvidersFromOctansServiceDataSuccess,
    SearchProvidersFromOctansServiceFailedData,
    SearchProvidersFromOctansServiceDataClear,
    setSelectedProvider
} = SearchProvidersFromOctansServiceSlice.actions;
export default SearchProvidersFromOctansServiceSlice.reducer;