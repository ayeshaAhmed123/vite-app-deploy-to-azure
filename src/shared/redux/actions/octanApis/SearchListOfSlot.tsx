import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const SearchListOfSlot = createAsyncThunk("SearchListOfSlot",
    async (obj:any, { dispatch }) => {
        dispatch(SearchListOfSlotData(''))
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
       
        fetch(`https://gateway.octanscare.nz/SearchListOfSlot?ProviderID=${obj.ProviderID}&AppointmentType=&PracticeLocationID=${obj.PracticeLocationID}&PracticeID=${obj.PracticeID}&SpecialityID=&DiseaseID=&ServiceID=&AppointmentDate=${obj.AppointmentDate}&ResourceID=`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    let arr=result?.filter(item=> !item.isBooked)
                    dispatch(SearchListOfSlotDataSuccess({filteredslots:arr,allslots:result}));
                } else {
                    dispatch(SearchListOfSlotFailedData(result));
                }
            })
          
            .catch(error => {
                dispatch(SearchListOfSlotFailedData(error))
            })
    }
);
const SearchListOfSlotSlice = createSlice({
    name: "SearchListOfSlot",
    initialState: {
        SearchListOfSlotData: null,
        SearchListOfAllSlotData: null,
        SearchListOfSlotDataSuccess: false,
        isSearchListOfSlotDataError: null,
        isSearchListOfSlotDataLoading: false,
    },
    reducers: {
        SearchListOfSlotData: (state, action) => {
            state.SearchListOfSlotData = null;
            state.SearchListOfAllSlotData = null;
            
            state.SearchListOfSlotDataSuccess = false;
            state.isSearchListOfSlotDataError = false;
            state.isSearchListOfSlotDataLoading = true;
        },
        SearchListOfSlotDataSuccess: (state, action) => {
            const {filteredslots,allslots}=action.payload;
            console.log(filteredslots,"filteredslots",allslots,"")
            state.SearchListOfSlotData = filteredslots;
            state.SearchListOfAllSlotData =allslots;
            console.log("SearchListOfSlotData:"+JSON.stringify(state.SearchListOfSlotData))
            state.SearchListOfSlotDataSuccess = true;
            state.isSearchListOfSlotDataError = false;
            state.isSearchListOfSlotDataLoading = false;
        },
        SearchListOfRescheduleSlotDataSuccess: (state, action) => {
            
            console.log(state.SearchListOfSlotData,"Alldata" ,action.payload,"action.payload")
            let data = [...state?.SearchListOfSlotData]; 

            data.push(action.payload); 
            
            state.SearchListOfSlotData = data;
            console.log(state.SearchListOfSlotData, "Updated Data");
        },
        SearchListOfSlotFailedData: (state, action) => {
            state.SearchListOfSlotData = null;
            state.SearchListOfAllSlotData = null;
            state.SearchListOfSlotDataSuccess = false;
            state.isSearchListOfSlotDataError = true;
            state.isSearchListOfSlotDataLoading = false;
        },
        SearchListOfSlotDataClear: (state, action) => {
            state.SearchListOfSlotData = null;
            state.SearchListOfAllSlotData = null;
            state.SearchListOfSlotDataSuccess = false;
            state.isSearchListOfSlotDataError = null;
            state.isSearchListOfSlotDataLoading = false;
        }
    },
});
export const {
    SearchListOfSlotData,
    SearchListOfSlotDataSuccess,
    SearchListOfSlotFailedData,
    SearchListOfSlotDataClear,
    SearchListOfRescheduleSlotDataSuccess
} = SearchListOfSlotSlice.actions;
export default SearchListOfSlotSlice.reducer;