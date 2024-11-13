import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Text, Button } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';
import { clearCart } from '../../../../store/slices/cartSlice';

const PaymentConfirmation = ({ transaction }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleFinish = () => {
    dispatch(clearCart());
    navigate('/profile/transactions');
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Berhasil disalin!');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="p-6 space-y-6">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl text-green-500">✓</span>
          </div>
          <Text variant="h2" className="text-xl font-bold mb-2">
            Pembayaran Berhasil Dibuat
          </Text>
          <Text variant="body2" className="text-gray-500">
            Silakan lakukan pembayaran sesuai metode yang dipilih
          </Text>
        </div>

        {/* Transaction Details */}
        <div className="border-t border-b py-4 space-y-4">
          <div>
            <Text variant="label">ID Transaksi</Text>
            <div className="flex items-center gap-2">
              <Text variant="body1" className="font-mono">
                {transaction.id}
              </Text>
              <button
                onClick={() => copyToClipboard(transaction.id)}
                className="text-primary text-sm hover:text-primary/80"
              >
                Salin
              </button>
            </div>
          </div>

          <div>
            <Text variant="label">Total Pembayaran</Text>
            <Text variant="h3" className="text-2xl font-bold text-primary">
              {formatPrice(transaction.totalAmount)}
            </Text>
          </div>

          {/* Bank Transfer Instructions */}
          {transaction.paymentMethod === 'bank_transfer' && (
            <div className="space-y-4">
              <Text variant="label">Instruksi Pembayaran</Text>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <div>
                  <Text variant="body2" className="font-medium">
                    Transfer ke rekening berikut:
                  </Text>
                  <div className="flex items-center justify-between mt-2">
                    <Text variant="body1">Bank BCA</Text>
                    <div className="flex items-center gap-2">
                      <Text variant="body1" className="font-mono">
                        1234567890
                      </Text>
                      <button
                        onClick={() => copyToClipboard('1234567890')}
                        className="text-primary text-sm hover:text-primary/80"
                      >
                        Salin
                      </button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Text variant="body2" className="font-medium">
                    Langkah-langkah:
                  </Text>
                  <ol className="list-decimal list-inside space-y-1">
                    <li>Transfer sesuai nominal yang tertera</li>
                    <li>Simpan bukti pembayaran</li>
                    <li>Pembayaran akan diverifikasi dalam 1x24 jam</li>
                    <li>Tiket akan dikirim ke email Anda</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* E-Wallet Instructions */}
          {transaction.paymentMethod === 'ewallet' && (
            <div className="space-y-4">
              <Text variant="label">Instruksi Pembayaran</Text>
              <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                <Text variant="body2">
                  Silakan buka aplikasi e-wallet Anda dan scan QR Code berikut:
                </Text>
                <div className="w-48 h-48 bg-gray-200 mx-auto flex items-center justify-center">
                  [QR Code Placeholder]
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => navigate('/profile/transactions')}
          >
            Lihat Transaksi
          </Button>
          <Button
            variant="primary"
            className="flex-1"
            onClick={handleFinish}
          >
            Selesai
          </Button>
        </div>
      </Card>
    </div>
  );
};

PaymentConfirmation.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    totalAmount: PropTypes.number.isRequired,
    paymentMethod: PropTypes.string.isRequired
  }).isRequired
};

export default PaymentConfirmation; 