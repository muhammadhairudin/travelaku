import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPromos } from '../../../../store/slices/promoSlice';
import { Text } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const PromoSection = () => {
  const dispatch = useDispatch();
  const { promos, loading } = useSelector(state => state.promo);

  useEffect(() => {
    dispatch(fetchPromos());
  }, [dispatch]);

  if (loading || promos.length === 0) return null;

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <Text variant="h2" className="mb-6 text-2xl font-bold">
          Promo Spesial
        </Text>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {promos.map((promo) => (
            <Card key={promo.id} className="overflow-hidden">
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="object-cover w-full rounded-t-lg aspect-video"
              />
              <div className="p-4">
                <Text variant="label" className="mb-2">
                  {promo.title}
                </Text>
                <Text variant="body2" className="text-gray-600 line-clamp-2">
                  {promo.description}
                </Text>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoSection; 