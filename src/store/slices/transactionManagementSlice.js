import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';

export const fetchTransactions = createAsyncThunk(
  'transactionManagement/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/admin/transactions');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTransactionStatus = createAsyncThunk(
  'transactionManagement/updateTransactionStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/v1/admin/transactions/${id}/status`, {
        status
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const transactionManagementSlice = createSlice({
  name: 'transactionManagement',
  initialState: {
    transactions: [],
    loading: false,
    error: null
  },
  reducers: {
    clearTransactionError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch transactions';
      })
      // Update Transaction Status
      .addCase(updateTransactionStatus.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(tx => tx.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
      });
  }
});

export const { clearTransactionError } = transactionManagementSlice.actions;
export default transactionManagementSlice.reducer; 