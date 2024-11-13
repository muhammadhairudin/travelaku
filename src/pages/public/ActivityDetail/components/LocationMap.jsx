import PropTypes from 'prop-types';
import { Text } from '../../../../components/atoms';

const LocationMap = ({ address, locationMaps }) => {
  return (
    <div className="space-y-4">
      <Text variant="label">Lokasi di Peta</Text>
      
      <div className="aspect-video rounded-lg overflow-hidden">
        <div 
          dangerouslySetInnerHTML={{ __html: locationMaps }}
          className="w-full h-full"
        />
      </div>

      <Text variant="body2" className="text-gray-600">
        {address}
      </Text>
    </div>
  );
};

LocationMap.propTypes = {
  address: PropTypes.string.isRequired,
  locationMaps: PropTypes.string.isRequired
};

export default LocationMap; 