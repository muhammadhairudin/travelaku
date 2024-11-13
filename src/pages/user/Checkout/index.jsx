import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text } from '../../../components/atoms';
import { createTransaction } from '../../../store/slices/checkoutSlice';
import ReviewOrder from './components/ReviewOrder';
import PaymentMethod from './components/PaymentMethod';
import PaymentConfirmation from './components/PaymentConfirmation';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);
  const { step, loading, error } = useSelector(state => state.checkout);
  const { isAuthenticated } = useSelector(state => state.auth);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          returnUrl: '/checkout',
          message: 'Silakan login terlebih dahulu untuk melanjutkan pembayaran' 
        } 
      });
      return;
    }

    if (items.length === 0) {
      navigate('/cart');
    }
  }, [isAuthenticated, items.length, navigate]);

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const handleCreateTransaction = async () => {
    if (!selectedPayment) return;

    try {
      const transactionData = {
        items: items.map(item => ({
          activityId: item.activityId,
          quantity: item.quantity,
          date: item.date,
          price: item.price,
          totalPrice: item.totalPrice
        })),
        paymentMethod: selectedPayment,
        totalAmount: items.reduce((sum, item) => sum + item.totalPrice, 0)
      };

      await dispatch(createTransaction(transactionData)).unwrap();
    } catch (err) {
      console.error('Transaction Error:', err);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <ReviewOrder items={items} />;
      case 2:
        return (
          <PaymentMethod 
            selectedMethod={selectedPayment}
            onSelect={handlePaymentSelect}
            onConfirm={handleCreateTransaction}
            loading={loading}
          />
        );
      case 3:
        return <PaymentConfirmation />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 1 ? 'bg-primary text-white' : 'bg-gray-200'
          }`}>
            1
          </div>
          <div className={`h-1 w-16 ${step >= 2 ? 'bg-primary' : 'bg-gray-200'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 2 ? 'bg-primary text-white' : 'bg-gray-200'
          }`}>
            2
          </div>
          <div className={`h-1 w-16 ${step >= 3 ? 'bg-primary' : 'bg-gray-200'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
            step >= 3 ? 'bg-primary text-white' : 'bg-gray-200'
          }`}>
            3
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <Text variant="body2" className="text-red-600">
            {error}
          </Text>
        </div>
      )}

      {/* Current Step Content */}
      {renderStep()}
    </div>
  );
};

export default CheckoutPage; 