import { useState, useMemo, useEffect } from "react";
import { HalfColoneData } from "../../data/HalfColon";
import { useTranslation } from "react-i18next";
import { 
  ShoppingBag, 
  CheckCircle, 
  Palette, 
  Ruler, 
  ChevronDown,
  Flower2,
  Sparkles,
  Heart,
  Package,
  Shirt,
  Layers,
  Gift
} from "lucide-react";
import { motion } from "framer-motion";
import { Select } from "antd";

function HalfOrderCollection({ selectedOffer, setOrder, formRef }) {
  const { t } = useTranslation();
  const count = selectedOffer?.quantity || 0;

  // فلترة المنتجات
  const halfProducts = HalfColoneData.filter(product => {
    return product.id === 1 || product.id === 2 || product.id === 3 || product.id === 4 || product.id === 5;
  });

  const initialPieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: "",
      color: "",
    }));
  }, [count]);

  const [pieces, setPieces] = useState(initialPieces);
  const [completedPieces, setCompletedPieces] = useState({});
  const [activeTab, setActiveTab] = useState("all");
  const [selectedSizes, setSelectedSizes] = useState({});

  // تغيير التبويب اتوماتيك حسب العرض
  useEffect(() => {
    if (selectedOffer?.tabType) {
      setActiveTab(selectedOffer.tabType);
    }
  }, [selectedOffer]);

  useEffect(() => {
    if (pieces.length > 0) {
      const resetPieces = pieces.map(p => ({
        id: p.id,
        name: "",
        color: "",
      }));
      setPieces(resetPieces);
      setSelectedSizes({});
    }
  }, [activeTab]);

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
    const product = HalfColoneData.find((item) => item.name === productName);
    return product ? product.avalibeColors : [];
  };

  const getAvailableSizes = (productName) => {
    const product = HalfColoneData.find((item) => item.name === productName);
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
    if (productName?.includes("هاف كولون")) return <Package className="w-8 h-8 text-blue-500" />;
    if (productName?.includes("بندانه")) return <Shirt className="w-8 h-8 text-blue-500" />;
    if (productName?.includes("طقم")) return <Layers className="w-8 h-8 text-blue-500" />;
    if (productName?.includes("تربون ورده")) return <Flower2 className="w-8 h-8 text-blue-500" />;
    return <ShoppingBag className="w-8 h-8 text-blue-500" />;
  };

  const completionPercentage = useMemo(() => {
    const completed = Object.values(completedPieces).filter(Boolean).length;
    return (completed / pieces.length) * 100;
  }, [completedPieces, pieces.length]);

  const filteredProducts = activeTab === "all" 
    ? halfProducts 
    : halfProducts.filter(p => {
        if (activeTab === "half") {
          return p.id === 1 || p.id === 2;
        }
        if (activeTab === "bandana") {
          return p.id === 3 || p.id === 5;
        }
        if (activeTab === "set") {
          return p.id === 4;
        }
        return true;
      });

  if (!selectedOffer || count === 0) {
    return (
      <div className="p-8 text-center">
        <div className="max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-2xl p-8 border-2 border-blue-200">
          <Package className="w-16 h-16 text-blue-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-700 mb-2">لم تختاري عرضاً بعد</h3>
          <p className="text-gray-500">اختاري أحد العروض أعلاه لتبدئي في اختيار منتجاتك</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8" id="halfOrderCollection">
      <div className="relative max-w-7xl mx-auto">
        {/* Decorative Background - changed to blue */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
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
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-xl opacity-30"></div>
              <div className="relative bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border-2 border-blue-200 shadow-xl">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-blue-500 animate-pulse" />
                  <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-500">
                    اختر منتجاتك ({pieces.length})
                  </h1>
                  <Gift className="w-5 h-5 text-blue-500 animate-pulse" />
                </div>
              </div>
            </motion.div>

            {/* Progress Bar */}
            <div className="max-w-md mx-auto">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>اكتمل</span>
                <span className="text-blue-500 font-bold">
                  {Object.values(completedPieces).filter(Boolean).length}/{pieces.length}
                </span>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"
                  style={{ width: `${completionPercentage}%` }}
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>

          {/* Tabs - changed to blue */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            <button
              type="button"
              onClick={() => setActiveTab("half")}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 text-xs ${
                activeTab === "half"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 border border-blue-200 hover:border-blue-300"
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              هاف كولون
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("bandana")}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 text-xs ${
                activeTab === "bandana"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 border border-blue-200 hover:border-blue-300"
              }`}
            >
              <Shirt className="w-3.5 h-3.5" />
              بندانات
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("set")}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1.5 text-xs ${
                activeTab === "set"
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/30"
                  : "bg-white text-gray-600 border border-blue-200 hover:border-blue-300"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              اطقم
            </button>
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
                        ? "border-blue-400 shadow-md shadow-blue-500/10" 
                        : "border-gray-100 hover:border-blue-200 hover:shadow-md"
                    }`}
                  >
                    {/* Piece Number Badge - changed to blue */}
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-md opacity-50"></div>
                        <div className="relative bg-gradient-to-r from-blue-400 to-blue-500 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-lg">
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

                    {/* Product Icon - changed to blue */}
                    <div className="flex justify-center mb-3">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full blur-xl opacity-30"></div>
                        <div className="relative w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                          {getProductIcon(piece.name)}
                        </div>
                      </div>
                    </div>

                    <h2 className="text-center text-sm font-bold mb-3 text-gray-800 border-b border-blue-100 pb-1">
                      منتج #{piece.id}
                    </h2>

                    <div className="space-y-4">

                      {/* Product Select */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          <ShoppingBag className="w-3.5 h-3.5 inline ml-1 text-blue-500" />
                          اختر المنتج
                        </label>

                        <Select
                          value={piece.name || undefined}
                          onChange={(value) => handleChange(piece.id, "name", value)}
                          placeholder="اختر المنتج"
                          className="w-full"
                          size="large"
                        >
                          {filteredProducts.map((product, idx) => (
                            <Option key={idx} value={product.name}>
                              {product.name}
                            </Option>
                          ))}
                        </Select>
                      </div>

                      {/* Color Select */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1.5">
                          <Palette className="w-3.5 h-3.5 inline ml-1 text-blue-500" />
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
                            <Ruler className="w-3.5 h-3.5 inline ml-1 text-blue-500" />
                            اختر المقاس
                          </label>

                          <Select
                            value={selectedSizes[piece.id] || undefined}
                            onChange={(value) => handleSizeChange(piece.id, value)}
                            placeholder="اختر المقاس"
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
                        className="mt-3 pt-3 border-t border-blue-100"
                      >
                        <p className="text-[10px] text-gray-500 mb-1.5 flex items-center gap-1">
                          <Heart className="w-2.5 h-2.5 text-blue-400" />
                          الألوان المتاحة:
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {colors.slice(0, 5).map((color, idx) => (
                            <div key={idx} className="group/color relative">
                              <div
                                className="w-5 h-5 rounded-full border-2 border-white shadow-sm cursor-pointer transition-transform hover:scale-110"
                                style={{ backgroundColor: getColorCode(color) }}
                              />
                              <span className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-blue-300 text-[9px] px-1.5 py-0.5 rounded opacity-0 group-hover/color:opacity-100 transition-opacity whitespace-nowrap">
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

          {/* Submit Button - changed to blue */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex justify-center items-center mt-8"
          >
            <button
              type="submit"
              className="relative bg-gradient-to-r from-pink-600 to-purple-700 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2"
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

export default HalfOrderCollection;