import { useEffect, Suspense } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeData } from '../../../store/slices/homeSlice';
import BannerSlider from './components/BannerSlider';
import CategorySection from './components/CategorySection';
import FeaturedActivities from './components/FeaturedActivities';
import LoadingPage from '../../../components/common/LoadingPage';

const HomePage = () => {
  const dispatch = useDispatch();
  const { banners, categories, activities, loading, error } = useSelector(state => state.home);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-500">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error}</p>
          <button 
            onClick={() => dispatch(fetchHomeData())}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <Suspense fallback={<LoadingPage />}>
      <div className="space-y-12">
        {banners?.length > 0 && <BannerSlider banners={banners} />}
        {categories?.length > 0 && (
          <CategorySection 
            title="Kategori Wisata"
            categories={categories}
          />
        )}
        {activities?.length > 0 && (
          <FeaturedActivities 
            title="Aktivitas Populer"
            activities={activities}
            categories={categories}
          />
        )}
      </div>
    </Suspense>
  );
};

export default HomePage;