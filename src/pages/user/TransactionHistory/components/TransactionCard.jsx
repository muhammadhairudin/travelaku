import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransactionProof } from '../../../../store/slices/transactionSlice';
import { Text, Button } from '../../../../components/atoms';
import UploadProofModal from './UploadProofModal';

const TransactionCard = ({ transaction }) => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      year: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'failed':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleUploadSuccess = (proofUrl) => {
    dispatch(updateTransactionProof({
      id: transaction.id,
      proofPaymentUrl: proofUrl
    }));
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <Text variant="label" className="text-gray-500">
            {formatDate(transaction.createdAt)}
          </Text>
          <Text variant="body2" className="text-gray-500">
            ID: {transaction.id}
          </Text>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(transaction.status)}`}>
          {transaction.status}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-4 mb-4">
        {transaction.items.map((item) => (
          <div key={item.id} className="flex justify-between">
            <Text variant="body1">{item.activity.title}</Text>
            <Text variant="body1">
              {formatPrice(item.activity.price_discount || item.activity.price)}
            </Text>
          </div>
        ))}
      </div>

      {/* Total */}
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between items-center">
          <Text variant="label">Total Pembayaran</Text>
          <Text variant="h3" className="text-xl font-bold text-primary">
            {formatPrice(transaction.total_price)}
          </Text>
        </div>
      </div>

      {/* Actions */}
      {transaction.status === 'pending' && !transaction.proof_payment_url && (
        <Button
          variant="primary"
          className="w-full"
          onClick={() => setIsModalOpen(true)}
        >
          Upload Bukti Pembayaran
        </Button>
      )}

      {/* Upload Modal */}
      <UploadProofModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUploadSuccess={handleUploadSuccess}
      />
    </div>
  );
};

TransactionCard.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    total_price: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
    proof_payment_url: PropTypes.string,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        activity: PropTypes.shape({
          title: PropTypes.string.isRequired,
          price: PropTypes.number.isRequired,
          price_discount: PropTypes.number
        }).isRequired
      })
    ).isRequired
  }).isRequired
};

export default TransactionCard; 