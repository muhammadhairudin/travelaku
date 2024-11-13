import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Text, Button } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';
import { setStep } from '../../../../store/slices/checkoutSlice';

const ReviewOrder = ({ items }) => {
  const dispatch = useDispatch();

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Order Items */}
      <div className="lg:col-span-2 space-y-4">
        <Text variant="h2" className="text-xl font-bold mb-6">
          Review Pesanan
        </Text>

        {items.map((item) => (
          <Card key={`${item.activityId}-${item.date}`} className="p-4">
            <div className="flex gap-4">
              {/* Activity Image */}
              <div className="w-32 h-24 flex-shrink-0">
                <img
                  src={item.activity.imageUrls[0]}
                  alt={item.activity.title}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-grow">
                <Link 
                  to={`/activities/${item.activityId}`}
                  className="hover:text-primary"
                >
                  <Text variant="h6" className="font-semibold mb-1">
                    {item.activity.title}
                  </Text>
                </Link>

                <Text variant="caption" className="text-gray-500 mb-2">
                  {item.activity.city}, {item.activity.province}
                </Text>

                <Text variant="body2" className="mb-2">
                  Tanggal: {formatDate(item.date)}
                </Text>

                <div className="flex justify-between items-center">
                  <Text variant="body2" className="text-gray-500">
                    {formatPrice(item.price)} × {item.quantity} orang
                  </Text>
                  <Text variant="body1" className="font-semibold text-primary">
                    {formatPrice(item.totalPrice)}
                  </Text>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Order Summary */}
      <div>
        <Card className="p-6 sticky top-6">
          <Text variant="h6" className="font-semibold mb-6">
            Ringkasan Pesanan
          </Text>

          <div className="space-y-4">
            <div className="flex justify-between">
              <Text variant="body2">Total Item</Text>
              <Text variant="body2">{items.length} item</Text>
            </div>

            <div className="flex justify-between">
              <Text variant="body2">Total Peserta</Text>
              <Text variant="body2">
                {items.reduce((sum, item) => sum + item.quantity, 0)} orang
              </Text>
            </div>

            <div className="flex justify-between border-t pt-4">
              <Text variant="body1" className="font-semibold">
                Total Pembayaran
              </Text>
              <Text variant="h6" className="font-bold text-primary">
                {formatPrice(totalPrice)}
              </Text>
            </div>

            <Button
              variant="primary"
              className="w-full"
              onClick={() => dispatch(setStep(2))}
            >
              Pilih Metode Pembayaran
            </Button>

            <Link to="/cart">
              <Button variant="outline" className="w-full">
                Kembali ke Keranjang
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};

ReviewOrder.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      activityId: PropTypes.string.isRequired,
      activity: PropTypes.shape({
        title: PropTypes.string.isRequired,
        imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
        city: PropTypes.string.isRequired,
        province: PropTypes.string.isRequired
      }).isRequired,
      date: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      totalPrice: PropTypes.number.isRequired
    })
  ).isRequired
};

export default ReviewOrder; 