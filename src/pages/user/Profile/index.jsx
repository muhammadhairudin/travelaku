import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../../../store/slices/profileSlice';
import { Text } from '../../../components/atoms';
import ProfileInfo from './components/ProfileInfo';
import TransactionHistory from '../TransactionHistory';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-red-500">
          {error}
        </Text>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Text variant="h1" className="text-2xl font-bold mb-8">
        Profil Saya
      </Text>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <ProfileInfo user={user} />
        </div>

        {/* Transaction History */}
        <div className="lg:col-span-2">
          <TransactionHistory />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 