import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../store/slices/authSlice';
import { Text, Button } from '../../../components/atoms';
import { SearchInput } from '../../../components/molecules';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items: cartItems } = useSelector(state => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar - Optional */}
      <div className="bg-primary text-white py-1 text-center text-sm">
        <Text variant="caption">
          Dapatkan diskon 10% untuk pemesanan pertama Anda! 🎉
        </Text>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src="/Logo.svg" alt="TravelAku" className="h-8" />
            <Text variant="h1" className="text-xl font-bold text-primary hidden md:block">
              TravelAku
            </Text>
          </Link>

          {/* Main Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              to="/activities" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Aktivitas
            </Link>
            <Link 
              to="/categories" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Kategori
            </Link>
            <Link 
              to="/promos" 
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Promo
            </Link>
          </nav>

          {/* Search Bar */}
          <div className="hidden md:block w-1/3 max-w-md">
            <SearchInput placeholder="Cari destinasi wisata..." />
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* Cart */}
                <Link to="/cart" className="relative">
                  <span className="sr-only">Keranjang</span>
                  <svg 
                    className="w-6 h-6 text-gray-600 hover:text-primary transition-colors"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
                    />
                  </svg>
                  {cartItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                      {cartItems.length}
                    </span>
                  )}
                </Link>

                {/* User Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    <img 
                      src={user?.profilePictureUrl || 'https://via.placeholder.com/40'} 
                      alt={user?.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <Text variant="body2" className="hidden md:block">
                      {user?.name}
                    </Text>
                  </button>

                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                    <Link 
                      to="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profil Saya
                    </Link>
                    <Link 
                      to="/profile/transactions"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Pesanan Saya
                    </Link>
                    {user?.role === 'admin' && (
                      <Link 
                        to="/admin"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Admin Panel
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Keluar
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link to="/login">
                  <Button variant="outline">Masuk</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">Daftar</Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden py-4">
          <SearchInput placeholder="Cari destinasi wisata..." />
        </div>
      </div>
    </header>
  );
};

export default Header; 