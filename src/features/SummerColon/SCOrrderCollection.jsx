import { useState, useMemo, useEffect } from "react";
import { SummerColonData } from "../../data/SummerColon"; 
import { useTranslation } from "react-i18next";
import { 
  ShoppingBag, 
  CheckCircle, 
  Palette, 
  Ruler, 
  Sparkles,
  Heart,
  Gift,
  Droplet,
  Tag
} from "lucide-react";
import { motion } from "framer-motion";
import { Select } from "antd";

function SCOrderCollection({ selectedOffer, setOrder, formRef, scrollToOffers }) {
  const { t } = useTranslation();
  const count = selectedOffer?.value || selectedOffer?.count || 0;

  // كل منتجات الكولونات من غير فلتر
  const scProducts = SummerColonData;

  const initialPieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: "",
      color: "",
    }));
  }, [count]);

  const [pieces, setPieces] = useState(initialPieces);
  const [completedPieces, setCompletedPieces] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  // تحديث القطع المكتملة
  useEffect(() => {
    const completed = {};
    pieces.forEach(piece => {
      completed[piece.id] = !!(piece.name && piece.color && selectedSizes[piece.id]);
    });
    setCompletedPieces(completed);
  }, [pieces, selectedSizes]);

  if (pieces.length !== count) {
    setPieces(initialPieces);
  }

  const handleChange = (id, field, value) => {
    const updated = pieces.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setPieces(updated);
  };

  const handleSizeChange = (id, size) => {
    setSelectedSizes(prev => ({ ...prev, [id]: size }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const invalid = pieces.some((p) => !p.name || !p.color || !selectedSizes[p.id]);

    if (invalid) {
      alert("يرجى إكمال جميع البيانات (المنتج، اللون، المقاس)");
      return;
    }

    const orderWithSizes = pieces.map(piece => ({
      ...piece,
      size: selectedSizes[piece.id]
    }));
    setOrder(orderWithSizes);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getAvailableColors = (productName) => {
    const product = SummerColonData.find((item) => item.name === productName);
    return product ? product.avalibeColors : [];
  };

  const getAvailableSizes = (productName) => {
    const product = SummerColonData.find((item) => item.name === productName);
    return product ? product.sizes : [];
  };

  const getColorCode = (colorName) => {
    const colorMap = {
      "أبيض": "#FFFFFF",
      "أوف وايت": "#FDF5E6",
      "أسود": "#000000",
      "رمادي": "#808080",
      "روز": "#FFC0CB",
      "بينك": "#FF69B4",
      "كحلي": "#000080",
      "بيج": "#F5F5DC",
      "لبني": "#FDF5E6",
      "أحمر": "#FF0000",
      "كافيه": "#6F4E37",
      "أصفر": "#FFFF00",
      "موف": "#E0B0FF",
      "نبيتي": "#800020",
      "زيتي": "#556B2F",
      "تركواز": "#40E0D0",
      "لافندر": "#E6E6FA",
      default: "#CCCCCC"
    };
    return colorMap[colorName] || colorMap.default;
  };

  const getProductIcon = (productName) => {
    if (productName?.includes("كولون")) return <Droplet className="w-8 h-8 text-[#864e63]" />;
    return <ShoppingBag className="w-8 h-8 text-[#864e63]" />;
  };

  const completionPercentage = useMemo(() => {
    const completed = Object.values(completedPieces).filter(Boolean).length;
    return (completed / pieces.length) * 100;
  }, [completedPieces, pieces.length]);

  // دالة للسكرول لقسم العروض
  const handleGoToOffers = () => {
    if (scrollToOffers) {
      scrollToOffers();
    }
  };

  if (!selectedOffer || count === 0) {
    return (
      <div className="p-8 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-[#864e63]/20 shadow-xl"
        >
          {/* Animated Icon */}
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-[#864e63]/10 to-[#c6abff]/10 rounded-full flex items-center justify-center border-2 border-[#864e63]/30">
              <Droplet className="w-10 h-10 text-[#864e63] animate-pulse" />
            </div>
          </div>
          
          <h3 className="text-xl font-bold text-gray-800 mb-2">لم تختاري عرضاً بعد</h3>
          <p className="text-gray-500 text-sm mb-6">
            اختاري أحد العروض أعلاه لتبدئي في اختيار الكولونات المفضلة لكِ
          </p>
          
          <motion.button
            onClick={handleGoToOffers}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative bg-gradient-to-r from-[#864e63] to-[#c6abff] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-[#864e63]/30 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
          >
            <Tag className="w-4 h-4" />
            اختاري عرضك المناسب
            <Sparkles className="w-4 h-4" />
          </motion.button>
          
          {/* Decorative dots */}
          <div className="flex justify-center gap-1 mt-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.8, 0.3]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.2 
                }}
                className="w-1.5 h-1.5 rounded-full bg-[#864e63]/40"
              />
            ))}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8" id="scOrderCollection">
      <div className="relative max-w-7xl mx-auto">
        {/* Decorative Background - بألوان بينك وموف */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#864e63]/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#c6abff]/30 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          {/* Header with Progress */}
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative inline-block mb-4"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-[#864e63]/20 shadow-xl">
                <div className="flex items-center gap-3">
                  <Droplet className="w-5 h-5 text-[#864e63] animate-pulse" />
                  <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#864e63] to-[#c6abff]">
                    اختر كولوناتك ({pieces.length})
                  </h1>
                  <Gift className="w-5 h-5 text-[#864e63] animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>اكتمل</span>
                <span className="text-[#864e63] font-bold">
                  {Object.values(completedPieces).filter(Boolean).length}/{pieces.length}
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Pieces Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {pieces.map((piece, index) => {
              const colors = getAvailableColors(piece.name);
              const sizes = getAvailableSizes(piece.name);
              const isCompleted = piece.name && piece.color && selectedSizes[piece.id];
              
              return (
                <motion.div
                  key={piece.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  whileHover={{ y: -2 }}
                  className="group relative"
                >
                  <div
                    className={`relative bg-white/95 backdrop-blur-sm p-5 rounded-xl border transition-all duration-300 ${
                      isCompleted 
                        ? "border-[#864e63] shadow-md shadow-[#864e63]/10" 
                        : "border-gray-100 hover:border-[#864e63]/30 hover:shadow-md"
                    }`}
                  >
                    {/* Piece Number Badge - بألوان بينك */}
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full blur-md opacity-50"></div>
                        <div className="relative bg-gradient-to-r from-[#864e63] to-[#c6abff] text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-lg">
                          {piece.id}
                        </div>
                      </div>
                    </div>

                    {/* Completed Check */}
                    {isCompleted && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -left-2 z-10"
                      >
                        <div className="relative bg-green-400 text-white rounded-full p-0.5 shadow-md">
                          <CheckCircle className="w-4 h-4" />
                        </div>
                      </motion.div>
                    )}

                    {/* Product Icon - بألوان بينك */}
                    <div className="flex justify-center mb-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full blur-xl opacity-30"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-[#864e63]/10 to-[#c6abff]/10 rounded-xl flex items-center justify-center">
                          {getProductIcon(piece.name)}
                        </div>
                      </div>
                    </div>

                    <h2 className="text-center text-sm font-bold mb-3 text-gray-800 border-b border-[#864e63]/20 pb-1">
                      كولون #{piece.id}
                    </h2>

                    <div className="space-y-4">

                      {/* Product Select - كل الكولونات بدون فلتر */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 inline ml-1 text-[#864e63]" />
                          اختر الكولون
                        </label>

                        <Select
                          value={piece.name || undefined}
                          onChange={(value) => handleChange(piece.id, "name", value)}
                          placeholder="اختر الكولون"
                          className="w-full"
                          size="large"
                        >
                          {scProducts.map((product, idx) => (
                            <Option key={idx} value={product.name}>
                              {product.name}
                            </Option>
                          ))}
                        </Select>
                      </div>

                      {/* Color Select */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          <Palette className="w-3.5 h-3.5 inline ml-1 text-[#864e63]" />
                          اختر اللون
                        </label>

                        <Select
                          value={piece.color || undefined}
                          onChange={(value) => handleChange(piece.id, "color", value)}
                          placeholder="اختر اللون"
                          disabled={!piece.name}
                          className="w-full"
                          size="large"
                        >
                          {colors.map((color, idx) => (
                            <Option key={idx} value={color}>
                              {color}
                            </Option>
                          ))}
                        </Select>
                      </div>

                      {/* Size Select */}
                      {piece.name && (
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            <Ruler className="w-3.5 h-3.5 inline ml-1 text-[#864e63]" />
                            اختر الحجم
                          </label>

                          <Select
                            value={selectedSizes[piece.id] || undefined}
                            onChange={(value) => handleSizeChange(piece.id, value)}
                            placeholder="اختر الحجم"
                            className="w-full"
                            size="large"
                          >
                            {sizes.map((size, idx) => (
                              <Option key={idx} value={size.size}>
                                {size.size} - {size.age}
                              </Option>
                            ))}
                          </Select>
                        </div>
                      )}
                    </div>

                    {/* Quick Color Guide */}
                    {piece.name && colors.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-[#864e63]/20"
                      >
                        <p className="text-[10px] text-gray-500 mb-1.5 flex items-center gap-1">
                          <Heart className="w-2.5 h-2.5 text-[#864e63]" />
                          الألوان المتاحة:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {colors.slice(0, 5).map((color, idx) => (
                            <div key={idx} className="group/color relative">
                              <div
                                className="w-5 h-5 rounded-full border-2 border-white shadow-sm cursor-pointer transition-transform hover:scale-110"
                                style={{ backgroundColor: getColorCode(color) }}
                              />
                              <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover/color:opacity-100 transition-opacity whitespace-nowrap">
                                {color}
                              </span>
                            </div>
                          ))}
                          {colors.length > 5 && (
                            <span className="text-[9px] text-gray-400">+{colors.length - 5}</span>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Submit Button - بألوان بينك وموف */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center mt-8"
          >
            <button
              type="submit"
              className="relative bg-gradient-to-r from-[#864e63] to-[#c6abff] text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-[#864e63]/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              تأكيد الطلب
              <Sparkles className="w-4 h-4" />
            </button>
          </motion.div>
        </form>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default SCOrderCollection;