import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/login`, credentials, {
        headers: {
          'Content-Type': 'application/json',
          apiKey: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/v1/register`, userData, {
        headers: {
          'Content-Type': 'application/json',
          apiKey: API_KEY
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Gagal melakukan pendaftaran'
      );
    }
  }
);

const loadInitialState = () => {
  const token = localStorage.getItem('token');
  const savedUser = localStorage.getItem('user');
  return {
    user: savedUser ? JSON.parse(savedUser) : null,
    token: token,
    isAuthenticated: !!token,
    loading: false,
    error: null
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        const userData = action.payload.data;
        const token = action.payload.token;
        
        state.loading = false;
        state.isAuthenticated = true;
        state.user = userData;
        state.token = token;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        console.log('Login Success:', {
          userData,
          token,
          fullResponse: action.payload
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Login failed';
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Registration failed';
      });
  }
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer; 