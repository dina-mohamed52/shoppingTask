import { useTranslation } from "react-i18next";
import { Sparkles, ShoppingBag, Heart, Eye } from "lucide-react";
import { useState } from "react";

function ProductCard({ product, onPreview }) {
  const { t, i18n } = useTranslation();
  const [isLiked, setIsLiked] = useState(false);
  const lang = i18n.language;

  // دالة لتحويل اسم اللون العربي إلى كود لون
  const getColorCode = (colorName) => {
    const colorMap = {
      "أبيض": "#FFFFFF",
      "أسود": "#000000",
      "رمادي": "#808080",
      "روز": "#FFC0CB",
      "بينك": "#FF69B4",
      "كحلي": "#000030",
      "بيج": "#F5F5DC",
      "لبني": "#FDF5E6",
      default: "#CCCCCC"
    };
    return colorMap[colorName] || colorMap.default;
  };

  // دالة لتحديد نوع الوسم (New, Sale, etc.)
  const getBadgeType = () => {
    // إذا كان المنتج عليه خصم
    if (product.discount) {
      return { text: `${product.discount}%`, bg: "from-pink-500 to-pink-600" };
    }
    // إذا كان منتج جديد
    if (product.isNew) {
      return { text: lang === 'ar' ? "جديد" : "New", bg: "from-pink-400 to-pink-500" };
    }
    return null;
  };

  const badge = getBadgeType();

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-pink-500/20 hover:-translate-y-2 flex flex-col border border-gray-100">
      
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-300 rounded-full filter blur-3xl opacity-20"></div>
      </div>

      {/* Image Container */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[20rem] object-contain transition-transform duration-700 group-hover:scale-110"
        />

        {/* Badge (Tag) - Updated to Pink Theme */}
        {badge && (
          <div className="absolute top-3 left-3 z-10">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-md opacity-50 animate-pulse"></div>
            <span className={`relative bg-gradient-to-r ${badge.bg} text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg flex items-center gap-1`}>
              <Sparkles className="w-3 h-3" />
              {badge.text}
            </span>
          </div>
        )}

        {/* Quick Action Buttons - Appear on Hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-5 group-hover:translate-x-0">
          {/* Favorite Button */}
          <button
            onClick={() => setIsLiked(!isLiked)}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Heart 
              className={`w-4 h-4 transition-colors duration-300 ${
                isLiked ? "fill-pink-500 text-pink-500" : "text-gray-600"
              }`} 
            />
          </button>

          {/* Quick View Button */}
          <button
            onClick={() => onPreview(product)}
            className="w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group/btn"
          >
            <Eye className="w-4 h-4 text-gray-600 group-hover/btn:text-pink-500 transition-colors" />
          </button>
        </div>

        {/* Product Info Overlay on Image */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/70 via-gray-900/30 to-transparent p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white text-sm line-clamp-2">
            {lang === 'ar' ? product.description : product.descriptionEn}
          </p>
        </div>
      </div>

      {/* Product Details */}
      <div className="relative p-5 flex flex-col flex-grow bg-white z-10">
        {/* Product Name and Price */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-gray-800 text-lg line-clamp-1 flex-1">
            {product.name}
          </h3>
          
          {/* Price Tag */}
          <div className="flex items-center gap-1 bg-pink-50 px-2 py-1 rounded-full">
            <span className="text-pink-600 font-bold text-sm">
              {product.price || "150"}
            </span>
            <span className="text-gray-500 text-xs">ج.م</span>
          </div>
        </div>

        {/* Available Colors - من ملف الداتا */}
        {product.avalibeColors && product.avalibeColors.length > 0 && (
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500">{t("productCard.colors", "الألوان المتاحة")}:</span>
              <span className="text-xs text-pink-500">{product.avalibeColors.length} لون</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {product.avalibeColors.map((color, idx) => (
                <div
                  key={idx}
                  className="group/color relative"
                >
                  <div
                    className="w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-pink-500/50"
                    style={{ backgroundColor: getColorCode(color) }}
                  ></div>
                  {/* Tooltip for color name */}
                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-pink-300 text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/color:opacity-100 transition-opacity duration-300 whitespace-nowrap z-20">
                    {color}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Preview Button */}
        <button
          onClick={() => onPreview(product)}
          className="relative mt-auto w-full py-3 px-4 rounded-xl font-semibold overflow-hidden group/btn transition-all duration-300"
        >
          {/* Button Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 group-hover/btn:from-pink-500 group-hover/btn:to-pink-600 transition-all duration-300"></div>
          
          {/* Button Content */}
          <span className="relative z-10 flex items-center justify-center gap-2 text-white">
            <ShoppingBag className="w-4 h-4" />
            {t("productCard.preview")}
          </span>

          {/* Shine Effect */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
        </button>
      </div>
    </div>
  );
}

export default ProductCard;