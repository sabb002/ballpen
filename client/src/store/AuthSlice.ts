import { createSlice } from "@reduxjs/toolkit";

export type AuthType = {
    token: string | null,
    user: {
        full_name: string,
        given_name: string,
        email: string,
        picture: string,
        exp: number,
    },
    isLoading: boolean,
    isError: boolean,
    errorMessage: string,
}

export type AuthState = {
    auth: AuthType;
}

const initialState: AuthType = {
    token: localStorage.getItem("token") ? localStorage.getItem("token") : null,
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    isLoading: false,
    isError: false,
    errorMessage: ''
};

const AuthSlice = createSlice({
    name: "g_auth",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // const {full_name, given_name, email, picture, exp} = action.payload;
            // state.user.full_name = full_name;
            // state.user.given_name = given_name;
            // state.user.email = email;
            // state.user.picture = picture;
            // state.user.exp = exp;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        setError: (state, action) => {
            const { error, msg } = action.payload;
            state.isError = error ? true : false;
            state.errorMessage = msg;
        },
        clearAuthState: (state) => {
            state.token = localStorage.getItem("credential") ? localStorage.getItem("credential") : null;
            state.user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
            state.isLoading = false;
            state.isError = false;
            state.errorMessage = '';
        }
    }
})

export const { setUser, setToken, setError, setLoading, clearAuthState } = AuthSlice.actions;
export default AuthSlice.reducer; 