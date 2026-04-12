import { Modal } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Heart, Eye, ZoomIn } from "lucide-react";

function ProductModal({ product, open, OnClose }) {
  // const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    product?.previewImages?.[0] || "",
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  // useEffect للصور فقط
useEffect(() => {
  if (product?.previewImages?.length) {
    product.previewImages.forEach((img) => {
      const image = new Image();
      image.src = img;
    });
  }
}, [product]);
  // useEffect للـ back button
  useEffect(() => {
    if (!open) return;

    const handleBack = () => {
      OnClose();
    };

    window.addEventListener("popstate", handleBack);

    return () => {
      window.removeEventListener("popstate", handleBack);
    };
  }, [open]);

  // useEffect منفصل لإضافة history state عند الفتح
  useEffect(() => {
    if (open) {
      window.history.pushState({ modal: true }, "");
    }
  }, [open]);

  const handleNext = () => {
    if (product?.previewImages) {
      const nextIndex = (currentIndex + 1) % product.previewImages.length;
      setCurrentIndex(nextIndex);
      setSelectedImage(product.previewImages[nextIndex]);
    }
  };

  const handlePrev = () => {
    if (product?.previewImages) {
      const prevIndex =
        (currentIndex - 1 + product.previewImages.length) %
        product.previewImages.length;
      setCurrentIndex(prevIndex);
      setSelectedImage(product.previewImages[prevIndex]);
    }
  };

  const handleThumbnailClick = (img, index) => {
    console.log("Thumbnail clicked:", img, index); // للتأكد من أن الحدث شغال
    setSelectedImage(img);
    setCurrentIndex(index);
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
      destroyOnClose
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
                />
                {/* Active Indicator */}
                {selectedImage === img && (
                  <div className="absolute -right-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-pink-500 to-pink-600 rounded-full"></div>
                )}
              </div>
            ))}
          </div>

          {/* Center - Main Image */}
          <div className="order-1 lg:order-2 flex-1 relative">
            {/* Image Container with Zoom Effect */}
            <motion.div
              className={`relative rounded-2xl overflow-hidden 
                will-change-transform 
                bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl border border-gray-200 ${
                  isZoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
              onClick={() => setIsZoomed(!isZoomed)}
              animate={{ scale: isZoomed ? 1.2 : 1 }}
              transition={{ duration: 0.3 }}
             
              style={{ originX: 0.5, originY: 0.5 }}
            >
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-32 h-32 bg-pink-400 rounded-full filter blur-xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-400 rounded-full filter blur-xl"></div>
              </div>

              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  src={selectedImage}
                  alt="Selected"
                  initial={
                    isFirstMount.current ? false : { opacity: 0, scale: 0.9 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                 transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
                  className="w-full h-[400px] lg:h-[500px] object-contain"
                  loading="eager"
  decoding="async"
  draggable={false}
                />
              </AnimatePresence>

              {/* Zoom Indicator */}
              <div className="absolute bottom-4 left-4 bg-gray-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full border border-pink-500/30">
                <ZoomIn className="w-4 h-4 text-pink-400" />
              </div>
            </motion.div>

            {/* Navigation Arrows */}
            {product.previewImages?.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-pink-500/30 group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-gray-900/80 backdrop-blur-sm rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-pink-500/30 group"
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
            <p className="text-gray-400 text-sm mb-6">
              {product.description || "توصيف المنتج هنا"}
            </p>

            {/* Available Colors */}
            {product.avalibeColors && (
              <div className="mb-6">
                <h4 className="text-pink-400 text-sm font-semibold mb-3">
                  الألوان المتاحة:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {product.avalibeColors.map((color, index) => (
                    <div key={index} className="group/color relative">
                      <div
                        className="w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-pink-500/50"
                        style={{ backgroundColor: getColorCode(color) }}
                      ></div>
                      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-pink-300 text-xs px-2 py-1 rounded opacity-0 group-hover/color:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                        {color}
                      </span>
                    </div>
                  ))}
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
        }

        .product-modal :global(.ant-modal-body) {
          padding: 0;
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

        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f472b6, #ec4899);
        }
      `}</style>
    </Modal>
  );
}

// Helper function for color codes
const getColorCode = (colorName) => {
  const normalized = colorName?.trim().toLowerCase();

  const colorMap = {
    // عربي
    أبيض: "#FFFFFF",
    "أوف وايت": "#F8F8F0",
    أسود: "#000000",
    رمادي: "#808080",
    روز: "#FFC0CB",
    بينك: "#FF69B4",
    كحلي: "#000080",
    بيج: "#F5F5DF",
    لبني: "#ADD8E6",
    أصفر: "#FFD700",
    موف: "#800080",
    أحمر: "#FF0000",
    احمر: "#FF0000",
     "لافندر": "#E6E6FA",
    "lavender": "#E6E6FA",
    "موف فاتح": "#E6E6FA",

    // English fallback
    white: "#FFFFFF",
    "off white": "#F8F8F0",
    black: "#000000",
    gray: "#808080",
    pink: "#FF69B4",
    navy: "#000080",
    beige: "#F5F5DC",
    "light blue": "#ADD8E6",
    yellow: "#FFD700",
    purple: "#800080",
  };

  return colorMap[normalized] || "#CCCCCC";
};

export default React.memo(ProductModal);
