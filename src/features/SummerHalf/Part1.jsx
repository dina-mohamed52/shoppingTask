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

export default function Part1({ onAddToCart, onViewProduct, HalfColoneData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [selectedColor, setSelectedColor] = useState({});
  const [mobileView, setMobileView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const autoScrollRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  // Check mobile view
  useEffect(() => {
    const checkMobile = () => {
      setMobileView(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    sizes: product.sizes || []
  })) || [];


  // Auto scroll for mobile
  useEffect(() => {
    if (mobileView && isAutoRotating && trendingProducts.length > 0) {
      autoScrollRef.current = setInterval(() => {
        setActiveIndex(prev => (prev + 1) % trendingProducts.length);
      }, 2000);
    }
    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [mobileView, isAutoRotating, trendingProducts.length]);

  // Auto rotation for desktop
  useEffect(() => {
    let interval;
    if (!mobileView && isAutoRotating && trendingProducts.length > 0) {
      interval = setInterval(() => {
        setRotation(prev => prev + 72);
        setActiveIndex(prev => (prev + 1) % trendingProducts.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [mobileView, isAutoRotating, trendingProducts.length]);

  // Transform HalfColoneData

  const totalProducts = trendingProducts.length;
  const angleStep = 360 / totalProducts;

  const handlePrev = () => {
    setIsAutoRotating(false);
    if (mobileView) {
      setActiveIndex(prev => (prev - 1 + totalProducts) % totalProducts);
    } else {
      setRotation(prev => prev - angleStep);
      setActiveIndex(prev => (prev - 1 + totalProducts) % totalProducts);
    }
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    if (mobileView) {
      setActiveIndex(prev => (prev + 1) % totalProducts);
    } else {
      setRotation(prev => prev + angleStep);
      setActiveIndex(prev => (prev + 1) % totalProducts);
    }
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoRotating(false);
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left
      handleNext();
    } else if (touchEnd - touchStart > 50) {
      // Swipe right
      handlePrev();
    }
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  const getCardStyle = (index) => {
    if (mobileView) {
      return {
        transform: `translateX(0px) translateZ(0px) scale(1)`,
        opacity: 1,
        zIndex: 1,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
      };
    }
    
    const angle = (index * angleStep - rotation) * (Math.PI / 180);
    const radius = 280;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;
    const scale = (z + radius) / (radius * 2);
    const opacity = (z + radius) / (radius * 1.5);
    const zIndex = Math.floor((z + radius) * 10);
    
    return {
      transform: `translateX(${x}px) translateZ(${z}px) scale(${0.7 + scale * 0.3})`,
      opacity: Math.max(0.3, opacity),
      zIndex,
      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
    };
  };

  // Create an array with duplicate products for infinite loop effect on mobile
  const getMobileProducts = () => {
    if (!mobileView) return trendingProducts;
    // Create a circular array for infinite effect
    const extended = [...trendingProducts, ...trendingProducts, ...trendingProducts];
    const startIndex = trendingProducts.length + activeIndex;
    return extended.slice(startIndex, startIndex + 3);
  };

  const mobileProducts = getMobileProducts();

  return (
    <div className="relative py-8 md:py-12 px-3 md:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden min-h-screen">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="absolute text-pink-400 hidden md:block"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 30 + 10}px`
            }}
          >
            {i % 3 === 0 ? '✨' : i % 3 === 1 ? '⭐' : '💫'}
          </motion.div>
        ))}
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
                {mobileView ? "كولكشين صيف 2026" : "حصرياً كولكشين صيف 2026"}
              </span>
            </h2>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-xs md:text-base px-4">
              {mobileView ? "هاف كولون وبندانات صيفية عصرية" : "جولة على أحدث تشكيلات الصيف - هاف كولون وبندانات عصرية"}
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

        {/* Carousel Section */}
        <div className="relative h-[450px] md:h-[600px] perspective-1000">
          {/* Navigation Buttons */}
          {!mobileView && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-pink-500/30"
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </button>
              
              <button
                onClick={handleNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-all duration-300 hover:scale-110 border border-pink-500/30"
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </button>
            </>
          )}

          {/* Mobile Navigation Arrows */}
          {mobileView && (
            <div className="absolute top-1/2 -translate-y-1/2 left-2 right-2 z-20 flex justify-between">
              <button
                onClick={handlePrev}
                className="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-all duration-300 border border-pink-500/30"
              >
                <ChevronLeftIcon className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleNext}
                className="bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-all duration-300 border border-pink-500/30"
              >
                <ChevronRightIcon className="w-5 h-5 text-white" />
              </button>
            </div>
          )}

          {/* Container */}
          <div 
            className={`absolute inset-0 flex items-center justify-center ${!mobileView ? 'preserve-3d' : ''}`}
            onTouchStart={mobileView ? handleTouchStart : undefined}
            onTouchMove={mobileView ? handleTouchMove : undefined}
            onTouchEnd={mobileView ? handleTouchEnd : undefined}
          >
            {mobileView ? (
              // Mobile horizontal scroll view
              <div className="w-full overflow-visible px-4">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.3 }}
                  className="w-full max-w-[320px] mx-auto"
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl mt-20 overflow-hidden shadow-2xl border border-pink-500/30 backdrop-blur-sm">
                    {/* Product Image */}
                    <div className="relative h-[20rem] overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                      <img
                        src={trendingProducts[activeIndex]?.image}
                        alt={trendingProducts[activeIndex]?.name}
                        className="w-full h-full object-cover p-3"
                      />
                      
                      {/* Discount Badge */}
                      <div className="absolute top-2 right-2 z-10 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg">
                        -{trendingProducts[activeIndex]?.discount}%
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-white text-base mb-1 line-clamp-2">
                        {trendingProducts[activeIndex]?.name}
                      </h3>
                      
                      <p className="text-xs text-pink-400 font-semibold mb-2">
                        {trendingProducts[activeIndex]?.brand}
                      </p>

                      {/* Colors */}
                      {trendingProducts[activeIndex]?.colors?.length > 0 && (
                        <div className="mb-3">
                          <div className="flex gap-1 flex-wrap">
                            {trendingProducts[activeIndex].colors.slice(0, 4).map((color, idx) => (
                              <button
                                key={idx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedColor({ 
                                    ...selectedColor, 
                                    [trendingProducts[activeIndex].id]: color 
                                  });
                                }}
                                className={`w-5 h-5 rounded-full border-2 transition-all ${
                                  selectedColor[trendingProducts[activeIndex].id] === color 
                                    ? 'border-pink-500 scale-110' 
                                    : 'border-gray-600'
                                }`}
                                style={{ 
                                  backgroundColor: 
                                    color === 'أبيض' ? '#ffffff' :
                                    color === 'أسود' ? '#000000' :
                                    color === 'بينك' ? '#ec4899' :
                                    color === 'أحمر' ? '#ef4444' :
                                    color === 'أصفر' ? '#eab308' :
                                    color === 'لافندر' ? '#a855f7' :
                                    color === 'موف' ? '#8b5cf6' :
                                    color === 'بيج' ? '#d4a574' : '#cbd5e1'
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <StarSolidIcon key={i} className={`w-3.5 h-3.5 ${i < Math.floor(trendingProducts[activeIndex]?.rating || 0) ? 'text-yellow-400' : 'text-gray-600'}`} />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">({trendingProducts[activeIndex]?.reviews})</span>
                      </div>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-xl font-bold text-white">
                          {trendingProducts[activeIndex]?.price} ج.م
                        </span>
                        <span className="text-xs text-gray-400 line-through">
                          {trendingProducts[activeIndex]?.originalPrice} ج.م
                        </span>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewProduct?.(trendingProducts[activeIndex])}
                          className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1"
                        >
                          <EyeIcon className="w-4 h-4" />
                          معاينة
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : (
              // Desktop 3D view
              trendingProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  style={getCardStyle(index)}
                  className="absolute w-[280px] md:w-[320px] cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-pink-500/30 backdrop-blur-sm">
                    {/* Product Image */}
                    <div className="relative h-64 md:h-72 overflow-hidden bg-gradient-to-br from-gray-700 to-gray-800">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain p-4"
                      />
                      
                      <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-lg">
                        -{product.discount}%
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="font-bold text-white text-base md:text-lg mb-1 line-clamp-2">
                        {product.name}
                      </h3>
                      <p className="text-xs text-pink-400 font-semibold mb-2">{product.brand}</p>

                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onViewProduct?.(product);
                          }}
                          className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1"
                        >
                          <EyeIcon className="w-4 h-4" />
                          معاينة
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>

          {/* Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 md:w-32 md:h-32 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl pointer-events-none" />
        </div>

        {/* Progress Indicators */}
        <div className="flex justify-center mt-6 md:mt-8">
          <div className="flex gap-1.5 md:gap-2">
            {trendingProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoRotating(false);
                  if (mobileView) {
                    setActiveIndex(idx);
                  } else {
                    const newRotation = idx * angleStep;
                    setRotation(newRotation);
                    setActiveIndex(idx);
                  }
                  if (autoScrollRef.current) {
                    clearInterval(autoScrollRef.current);
                  }
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

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8 md:mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-semibold text-sm md:text-base shadow-lg hover:shadow-xl transition-all"
          >
            <span>عرض جميع المنتجات</span>
            <ArrowRightIcon className="w-4 h-4 md:w-5 md:h-5" />
          </motion.button>
        </motion.div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
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