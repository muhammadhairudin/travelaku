import LoginPage from '../../pages/auth/Login';
import RegisterPage from '../../pages/auth/Register';

export const authRoutes = [
  {
    path: '/login',
    element: LoginPage
  },
  {
    path: '/register',
    element: RegisterPage
  }
]; 