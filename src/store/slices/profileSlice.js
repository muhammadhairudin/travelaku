import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

// Fetch Profile
export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${BASE_URL}/api/v1/user`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat profil');
    }
  }
);

// Update Profile
export const updateProfile = createAsyncThunk(
  'profile/updateProfile',
  async (profileData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(`${BASE_URL}/api/v1/update-profile`, profileData, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui profil');
    }
  }
);

// Fetch User Transactions
export const fetchUserTransactions = createAsyncThunk(
  'profile/fetchUserTransactions',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${BASE_URL}/api/v1/user-transactions`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat transaksi');
    }
  }
);

// Fetch User Reviews
export const fetchUserReviews = createAsyncThunk(
  'profile/fetchUserReviews',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${BASE_URL}/api/v1/user-reviews`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat ulasan');
    }
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    profile: null,
    transactions: [],
    reviews: [],
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Profile
      .addCase(fetchProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update Profile
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      // Fetch User Transactions
      .addCase(fetchUserTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchUserTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch User Reviews
      .addCase(fetchUserReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchUserReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { clearError } = profileSlice.actions;
export default profileSlice.reducer; 