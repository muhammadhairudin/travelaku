import PropTypes from 'prop-types';

const Input = ({
  label,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2 rounded-lg border
          ${error ? 'border-red-500' : 'border-gray-300'}
          focus:outline-none focus:ring-2 focus:ring-primary/20
        `}
        {...props}
      />
      {error && (
        <span className="text-sm text-red-500">{error}</span>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string,
  error: PropTypes.string,
};

export default Input; 