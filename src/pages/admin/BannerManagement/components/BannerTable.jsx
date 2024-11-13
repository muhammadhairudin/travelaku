import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteBanner } from '../../../../store/slices/bannerManagementSlice';
import { Text, Button } from '../../../../components/atoms';
import EditBannerModal from './EditBannerModal';

const BannerTable = ({ banners, loading }) => {
  const dispatch = useDispatch();
  const [selectedBanner, setSelectedBanner] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus banner ini?')) {
      try {
        await dispatch(deleteBanner(id)).unwrap();
      } catch (error) {
        alert(error.message || 'Gagal menghapus banner');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (banners.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-gray-500">
          Tidak ada banner yang ditemukan
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
              <th className="pb-3 font-medium">Banner</th>
              <th className="pb-3 font-medium">Nama</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {banners.map((banner) => (
              <tr key={banner.id}>
                <td className="py-4">
                  <img
                    src={banner.imageUrl}
                    alt={banner.name}
                    className="w-32 h-20 object-cover rounded-lg"
                  />
                </td>
                <td className="py-4">
                  <Text variant="body1">{banner.name}</Text>
                </td>
                <td className="py-4">
                  <span className={`
                    px-2 py-1 rounded-full text-sm
                    ${banner.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                  `}>
                    {banner.isActive ? 'Aktif' : 'Nonaktif'}
                  </span>
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedBanner(banner)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(banner.id)}
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
      <EditBannerModal
        banner={selectedBanner}
        isOpen={!!selectedBanner}
        onClose={() => setSelectedBanner(null)}
      />
    </>
  );
};

BannerTable.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default BannerTable; 