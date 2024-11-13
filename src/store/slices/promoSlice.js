import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';

export const fetchPromos = createAsyncThunk(
  'promo/fetchPromos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/promos');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const validatePromoCode = createAsyncThunk(
  'promo/validate',
  async (code, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/validate-promo', { code });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const promoSlice = createSlice({
  name: 'promo',
  initialState: {
    promos: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
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
        state.error = action.payload?.message || 'Failed to fetch promos';
      });
  }
});

export default promoSlice.reducer; 