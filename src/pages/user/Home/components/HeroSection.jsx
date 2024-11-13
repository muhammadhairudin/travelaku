import PropTypes from 'prop-types';
import { useState } from 'react';
import { Text } from '../../../../components/atoms';

const HeroSection = ({ banners }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (!banners?.length) return null;

  return (
    <div className="relative h-[500px]">
      {/* Banner Image */}
      <div className="absolute inset-0">
        <img
          src={banners[currentSlide].imageUrl}
          alt={banners[currentSlide].name}
          className="w-full h-full object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-2xl text-white">
          <Text variant="h1" className="text-4xl font-bold mb-4">
            {banners[currentSlide].name}
          </Text>
          <Text variant="body1" className="text-lg">
            {banners[currentSlide].description}
          </Text>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full"
      >
        →
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full ${
              currentSlide === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

HeroSection.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
      imageUrl: PropTypes.string.isRequired
    })
  ).isRequired
};

export default HeroSection; 