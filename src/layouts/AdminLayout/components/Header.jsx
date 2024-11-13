import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../../../store/slices/authSlice';
import { Text, Button } from '../../../components/atoms';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);

  console.log('Header - Redux User:', user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex gap-4 items-center">
          <Link to="/admin/dashboard" className="flex gap-2 items-center">
            <img 
              src="/Logo.svg"
              alt="TravelAku Logo" 
              className="w-auto h-8"
            />
            <Text variant="h1" className="text-xl font-bold text-primary">
              Admin Panel
            </Text>
          </Link>
          {user && (
            <Text variant="body2" className="ml-4 text-gray-500">
              Hi, {user.name} <span className="text-primary">({user.role})</span>
            </Text>
          )}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Header; 