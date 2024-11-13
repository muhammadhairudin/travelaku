import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPromos } from '../../../store/slices/promoSlice';
import { Text } from '../../../components/atoms';
import { Card } from '../../../components/molecules';

const PromoPage = () => {
  const dispatch = useDispatch();
  const { promos, loading, error } = useSelector(state => state.promo);

  useEffect(() => {
    dispatch(fetchPromos());
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
        Promo Spesial
      </Text>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {promos.map((promo) => (
          <Card key={promo.id} className="h-full transition-shadow hover:shadow-lg">
            <div className="overflow-hidden relative aspect-video">
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="object-cover w-full h-full"
              />
              {promo.discount_percentage && (
                <div className="absolute top-4 right-4 px-3 py-1 text-white bg-red-500 rounded-full">
                  {promo.discount_percentage}% OFF
                </div>
              )}
            </div>
            <div className="p-6">
              <Text variant="h6" className="mb-2 font-semibold">
                {promo.title}
              </Text>
              <Text variant="body2" className="mb-4 text-gray-600">
                {promo.description}
              </Text>
              <Text variant="caption" className="block mb-4 text-gray-500">
                Berlaku sampai {new Date(promo.end_date).toLocaleDateString()}
              </Text>
              <div className="flex gap-2 items-center">
                {promo.original_price && (
                  <Text variant="caption" className="text-gray-400 line-through">
                    {formatPrice(promo.original_price)}
                  </Text>
                )}
                <Text variant="h6" className="font-bold text-primary">
                  {formatPrice(promo.promo_price)}
                </Text>
              </div>
            </div>
          </Card>
        ))}

        {promos.length === 0 && (
          <div className="col-span-full py-12 text-center">
            <Text variant="body1" className="text-gray-500">
              Tidak ada promo yang tersedia saat ini
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoPage; 