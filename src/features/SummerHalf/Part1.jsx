import { useState, useEffect } from "react";
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
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarSolidIcon } from '@heroicons/react/24/solid';

export default function Part1({ onAddToCart, onViewProduct, HalfColoneData }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [selectedColor, setSelectedColor] = useState({});
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59
  });

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
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Auto rotation
  useEffect(() => {
    let interval;
    if (isAutoRotating) {
      interval = setInterval(() => {
        setRotation(prev => prev + 72); // 360/5 = 72 degrees per step
        setActiveIndex(prev => (prev + 1) % trendingProducts.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoRotating]);

  // Transform HalfColoneData
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

  const totalProducts = trendingProducts.length;
  const angleStep = 360 / totalProducts;

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

  const getCardStyle = (index) => {
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

  const activeProduct = trendingProducts[activeIndex];

  return (
    <div className="relative py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden min-h-screen">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" />
        </div>
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className="absolute text-pink-400"
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
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full text-white text-sm font-medium mb-4 shadow-lg">
              <FireIcon className="w-4 h-4" />
              <span>🔥 الأكثر طلباً اليوم</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400">
               حصرياً كولكشين صيف 2026
              </span>
            </h2>
            
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              جولة على أحدث تشكيلات الصيف - هاف كولون وبندانات عصرية
            </p>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-3 md:gap-4 bg-white/10 backdrop-blur-sm rounded-2xl px-4 md:px-6 py-2 md:py-3 shadow-lg border border-pink-500/30"
          >
            <div className="flex items-center gap-1 md:gap-2">
              <ClockIcon className="w-4 h-4 md:w-5 md:h-5 text-pink-400" />
              <span className="text-xs md:text-sm text-white font-medium">ينتهي العرض خلال:</span>
            </div>
            <div className="flex gap-2 md:gap-3">
              {[
                { value: timeLeft.hours, label: "ساعات" },
                { value: timeLeft.minutes, label: "دقائق" },
                { value: timeLeft.seconds, label: "ثواني" }
              ].map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="bg-gradient-to-br from-pink-600 to-pink-700 text-white rounded-lg px-2 md:px-3 py-1 min-w-[40px] md:min-w-[50px]">
                    <span className="text-base md:text-xl font-bold">{String(item.value).padStart(2, '0')}</span>
                  </div>
                  <span className="text-[10px] md:text-xs text-gray-400">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* 3D Carousel */}
        <div className="relative h-[500px] md:h-[600px] perspective-1000">
          {/* Navigation Buttons */}
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

          {/* 3D Container */}
          <div className="absolute inset-0 flex items-center justify-center preserve-3d">
            {trendingProducts.map((product, index) => (
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
                    
                    {/* Discount Badge */}
                    <div className="absolute top-3 right-3 z-10 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold shadow-lg">
                      -{product.discount}%
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <h3 className="font-bold text-white text-base md:text-lg mb-1 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-pink-400 font-semibold mb-2">{product.brand}</p>

                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="mb-3">
                        <div className="flex gap-1 flex-wrap">
                          {product.colors.slice(0, 4).map((color, idx) => (
                            <button
                              key={idx}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedColor({ ...selectedColor, [product.id]: color });
                              }}
                              className={`w-5 h-5 rounded-full border-2 transition-all ${
                                selectedColor[product.id] === color 
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
                          <StarSolidIcon key={i} className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`} />
                        ))}
                      </div>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>

                    {/* Price */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-lg md:text-xl font-bold text-white">
                        {product.price} ج.م
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        {product.originalPrice} ج.م
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
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
                      {/* <button
                        onClick={(e) => {
                          e.stopPropagation();
                          const selectedData = {
                            ...product,
                            selectedColor: selectedColor[product.id]
                          };
                          onAddToCart?.(selectedData);
                        }}
                        className="flex-1 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white py-2 rounded-xl text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-1"
                      >
                        <ShoppingBagIcon className="w-4 h-4" />
                        شراء
                      </button> */}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Center Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl pointer-events-none" />
        </div>

       

        {/* Auto-rotate Indicator */}
        <div className="flex justify-center mt-8">
          <div className="flex gap-2">
            {trendingProducts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsAutoRotating(false);
                  const newRotation = idx * angleStep;
                  setRotation(newRotation);
                  setActiveIndex(idx);
                  setTimeout(() => setIsAutoRotating(true), 5000);
                }}
                className={`transition-all duration-300 rounded-full ${
                  activeIndex === idx
                    ? 'w-8 h-2 bg-gradient-to-r from-pink-500 to-pink-600'
                    : 'w-2 h-2 bg-gray-600 hover:bg-pink-400'
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
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <span>عرض جميع المنتجات</span>
            <ArrowRightIcon className="w-5 h-5" />
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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