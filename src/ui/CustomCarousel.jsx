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
    <div className="w-full max-w-[98vw] mx-auto relative mt-24 sm:mt-6 px-2 sm:px-4">
      <div 
        className="relative group rounded-3xl overflow-hidden shadow-2xl"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute top-0 left-0 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-gray-500 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        <Carousel
          autoplay
          autoplaySpeed={4000}
          dotPosition="bottom"
          effect="fade"
          className="w-full"
          beforeChange={handleBeforeChange}
          arrows={true}
          prevArrow={<LeftOutlined className="text-pink-400 text-2xl" />}
          nextArrow={<RightOutlined className="text-pink-400 text-2xl" />}
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
                
                {/* Gradient Overlay - Pink & Gray */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-pink-500/20 to-transparent"></div>
                
                {/* Animated Text Overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-20 sm:pb-32 z-20">
                  <div className="text-center transform transition-all duration-1000 translate-y-0 opacity-100">
                    {/* Title with Animation */}
                    <h3 className="text-4xl sm:text-6xl font-bold mb-4 relative">
                      <span className="relative inline-block">
                        <span className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-600 blur-xl opacity-50"></span>
                        <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-pink-200 to-white animate-gradient-x">
                         {t(image.titleKey)}
                        </span>
                      </span>
                    </h3>
                    
                    {/* Subtitle with Animation */}
                    <p className="text-xl sm:text-3xl text-gray-200 font-light mb-6 relative">
                      <span className="relative inline-block">
                        <span className="absolute inset-0 bg-gray-900/50 blur-md"></span>
                        <span className="relative px-4 py-2">{t(image.subtitleKey)}</span>
                      </span>
                    </p>

                  
                  </div>
                </div>
                
                {/* Slide Indicator - Pink Themed */}
                <div className="absolute top-6 right-6 bg-gray-900/50 backdrop-blur-md px-4 py-2 rounded-full border border-pink-500/30 z-20">
                  <span className="text-white text-sm font-medium flex items-center gap-2">
                    <span className="text-pink-400">{index + 1}</span>
                    <span className="text-gray-400">/</span>
                    <span className="text-gray-300">{images.length}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </Carousel>

        {/* Progress Bar - Pink Themed */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-48 sm:w-64 h-1.5 bg-gray-700/50 rounded-full overflow-hidden z-20">
          <div 
            className="h-full bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 rounded-full transition-all duration-500 relative"
            style={{ width: `${((currentSlide + 1) / images.length) * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
          </div>
        </div>

        {/* Slide Counter */}
        <div className="absolute bottom-20 left-6 bg-gray-900/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-pink-500/30 z-20">
          <span className="text-xs text-pink-300 font-medium">
            {String(currentSlide + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>
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
          background: linear-gradient(90deg, #ec4899, #db2777) !important;
          box-shadow: 0 0 10px rgba(236, 72, 153, 0.5);
        }
        
        .ant-carousel .slick-prev,
        .ant-carousel .slick-next {
          width: 50px;
          height: 50px;
          background: rgba(31, 41, 55, 0.6) !important;
          backdrop-filter: blur(8px);
          border-radius: 50%;
          border: 1px solid rgba(236, 72, 153, 0.3);
          z-index: 40;
          opacity: 0;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
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
          background: rgba(236, 72, 153, 0.4) !important;
          border-color: #ec4899;
          transform: scale(1.1);
        }
        
        .ant-carousel .slick-prev::before,
        .ant-carousel .slick-next::before {
          display: none;
        }
        
        .ant-carousel .slick-prev .anticon,
        .ant-carousel .slick-next .anticon {
          font-size: 24px;
          color: #ec4899;
        }
        
        .slick-slide {
          opacity: 0.5;
          transition: opacity 0.5s ease;
        }
        
        .slick-active {
          opacity: 1;
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
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