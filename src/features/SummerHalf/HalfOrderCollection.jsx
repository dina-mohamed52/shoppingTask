import { useState, useMemo, useEffect } from "react";
import { HalfColoneData } from "../../data/HalfColon";
import { 
  ShoppingBag, 
  CheckCircle, 
  Palette, 
  Ruler,
  Package,
  Shirt,
  Layers,
  Lock,
  TrendingUp,
  Sparkles,
  Tag,
  ShoppingCart,
  ArrowRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Select } from "antd";
import { useCart } from "../cart/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// مكون Modal صغير للتأكيد
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
                className="flex-1 px-4 py-2.5 border-2 border-pink-500 text-pink-600 rounded-xl font-medium hover:bg-pink-50 transition-all"
              >
                🛒 متابعة التسوق
              </button>
              <button
                onClick={onCheckout}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg transition-all"
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

function HalfOrderCollection({ 
  selectedOffer, 
  disableProductSelection = false, 
  defaultProductName = null,
  onOrderConfirmed,
  scrollToOffers 
}) {
  const count = selectedOffer?.quantity || 0;
  const [activeTab, setActiveTab] = useState("half");
  const [selectedSizes, setSelectedSizes] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [completedCards, setCompletedCards] = useState({});
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [pendingNavigation, setPendingNavigation] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Get products based on active tab
  const getFilteredProducts = () => {
    let filtered = HalfColoneData.filter(p => p.tabType === activeTab);
    if (activeTab === "set" && selectedOffer?.type) {
      filtered = filtered.filter(p => p.type === selectedOffer.type);
    }
    return filtered;
  };

  const products = useMemo(() => getFilteredProducts(), [activeTab, selectedOffer]);
  const [pieces, setPieces] = useState(() => 
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      productId: disableProductSelection && defaultProductName 
        ? products.find(p => p.name === defaultProductName)?.id || null
        : null,
      color: "",
    }))
  );

  // Update pieces when count or tab changes
  useEffect(() => {
    setPieces(Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      productId: disableProductSelection && defaultProductName 
        ? products.find(p => p.name === defaultProductName)?.id || null
        : null,
      color: "",
    })));
    setSelectedSizes({});
    setCompletedCards({});
  }, [count, activeTab, disableProductSelection, defaultProductName]);

  // Auto set tab based on offer
  useEffect(() => {
    if (selectedOffer?.tabType) {
      setActiveTab(selectedOffer.tabType);
    }
  }, [selectedOffer]);

  // Check completion for each card
  useEffect(() => {
    const completed = {};
    pieces.forEach(piece => {
      completed[piece.id] = !!(piece.productId && piece.color && selectedSizes[piece.id]);
    });
    setCompletedCards(completed);
  }, [pieces, selectedSizes]);

  const getProductById = (id) => HalfColoneData.find(p => p.id === id);
  const getProductColors = (productId) => {
    const product = getProductById(productId);
    return product?.avalibeColors || [];
  };
  const getProductSizes = (productId) => {
    const product = getProductById(productId);
    return product?.sizes || [];
  };

  const handleGoToOffers = () => {
    if (scrollToOffers) {
      scrollToOffers();
    }
  };

  const getColorCode = (colorName) => {
    const colorMap = {
      أبيض: "#FFFFFF", أسود: "#000000", رمادي: "#9CA3AF", بيج: "#E8D5B5",
      لبني: "oklch(70.7% 0.165 254.624)", سكري: "#FFF0DB", عاجي: "#FFF0DB",
      بينك: "#FF69B4", وردي: "#FFB6C1", فوشيا: "#FF00FF", روز: "#FFC0CB",
      موف: "#C8A2C8", خوخي: "#FFDAB9", سلمون: "#FA8072", أحمر: "#FF4444",
      أصفر: "#FFD700", أخضر: "#98D8C8", نعناعي: "#A7F0D9", سماوي: "#87CEEB",
      كحلي: "#1E2F4F", نيلي: "#4B6A8B", كافيه: "#8B5E3C", بني: "#8B4513", بندقي: "#D2B48C",
      default: "#E5E7EB",
    };
    const extractedColor = Object.keys(colorMap).find((c) => colorName.includes(c)) || "default";
    return colorMap[extractedColor];
  };

  const handleProductChange = (id, productId) => {
    setPieces(prev => prev.map(p => 
      p.id === id ? { ...p, productId, color: "" } : p
    ));
  };

  const handleColorChange = (id, color) => {
    setPieces(prev => prev.map(p => 
      p.id === id ? { ...p, color } : p
    ));
  };

  const handleSizeChange = (id, size) => {
    setSelectedSizes(prev => ({ ...prev, [id]: size }));
  };

  const getProductImage = (product, colorName) => {
    if (!product) return "";
    const colorIndex = product.avalibeColors?.findIndex(c => c === colorName);
    if (colorIndex !== -1 && colorIndex >= 0 && product.productColors?.[colorIndex]) {
      return product.productColors[colorIndex].img;
    }
    return product.productColors?.[0]?.img || "";
  };

  // دالة تجهيز العرض للإضافة للسلة
  const prepareCartItem = () => {
    const orderWithDetails = pieces.map(piece => {
      const product = getProductById(piece.productId);
      return {
        id: piece.id,
        productId: piece.productId,
        name: product?.name,
        color: piece.color,
        size: selectedSizes[piece.id],
        image: getProductImage(product, piece.color),
      };
    });

    return {
      id: `offer-${selectedOffer?.id}-${Date.now()}`,
      name: selectedOffer?.name,
      nameEn: `Special Offer: ${selectedOffer?.name}`,
      price: selectedOffer?.price,
      originalPrice: selectedOffer?.originalPrice,
      quantity: 1,
      isOffer: true,
      offerDetails: {
        totalPieces: pieces.length,
        pieces: orderWithDetails,
        tabType: selectedOffer?.tabType,
      },
      image: orderWithDetails[0]?.image || "",
    };
  };

  // التحقق من صحة البيانات
  const isFormValid = pieces.every(piece => 
    piece.productId && piece.color && selectedSizes[piece.id]
  );

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
          <span>تم إضافة <strong>العرض</strong> إلى السلة بنجاح! 🛒</span>
        </div>,
        {
          position: "bottom-center",
          autoClose: 3000,
          icon: false,
        }
      );
      
      onOrderConfirmed?.();
      
      if (shouldNavigate) {
        // عرض Modal قبل التوجيه
        setSuccessMessage(`🎁 تم إضافة العرض بنجاح إلى سلة التسوق!`);
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

  const completedCount = Object.values(completedCards).filter(Boolean).length;
  const completionPercentage = (completedCount / pieces.length) * 100 || 0;

  if (!selectedOffer || count === 0) {
    return (
      <div className="py-20 text-center">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm mx-auto"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-10 h-10 text-pink-300" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">اختار عرضك</h3>
          <p className="text-gray-400 text-sm">برجاء اختيار عرض مناسب من الأعلى</p>
        </motion.div>
        <motion.button
          onClick={handleGoToOffers}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-6 bg-gradient-to-r from-[#864e63] to-[#c6abff] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-[#864e63]/30 transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
        >
          <Tag className="w-4 h-4" />
          اختاري عرضك المناسب
          <Sparkles className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-1.5 rounded-full mb-4 shadow-lg shadow-pink-200"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span className="text-xs font-medium">تخصيص طلبك</span>
        </motion.div>
        
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          اختر تفاصيل{' '}
          <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            قطعتك
          </span>
        </h2>
        <p className="text-gray-400 text-sm">قم بتخصيص كل قطعة بالمنتج واللون والمقاس المناسب</p>
        
        {/* Premium Progress Bar */}
        <div className="max-w-md mx-auto mt-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-500">تقدم الطلب</span>
            <span className="font-bold text-pink-500">{completedCount}/{pieces.length}</span>
          </div>
          <div className="relative h-2 bg-pink-100 rounded-full overflow-hidden">
            <motion.div 
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"
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
              ✨ جميع القطع مكتملة! يمكنك إضافة العرض للسلة الآن
            </motion.p>
          )}
        </div>
      </div>

      {/* Locked Product Badge */}
      <AnimatePresence>
        {disableProductSelection && defaultProductName && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-pink-50 px-4 py-2 rounded-full border border-pink-100">
              <Lock className="w-3.5 h-3.5 text-pink-500" />
              <span className="text-sm text-pink-600">
                المنتج محدد: <span className="font-semibold">{defaultProductName}</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pieces.map((piece, idx) => {
          const product = getProductById(piece.productId);
          const colors = getProductColors(piece.productId);
          const sizes = getProductSizes(piece.productId);
          const isCompleted = completedCards[piece.id];
          const isHovered = hoveredCard === piece.id;

          return (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              onHoverStart={() => setHoveredCard(piece.id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="relative"
            >
              {isHovered && (
                <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-300 to-pink-400 rounded-2xl blur-xl opacity-30 transition-opacity" />
              )}
              
              <div className={`
                relative bg-white rounded-2xl transition-all duration-300 overflow-hidden
                ${isCompleted ? "ring-2 ring-pink-400 ring-offset-2" : "border border-gray-100"}
                ${isHovered ? "shadow-2xl transform -translate-y-1" : "shadow-md hover:shadow-xl"}
              `}>
                <div className={`
                  px-5 py-4 border-b transition-all duration-300
                  ${isCompleted ? "bg-gradient-to-r from-pink-50 to-white border-pink-100" : "bg-white border-gray-100"}
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-300
                        ${isCompleted 
                          ? "bg-pink-500 text-white shadow-lg shadow-pink-200" 
                          : "bg-gray-100 text-gray-600 group-hover:bg-pink-100 group-hover:text-pink-600"
                        }
                      `}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <span className="text-sm">{piece.id}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">القطعة</p>
                        <p className="text-lg font-bold text-gray-800">#{piece.id}</p>
                      </div>
                    </div>
                    
                    {product && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg">
                        {product.name.includes("هاف") ? <Package className="w-3 h-3 text-gray-400" /> :
                         product.name.includes("بندانه") ? <Shirt className="w-3 h-3 text-gray-400" /> :
                         <Layers className="w-3 h-3 text-gray-400" />}
                        <span className="text-xs text-gray-500">{product.name.split(' ').slice(0,2).join(' ')}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                      <ShoppingBag className="w-4 h-4 text-pink-500" />
                      اختر المنتج
                    </label>
                    <Select
                      value={piece.productId}
                      onChange={(val) => handleProductChange(piece.id, val)}
                      placeholder="منتج"
                      className="w-full"
                      size="large"
                      disabled={disableProductSelection}
                      style={{ borderRadius: 12 }}
                      dropdownStyle={{ borderRadius: 12 }}
                    >
                      {products.map(p => (
                        <Select.Option key={p.id} value={p.id}>
                          <div className="flex items-center gap-3 py-1">
                            <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center">
                              {p.name.includes("هاف") ? <Package className="w-4 h-4 text-pink-500" /> :
                               p.name.includes("بندانه") ? <Shirt className="w-4 h-4 text-pink-500" /> :
                               <Layers className="w-4 h-4 text-pink-500" />}
                            </div>
                            <div>
                              <p className="font-medium text-gray-800 text-sm">{p.name}</p>
                            </div>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Palette className="w-4 h-4 text-pink-500" />
                        اللون
                      </label>
                      <Select
                        value={piece.color || undefined}
                        onChange={(val) => handleColorChange(piece.id, val)}
                        placeholder="لون"
                        className="w-full"
                        size="large"
                        disabled={!piece.productId}
                        style={{ borderRadius: 12 }}
                        dropdownStyle={{ borderRadius: 12 }}
                      >
                        {colors.map(c => (
                          <Select.Option key={c} value={c}>
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-5 h-5 rounded-full shadow-inner"
                                style={{ backgroundColor: getColorCode(c), border: c === "أبيض" ? "1px solid #E5E7EB" : "none" }}
                              />
                              <span>{c}</span>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <Ruler className="w-4 h-4 text-pink-500" />
                        المقاس
                      </label>
                      <Select
                        value={selectedSizes[piece.id]}
                        onChange={(val) => handleSizeChange(piece.id, val)}
                        placeholder="مقاس"
                        className="w-full"
                        size="large"
                        disabled={!piece.productId || !piece.color}
                        style={{ borderRadius: 12 }}
                        dropdownStyle={{ borderRadius: 12 }}
                      >
                        {sizes.map(s => (
                          <Select.Option key={s.size} value={s.size}>
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-800">{s.size}</span>
                              <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">{s.age}</span>
                            </div>
                          </Select.Option>
                        ))}
                      </Select>
                    </div>
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
                  ${isCompleted ? "bg-gradient-to-r from-pink-50 to-white border-pink-100" : "bg-gray-50 border-gray-100"}
                `}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className="text-xs text-gray-500">
                        {isCompleted ? "مكتملة ✓" : "في انتظار التحديد"}
                      </span>
                    </div>
                    {isCompleted && (
                      <span className="text-xs text-pink-500 font-medium">جاهز للإضافة</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* ✨ زرارين متحركين مع شرح */}


      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center gap-6 mt-12"
      >
        {/* شرح مبسط للخيارات */}
        <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-pink-500 rounded-full" />
            <span>🛒 إضافة للسلة: احفظ العرض وارجع للتسوق</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" />
            <span>💳 شراء الآن: اذهب مباشرة لإتمام الطلب</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4 w-full max-w-2xl">
          {/* زرار إضافة للسلة فقط */}
          <motion.button
            onClick={handleAddOnly}
            disabled={isSubmitting || !isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`
              relative group flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3
              ${isFormValid && !isSubmitting
                ? "bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50 shadow-md hover:shadow-lg"
                : "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-5 h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
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

          {/* زرار شراء الآن + متابعة للدفع */}
          <motion.button
            onClick={handleBuyNow}
            disabled={isSubmitting || !isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`
              relative group flex-1 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center justify-center gap-3 overflow-hidden
              ${isFormValid && !isSubmitting
                ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-xl shadow-pink-200 hover:shadow-2xl"
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

        {/* رسالة توجيهية عند اكتمال البيانات */}
        {isFormValid && !isSubmitting && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xs text-pink-500 bg-pink-50 px-4 py-2 rounded-full"
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
    </div>
  );
}

export default HalfOrderCollection;