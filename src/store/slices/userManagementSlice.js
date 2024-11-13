import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://travel-journal-api-bootcamp.do.dibimbing.id';
const API_KEY = '24405e01-fbc1-45a5-9f5a-be13afcd757c';

// Fetch Users
export const fetchUsers = createAsyncThunk(
  'userManagement/fetchUsers',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      
      // Debug token
      console.log('Current Token:', {
        stateToken: auth.token,
        localStorageToken: localStorage.getItem('token')
      });

      const token = auth.token || localStorage.getItem('token');
      if (!token) {
        throw new Error('Token tidak tersedia');
      }

      const headers = {
        apiKey: API_KEY,
        Authorization: `Bearer ${token}`
      };

      console.log('Request Headers:', headers);

      const response = await axios.get(`${BASE_URL}/api/v1/all-user`, { headers });
      
      console.log('Users Response:', response.data);
      
      return response.data.data;
    } catch (error) {
      console.error('Fetch Users Error:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers
      });
      return rejectWithValue(error.message || 'Gagal memuat data user');
    }
  }
);

// Create User
export const createUser = createAsyncThunk(
  'userManagement/createUser',
  async (userData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const dataToSend = {
        ...userData,
        profilePictureUrl: userData.profilePictureUrl || "https://via.placeholder.com/400"
      };

      const response = await axios.post(`${BASE_URL}/api/v1/register`, dataToSend, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menambahkan user');
    }
  }
);

// Update User
export const updateUser = createAsyncThunk(
  'userManagement/updateUser',
  async ({ id, data }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.put(`${BASE_URL}/api/v1/update-profile/${id}`, data, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui user');
    }
  }
);

// Update User Role
export const updateUserRole = createAsyncThunk(
  'userManagement/updateUserRole',
  async ({ id, role }, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const roleData = { role: role.toLowerCase() };

      const response = await axios.put(`${BASE_URL}/api/v1/update-user-role/${id}`, 
        roleData,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${auth.token}`
          }
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal memperbarui role user');
    }
  }
);

// Delete User
export const deleteUser = createAsyncThunk(
  'userManagement/deleteUser',
  async (id, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      await axios.delete(`${BASE_URL}/api/v1/delete-user/${id}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${auth.token}`
        }
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Gagal menghapus user');
    }
  }
);

const userManagementSlice = createSlice({
  name: 'userManagement',
  initialState: {
    users: [],
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
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create User
      .addCase(createUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      // Update User
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Update User Role
      .addCase(updateUserRole.fulfilled, (state, action) => {
        const index = state.users.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      // Delete User
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  }
});

export const { clearError } = userManagementSlice.actions;
export default userManagementSlice.reducer; 