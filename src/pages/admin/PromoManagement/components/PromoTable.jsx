import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deletePromo } from '../../../../store/slices/promoManagementSlice';
import { Text, Button } from '../../../../components/atoms';
import EditPromoModal from './EditPromoModal';

const PromoTable = ({ promos, loading }) => {
  const dispatch = useDispatch();
  const [selectedPromo, setSelectedPromo] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus promo ini?')) {
      try {
        await dispatch(deletePromo(id)).unwrap();
      } catch (error) {
        alert(error.message || 'Gagal menghapus promo');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (promos.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-gray-500">
          Tidak ada promo yang ditemukan
        </Text>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3 font-medium">Promo</th>
              <th className="pb-3 font-medium">Kode</th>
              <th className="pb-3 font-medium">Diskon</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {promos.map((promo) => (
              <tr key={promo.id}>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={promo.imageUrl}
                      alt={promo.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <Text variant="body1">{promo.title}</Text>
                      <Text variant="caption" className="text-gray-500">
                        {promo.description}
                      </Text>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  <span className="px-2 py-1 bg-gray-100 rounded font-mono text-sm">
                    {promo.code}
                  </span>
                </td>
                <td className="py-4">
                  {promo.discount_percentage ? (
                    <Text variant="body2">{promo.discount_percentage}%</Text>
                  ) : (
                    <Text variant="body2">{formatPrice(promo.promo_discount_price)}</Text>
                  )}
                </td>
                <td className="py-4">
                  <span className={`
                    px-2 py-1 rounded-full text-sm
                    ${promo.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  `}>
                    {promo.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPromo(promo)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(promo.id)}
                    >
                      Hapus
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <EditPromoModal
        promo={selectedPromo}
        isOpen={!!selectedPromo}
        onClose={() => setSelectedPromo(null)}
      />
    </>
  );
};

PromoTable.propTypes = {
  promos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      discount_percentage: PropTypes.number,
      promo_discount_price: PropTypes.number,
      isActive: PropTypes.bool.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default PromoTable; 