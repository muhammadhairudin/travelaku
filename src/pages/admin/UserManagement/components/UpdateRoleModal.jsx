import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateUserRole } from '../../../../store/slices/userManagementSlice';
import { Text, Button } from '../../../../components/atoms';

const UpdateRoleModal = ({ user, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRole, setSelectedRole] = useState(user?.role || 'user');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await dispatch(updateUserRole({
        userId: user.id,
        role: selectedRole
      })).unwrap();
      onClose();
    } catch (err) {
      setError(err.message || 'Gagal mengubah role pengguna');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <Text variant="h2" className="text-xl font-bold mb-6">
          Ubah Role Pengguna
        </Text>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Text variant="label" className="mb-2">Pengguna</Text>
            <Text variant="body1">{user.name}</Text>
            <Text variant="body2" className="text-gray-500">{user.email}</Text>
          </div>

          <div>
            <Text variant="label" className="mb-2">Role</Text>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full p-2 border rounded-lg"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {error && (
            <Text variant="body2" className="text-red-500">
              {error}
            </Text>
          )}

          <div className="flex gap-4">
            <Button
              variant="outline"
              className="flex-1"
              onClick={onClose}
              type="button"
            >
              Batal
            </Button>
            <Button
              variant="primary"
              className="flex-1"
              type="submit"
              disabled={loading || selectedRole === user.role}
            >
              {loading ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

UpdateRoleModal.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    role: PropTypes.string.isRequired
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default UpdateRoleModal; 