import { useState } from 'react';
import { Text, Input } from '../../../../components/atoms';

const CheckoutForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    specialRequest: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <Text variant="h2" className="text-xl font-bold mb-6">
        Informasi Pemesan
      </Text>

      <div className="space-y-4">
        <Input
          label="Nama Lengkap"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <Input
          label="Nomor Telepon"
          type="tel"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />

        <div>
          <Text variant="label" className="mb-2">
            Permintaan Khusus (Opsional)
          </Text>
          <textarea
            name="specialRequest"
            value={formData.specialRequest}
            onChange={handleChange}
            rows={4}
            className="w-full p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm; 