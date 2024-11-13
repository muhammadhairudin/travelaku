import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteActivity } from '../../../../store/slices/activityManagementSlice';
import { Text, Button } from '../../../../components/atoms';
import EditActivityModal from './EditActivityModal';

const ActivityTable = ({ activities, loading }) => {
  const dispatch = useDispatch();
  const [selectedActivity, setSelectedActivity] = useState(null);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR'
    }).format(price);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus aktivitas ini?')) {
      try {
        await dispatch(deleteActivity(id)).unwrap();
      } catch (error) {
        alert(error.message || 'Gagal menghapus aktivitas');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-gray-500">
          Tidak ada aktivitas yang ditemukan
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
              <th className="pb-3 font-medium">Aktivitas</th>
              <th className="pb-3 font-medium">Kategori</th>
              <th className="pb-3 font-medium">Harga</th>
              <th className="pb-3 font-medium">Lokasi</th>
              <th className="pb-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={activity.imageUrls[0]}
                      alt={activity.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <Text variant="body1">{activity.title}</Text>
                      <Text variant="caption" className="text-gray-500 line-clamp-1">
                        {activity.description}
                      </Text>
                    </div>
                  </div>
                </td>
                <td className="py-4">
                  {activity.category?.name || '-'}
                </td>
                <td className="py-4">
                  {activity.price_discount ? (
                    <div>
                      <Text variant="body2" className="line-through text-gray-400">
                        {formatPrice(activity.price)}
                      </Text>
                      <Text variant="body1" className="text-primary">
                        {formatPrice(activity.price_discount)}
                      </Text>
                    </div>
                  ) : (
                    formatPrice(activity.price)
                  )}
                </td>
                <td className="py-4">
                  <Text variant="body2">
                    {activity.city}, {activity.province}
                  </Text>
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedActivity(activity)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(activity.id)}
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

      <EditActivityModal
        activity={selectedActivity}
        isOpen={!!selectedActivity}
        onClose={() => setSelectedActivity(null)}
      />
    </>
  );
};

ActivityTable.propTypes = {
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
      price: PropTypes.number.isRequired,
      price_discount: PropTypes.number,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired
      }),
      city: PropTypes.string.isRequired,
      province: PropTypes.string.isRequired
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default ActivityTable; 