import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { useState } from "react";
import PropTypes from "prop-types";

export const SliderProduct = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div>
      {/* Slider chính */}
      <Swiper
        modules={[Navigation, Thumbs]}
        navigation
        thumbs={{ swiper: thumbsSwiper }}
        className="mb-4"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-[300px] bg-white flex items-center justify-center rounded-lg overflow-hidden">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail slider */}
      <Swiper
        modules={[Thumbs]}
        onSwiper={setThumbsSwiper}
        slidesPerView={4}
        spaceBetween={10}
        className="cursor-pointer"
      >
        {images.map((img, index) => (
          <SwiperSlide key={index}>
            <img
              src={img}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-20 object-cover rounded-lg border-2 border-transparent hover:border-blue-500"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

SliderProduct.propTypes = {
  images: PropTypes.array.isRequired,
};
