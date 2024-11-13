import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Text } from '../../../../components/atoms';
import { Card } from '../../../../components/molecules';

const CategorySection = ({ title, categories = [] }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="container mx-auto px-4">
      <div className="flex justify-between items-center mb-6">
        <Text variant="h2" className="text-2xl font-bold">
          {title}
        </Text>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <Link 
            key={category.id} 
            to={`/activities?category=${category.id}`}
          >
            <Card className="h-full hover:shadow-md transition-shadow">
              <div className="aspect-square relative overflow-hidden rounded-t-lg">
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <Text variant="label" className="text-center">
                  {category.name}
                </Text>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};

CategorySection.propTypes = {
  title: PropTypes.string.isRequired,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  )
};

export default CategorySection; 