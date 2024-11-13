import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTransactions } from '../../../store/slices/transactionManagementSlice';
import { Text } from '../../../components/atoms';
import { SearchInput } from '../../../components/molecules';
import TransactionTable from './components/TransactionTable';

const TransactionManagement = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.transactionManagement);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  const filteredTransactions = transactions.filter(transaction => 
    transaction.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.user?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Text variant="h1" className="text-2xl font-bold">
        Manajemen Transaksi
      </Text>

      {/* Search */}
      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari transaksi..."
        />
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-4">
          <Text variant="body1" className="text-red-500">
            {error}
          </Text>
        </div>
      )}

      {/* Transaction Table */}
      <TransactionTable 
        transactions={filteredTransactions}
        loading={loading}
      />
    </div>
  );
};

export default TransactionManagement; 