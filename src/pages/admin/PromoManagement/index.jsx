import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPromos } from '../../../store/slices/promoManagementSlice';
import { Text, Button } from '../../../components/atoms';
import { SearchInput } from '../../../components/molecules';
import PromoTable from './components/PromoTable';
import AddPromoModal from './components/AddPromoModal';

const PromoManagement = () => {
  const dispatch = useDispatch();
  const { promos, loading, error } = useSelector(state => state.promoManagement);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchPromos());
  }, [dispatch]);

  const filteredPromos = promos.filter(promo => 
    promo.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    promo.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Text variant="h1" className="text-2xl font-bold">
          Manajemen Promo
        </Text>
        <Button
          variant="primary"
          onClick={() => setIsAddModalOpen(true)}
        >
          Tambah Promo
        </Button>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <SearchInput
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari promo..."
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

      {/* Promo Table */}
      <PromoTable 
        promos={filteredPromos}
        loading={loading}
      />

      {/* Add Promo Modal */}
      <AddPromoModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
};

export default PromoManagement; 