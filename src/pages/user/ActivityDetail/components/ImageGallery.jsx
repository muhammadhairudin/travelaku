import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '../../../../components/atoms';

const ImageGallery = ({ images, selectedImage, onImageSelect }) => {
  const [showFullscreen, setShowFullscreen] = useState(false);

  const handlePrevImage = () => {
    onImageSelect((selectedImage - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    onImageSelect((selectedImage + 1) % images.length);
  };

  return (
    <>
      {/* Main Image */}
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
        <img
          src={images[selectedImage]}
          alt={`Gallery ${selectedImage + 1}`}
          className="w-full h-full object-cover cursor-pointer"
          onClick={() => setShowFullscreen(true)}
        />
        
        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white"
            >
              <Icon name="chevronLeft" size={24} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 rounded-full hover:bg-white"
            >
              <Icon name="chevronRight" size={24} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onImageSelect(index)}
              className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                selectedImage === index ? 'ring-2 ring-primary' : ''
              }`}
            >
              <img
                src={image}
                alt={`Thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Modal */}
      {showFullscreen && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <button
            onClick={() => setShowFullscreen(false)}
            className="absolute top-4 right-4 text-white"
          >
            <Icon name="close" size={24} />
          </button>
          <img
            src={images[selectedImage]}
            alt={`Gallery ${selectedImage + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevImage}
                className="absolute left-4 text-white"
              >
                <Icon name="chevronLeft" size={32} />
              </button>
              <button
                onClick={handleNextImage}
                className="absolute right-4 text-white"
              >
                <Icon name="chevronRight" size={32} />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedImage: PropTypes.number.isRequired,
  onImageSelect: PropTypes.func.isRequired
};

export default ImageGallery; 