import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updatePromo } from '../../../../store/slices/promoManagementSlice';
import { Text, Input, Button } from '../../../../components/atoms';

const EditPromoModal = ({ promo, isOpen, onClose }) => {
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

  useEffect(() => {
    if (isOpen && promo) {
      setFormData({
        title: promo.title,
        description: promo.description,
        code: promo.code,
        imageUrl: promo.imageUrl,
        discount_percentage: promo.discount_percentage?.toString() || '',
        promo_discount_price: promo.promo_discount_price?.toString() || '',
        isActive: promo.isActive
      });
    }
  }, [isOpen, promo]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        discount_percentage: formData.discount_percentage ? Number(formData.discount_percentage) : undefined,
        promo_discount_price: formData.promo_discount_price ? Number(formData.promo_discount_price) : undefined
      };

      await dispatch(updatePromo({
        id: promo.id,
        data: payload
      })).unwrap();
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal memperbarui promo');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !promo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <Text variant="h2" className="text-xl font-bold mb-6">
          Edit Promo
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
              className="w-full p-2 border rounded-lg resize-none"
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

          <div className="flex items-center gap-2">
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

EditPromoModal.propTypes = {
  promo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    code: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    discount_percentage: PropTypes.number,
    promo_discount_price: PropTypes.number,
    isActive: PropTypes.bool.isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditPromoModal; 