import { Play, ChevronLeft, ChevronRight, Star } from "lucide-react";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SummerColonData } from "../../data/SummerColon";

function SCHeroSec() {
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

  // Products data for 360 carousel
  const products = SummerColonData;

  const [isInteracting, setIsInteracting] = useState(false);
  const autoRotateTimeout = useRef(null);

  const resetAutoRotate = () => {
    if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);

    setIsInteracting(true);
    setIsAutoRotating(false);

    autoRotateTimeout.current = setTimeout(() => {
      setIsInteracting(false);
      setIsAutoRotating(true);
    }, 4000);
  };
  const startX = useRef(0);

  const handleTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX.current - endX;

    if (Math.abs(diff) > 40) {
      resetAutoRotate();

      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
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

  // Update container width
  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  const totalProducts = products.length;
  const angleStep = 360 / totalProducts;
  const isMobile = containerWidth < 768;
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
    setIsAutoRotating(false);
    setRotation((prev) => prev - angleStep);
    setActiveIndex((prev) => (prev - 1 + totalProducts) % totalProducts);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

  const handleNext = () => {
    setIsAutoRotating(false);
    setRotation((prev) => prev + angleStep);
    setActiveIndex((prev) => (prev + 1) % totalProducts);
    setTimeout(() => setIsAutoRotating(true), 5000);
  };

 const getCardStyle = useCallback(
  (index) => {
    const isMobile = window.innerWidth < 768;

    const cardWidth = isMobile ? 160 : 360;
    const cardHeight = isMobile ? 160 : 390;

    let diff = index - activeIndex;

    const total = products.length;

    // infinite loop fix
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    const position = diff;

    let x = 0;
    let scale = 0.7;
    let opacity = 0;
    let zIndex = 0;

    if (position === 0) {
      // CENTER (مظبوط في النص)
      x = isMobile ? 0 : 0;
      scale = 1;
      opacity = 1;
      zIndex = 10;
    } 
    else if (position === 1) {
      // RIGHT
      x = isMobile ? 100 : 200;
      scale = 0.8;
      opacity = 0.7;
      zIndex = 5;
    } 
    else if (position === -1) {
      // LEFT (هنزود شوية يمين زي ما طلبتي)
      x = isMobile ? -80 : -200;
      scale = 0.85;
      opacity = 0.7;
      zIndex = 5;
    } 
    else {
      x = position > 0 ? 400 : -400;
      scale = 0.5;
      opacity = 0;
      zIndex = 0;
    }

    return {
      transform: `translateX(${x}px) scale(${scale})`,
      opacity,
      zIndex,
      transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
      width: `${cardWidth}px`,
      height: `${cardHeight}px`,
      position: "absolute",
      left: "50%",
      top: "50%",
      marginTop: `-${cardHeight / 2}px`,
      marginLeft: `-${cardWidth / 2.5}px`,
      pointerEvents: position === 0 ? "auto" : "none",
    };
  },
  [containerWidth, activeIndex, products.length]
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
    self-start 
    bg-gradient-to-bl from-[#ff8c93]/10 to-[#ffff] mb-8 sm:pt-1 pt-8"
    >
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff8c93]/20 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ac89ff]/20 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#ff8c93]/5 to-[#ac89ff]/5 blur-[100px] rounded-full"></div>
      </div>

      <div className="relative z-10 max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center ">
          {/* Left Side - Content */}
          <div className="flex-1 text-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span
                className="inline-block px-4 py-1.5 rounded-full
               glass-card bg-black/50 border border-white/5 
               text-[#ff8c93] text-sm font-bold tracking-widest mb-8"
              >
                مجموعة الصيف الفاخرة 2026
              </span>

              <h1
                className="text-6xl md:text-7xl lg:text-8xl 
              font-black text-white leading-tight mb-6 font-headline  tracking-tighter"
              >
                حصرياً كولكشن{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-[#ff8c93] to-[#ac89ff]">
                  صيف 2026
                </span>
              </h1>

              <p className="text-[#aba9bb] text-lg md:text-xl max-w-lg leading-relaxed mb-12">
                جولة على أحدث تشكيلات الصيف - كولونات صيفي عصرية بلمسة من الرقي
                والجودة العالمية
              </p>

              {/* Countdown Timer */}
              <div className="flex gap-2 justify-center mb-12 flex-wrap">
                {timeUnits.map((unit, idx) => (
                  <React.Fragment key={unit.label}>
                    <div className="glass-card w-16 h-20 md:w-20 md:h-24 bg-black/50 rounded-lg flex flex-col items-center justify-center border border-white/5 shadow-[0px_0px_30px_rgba(255,140,147,0.1)]">
                      <span className="text-2xl md:text-3xl font-bold text-white">
                        {String(unit.value).padStart(2, "0")}
                      </span>
                      <span className="text-[10px] md:text-xs text-[#ff8c93] font-bold mt-1">
                        {unit.label}
                      </span>
                    </div>
                    {idx < timeUnits.length - 1 && (
                      <span className="text-2xl text-white/20 font-bold">
                        :
                      </span>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="flex flex-row gap-4 justify-center">
                <button className="sm:px-8 px-10 py-4 bg-gradient-to-l from-[#ff8c93] to-[#e51245] text-black 
                rounded-full font-bold text-sm sm:text-lg shadow-[0px_8px_24px_rgba(255,140,147,0.3)] hover:scale-105
                 transition-transform whitespace-nowrap">
                  تسوق الآن
                </button>
                <button className="px-8 py-4 glass-card bg-black/50
                 text-white border whitespace-nowrap border-white/10 rounded-full font-bold text-md md:text-lg hover:bg-white/10 transition-all flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  مشاهدة الكولونات
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Side - 360 Carousel */}
          <div className="flex-1 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              {/* 3D Carousel Container */}
              <div
                ref={containerRef}
                className="relative  flex gap-10 h-[500px] md:h-[600px] overflow-visible"
                style={{
                  perspective: containerWidth < 768 ? "1200px" : "1500px",
                }}
              >
                {/* Navigation Buttons */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 sm:right-[99%] right-[10rem]  sm:top-1/2
                  top-2/3
                   -translate-y-1/2 z-20 w-10 h-10 bg-black/50
                    backdrop-blur-sm rounded-full flex items-center
                     justify-center text-white hover:bg-[#ff8c93] 
                     transition-all duration-300 border border-white/10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute sm:right-0 sm:top-1/2 
                  sm:left-0 left-[10rem]  
                  top-2/3
                  -translate-y-1/2
                   z-20 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full
                    flex items-center justify-center text-white hover:bg-[#ff8c93] transition-all duration-300 border border-white/10"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* 3D Container */}
                <div
                  className="relative w-full h-full overflow-visible sm:mt-24 mt-0 sm:mr-48 mr-0 "
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                  style={{
                    transformStyle: "preserve-3d",
                    WebkitTransformStyle: "preserve-3d",
                    touchAction: "pan-x pinch-zoom", // تحسين اللمس
                  }}
                >
                  {products.map((product, index) => {
                    const isActive = index === activeIndex;
                    const style = getCardStyle(index);

                    return (
                      <div
                        key={product.id}
                        style={style}
                        className="cursor-pointer group  "
                        onClick={() => {
                          if (!isActive) {
                            setIsAutoRotating(false);
                            setActiveIndex(index);
                            setRotation(index * angleStep);
                            setTimeout(() => setIsAutoRotating(true), 5000);
                          }
                        }}
                        onTouchStart={(e) => {
                          // تحسين التفاعل باللمس
                          e.stopPropagation();
                        }}
                      >
                        <div
                          className={`bg-gradient-to-br from-gray-800/90 to-gray-900/90
         rounded-2xl overflow-hidden shadow-2xl border backdrop-blur-sm 
         sm:w-[16rem] w-[13rem] sm:h-[25rem] h-[22rem] sm:mt-[-5rem] mt-0
        
         flex flex-col transition-all duration-300 ${
           isActive
             ? "border-[#ff8c93] shadow-[#ff8c93]/30 shadow-xl ring-1 ring-[#ff8c93]/50 scale-105"
             : "border-white/10"
         }`}
                        >
                          {/* Product Image */}
                          <div
                            className="relative h-[15rem] overflow-hidden 
           bg-gradient-to-br from-gray-700 to-gray-800"
                          >
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full 
              object-cover group-hover:scale-110 transition-transform duration-500"
                              loading="lazy"
                              draggable="false"
                            />

                            {/* Discount Badge */}
                            <div className="absolute top-2 right-2 bg-gradient-to-r from-[#ff8c93] to-[#e51245] text-white rounded-full w-8 h-8 flex items-center justify-center text-xs font-bold shadow-lg">
                              -{product.discount}%
                            </div>

                            {/* Active Indicator */}
                            {isActive && (
                              <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full px-2 py-1 text-[10px] font-bold shadow-lg flex items-center gap-1">
                                <span className="text-yellow-400">★</span>
                                <span>رائج</span>
                              </div>
                            )}
                          </div>

                          <div className="p-3 flex-1 flex flex-col">
                            <h3 className="font-bold text-white text-sm mb-1 line-clamp-1">
                              {product.name}
                            </h3>

                            <p className="text-[10px] text-[#ff8c93] font-semibold mb-2">
                              {product.color}
                            </p>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-3 h-3 ${i < product.rating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Price */}
                            <div className="flex items-baseline gap-1 mb-3">
                              <span className="text-sm font-bold text-white">
                                {product.price} ج.م
                              </span>
                              <span className="text-[10px] text-gray-400 line-through">
                                {product.originalPrice} ج.م
                              </span>
                            </div>

                            {isActive && (
                              <button className="w-full bg-gradient-to-r from-[#ff8c93] to-[#e51245] text-white py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 hover:scale-105 mt-auto">
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
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-[#ff8c93]/20 to-[#ac89ff]/20 rounded-full blur-2xl pointer-events-none" />
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-8">
                {products.map((_, idx) => (
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
                        ? "w-8 h-1.5 bg-gradient-to-r from-[#ff8c93] to-[#ac89ff]"
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

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .glass-card {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }
      `}</style>
    </section>
  );
}

export default SCHeroSec;
