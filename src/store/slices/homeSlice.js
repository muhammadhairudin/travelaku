import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

// Fetch Home Data
export const fetchHomeData = createAsyncThunk(
  'home/fetchData',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const headers = {
        apiKey: API_KEY,
        Authorization: `Bearer ${auth.token}`
      };

      const [bannersRes, activitiesRes, categoriesRes, promosRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/v1/banners`, { headers }),
        axios.get(`${BASE_URL}/api/v1/activities`, { headers }),
        axios.get(`${BASE_URL}/api/v1/categories`, { headers }),
        axios.get(`${BASE_URL}/api/v1/promos`, { headers })
      ]);

      return {
        banners: bannersRes.data.data,
        activities: activitiesRes.data.data,
        categories: categoriesRes.data.data,
        promos: promosRes.data.data
      };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat data');
    }
  }
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    banners: [],
    activities: [],
    categories: [],
    promos: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHomeData.fulfilled, (state, action) => {
        state.loading = false;
        state.banners = action.payload.banners;
        state.activities = action.payload.activities;
        state.categories = action.payload.categories;
        state.promos = action.payload.promos;
      })
      .addCase(fetchHomeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default homeSlice.reducer; 