import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const PromoSection = ({ promos, className = '' }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <section className={className}>
      <div className="flex justify-between items-center mb-6">
        <Text variant="h2" className="text-2xl font-bold">
          Promo Spesial
        </Text>
        <Link 
          to="/promos" 
          className="text-primary hover:text-primary/80"
        >
          Lihat Semua
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {promos.map((promo) => (
          <Link key={promo.id} to={`/promos/${promo.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="w-full h-full object-cover"
                />
                {promo.discount_percentage && (
                  <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">
                    {promo.discount_percentage}% OFF
                  </div>
                )}
              </div>
              <div className="p-4">
                <Text variant="h6" className="mb-2 line-clamp-2">
                  {promo.title}
                </Text>
                <Text variant="caption" className="text-gray-500 mb-2">
                  Berlaku sampai {new Date(promo.end_date).toLocaleDateString()}
                </Text>
                <div className="flex items-center gap-2">
                  {promo.original_price && (
                    <Text variant="caption" className="line-through text-gray-400">
                      {formatPrice(promo.original_price)}
                    </Text>
                  )}
                  <Text variant="body1" className="font-bold text-primary">
                    {formatPrice(promo.promo_price)}
                  </Text>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

PromoSection.propTypes = {
  promos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      discount_percentage: PropTypes.number,
      original_price: PropTypes.number,
      promo_price: PropTypes.number.isRequired,
      end_date: PropTypes.string.isRequired
    })
  ).isRequired,
  className: PropTypes.string
};

export default PromoSection; 