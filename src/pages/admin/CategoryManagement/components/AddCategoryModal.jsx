import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createCategory } from '../../../../store/slices/categoryManagementSlice';
import { Text, Input, Button } from '../../../../components/atoms';

const AddCategoryModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    imageUrl: ''
  });

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
      await dispatch(createCategory(formData)).unwrap();
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal menambahkan kategori');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <Text variant="h2" className="text-xl font-bold mb-6">
          Tambah Kategori Baru
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

AddCategoryModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddCategoryModal; 