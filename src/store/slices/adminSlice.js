import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../lib/axios';

export const fetchDashboardStats = createAsyncThunk(
  'admin/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const [
        statsResponse,
        revenueResponse,
        activitiesResponse,
        transactionsResponse
      ] = await Promise.all([
        axiosInstance.get('/api/v1/admin/stats'),
        axiosInstance.get('/api/v1/admin/revenue-data'),
        axiosInstance.get('/api/v1/admin/popular-activities'),
        axiosInstance.get('/api/v1/admin/recent-transactions')
      ]);

      return {
        ...statsResponse.data.data,
        revenueData: revenueResponse.data.data,
        popularActivities: activitiesResponse.data.data,
        recentTransactions: transactionsResponse.data.data
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const adminSlice = createSlice({
  name: 'admin',
  initialState: {
    stats: {
      totalRevenue: 0,
      totalTransactions: 0,
      totalUsers: 0,
      totalActivities: 0,
      revenueTrend: 0,
      transactionTrend: 0,
      userTrend: 0,
      activityTrend: 0,
      revenueData: [],
      popularActivities: [],
      recentTransactions: []
    },
    loading: false,
    error: null
  },
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchDashboardStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch dashboard stats';
      });
  }
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer; 