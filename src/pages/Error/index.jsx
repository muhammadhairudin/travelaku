import { useRouteError, Link } from 'react-router-dom';
import { Text, Button } from '../../components/atoms';

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <Text variant="h1" className="text-6xl font-bold text-red-500 mb-4">
          Oops!
        </Text>
        <Text variant="h2" className="text-2xl font-bold mb-4">
          Terjadi Kesalahan
        </Text>
        <Text variant="body1" className="text-gray-600 mb-4">
          {error?.message || 'Terjadi kesalahan yang tidak diketahui'}
        </Text>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Coba Lagi
          </Button>
          <Link to="/">
            <Button variant="primary">
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage; 