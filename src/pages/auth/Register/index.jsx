import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser } from '../../../store/slices/authSlice';
import { Input, Button, Text } from '../../../components/atoms';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordRepeat: '',
    name: '',
    phoneNumber: '',
    role: ''
  });

  const [formError, setFormError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.email || !formData.password || !formData.name || !formData.phoneNumber || !formData.role) {
      setFormError('Semua field harus diisi');
      return;
    }

    if (formData.password !== formData.passwordRepeat) {
      setFormError('Password tidak cocok');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('Password minimal 6 karakter');
      return;
    }

    const registerData = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      passwordRepeat: formData.passwordRepeat,
      role: formData.role,
      phoneNumber: formData.phoneNumber,
      profilePictureUrl: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MnxlbnwwfHwwfHw%3D&w=1000&q=80"
    };

    try {
      const response = await dispatch(registerUser(registerData)).unwrap();
      if (response) {
        navigate('/login');
      }
    } catch (err) {
      setFormError(err.message || 'Terjadi kesalahan saat mendaftar');
    }
  };

  return (
    <div className="flex justify-center items-center px-4 py-12 min-h-screen bg-gray-50 sm:px-6 lg:px-8">
      <div className="space-y-8 w-full max-w-md">
        <div>
          <h2 className="mt-6 text-3xl font-bold text-center text-gray-900">
            Daftar Akun Baru
          </h2>
          <p className="mt-2 text-sm text-center text-gray-600">
            Sudah punya akun?{' '}
            <Link to="/login" className="font-medium text-primary hover:text-primary/80">
              Masuk di sini
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {(error || formError) && (
            <div className="p-4 bg-red-50 rounded-md">
              <Text variant="body2" className="text-red-700">{error || formError}</Text>
            </div>
          )}

          <div className="space-y-4">
            <Input
              label="Nama Lengkap"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <Input
              label="Nomor Telepon"
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
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

            <Input
              label="Ulangi Password"
              type="password"
              name="passwordRepeat"
              value={formData.passwordRepeat}
              onChange={handleChange}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              >
                <option value="">Pilih Role</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Mendaftar...' : 'Daftar'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage; 