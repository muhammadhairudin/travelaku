import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserTransactions } from '../../../store/slices/profileSlice';
import { Text } from '../../../components/atoms';
import { Card } from '../../../components/molecules';

const TransactionsPage = () => {
  const dispatch = useDispatch();
  const { transactions, loading, error } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchUserTransactions());
  }, [dispatch]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 animate-spin border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <Text variant="body1" className="text-center text-red-500">
          {error}
        </Text>
      </div>
    );
  }

  return (
    <div className="container px-4 py-12 mx-auto">
      <Text variant="h1" className="mb-8 text-3xl font-bold">
        Riwayat Transaksi
      </Text>

      <div className="space-y-6">
        {transactions.map((transaction) => (
          <Card key={transaction.id} className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <Text variant="h6" className="font-semibold">
                  #{transaction.id.slice(0, 8)}
                </Text>
                <Text variant="caption" className="text-gray-500">
                  {new Date(transaction.createdAt).toLocaleDateString()}
                </Text>
              </div>
              <div className={`px-3 py-1 rounded-full text-sm ${
                transaction.status === 'success' ? 'bg-green-100 text-green-800' :
                transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {transaction.status}
              </div>
            </div>

            {transaction.items.map((item) => (
              <div key={item.id} className="flex gap-4 items-center py-4 border-t">
                <img
                  src={item.activity.imageUrls[0]}
                  alt={item.activity.title}
                  className="object-cover w-20 h-20 rounded-lg"
                />
                <div className="flex-grow">
                  <Text variant="body1" className="font-medium">
                    {item.activity.title}
                  </Text>
                  <Text variant="caption" className="text-gray-500">
                    {item.quantity} x {formatPrice(item.price)}
                  </Text>
                </div>
                <Text variant="body1" className="font-semibold">
                  {formatPrice(item.totalPrice)}
                </Text>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t">
              <Text variant="body2" className="text-gray-500">
                Total Pembayaran
              </Text>
              <Text variant="h6" className="font-bold text-primary">
                {formatPrice(transaction.totalAmount)}
              </Text>
            </div>
          </Card>
        ))}

        {transactions.length === 0 && (
          <div className="py-12 text-center">
            <Text variant="body1" className="text-gray-500">
              Belum ada transaksi
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionsPage; 