import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const ActivityList = ({ activities }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

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
    <div className="space-y-4">
      {activities.map((activity) => (
        <Link key={activity.id} to={`/activities/${activity.id}`}>
          <Card className="p-4 hover:shadow-lg transition-shadow">
            <div className="flex gap-4">
              {/* Image */}
              <div className="w-48 h-32 flex-shrink-0">
                <img
                  src={activity.imageUrls[0]}
                  alt={activity.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-grow">
                <Text variant="h6" className="font-semibold mb-2">
                  {activity.title}
                </Text>

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-500">★ {activity.rating}</span>
                  <Text variant="caption" className="text-gray-500">
                    ({activity.total_reviews} ulasan)
                  </Text>
                </div>

                <Text variant="caption" className="text-gray-600 mb-2">
                  {activity.city}, {activity.province}
                </Text>

                <div className="flex items-center gap-2">
                  {activity.price_discount && (
                    <Text variant="caption" className="line-through text-gray-400">
                      {formatPrice(activity.price)}
                    </Text>
                  )}
                  <Text variant="body1" className="font-bold text-primary">
                    {formatPrice(activity.price_discount || activity.price)}
                  </Text>
                  <Text variant="caption" className="text-gray-500">
                    /orang
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
};

ActivityList.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      price_discount: PropTypes.number,
      rating: PropTypes.number.isRequired,
      total_reviews: PropTypes.number.isRequired,
      city: PropTypes.string.isRequired,
      province: PropTypes.string.isRequired
    })
  ).isRequired
};

export default ActivityList; 