import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components/atoms';
import { ActivityCard } from '../../../../components/molecules';

const PopularActivities = ({ activities, className = '' }) => {
  return (
    <section className={className}>
      <div className="flex justify-between items-center mb-6">
        <Text variant="h2" className="text-2xl font-bold">
          Aktivitas Populer
        </Text>
        <Link 
          to="/activities" 
          className="text-primary hover:text-primary/80"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {activities.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity}
          />
        ))}
      </div>
    </section>
  );
};

PopularActivities.propTypes = {
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
  ).isRequired,
  className: PropTypes.string
};

export default PopularActivities; 