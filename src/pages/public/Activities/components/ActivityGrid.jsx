import PropTypes from 'prop-types';
import { ActivityCard } from '../../../../components/molecules';

const ActivityGrid = ({ activities, loading }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div 
            key={index}
            className="animate-pulse bg-gray-200 rounded-lg h-[300px]"
          />
        ))}
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">
          Tidak ada aktivitas yang ditemukan
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      price_discount: PropTypes.number,
      rating: PropTypes.number.isRequired,
      total_reviews: PropTypes.number.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default ActivityGrid; 