import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

// Fetch Activities
export const fetchActivities = createAsyncThunk(
  'activityManagement/fetchActivities',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${BASE_URL}/api/v1/activities`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat data aktivitas');
    }
  }
);

// Create Activity
export const createActivity = createAsyncThunk(
  'activityManagement/createActivity',
  async (activityData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(`${BASE_URL}/api/v1/create-activity`, activityData, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menambahkan aktivitas');
    }
  }
);

// Update Activity
export const updateActivity = createAsyncThunk(
  'activityManagement/updateActivity',
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(`${BASE_URL}/api/v1/update-activity/${id}`, data, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui aktivitas');
    }
  }
);

// Delete Activity
export const deleteActivity = createAsyncThunk(
  'activityManagement/deleteActivity',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${BASE_URL}/api/v1/delete-activity/${id}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus aktivitas');
    }
  }
);

const activityManagementSlice = createSlice({
  name: 'activityManagement',
  initialState: {
    activities: [],
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
      // Create Activity
      .addCase(createActivity.fulfilled, (state, action) => {
        state.activities.push(action.payload);
      })
      // Update Activity
      .addCase(updateActivity.fulfilled, (state, action) => {
        const index = state.activities.findIndex(activity => activity.id === action.payload.id);
        if (index !== -1) {
          state.activities[index] = action.payload;
        }
      })
      // Delete Activity
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.activities = state.activities.filter(activity => activity.id !== action.payload);
      });
  }
});

export const { clearError } = activityManagementSlice.actions;
export default activityManagementSlice.reducer; 