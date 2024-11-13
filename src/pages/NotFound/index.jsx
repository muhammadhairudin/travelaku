import { Link } from 'react-router-dom';
import { Text, Button } from '../../components/atoms';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Text variant="h1" className="text-6xl font-bold text-primary mb-4">
          404
        </Text>
        <Text variant="h2" className="text-2xl font-bold mb-4">
          Halaman Tidak Ditemukan
        </Text>
        <Text variant="body1" className="text-gray-600 mb-8">
          Maaf, halaman yang Anda cari tidak ditemukan.
        </Text>
        <Link to="/">
          <Button variant="primary">
            Kembali ke Beranda
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 