import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Text, Input, Button } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const BookingForm = ({ activity }) => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector(state => state.auth);
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(10, value));
    setQuantity(newQuantity);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleBooking = () => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          returnUrl: `/activities/${activity.id}`,
          message: 'Silakan login terlebih dahulu untuk melakukan pemesanan' 
        } 
      });
      return;
    }

    // Tambahkan ke cart
    const bookingData = {
      activityId: activity.id,
      quantity,
      date,
      price: activity.price_discount || activity.price,
      totalPrice: (activity.price_discount || activity.price) * quantity
    };

    console.log('Booking Data:', bookingData);
    navigate('/cart');
  };

  // Hitung minimal tanggal besok
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Hitung maksimal tanggal (3 bulan dari sekarang)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  const price = activity.price_discount || activity.price;
  const totalPrice = price * quantity;

  return (
    <Card className="p-6 sticky top-6">
      <div className="space-y-6">
        {/* Price Section */}
        <div>
          <div className="flex items-baseline gap-2">
            {activity.price_discount && (
              <Text variant="body2" className="line-through text-gray-400">
                {formatPrice(activity.price)}
              </Text>
            )}
            <Text variant="h3" className="text-2xl font-bold text-primary">
              {formatPrice(price)}
            </Text>
            <Text variant="body2" className="text-gray-500">
              /orang
            </Text>
          </div>
          {activity.price_discount && (
            <Text variant="caption" className="text-green-600">
              Hemat {Math.round((activity.price - activity.price_discount) / activity.price * 100)}%
            </Text>
          )}
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div>
            <Text variant="label" className="mb-2">Tanggal Aktivitas</Text>
            <Input
              type="date"
              value={date}
              onChange={handleDateChange}
              min={minDate}
              max={maxDateStr}
              required
            />
          </div>

          <div>
            <Text variant="label" className="mb-2">Jumlah Peserta</Text>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity - 1)}
                disabled={quantity <= 1}
              >
                -
              </Button>
              <Text variant="body1">{quantity}</Text>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleQuantityChange(quantity + 1)}
                disabled={quantity >= 10}
              >
                +
              </Button>
            </div>
          </div>
        </div>

        {/* Total */}
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <Text variant="body1">Total</Text>
            <Text variant="h4" className="font-bold">
              {formatPrice(totalPrice)}
            </Text>
          </div>

          <Button
            variant="primary"
            className="w-full"
            onClick={handleBooking}
            disabled={!date}
          >
            Pesan Sekarang
          </Button>
        </div>
      </div>
    </Card>
  );
};

BookingForm.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    price_discount: PropTypes.number
  }).isRequired
};

export default BookingForm; 