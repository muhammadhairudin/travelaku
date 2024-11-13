import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../../store/slices/cartSlice';
import { Text, Button } from '../../../../components/atoms';

const PriceCard = ({ price, priceDiscount }) => {
  const dispatch = useDispatch();

  const formatPrice = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(value);
  };

  const handleAddToCart = () => {
    dispatch(addToCart());
  };

  const discount = price - priceDiscount;
  const discountPercentage = Math.round((discount / price) * 100);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="space-y-4">
        {/* Price */}
        <div>
          {priceDiscount ? (
            <>
              <Text variant="body2" className="line-through text-gray-400">
                {formatPrice(price)}
              </Text>
              <div className="flex items-center gap-2">
                <Text variant="h3" className="text-2xl font-bold text-primary">
                  {formatPrice(priceDiscount)}
                </Text>
                <Text 
                  variant="caption" 
                  className="bg-red-100 text-red-600 px-2 py-1 rounded"
                >
                  {discountPercentage}% OFF
                </Text>
              </div>
            </>
          ) : (
            <Text variant="h3" className="text-2xl font-bold text-primary">
              {formatPrice(price)}
            </Text>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            variant="primary" 
            className="w-full"
            onClick={handleAddToCart}
          >
            Tambah ke Keranjang
          </Button>
          <Button variant="outline" className="w-full">
            Chat Admin
          </Button>
        </div>

        {/* Info */}
        <div className="text-center">
          <Text variant="caption" className="text-gray-500">
            *Harga sudah termasuk pajak
          </Text>
        </div>
      </div>
    </div>
  );
};

PriceCard.propTypes = {
  price: PropTypes.number.isRequired,
  priceDiscount: PropTypes.number
};

export default PriceCard; 