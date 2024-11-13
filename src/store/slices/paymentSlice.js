import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';

export const fetchPaymentMethods = createAsyncThunk(
  'payment/fetchPaymentMethods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/payment-methods');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const generatePaymentMethods = createAsyncThunk(
  'payment/generatePaymentMethods',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/generate-payment-methods');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    paymentMethods: [],
    loading: false,
    error: null
  },
  reducers: {
    clearPaymentError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Payment Methods
      .addCase(fetchPaymentMethods.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaymentMethods.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentMethods = action.payload;
      })
      .addCase(fetchPaymentMethods.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch payment methods';
      })
      // Generate Payment Methods
      .addCase(generatePaymentMethods.fulfilled, (state, action) => {
        state.paymentMethods = action.payload;
      });
  }
});

export const { clearPaymentError } = paymentSlice.actions;
export default paymentSlice.reducer; 