import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../../../store/slices/authSlice';
import { Button } from '../../../../components/atoms';

const DesktopMenu = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="hidden lg:flex items-center gap-8">
      <Link to="/activities" className="text-gray-700 hover:text-primary">
        Aktivitas
      </Link>
      
      {isAuthenticated ? (
        <>
          <Link to="/cart" className="text-gray-700 hover:text-primary">
            Keranjang
          </Link>
          <Button 
            variant="outline" 
            onClick={handleLogout}
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Link to="/login">
            <Button variant="outline">Masuk</Button>
          </Link>
          <Link to="/register">
            <Button variant="primary">Daftar</Button>
          </Link>
        </>
      )}
    </nav>
  );
};

export default DesktopMenu; 