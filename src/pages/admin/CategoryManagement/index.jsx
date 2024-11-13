import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from '../../../store/slices/categoryManagementSlice';
import { Text, Button } from '../../../components/atoms';
import { SearchInput } from '../../../components/molecules';
import CategoryTable from './components/CategoryTable';
import AddCategoryModal from './components/AddCategoryModal';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { categories, loading, error } = useSelector(state => state.categoryManagement);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter(category => 
    category.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text variant="h1" className="text-2xl font-bold">
          Manajemen Kategori
        </Text>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          Tambah Kategori
        </Button>
      </div>

      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari kategori..."
        />
      </div>

      {error && (
        <div className="text-center py-4">
          <Text variant="body1" className="text-red-500">
            {error}
          </Text>
        </div>
      )}

      <CategoryTable 
        categories={filteredCategories}
        loading={loading}
      />

      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default CategoryManagement; 