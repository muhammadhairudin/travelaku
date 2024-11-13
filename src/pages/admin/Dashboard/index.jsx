import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text } from '../../../components/atoms';
import { fetchDashboardData } from '../../../store/slices/dashboardSlice';
import StatisticsCards from './components/StatisticsCards';
import RevenueChart from './components/RevenueChart';
import PopularActivities from './components/PopularActivities';
import RecentTransactions from './components/RecentTransactions';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { 
    loading, 
    error, 
    stats, 
    revenueData, 
    popularActivities,
    recentTransactions 
  } = useSelector(state => state.dashboard);
  const { isAuthenticated, user } = useSelector(state => state.auth);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        console.log('Current Auth State:', { isAuthenticated, user });
        
        if (!isAuthenticated) {
          navigate('/login');
          return;
        }

        if (!user || user.role !== 'admin') {
          navigate('/');
          return;
        }

        await dispatch(fetchDashboardData()).unwrap();
      } catch (err) {
        console.error('Dashboard Load Error:', err);
        if (err === 'Sesi telah berakhir, silakan login kembali') {
          navigate('/login');
        }
      }
    };

    loadDashboard();
  }, [dispatch, navigate, isAuthenticated, user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="p-4 bg-red-50 rounded-lg">
          <Text variant="body2" className="text-red-700">
            {error}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Text variant="h1" className="text-2xl font-bold">
        Dashboard Admin
      </Text>
      
      <StatisticsCards stats={stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueChart data={revenueData} />
        <PopularActivities activities={popularActivities} />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions transactions={recentTransactions} />
    </div>
  );
};

export default AdminDashboard; 