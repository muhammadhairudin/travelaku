import PropTypes from 'prop-types';
import { useState } from 'react';
import { Text, Button } from '../../../../components/atoms';

const UploadProofModal = ({ isOpen, onClose, onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { // 2MB limit
        setError('Ukuran file maksimal 2MB');
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/v1/upload-image', {
        method: 'POST',
        body: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      onUploadSuccess(data.imageUrl);
    } catch (err) {
      setError(err.message || 'Gagal mengupload bukti pembayaran');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <Text variant="h2" className="text-xl font-bold mb-4">
          Upload Bukti Pembayaran
        </Text>

        <div className="space-y-4">
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
            <Text variant="caption" className="text-gray-500 mt-1">
              Format: JPG, PNG, JPEG (Max. 2MB)
            </Text>
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
            >
              Batal
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              onClick={handleUpload}
              disabled={!selectedFile || loading}
            >
              {loading ? 'Mengupload...' : 'Upload'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

UploadProofModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUploadSuccess: PropTypes.func.isRequired
};

export default UploadProofModal; 