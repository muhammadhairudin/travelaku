import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { setFilters } from '../../../../store/slices/activitySlice';
import { Text } from '../../../../components/atoms';

const ActivityFilters = ({ categories, selectedCategory }) => {
  const dispatch = useDispatch();

  const handleCategoryClick = (categoryId) => {
    dispatch(setFilters({ categoryId }));
  };

  return (
    <div className="space-y-6">
      <div>
        <Text variant="h6" className="font-semibold mb-4">
          Kategori
        </Text>
        <div className="space-y-2">
          <button
            onClick={() => handleCategoryClick(null)}
            className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
              !selectedCategory ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'
            }`}
          >
            Semua Kategori
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`block w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedCategory === category.id ? 'bg-primary/10 text-primary' : 'hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tambahkan filter lain di sini */}
    </div>
  );
};

ActivityFilters.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  selectedCategory: PropTypes.string
};

export default ActivityFilters; 