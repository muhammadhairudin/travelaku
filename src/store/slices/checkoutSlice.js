import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

// Create Transaction
export const createTransaction = createAsyncThunk(
  'checkout/createTransaction',
  async (transactionData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(`${BASE_URL}/api/v1/create-transaction`, transactionData, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal membuat transaksi');
    }
  }
);

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    transaction: null,
    loading: false,
    error: null,
    step: 1 // 1: Review Order, 2: Payment Method, 3: Payment Confirmation
  },
  reducers: {
    setStep: (state, action) => {
      state.step = action.payload;
    },
    clearCheckout: (state) => {
      state.transaction = null;
      state.step = 1;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.transaction = action.payload;
        state.step = 2;
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setStep, clearCheckout } = checkoutSlice.actions;
export default checkoutSlice.reducer; 