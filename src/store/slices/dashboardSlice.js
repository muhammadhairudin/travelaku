import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

export const fetchDashboardData = createAsyncThunk(
  'dashboard/fetchData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      
      console.log('Auth State:', {
        token: auth.token,
        isAuthenticated: auth.isAuthenticated,
        user: auth.user
      });

      if (!auth.token) {
        throw new Error('No token available');
      }

      const headers = {
        apiKey: API_KEY,
        Authorization: `Bearer ${auth.token}`
      };

      const [activitiesRes, bannersRes, categoriesRes, promosRes, usersRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/v1/activities`, { headers }),
        axios.get(`${BASE_URL}/api/v1/banners`, { headers }),
        axios.get(`${BASE_URL}/api/v1/categories`, { headers }),
        axios.get(`${BASE_URL}/api/v1/promos`, { headers }),
        axios.get(`${BASE_URL}/api/v1/all-user`, { headers })
      ]);

      const dashboardData = {
        stats: {
          totalActivities: activitiesRes.data.data.length,
          totalBanners: bannersRes.data.data.length,
          totalCategories: categoriesRes.data.data.length,
          totalPromos: promosRes.data.data.length,
          totalUsers: usersRes.data.data.length
        },
        popularActivities: activitiesRes.data.data
          .slice(0, 5)
          .map(activity => ({
            id: activity.id,
            title: activity.title,
            imageUrls: activity.imageUrls || [],
            price: activity.price,
            rating: activity.rating || 0,
            total_reviews: activity.total_reviews || 0,
            city: activity.city,
            province: activity.province
          })),
        recentTransactions: [],
        revenueData: [
          { month: 'Jan 2024', revenue: 5000000 },
          { month: 'Feb 2024', revenue: 6200000 },
          { month: 'Mar 2024', revenue: 7800000 }
        ]
      };

      return dashboardData;
      
    } catch (error) {
      console.error('Dashboard Error Details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });

      return rejectWithValue(
        error.response?.data?.message || 
        error.message || 
        'Gagal memuat data dashboard'
      );
    }
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    stats: {
      totalActivities: 0,
      totalBanners: 0,
      totalCategories: 0,
      totalPromos: 0,
      totalUsers: 0
    },
    revenueData: [
      { month: 'Jan 2024', revenue: 5000000 },
      { month: 'Feb 2024', revenue: 6200000 },
      { month: 'Mar 2024', revenue: 7800000 }
    ],
    popularActivities: [],
    recentTransactions: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardData.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload.stats;
        state.revenueData = action.payload.revenueData;
        state.popularActivities = action.payload.popularActivities;
        state.recentTransactions = action.payload.recentTransactions;
      })
      .addCase(fetchDashboardData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default dashboardSlice.reducer; 