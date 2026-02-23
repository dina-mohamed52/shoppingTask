import { Carousel } from "antd";
import { useState } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const images = [
  { 
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784141/WhatsApp_Image_2026-02-21_at_10.28.04_AM_2_gw3for.jpg",
    alt: "Slide 1",
    titleKey: "carousel.slide1.title",
    subtitleKey: "carousel.slide1.subtitle"
  },
  { 
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784141/WhatsApp_Image_2026-02-21_at_10.28.04_AM_1_jgzfpu.jpg",
    alt: "Slide 2",
    titleKey: "carousel.slide2.title",
    subtitleKey: "carousel.slide2.subtitle"
  },
  { 
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784154/WhatsApp_Image_2026-02-21_at_10.28.04_AM_qpwxo0.jpg",
    alt: "Slide 3",
    titleKey: "carousel.slide3.title",
    subtitleKey: "carousel.slide3.subtitle"
  },
  { 
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784125/WhatsApp_Image_2026-02-21_at_10.28.05_AM_2_mdqyi4.jpg",
    alt: "Slide 4",
    titleKey: "carousel.slide4.title",
    subtitleKey: "carousel.slide4.subtitle"
  },
  { 
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784119/WhatsApp_Image_2026-02-21_at_10.28.06_AM_1_rnv8kp.jpg",
    alt: "Slide 5",
    titleKey: "carousel.slide5.title",
    subtitleKey: "carousel.slide5.subtitle"
  },
];

const TurbonCarousal = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleBeforeChange = (from, to) => {
    setCurrentSlide(to);
  };

  return (
    <div className="w-full max-w-[95vw] mx-auto relative mt-24 sm:mt-6 px-4">
      <div className="relative group">
        <Carousel
          autoplay
          autoplaySpeed={2500}
          dotPosition="bottom"
          effect="fade"
          className="w-full rounded-2xl overflow-hidden shadow-2xl"
          beforeChange={handleBeforeChange}
          arrows
          prevArrow={<LeftOutlined className="text-pink-400 text-2xl" />}
          nextArrow={<RightOutlined className="text-pink-400 text-2xl" />}
        >
          {images.map((image, index) => (
            <div key={index} className="relative">
              <div className="relative w-full h-[70vh] sm:h-[500px] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover sm:object-contain transform transition-transform duration-[10000ms] scale-105 hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-pink-500/20 to-transparent"></div>

                {/* Text Overlay */}
                <div className="absolute bottom-20 left-0 right-0 text-center text-white z-10 transform transition-all duration-700 translate-y-0 opacity-100">
                  <h3 className="text-3xl sm:text-4xl font-bold mb-2 py-2 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-pink-300 to-white">
                    {t(image.titleKey)}
                  </h3>
                  <p className="text-xl sm:text-2xl text-gray-200 font-light">
                    {t(image.subtitleKey)}
                  </p>
                </div>

                {/* Slide Indicator */}
                <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
                  <span className="text-white text-sm font-medium">
                    {index + 1} / {images.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Progress Bar */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gray-300/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 to-pink-600 rounded-full transition-all duration-300"
            style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Custom Styles for Ant Design Carousel */}
      <style jsx global>{`
        .ant-carousel .slick-dots-bottom {
          bottom: 30px;
          z-index: 20;
        }
        
        .ant-carousel .slick-dots li button {
          width: 12px;
          height: 4px;
          background: #e5e7eb !important;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .ant-carousel .slick-dots li.slick-active button {
          width: 30px;
          background: linear-gradient(90deg, #ec4899, #db2777) !important;
        }
        
        .ant-carousel .slick-prev,
        .ant-carousel .slick-next {
          width: 45px;
          height: 45px;
          background: rgba(255, 255, 255, 0.2) !important;
          backdrop-filter: blur(8px);
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.3);
          z-index: 10;
          opacity: 0;
          transition: all 0.3s ease;
        }
        
        .group:hover .slick-prev,
        .group:hover .slick-next {
          opacity: 1;
        }
        
        .ant-carousel .slick-prev {
          left: 25px;
        }
        
        .ant-carousel .slick-next {
          right: 25px;
        }
        
        .ant-carousel .slick-prev:hover,
        .ant-carousel .slick-next:hover {
          background: rgba(236, 72, 153, 0.3) !important;
          border-color: #ec4899;
        }
        
        .ant-carousel .slick-prev::before,
        .ant-carousel .slick-next::before {
          display: none;
        }
        
        .slick-slide {
          opacity: 0.5;
          transition: opacity 0.5s ease;
        }
        
        .slick-active {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default TurbonCarousal;