import { Navigate, createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import UserLayout from '../layouts/UserLayout';
import LoginPage from '../pages/auth/Login';
import RegisterPage from '../pages/auth/Register';
import ErrorPage from '../pages/Error';
import NotFoundPage from '../pages/NotFound';

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard';
import ActivityManagement from '../pages/admin/ActivityManagement';
import BannerManagement from '../pages/admin/BannerManagement';
import CategoryManagement from '../pages/admin/CategoryManagement';
import PromoManagement from '../pages/admin/PromoManagement';
import UserManagement from '../pages/admin/UserManagement';

// User Pages
import HomePage from '../pages/user/Home';
import ActivitiesPage from '../pages/user/Activities';
import ActivityDetailPage from '../pages/user/ActivityDetail';
import CartPage from '../pages/user/Cart';
import CheckoutPage from '../pages/user/Checkout';
import ProfilePage from '../pages/user/Profile';
import PromoPage from '../pages/user/Promo';
import TransactionsPage from '../pages/user/Transactions';
import ReviewsPage from '../pages/user/Reviews';

// Route Protection Components
import { AdminRoute, PrivateRoute } from './PrivateRoute';

const router = createBrowserRouter([
  // Auth Routes
  {
    path: '/login',
    element: <LoginPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/register',
    element: <RegisterPage />,
    errorElement: <ErrorPage />
  },

  // Admin Routes
  {
    path: '/admin',
    element: <AdminRoute><AdminLayout /></AdminRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <AdminDashboard />
      },
      {
        path: 'activities',
        element: <ActivityManagement />
      },
      {
        path: 'banners',
        element: <BannerManagement />
      },
      {
        path: 'categories',
        element: <CategoryManagement />
      },
      {
        path: 'promos',
        element: <PromoManagement />
      },
      {
        path: 'users',
        element: <UserManagement />
      }
    ]
  },

  // User Routes
  {
    path: '/',
    element: <UserLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />
      },
      {
        path: 'activities',
        children: [
          {
            index: true,
            element: <ActivitiesPage />
          },
          {
            path: ':id',
            element: <ActivityDetailPage />
          }
        ]
      },
      {
        path: 'promos',
        element: <PromoPage />
      },
      // Protected User Routes
      {
        path: 'cart',
        element: <PrivateRoute><CartPage /></PrivateRoute>
      },
      {
        path: 'checkout',
        element: <PrivateRoute><CheckoutPage /></PrivateRoute>
      },
      {
        path: 'profile',
        element: <PrivateRoute><ProfilePage /></PrivateRoute>,
        children: [
          {
            path: 'transactions',
            element: <TransactionsPage />
          },
          {
            path: 'reviews',
            element: <ReviewsPage />
          }
        ]
      }
    ]
  },

  // 404 Route
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: <ErrorPage />
  }
]);

export default router; 