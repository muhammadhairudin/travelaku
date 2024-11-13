import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: '📊'
    },
    {
      path: '/admin/activities',
      label: 'Activities',
      icon: '🎯'
    },
    {
      path: '/admin/banners',
      label: 'Banners',
      icon: '🖼️'
    },
    {
      path: '/admin/categories',
      label: 'Categories',
      icon: '📑'
    },
    {
      path: '/admin/promos',
      label: 'Promos',
      icon: '🎫'
    },
    {
      path: '/admin/users',
      label: 'Users',
      icon: '👥'
    }
  ];

  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="mt-5 px-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`group flex items-center px-2 py-2 text-base font-medium rounded-md ${
              isActive(item.path)
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <span className="mr-3">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar; 