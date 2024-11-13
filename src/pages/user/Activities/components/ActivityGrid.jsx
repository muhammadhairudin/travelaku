import PropTypes from 'prop-types';
import { ActivityCard } from '../../../../components/molecules';
import { Text } from '../../../../components/atoms';

const ActivityGrid = ({ activities }) => {
  if (!activities?.length) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-gray-500">
          Tidak ada aktivitas yang ditemukan
        </Text>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {activities.map((activity) => (
        <ActivityCard 
          key={activity.id} 
          activity={activity}
        />
      ))}
    </div>
  );
};

ActivityGrid.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      rating: PropTypes.number.isRequired,
      total_reviews: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      province: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ActivityGrid; 