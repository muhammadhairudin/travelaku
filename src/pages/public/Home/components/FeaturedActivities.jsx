import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel, Keyboard } from 'swiper/modules';
import { Text } from '../../../../components/atoms';
import { ActivityCard } from '../../../../components/molecules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const FeaturedActivities = ({ title, activities = [], categories = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (!activities || activities.length === 0) return null;

  const filteredActivities = selectedCategory === 'all' 
    ? activities 
    : activities.filter(activity => activity.categoryId === selectedCategory);

  // Filter out activities without images
  const validActivities = filteredActivities.filter(
    activity => activity.imageUrls && activity.imageUrls.length > 0
  );

  // Determine if we need swiper
  const needsSwiper = validActivities.length > 3;

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Text variant="h2" className="text-2xl font-bold">
            {title}
          </Text>
          {/* Category Filter */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Semua
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <Link 
          to="/activities"
          className="text-primary hover:text-primary/80"
        >
          Lihat Semua
        </Link>
      </div>

      {needsSwiper ? (
        // Use Swiper if we have more than 3 items
        <Swiper
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          spaceBetween={24}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          mousewheel={{
            forceToAxis: true,
            sensitivity: 1,
            releaseOnEdges: true
          }}
          keyboard={{
            enabled: true
          }}
          grabCursor={true}
          loop={false} // Disable loop
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 }
          }}
          className="!pb-12 touch-pan-y"
        >
          {validActivities.map((activity) => (
            <SwiperSlide key={activity.id}>
              <ActivityCard activity={activity} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        // Use regular grid for 3 or fewer items
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {validActivities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </section>
  );
};

FeaturedActivities.propTypes = {
  title: PropTypes.string.isRequired,
  activities: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageUrls: PropTypes.arrayOf(PropTypes.string),
      price: PropTypes.number.isRequired,
      price_discount: PropTypes.number,
      categoryId: PropTypes.string.isRequired
    })
  ),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  )
};

export default FeaturedActivities; 