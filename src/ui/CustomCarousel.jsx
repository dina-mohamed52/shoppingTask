import { Carousel } from "antd";
import { useState, useEffect } from "react";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const images = [
  { 
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575082/468185339_931536052403792_3120323499499149723_n_zp0ej5.jpg",
    alt: "Slide 1",
    titleKey: "carousel.slide1.title",
    subtitleKey: "carousel.slide1.subtitle"
  },
  { 
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756578818/5879927343848475497_f2vrqs.jpg",
    alt: "Slide 2",
    titleKey: "carousel.slide2.title",
    subtitleKey: "carousel.slide2.subtitle"
  },
  { 
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784154/WhatsApp_Image_2026-02-22_at_3.25.31_AM_cynsay.jpg",
    alt: "Slide 3",
    titleKey: "carousel.slide3.title",
    subtitleKey: "carousel.slide3.subtitle"
  },
  { 
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756578733/5879927343848475498_hbb6kj.jpg",
    alt: "Slide 4",
    titleKey: "carousel.slide4.title",
    subtitleKey: "carousel.slide4.subtitle"
  },
  { 
    src: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575014/468075933_931535155737215_2422425145619665420_n_r6ulp9.jpg",
    alt: "Slide 5",
    titleKey: "carousel.slide5.title",
    subtitleKey: "carousel.slide5.subtitle"
  },
];

const CustomCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  
  const handleBeforeChange = (from, to) => {
    setCurrentSlide(to);
  };
  
  const { t } = useTranslation();
  
  return (
    <div className="w-full relative">
      <div 
        className="relative w-full"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <Carousel
          autoplay
          autoplaySpeed={4000}
          dotPosition="bottom"
          effect="fade"
          className="w-full"
          beforeChange={handleBeforeChange}
          arrows={true}
          prevArrow={<LeftOutlined className="text-white text-2xl" />}
          nextArrow={<RightOutlined className="text-white text-2xl" />}
        >
          {images.map((image, index) => (
            <div key={index} className="relative">
              <div className="relative w-full h-[70vh] sm:h-[600px] overflow-hidden">
                {/* Image with Zoom Effect */}
                <img
                  src={image.src}
                  alt={image.alt}
                  className={`w-full h-full object-cover transition-transform duration-[8000ms] ${
                    isHovering ? "scale-110" : "scale-100"
                  }`}
                />
                
                {/* Gradient Overlay - Dark only */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                
                {/* Animated Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-32 z-20">
                  <div className="text-center transform transition-all duration-1000 translate-y-0 opacity-100">
                    {/* Title */}
                    <h3 className="text-4xl sm:text-6xl font-bold mb-4 text-white">
                      {t(image.titleKey)}
                    </h3>
                    
                    {/* Subtitle */}
                    <p className="text-xl sm:text-3xl text-gray-200 font-light mb-6">
                      {t(image.subtitleKey)}
                    </p>
                  </div>
                </div>
                
                {/* Slide Indicator - Only this one (top) */}
                <div className="absolute top-6 right-6 bg-black/50 px-4 py-2 rounded-full z-20">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    <span>{index + 1}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-300">{images.length}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Progress Bar - Removed completely */}
      </div>

      {/* Custom Styles for Ant Design Carousel */}
      <style jsx global>{`
        .ant-carousel .slick-dots-bottom {
          bottom: 30px;
          z-index: 30;
        }
        
        .ant-carousel .slick-dots li button {
          width: 12px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5) !important;
          border-radius: 4px;
          transition: all 0.3s ease;
        }
        
        .ant-carousel .slick-dots li.slick-active button {
          width: 30px;
          background: white !important;
        }
        
        .ant-carousel .slick-prev,
        .ant-carousel .slick-next {
          width: 50px;
          height: 50px;
          background: rgba(0, 0, 0, 0.5) !important;
          border-radius: 50%;
          z-index: 40;
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
          background: rgba(0, 0, 0, 0.8) !important;
          transform: scale(1.1);
        }
        
        .ant-carousel .slick-prev::before,
        .ant-carousel .slick-next::before {
          display: none;
        }
        
        .ant-carousel .slick-prev .anticon,
        .ant-carousel .slick-next .anticon {
          font-size: 24px;
          color: white;
        }
        
        .slick-slide {
          opacity: 0.5;
          transition: opacity 0.5s ease;
        }
        
        .slick-active {
          opacity: 1;
        }

        /* RTL Support for Arrows */
        [dir="rtl"] .ant-carousel .slick-prev {
          left: auto;
          right: 25px;
        }
        
        [dir="rtl"] .ant-carousel .slick-next {
          right: auto;
          left: 25px;
        }
      `}</style>
    </div>
  );
};

export default CustomCarousel;