import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { loginUser } from '../../../store/slices/authSlice';
import { Input, Button, Text } from '../../../components/atoms';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(loginUser(formData)).unwrap();
      console.log('Login Response:', result);
      
      if (result.success) {
        navigate('/admin');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex justify-center items-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
      <div className="space-y-8 w-full max-w-md">
        <div>
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Masuk ke Akun Anda
          </h2>
          {location.state?.message && (
            <div className="mt-2 text-sm text-center text-primary">
              {location.state.message}
            </div>
          )}
          <p className="mt-2 text-sm text-center text-gray-600">
            Atau{' '}
            <Link to="/register" className="font-medium text-primary hover:text-primary/80">
              daftar akun baru
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="p-4 bg-red-50 rounded-md">
              <Text variant="body2" className="text-red-700">{error}</Text>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage; 