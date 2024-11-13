import PropTypes from 'prop-types';
import { Text } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const ActivityInfo = ({ activity }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card className="p-6">
        <Text variant="h1" className="text-2xl font-bold mb-2">
          {activity.title}
        </Text>
        
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <span className="text-yellow-500">★</span>
            <Text variant="body2">
              {activity.rating} ({activity.total_reviews} ulasan)
            </Text>
          </div>
          <Text variant="body2" className="text-gray-500">
            {activity.city}, {activity.province}
          </Text>
        </div>

        <div className="flex items-baseline gap-2 mb-6">
          {activity.price_discount && (
            <Text variant="body1" className="line-through text-gray-400">
              {formatPrice(activity.price)}
            </Text>
          )}
          <Text variant="h3" className="text-2xl font-bold text-primary">
            {formatPrice(activity.price_discount || activity.price)}
          </Text>
          <Text variant="body2" className="text-gray-500">
            /orang
          </Text>
        </div>

        <div className="prose max-w-none">
          <Text variant="body1">
            {activity.description}
          </Text>
        </div>
      </Card>

      {/* Facilities */}
      <Card className="p-6">
        <Text variant="h6" className="font-semibold mb-4">
          Fasilitas
        </Text>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {activity.facilities?.split(',').map((facility, index) => (
            <div key={index} className="flex items-center gap-2">
              <span className="text-primary">✓</span>
              <Text variant="body2">{facility.trim()}</Text>
            </div>
          ))}
        </div>
      </Card>

      {/* Location */}
      <Card className="p-6">
        <Text variant="h6" className="font-semibold mb-4">
          Lokasi
        </Text>
        <Text variant="body2" className="mb-4">
          {activity.address}
        </Text>
        {activity.location_maps && (
          <div 
            className="w-full h-[300px] rounded-lg overflow-hidden"
            dangerouslySetInnerHTML={{ __html: activity.location_maps }}
          />
        )}
      </Card>

      {/* Terms & Conditions */}
      <Card className="p-6">
        <Text variant="h6" className="font-semibold mb-4">
          Syarat & Ketentuan
        </Text>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <Text variant="body2">
              Reservasi harus dilakukan minimal 1 hari sebelum kegiatan
            </Text>
          </li>
          <li>
            <Text variant="body2">
              Pembayaran harus dilakukan dalam waktu 24 jam setelah pemesanan
            </Text>
          </li>
          <li>
            <Text variant="body2">
              Pembatalan dapat dilakukan maksimal 3 hari sebelum kegiatan
            </Text>
          </li>
        </ul>
      </Card>
    </div>
  );
};

ActivityInfo.propTypes = {
  activity: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    price_discount: PropTypes.number,
    rating: PropTypes.number.isRequired,
    total_reviews: PropTypes.number.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    facilities: PropTypes.string,
    location_maps: PropTypes.string
  }).isRequired
};

export default ActivityInfo; 