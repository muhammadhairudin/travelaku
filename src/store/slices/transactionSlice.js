import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';

export const createTransaction = createAsyncThunk(
  'transaction/createTransaction',
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post('/api/v1/create-transaction', transactionData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  'transaction/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/api/v1/transactions');
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTransactionProof = createAsyncThunk(
  'transaction/updateTransactionProof',
  async ({ id, proofPaymentUrl }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/v1/update-transaction-proof-payment/${id}`, {
        proofPaymentUrl
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    currentTransaction: null,
    loading: false,
    error: null
  },
  reducers: {
    clearTransactionError: (state) => {
      state.error = null;
    },
    setCurrentTransaction: (state, action) => {
      state.currentTransaction = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create Transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.currentTransaction = action.payload;
        state.transactions.unshift(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create transaction';
      })
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
      // Update Transaction Proof
      .addCase(updateTransactionProof.fulfilled, (state, action) => {
        const index = state.transactions.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.transactions[index] = action.payload;
        }
        if (state.currentTransaction?.id === action.payload.id) {
          state.currentTransaction = action.payload;
        }
      });
  }
});

export const { clearTransactionError, setCurrentTransaction } = transactionSlice.actions;
export default transactionSlice.reducer; 