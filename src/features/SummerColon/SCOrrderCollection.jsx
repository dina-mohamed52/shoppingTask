import { useState, useMemo, useEffect, useRef } from "react";
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
  Tag,
  ShoppingCart,
  ArrowRight,
  TrendingUp,
  X,
  ChevronDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Select, Drawer, Spin } from "antd";
import { useCart } from "../cart/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Mobile Dropdown Component
function MobileSelect({
  value,
  onChange,
  options,
  placeholder,
  label,
  icon: Icon,
  disabled,
  renderOption,
}) {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          {Icon && <Icon className="w-4 h-4 text-purple-500" />}
          {label}
        </label>
        <button
          onClick={() => !disabled && setOpen(true)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 text-right bg-white border rounded-xl 
            flex items-center justify-between transition-all duration-200
            ${disabled ? "bg-gray-50 border-gray-200 cursor-not-allowed" : "hover:border-purple-300 active:scale-[0.99]"}
            ${value ? "border-purple-300 ring-1 ring-purple-200" : "border-gray-200"}
          `}
        >
          <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
          <span className={`text-sm ${value ? "text-gray-800 font-medium" : "text-gray-400"}`}>
            {selectedOption?.label || placeholder}
          </span>
        </button>
      </div>

      <Drawer
        placement="bottom"
        height="auto"
        open={open}
        onClose={() => setOpen(false)}
        className="mobile-select-drawer"
        styles={{
          body: { padding: 0, maxHeight: "70vh", overflow: "auto" },
          header: { display: "none" },
        }}
      >
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-gray-800">{label}</h3>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center active:scale-95 transition-transform"
            >
              <X className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
        </div>

        <div className="divide-y divide-gray-50 max-h-[50vh] overflow-y-auto">
          {filteredOptions.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <Droplet className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">لا توجد خيارات</p>
            </div>
          ) : (
            filteredOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  setSearchTerm("");
                }}
                className={`
                  w-full px-4 py-3 text-right transition-all duration-150 active:bg-purple-50
                  flex items-center justify-between
                  ${value === option.value ? "bg-purple-50" : "hover:bg-gray-50"}
                `}
              >
                {renderOption ? renderOption(option) : (
                  <div className="flex items-center gap-3">
                    {option.color && (
                      <div
                        className="w-6 h-6 rounded-full shadow-inner"
                        style={{
                          backgroundColor: option.color,
                          border: option.color === "#FFFFFF" ? "1px solid #E5E7EB" : "none",
                        }}
                      />
                    )}
                    <span className="text-sm text-gray-800">{option.label}</span>
                  </div>
                )}
                {value === option.value && (
                  <CheckCircle className="w-5 h-5 text-purple-500" />
                )}
              </button>
            ))
          )}
        </div>
      </Drawer>
    </>
  );
}

// Success Modal Component
function SuccessModal({ visible, onClose, message, onContinue, onCheckout }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="bg-white rounded-2xl p-6 text-center max-w-sm w-full shadow-2xl"
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
                className="flex-1 px-4 py-2.5 border-2 border-purple-500 text-purple-600 rounded-xl font-medium hover:bg-purple-50 active:scale-95 transition-all"
              >
                🛒 متابعة التسوق
              </button>
              <button
                onClick={onCheckout}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-medium hover:shadow-lg active:scale-95 transition-all"
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

function SCOrderCollection({
  selectedOffer,
  scrollToOffers,
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const count = selectedOffer?.value || selectedOffer?.count || 0;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingNavigation, setPendingNavigation] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  
  const scProducts = SummerColonData;
  const { addToCart } = useCart();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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

  // دالة لعكس المقاس (تحويل 10-8 إلى 8-10)
  const reverseSize = (size) => {
    if (!size) return size;
    const parts = size.split('-');
    if (parts.length === 2) {
      const first = parseInt(parts[0]);
      const second = parseInt(parts[1]);
      if (first > second) {
        return `${second}-${first}`;
      }
    }
    return size;
  };

  useEffect(() => {
    const completed = {};
    pieces.forEach((piece) => {
      completed[piece.id] = !!(
        piece.name &&
        piece.color &&
        selectedSizes[piece.id]
      );
    });
    setCompletedPieces(completed);
  }, [pieces, selectedSizes]);

  if (pieces.length !== count) {
    setPieces(initialPieces);
  }

  const handleChange = (id, field, value) => {
    const updated = pieces.map((p) =>
      p.id === id ? { ...p, [field]: value } : p,
    );
    setPieces(updated);
  };

  const getAvailableColors = (productName) => {
    const product = SummerColonData.find((item) => item.name === productName);
    return product ? product.avalibeColors : [];
  };

  const handleSizeChange = (id, size) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const getAvailableSizes = (productName, color) => {
    const product = SummerColonData.find(
      (item) => item.name === productName
    );

    if (!product) return [];

    let sizes = product.sizes;

    const isSpecialCase =
      productName?.includes("ليجن") ||
      productName?.includes("اوباك") ||
      productName?.includes("ساده");

   

    return sizes;
  };
  
  const getColorCode = (colorName) => {
    const colorMap = {
      أبيض: "#FFFFFF",
      "أوف وايت": "#FDF5E6",
      أسود: "#000000",
      رمادي: "#808080",
      روز: "#FFC0CB",
      بينك: "#FF69B4",
      كحلي: "#000080",
      بيج: "#F5F5DC",
      سكري: "#F5F5DC",
      لبني: "#FDF5E6",
      أحمر: "#FF0000",
      كافيه: "#6F4E37",
      أصفر: "#FFFF00",
      موف: "#E0B0FF",
      لافندر: "#E0B0FF",
      نبيتي: "#800020",
      زيتي: "#556B2F",
      تركواز: "#40E0D0",
      default: "#CCCCCC",
    };
    return colorMap[colorName] || colorMap.default;
  };

  const getProductIcon = (productName) => {
    if (productName?.includes("كولون"))
      return <Droplet className="w-8 h-8 text-purple-600" />;
    return <ShoppingBag className="w-8 h-8 text-purple-600" />;
  };

  const completionPercentage = useMemo(() => {
    const completed = Object.values(completedPieces).filter(Boolean).length;
    return (completed / pieces.length) * 100;
  }, [completedPieces, pieces.length]);

  const handleGoToOffers = () => {
    if (scrollToOffers) {
      scrollToOffers();
    }
  };

  // التحقق من صحة النموذج
  const isFormValid = pieces.every(piece => 
    piece.name && piece.color && selectedSizes[piece.id]
  );

  // تجهيز عناصر العرض للإضافة للسلة
  const prepareCartItem = () => {
    const orderWithDetails = pieces.map(piece => {
      const product = SummerColonData.find(p => p.name === piece.name);
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
        size: selectedSizes[piece.id],
        image: productImage,
      };
    });

    // استخدام أول صورة متاحة كصورة رئيسية للعرض
    const mainImage = orderWithDetails.find(p => p.image)?.image || "";

    return {
      id: `sc-offer-${selectedOffer?.name}-${Date.now()}`,
      name: selectedOffer?.name,
      nameEn: `Summer Offer: ${selectedOffer?.name}`,
      price: selectedOffer?.price,
      originalPrice: selectedOffer?.oldPrice,
      quantity: 1,
      isOffer: true,
      offerDetails: {
        totalPieces: pieces.length,
        pieces: orderWithDetails,
        type: "summer-colon",
      },
      image: mainImage,
    };
  };

  // دالة الإضافة للسلة (مع خيار التوجيه)
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
      
      // عرض Toast نجاح مع أيقونة
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
        // عرض Modal قبل التوجيه
        setSuccessMessage(`🎁 تم إضافة عرض ${selectedOffer?.name} بنجاح إلى سلة التسوق!`);
        setShowSuccessModal(true);
        setPendingNavigation(true);
      } else {
        // إضافة فقط - عرض رسالة مختلفة
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

  // إضافة للسلة فقط (يكمل تسوق)
  const handleAddOnly = (e) => {
    e.preventDefault();
    handleAddToCart(false);
  };

  // شراء الآن (يضيف للسلة ويذهب للدفع)
  const handleBuyNow = (e) => {
    e.preventDefault();
    handleAddToCart(true);
  };

  // متابعة التسوق بعد الإضافة
  const handleContinueShopping = () => {
    setShowSuccessModal(false);
    setPendingNavigation(false);
    toast.success("✨ أكمل اختياراتك الجميلة!", {
      position: "bottom-center",
      autoClose: 2000,
    });
  };

  // إتمام الطلب
  const handleCheckout = () => {
    setShowSuccessModal(false);
    if (pendingNavigation) {
      navigate("/checkout");
    }
  };

  // إغلاق المودال
  const closeModal = () => {
    setShowSuccessModal(false);
    setPendingNavigation(false);
  };

  const completedCount = Object.values(completedPieces).filter(Boolean).length;

  if (!selectedOffer || count === 0) {
    return (
      <div className="py-12 md:py-20 text-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm mx-auto"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Droplet className="w-8 h-8 md:w-10 md:h-10 text-purple-300" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">اختار عرضك</h3>
          <p className="text-gray-400 text-xs md:text-sm">برجاء اختيار عرض مناسب من الأعلى</p>
        </motion.div>
        <motion.button
          onClick={handleGoToOffers}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-6 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold shadow-lg hover:shadow-purple-600/30 transition-all duration-300 flex items-center justify-center gap-2 mx-auto text-sm md:text-base"
        >
          <Tag className="w-4 h-4" />
          اختاري عرضك المناسب
          <Sparkles className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

  // Prepare options for mobile selects
  const productOptions = scProducts.map((product) => ({
    value: product.name,
    label: product.name,
  }));

  return (
    <div ref={containerRef} className="py-6 md:py-12 px-3 md:px-4 max-w-7xl mx-auto">
      {/* Hero Header - ألوان موف */}
      <div className="text-center mb-8 md:mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 md:px-4 py-1 rounded-full mb-4 shadow-lg shadow-purple-200"
        >
          <Sparkles className="w-3 h-3" />
          <span className="text-[11px] md:text-xs font-medium">تخصيص طلبك</span>
        </motion.div>
        
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 px-2">
          اختر تفاصيل{' '}
          <span className="bg-gradient-to-r from-purple-600 to-purple-700 bg-clip-text text-transparent">
            الكولونات
          </span>
        </h2>
        <p className="text-gray-400 text-xs md:text-sm px-4">قم بتخصيص كل كولون بالمنتج واللون والمقاس المناسب</p>
        
        {/* Premium Progress Bar - ألوان موف */}
        <div className="max-w-md mx-auto mt-6 md:mt-8 px-4">
          <div className="flex justify-between text-xs md:text-sm mb-2">
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
              className="text-[11px] md:text-xs text-green-500 mt-2"
            >
              ✨ جميع الكولونات مكتملة! يمكنك إضافة العرض للسلة الآن
            </motion.p>
          )}
        </div>
      </div>

      {/* Premium Cards Grid - ألوان موف ورمادي */}
      <div
      dir="rtl"
      className="grid sm:grid-cols-2 grid-cols-1 gap-4 md:gap-6">
        {pieces.map((piece, idx) => {
          const colors = getAvailableColors(piece.name);
          const sizes = getAvailableSizes(piece.name, piece.color);
          const isCompleted = piece.name && piece.color && selectedSizes[piece.id];

          // Prepare options for selects
          const colorOptions = colors.map((c) => ({
            value: c,
            label: c,
            color: getColorCode(c),
          }));

          const sizeOptions = sizes.map((sizeItem) => ({
            value: sizeItem.size,
            label: `${sizeItem.size} - ${sizeItem.age}`,
            size: sizeItem.size,
            age: sizeItem.age,
          }));

          return (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="relative"
            >
              <div className={`
                relative bg-white rounded-xl md:rounded-2xl transition-all duration-300 overflow-hidden
                ${isCompleted ? "ring-2 ring-purple-400 ring-offset-2" : "border border-gray-200"}
                shadow-md
              `}>
                <div className={`
                  px-4 md:px-5 py-3 md:py-4 border-b transition-all duration-300
                  ${isCompleted ? "bg-gradient-to-r from-purple-50 to-gray-50 border-purple-100" : "bg-white border-gray-100"}
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className={`
                        w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-300
                        ${isCompleted 
                          ? "bg-purple-600 text-white shadow-lg shadow-purple-200" 
                          : "bg-gray-100 text-gray-600"
                        }
                      `}>
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                        ) : (
                          <span className="text-xs md:text-sm">{piece.id}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs text-gray-400">الكولون</p>
                        <p className="text-base md:text-lg font-bold text-gray-800">#{piece.id}</p>
                      </div>
                    </div>
                    
                    {piece.name && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-100 rounded-lg">
                        <Droplet className="w-3 h-3 text-gray-500" />
                        <span className="text-[10px] md:text-xs text-gray-600">{piece.name.split(' ').slice(0,2).join(' ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 md:p-5 space-y-3 md:space-y-4">
                  {/* Product Selection */}
                  {isMobile ? (
                    <MobileSelect
                      value={piece.name}
                      onChange={(value) => handleChange(piece.id, "name", value)}
                      options={productOptions}
                      placeholder="اختر الكولون"
                      label="الكولون"
                      icon={ShoppingBag}
                      renderOption={(option) => (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                            <Droplet className="w-4 h-4 text-purple-500" />
                          </div>
                          <div className="flex-1 text-right">
                            <p className="font-medium text-gray-800 text-sm">{option.label}</p>
                          </div>
                        </div>
                      )}
                    />
                  ) : (
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <ShoppingBag className="w-4 h-4 text-purple-500" />
                        اختر الكولون
                      </label>
                      <Select
                        value={piece.name || undefined}
                        onChange={(value) => handleChange(piece.id, "name", value)}
                        placeholder="كولون"
                        className="w-full"
                        size="large"
                        style={{ borderRadius: 12 }}
                        dropdownStyle={{ borderRadius: 12 }}
                      >
                        {scProducts.map((product, idx) => (
                          <Select.Option key={idx} value={product.name}>
                            <div className="flex items-center gap-3 py-1">
                              <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
                                <Droplet className="w-4 h-4 text-purple-500" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">{product.name}</p>
                              </div>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {/* Color Selection */}
                    {isMobile ? (
                      <MobileSelect
                        value={piece.color}
                        onChange={(value) => handleChange(piece.id, "color", value)}
                        options={colorOptions}
                        placeholder="اختر اللون"
                        label="اللون"
                        icon={Palette}
                        disabled={!piece.name}
                        renderOption={(option) => (
                          <div className="flex items-center gap-3">
                            <div
                              className="w-6 h-6 rounded-full shadow-inner"
                              style={{
                                backgroundColor: option.color,
                                border: option.color === "#FFFFFF" ? "1px solid #E5E7EB" : "none",
                              }}
                            />
                            <span className="text-sm text-gray-800">{option.label}</span>
                          </div>
                        )}
                      />
                    ) : (
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Palette className="w-4 h-4 text-purple-500" />
                          اللون
                        </label>
                        <Select
                          value={piece.color || undefined}
                          onChange={(value) => handleChange(piece.id, "color", value)}
                          placeholder="لون"
                          className="w-full"
                          size="large"
                          disabled={!piece.name}
                          style={{ borderRadius: 12 }}
                          dropdownStyle={{ borderRadius: 12 }}
                        >
                          {colors.map((color, idx) => (
                            <Select.Option key={idx} value={color}>
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-5 h-5 rounded-full shadow-inner"
                                  style={{ backgroundColor: getColorCode(color), border: color === "أبيض" ? "1px solid #E5E7EB" : "none" }}
                                />
                                <span>{color}</span>
                              </div>
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    )}

                    {/* Size Selection */}
                    {isMobile ? (
                      <MobileSelect
                        value={selectedSizes[piece.id]}
                        onChange={(value) => {
                          const reversedValue = reverseSize(value);
                          handleSizeChange(piece.id, reversedValue);
                        }}
                        options={sizeOptions}
                        placeholder="اختر المقاس"
                        label="المقاس"
                        icon={Ruler}
                        disabled={!piece.name || !piece.color}
                        renderOption={(option) => (
                          <div className="flex items-center justify-between w-full">
                            <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                              {option.age}
                            </span>
                            <span className="font-medium text-gray-800">
                              {option.size}
                            </span>
                          </div>
                        )}
                      />
                    ) : (
                      <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                          <Ruler className="w-4 h-4 text-purple-500" />
                          المقاس
                        </label>
                        <Select
                          value={selectedSizes[piece.id] || undefined}
                          onChange={(value) => {
                            const reversedValue = reverseSize(value);
                            handleSizeChange(piece.id, reversedValue);
                          }}
                          placeholder="مقاس"
                          className="w-full"
                          size="large"
                          disabled={!piece.name || !piece.color}
                          style={{ borderRadius: 12 }}
                          dropdownStyle={{ borderRadius: 12 }}
                        >
                          {sizes.map((sizeItem, idx) => (
                            <Select.Option key={idx} value={sizeItem.size}>
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-800">{sizeItem.size}</span>
                                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{sizeItem.age}</span>
                              </div>
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    )}
                  </div>

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

                  {isCompleted && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4"
                    >
                      <div className="bg-green-500 text-white rounded-full p-1.5 shadow-lg shadow-green-200">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className={`
                  px-4 md:px-5 py-2 md:py-3 border-t transition-all duration-300
                  ${isCompleted ? "bg-gradient-to-r from-purple-50 to-gray-50 border-purple-100" : "bg-gray-50 border-gray-100"}
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className="text-[10px] md:text-xs text-gray-500">
                        {isCompleted ? "مكتملة ✓" : "في انتظار التحديد"}
                      </span>
                    </div>
                    {isCompleted && (
                      <span className="text-[10px] md:text-xs text-purple-500 font-medium">جاهز للإضافة</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* أزرار الإضافة - ألوان موف */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center gap-4 md:gap-6 mt-8 md:mt-12"
      >
        {/* شرح مبسط للخيارات */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-[10px] md:text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
            <span>🛒 إضافة للسلة: احفظ العرض وارجع للتسوق</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full" />
            <span>💳 شراء الآن: اذهب مباشرة لإتمام الطلب</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full max-w-2xl px-4">
          {/* زرار إضافة للسلة فقط */}
          <motion.button
            onClick={handleAddOnly}
            disabled={isSubmitting || !isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`
              relative group flex-1 px-5 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all duration-300 flex items-center justify-center gap-2 md:gap-3
              ${isFormValid && !isSubmitting
                ? "bg-white border-2 border-purple-500 text-purple-600 hover:bg-purple-50 shadow-md active:scale-[0.98]"
                : "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
                جاري الإضافة...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                <span>🛒 إضافة للسلة</span>
              </>
            )}
          </motion.button>

          {/* زرار شراء الآن + متابعة للدفع */}
          <motion.button
            onClick={handleBuyNow}
            disabled={isSubmitting || !isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`
              relative group flex-1 px-5 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 overflow-hidden
              ${isFormValid && !isSubmitting
                ? "bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-xl shadow-purple-200 active:scale-[0.98]"
                : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {isFormValid && !isSubmitting && (
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000" />
            )}
            
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                جاري المعالجة...
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4 md:w-5 md:h-5" />
                <span>💳 شراء الآن</span>
              </>
            )}
          </motion.button>
        </div>

        {/* رسالة توجيهية عند اكتمال البيانات */}
        {isFormValid && !isSubmitting && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] md:text-xs text-purple-500 bg-purple-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full"
          >
            ✨ ممتاز! جميع البيانات مكتملة، يمكنك إضافة العرض للسلة الآن
          </motion.p>
        )}
      </motion.div>

      {/* Modal التأكيد */}
      <SuccessModal
        visible={showSuccessModal}
        onClose={closeModal}
        message={successMessage}
        onContinue={handleContinueShopping}
        onCheckout={handleCheckout}
      />

      <style jsx>{`
        @media (max-width: 768px) {
          .mobile-select-drawer .ant-drawer-content-wrapper {
            max-height: 80vh !important;
          }
        }
      `}</style>
    </div>
  );
}

export default SCOrderCollection;