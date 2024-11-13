import PropTypes from 'prop-types';
import { Text } from '../../../../components/atoms';

const ActivityInfo = ({ activity }) => {
  return (
    <div className="space-y-6">
      {/* Title & Rating */}
      <div>
        <Text variant="h1" className="text-3xl font-bold mb-2">
          {activity.title}
        </Text>
        <div className="flex items-center gap-2">
          <span className="text-yellow-500">★</span>
          <Text variant="body2">
            {activity.rating} ({activity.total_reviews} ulasan)
          </Text>
        </div>
      </div>

      {/* Description */}
      <div>
        <Text variant="label" className="mb-2">Deskripsi</Text>
        <Text variant="body1" className="text-gray-600">
          {activity.description}
        </Text>
      </div>

      {/* Facilities */}
      <div>
        <Text variant="label" className="mb-2">Fasilitas</Text>
        <div 
          className="prose prose-sm max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: activity.facilities }}
        />
      </div>

      {/* Location */}
      <div>
        <Text variant="label" className="mb-2">Lokasi</Text>
        <Text variant="body2" className="text-gray-600">
          {activity.address}
        </Text>
        <div className="flex items-center gap-2 mt-1">
          <Text variant="body2" className="text-gray-500">
            {activity.city}, {activity.province}
          </Text>
        </div>
      </div>
    </div>
  );
};

ActivityInfo.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    total_reviews: PropTypes.number.isRequired,
    facilities: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired
  }).isRequired
};

export default ActivityInfo; 