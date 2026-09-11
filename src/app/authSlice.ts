import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

interface LoginData {
    email: string;
    password: string;
}

interface AuthState {
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    loading: false,
    error: null,
    isAuthenticated: false,
};

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }: LoginData, { rejectWithValue }) => {
        try {
            const response = await axios.get(
                "http://localhost:3001/users"
            );

            const user = response.data.find(
                (user: LoginData) =>
                    user.email === email &&
                    user.password === password
            );

            if (!user) {
                return rejectWithValue(
                    "Invalid email or password"
                );
            }

            localStorage.setItem("isLoggedIn", "true");

            return user;
        } catch (error) {
            return rejectWithValue(
                "Unable to login. Please try again."
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem("isLoggedIn");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(login.fulfilled, (state) => {
                state.loading = false;
                state.isAuthenticated = true;
            })

            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;