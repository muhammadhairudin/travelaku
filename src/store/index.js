import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import dashboardReducer from './slices/dashboardSlice';
import homeReducer from './slices/homeSlice';
import activityReducer from './slices/activitySlice';
import cartReducer from './slices/cartSlice';
import promoReducer from './slices/promoSlice';
import profileReducer from './slices/profileSlice';
import adminReducer from './slices/adminSlice';
import userManagementReducer from './slices/userManagementSlice';
import activityManagementReducer from './slices/activityManagementSlice';
import categoryManagementReducer from './slices/categoryManagementSlice';
import bannerManagementReducer from './slices/bannerManagementSlice';
import promoManagementReducer from './slices/promoManagementSlice';
import transactionManagementReducer from './slices/transactionManagementSlice';
import categoryReducer from './slices/categorySlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    home: homeReducer,
    activity: activityReducer,
    cart: cartReducer,
    promo: promoReducer,
    profile: profileReducer,
    admin: adminReducer,
    userManagement: userManagementReducer,
    activityManagement: activityManagementReducer,
    categoryManagement: categoryManagementReducer,
    bannerManagement: bannerManagementReducer,
    promoManagement: promoManagementReducer,
    transactionManagement: transactionManagementReducer,
    category: categoryReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    })
});

export default store; 