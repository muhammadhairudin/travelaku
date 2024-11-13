import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const PopularActivities = ({ activities }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <Card className="p-6">
      <Text variant="h2" className="text-xl font-bold mb-6">
        Aktivitas Populer
      </Text>

      <div className="space-y-4">
        {activities?.map((activity) => (
          <Link
            key={activity.id}
            to={`/admin/activities/${activity.id}`}
            className="block hover:bg-gray-50 -mx-6 px-6 py-3 transition-colors"
          >
            <div className="flex items-center gap-4">
              <img
                src={activity.imageUrls[0]}
                alt={activity.title}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-grow">
                <Text variant="label" className="line-clamp-1">
                  {activity.title}
                </Text>
                <div className="flex items-center gap-2 mt-1">
                  <Text variant="caption" className="text-yellow-500">
                    ★ {activity.rating}
                  </Text>
                  <Text variant="caption" className="text-gray-500">
                    ({activity.total_reviews} ulasan)
                  </Text>
                </div>
                <Text variant="body2" className="text-primary font-medium">
                  {formatPrice(activity.price)}
                </Text>
              </div>
              <div className="text-right">
                <Text variant="caption" className="text-gray-500">
                  {activity.city}, {activity.province}
                </Text>
              </div>
            </div>
          </Link>
        ))}

        {activities?.length === 0 && (
          <div className="text-center py-8">
            <Text variant="body2" className="text-gray-500">
              Belum ada aktivitas
            </Text>
          </div>
        )}
      </div>
    </Card>
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
  )
};

export default PopularActivities; 