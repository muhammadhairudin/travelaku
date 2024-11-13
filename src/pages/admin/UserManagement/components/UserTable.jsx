import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser, updateUserRole } from '../../../../store/slices/userManagementSlice';
import { Text, Button } from '../../../../components/atoms';
import EditUserModal from './EditUserModal';

const UserTable = ({ users, loading }) => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus pengguna ini?')) {
      try {
        await dispatch(deleteUser(id)).unwrap();
      } catch (error) {
        alert(error.message || 'Gagal menghapus pengguna');
      }
    }
  };

  const handleRoleChange = async (id, newRole) => {
    try {
      await dispatch(updateUserRole({ id, role: newRole })).unwrap();
    } catch (error) {
      alert(error.message || 'Gagal mengubah role pengguna');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-gray-500">
          Loading...
        </Text>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <Text variant="body1" className="text-gray-500">
          Tidak ada pengguna yang ditemukan
        </Text>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b">
              <th className="pb-3 font-medium">Pengguna</th>
              <th className="pb-3 font-medium">Email</th>
              <th className="pb-3 font-medium">Role</th>
              <th className="pb-3 font-medium">No. Telepon</th>
              <th className="pb-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.profilePictureUrl}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <Text variant="body1">{user.name}</Text>
                  </div>
                </td>
                <td className="py-4">{user.email}</td>
                <td className="py-4">
                  <select
                    value={user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td className="py-4">{user.phoneNumber || '-'}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedUser(user)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-500 border-red-500 hover:bg-red-50"
                      onClick={() => handleDelete(user.id)}
                    >
                      Hapus
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditUserModal
        user={selectedUser}
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </>
  );
};

UserTable.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string,
      profilePictureUrl: PropTypes.string
    })
  ).isRequired,
  loading: PropTypes.bool
};

export default UserTable; 