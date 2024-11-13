import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateCategory } from '../../../../store/slices/categoryManagementSlice';
import { Text, Input, Button } from '../../../../components/atoms';

const EditCategoryModal = ({ category, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: ''
  });

  useEffect(() => {
    if (isOpen && category) {
      setFormData({
        name: category.name,
        imageUrl: category.imageUrl
      });
    }
  }, [isOpen, category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await dispatch(updateCategory({
        id: category.id,
        data: formData
      })).unwrap();
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal memperbarui kategori');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <Text variant="h2" className="text-xl font-bold mb-6">
          Edit Kategori
        </Text>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nama Kategori"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="URL Gambar"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            required
          />

          {error && (
            <Text variant="body2" className="text-red-500">
              {error}
            </Text>
          )}

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              type="button"
            >
              Batal
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditCategoryModal.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditCategoryModal; 