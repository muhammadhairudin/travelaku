import PropTypes from 'prop-types';
import { useState } from 'react';

const ImageGallery = ({ images }) => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="overflow-hidden rounded-lg aspect-video">
        <img
          src={mainImage}
          alt="Activity"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setMainImage(image)}
            className={`
              aspect-video rounded-lg overflow-hidden
              ${mainImage === image ? 'ring-2 ring-primary' : ''}
            `}
          >
            <img
              src={image}
              alt={`Thumbnail ${index + 1}`}
              className="object-cover w-full h-full"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ImageGallery; 