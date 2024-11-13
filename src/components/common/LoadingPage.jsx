import { Text } from '../atoms';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mb-4" />
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage; 