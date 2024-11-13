import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const CategorySection = ({ categories }) => {
  return (
    <section className="py-12">
      <Text variant="h2" className="text-2xl font-bold mb-6">
        Kategori Wisata
      </Text>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link key={category.id} to={`/activities?category=${category.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow">
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 text-center">
                <Text variant="label">{category.name}</Text>
                {category.total_activities > 0 && (
                  <Text variant="caption" className="text-gray-500">
                    {category.total_activities} aktivitas
                  </Text>
                )}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

CategorySection.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
      total_activities: PropTypes.number
    })
  ).isRequired
};

export default CategorySection; 