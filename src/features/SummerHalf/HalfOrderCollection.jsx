import { useState, useMemo, useEffect, useRef } from "react";
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
          {Icon && <Icon className="w-4 h-4 text-pink-500" />}
          {label}
        </label>
        <button
          onClick={() => !disabled && setOpen(true)}
          disabled={disabled}
          className={`
            w-full px-4 py-3 text-right bg-white border rounded-xl 
            flex items-center justify-between transition-all duration-200
            ${disabled ? "bg-gray-50 border-gray-200 cursor-not-allowed" : "hover:border-pink-300 active:scale-[0.99]"}
            ${value ? "border-pink-300 ring-1 ring-pink-200" : "border-gray-200"}
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
              <Package className="w-8 h-8 mx-auto mb-2 opacity-50" />
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
                  w-full px-4 py-3 text-right transition-all duration-150 active:bg-pink-50
                  flex items-center justify-between
                  ${value === option.value ? "bg-pink-50" : "hover:bg-gray-50"}
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
                  <CheckCircle className="w-5 h-5 text-pink-500" />
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
                className="flex-1 px-4 py-2.5 border-2 border-pink-500 text-pink-600 rounded-xl font-medium hover:bg-pink-50 active:scale-95 transition-all"
              >
                🛒 متابعة التسوق
              </button>
              <button
                onClick={onCheckout}
                className="flex-1 px-4 py-2.5 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-medium hover:shadow-lg active:scale-95 transition-all"
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
  scrollToOffers,
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
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Get products based on active tab
  const getFilteredProducts = () => {
    let filtered = HalfColoneData.filter((p) => p.tabType === activeTab);
    if (activeTab === "set" && selectedOffer?.type) {
      filtered = filtered.filter((p) => p.type === selectedOffer.type);
    }
    return filtered;
  };

  const products = useMemo(
    () => getFilteredProducts(),
    [activeTab, selectedOffer]
  );
  
  const [pieces, setPieces] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      productId:
        disableProductSelection && defaultProductName
          ? products.find((p) => p.name === defaultProductName)?.id || null
          : null,
      color: "",
    }))
  );

  // Update pieces when count or tab changes
  useEffect(() => {
    setPieces(
      Array.from({ length: count }, (_, i) => ({
        id: i + 1,
        productId:
          disableProductSelection && defaultProductName
            ? products.find((p) => p.name === defaultProductName)?.id || null
            : null,
        color: "",
      }))
    );
    setSelectedSizes({});
    setCompletedCards({});
  }, [count, activeTab, disableProductSelection, defaultProductName, products]);

  // Auto set tab based on offer
  useEffect(() => {
    if (selectedOffer?.tabType) {
      setActiveTab(selectedOffer.tabType);
    }
  }, [selectedOffer]);

  // Check completion for each card
  useEffect(() => {
    const completed = {};
    pieces.forEach((piece) => {
      completed[piece.id] = !!(
        piece.productId &&
        piece.color &&
        selectedSizes[piece.id]
      );
    });
    setCompletedCards(completed);
  }, [pieces, selectedSizes]);

  const getProductById = (id) => HalfColoneData.find((p) => p.id === id);
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
      لافندر: "#E0B0FF",
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

  const handleProductChange = (id, productId) => {
    setPieces((prev) =>
      prev.map((p) => (p.id === id ? { ...p, productId, color: "" } : p))
    );
  };

  const handleColorChange = (id, color) => {
    setPieces((prev) => prev.map((p) => (p.id === id ? { ...p, color } : p)));
  };

  const handleSizeChange = (id, size) => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const getProductImage = (product, colorName) => {
    if (!product) return "";
    const colorIndex = product.avalibeColors?.findIndex((c) => c === colorName);
    if (
      colorIndex !== -1 &&
      colorIndex >= 0 &&
      product.productColors?.[colorIndex]
    ) {
      return product.productColors[colorIndex].img;
    }
    return product.productColors?.[0]?.img || "";
  };

  const prepareCartItem = () => {
    const orderWithDetails = pieces.map((piece) => {
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

  const isFormValid = pieces.every(
    (piece) => piece.productId && piece.color && selectedSizes[piece.id]
  );

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
          <span>
            تم إضافة <strong>العرض</strong> إلى السلة بنجاح! 🛒
          </span>
        </div>,
        {
          position: "bottom-center",
          autoClose: 3000,
          icon: false,
        }
      );

      onOrderConfirmed?.();

      if (shouldNavigate) {
        setSuccessMessage(`🎁 تم إضافة العرض بنجاح إلى سلة التسوق!`);
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

  const completedCount = Object.values(completedCards).filter(Boolean).length;
  const completionPercentage = (completedCount / pieces.length) * 100 || 0;

  if (!selectedOffer || count === 0) {
    return (
      <div className="py-12 md:py-20 text-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-sm mx-auto"
        >
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 md:w-10 md:h-10 text-pink-300" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1">
            اختار عرضك
          </h3>
          <p className="text-gray-400 text-xs md:text-sm">
            برجاء اختيار عرض مناسب من الأعلى
          </p>
        </motion.div>
        <motion.button
          onClick={handleGoToOffers}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative mt-6 bg-gradient-to-r from-[#864e63] to-[#c6abff] text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-bold shadow-lg hover:shadow-[#864e63]/30 transition-all duration-300 flex items-center justify-center gap-2 mx-auto text-sm md:text-base"
        >
          <Tag className="w-4 h-4" />
          اختاري عرضك المناسب
          <Sparkles className="w-4 h-4" />
        </motion.button>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="py-6 md:py-12 px-3 md:px-4 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center mb-8 md:mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.1 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-3 md:px-4 py-1 rounded-full mb-4 shadow-lg shadow-pink-200"
        >
          <Sparkles className="w-3 h-3" />
          <span className="text-[11px] md:text-xs font-medium">تخصيص طلبك</span>
        </motion.div>

        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 px-2">
          اختر تفاصيل{" "}
          <span className="bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">
            قطعتك
          </span>
        </h2>
        <p className="text-gray-400 text-xs md:text-sm px-4">
          قم بتخصيص كل قطعة بالمنتج واللون والمقاس المناسب
        </p>

        {/* Premium Progress Bar */}
        <div className="max-w-md mx-auto mt-6 md:mt-8 px-4">
          <div className="flex justify-between text-xs md:text-sm mb-2">
            <span className="text-gray-500">تقدم الطلب</span>
            <span className="font-bold text-pink-500">
              {completedCount}/{pieces.length}
            </span>
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
              className="text-[11px] md:text-xs text-green-500 mt-2"
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
            className="flex justify-center mb-6 md:mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-pink-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-pink-100">
              <Lock className="w-3 h-3 md:w-3.5 md:h-3.5 text-pink-500" />
              <span className="text-xs md:text-sm text-pink-600">
                المنتج محدد:{" "}
                <span className="font-semibold">{defaultProductName}</span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Premium Cards Grid */}
      <div className="grid sm:grid-cols-2  grid-cols-1 gap-4 md:gap-6">
        {pieces.map((piece, idx) => {
          const product = getProductById(piece.productId);
          const colors = getProductColors(piece.productId);
          const sizes = getProductSizes(piece.productId);
          const isCompleted = completedCards[piece.id];
          const isHovered = hoveredCard === piece.id;

          // Prepare options for mobile selects
          const productOptions = products.map((p) => ({
            value: p.id,
            label: p.name,
            icon: p.name.includes("هاف") ? "Package" : p.name.includes("بندانه") ? "Shirt" : "Layers",
          }));

          const colorOptions = colors.map((c) => ({
            value: c,
            label: c,
            color: getColorCode(c),
          }));

          const sizeOptions = sizes.map((s) => ({
            value: s.size,
            label: `${s.size} - ${s.age}`,
            size: s.size,
            age: s.age,
          }));

          return (
            <motion.div
              key={piece.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.4 }}
              className="relative"
            >
              <div
                className={`
                  relative bg-white rounded-xl md:rounded-2xl transition-all duration-300 overflow-hidden
                  ${isCompleted ? "ring-2 ring-pink-400 ring-offset-2" : "border border-gray-100"}
                  shadow-md
                `}
              >
                <div
                  className={`
                    px-4 md:px-5 py-3 md:py-4 border-b transition-all duration-300
                    ${isCompleted ? "bg-gradient-to-r from-pink-50 to-white border-pink-100" : "bg-white border-gray-100"}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div
                        className={`
                          w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-bold transition-all duration-300
                          ${
                            isCompleted
                              ? "bg-pink-500 text-white shadow-lg shadow-pink-200"
                              : "bg-gray-100 text-gray-600"
                          }
                        `}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                        ) : (
                          <span className="text-xs md:text-sm">{piece.id}</span>
                        )}
                      </div>
                      <div>
                        <p className="text-[10px] md:text-xs text-gray-400">القطعة</p>
                        <p className="text-base md:text-lg font-bold text-gray-800">
                          #{piece.id}
                        </p>
                      </div>
                    </div>

                    {product && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 rounded-lg">
                        {product.name.includes("هاف") ? (
                          <Package className="w-3 h-3 text-gray-400" />
                        ) : product.name.includes("بندانه") ? (
                          <Shirt className="w-3 h-3 text-gray-400" />
                        ) : (
                          <Layers className="w-3 h-3 text-gray-400" />
                        )}
                        <span className="text-[10px] md:text-xs text-gray-500">
                          {product.name.split(" ").slice(0, 2).join(" ")}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-4 md:p-5 space-y-3 md:space-y-4">
                  {/* Product Selection */}
                  {isMobile ? (
                    <MobileSelect
                      value={piece.productId}
                      onChange={(val) => handleProductChange(piece.id, val)}
                      options={productOptions}
                      placeholder="اختر المنتج"
                      label="المنتج"
                      icon={ShoppingBag}
                      disabled={disableProductSelection}
                      renderOption={(option) => (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center">
                            {option.label.includes("هاف") ? (
                              <Package className="w-4 h-4 text-pink-500" />
                            ) : option.label.includes("بندانه") ? (
                              <Shirt className="w-4 h-4 text-pink-500" />
                            ) : (
                              <Layers className="w-4 h-4 text-pink-500" />
                            )}
                          </div>
                          <div className="flex-1 text-right">
                            <p className="font-medium text-gray-800 text-sm">
                              {option.label}
                            </p>
                          </div>
                        </div>
                      )}
                    />
                  ) : (
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
                        {products.map((p) => (
                          <Select.Option key={p.id} value={p.id}>
                            <div className="flex items-center gap-3 py-1">
                              <div className="w-8 h-8 bg-pink-50 rounded-lg flex items-center justify-center">
                                {p.name.includes("هاف") ? (
                                  <Package className="w-4 h-4 text-pink-500" />
                                ) : p.name.includes("بندانه") ? (
                                  <Shirt className="w-4 h-4 text-pink-500" />
                                ) : (
                                  <Layers className="w-4 h-4 text-pink-500" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">
                                  {p.name}
                                </p>
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
                        onChange={(val) => handleColorChange(piece.id, val)}
                        options={colorOptions}
                        placeholder="اختر اللون"
                        label="اللون"
                        icon={Palette}
                        disabled={!piece.productId}
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
                          {colors.map((c) => (
                            <Select.Option key={c} value={c}>
                              <div className="flex items-center gap-2">
                                <div
                                  className="w-5 h-5 rounded-full shadow-inner"
                                  style={{
                                    backgroundColor: getColorCode(c),
                                    border: c === "أبيض" ? "1px solid #E5E7EB" : "none",
                                  }}
                                />
                                <span>{c}</span>
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
                        onChange={(val) => handleSizeChange(piece.id, val)}
                        options={sizeOptions}
                        placeholder="اختر المقاس"
                        label="المقاس"
                        icon={Ruler}
                        disabled={!piece.productId || !piece.color}
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
                          {sizes.map((s) => (
                            <Select.Option key={s.size} value={s.size}>
                              <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-800">
                                  {s.size}
                                </span>
                                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full">
                                  {s.age}
                                </span>
                              </div>
                            </Select.Option>
                          ))}
                        </Select>
                      </div>
                    )}
                  </div>

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

                <div
                  className={`
                    px-4 md:px-5 py-2 md:py-3 border-t transition-all duration-300
                    ${isCompleted ? "bg-gradient-to-r from-pink-50 to-white border-pink-100" : "bg-gray-50 border-gray-100"}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${isCompleted ? "bg-green-500" : "bg-gray-300"}`}
                      />
                      <span className="text-[10px] md:text-xs text-gray-500">
                        {isCompleted ? "مكتملة ✓" : "في انتظار التحديد"}
                      </span>
                    </div>
                    {isCompleted && (
                      <span className="text-[10px] md:text-xs text-pink-500 font-medium">
                        جاهز للإضافة
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Buttons Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex flex-col items-center gap-4 md:gap-6 mt-8 md:mt-12"
      >
        {/* Simple explanation */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 text-[10px] md:text-xs text-gray-400">
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full" />
            <span>🛒 إضافة للسلة: احفظ العرض وارجع للتسوق</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full" />
            <span>💳 شراء الآن: اذهب مباشرة لإتمام الطلب</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 w-full max-w-2xl px-4">
          {/* Add to Cart Button */}
          <motion.button
            onClick={handleAddOnly}
            disabled={isSubmitting || !isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`
              relative group flex-1 px-5 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all duration-300 flex items-center justify-center gap-2 md:gap-3
              ${
                isFormValid && !isSubmitting
                  ? "bg-white border-2 border-pink-500 text-pink-600 hover:bg-pink-50 shadow-md active:scale-[0.98]"
                  : "bg-gray-100 border-2 border-gray-200 text-gray-400 cursor-not-allowed"
              }
            `}
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 md:w-5 md:h-5 border-2 border-pink-500 border-t-transparent rounded-full animate-spin" />
                جاري الإضافة...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
                <span>🛒 إضافة للسلة</span>
              </>
            )}
          </motion.button>

          {/* Buy Now Button */}
          <motion.button
            onClick={handleBuyNow}
            disabled={isSubmitting || !isFormValid}
            whileHover={isFormValid ? { scale: 1.02 } : {}}
            whileTap={isFormValid ? { scale: 0.98 } : {}}
            className={`
              relative group flex-1 px-5 md:px-8 py-3 md:py-4 rounded-xl font-bold text-sm md:text-lg transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 overflow-hidden
              ${
                isFormValid && !isSubmitting
                  ? "bg-gradient-to-r from-pink-500 to-pink-600 text-white shadow-xl shadow-pink-200 active:scale-[0.98]"
                  : "bg-gray-100 text-gray-400 cursor-not-allowed"
              }
            `}
          >
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

        {/* Completion message */}
        {isFormValid && !isSubmitting && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[11px] md:text-xs text-pink-500 bg-pink-50 px-3 md:px-4 py-1.5 md:py-2 rounded-full"
          >
            ✨ ممتاز! جميع البيانات مكتملة، يمكنك إضافة العرض للسلة الآن
          </motion.p>
        )}
      </motion.div>

      {/* Success Modal */}
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

export default HalfOrderCollection;