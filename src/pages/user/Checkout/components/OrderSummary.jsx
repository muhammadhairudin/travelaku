import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { createTransaction } from '../../../../store/slices/transactionSlice';
import { Text, Button } from '../../../../components/atoms';

const OrderSummary = ({ 
  items, 
  totalPrice, 
  appliedPromo, 
  selectedPaymentMethod 
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const calculateDiscount = () => {
    if (!appliedPromo) return 0;
    return Math.min(
      appliedPromo.promo_discount_price,
      totalPrice * (appliedPromo.discount_percentage / 100)
    );
  };

  const finalPrice = totalPrice - calculateDiscount();

  const handleCheckout = async () => {
    if (!selectedPaymentMethod) {
      alert('Silakan pilih metode pembayaran');
      return;
    }

    try {
      const cartIds = items.map(item => item.id);
      await dispatch(createTransaction({
        cartIds,
        paymentMethodId: selectedPaymentMethod.id,
        promoCode: appliedPromo?.promo_code
      })).unwrap();
      
      navigate('/profile/transactions');
    } catch (error) {
      alert(error.message || 'Terjadi kesalahan saat checkout');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
      <Text variant="h2" className="text-xl font-bold mb-6">
        Ringkasan Pesanan
      </Text>

      <div className="space-y-4">
        {/* Items */}
        <div className="space-y-2">
          {items.map((item) => (
            <div key={item.id} className="flex justify-between">
              <Text variant="body2" className="text-gray-600">
                {item.activity.title}
              </Text>
              <Text variant="body2">
                {formatPrice(item.activity.price_discount || item.activity.price)}
              </Text>
            </div>
          ))}
        </div>

        {/* Subtotal */}
        <div className="border-t pt-4">
          <div className="flex justify-between">
            <Text variant="body2">Subtotal</Text>
            <Text variant="body2">{formatPrice(totalPrice)}</Text>
          </div>
        </div>

        {/* Discount */}
        {appliedPromo && (
          <div className="flex justify-between text-green-600">
            <Text variant="body2">Diskon</Text>
            <Text variant="body2">-{formatPrice(calculateDiscount())}</Text>
          </div>
        )}

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center">
            <Text variant="label">Total</Text>
            <Text variant="h3" className="text-xl font-bold text-primary">
              {formatPrice(finalPrice)}
            </Text>
          </div>
        </div>

        {/* Checkout Button */}
        <Button
          variant="primary"
          className="w-full mt-6"
          onClick={handleCheckout}
          disabled={!selectedPaymentMethod}
        >
          Bayar Sekarang
        </Button>
      </div>
    </div>
  );
};

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      activity: PropTypes.shape({
        title: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        price_discount: PropTypes.number
      }).isRequired
    })
  ).isRequired,
  totalPrice: PropTypes.number.isRequired,
  appliedPromo: PropTypes.shape({
    promo_code: PropTypes.string.isRequired,
    promo_discount_price: PropTypes.number.isRequired,
    discount_percentage: PropTypes.number.isRequired
  }),
  selectedPaymentMethod: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })
};

export default OrderSummary; 