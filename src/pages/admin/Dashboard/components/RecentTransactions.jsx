import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const RecentTransactions = ({ transactions = [] }) => {
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

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <Text variant="h2" className="text-xl font-bold">
          Transaksi Terbaru
        </Text>
        <Link 
          to="/admin/transactions"
          className="text-primary hover:text-primary/80"
        >
          Lihat Semua
        </Link>
      </div>

      {transactions.length === 0 ? (
        <div className="text-center py-8">
          <Text variant="body2" className="text-gray-500">
            Belum ada transaksi
          </Text>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b">
                <th className="pb-3 font-medium">ID Transaksi</th>
                <th className="pb-3 font-medium">Pelanggan</th>
                <th className="pb-3 font-medium">Total</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Tanggal</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td className="py-4">
                    <Link 
                      to={`/admin/transactions/${transaction.id}`}
                      className="hover:text-primary"
                    >
                      #{transaction.id.slice(0, 8)}
                    </Link>
                  </td>
                  <td className="py-4">{transaction.user.name}</td>
                  <td className="py-4">{formatPrice(transaction.total_price)}</td>
                  <td className="py-4">
                    <span className={`px-2 py-1 rounded-full text-sm ${getStatusColor(transaction.status)}`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4">{formatDate(transaction.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
};

RecentTransactions.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired,
      total_price: PropTypes.number.isRequired,
      status: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired
    })
  )
};

export default RecentTransactions; 