import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUsers } from '../../../store/slices/userManagementSlice';
import { Text, Button } from '../../../components/atoms';
import { SearchInput } from '../../../components/molecules';
import UserTable from './components/UserTable';
import AddUserModal from './components/AddUserModal';
import Pagination from '../../../components/molecules/Pagination';

const UserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { users, loading, error } = useSelector(state => state.userManagement);
  const auth = useSelector(state => state.auth);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      try {
        if (!auth.token) {
          console.log('Token tidak tersedia');
          navigate('/login');
          return;
        }

        if (!auth.user || auth.user.role !== 'admin') {
          console.log('User bukan admin');
          navigate('/');
          return;
        }

        console.log('Loading users with token:', auth.token);
        const result = await dispatch(fetchUsers()).unwrap();
        console.log('Users loaded:', result);
      } catch (err) {
        console.error('Error loading users:', err);
      }
    };

    loadUsers();
  }, [dispatch, auth, navigate]);

  // Filter users berdasarkan search query
  const filteredUsers = users.filter(user => 
    user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Hitung total pages
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  // Get current users untuk halaman saat ini
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text variant="h1" className="text-2xl font-bold">
          Manajemen Pengguna
        </Text>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          Tambah Pengguna
        </Button>
      </div>

      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari pengguna..."
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 rounded-lg">
          <Text variant="body1" className="text-red-500">
            {error}
          </Text>
        </div>
      )}

      <UserTable 
        users={currentUsers}
        loading={loading}
      />

      {/* Pagination */}
      {!loading && filteredUsers.length > 0 && (
        <div className="flex justify-center mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}

      <AddUserModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default UserManagement;