import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const BannerSlider = ({ banners = [] }) => {
  if (!banners || banners.length === 0) return null;

  return (
    <section className="container mx-auto px-4">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        className="rounded-xl overflow-hidden"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <img
              src={banner.imageUrl}
              alt={banner.name}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

BannerSlider.propTypes = {
  banners: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired
    })
  )
};

export default BannerSlider; 