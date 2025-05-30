import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const AddPatientForMedicare = createAsyncThunk("AddPatientForMedicare", async (obj:any, { dispatch }) => {
    dispatch(AddPatientForMedicareData(''));

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
        const response = await fetch("https://gateway.octanscare.nz/AddPatientForMedicare", requestOptions);
        const result = await response.json();

        if (result) {
            dispatch(AddPatientForMedicareSuccess(result));
        } else {
            dispatch(AddPatientForMedicareFailed(result));
        }
    } catch (error) {
        dispatch(AddPatientForMedicareFailed(error));
    }
});

const AddPatientForMedicareSlice = createSlice({
    name: "AddPatientForMedicare",
    initialState: {
        AddPatientForMedicareData: null,
        AddPatientForMedicareSuccess: false,
        isAddPatientForMedicareError: null,
        isAddPatientForMedicareLoading: false,
    },
    reducers: {
        AddPatientForMedicareData: (state, action) => {
            state.AddPatientForMedicareData = null;
            state.AddPatientForMedicareSuccess = false;
            state.isAddPatientForMedicareError = false;
            state.isAddPatientForMedicareLoading = true;
        },
        AddPatientForMedicareSuccess: (state, action) => {
            state.AddPatientForMedicareData = action.payload;
            state.AddPatientForMedicareSuccess = true;
            state.isAddPatientForMedicareError = false;
            state.isAddPatientForMedicareLoading = false;
        },
        AddPatientForMedicareFailed: (state, action) => {
            state.AddPatientForMedicareData = null;
            state.AddPatientForMedicareSuccess = false;
            state.isAddPatientForMedicareError = true;
            state.isAddPatientForMedicareLoading = false;
        },
        AddPatientForMedicareClear: (state, action) => {
            state.AddPatientForMedicareData = null;
            state.AddPatientForMedicareSuccess = false;
            state.isAddPatientForMedicareError = null;
            state.isAddPatientForMedicareLoading = false;
        }
    },
});

export const {
    AddPatientForMedicareData,
    AddPatientForMedicareSuccess,
    AddPatientForMedicareFailed,
    AddPatientForMedicareClear
} = AddPatientForMedicareSlice.actions;

export default AddPatientForMedicareSlice.reducer;
