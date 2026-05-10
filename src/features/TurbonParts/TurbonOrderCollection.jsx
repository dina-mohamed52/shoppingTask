import { useState, useMemo, useEffect } from "react";
import { Data } from "../../data/Data";
import { useTranslation } from "react-i18next";
import { 
  ShoppingBag, 
  CheckCircle, 
  Palette, 
  Ruler, 
  ChevronDown, 
  ChevronUp,
  Ribbon,
  Flower2,
  Sparkles,
  Heart,
  X,
  ShoppingCart,
  ArrowRight,
  TrendingUp,
  Tag
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../cart/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// مكون Modal للتأكيد
function SuccessModal({ visible, onClose, message, onContinue, onCheckout }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl p-6 text-center max-w-sm mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">🎉 تم بنجاح!</h3>
            <p className="text-gray-500 text-sm mb-6">{message}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={onContinue}
                className="flex-1 px-4 py-2.5 border-2 border-purple-500 text-purple-600 rounded-xl font-medium hover:bg-purple-50 transition-all"
              >
                🛒 متابعة التسوق
              </button>
              <button
                onClick={onCheckout}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:shadow-lg transition-all"
              >
                💳 إتمام الطلب
              </button>
            </div>
            <button
              onClick={onClose}
              className="mt-4 text-xs text-gray-400 hover:text-gray-600 transition-colors"
            >
              إغلاق
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TurbonOrderCollection({ selectedOffer, scrollToOffers }) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const count = selectedOffer?.value || 0;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingNavigation, setPendingNavigation] = useState(false);
  
  // فلترة التربونات فقط (id 9 و 10)
  const turbonProducts = Data.filter(product => product.id === 9 || product.id === 10);

  const initialPieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: "",
      color: "",
    }));
  }, [count]);

  const [pieces, setPieces] = useState(initialPieces);
  const [completedPieces, setCompletedPieces] = useState({});
  const [openDropdown, setOpenDropdown] = useState({ type: null, id: null });
  const [activeTab, setActiveTab] = useState("all");
  const { addToCart } = useCart();

  useEffect(() => {
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
    setOpenDropdown({ type: null, id: null });
  };

  const getAvailableColors = (productName) => {
    const product = Data.find((item) => item.name === productName);
    return product ? product.avalibeColors : [];
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
      default: "#CCCCCC"
    };
    return colorMap[colorName] || colorMap.default;
  };

  const completionPercentage = useMemo(() => {
    const completed = Object.values(completedPieces).filter(Boolean).length;
    return (completed / pieces.length) * 100;
  }, [completedPieces, pieces.length]);

  const filteredProducts = activeTab === "all" 
    ? turbonProducts 
    : turbonProducts.filter(p => p.id === (activeTab === "bow" ? 9 : 10));

  const handleGoToOffers = () => {
    if (scrollToOffers) {
      scrollToOffers();
    }
  };

  // التحقق من صحة النموذج
  const isFormValid = pieces.every(piece => 
    piece.name && piece.color
  );

  // تجهيز عناصر العرض للإضافة للسلة
  const prepareCartItem = () => {
    const pricePerPiece = selectedOffer?.price / pieces.length;
    
    const orderWithDetails = pieces.map(piece => {
      const product = Data.find(p => p.name === piece.name);
      // جلب الصورة المناسبة بناءً على اللون المختار
      let productImage = "";
      if (product && product.productColors) {
        const colorIndex = product.avalibeColors?.findIndex(c => c === piece.color);
        if (colorIndex !== -1 && colorIndex >= 0 && product.productColors?.[colorIndex]) {
          productImage = product.productColors[colorIndex].img;
        } else if (product.productColors?.[0]) {
          productImage = product.productColors[0].img;
        }
      }
      
      return {
        id: piece.id,
        name: piece.name,
        color: piece.color,
        size: "one size",
        price: pricePerPiece,
        image: productImage,
      };
    });

    const mainImage = orderWithDetails.find(p => p.image)?.image || "";

    return {
      id: `turbon-offer-${selectedOffer?.name}-${Date.now()}`,
      name: selectedOffer?.name,
      nameEn: `Turbon Offer: ${selectedOffer?.name}`,
      price: selectedOffer?.price,
      originalPrice: selectedOffer?.oldPrice,
      quantity: 1,
      isOffer: true,
      offerDetails: {
        totalPieces: pieces.length,
        pieces: orderWithDetails,
        type: "turbon",
      },
      image: mainImage,
    };
  };

  // دالة الإضافة للسلة
  const handleAddToCart = async (shouldNavigate = false) => {
    if (!isFormValid) {
      toast.error("⚠️ يرجى إكمال جميع البيانات أولاً", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return false;
    }

    setIsSubmitting(true);

    try {
      const cartItem = prepareCartItem();
      addToCart(cartItem);
      
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span>تم إضافة <strong>{selectedOffer?.name}</strong> إلى السلة بنجاح! 🛒</span>
        </div>,
        {
          position: "bottom-center",
          autoClose: 3000,
          icon: false,
        }
      );
      
      if (shouldNavigate) {
        setSuccessMessage(`🎁 تم إضافة عرض ${selectedOffer?.name} بنجاح إلى سلة التسوق!`);
        setShowSuccessModal(true);
        setPendingNavigation(true);
      } else {
        toast.info("يمكنك متابعة التسوق أو الذهاب للسلة لإتمام الطلب", {
          position: "bottom-center",
          autoClose: 4000,
        });
      }
      
      return true;
    } catch (error) {
      toast.error("❌ حدث خطأ في إضافة المنتج للسلة", {
        position: "bottom-center",
        autoClose: 3000,
      });
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddOnly = (e) => {
    e.preventDefault();
    handleAddToCart(false);
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    handleAddToCart(true);
  };

  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    setPendingNavigation(false);
    toast.success("✨ أكمل اختياراتك الجميلة!", {
      position: "bottom-center",
      autoClose: 2000,
    });
  };

  const handleCheckout = () => {
    setShowSuccessModal(false);
    if (pendingNavigation) {
      navigate("/checkout");
    }
  };

  const closeModal = () => {
    setShowSuccessModal(false);
    setPendingNavigation(false);
  };

  const completedCount = Object.values(completedPieces).filter(Boolean).length;

  if (!selectedOffer || count === 0) {
    return (
      <div className="py-20 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm mx-auto"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Ribbon className="w-10 h-10 text-purple-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">اختار عرضك</h3>
          <p className="text-gray-400 text-sm">برجاء اختيار عرض مناسب من الأعلى</p>
        </motion.div>
        <motion.button
          onClick={handleGoToOffers}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-purple-600/30 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
        >
          <Tag className="w-4 h-4" />
          اختاري عرضك المناسب
          <Sparkles className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

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
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={disabled}
          className={`w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${
            isOpen 
              ? "border-purple-500 bg-white/90 shadow-lg shadow-purple-500/20" 
              : value
                ? "border-purple-500/50 bg-white/80 hover:border-purple-500"
                : "border-gray-200 bg-white/50 hover:border-gray-300"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-5 h-5 ${value ? "text-purple-500" : "text-gray-400"}`} />
            <span className={`${value ? "text-gray-700" : "text-gray-400"}`}>
              {selectedOption ? getOptionLabel(selectedOption) : placeholder}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {value && field === 'color' && (
              <div 
                className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: getColorCode(value) }}
              />
            )}
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-purple-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div 
                className="fixed inset-0 z-40 hidden md:block"
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
                className="absolute z-50 w-full mt-2 bg-white border border-purple-200 rounded-xl shadow-2xl overflow-hidden hidden md:block"
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
                          className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-purple-100 ${
                            isSelected 
                              ? "bg-gradient-to-r from-purple-50 to-purple-100 border-r-4 border-purple-500" 
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
                            <span className={`flex-1 text-right ${isSelected ? "text-purple-600 font-medium" : "text-gray-600"}`}>
                              {getOptionLabel(option)}
                            </span>
                          )}
                          
                          {isSelected && (
                            <CheckCircle className="w-4 h-4 text-purple-500" />
                          )}
                        </motion.button>
                      );
                    })
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500">
                      لا توجد خيارات متاحة
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Bottom Sheet للموبايل */}
              <motion.div 
                className="fixed inset-0 bg-black/50 z-50 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenDropdown({ type: null, id: null })}
              />
              
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col md:hidden"
              >
                <div className="sticky top-0 bg-white border-b border-purple-100 rounded-t-3xl p-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-800">
                    {field === 'name' ? 'اختر الموديل' : 'اختر اللون'}
                  </h3>
                  <button
                    onClick={() => setOpenDropdown({ type: null, id: null })}
                    className="p-2 hover:bg-purple-50 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="overflow-y-auto flex-1 p-4" style={{ maxHeight: "60vh" }}>
                  <div className="space-y-2">
                    {options.length > 0 ? (
                      options.map((option, index) => {
                        const optionValue = getOptionValue(option);
                        const isSelected = optionValue === value;
                        
                        return (
                          <motion.button
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            type="button"
                            onClick={() => handleSelect(optionValue)}
                            className={`w-full flex items-center gap-3 p-4 rounded-xl transition-all duration-300 ${
                              isSelected 
                                ? "bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-500" 
                                : "hover:bg-purple-50 border-2 border-transparent"
                            }`}
                          >
                            {field === 'color' && (
                              <div 
                                className="w-8 h-8 rounded-full border-2 border-white shadow-md"
                                style={{ backgroundColor: getColorCode(option) }}
                              />
                            )}
                            
                            {renderOption ? renderOption(option) : (
                              <span className={`flex-1 text-right text-base ${isSelected ? "text-purple-600 font-bold" : "text-gray-700"}`}>
                                {getOptionLabel(option)}
                              </span>
                            )}
                            
                            {isSelected && (
                              <CheckCircle className="w-5 h-5 text-purple-500" />
                            )}
                          </motion.button>
                        );
                      })
                    ) : (
                      <div className="px-4 py-8 text-center text-gray-500">
                        لا توجد خيارات متاحة
                      </div>
                    )}
                  </div>
                </div>

                <div className="sticky bottom-0 bg-white border-t border-purple-100 p-4">
                  <button
                    onClick={() => setOpenDropdown({ type: null, id: null })}
                    className="w-full bg-purple-50 text-purple-600 py-3 rounded-xl font-medium hover:bg-purple-100 transition-colors"
                  >
                    إغلاق
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto" id="turbonOrderCollection">
      {/* Hero Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-1.5 rounded-full mb-4 shadow-lg shadow-purple-200"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">تخصيص طلبك</span>
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          اختر تفاصيل{' '}
          <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
            التربونات
          </span>
        </h2>
        <p className="text-gray-400 text-sm">قم بتخصيص كل تربونة بالمنتج واللون المناسب</p>
        
        {/* Progress Bar */}
        <div className="max-w-md mx-auto mt-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">تقدم الطلب</span>
            <span className="font-bold text-purple-600">{completedCount}/{pieces.length}</span>
          </div>
          <div className="relative h-2 bg-purple-100 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${completionPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          {completionPercentage === 100 && (
            <motion.p
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-green-500 mt-2"
            >
              ✨ جميع التربونات مكتملة! يمكنك إضافة العرض للسلة الآن
            </motion.p>
          )}
        </div>
      </div>

      {/* Tabs for Product Filtering - ألوان موف */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("all")}
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            activeTab === "all"
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30"
              : "bg-white text-gray-600 border border-purple-200 hover:border-purple-300"
          }`}
        >
          الكل
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("bow")}
          className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
            activeTab === "bow"
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30"
              : "bg-white text-gray-600 border border-purple-200 hover:border-purple-300"
          }`}
        >
          <Ribbon className="w-4 h-4" />
          فيونكه
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("flower")}
          className={`px-6 py-2 rounded-full transition-all duration-300 flex items-center gap-2 ${
            activeTab === "flower"
              ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/30"
              : "bg-white text-gray-600 border border-purple-200 hover:border-purple-300"
          }`}
        >
          <Flower2 className="w-4 h-4" />
          ورده
        </button>
      </div>

      {/* Pieces Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {pieces.map((piece, index) => {
          const colors = getAvailableColors(piece.name);
          const isCompleted = piece.name && piece.color;
          
          return (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="relative"
            >
              <div className={`
                relative bg-white rounded-2xl transition-all duration-300 overflow-hidden
                ${isCompleted ? "ring-2 ring-purple-400 ring-offset-2" : "border border-gray-200"}
                shadow-md hover:shadow-xl
              `}>
                <div className={`
                  px-5 py-4 border-b transition-all duration-300
                  ${isCompleted ? "bg-gradient-to-r from-purple-50 to-gray-50 border-purple-100" : "bg-white border-gray-100"}
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-300
                        ${isCompleted 
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-200" 
                          : "bg-gray-100 text-gray-600"
                        }
                      `}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm">{piece.id}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">التربونة</p>
                        <p className="text-lg font-bold text-gray-800">#{piece.id}</p>
                      </div>
                    </div>
                    
                    {piece.name && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-lg">
                        {piece.name.includes("فيونكه") ? (
                          <Ribbon className="w-3 h-3 text-gray-500" />
                        ) : (
                          <Flower2 className="w-3 h-3 text-gray-500" />
                        )}
                        <span className="text-xs text-gray-600">{piece.name.split(' ').slice(0,2).join(' ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Product Icon */}
                  <div className="flex justify-center mb-2">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full blur-xl opacity-30"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center">
                        {piece.name?.includes("فيونكه") ? (
                          <Ribbon className="w-8 h-8 text-purple-500" />
                        ) : piece.name?.includes("ورده") ? (
                          <Flower2 className="w-8 h-8 text-purple-500" />
                        ) : (
                          <Sparkles className="w-8 h-8 text-purple-500" />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Product Dropdown */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <ShoppingBag className="w-4 h-4 text-purple-500" />
                        اختر الموديل
                      </label>
                      <CustomDropdown
                        id={piece.id}
                        field="name"
                        value={piece.name}
                        options={filteredProducts}
                        placeholder="اختر الموديل"
                        icon={activeTab === "bow" ? Ribbon : activeTab === "flower" ? Flower2 : ShoppingBag}
                        getOptionLabel={(product) => product.name}
                        getOptionValue={(product) => product.name}
                      />
                    </div>

                    {/* Color Dropdown */}
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Palette className="w-4 h-4 text-purple-500" />
                        اللون
                      </label>
                      <CustomDropdown
                        id={piece.id}
                        field="color"
                        value={piece.color}
                        options={colors}
                        placeholder="اختر اللون"
                        icon={Palette}
                        disabled={!piece.name}
                      />
                    </div>
                  </div>

                  {/* Quick Color Guide */}
                  {piece.name && colors.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="pt-2"
                    >
                      <p className="text-[10px] text-gray-400 mb-1.5 flex items-center gap-1">
                        <Heart className="w-2.5 h-2.5 text-purple-400" />
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
                          <span className="text-[9px] text-gray-400">
                            +{colors.length - 5}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  )}

                  {/* One Size Badge */}
                  <div className="text-center pt-2">
                    <span className="inline-flex items-center gap-1 bg-purple-50 px-3 py-1 rounded-full text-xs text-purple-600">
                      <Ruler className="w-3 h-3" />
                      مقاس واحد (one size)
                    </span>
                  </div>

                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="bg-green-500 text-white rounded-full p-1.5 shadow-lg shadow-green-200">
                        <CheckCircle className="w-4 h-4" />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className={`
                  px-5 py-3 border-t transition-all duration-300
                  ${isCompleted ? "bg-gradient-to-r from-purple-50 to-gray-50 border-purple-100" : "bg-gray-50 border-gray-100"}
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className="text-xs text-gray-500">
                        {isCompleted ? "مكتملة ✓" : "في انتظار التحديد"}
                      </span>
                    </div>
                    {isCompleted && (
                      <span className="text-xs text-purple-500 font-medium">جاهز للإضافة</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center gap-6 mt-12"
      >
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span>🛒 إضافة للسلة: احفظ العرض وارجع للتسوق</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
            <span>💳 شراء الآن: اذهب مباشرة لإتمام الطلب</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-2xl">
          <motion.button
            onClick={handleAddOnly}
            disabled={isSubmitting || !isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`
              relative group flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3
              ${isFormValid && !isSubmitting
                ? "bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50 shadow-md hover:shadow-lg"
                : "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                جاري الإضافة...
              </>
            ) : (
              <>
                <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>🛒 إضافة للسلة</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
              </>
            )}
          </motion.button>

          <motion.button
            onClick={handleBuyNow}
            disabled={isSubmitting || !isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`
              relative group flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden
              ${isFormValid && !isSubmitting                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-xl shadow-purple-200 hover:shadow-2xl"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {isFormValid && !isSubmitting && (
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
            )}
            
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري المعالجة...
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5 transition-transform group-hover:scale-110" />
                <span>💳 شراء الآن</span>
                <TrendingUp className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </motion.button>
        </div>

        {isFormValid && !isSubmitting && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-purple-500 bg-purple-50 px-4 py-2 rounded-full"
          >
            ✨ ممتاز! جميع البيانات مكتملة، يمكنك إضافة العرض للسلة الآن
          </motion.p>
        )}
      </motion.div>

      <SuccessModal
        visible={showSuccessModal}
        onClose={closeModal}
        message={successMessage}
        onContinue={handleContinueShopping}
        onCheckout={handleCheckout}
      />

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #9333ea, #7e22ce);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #a855f7, #9333ea);
        }
      `}</style>
    </div>
  );
}

export default TurbonOrderCollection;