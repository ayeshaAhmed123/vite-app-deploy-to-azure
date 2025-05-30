import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GenerateInvitation = createAsyncThunk("GenerateInvitation",
    async (obj: any, { dispatch }) => {
        dispatch(GenerateInvitationData(''))
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


        fetch(`https://gateway.octanscare.nz/GenerateInvitation?appointmentID=${obj.appointmentID}&patientEmail=${obj.patientEmail}&patientPhoneNumber=${obj.patientPhoneNumber}&patientName=${obj.patientName}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (result) {
                    dispatch(GenerateInvitationDataSuccess(result));
                } else {
                    dispatch(GenerateInvitationFailedData(result));
                }
            })

            .catch(error => {
                dispatch(GenerateInvitationFailedData(error))
            })
    }
);
const GenerateInvitationSlice = createSlice({
    name: "GenerateInvitation",
    initialState: {
        GenerateInvitationData: null,
        GenerateInvitationDataSuccess: false,
        isGenerateInvitationDataError: null,
        isGenerateInvitationDataLoading: false,
    },
    reducers: {
        GenerateInvitationData: (state, action) => {
            state.GenerateInvitationData = null;
            state.GenerateInvitationDataSuccess = false;
            state.isGenerateInvitationDataError = false;
            state.isGenerateInvitationDataLoading = true;
        },
        GenerateInvitationDataSuccess: (state, action) => {
            state.GenerateInvitationData = action.payload;
            state.GenerateInvitationDataSuccess = true;
            state.isGenerateInvitationDataError = false;
            state.isGenerateInvitationDataLoading = false;
        },
        GenerateInvitationFailedData: (state, action) => {
            state.GenerateInvitationData = null;
            state.GenerateInvitationDataSuccess = false;
            state.isGenerateInvitationDataError = true;
            state.isGenerateInvitationDataLoading = false;
        },
        GenerateInvitationDataClear: (state, action) => {
            state.GenerateInvitationData = null;
            state.GenerateInvitationDataSuccess = false;
            state.isGenerateInvitationDataError = null;
            state.isGenerateInvitationDataLoading = false;
        }
    },
});
export const {
    GenerateInvitationData,
    GenerateInvitationDataSuccess,
    GenerateInvitationFailedData,
    GenerateInvitationDataClear
} = GenerateInvitationSlice.actions;
export default GenerateInvitationSlice.reducer;