import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { fetchActivityDetail } from '../../../store/slices/activitySlice';
import { Text, Badge } from '../../atoms';
import { Card } from '..';

const ActivityCard = ({ activity }) => {
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  if (!activity) return null;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleImageError = (e) => {
    e.target.onerror = null;
    e.target.src = 'https://placehold.co/600x400?text=No+Image';
  };

  const handleClick = (e) => {
    e.preventDefault();
    startTransition(() => {
      Link(`/activities/${activity.id}`);
    });
  };

  const imageUrl = activity.imageUrls?.[0] || 'https://placehold.co/600x400?text=No+Image';
  const discountPercentage = activity.price_discount ? 
    Math.round((activity.price - activity.price_discount) / activity.price * 100) : 0;

  return (
    <div onClick={handleClick} role="button" tabIndex={0}>
      <Card className="h-full hover:shadow-lg transition-all duration-200 cursor-pointer">
        <div className="relative">
          {/* Image Container */}
          <div className="aspect-[4/3] relative overflow-hidden">
            <img
              src={imageUrl}
              alt={activity.title}
              className="w-full h-full object-cover"
              onError={handleImageError}
            />
            {/* VIP Badge if needed */}
            {activity.isVIP && (
              <div className="absolute top-2 left-2 bg-purple-700 text-white text-xs px-2 py-1 rounded">
                VIP Access
              </div>
            )}
            {/* Navigation Arrows - Only show if multiple images */}
            {activity.imageUrls?.length > 1 && (
              <>
                <button className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full">
                  <span className="sr-only">Previous</span>
                  ←
                </button>
                <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-1 rounded-full">
                  <span className="sr-only">Next</span>
                  →
                </button>
              </>
            )}
          </div>

          {/* Content */}
          <div className="p-4 space-y-2">
            {/* Location */}
            <Text variant="caption" className="text-gray-600">
              {activity.city}, {activity.province}
            </Text>

            {/* Title */}
            <Text variant="label" className="font-semibold line-clamp-2">
              {activity.title}
            </Text>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 rounded text-sm ${
                activity.rating >= 9 ? 'bg-green-100 text-green-800' : 
                activity.rating >= 8 ? 'bg-blue-100 text-blue-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {activity.rating}/10
              </span>
              <Text variant="caption">
                {activity.rating >= 9 ? 'Exceptional' : 
                 activity.rating >= 8 ? 'Wonderful' : 'Good'}
              </Text>
              <Text variant="caption" className="text-gray-500">
                ({activity.total_reviews} reviews)
              </Text>
            </div>

            {/* Price */}
            <div className="mt-4">
              <div className="flex items-center gap-2">
                {activity.price_discount && (
                  <Text variant="body2" className="line-through text-gray-400">
                    {formatPrice(activity.price)}
                  </Text>
                )}
                <Text variant="h4" className="font-bold text-lg">
                  {formatPrice(activity.price_discount || activity.price)}
                </Text>
              </div>
              <Text variant="caption" className="text-gray-500">
                per person
              </Text>
              {discountPercentage > 0 && (
                <div className="mt-1">
                  <span className="text-green-600 font-semibold">
                    {discountPercentage}% off
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

ActivityCard.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string),
    price: PropTypes.number.isRequired,
    price_discount: PropTypes.number,
    rating: PropTypes.number.isRequired,
    total_reviews: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    isVIP: PropTypes.bool,
    category: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string
    })
  }).isRequired
};

export default ActivityCard; 