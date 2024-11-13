import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const FeaturedCategories = ({ categories }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <Text variant="h2" className="text-3xl font-bold text-center mb-12">
          Kategori Wisata
        </Text>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/activities?category=${category.id}`}
              className="transform hover:-translate-y-1 transition-transform"
            >
              <Card className="overflow-hidden">
                {/* Image Container dengan Overlay Gradient */}
                <div className="relative aspect-square">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  
                  {/* Category Title & Count */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                    <Text variant="h6" className="font-medium text-white mb-1">
                      {category.name}
                    </Text>
                    {category.total_activities > 0 && (
                      <Text variant="caption" className="text-white/80">
                        {category.total_activities} aktivitas
                      </Text>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

FeaturedCategories.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      total_activities: PropTypes.number
    })
  ).isRequired
};

export default FeaturedCategories; 