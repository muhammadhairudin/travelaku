import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { Icon } from '../../components/atoms';

const menuItems = [
  {
    name: 'Dashboard',
    path: '/admin',
    icon: 'dashboard'
  },
  {
    name: 'Pengguna',
    path: '/admin/users',
    icon: 'users'
  },
  {
    name: 'Aktivitas',
    path: '/admin/activities',
    icon: 'activity'
  },
  {
    name: 'Kategori',
    path: '/admin/categories',
    icon: 'category'
  },
  {
    name: 'Banner',
    path: '/admin/banners',
    icon: 'image'
  },
  {
    name: 'Promo',
    path: '/admin/promos',
    icon: 'tag'
  },
  {
    name: 'Transaksi',
    path: '/admin/transactions',
    icon: 'receipt'
  }
];

const MenuItem = ({ item }) => {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) => `
        flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
        ${isActive 
          ? 'bg-primary text-white' 
          : 'text-gray-600 hover:bg-gray-50'
        }
      `}
    >
      <Icon name={item.icon} />
      <span>{item.name}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired
  }).isRequired
};

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white h-screen sticky top-0 shadow-sm">
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => (
          <MenuItem key={item.path} item={item} />
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 