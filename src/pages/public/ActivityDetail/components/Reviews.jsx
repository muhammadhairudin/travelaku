import PropTypes from 'prop-types';
import { Text } from '../../../../components/atoms';

const ReviewStars = ({ rating }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <span 
          key={index}
          className={`text-lg ${
            index < Math.floor(rating) 
              ? 'text-yellow-500' 
              : 'text-gray-300'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
};

ReviewStars.propTypes = {
  rating: PropTypes.number.isRequired
};

const Reviews = ({ rating, totalReviews }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Text variant="h2" className="text-xl font-bold">
          Ulasan ({totalReviews})
        </Text>
        <div className="flex items-center gap-2">
          <ReviewStars rating={rating} />
          <Text variant="body2" className="text-gray-600">
            {rating} dari 5
          </Text>
        </div>
      </div>

      {/* Review List - Akan diimplementasikan nanti */}
      <div className="space-y-4">
        <Text variant="body2" className="text-gray-500 text-center py-8">
          Ulasan akan segera hadir
        </Text>
      </div>
    </div>
  );
};

Reviews.propTypes = {
  rating: PropTypes.number.isRequired,
  totalReviews: PropTypes.number.isRequired
};

export default Reviews; 