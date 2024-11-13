import PropTypes from 'prop-types';
import { Text, Button } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <Card className="p-4">
      <div className="flex gap-4">
        {/* Activity Image */}
        <div className="w-32 h-24 flex-shrink-0">
          <img
            src={item.activity.imageUrls[0]}
            alt={item.activity.title}
            className="w-full h-full object-cover rounded-lg"
          />
        </div>

        {/* Content */}
        <div className="flex-grow">
          <Text variant="h6" className="font-semibold mb-1">
            {item.activity.title}
          </Text>
          
          <Text variant="caption" className="text-gray-500 mb-2">
            {item.activity.city}, {item.activity.province}
          </Text>

          <Text variant="body2" className="mb-2">
            Tanggal: {formatDate(item.date)}
          </Text>

          {/* Price & Quantity */}
          <div className="flex items-center justify-between">
            <div>
              <Text variant="body2" className="text-gray-500">
                {formatPrice(item.price)} × {item.quantity}
              </Text>
              <Text variant="body1" className="font-semibold text-primary">
                {formatPrice(item.totalPrice)}
              </Text>
            </div>

            <div className="flex items-center gap-4">
              {/* Quantity Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuantityChange(item.activityId, item.date, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </Button>
                <Text variant="body1">{item.quantity}</Text>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onQuantityChange(item.activityId, item.date, item.quantity + 1)}
                  disabled={item.quantity >= 10}
                >
                  +
                </Button>
              </div>

              {/* Remove Button */}
              <Button
                variant="outline"
                size="sm"
                className="text-red-500 border-red-500 hover:bg-red-50"
                onClick={() => onRemove(item.activityId, item.date)}
              >
                Hapus
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    activityId: PropTypes.string.isRequired,
    activity: PropTypes.shape({
      title: PropTypes.string.isRequired,
      imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
      city: PropTypes.string.isRequired,
      province: PropTypes.string.isRequired
    }).isRequired,
    date: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default CartItem; 