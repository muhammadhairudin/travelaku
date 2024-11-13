import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBanners } from '../../../store/slices/bannerManagementSlice';
import { Text, Button } from '../../../components/atoms';
import { SearchInput } from '../../../components/molecules';
import BannerTable from './components/BannerTable';
import AddBannerModal from './components/AddBannerModal';

const BannerManagement = () => {
  const dispatch = useDispatch();
  const { banners, loading, error } = useSelector(state => state.bannerManagement);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const filteredBanners = banners.filter(banner => 
    banner.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text variant="h1" className="text-2xl font-bold">
          Manajemen Banner
        </Text>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          Tambah Banner
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari banner..."
        />
      </div>

      {/* Error State */}
      {error && (
        <div className="text-center py-4">
          <Text variant="body1" className="text-red-500">
            {error}
          </Text>
        </div>
      )}

      {/* Banner Table */}
      <BannerTable 
        banners={filteredBanners}
        loading={loading}
      />

      {/* Add Banner Modal */}
      <AddBannerModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default BannerManagement; 