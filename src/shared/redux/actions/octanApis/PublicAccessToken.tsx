import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const PublicAccessToken = createAsyncThunk("PublicAccessToken", async (obj, { dispatch }) => {
    dispatch(PublicAccessTokenData(''));

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify(obj);

    const requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        // body: raw,
        redirect: 'follow' as RequestRedirect, 
    };

    try {
        const response = await fetch("https://gateway.octanscare.nz/PublicAccessToken", requestOptions);
        const result = await response.json();
        
        if (result) {
             dispatch(PublicAccessTokenDataSuccess(result));
           localStorage.setItem('PublicToken', JSON.stringify(result));
        } else {
            dispatch(PublicAccessTokenDataFailed(result));
        }
    } catch (error) {
        dispatch(PublicAccessTokenDataFailed(error));
    }
});

const PublicAccessTokenSlice = createSlice({
    name: "PublicAccessToken",
    initialState: {
        PublicAccessTokenData: null,
        PublicAccessTokenDataSuccess: false,
        isPublicAccessTokenDataError: null,
        isPublicAccessTokenDataLoading: false,
    },
    reducers: {
        PublicAccessTokenData: (state, action) => {
            state.PublicAccessTokenData = null;
            state.PublicAccessTokenDataSuccess = false;
            state.isPublicAccessTokenDataError = false;
            state.isPublicAccessTokenDataLoading = true;
        },
        PublicAccessTokenDataSuccess: (state, action) => {
            state.PublicAccessTokenData = action.payload;
            state.PublicAccessTokenDataSuccess = true;
            state.isPublicAccessTokenDataError = false;
            state.isPublicAccessTokenDataLoading = false;
        },
        PublicAccessTokenDataFailed: (state, action) => {
            state.PublicAccessTokenData = null;
            state.PublicAccessTokenDataSuccess = false;
            state.isPublicAccessTokenDataError = true;
            state.isPublicAccessTokenDataLoading = false;
        },
        PublicAccessTokenDataClear: (state, action) => {
            state.PublicAccessTokenData = null;
            state.PublicAccessTokenDataSuccess = false;
            state.isPublicAccessTokenDataError = null;
            state.isPublicAccessTokenDataLoading = false;
        }
    },
});

export const {
    PublicAccessTokenData,
    PublicAccessTokenDataSuccess,
    PublicAccessTokenDataFailed,
    PublicAccessTokenDataClear
} = PublicAccessTokenSlice.actions;

export default PublicAccessTokenSlice.reducer;
