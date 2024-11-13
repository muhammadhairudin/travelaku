import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivities } from '../../../store/slices/activitySlice';
import { ActivityCard } from '../../../components/molecules';
import { Text } from '../../../components/atoms';
import LoadingPage from '../../../components/common/LoadingPage';

const ActivitiesPage = () => {
  const dispatch = useDispatch();
  const { activities, loading, error } = useSelector(state => state.activity);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="container px-4 py-8 mx-auto">
        <Text variant="body1" className="text-red-500">
          {error}
        </Text>
      </div>
    );
  }

  return (
    <div className="container px-4 py-8 mx-auto">
      <Text variant="h1" className="mb-6 text-2xl font-bold">
        Semua Aktivitas
      </Text>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {activities?.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity} 
          />
        ))}
      </div>
    </div>
  );
};

export default ActivitiesPage; 