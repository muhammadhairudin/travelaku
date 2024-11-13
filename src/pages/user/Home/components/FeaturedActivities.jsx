import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text, Button } from '../../../../components/atoms';
import { ActivityCard } from '../../../../components/molecules';

const FeaturedActivities = ({ activities }) => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <Text variant="h2" className="text-3xl font-bold mb-2">
              Aktivitas Populer
            </Text>
            <Text variant="body1" className="text-gray-500">
              Jelajahi pengalaman wisata terbaik pilihan traveler
            </Text>
          </div>
          <Link to="/activities">
            <Button variant="outline">
              Lihat Semua
            </Button>
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
      </div>
    </section>
  );
};

FeaturedActivities.propTypes = {
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

export default FeaturedActivities; 