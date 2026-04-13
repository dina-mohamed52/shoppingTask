import { Modal } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

function ProductModal({ product, open, OnClose }) {
  const [selectedImage, setSelectedImage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isImageReady, setIsImageReady] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const initialRenderRef = useRef(true);

  // إعادة تعيين الحالة عند فتح المودل
  useEffect(() => {
    if (open && product?.previewImages?.length > 0) {
      // تعطيل الأنيميشن أولاً
      setShouldAnimate(false);
      setIsImageReady(false);
      
      // تعيين الصورة
      setSelectedImage(product.previewImages[0]);
      setCurrentIndex(0);
      setIsZoomed(false);
      
      // تفعيل الأنيميشن بعد فترة قصيرة
      const timer = setTimeout(() => {
        setShouldAnimate(true);
        setIsImageReady(true);
      }, 50);
      
      return () => clearTimeout(timer);
    }
  }, [open, product]);

  // معالج back button
  useEffect(() => {
    if (!open) return;

    const handleBack = () => {
      OnClose();
    };

    window.addEventListener("popstate", handleBack);
    
    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [open, OnClose]);

  // إضافة history state عند الفتح
  useEffect(() => {
    if (open) {
      window.history.pushState({ modal: true }, "");
    }
  }, [open]);

  // منع scroll خلف المودل
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const handleNext = () => {
    if (product?.previewImages?.length > 0) {
      setIsImageReady(false);
      const nextIndex = (currentIndex + 1) % product.previewImages.length;
      setCurrentIndex(nextIndex);
      setSelectedImage(product.previewImages[nextIndex]);
      
      // إعادة تفعيل الصورة بعد تحميلها
      setTimeout(() => setIsImageReady(true), 50);
    }
  };

  const handlePrev = () => {
    if (product?.previewImages?.length > 0) {
      setIsImageReady(false);
      const prevIndex = (currentIndex - 1 + product.previewImages.length) % product.previewImages.length;
      setCurrentIndex(prevIndex);
      setSelectedImage(product.previewImages[prevIndex]);
      
      setTimeout(() => setIsImageReady(true), 50);
    }
  };

  const handleThumbnailClick = (img, index) => {
    setIsImageReady(false);
    setSelectedImage(img);
    setCurrentIndex(index);
    setTimeout(() => setIsImageReady(true), 50);
  };

  if (!product) return null;

  return (
    <Modal
      open={open}
      footer={null}
      onCancel={OnClose}
      centered
      width={1000}
      closeIcon={null}
      className="product-modal"
      destroyOnClose={false}
      maskClosable={true}
      transitionName=""
      maskTransitionName=""
    >
      <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl overflow-hidden">
        {/* Custom Close Button */}
        <button
          onClick={OnClose}
          className="absolute top-4 right-4 z-50 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-pink-500/30 group"
        >
          <X className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>

        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Left Side - Thumbnails */}
          <div className="order-2 lg:order-1 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto max-h-[500px] lg:w-24 px-2 lg:px-0 py-2 lg:py-0">
            {product.previewImages?.map((img, index) => (
              <div
                key={index}
                className="relative flex-shrink-0 cursor-pointer"
                onClick={() => handleThumbnailClick(img, index)}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg blur-md opacity-0 ${
                    selectedImage === img ? "opacity-30" : ""
                  } transition-opacity duration-300`}
                ></div>
                <img
                  src={img}
                  alt={`Thumbnail ${index}`}
                  className={`w-16 h-16 lg:w-20 lg:h-20 object-cover rounded-lg border-2 transition-all duration-300 ${
                    selectedImage === img
                      ? "border-pink-500 shadow-lg shadow-pink-500/20 scale-105"
                      : "border-gray-200 hover:border-pink-300"
                  }`}
                  loading="lazy"
                />
                {selectedImage === img && (
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full hidden lg:block"></div>
                )}
              </div>
            ))}
          </div>

          {/* Center - Main Image */}
          <div className="order-1 lg:order-2 flex-1 relative">
            {/* Image Container with Zoom Effect */}
            <div
              className={`relative rounded-2xl overflow-hidden 
                will-change-transform 
                bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl border border-gray-200 ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400 rounded-full filter blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-400 rounded-full filter blur-xl"></div>
              </div>

              <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden">
                <img
                  src={selectedImage}
                  alt="Product"
                  className={`w-full h-full object-contain transition-all duration-300 ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  style={{
                    transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onLoad={() => setIsImageReady(true)}
                />
                
                {/* Loading indicator */}
                {!isImageReady && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-100/90">
                    <div className="w-8 h-8 border-3 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>

              {/* Zoom Indicator */}
              <div className="absolute bottom-4 left-4 bg-gray-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-500/30 pointer-events-none">
                <ZoomIn className="w-4 h-4 text-pink-400" />
              </div>
            </div>

            {/* Navigation Arrows */}
            {product.previewImages?.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-pink-500/30 group z-10"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-pink-500/30 group z-10"
                >
                  <ChevronRight className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
              </>
            )}
          </div>

          {/* Right Side - Product Info */}
          <div className="order-3 lg:w-80 bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 border border-pink-500/30 shadow-2xl">
            {/* Product Name */}
            <h3 className="text-2xl font-bold text-white mb-2">
              {product.name}
            </h3>

            {/* Product Description */}
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              {product.description || "توصيف المنتج هنا"}
            </p>

            {/* Available Colors - Fixed spelling */}
            {(product.availableColors || product.avalibeColors) && (
              <div className="mb-6">
                <h4 className="text-pink-400 text-sm font-semibold mb-3 flex items-center gap-2">
                  <span className="w-1 h-4 bg-pink-500 rounded-full"></span>
                  الألوان المتاحة:
                </h4>
                <div className="flex flex-wrap gap-3">
                  {(product.availableColors || product.avalibeColors).map((color, index) => (
                    <div key={index} className="group/color relative">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow-lg cursor-pointer transition-all duration-300 hover:scale-110 hover:shadow-pink-500/50"
                        style={{ 
                          backgroundColor: getColorCode(color),
                          boxShadow: getColorCode(color) === '#FFFFFF' ? '0 0 0 1px #ccc, 0 2px 8px rgba(0,0,0,0.2)' : '0 2px 8px rgba(0,0,0,0.2)'
                        }}
                        title={color}
                      >
                        {getColorCode(color) === '#FFFFFF' && (
                          <div className="w-full h-full rounded-full border border-gray-300"></div>
                        )}
                      </div>
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-pink-300 text-xs px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 pointer-events-none">
                        {color}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price section if available */}
            {product.price && (
              <div className="mt-4 pt-4 border-t border-gray-800">
                <div className="text-2xl font-bold text-pink-400">
                  {product.price} {product.currency || 'ج.م'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .product-modal :global(.ant-modal-content) {
          background: transparent;
          box-shadow: none;
          border-radius: 2rem;
          overflow: hidden;
          padding: 0;
        }

        .product-modal :global(.ant-modal-body) {
          padding: 0;
        }

        .product-modal :global(.ant-modal-mask) {
          background-color: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(4px);
        }

        @media (max-width: 768px) {
          .product-modal :global(.ant-modal) {
            max-width: 95% !important;
            margin: 10px auto;
          }
          
          .product-modal :global(.ant-modal-content) {
            border-radius: 1rem;
          }
        }

        /* Custom Scrollbar */
        .overflow-y-auto::-webkit-scrollbar {
          width: 4px;
        }

        .overflow-y-auto::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }

        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #db2777);
          border-radius: 10px;
        }

        /* Loading spinner */
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin {
          animation: spin 0.8s linear infinite;
        }
        
        .border-3 {
          border-width: 3px;
        }
        
        .will-change-transform {
          will-change: transform;
        }
      `}</style>
    </Modal>
  );
}

// Helper function for color codes (improved)
const getColorCode = (colorName) => {
  if (!colorName) return "#CCCCCC";
  
  const normalized = colorName.trim().toLowerCase();

  const colorMap = {
    // Arabic
    "أبيض": "#FFFFFF",
    "أوف وايت": "#F8F8F0",
    "أسود": "#000000",
    "رمادي": "#808080",
    "روز": "#FFC0CB",
    "بينك": "#FF69B4",
    "كحلي": "#000080",
    "بيج": "#F5F5DC",
    "لبني": "#FDF5E6",
    "أصفر": "#FFD700",
    "موف": "#800080",
    "أحمر": "#FF0000",
    "لافندر": "#E6E6FA",
    "موف فاتح": "#E6E6FA",
    "أخضر": "#00FF00",
    "أزرق": "#0000FF",
    "برتقالي": "#FFA500",
    "بني": "#8B4513",
    "ذهبي": "#FFD700",
    "فضي": "#C0C0C0",
    "فيروزي": "#40E0D0",
    "خوخي": "#FFDAB9",
    "كريمي": "#FFFDD0",
    
    // English
    "white": "#FFFFFF",
    "off white": "#F8F8F0",
    "black": "#000000",
    "gray": "#808080",
    "grey": "#808080",
    "pink": "#FF69B4",
    "navy": "#000080",
    "beige": "#F5F5DC",
    "cream": "#FDF5E6",
    "yellow": "#FFD700",
    "purple": "#800080",
    "red": "#FF0000",
    "lavender": "#E6E6FA",
    "green": "#00FF00",
    "blue": "#0000FF",
    "orange": "#FFA500",
    "brown": "#8B4513",
    "gold": "#FFD700",
    "silver": "#C0C0C0",
    "turquoise": "#40E0D0",
    "peach": "#FFDAB9",
  };

  return colorMap[normalized] || colorMap[normalized.split(' ')[0]] || "#CCCCCC";
};

export default React.memo(ProductModal);