import { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { createPromo } from '../../../../store/slices/promoManagementSlice';
import { Text, Input, Button } from '../../../../components/atoms';

const AddPromoModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    code: '',
    imageUrl: '',
    discount_percentage: '',
    promo_discount_price: '',
    isActive: true
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) return 'Judul promo wajib diisi';
    if (!formData.code.trim()) return 'Kode promo wajib diisi';
    if (!formData.imageUrl.trim()) return 'URL gambar wajib diisi';
    if (!formData.discount_percentage && !formData.promo_discount_price) {
      return 'Harap isi salah satu dari persentase diskon atau nominal diskon';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        discount_percentage: formData.discount_percentage ? Number(formData.discount_percentage) : undefined,
        promo_discount_price: formData.promo_discount_price ? Number(formData.promo_discount_price) : undefined
      };

      await dispatch(createPromo(payload)).unwrap();
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal menambahkan promo');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center bg-black/50">
      <div className="p-6 w-full max-w-md bg-white rounded-lg">
        <Text variant="h2" className="mb-6 text-xl font-bold">
          Tambah Promo Baru
        </Text>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Judul Promo"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <div>
            <Text variant="label" className="mb-2">Deskripsi</Text>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
              className="p-2 w-full rounded-lg border resize-none"
              required
            />
          </div>

          <Input
            label="Kode Promo"
            name="code"
            value={formData.code}
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

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Persentase Diskon (%)"
              type="number"
              name="discount_percentage"
              value={formData.discount_percentage}
              onChange={handleChange}
              min="0"
              max="100"
            />

            <Input
              label="Nominal Diskon"
              type="number"
              name="promo_discount_price"
              value={formData.promo_discount_price}
              onChange={handleChange}
              min="0"
            />
          </div>

          <div className="flex gap-2 items-center">
            <input
              type="checkbox"
              name="isActive"
              id="isActive"
              checked={formData.isActive}
              onChange={handleChange}
              className="rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="isActive" className="text-sm text-gray-700">
              Promo Aktif
            </label>
          </div>

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

AddPromoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default AddPromoModal; 