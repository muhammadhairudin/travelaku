import PropTypes from 'prop-types';
import { Text, Button } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const CartSummary = ({ totalItems, totalPrice, onCheckout }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <Card className="p-6 sticky top-6">
      <Text variant="h6" className="font-semibold mb-6">
        Ringkasan Pesanan
      </Text>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Text variant="body2">Total Item</Text>
          <Text variant="body2">{totalItems} item</Text>
        </div>

        <div className="flex justify-between">
          <Text variant="body2">Total Harga</Text>
          <Text variant="body1" className="font-semibold">
            {formatPrice(totalPrice)}
          </Text>
        </div>

        <div className="pt-4 border-t">
          <Button
            variant="primary"
            className="w-full"
            onClick={onCheckout}
            disabled={totalItems === 0}
          >
            Lanjut ke Pembayaran
          </Button>
        </div>
      </div>
    </Card>
  );
};

CartSummary.propTypes = {
  totalItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onCheckout: PropTypes.func.isRequired
};

export default CartSummary; 