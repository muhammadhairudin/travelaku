import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { updateActivity } from '../../../../store/slices/activityManagementSlice';
import { fetchCategories } from '../../../../store/slices/categorySlice';
import { Text, Input, Button } from '../../../../components/atoms';

const EditActivityModal = ({ activity, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    price: '',
    price_discount: '',
    facilities: '',
    address: '',
    province: '',
    city: '',
    imageUrls: [''],
    location_maps: ''
  });

  useEffect(() => {
    if (isOpen && activity) {
      setFormData({
        title: activity.title,
        description: activity.description,
        categoryId: activity.categoryId,
        price: activity.price.toString(),
        price_discount: activity.price_discount?.toString() || '',
        facilities: activity.facilities,
        address: activity.address,
        province: activity.province,
        city: activity.city,
        imageUrls: activity.imageUrls,
        location_maps: activity.location_maps
      });
    }
  }, [isOpen, activity]);

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [isOpen, categories.length, dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...formData.imageUrls];
    newImageUrls[index] = value;
    setFormData(prev => ({
      ...prev,
      imageUrls: newImageUrls
    }));
  };

  const addImageUrl = () => {
    setFormData(prev => ({
      ...prev,
      imageUrls: [...prev.imageUrls, '']
    }));
  };

  const removeImageUrl = (index) => {
    setFormData(prev => ({
      ...prev,
      imageUrls: prev.imageUrls.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        price_discount: formData.price_discount ? Number(formData.price_discount) : undefined,
        imageUrls: formData.imageUrls.filter(url => url.trim())
      };

      await dispatch(updateActivity({
        id: activity.id,
        data: payload
      })).unwrap();
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal memperbarui aktivitas');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <Text variant="h2" className="text-xl font-bold mb-6">
          Edit Aktivitas
        </Text>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Form fields identical to AddActivityModal */}
          <Input
            label="Judul Aktivitas"
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
              rows={4}
              className="w-full p-2 border rounded-lg resize-none"
              required
            />
          </div>

          <div>
            <Text variant="label" className="mb-2">Kategori</Text>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg"
              required
            >
              <option value="">Pilih Kategori</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Harga"
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />

            <Input
              label="Harga Diskon (Opsional)"
              type="number"
              name="price_discount"
              value={formData.price_discount}
              onChange={handleChange}
            />
          </div>

          <div>
            <Text variant="label" className="mb-2">Fasilitas</Text>
            <textarea
              name="facilities"
              value={formData.facilities}
              onChange={handleChange}
              rows={4}
              className="w-full p-2 border rounded-lg resize-none"
              required
            />
          </div>

          <Input
            label="Alamat"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Provinsi"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
            />

            <Input
              label="Kota"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <Text variant="label" className="mb-2">URL Gambar</Text>
            {formData.imageUrls.map((url, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <Input
                  value={url}
                  onChange={(e) => handleImageUrlChange(index, e.target.value)}
                  placeholder={`URL Gambar ${index + 1}`}
                  required
                />
                {index > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => removeImageUrl(index)}
                  >
                    Hapus
                  </Button>
                )}
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              onClick={addImageUrl}
              className="mt-2"
            >
              Tambah Gambar
            </Button>
          </div>

          <Input
            label="Embed Maps"
            name="location_maps"
            value={formData.location_maps}
            onChange={handleChange}
            placeholder="<iframe>...</iframe>"
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

EditActivityModal.propTypes = {
  activity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    price_discount: PropTypes.number,
    facilities: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
    location_maps: PropTypes.string.isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default EditActivityModal; 