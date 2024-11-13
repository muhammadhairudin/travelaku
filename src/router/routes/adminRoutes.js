import AdminDashboard from '../../pages/admin/Dashboard';
import ActivityManagement from '../../pages/admin/ActivityManagement';
import BannerManagement from '../../pages/admin/BannerManagement';
import CategoryManagement from '../../pages/admin/CategoryManagement';
import PromoManagement from '../../pages/admin/PromoManagement';
import UserManagement from '../../pages/admin/UserManagement';

export const adminRoutes = [
  {
    path: 'dashboard',
    element: AdminDashboard
  },
  {
    path: 'activities',
    element: ActivityManagement
  },
  {
    path: 'banners',
    element: BannerManagement
  },
  {
    path: 'categories',
    element: CategoryManagement
  },
  {
    path: 'promos',
    element: PromoManagement
  },
  {
    path: 'users',
    element: UserManagement
  }
]; 