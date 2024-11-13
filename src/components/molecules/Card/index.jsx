import PropTypes from 'prop-types';

const Card = ({ 
  children, 
  className = '',
  onClick,
  hoverable = false,
  ...props 
}) => {
  return (
    <div 
      className={`
        bg-white rounded-lg shadow-sm
        ${hoverable ? 'hover:shadow-md transition-shadow duration-200' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
  hoverable: PropTypes.bool
};

export default Card; 