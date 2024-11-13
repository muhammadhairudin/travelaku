import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchActivities } from '../../../store/slices/activityManagementSlice';
import { fetchCategories } from '../../../store/slices/categorySlice';
import { Text, Button } from '../../../components/atoms';
import { SearchInput } from '../../../components/molecules';
import ActivityTable from './components/ActivityTable';
import AddActivityModal from './components/AddActivityModal';

const ActivityManagement = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { activities, loading, error } = useSelector(state => state.activityManagement);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    dispatch(fetchActivities());
    dispatch(fetchCategories());

    if (location.state?.showDetails) {
      if (activities.length > 0) {
        setSelectedActivity(activities[0]);
      }
    }
  }, [dispatch, location.state, activities]);

  const filteredActivities = activities.filter(activity => 
    activity.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text variant="h1" className="text-2xl font-bold">
          Manajemen Aktivitas
        </Text>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          Tambah Aktivitas
        </Button>
      </div>

      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari aktivitas..."
        />
      </div>

      {error && (
        <div className="text-center py-4">
          <Text variant="body1" className="text-red-500">
            {error}
          </Text>
        </div>
      )}

      <ActivityTable 
        activities={filteredActivities}
        loading={loading}
      />

      <AddActivityModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default ActivityManagement; 