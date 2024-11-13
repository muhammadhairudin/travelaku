import PropTypes from 'prop-types';

const Text = ({ 
  variant = 'body1', 
  children,
  className = '',
  ...props 
}) => {
  const variants = {
    h1: 'text-4xl font-heading font-bold',
    h2: 'text-3xl font-heading font-bold',
    h3: 'text-2xl font-heading font-bold',
    h4: 'text-xl font-heading font-bold',
    h5: 'text-lg font-heading font-bold',
    h6: 'text-base font-heading font-bold',
    subtitle1: 'text-lg font-body',
    subtitle2: 'text-base font-body',
    body1: 'text-base font-body',
    body2: 'text-sm font-body',
    caption: 'text-xs font-body',
    label: 'text-sm font-medium font-body'
  };

  return (
    <div 
      className={`${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

Text.propTypes = {
  variant: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'subtitle1', 'subtitle2',
    'body1', 'body2',
    'caption', 'label'
  ]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string
};

export default Text; 