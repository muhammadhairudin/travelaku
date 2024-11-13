import PropTypes from 'prop-types';
import { Text } from '../../../../components/atoms';

const TransactionDetailModal = ({ transaction, isOpen, onClose }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isOpen || !transaction) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <Text variant="h2" className="text-xl font-bold">
            Detail Transaksi
          </Text>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Transaction Info */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <Text variant="label" className="text-gray-500">ID Transaksi</Text>
            <Text variant="body1" className="font-mono">
              #{transaction.id}
            </Text>
          </div>
          <div>
            <Text variant="label" className="text-gray-500">Tanggal</Text>
            <Text variant="body1">{formatDate(transaction.createdAt)}</Text>
          </div>
          <div>
            <Text variant="label" className="text-gray-500">Status</Text>
            <Text variant="body1" className="capitalize">{transaction.status}</Text>
          </div>
          <div>
            <Text variant="label" className="text-gray-500">Metode Pembayaran</Text>
            <Text variant="body1">{transaction.payment_method}</Text>
          </div>
        </div>

        {/* Customer Info */}
        <div className="mb-6">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Informasi Pelanggan
          </Text>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Text variant="label" className="text-gray-500">Nama</Text>
              <Text variant="body1">{transaction.user.name}</Text>
            </div>
            <div>
              <Text variant="label" className="text-gray-500">Email</Text>
              <Text variant="body1">{transaction.user.email}</Text>
            </div>
            <div>
              <Text variant="label" className="text-gray-500">Telepon</Text>
              <Text variant="body1">{transaction.user.phoneNumber || '-'}</Text>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="mb-6">
          <Text variant="h3" className="text-lg font-semibold mb-3">
            Item Pesanan
          </Text>
          <div className="space-y-4">
            {transaction.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <img
                    src={item.activity.imageUrls[0]}
                    alt={item.activity.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div>
                    <Text variant="body1">{item.activity.title}</Text>
                    <Text variant="caption" className="text-gray-500">
                      {item.activity.city}, {item.activity.province}
                    </Text>
                  </div>
                </div>
                <Text variant="body1">
                  {formatPrice(item.activity.price_discount || item.activity.price)}
                </Text>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Info */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-2">
            <Text variant="body1">Subtotal</Text>
            <Text variant="body1">{formatPrice(transaction.total_price)}</Text>
          </div>
          {transaction.promo_code && (
            <div className="flex justify-between items-center mb-2 text-green-600">
              <Text variant="body1">Diskon ({transaction.promo_code})</Text>
              <Text variant="body1">-{formatPrice(transaction.discount_amount)}</Text>
            </div>
          )}
          <div className="flex justify-between items-center font-bold">
            <Text variant="h3">Total</Text>
            <Text variant="h3" className="text-primary">
              {formatPrice(transaction.final_price)}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

TransactionDetailModal.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    payment_method: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    total_price: PropTypes.number.isRequired,
    final_price: PropTypes.number.isRequired,
    discount_amount: PropTypes.number,
    promo_code: PropTypes.string,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string
    }).isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        activity: PropTypes.shape({
          id: PropTypes.string.isRequired,
          title: PropTypes.string.isRequired,
          imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
          price: PropTypes.number.isRequired,
          price_discount: PropTypes.number,
          city: PropTypes.string.isRequired,
          province: PropTypes.string.isRequired
        }).isRequired
      })
    ).isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default TransactionDetailModal; 