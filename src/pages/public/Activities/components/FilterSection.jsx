import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCategories } from "../../../../store/slices/categorySlice";
import { Text } from '../../../../components/atoms';

const FilterSection = ({ filters, onFilterChange }) => {
  const dispatch = useDispatch();
  const { categories } = useSelector(state => state.category);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div>
        <Text variant="label" className="mb-3">Kategori</Text>
        <select
          value={filters.category}
          onChange={(e) => onFilterChange({ category: e.target.value })}
          className="p-2 w-full rounded-lg border"
        >
          <option value="">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <Text variant="label" className="mb-3">Rentang Harga</Text>
        <div className="space-y-2">
          <input
            type="number"
            placeholder="Harga Minimum"
            value={filters.priceMin}
            onChange={(e) => onFilterChange({ priceMin: e.target.value })}
            className="p-2 w-full rounded-lg border"
          />
          <input
            type="number"
            placeholder="Harga Maksimum"
            value={filters.priceMax}
            onChange={(e) => onFilterChange({ priceMax: e.target.value })}
            className="p-2 w-full rounded-lg border"
          />
        </div>
      </div>

      {/* Sort Filter */}
      <div>
        <Text variant="label" className="mb-3">Urutkan</Text>
        <select
          value={filters.sort}
          onChange={(e) => onFilterChange({ sort: e.target.value })}
          className="p-2 w-full rounded-lg border"
        >
          <option value="newest">Terbaru</option>
          <option value="price_low">Harga Terendah</option>
          <option value="price_high">Harga Tertinggi</option>
          <option value="rating">Rating Tertinggi</option>
        </select>
      </div>
    </div>
  );
};

FilterSection.propTypes = {
  filters: PropTypes.shape({
    category: PropTypes.string,
    priceMin: PropTypes.string,
    priceMax: PropTypes.string,
    sort: PropTypes.string
  }).isRequired,
  onFilterChange: PropTypes.func.isRequired
};

export default FilterSection; 