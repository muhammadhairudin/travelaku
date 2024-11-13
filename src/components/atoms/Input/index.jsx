import PropTypes from 'prop-types';
import { Text } from '../';

const Input = ({ 
  label,
  error,
  className = '',
  type = 'text',
  ...props 
}) => {
  return (
    <div className="space-y-1">
      {label && (
        <Text 
          as="label" 
          variant="label" 
          className="block text-gray-700"
        >
          {label}
        </Text>
      )}
      
      <input
        type={type}
        className={`
          w-full px-3 py-2 
          border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
          disabled:bg-gray-100 disabled:cursor-not-allowed
          ${error ? 'border-red-500' : ''}
          ${className}
        `}
        {...props}
      />

      {error && (
        <Text variant="caption" className="text-red-500">
          {error}
        </Text>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string
};

export default Input; 