import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPaymentMethods } from '../../../../store/slices/paymentSlice';
import { Text } from '../../../../components/atoms';

const PaymentMethodSelection = ({ selected, onSelect }) => {
  const dispatch = useDispatch();
  const { paymentMethods, loading } = useSelector(state => state.payment);

  useEffect(() => {
    dispatch(fetchPaymentMethods());
  }, [dispatch]);

  if (loading) {
    return <div>Loading payment methods...</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Text variant="h2" className="text-xl font-bold mb-6">
        Metode Pembayaran
      </Text>

      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <label
            key={method.id}
            className={`
              flex items-center gap-4 p-4 rounded-lg border cursor-pointer
              ${selected?.id === method.id ? 'border-primary bg-primary/5' : 'border-gray-200'}
            `}
          >
            <input
              type="radio"
              name="paymentMethod"
              checked={selected?.id === method.id}
              onChange={() => onSelect(method)}
              className="text-primary focus:ring-primary"
            />
            <div className="flex items-center gap-3">
              <img
                src={method.imageUrl}
                alt={method.name}
                className="h-8 w-auto"
              />
              <Text variant="body1">{method.name}</Text>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

PaymentMethodSelection.propTypes = {
  selected: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }),
  onSelect: PropTypes.func.isRequired
};

export default PaymentMethodSelection; 