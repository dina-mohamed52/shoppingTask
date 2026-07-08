import { useTranslation } from "react-i18next";
import { Sparkles, ShoppingBag, Heart, Eye } from "lucide-react";
import { useState } from "react";

function ProductCard({ product, onPreview, onClick }) { 
  const { t, i18n } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const lang = i18n.language;

  // دالة لتحويل اسم اللون العربي إلى كود لون
  const getColorCode = (colorName) => {
    const colorMap = {
      أبيض: "#FFFFFF",
      أسود: "#000000",
      رمادي: "#9CA3AF",
      بيج: "#E8D5B5",
      لبني: "oklch(70.7% 0.165 254.624)",
      سكري: "#FFF0DB",
      عاجي: "#FFF0DB",
      بينك: "#FF69B4",
      وردي: "#FFB6C1",
      فوشيا: "#FF00FF",
      روز: "#FFC0CB",
      موف: "#C8A2C8",
      خوخي: "#FFDAB9",
      سلمون: "#FA8072",
      أحمر: "#FF4444",
      أصفر: "#FFD700",
      أخضر: "#98D8C8",
      نعناعي: "#A7F0D9",
      سماوي: "#87CEEB",
      كحلي: "#1E2F4F",
      نيلي: "#4B6A8B",
      كافيه: "#8B5E3C",
      بني: "#8B4513",
      بندقي: "#D2B48C",
      default: "#E5E7EB",
    };

    const extractedColor =
      Object.keys(colorMap).find((c) => colorName.includes(c)) || "default";

    return colorMap[extractedColor];
  };

  // دالة لتحديد نوع الوسم (New, Sale, etc.)
  const getBadgeType = () => {
    if (product.discount) {
      return { text: `${product.discount}%`, bg: "from-pink-500 to-pink-600" };
    }
    if (product.isNew) {
      return {
        text: lang === "ar" ? "جديد" : "New",
        bg: "from-pink-400 to-pink-500",
      };
    }
    return null;
  };

  const badge = getBadgeType();

  const handleCardClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  const handlePreviewClick = (e) => {
    e.stopPropagation();
    if (onPreview) {
      onPreview(product);
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  // تحديد الألوان المراد عرضها
  const displayColors = product.avalibeColors || [];
  const totalColors = displayColors.length;
  const maxDisplayColors = 4; // عدد الألوان المعروضة في الموبيل
  const showMore = totalColors > maxDisplayColors;
  const visibleColors = showMore ? displayColors.slice(0, maxDisplayColors) : displayColors;

  return (
    <div
      onClick={handleCardClick}
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all
       duration-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2 flex flex-col 
       border border-gray-100 cursor-pointer w-full max-w-[320px] sm:max-w-none mx-auto"
    >
      {/* Decorative Elements - hidden on mobile for performance */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden sm:block">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-300 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      {/* Image Container */}
      <div 
        onClick={handlePreviewClick}
        className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100"
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[200px] sm:h-[20rem] object-contain transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badge (Tag) - Adjusted for mobile */}
        {badge && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-md opacity-50 animate-pulse"></div>
            <span
              className={`relative bg-gradient-to-r ${badge.bg} text-white text-[10px] sm:text-xs font-bold px-2 sm:px-4 py-1 sm:py-1.5 rounded-full shadow-lg flex items-center gap-1`}
            >
              <Sparkles className="w-2 h-2 sm:w-3 sm:h-3" />
              {badge.text}
            </span>
          </div>
        )}

        {/* Quick Action Buttons - Always visible on mobile */}
        <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex flex-col gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 transform translate-x-0 sm:group-hover:translate-x-0">
          {/* Favorite Button */}
          <button
            onClick={handleLikeClick}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
          >
            <Heart
              className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors duration-300 ${
                isLiked ? "fill-pink-500 text-pink-500" : "text-gray-600"
              }`}
            />
          </button>

          {/* Quick View Button */}
          <button
            onClick={handlePreviewClick}
            className="w-8 h-8 sm:w-9 sm:h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 group/btn"
          >
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-600 group-hover/btn:text-pink-500 transition-colors" />
          </button>
        </div>

        {/* Product Info Overlay on Image - Hidden on mobile */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 hidden sm:block">
          <p className="text-white text-sm line-clamp-2">
            {lang === "ar" ? product.description : product.descriptionEn}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="relative p-3 sm:p-5 flex flex-col flex-grow bg-white z-10">
        {/* Product Name and Price */}
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <h3 className="font-bold text-gray-800 text-sm sm:text-lg line-clamp-2 sm:line-clamp-1 flex-1">
            {product.name}
          </h3>
        </div>

        {/* Available Colors */}
        {totalColors > 0 && (
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center gap-1 sm:gap-2 mb-1 sm:mb-2">
              <span className="text-[10px] sm:text-xs text-gray-500">
                {t("productCard.colors", "الألوان المتاحة")}:
              </span>
              <span className="text-[10px] sm:text-xs text-pink-500">
                {totalColors} لون
              </span>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-1.5 items-center">
              {visibleColors.map((color, idx) => {
                const colorCode = getColorCode(color);
                return (
                  <div key={idx} className="group/color relative">
                    <div
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-pink-500/50 active:scale-95"
                      style={{ backgroundColor: colorCode }}
                    ></div>
                    <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/color:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 hidden sm:block">
                      {color}
                    </span>
                  </div>
                );
              })}
              
              {/* عرض "+N" للموبيل فقط إذا كان هناك ألوان إضافية */}
              {showMore && (
                <div className="relative group/color">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white shadow-md flex items-center justify-center bg-gray-100 text-gray-700 text-[10px] sm:text-xs font-bold cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-pink-500/50 active:scale-95">
                    +{totalColors - maxDisplayColors}
                  </div>
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/color:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20 hidden sm:block">
                    {totalColors - maxDisplayColors} {lang === 'ar' ? 'لون إضافي' : 'more colors'}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Preview Button */}
        <button
          onClick={handlePreviewClick}
          className="relative mt-auto w-full py-2.5 sm:py-3 px-3 sm:px-4 rounded-xl font-semibold overflow-hidden group/btn transition-all duration-300 text-sm sm:text-base"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 group-hover/btn:from-pink-500 group-hover/btn:to-pink-600 transition-all duration-300"></div>
          <span className="relative z-10 flex items-center justify-center gap-2 text-white">
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            {t("productCard.preview")}
          </span>
          <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 hidden sm:block"></div>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;