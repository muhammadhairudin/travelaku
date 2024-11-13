import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTransactionStatus } from '../../../../store/slices/transactionManagementSlice';
import { Text, Button } from '../../../../components/atoms';
import TransactionDetailModal from './TransactionDetailModal';

const TransactionTable = ({ transactions, loading }) => {
  const dispatch = useDispatch();
  const [selectedTransaction, setSelectedTransaction] = useState(null);

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

  const handleUpdateStatus = async (id, status) => {
    try {
      await dispatch(updateTransactionStatus({ id, status })).unwrap();
    } catch (error) {
      alert(error.message || 'Gagal memperbarui status transaksi');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-gray-500">
          Tidak ada transaksi yang ditemukan
        </Text>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3 font-medium">ID Transaksi</th>
              <th className="pb-3 font-medium">Pelanggan</th>
              <th className="pb-3 font-medium">Total</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Tanggal</th>
              <th className="pb-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="py-4">
                  <Text variant="body2" className="font-mono">
                    #{transaction.id.slice(0, 8)}
                  </Text>
                </td>
                <td className="py-4">
                  <Text variant="body1">{transaction.user.name}</Text>
                  <Text variant="caption" className="text-gray-500">
                    {transaction.user.email}
                  </Text>
                </td>
                <td className="py-4">
                  {formatPrice(transaction.total_price)}
                </td>
                <td className="py-4">
                  <select
                    value={transaction.status}
                    onChange={(e) => handleUpdateStatus(transaction.id, e.target.value)}
                    className={`px-2 py-1 rounded-full text-sm ${getStatusColor(transaction.status)}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                  </select>
                </td>
                <td className="py-4">
                  {formatDate(transaction.createdAt)}
                </td>
                <td className="py-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    Detail
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      <TransactionDetailModal
        transaction={selectedTransaction}
        isOpen={!!selectedTransaction}
        onClose={() => setSelectedTransaction(null)}
      />
    </>
  );
};

TransactionTable.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired
      }).isRequired,
      total_price: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default TransactionTable; 