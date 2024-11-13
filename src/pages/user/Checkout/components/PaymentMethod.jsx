import PropTypes from 'prop-types';
import { Text, Button } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const PaymentMethod = ({ selectedMethod, onSelect, onConfirm, loading }) => {
  const paymentMethods = [
    {
      id: 'bank_transfer',
      name: 'Transfer Bank',
      description: 'Transfer melalui ATM atau Mobile Banking',
      icon: '🏦',
      banks: [
        { code: 'bca', name: 'BCA', accountNo: '1234567890' },
        { code: 'mandiri', name: 'Mandiri', accountNo: '0987654321' },
        { code: 'bni', name: 'BNI', accountNo: '1122334455' }
      ]
    },
    {
      id: 'ewallet',
      name: 'E-Wallet',
      description: 'Pembayaran melalui dompet digital',
      icon: '📱',
      providers: [
        { code: 'gopay', name: 'GoPay' },
        { code: 'ovo', name: 'OVO' },
        { code: 'dana', name: 'DANA' }
      ]
    },
    {
      id: 'credit_card',
      name: 'Kartu Kredit',
      description: 'Visa, Mastercard, JCB',
      icon: '💳'
    }
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Payment Methods */}
      <div className="lg:col-span-2 space-y-4">
        <Text variant="h2" className="text-xl font-bold mb-6">
          Pilih Metode Pembayaran
        </Text>

        <div className="space-y-4">
          {paymentMethods.map((method) => (
            <Card 
              key={method.id}
              className={`p-4 cursor-pointer transition-colors ${
                selectedMethod === method.id 
                  ? 'ring-2 ring-primary' 
                  : 'hover:bg-gray-50'
              }`}
              onClick={() => onSelect(method.id)}
            >
              <div className="flex items-center gap-4">
                <div className="text-2xl">{method.icon}</div>
                <div className="flex-grow">
                  <Text variant="h6" className="font-semibold">
                    {method.name}
                  </Text>
                  <Text variant="body2" className="text-gray-500">
                    {method.description}
                  </Text>
                </div>
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center">
                  {selectedMethod === method.id && (
                    <div className="w-3 h-3 rounded-full bg-primary" />
                  )}
                </div>
              </div>

              {/* Bank Transfer Details */}
              {selectedMethod === 'bank_transfer' && method.id === 'bank_transfer' && (
                <div className="mt-4 pl-12 space-y-3">
                  {method.banks.map((bank) => (
                    <div key={bank.code} className="flex items-center justify-between">
                      <Text variant="body2">
                        {bank.name}
                      </Text>
                      <Text variant="body2" className="font-mono">
                        {bank.accountNo}
                      </Text>
                    </div>
                  ))}
                </div>
              )}

              {/* E-Wallet Details */}
              {selectedMethod === 'ewallet' && method.id === 'ewallet' && (
                <div className="mt-4 pl-12 space-y-3">
                  {method.providers.map((provider) => (
                    <div key={provider.code} className="flex items-center justify-between">
                      <Text variant="body2">
                        {provider.name}
                      </Text>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Summary & Action */}
      <div>
        <Card className="p-6 sticky top-6">
          <Text variant="h6" className="font-semibold mb-6">
            Konfirmasi Pembayaran
          </Text>

          <div className="space-y-4">
            <Text variant="body2" className="text-gray-500">
              Dengan melanjutkan, Anda setuju dengan syarat dan ketentuan yang berlaku.
            </Text>

            <Button
              variant="primary"
              className="w-full"
              onClick={onConfirm}
              disabled={!selectedMethod || loading}
            >
              {loading ? 'Memproses...' : 'Bayar Sekarang'}
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={() => window.history.back()}
            >
              Kembali
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

PaymentMethod.propTypes = {
  selectedMethod: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default PaymentMethod; 