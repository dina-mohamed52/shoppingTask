import { Play, ChevronLeft, ChevronRight, Star, Sparkles } from "lucide-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SummerColonData } from "../../data/SummerColon";
import OfferButton from "../offer/OfferButton";

function SCHeroSec({ scrollToOffers, scrollToProducts }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 12,
    minutes: 48,
    seconds: 0,
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [rotation, setRotation] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs for touch handling
  const touchStartY = useRef(0);
  const touchStartX = useRef(0);
  const isScrollingVertical = useRef(false);
  const carouselContainerRef = useRef(null);

  // Products data for 360 carousel
  const products = SummerColonData;

  const [isInteracting, setIsInteracting] = useState(false);
  const autoRotateTimeout = useRef(null);

  // Check mobile on resize and mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const resetAutoRotate = () => {
    if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);

    setIsInteracting(true);
    setIsAutoRotating(false);

    autoRotateTimeout.current = setTimeout(() => {
      setIsInteracting(false);
      setIsAutoRotating(true);
    }, 3000);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return {
            ...prev,
            days: prev.days - 1,
            hours: 23,
            minutes: 59,
            seconds: 59,
          };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const totalProducts = products.length;
  const angleStep = 360 / totalProducts;

  // Auto rotation
  useEffect(() => {
    let interval;
    if (isAutoRotating && !isInteracting && totalProducts > 0) {
      interval = setInterval(
        () => {
          setRotation((prev) => prev + angleStep);
          setActiveIndex((prev) => (prev + 1) % totalProducts);
        },
        isMobile ? 4500 : 3000,
      );
    }
    return () => clearInterval(interval);
  }, [isAutoRotating, totalProducts, angleStep, isMobile]);

  const handlePrev = () => {
    resetAutoRotate();
    setRotation((prev) => prev - angleStep);
    setActiveIndex((prev) => (prev - 1 + totalProducts) % totalProducts);
  };

  const handleNext = () => {
    resetAutoRotate();
    setRotation((prev) => prev + angleStep);
    setActiveIndex((prev) => (prev + 1) % totalProducts);
  };

  // دوال السكرول
  const handleShopNow = () => {
    if (scrollToOffers) {
      scrollToOffers();
    }
  };

  const handleViewProducts = () => {
    if (scrollToProducts) {
      scrollToProducts();
    }
  };

  // Handle touch start - تحديد اتجاه السكرول
  const handleTouchStart = (e) => {
    touchStartY.current = e.touches[0].clientY;
    touchStartX.current = e.touches[0].clientX;
    isScrollingVertical.current = false;
  };

  // Handle touch move - منع تداخل الأفقي مع العمودي
  const handleTouchMove = (e) => {
    const deltaY = Math.abs(e.touches[0].clientY - touchStartY.current);
    const deltaX = Math.abs(e.touches[0].clientX - touchStartX.current);
    
    // إذا كان المستخدم يسكرول عمودي (أكثر من 10px)
    if (deltaY > 10 && deltaY > deltaX) {
      isScrollingVertical.current = true;
      return;
    }
    
    // إذا كان المستخدم يريد التنقل الأفقي (swipe left/right)
    if (deltaX > 10 && deltaX > deltaY && !isScrollingVertical.current) {
      e.preventDefault();
    }
  };

  // Handle touch end - التنقل بين المنتجات
  const handleTouchEnd = (e) => {
    if (isScrollingVertical.current) {
      return;
    }
    
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;
    
    // تجاهل الحركة إذا كانت عمودية أكثر من أفقية
    if (Math.abs(deltaY) > Math.abs(deltaX)) {
      return;
    }
    
    // Swipe left/right للتنقل بين المنتجات
    if (Math.abs(deltaX) > 40) {
      if (deltaX > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  const getCardStyle = useCallback(
    (index) => {
      const isMobileDevice = window.innerWidth < 768;
      // تكبير حجم الكارد في الموبيل
      const cardWidth = isMobileDevice ? 220 : 360;
      const cardHeight = isMobileDevice ? 320 : 390;

      let diff = index - activeIndex;
      const total = products.length;

      // infinite loop fix
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;

      const position = diff;

      let xPercent = 0;
      let scale = 0.7;
      let opacity = 0;
      let zIndex = 0;

      // حساب المواقع بالنسبة المئوية لتكون متجاوبة
      if (position === 0) {
        // CENTER
        xPercent = 0;
        scale = 1;
        opacity = 1;
        zIndex = 10;
      } else if (position === 1) {
        // RIGHT
        xPercent = isMobileDevice ? 95 : 55;
        scale = isMobileDevice ? 0.75 : 0.8;
        opacity = isMobileDevice ? 0.7 : 0.7;
        zIndex = 5;
      } else if (position === -1) {
        // LEFT
        xPercent = isMobileDevice ? -95 : -55;
        scale = isMobileDevice ? 0.75 : 0.85;
        opacity = isMobileDevice ? 0.7 : 0.7;
        zIndex = 5;
      } else if (position === 2) {
        xPercent = isMobileDevice ? 180 : 100;
        scale = 0.5;
        opacity = 0;
        zIndex = 0;
      } else if (position === -2) {
        xPercent = isMobileDevice ? -180 : -100;
        scale = 0.5;
        opacity = 0;
        zIndex = 0;
      } else {
        xPercent = position > 0 ? 280 : -280;
        scale = 0.3;
        opacity = 0;
        zIndex = 0;
      }

      return {
        transform: `translateX(${xPercent}%) translateY(-50%) scale(${scale})`,
        opacity,
        zIndex,
        transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        width: `${cardWidth}px`,
        height: `${cardHeight}px`,
        position: "absolute",
        left: "50%",
        top: "50%",
        marginLeft: `-${cardWidth / 2}px`,
        pointerEvents: position === 0 ? "auto" : "none",
      };
    },
    [activeIndex, products.length],
  );

  const timeUnits = [
    { value: timeLeft.days, label: "يوم" },
    { value: timeLeft.hours, label: "ساعة" },
    { value: timeLeft.minutes, label: "دقيقة" },
    { value: timeLeft.seconds, label: "ثانية" },
  ];

  return (
    <section
      className="relative min-h-screen overflow-hidden 
      bg-gradient-to-bl from-[#ff8c93]/10 to-[#ffff] mb-8 pt-6 md:pt-8"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 !bg-[#ff8c93]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 md:w-96 h-64 md:h-96 !bg-[#ac89ff]/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-gradient-to-r from-[#ff8c93]/5 to-[#ac89ff]/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Left Side - Content */}
          <div className="flex-1 text-center lg:text-right">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block px-3 md:px-4 py-1 md:py-1.5 rounded-full
                  glass-card bg-black/50 border border-white/5 
                  text-[#ff8c93] text-xs md:text-sm font-bold tracking-widest mb-4 md:mb-8"
              >
                مجموعة الصيف الفاخرة 2026
              </span>

              <h1
                className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl 
                  font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c93] to-[#ac89ff]
                  leading-tight mb-4 md:mb-6 font-headline tracking-tighter"
              >
                حصرياً كولكشن{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#ff8c93] to-[#ac89ff]">
                  صيف 2026
                </span>
              </h1>

              <p className="text-[#aba9bb] text-sm md:text-lg max-w-lg leading-relaxed mb-6 md:mb-12 mx-auto lg:mx-0">
                جولة على أحدث تشكيلات الصيف - كولونات صيفي عصرية بلمسة من الرقي
                والجودة العالمية
              </p>

              {/* Countdown Timer */}
              <div className="flex gap-1 md:gap-2 justify-center lg:justify-start mb-8 md:mb-12 flex-wrap">
                {timeUnits.map((unit, idx) => (
                  <React.Fragment key={unit.label}>
                    <div className="glass-card w-14 h-16 md:w-20 md:h-24 bg-black/50 rounded-lg flex flex-col items-center justify-center border border-white/5 shadow-[0px_0px_30px_rgba(255,140,147,0.1)]">
                      <span className="text-xl md:text-3xl font-bold text-white">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                      <span className="text-[8px] md:text-xs text-[#ff8c93] font-bold mt-1">
                        {unit.label}
                      </span>
                    </div>
                    {idx < timeUnits.length - 1 && (
                      <span className="text-xl md:text-2xl text-white/20 font-bold">
                        :
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-row gap-2 md:gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleShopNow}
                  className={`
                    px-5 md:px-8 py-2.5 md:py-4
                    bg-gradient-to-l from-[#ff8c93] to-[#e51245] text-white 
                    rounded-full font-bold text-sm md:text-lg 
                    shadow-[0px_8px_24px_rgba(255,140,147,0.3)] 
                    hover:scale-105 transition-transform 
                    whitespace-nowrap cursor-pointer
                    flex items-center justify-center gap-2
                  `}
                >
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white/80 animate-pulse" />
                  تسوق الآن
                  <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white/80 animate-pulse" />
                </button>
                <button
                  onClick={handleViewProducts}
                  className="px-5 md:px-8 py-2.5 md:py-4 glass-card bg-black/50
                    text-white border whitespace-nowrap hover:bg-black/10 transition-all 
                    flex items-center gap-2 cursor-pointer
                    border-white/10 rounded-full font-bold text-sm md:text-lg"
                >
                  <Play className="w-4 h-4 md:w-5 md:h-5" />
                  مشاهدة الكولونات
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Side - 360 Carousel */}
          <div className="flex-1 relative w-full mt-8 lg:mt-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* 3D Carousel Container */}
              <div
                ref={containerRef}
                className="relative w-full min-h-[450px] md:min-h-[550px] overflow-visible"
                style={{
                  perspective: isMobile ? "1000px" : "1200px",
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                {/* Navigation Buttons - Mobile friendly positioned */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 md:left-0 top-1/2 -translate-y-1/2 z-20 
                    w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-sm rounded-full 
                    flex items-center justify-center text-white hover:bg-[#ff8c93] 
                    transition-all duration-300 border border-white/10 shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-0 md:right-0 top-1/2 -translate-y-1/2 
                    z-20 w-10 h-10 md:w-12 md:h-12 bg-black/50 backdrop-blur-sm rounded-full
                    flex items-center justify-center text-white hover:bg-[#ff8c93] 
                    transition-all duration-300 border border-white/10 shadow-lg"
                >
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* 3D Container - Centered on mobile */}
                <div
                  ref={carouselContainerRef}
                  className="relative w-full h-[420px] md:h-[550px] overflow-visible"
                  style={{
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    touchAction: "pan-y pinch-zoom",
                  }}
                >
                  {products.map((product, index) => {
                    const isActive = index === activeIndex;
                    const style = getCardStyle(index);

                    return (
                      <div
                        key={product.id}
                        style={style}
                        className="cursor-pointer group"
                        onClick={() => {
                          if (!isActive) {
                            resetAutoRotate();
                            setActiveIndex(index);
                            setRotation(index * angleStep);
                          }
                        }}
                      >
                        <div
                          className={`bg-gradient-to-br from-gray-800/90 to-gray-900/90
                            rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border backdrop-blur-sm 
                            w-full h-full flex flex-col transition-all duration-300 ${
                              isActive
                                ? "border-[#ff8c93] shadow-[#ff8c93]/30 shadow-xl ring-1 ring-[#ff8c93]/50"
                                : "border-white/10"
                            }`}
                        >
                          {/* Product Image */}
                          <div
                            className="relative h-[65%] overflow-hidden 
                              bg-gradient-to-br from-gray-700 to-gray-800"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                              draggable="false"
                            />

                            {/* Discount Badge */}
                            <div className="absolute top-2 right-2 bg-gradient-to-r from-[#ff8c93] to-[#e51245] text-white rounded-full w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold shadow-lg">
                              -{product.discount}%
                            </div>

                            {/* Active Indicator */}
                            {isActive && (
                              <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-2 md:px-3 py-1 text-[10px] md:text-xs font-bold shadow-lg flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                <span>رائج</span>
                              </div>
                            )}
                          </div>

                          <div className="p-3 md:p-4 flex-1 flex flex-col">
                            <h3 className="font-bold text-white text-sm md:text-base mb-1 line-clamp-1">
                              {product.name}
                            </h3>

                            <p className="text-[10px] md:text-xs text-[#ff8c93] font-semibold mb-2">
                              {product.color}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-0.5 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 md:w-4 md:h-4 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                                />
                              ))}
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-1.5 mb-3">
                              <span className="text-sm md:text-base font-bold text-white">
                                {product.price} ج.م
                              </span>
                              <span className="text-[10px] md:text-xs text-gray-400 line-through">
                                {product.originalPrice} ج.م
                              </span>
                            </div>

                            {isActive && (
                              <button
                                onClick={handleShopNow}
                                className="w-full bg-gradient-to-r from-[#ff8c93] to-[#e51245] text-white py-2 md:py-2.5 rounded-lg text-xs md:text-sm font-semibold transition-all duration-300 hover:scale-105 mt-auto cursor-pointer"
                              >
                                شراء الآن
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Center Glow Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 md:w-32 md:h-32 bg-gradient-to-r from-[#ff8c93]/20 to-[#ac89ff]/20 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
                {products.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      resetAutoRotate();
                      setRotation(idx * angleStep);
                      setActiveIndex(idx);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      activeIndex === idx
                        ? "w-8 md:w-10 h-1.5 bg-gradient-to-r from-[#ff8c93] to-[#ac89ff]"
                        : "w-1.5 h-1.5 bg-gray-600 hover:bg-[#ff8c93]"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .glass-card {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}

export default SCHeroSec;