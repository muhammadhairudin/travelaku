import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const AdminLayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log('Auth State:', { isAuthenticated, user });
    
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (!user || user.role !== 'admin') {
      console.log('User not admin:', user);
      navigate('/');
    }
  }, [isAuthenticated, user, navigate]);

  if (loading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 