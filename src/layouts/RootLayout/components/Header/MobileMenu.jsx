import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../../store/slices/authSlice';
import { Button, Text } from '../../../../components/atoms';

const MobileMenu = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="lg:hidden py-4 space-y-4">
      {user && (
        <div className="pb-4 border-b">
          <Text variant="body2" className="text-gray-600">
            Hi, <span className="font-medium">{user.name}</span>
          </Text>
        </div>
      )}

      <Link 
        to="/activities" 
        className="block text-gray-700 hover:text-primary"
      >
        Aktivitas
      </Link>
      
      {isAuthenticated ? (
        <>
          <Link 
            to="/cart" 
            className="block text-gray-700 hover:text-primary"
          >
            Keranjang
          </Link>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="w-full"
          >
            Logout
          </Button>
        </>
      ) : (
        <div className="space-y-2">
          <Link to="/login">
            <Button variant="outline" className="w-full">
              Masuk
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="primary" className="w-full">
              Daftar
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MobileMenu; 