import { Link } from 'react-router-dom';
import { Text } from '../../../../components/atoms';

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/Logo.svg"
        alt="TravelAku Logo" 
        className="h-8 w-auto"
      />
      <Text variant="h1" className="text-xl font-bold text-primary">
        TravelAku
      </Text>
    </Link>
  );
};

export default Logo; 