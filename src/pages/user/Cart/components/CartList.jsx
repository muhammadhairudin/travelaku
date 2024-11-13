import PropTypes from 'prop-types';
import CartItem from './CartItem';

const CartList = ({ items }) => {
  return (
    <div className="space-y-4">
      {items.map((item) => (
        <CartItem 
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

CartList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      activity: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        imageUrls: PropTypes.arrayOf(PropTypes.string).isRequired,
        price: PropTypes.number.isRequired,
        price_discount: PropTypes.number
      }).isRequired
    })
  ).isRequired
};

export default CartList; 