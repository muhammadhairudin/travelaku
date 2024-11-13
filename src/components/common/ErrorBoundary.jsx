import { useRouteError } from 'react-router-dom';
import { Text, Button } from '../atoms';

const ErrorBoundary = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8">
        <Text variant="h1" className="text-2xl font-bold mb-4">
          Oops! Something went wrong
        </Text>
        <Text variant="body1" className="text-gray-600 mb-6">
          {error?.message || 'An unexpected error occurred'}
        </Text>
        <Button
          variant="primary"
          onClick={() => window.location.reload()}
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};

export default ErrorBoundary; 