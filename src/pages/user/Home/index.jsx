import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHomeData } from '../../../store/slices/homeSlice';
import { Text } from '../../../components/atoms';
import HeroSection from './components/HeroSection';
import CategorySection from './components/CategorySection';
import PopularActivities from './components/PopularActivities';
import PromoSection from './components/PromoSection';

const HomePage = () => {
  const dispatch = useDispatch();
  const { 
    banners, 
    activities, 
    categories, 
    promos,
    loading, 
    error 
  } = useSelector(state => state.home);

  useEffect(() => {
    dispatch(fetchHomeData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 rounded-full border-4 animate-spin border-primary border-t-transparent" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container px-4 py-12 mx-auto">
        <div className="text-center">
          <Text variant="h1" className="text-2xl font-bold text-red-500">
            {error}
          </Text>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <HeroSection banners={banners} />
      
      <div className="container px-4 mx-auto">
        <CategorySection categories={categories} />
        
        <PopularActivities 
          activities={activities.slice(0, 8)} 
          className="mt-12"
        />
        
        <PromoSection 
          promos={promos} 
          className="mt-12"
        />
      </div>
    </div>
  );
};

export default HomePage; 