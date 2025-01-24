import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useState, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

export default function Banner() {
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [sliderData, setSliderData] = useState([
        {
            image: "https://ttcenter.com.vn/uploads/gallery/thu-cu-gia-cao-len-doi-may-moi-1717042654.png",
            text: "Thu Cũ Đổi Mới - Máy Mới Cao Lên Đời",
        },
        {
            image: "https://ttcenter.com.vn/uploads/gallery/laptop-van-phong-chi-4trieu-1717982800.webp",
            text: "Laptop Văn Phòng Chỉ 4 Triệu ",
        },
        {
            image: "https://ttcenter.com.vn/uploads/gallery/ipad-pro-m4-thiet-ke-moi-hieu-nang-khung-1718008862.webp",
            text: "Thiết Kế Hiệu Năng Khủng M4 Mới",
        },
        {
            image: "https://ttcenter.com.vn/uploads/gallery/chao-xuan-at-ty-nhan-tram-li-xi-1736821351.webp",
            text: "Chào Xuân At Tỵ Nhận Trăm Lì Xì",
        },
        {
            image: "https://ttcenter.com.vn/uploads/gallery/chien-game-dinh-cao-rinh-ngay-laptop-gaming-xin-1736301992.jpeg",
            text: "Chiến Game Đỉnh Cao Rinh Ngay Laptop Gaming Xin",
        },
        {
            image: "https://ttcenter.com.vn/uploads/gallery/chot-may-xin-trung-laptop-gaming-1735624332.webp",
            text: "Chốt Máy Xin Trúng Laptop Gaming ",
        },
        {
            image: "https://ttcenter.com.vn/uploads/gallery/lenovo-thinkpad-series-1706688953.jpg",
            text: "Lenovo Thinkpad Series 2021 Mới Nhất",
        },
    ]);

    const handleBoxClick = (index) => {
        const updatedSliderData = [...sliderData];
        const [clickedBox] = updatedSliderData.splice(index, 1);
        updatedSliderData.push(clickedBox);

        setSliderData(updatedSliderData);
        setActiveIndex(index);
        swiperRef.current.swiper.slideTo(index);
    };

    return (
        <div className="w-full flex flex-col lg:flex-row justify-between items-center gap-2">
            <div className="w-full lg:w-3/4">
                <Swiper
                    ref={swiperRef}
                    modules={[Navigation, Pagination, Scrollbar, A11y]}
                    spaceBetween={50}
                    slidesPerView={1}
                    // navigation
                    pagination={{ clickable: true }}
                    loop={true}
                    onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                >
                    {sliderData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className="w-full h-[300px] lg:h-[370px] bg-white flex items-center justify-center rounded-t-lg overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={`Slide ${index + 1}`}
                                    className="w-full h-full"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="w-full sm:none lg:h-[90px] flex overflow-x-auto">
                    {sliderData.slice(0, 4).map((item, index) => (
                        <div
                            key={index}
                            className={`w-1/4 h-full flex justify-center items-center text-sm font-semibold text-center shadow-sm px-2 bg-white ${activeIndex === index ? 'bg-primary' : ''} border-r-2 ${index === 0 ? 'rounded-es-lg' : ''} ${index === 3 ? 'rounded-ee-lg' : ''}`}
                            onClick={() => handleBoxClick(index)}
                        >
                            {item.text}
                        </div>
                    ))}
                </div>

            </div>

            <div className="w-full lg:w-1/4 flex flex-col gap-2">
                <div className="">
                    <img src="https://ttcenter.com.vn/uploads/gallery/full_macbook-air-m3-chi-tu-23-000-000d-bao-hanh-len-den-3-nam-1735894269.webp" className="rounded-lg w-full" alt="" />
                </div>
                <div className="">
                    <img src="https://ttcenter.com.vn/uploads/gallery/full_lenovo-legion-tro-gia-len-den-3-trieu-1735894276.webp" className="rounded-lg w-full" alt="" />
                </div>
                <div className="">
                    <img src="https://ttcenter.com.vn/uploads/gallery/full_dac-quyen-sinh-vien-vui-tuu-truong-qua-to-ngat-nguong-1735894283.webp" className="rounded-lg w-full" alt="" />
                </div>
            </div>
        </div>
    );
};
