import PropTypes from 'prop-types';
import { Icon } from '../../atoms';

const SearchInput = ({ 
  className = '', 
  ...props 
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon name="search" className="text-gray-400" size={20} />
      </div>
      <input
        type="text"
        className={`
          block w-full pl-10 pr-3 py-2 
          border border-gray-300 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-primary/20
          ${className}
        `}
        {...props}
      />
    </div>
  );
};

SearchInput.propTypes = {
  className: PropTypes.string
};

export default SearchInput; 