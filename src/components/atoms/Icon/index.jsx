import PropTypes from 'prop-types';
import { 
  FiHome, 
  FiUser, 
  FiShoppingCart, 
  FiMenu, 
  FiX as FiClose,
  FiSearch,
  FiChevronRight,
  FiChevronLeft,
  FiStar,
  FiMapPin,
  FiPhone,
  FiMail,
  FiCalendar,
  FiClock,
  FiDollarSign,
  FiTag,
  FiImage,
  FiGrid,
  FiList,
  FiFilter,
  FiCheck,
  FiTrash2,
  FiEdit,
  FiPlus,
  FiMinus
} from 'react-icons/fi';

const iconMap = {
  home: FiHome,
  user: FiUser,
  cart: FiShoppingCart,
  menu: FiMenu,
  close: FiClose,
  search: FiSearch,
  chevronRight: FiChevronRight,
  chevronLeft: FiChevronLeft,
  star: FiStar,
  mapPin: FiMapPin,
  phone: FiPhone,
  mail: FiMail,
  calendar: FiCalendar,
  clock: FiClock,
  dollar: FiDollarSign,
  tag: FiTag,
  image: FiImage,
  grid: FiGrid,
  list: FiList,
  filter: FiFilter,
  check: FiCheck,
  trash: FiTrash2,
  edit: FiEdit,
  plus: FiPlus,
  minus: FiMinus
};

const Icon = ({ name, size = 24, className = '' }) => {
  const IconComponent = iconMap[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent size={size} className={className} />;
};

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(iconMap)).isRequired,
  size: PropTypes.number,
  className: PropTypes.string
};

export default Icon; 