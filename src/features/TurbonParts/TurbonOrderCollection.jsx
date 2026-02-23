import { useState, useMemo, useEffect } from "react";
import { Data } from "../../data/Data";
import { useTranslation } from "react-i18next";
import { 
  ShoppingBag, 
  CheckCircle, 
  Package, 
  Palette, 
  Ruler, 
  ChevronDown, 
  ChevronUp,
  Ribbon,
  Flower2,
  Sparkles,
  Heart
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function TurbonOrderCollection({ selectedOffer, setOrder, formRef }) {
  const { t } = useTranslation();
  const count = selectedOffer?.value || 0;

  // فلترة التربونات فقط (id 9 و 10)
  const turbonProducts = Data.filter(product => product.id === 9 || product.id === 10);

  const initialPieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: "",
      color: "",
      // size is removed since it's one size
    }));
  }, [count]);

  const [pieces, setPieces] = useState(initialPieces);
  const [completedPieces, setCompletedPieces] = useState({});
  const [openDropdown, setOpenDropdown] = useState({ type: null, id: null });
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    // تحديث حالة القطع المكتملة - بدون size
    const completed = {};
    pieces.forEach(piece => {
      completed[piece.id] = !!(piece.name && piece.color);
    });
    setCompletedPieces(completed);
  }, [pieces]);

  if (pieces.length !== count) {
    setPieces(initialPieces);
  }

  const handleChange = (id, field, value) => {
    const updated = pieces.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setPieces(updated);
    setOrder(updated);
    setOpenDropdown({ type: null, id: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // بدون size
    const invalid = pieces.some((p) => !p.name || !p.color);

    if (invalid) {
      alert(t("orderCollection.alert", "يرجى إكمال جميع البيانات"));
      return;
    }

    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getAvailableColors = (productName) => {
    const product = Data.find((item) => item.name === productName);
    return product ? product.avalibeColors : [];
  };

  // دالة لتحويل اسم اللون العربي إلى كود لون
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
      default: "#CCCCCC"
    };
    return colorMap[colorName] || colorMap.default;
  };

  // حساب نسبة الإكتمال - بدون size
  const completionPercentage = useMemo(() => {
    const completed = Object.values(completedPieces).filter(Boolean).length;
    return (completed / pieces.length) * 100;
  }, [completedPieces, pieces.length]);

  // فلترة المنتجات حسب التبويب المختار
  const filteredProducts = activeTab === "all" 
    ? turbonProducts 
    : turbonProducts.filter(p => p.id === (activeTab === "bow" ? 9 : 10));

  // Custom Dropdown Component
  const CustomDropdown = ({ 
    id, 
    field, 
    value, 
    options, 
    placeholder, 
    icon: Icon,
    disabled = false,
    getOptionLabel = (opt) => opt,
    getOptionValue = (opt) => opt,
    renderOption = null
  }) => {
    const isOpen = openDropdown.type === field && openDropdown.id === id;
    const selectedOption = options.find(opt => getOptionValue(opt) === value);

    const toggleDropdown = () => {
      if (disabled) return;
      setOpenDropdown(isOpen ? { type: null, id: null } : { type: field, id });
    };

    const handleSelect = (optionValue) => {
      handleChange(id, field, optionValue);
    };

    return (
      <div className="relative w-full">
        {/* Dropdown Button */}
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={disabled}
          className={`w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${
            isOpen 
              ? "border-pink-500 bg-white/90 shadow-lg shadow-pink-500/20" 
              : value
                ? "border-pink-500/50 bg-white/80 hover:border-pink-500"
                : "border-gray-200 bg-white/50 hover:border-gray-300"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${value ? "text-pink-500" : "text-gray-400"}`} />
            <span className={`${value ? "text-gray-700" : "text-gray-400"}`}>
              {selectedOption ? getOptionLabel(selectedOption) : placeholder}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {value && field === 'color' && (
              <div 
                className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: getColorCode(value) }}
              ></div>
            )}
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-pink-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </button>

        {/* Dropdown Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                className="fixed inset-0 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenDropdown({ type: null, id: null })}
              />
              
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute z-50 w-full mt-2 bg-white border border-pink-200 rounded-xl shadow-2xl overflow-hidden"
              >
                <div className="max-h-60 overflow-y-auto custom-scrollbar">
                  {options.length > 0 ? (
                    options.map((option, index) => {
                      const optionValue = getOptionValue(option);
                      const isSelected = optionValue === value;
                      
                      return (
                        <motion.button
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          type="button"
                          onClick={() => handleSelect(optionValue)}
                          className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-pink-100 ${
                            isSelected 
                              ? "bg-gradient-to-r from-pink-50 to-pink-100 border-r-4 border-pink-500" 
                              : ""
                          }`}
                        >
                          {field === 'color' && (
                            <div 
                              className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                              style={{ backgroundColor: getColorCode(option) }}
                            />
                          )}
                          
                          {renderOption ? renderOption(option) : (
                            <span className={`flex-1 text-right ${isSelected ? "text-pink-600 font-medium" : "text-gray-600"}`}>
                              {getOptionLabel(option)}
                            </span>
                          )}
                          
                          {isSelected && (
                            <CheckCircle className="w-4 h-4 text-pink-500" />
                          )}
                        </motion.button>
                      );
                    })
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      {t("orderCollection.noOptions", "لا توجد خيارات متاحة")}
                    </div>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8" id="turbonOrderCollection">
      <div className="relative max-w-7xl mx-auto">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          {pieces.length > 0 && (
            <>
              {/* Header with Progress */}
              <div className="mb-10 text-center">
                {/* Main Title */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative inline-block mb-4"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-xl opacity-30"></div>
                  <div className="relative bg-white/90 backdrop-blur-sm px-8 py-4 rounded-full border-2 border-pink-200 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <Ribbon className="w-6 h-6 text-pink-500 animate-pulse" />
                      <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-pink-500">
                        {t("turbonOrder.title", "اختر تربوناتك")} ({pieces.length})
                      </h1>
                      <Flower2 className="w-6 h-6 text-pink-500 animate-pulse" />
                    </div>
                  </div>
                </motion.div>

                {/* Progress Bar - بدون size */}
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{t("orderCollection.completed", "القطع المكتملة")}</span>
                    <span className="text-pink-600 font-bold">
                      {Object.values(completedPieces).filter(Boolean).length}/{pieces.length}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-pink-200">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full relative"
                      style={{ width: `${completionPercentage}%` }}
                      initial={{ width: 0 }}
                      animate={{ width: `${completionPercentage}%` }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Tabs for Product Filtering */}
              <div className="flex justify-center gap-4 mb-8">
                <button
                  onClick={() => setActiveTab("all")}
                  className={`px-6 py-2 rounded-full transition-all duration-300 ${
                    activeTab === "all"
                      ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30"
                      : "bg-white text-gray-600 border border-pink-200 hover:border-pink-300"
                  }`}
                >
                  {t("turbonOrder.all", "الكل")}
                </button>
                <button
                  onClick={() => setActiveTab("bow")}
                  className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeTab === "bow"
                      ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30"
                      : "bg-white text-gray-600 border border-pink-200 hover:border-pink-300"
                  }`}
                >
                  <Ribbon className="w-4 h-4" />
                  {t("turbonOrder.bow", "فيونكه")}
                </button>
                <button
                  onClick={() => setActiveTab("flower")}
                  className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
                    activeTab === "flower"
                      ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-lg shadow-pink-500/30"
                      : "bg-white text-gray-600 border border-pink-200 hover:border-pink-300"
                  }`}
                >
                  <Flower2 className="w-4 h-4" />
                  {t("turbonOrder.flower", "ورده")}
                </button>
              </div>

              {/* Pieces Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2">
                {pieces.map((piece, index) => {
                  const colors = getAvailableColors(piece.name);
                  const isCompleted = piece.name && piece.color; // بدون size
                  
                  return (
                    <motion.div
                      key={piece.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="group relative"
                    >
                      <div
                        className={`relative bg-white/90 backdrop-blur-sm p-6 rounded-3xl border-2 transition-all duration-500 ${
                          isCompleted 
                            ? "border-pink-400 shadow-xl shadow-pink-500/20" 
                            : "border-pink-100 hover:border-pink-300"
                        }`}
                      >
                        {/* Glow Effect */}
                        <div className={`absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-pink-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>

                        {/* Piece Number Badge */}
                        <div className="absolute -top-3 -right-3 z-10">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-md opacity-50"></div>
                            <div className="relative bg-gradient-to-r from-pink-400 to-pink-500 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg">
                              {piece.id}
                            </div>
                          </div>
                        </div>

                        {/* Completed Check */}
                        {isCompleted && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-3 -left-3 z-10"
                          >
                            <div className="relative">
                              <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-50"></div>
                              <div className="relative bg-green-400 text-white rounded-full p-1">
                                <CheckCircle className="w-5 h-5" />
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Product Icon */}
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-xl opacity-30"></div>
                            <div className="relative w-16 h-16 bg-gradient-to-br from-pink-100 to-pink-200 rounded-2xl flex items-center justify-center">
                              {piece.name?.includes("فيونكه") ? (
                                <Ribbon className="w-8 h-8 text-pink-500" />
                              ) : piece.name?.includes("ورده") ? (
                                <Flower2 className="w-8 h-8 text-pink-500" />
                              ) : (
                                <Sparkles className="w-8 h-8 text-pink-500" />
                              )}
                            </div>
                          </div>
                        </div>

                        <h2 className="text-center text-lg font-bold mb-4 text-gray-800 border-b border-pink-100 pb-2">
                          {t("turbonOrder.piece", "قطعة")} #{piece.id}
                        </h2>

                        <div className="space-y-4">
                          {/* Product Dropdown */}
                          <CustomDropdown
                            id={piece.id}
                            field="name"
                            value={piece.name}
                            options={filteredProducts}
                            placeholder={t("TorderCollection.selectProduct", "اختر الموديل")}
                            icon={activeTab === "bow" ? Ribbon : activeTab === "flower" ? Flower2 : ShoppingBag}
                            getOptionLabel={(product) => product.name}
                            getOptionValue={(product) => product.name}
                          />

                          {/* Size Dropdown - Removed since it's one size */}

                          {/* Color Dropdown */}
                          <CustomDropdown
                            id={piece.id}
                            field="color"
                            value={piece.color}
                            options={colors}
                            placeholder={t("orderCollection.selectColor", "اختر اللون")}
                            icon={Palette}
                            disabled={!piece.name}
                          />
                        </div>

                        {/* Quick Color Guide */}
                        {piece.name && colors.length > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-4 pt-4 border-t border-pink-100"
                          >
                            <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                              <Heart className="w-3 h-3 text-pink-400" />
                              الألوان المتاحة:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {colors.slice(0, 4).map((color, idx) => (
                                <div
                                  key={idx}
                                  className="group/color relative"
                                >
                                  <div
                                    className="w-6 h-6 rounded-full border-2 border-white shadow-md cursor-pointer transition-transform hover:scale-110"
                                    style={{ backgroundColor: getColorCode(color) }}
                                  ></div>
                                  <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-pink-300 text-[10px] px-2 py-0.5 rounded opacity-0 group-hover/color:opacity-100 transition-opacity whitespace-nowrap">
                                    {color}
                                  </span>
                                </div>
                              ))}
                              {colors.length > 4 && (
                                <span className="text-xs text-gray-400">+{colors.length - 4}</span>
                              )}
                            </div>
                          </motion.div>
                        )}

                        {/* One Size Badge */}
                        <div className="mt-3 text-center">
                          <span className="inline-flex items-center gap-1 bg-pink-50 px-3 py-1 rounded-full text-xs text-pink-600">
                            <Ruler className="w-3 h-3" />
                           (one size) مقاس واحد 
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center mt-10"
              >
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  
                  <button
                    type="submit"
                    className="relative bg-white text-gray-800 px-12 py-5 rounded-2xl font-bold shadow-2xl border-2 border-pink-300 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group/btn"
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] bg-gradient-to-r from-transparent via-pink-200/50 to-transparent transition-transform duration-1000"></div>
                    
                    <span className="relative z-10 flex items-center gap-3 text-lg">
                      <ShoppingBag className="w-5 h-5 text-pink-500" />
                      {t("orderCollection.confirmOrder", "تأكيد الطلب")}
                      <Sparkles className="w-5 h-5 text-pink-500" />
                    </span>
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </form>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #f472b6, #ec4899);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #ec4899, #db2777);
        }

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

export default TurbonOrderCollection;