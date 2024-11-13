import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Text, Button } from '../../../components/atoms';
import { removeFromCart, updateQuantity } from '../../../store/slices/cartSlice';
import CartItem from './components/CartItem';
import CartSummary from './components/CartSummary';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);

  if (!isAuthenticated) {
    navigate('/login', { 
      state: { 
        returnUrl: '/cart',
        message: 'Silakan login terlebih dahulu untuk melihat keranjang' 
      } 
    });
    return null;
  }

  const handleQuantityChange = (activityId, date, quantity) => {
    dispatch(updateQuantity({ activityId, date, quantity }));
  };

  const handleRemoveItem = (activityId, date) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      dispatch(removeFromCart({ activityId, date }));
    }
  };

  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <Text variant="h1" className="text-2xl font-bold mb-8">
        Keranjang Belanja
      </Text>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <Text variant="body1" className="text-gray-500 mb-4">
            Keranjang belanja Anda masih kosong
          </Text>
          <Button
            variant="primary"
            onClick={() => navigate('/activities')}
          >
            Jelajahi Aktivitas
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={`${item.activityId}-${item.date}`}
                item={item}
                onQuantityChange={handleQuantityChange}
                onRemove={handleRemoveItem}
              />
            ))}
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <CartSummary 
              totalItems={items.length}
              totalPrice={totalPrice}
              onCheckout={() => navigate('/checkout')}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 