import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../lib/axios";

// MOCK DATA for Demo Purposes
const MOCK_USER = {
    _id: "demo-user-001",
    fullName: "Demo User",
    email: "demo@example.com",
    profilePic: "",
    createdAt: new Date().toISOString()
};

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { rejectWithValue }) => {
    try {
        const { data } = await api.get("/auth/check");
        return data;
    } catch (error) {
        // Fallback to mock user if backend is down (Connection Refused)
        if (!error.response) {
            console.warn("Backend unavailable. Using Mock Data for Demo.");
            return MOCK_USER;
        }
        return rejectWithValue(error.response?.data?.message || "Error checking auth");
    }
});

export const signup = createAsyncThunk("auth/signup", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/auth/signup", userData);
        return data;
    } catch (error) {
        if (!error.response) return { ...MOCK_USER, ...userData };
        return rejectWithValue(error.response?.data?.message || "Error signing up");
    }
});

export const login = createAsyncThunk("auth/login", async (userData, { rejectWithValue }) => {
    try {
        const { data } = await api.post("/auth/login", userData);
        return data;
    } catch (error) {
        if (!error.response) return MOCK_USER;
        return rejectWithValue(error.response?.data?.message || "Error logging in");
    }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
        await api.post("/auth/logout");
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Error logging out");
    }
});

const initialState = {
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isCheckingAuth: true,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Check Auth
            .addCase(checkAuth.pending, (state) => {
                state.isCheckingAuth = true;
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isCheckingAuth = false;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.authUser = null;
                state.isCheckingAuth = false;
            })
            // Signup
            .addCase(signup.pending, (state) => {
                state.isSigningUp = true;
                state.error = null;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isSigningUp = false;
            })
            .addCase(signup.rejected, (state, action) => {
                state.isSigningUp = false;
                state.error = action.payload;
            })
            // Login
            .addCase(login.pending, (state) => {
                state.isLoggingIn = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.authUser = action.payload;
                state.isLoggingIn = false;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoggingIn = false;
                state.error = action.payload;
            })
            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.authUser = null;
            })
            .addCase(logout.rejected, (state) => {
                // Force logout on client even if server fails
                state.authUser = null;
            });
    },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
