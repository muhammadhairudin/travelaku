import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

// Fetch Promos
export const fetchPromos = createAsyncThunk(
  'promoManagement/fetchPromos',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${BASE_URL}/api/v1/promos`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat promo');
    }
  }
);

// Create Promo
export const createPromo = createAsyncThunk(
  'promoManagement/createPromo',
  async (promoData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(`${BASE_URL}/api/v1/create-promo`, promoData, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menambahkan promo');
    }
  }
);

// Update Promo
export const updatePromo = createAsyncThunk(
  'promoManagement/updatePromo',
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(`${BASE_URL}/api/v1/update-promo/${id}`, data, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui promo');
    }
  }
);

// Delete Promo
export const deletePromo = createAsyncThunk(
  'promoManagement/deletePromo',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${BASE_URL}/api/v1/delete-promo/${id}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus promo');
    }
  }
);

const promoManagementSlice = createSlice({
  name: 'promoManagement',
  initialState: {
    promos: [],
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
      // Fetch Promos
      .addCase(fetchPromos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPromos.fulfilled, (state, action) => {
        state.loading = false;
        state.promos = action.payload;
      })
      .addCase(fetchPromos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Promo
      .addCase(createPromo.fulfilled, (state, action) => {
        state.promos.push(action.payload);
      })
      // Update Promo
      .addCase(updatePromo.fulfilled, (state, action) => {
        const index = state.promos.findIndex(promo => promo.id === action.payload.id);
        if (index !== -1) {
          state.promos[index] = action.payload;
        }
      })
      // Delete Promo
      .addCase(deletePromo.fulfilled, (state, action) => {
        state.promos = state.promos.filter(promo => promo.id !== action.payload);
      });
  }
});

export const { clearError } = promoManagementSlice.actions;
export default promoManagementSlice.reducer; 