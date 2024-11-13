import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text, Button } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const FeaturedPromos = ({ promos }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <div>
            <Text variant="h2" className="text-3xl font-bold mb-2">
              Promo Spesial
            </Text>
            <Text variant="body1" className="text-gray-500">
              Dapatkan penawaran terbaik untuk liburan Anda
            </Text>
          </div>
          <Link to="/promos">
            <Button variant="outline">
              Lihat Semua
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {promos.map((promo) => (
            <Link key={promo.id} to={`/promos/${promo.id}`}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] relative overflow-hidden">
                  <img
                    src={promo.imageUrl}
                    alt={promo.title}
                    className="w-full h-full object-cover"
                  />
                  {promo.discount_percentage && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full">
                      {promo.discount_percentage}% OFF
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <Text variant="h6" className="font-semibold mb-2 line-clamp-2">
                    {promo.title}
                  </Text>
                  <Text variant="caption" className="text-gray-500 mb-4">
                    Berlaku sampai {new Date(promo.end_date).toLocaleDateString()}
                  </Text>
                  <div className="flex items-center gap-2">
                    {promo.original_price && (
                      <Text variant="caption" className="line-through text-gray-400">
                        {formatPrice(promo.original_price)}
                      </Text>
                    )}
                    <Text variant="h6" className="font-bold text-primary">
                      {formatPrice(promo.promo_price)}
                    </Text>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

FeaturedPromos.propTypes = {
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
  ).isRequired
};

export default FeaturedPromos; 