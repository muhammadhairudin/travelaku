import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteCategory } from '../../../../store/slices/categoryManagementSlice';
import { Text, Button } from '../../../../components/atoms';
import EditCategoryModal from './EditCategoryModal';

const CategoryTable = ({ categories, loading }) => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      try {
        await dispatch(deleteCategory(id)).unwrap();
      } catch (error) {
        alert(error.message || 'Gagal menghapus kategori');
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-gray-500">
          Loading...
        </Text>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-gray-500">
          Tidak ada kategori yang ditemukan
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
              <th className="pb-3 font-medium">Kategori</th>
              <th className="pb-3 font-medium">Total Aktivitas</th>
              <th className="pb-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={category.imageUrl}
                      alt={category.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <Text variant="body1">{category.name}</Text>
                  </div>
                </td>
                <td className="py-4">
                  {category.total_activities || 0} aktivitas
                </td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(category.id)}
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

      <EditCategoryModal
        category={selectedCategory}
        isOpen={!!selectedCategory}
        onClose={() => setSelectedCategory(null)}
      />
    </>
  );
};

CategoryTable.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      total_activities: PropTypes.number
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default CategoryTable; 