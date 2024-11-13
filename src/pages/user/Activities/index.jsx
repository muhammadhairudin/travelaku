import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { fetchActivities, setFilters } from '../../../store/slices/activitySlice';
import { fetchCategories } from '../../../store/slices/categorySlice';
import { Text } from '../../../components/atoms';
import { SearchInput } from '../../../components/molecules';
import ActivityFilters from './components/ActivityFilters';
import ActivityGrid from './components/ActivityGrid';
import ActivityList from './components/ActivityList';

const ActivitiesPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const { activities, loading, error, filters } = useSelector(state => state.activity);
  const { categories } = useSelector(state => state.category);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' atau 'list'

  useEffect(() => {
    // Ambil filter dari URL
    const categoryId = searchParams.get('category');
    const search = searchParams.get('search');

    // Set filter ke state
    dispatch(setFilters({ categoryId, search }));

    // Fetch data
    dispatch(fetchActivities({ categoryId, search }));
    dispatch(fetchCategories());
  }, [dispatch, searchParams]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Filter */}
        <div className="w-full md:w-64">
          <ActivityFilters 
            categories={categories}
            selectedCategory={filters.categoryId}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Search & View Toggle */}
          <div className="flex justify-between items-center mb-6">
            <div className="w-full max-w-md">
              <SearchInput
                value={filters.search}
                onChange={(e) => dispatch(setFilters({ search: e.target.value }))}
                placeholder="Cari aktivitas..."
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'text-primary' : 'text-gray-500'}`}
              >
                Grid
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'text-primary' : 'text-gray-500'}`}
              >
                List
              </button>
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="text-center py-8">
              <Text variant="body1" className="text-red-500">
                {error}
              </Text>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent mx-auto" />
            </div>
          ) : (
            // Content
            viewMode === 'grid' ? (
              <ActivityGrid activities={activities} />
            ) : (
              <ActivityList activities={activities} />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesPage; 