import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

// Fetch Categories
export const fetchCategories = createAsyncThunk(
  'categoryManagement/fetchCategories',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.get(`${BASE_URL}/api/v1/categories`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memuat kategori');
    }
  }
);

// Create Category
export const createCategory = createAsyncThunk(
  'categoryManagement/createCategory',
  async (categoryData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(`${BASE_URL}/api/v1/create-category`, categoryData, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menambahkan kategori');
    }
  }
);

// Update Category
export const updateCategory = createAsyncThunk(
  'categoryManagement/updateCategory',
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(`${BASE_URL}/api/v1/update-category/${id}`, data, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui kategori');
    }
  }
);

// Delete Category
export const deleteCategory = createAsyncThunk(
  'categoryManagement/deleteCategory',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${BASE_URL}/api/v1/delete-category/${id}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus kategori');
    }
  }
);

const categoryManagementSlice = createSlice({
  name: 'categoryManagement',
  initialState: {
    categories: [],
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
      // Fetch Categories
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Category
      .addCase(createCategory.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      // Update Category
      .addCase(updateCategory.fulfilled, (state, action) => {
        const index = state.categories.findIndex(category => category.id === action.payload.id);
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      // Delete Category
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.categories = state.categories.filter(category => category.id !== action.payload);
      });
  }
});

export const { clearError } = categoryManagementSlice.actions;
export default categoryManagementSlice.reducer; 