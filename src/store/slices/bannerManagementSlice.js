import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

// Fetch Banners
export const fetchBanners = createAsyncThunk(
  'bannerManagement/fetchBanners',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${BASE_URL}/api/v1/banners`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat banner');
    }
  }
);

// Create Banner
export const createBanner = createAsyncThunk(
  'bannerManagement/createBanner',
  async (bannerData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(`${BASE_URL}/api/v1/create-banner`, bannerData, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menambahkan banner');
    }
  }
);

// Update Banner
export const updateBanner = createAsyncThunk(
  'bannerManagement/updateBanner',
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(`${BASE_URL}/api/v1/update-banner/${id}`, data, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui banner');
    }
  }
);

// Delete Banner
export const deleteBanner = createAsyncThunk(
  'bannerManagement/deleteBanner',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${BASE_URL}/api/v1/delete-banner/${id}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus banner');
    }
  }
);

const bannerManagementSlice = createSlice({
  name: 'bannerManagement',
  initialState: {
    banners: [],
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
      // Fetch Banners
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Banner
      .addCase(createBanner.fulfilled, (state, action) => {
        state.banners.push(action.payload);
      })
      // Update Banner
      .addCase(updateBanner.fulfilled, (state, action) => {
        const index = state.banners.findIndex(banner => banner.id === action.payload.id);
        if (index !== -1) {
          state.banners[index] = action.payload;
        }
      })
      // Delete Banner
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.banners = state.banners.filter(banner => banner.id !== action.payload);
      });
  }
});

export const { clearError } = bannerManagementSlice.actions;
export default bannerManagementSlice.reducer; 