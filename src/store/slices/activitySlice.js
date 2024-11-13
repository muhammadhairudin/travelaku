import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

// Fetch Activities
export const fetchActivities = createAsyncThunk(
  'activity/fetchActivities',
  async ({ categoryId, search }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${BASE_URL}/api/v1/activities`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        },
        params: {
          categoryId,
          search
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat aktivitas');
    }
  }
);

// Fetch Activity Detail
export const fetchActivityDetail = createAsyncThunk(
  'activity/fetchActivityDetail',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${BASE_URL}/api/v1/activity/${id}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat detail aktivitas');
    }
  }
);

const activitySlice = createSlice({
  name: 'activity',
  initialState: {
    activities: [],
    selectedActivity: null,
    filters: {
      categoryId: null,
      search: ''
    },
    loading: false,
    error: null
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = {
        ...state.filters,
        ...action.payload
      };
    },
    clearFilters: (state) => {
      state.filters = {
        categoryId: null,
        search: ''
      };
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Activities
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = action.payload;
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Activity Detail
      .addCase(fetchActivityDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchActivityDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedActivity = action.payload;
      })
      .addCase(fetchActivityDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilters, clearFilters } = activitySlice.actions;
export default activitySlice.reducer; 