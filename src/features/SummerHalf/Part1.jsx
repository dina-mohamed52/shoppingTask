import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from "prop-types";
import {
  FireIcon,
  ShoppingBagIcon,
  EyeIcon,
  ClockIcon,
  ArrowRightIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';
import ProductModal from "../../ui/ProductModal"; // Add this import

export default function Part1({ onAddToCart, onViewProduct, HalfColoneData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });
  
  // Add state for modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const trendingProducts = HalfColoneData?.map(product => ({
    id: product.id,
    name: product.name,
    brand: product.name === "هاف كولون شبك" ? "هاف كولون" :
           product.name === "هاف كولون فيونكه" ? "هاف كولون فيونكه" :
           product.name === "بندانه" ? "بندانه صيفي" : "طقم كامل",
    price: product.price || 89,
    originalPrice: product.originalPrice || 149,
    discount: product.discount || 40,
    rating: product.rating || 4.8,
    reviews: product.reviews || 128,
    image: product.image,
    colors: product.avalibeColors || [],
    sizes: product.sizes || [],
    // Pass through the full product data for modal
    fullProduct: product
  })) || [];

  // Handle view product with modal
  const handleViewProduct = (product) => {
    // Prepare product data for modal
    const allUrls = product.fullProduct?.productColors?.map((c) => c.img) || [product.image];
    
    setSelectedProduct({
      ...product.fullProduct,
      previewImages: allUrls,
    });
    
    setOpenModal(true);
    
    // Call the original onViewProduct prop if provided
    if (onViewProduct) {
      onViewProduct(product);
    }
  };

  // تحديث عرض الحاوية
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    updateContainerWidth();
    window.addEventListener('resize', updateContainerWidth);
    return () => window.removeEventListener('resize', updateContainerWidth);
  }, []);

  const totalProducts = trendingProducts.length;
  const angleStep = 360 / totalProducts;

  // Auto rotation
  useEffect(() => {
    let interval;
    if (isAutoRotating && trendingProducts.length > 0) {
      interval = setInterval(() => {
        setRotation(prev => prev + angleStep);
        setActiveIndex(prev => (prev + 1) % trendingProducts.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating, trendingProducts.length, angleStep]);

  const handlePrev = () => {
    setIsAutoRotating(false);
    setRotation(prev => prev - angleStep);
    setActiveIndex(prev => (prev - 1 + totalProducts) % totalProducts);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    setRotation(prev => prev + angleStep);
    setActiveIndex(prev => (prev + 1) % totalProducts);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  // حجم البطاقة ثابت
  const cardWidth = 260;
  const cardHeight = 390;

  // حساب radius المناسب
  const radius = Math.min(containerWidth / 2.5, 350);
  
  const getCardStyle = (index) => {
    // الزاوية الحالية
    const currentAngle = (index * angleStep - rotation);
    const angleInRadians = currentAngle * (Math.PI / 180);
    
    // حساب الموضع
    const x = Math.sin(angleInRadians) * radius;
    const z = Math.cos(angleInRadians) * radius;
    
    // مقياس الحجم
    const normalizedZ = (z + radius) / (radius * 2);
    const scale = 0.65 + (normalizedZ * 0.25);
    
    // الشفافية - جميع البطاقات تبقى مرئية
    const opacity = 0.6 + (normalizedZ * 0.4);
    
    // ترتيب الطبقات
    const zIndex = Math.floor(normalizedZ * 50);
    
    // البطاقة النشطة
    const isActive = index === activeIndex;
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${scale})`,
      opacity: isActive ? 1 : opacity,
      zIndex: isActive ? 100 : zIndex,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      position: 'absolute',
      left: `calc(50% - ${cardWidth/2}px)`,
      top: '50%',
      marginTop: `-${cardHeight/2}px`,
      transformStyle: 'preserve-3d',
      pointerEvents: 'auto',
      visibility: 'visible',
    };
  };

  return (
    <div className="relative py-8 md:py-12 px-3 md:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-x-hidden min-h-screen">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-6 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full text-white text-xs md:text-sm font-medium mb-3 md:mb-4 shadow-lg">
              <FireIcon className="w-3 h-3 md:w-4 md:h-4" />
              <span>🔥 الأكثر طلباً اليوم</span>
            </div>
            
            <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400">
                حصرياً كولكشين صيف 2026
              </span>
            </h2>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-xs md:text-base px-4">
              جولة على أحدث تشكيلات الصيف - هاف كولون وبندانات عصرية
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-4 md:mt-6 inline-flex items-center gap-2 md:gap-4 bg-white/10 backdrop-blur-sm rounded-xl md:rounded-2xl px-3 md:px-6 py-1.5 md:py-3 shadow-lg border border-pink-500/30"
          >
            <div className="flex items-center gap-1 md:gap-2">
              <ClockIcon className="w-3 h-3 md:w-5 md:h-5 text-pink-400" />
              <span className="text-[10px] md:text-sm text-white font-medium">ينتهي خلال:</span>
            </div>
            <div className="flex gap-1 md:gap-3">
              {[
                { value: timeLeft.hours, label: "س" },
                { value: timeLeft.minutes, label: "د" },
                { value: timeLeft.seconds, label: "ث" }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-lg px-1.5 md:px-3 py-0.5 md:py-1 min-w-[30px] md:min-w-[50px]">
                    <span className="text-sm md:text-xl font-bold">{String(item.value).padStart(2, '0')}</span>
                  </div>
                  <span className="text-[8px] md:text-xs text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3D Carousel Section */}
        <div 
          ref={containerRef}
          className="relative h-[500px] md:h-[550px] overflow-visible"
          style={{ perspective: '1500px' }}
        >
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-[200] bg-black/50 backdrop-blur-sm rounded-full p-2 md:p-3 hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-pink-500/30"
          >
            <ChevronLeftIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>
          
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-[200] bg-black/50 backdrop-blur-sm rounded-full p-2 md:p-3 hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-pink-500/30"
          >
            <ChevronRightIcon className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </button>

          {/* 3D Container */}
          <div 
            className="relative w-full h-full overflow-visible"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {trendingProducts.map((product, index) => {
              const isActive = index === activeIndex;
              const style = getCardStyle(index);
              
              return (
                <div
                  key={product.id}
                  style={style}
                  className="cursor-pointer"
                  onClick={() => {
                    if (!isActive) {
                      setActiveIndex(index);
                      setIsAutoRotating(false);
                      setRotation(index * angleStep);
                      setTimeout(() => setIsAutoRotating(true), 5000);
                    }
                  }}
                >
                  <div className={`bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border backdrop-blur-sm w-full h-full flex flex-col transition-all duration-300 ${
                    isActive 
                      ? 'border-pink-500 shadow-pink-500/30 shadow-xl ring-1 ring-pink-500/50' 
                      : 'border-pink-500/30'
                  }`}>
                    {/* Product Image */}
                    <div className="relative h-48 md:h-52 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800 flex-shrink-0">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-3 md:p-4"
                      />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full w-7 h-7 md:w-9 md:h-9 flex items-center justify-center text-xs md:text-sm font-bold shadow-lg">
                        -{product.discount}%
                      </div>

                      {/* Active Badge */}
                      {isActive && (
                        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-2 py-1 text-[10px] md:text-xs font-bold shadow-lg flex items-center gap-1">
                          <SparklesIcon className="w-3 h-3" />
                          <span>رائج الآن</span>
                        </div>
                      )}
                    </div>

                    <div className="p-3 md:p-4 flex-1 flex flex-col">
                      <h3 className="font-bold text-white text-sm md:text-base mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-[10px] md:text-xs text-pink-400 font-semibold mb-2">{product.brand}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarSolidIcon key={i} className={`w-2.5 h-2.5 md:w-3 md:h-3 ${i < Math.floor(product.rating || 0) ? 'text-yellow-400' : 'text-gray-600'}`} />
                          ))}
                        </div>
                        <span className="text-[9px] md:text-[10px] text-gray-400">({product.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-1 md:gap-2 mb-3">
                        <span className="text-sm md:text-lg font-bold text-white">
                          {product.price} ج.م
                        </span>
                        <span className="text-[9px] md:text-xs text-gray-400 line-through">
                          {product.originalPrice} ج.م
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProduct(product);
                        }}
                        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-1.5 md:py-2 rounded-xl text-[11px] md:text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1 group mt-auto"
                      >
                        <EyeIcon className="w-3 h-3 md:w-4 md:h-4 transition-transform group-hover:scale-110" />
                        معاينة سريعة
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 md:w-56 md:h-56 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-6 md:mt-8">
          <div className="flex gap-1.5 md:gap-2">
            {trendingProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoRotating(false);
                  setRotation(idx * angleStep);
                  setActiveIndex(idx);
                  setTimeout(() => setIsAutoRotating(true), 5000);
                }}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? 'w-6 md:w-8 h-1.5 md:h-2 bg-gradient-to-r from-pink-500 to-pink-600'
                    : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-gray-600 hover:bg-pink-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          open={openModal}
          OnClose={() => setOpenModal(false)}
          product={selectedProduct}
        />
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.4;
          }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
}

Part1.propTypes = {
  onAddToCart: PropTypes.func,
  onViewProduct: PropTypes.func,
  HalfColoneData: PropTypes.array
};