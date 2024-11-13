import PropTypes from 'prop-types';

const Button = ({ 
  children, 
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props 
}) => {
  const baseStyle = "rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90 disabled:hover:bg-primary",
    secondary: "bg-secondary text-primary hover:bg-secondary/90 disabled:hover:bg-secondary",
    outline: "border-2 border-primary text-primary hover:bg-primary/10 disabled:hover:bg-transparent"
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  return (
    <button 
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  disabled: PropTypes.bool
};

export default Button; 