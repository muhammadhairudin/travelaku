import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../../store/slices/transactionSlice';
import { Text } from '../../../components/atoms';
import TransactionCard from './components/TransactionCard';

const TransactionHistory = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.transaction);

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-red-500">
          {error}
        </Text>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-gray-500">
          Belum ada transaksi
        </Text>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Text variant="h1" className="text-2xl font-bold mb-8">
        Riwayat Transaksi
      </Text>

      <div className="space-y-6">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory; 