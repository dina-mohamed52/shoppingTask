import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import {
  ArrowLeft,
  Package,
  Crown,
  CheckCircle,
  Sparkles,
  Heart,
  ShoppingBag,
  Gem,
  Shield,
  Clock,
  User,
  Phone,
  Smartphone,
  MapPinned,
  Home,
  CreditCard,
  Truck,
  XCircle,
  Tag,
  Ruler,
  Layers,
  Trash2,
  Zap,
  Gift,
} from "lucide-react";
import { useCart } from "../features/cart/CartContext";
import ConfirmOrderModal from "../ui/ConfirmOrderModal";

const EGYPT_GOVS = [
  "القاهرة", "الإسكندرية", "الجيزة", "البحيرة", "كفر الشيخ",
  "الدقهلية", "الشرقية", "الغربية", "المنوفية", "القليوبية",
  "دمياط", "الإسماعيلية", "السويس", "بورسعيد", "الفيوم",
  "بني سويف", "المنيا", "أسيوط", "سوهاج", "قنا", "الأقصر",
  "أسوان", "مطروح", "شمال سيناء", "جنوب سيناء", "البحر الأحمر", "الوادي الجديد",
];

const HIGH_SHIPPING_GOVS = ["مطروح", "البحر الأحمر", "الوادي الجديد", "جنوب سيناء", "شمال سيناء"];
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgp_vt9LBjp47TL5X4sHwYfyQB1OeyiwXun6TmLV9_q4hPaD9H02YFI-2JJXW8awAr0w/exec";

const getColorCode = (colorName) => {
  const colors = {
    'أسود': '#1a1a1a',
    'أبيض': '#ffffff',
    'ذهبي': '#FFD700',
    'فضي': '#C0C0C0',
    'بني': '#8B4513',
    'بيج': '#F5F5DC',
    'سكري': '#F5F5DC',
    'أحمر': '#FF0000',
    'أزرق': '#2563EB',
    'أخضر': '#16A34A',
    'بينك': '#F472B6',
    'برتقالي': '#F97316',
    'رمادي': '#6B7280',
    'رصاصي': '#6B7280',
    'لافندر': '#8B5CF6',
  };
  return colors[colorName] || '#9CA3AF';
};

function CheckoutPage() {
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [errors, setErrors] = useState({});

  const { cartItems, removeItem, clearCart } = useCart();

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    phone2: "",
    address: "",
    city: "",
    notes: "",
  });

  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const phone2Ref = useRef(null);
  const cityRef = useRef(null);
  const addressRef = useRef(null);

  const subtotal = cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shipping = HIGH_SHIPPING_GOVS.includes(formData.city) ? 90 : 60;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const scrollToFirstError = (errorFields) => {
    const fieldOrder = ["fullName", "phone", "phone2", "city", "address"];
    const refMap = { fullName: fullNameRef, phone: phoneRef, phone2: phone2Ref, city: cityRef, address: addressRef };
    for (let field of fieldOrder) {
      if (errorFields[field] && refMap[field]?.current) {
        refMap[field].current.scrollIntoView({ behavior: "smooth", block: "center" });
        break;
      }
    }
  };

  const showErrorsInAlert = (errorFields) => {
    const errorList = [];
    if (errorFields.fullName) errorList.push("⚠️ الاسم الكامل مطلوب");
    if (errorFields.phone) errorList.push("⚠️ رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01");
    if (errorFields.phone2 === "رقم الهاتف الإضافي غير صحيح") errorList.push("⚠️ رقم الهاتف الإضافي غير صحيح");
    if (errorFields.city) errorList.push("⚠️ المحافظة مطلوبة");
    if (errorFields.address) errorList.push("⚠️ العنوان مطلوب");
    if (errorFields.phone2 === "رقم الهاتف الإضافي يجب أن يختلف عن الرقم الأساسي")
      errorList.push("⚠️ رقم الهاتف الإضافي يجب أن يختلف عن الرقم الأساسي");
    if (errorList.length) alert(`❌ الرجاء تصحيح الأخطاء التالية:\n\n${errorList.join("\n")}`);
  };

  const validate = () => {
    const newErrors = {};
    const phone1 = formData.phone.trim();
    const phone2 = formData.phone2.trim();
    if (!formData.fullName.trim()) newErrors.fullName = "الاسم الكامل مطلوب";
    if (!/^01[0-9]{9}$/.test(phone1)) newErrors.phone = "رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01";
    if (phone2 && !/^01[0-9]{9}$/.test(phone2)) newErrors.phone2 = "رقم الهاتف الإضافي غير صحيح";
    if (phone1 && phone2 && phone1 === phone2) newErrors.phone2 = "رقم الهاتف الإضافي يجب أن يختلف عن الرقم الأساسي";
    if (!formData.address.trim()) newErrors.address = "العنوان مطلوب";
    if (!formData.city.trim()) newErrors.city = "المحافظة مطلوبة";
    return newErrors;
  };

  // const sendToGoogleSheet = async () => {
  //   const orderDetails = cartItems.map(item => {
  //     if (item.isOffer) {
  //       return item.offerDetails?.pieces?.map(piece => 
  //         `${piece.name} ${piece.size ? ` - مقاس ${piece.size}` : ""} - ${piece.color} `
  //       ).join(" | ");
  //     }
  //     return `${item.name} - ${item.size || ""} - ${item.color || ""} `;
  //   }).join(" | ");

  const sendToGoogleSheet = async () => {
    const orderDetails = cartItems
      .map((item) => {
        if (item.isOffer) {
          return item.offerDetails?.pieces
            ?.map(
              (piece) =>
                `${piece.name}${piece.size ? ` - مقاس ${piece.size}` : ""
                } - ${piece.color}`,
            )
            .join(" | ");
        }
        return `${item.name} - ${item.size || ""} - ${item.color || ""}`;
      })
      .join(" | ");

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        date: new Date().toLocaleDateString("en-GB"),
        name: formData.fullName,
        phone: formData.phone,
        phone2: formData.phone2 || "-",
        address: `${formData.city} - ${formData.address}`,
        order: orderDetails,
        total: total,
      }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || "فشل في إرسال الطلب");
    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      showErrorsInAlert(newErrors);
      scrollToFirstError(newErrors);
      return;
    }
    setLoading(true);
    try {
      await sendToGoogleSheet();
      if (window.fbq) window.fbq("track", "Purchase", { value: total, currency: "EGP", eventID: "order_" + Date.now() });
      setShowConfirmModal(true);
      setTimeout(() => {
        setShowConfirmModal(false);
        setOrderPlaced(true);
        clearCart();
        setTimeout(() => navigate("/"), 2000);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      alert(`❌ حدث خطأ في إرسال الطلب:\n${error.message || "يرجى المحاولة مرة أخرى"}`);
      setErrors({ submit: error.message || "حدث خطأ في إرسال الطلب" });
    } finally {
      setLoading(false);
    }
  };

  const getFieldClass = (fieldName) => {
    const baseClass = "w-full bg-white/50 backdrop-blur-sm border-2 rounded-xl py-3.5 px-4 text-gray-700 text-sm outline-none transition-all duration-300 placeholder:text-gray-400";
    if (errors[fieldName]) return `${baseClass} border-red-400 focus:border-red-500`;
    return `${baseClass} border-[#F5A0CA] focus:border-[#F472B6] focus:shadow-lg focus:shadow-[#F5A0CA]/20`;
  };

  if (orderPlaced) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-gradient-to-br from-[#F5A0CA]/20 via-white to-[#F472B6]/10 flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }} className="w-24 h-24 mx-auto bg-gradient-to-r from-[#F472B6] to-[#F5A0CA] rounded-2xl flex items-center justify-center mb-6 shadow-2xl">
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-2xl font-bold text-[#1C2533] mb-2">
            تم استلام طلبك! 🎉
          </motion.h2>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} className="text-gray-500">
            شكراً لتسوقك معنا
          </motion.p>
          <motion.p initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-sm text-gray-400 mt-4">
            جاري تحويلك إلى الصفحة الرئيسية...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  if (!cartItems?.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#F5A0CA]/20 via-white to-[#F472B6]/10 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto bg-white/50 backdrop-blur-sm rounded-full flex items-center justify-center mb-6 shadow-xl">
            <ShoppingBag className="w-14 h-14 text-[#F472B6]" />
          </div>
          <h2 className="text-2xl font-bold text-[#1C2533] mb-2">سلة التسوق فارغة</h2>
          <p className="text-gray-400 mb-6">أضف بعض المنتجات الجميلة إلى سلة التسوق</p>
          <button onClick={() => navigate("/")} className="px-8 py-3 bg-gradient-to-r from-[#F472B6] to-[#F5A0CA] text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all">
            ابدأ التسوق الآن
          </button>
        </div>
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-br from-[#F5A0CA]/10 via-white to-[#F472B6]/5">
      {/* Header - Modern Glassmorphism */}
      <div className="bg-white/70 backdrop-blur-md sticky top-0 z-50 border-b border-[#F5A0CA]/30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.button whileHover={{ x: -5 }} onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-[#F472B6] transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">رجوع</span>
            </motion.button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-[#F472B6] to-[#F5A0CA] rounded-xl flex items-center justify-center shadow-md">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-[#1C2533]">
                إتمام الطلب
              </h1>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#F5A0CA]/20 to-[#F472B6]/20 px-4 py-2 rounded-full shadow-inner">
              <Package className="w-4 h-4 text-[#F472B6]" />
              <span className="text-sm font-semibold text-[#1C2533]">
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)} منتجات
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Cart Items & Form */}
          <div className="lg:col-span-7 space-y-6">
            {/* Cart Items - Modern Cards with Animation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#F5A0CA]/30 overflow-hidden"
            >
              <div className="px-6 py-5 bg-gradient-to-r from-[#F5A0CA]/20 to-[#F472B6]/10 border-b border-[#F5A0CA]/20">
                <h2 className="font-bold text-[#1C2533] text-lg flex items-center gap-2">
                  <Gift className="w-5 h-5 text-[#F472B6]" />
                  سلة التسوق
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">مراجعة المنتجات المختارة</p>
              </div>

              <div className="divide-y divide-[#F5A0CA]/20">
                {cartItems.map((item, idx) => (
                  <motion.div
                    key={item.id || idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-5 hover:bg-[#F5A0CA]/5 transition-colors group"
                  >
                    <div className="flex gap-4">
                      {/* Image */}
                      {item.image && (
                        <div className="flex-shrink-0">
                          <div className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-white">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex flex-wrap justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-[#1C2533] text-base">
                              {item.isOffer ? item.offerDetails?.name : item.name}
                            </h3>
                            {item.isOffer && (
                              <span className="inline-flex items-center gap-1 text-xs
                               bg-gradient-to-r from-pink-400 to-blue-900 text-white px-2 py-0.5 rounded-full mt-1">
                                <Zap className="w-3 h-3" />
                                عرض خاص
                              </span>
                            )}
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] to-[#F5A0CA] text-xl">
                              {item.price * item.quantity} ج.م
                            </div>
                            <div className="text-xs text-gray-400 mt-1">{item.price} ج.م / قطعة</div>
                          </div>
                        </div>

                        {/* Product specs - Modern Chips */}
                        <div className="flex flex-wrap gap-2 mt-3">
                          {!item.isOffer && item.size && (
                            <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 rounded-xl text-gray-700 border border-gray-200">
                              <Ruler className="w-3.5 h-3.5 text-[#F472B6]" />
                              مقاس {item.size}
                            </div>
                          )}
                          {!item.isOffer && item.color && (
                            <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-gray-100 to-gray-50 px-3 py-1.5 rounded-xl border border-gray-200">
                              <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: getColorCode(item.color) }}></div>
                              <span className="text-gray-700">{item.color}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1.5 text-xs bg-gradient-to-r from-[#F5A0CA]/20 to-[#F472B6]/10 px-3 py-1.5 rounded-xl">
                            <Package className="w-3.5 h-3.5 text-[#F472B6]" />
                            <span className="text-[#1C2533] font-medium">الكمية: {item.quantity}</span>
                          </div>
                        </div>

                        {/* Offer pieces - Modern Design */}
                        {item.isOffer && item.offerDetails?.pieces && (
                          <div className="mt-4 pt-3 border-t border-dashed border-[#F5A0CA]/20">
                            <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                              <Layers className="w-3.5 h-3.5" />
                              مكونات الباقة:
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {item.offerDetails.pieces.map((piece, pIdx) => (
                                <div key={pIdx} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl text-xs border border-gray-100 shadow-sm">
                                  <span className="font-medium text-gray-700">{piece.name}</span>
                                  {piece.color && (
                                    <div className="flex items-center gap-1">
                                      <div className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ backgroundColor: getColorCode(piece.color) }}></div>
                                      <span className="text-gray-500">{piece.color}</span>
                                    </div>
                                  )}
                                  {piece.size && <span className="text-gray-500">م {piece.size}</span>}
                                  {piece.quantity > 1 && <span className="text-[#F472B6] font-medium">×{piece.quantity}</span>}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Remove button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-red-500 mt-3 transition-all hover:gap-2"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          حذف المنتج
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Shipping Form - Modern Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-[#F5A0CA]/30 overflow-hidden"
            >
              <div className="px-6 py-5 bg-gradient-to-r from-[#F5A0CA]/20 to-[#F472B6]/10 border-b border-[#F5A0CA]/20">
                <h2 className="font-bold text-[#1C2533] text-lg flex items-center gap-2">
                  <MapPinned className="w-5 h-5 text-[#F472B6]" />
                  معلومات الشحن
                </h2>
                <p className="text-sm text-gray-500 mt-0.5">أدخل بياناتك لتوصيل طلبك</p>
              </div>

              <form onSubmit={handleSubmit} className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2" ref={fullNameRef}>
                    <label className="block text-sm font-semibold text-[#1C2533] mb-2">الاسم الكامل *</label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={getFieldClass("fullName")} placeholder="أدخل اسمك الكامل" />
                  </div>
                  <div ref={phoneRef}>
                    <label className="block text-sm font-semibold text-[#1C2533] mb-2">رقم الهاتف *</label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={getFieldClass("phone")} placeholder="01XXXXXXXXX" />
                  </div>
                  <div ref={phone2Ref}>
                    <label className="block text-sm font-semibold text-[#1C2533] mb-2">رقم هاتف إضافي <span className="text-gray-400 text-xs">(اختياري)</span></label>
                    <input type="tel" name="phone2" value={formData.phone2} onChange={handleChange} className={getFieldClass("phone2")} placeholder="رقم آخر للتواصل" />
                  </div>
                  <div ref={cityRef}>
                    <label className="block text-sm font-semibold text-[#1C2533] mb-2">المحافظة *</label>
                    <select name="city" value={formData.city} onChange={handleChange} className={getFieldClass("city")}>
                      <option value="">اختر المحافظة</option>
                      {EGYPT_GOVS.map(gov => <option key={gov} value={gov}>{gov}</option>)}
                    </select>
                  </div>
                  <div className="md:col-span-2" ref={addressRef}>
                    <label className="block text-sm font-semibold text-[#1C2533] mb-2">العنوان بالتفصيل *</label>
                    <textarea name="address" value={formData.address} onChange={handleChange} rows="3" className={getFieldClass("address")} placeholder="رقم المبني، الشارع، الحي، العلامة المميزة..." />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-[#1C2533] mb-2">ملاحظات إضافية <span className="text-gray-400 text-xs">(اختياري)</span></label>
                    <textarea name="notes" value={formData.notes} onChange={handleChange} rows="2" className="w-full bg-white/50 backdrop-blur-sm border-2 border-[#F5A0CA] rounded-xl py-3 px-4 text-gray-700 text-sm focus:border-[#F472B6] focus:outline-none transition-all" placeholder="أي ملاحظات إضافية للطلب..." />
                  </div>
                </div>

                {errors.submit && (
                  <div className="mt-4 p-3 bg-red-50 text-red-500 rounded-xl text-center text-sm">
                    {errors.submit}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-[#F472B6] via-[#F5A0CA] to-[#F472B6] text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
                >
                  {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <><CreditCard className="w-5 h-5" /> تأكيد الطلب - {total} ج.م</>}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Right Column - Order Summary Premium */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <div className="bg-gradient-to-br from-white/90 to-[#F5A0CA]/10 backdrop-blur-sm rounded-3xl shadow-xl border border-[#F5A0CA]/30 overflow-hidden">
                <div className="px-6 py-5 bg-gradient-to-r from-[#F472B6] to-[#F5A0CA]">
                  <h3 className="font-bold text-white text-lg flex items-center gap-2">
                    <Gem className="w-5 h-5" />
                    ملخص الطلب
                  </h3>
                  <p className="text-white/80 text-sm mt-0.5">تفاصيل مشترياتك</p>
                </div>

                <div className="p-6 space-y-5">
                  {/* Products quick list */}
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {cartItems.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm py-2 border-b border-[#F5A0CA]/20">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600 truncate max-w-[150px]">
                            {item.isOffer ? item.offerDetails?.name : item.name}
                          </span>
                          <span className="text-[#F472B6] text-xs font-bold">×{item.quantity}</span>
                        </div>
                        <span className="font-semibold text-[#1C2533]">{item.price * item.quantity} ج.م</span>
                      </div>
                    ))}
                  </div>

                  {/* Price Details */}
                  <div className="space-y-3 pt-3 border-t border-[#F5A0CA]/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">المجموع الفرعي</span>
                      <span className="text-[#1C2533] font-medium">{subtotal} ج.م</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1"><Truck className="w-4 h-4" /> الشحن</span>
                      <span className="text-[#1C2533] font-medium">{shipping} ج.م</span>
                    </div>
                    {HIGH_SHIPPING_GOVS.includes(formData.city) && formData.city && (
                      <div className="text-xs text-[#F472B6] flex items-center justify-end gap-1">
                        <Sparkles className="w-3 h-3" />
                        30 ج.م إضافية للمحافظات البعيدة
                      </div>
                    )}
                    <div className="border-t-2 border-dashed border-[#F5A0CA]/30 pt-3 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-[#1C2533] text-lg">الإجمالي</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-[#F472B6] to-[#F5A0CA] bg-clip-text text-transparent">
                          {total} ج.م
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 text-left mt-1">شامل الضريبة ورسوم التوصيل</p>
                    </div>
                  </div>

                  {/* Trust badges - Modern */}
                  <div className="flex justify-around pt-4 border-t border-[#F5A0CA]/20">
                    <div className="text-center group">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#F5A0CA]/20 to-[#F472B6]/10 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Shield className="w-5 h-5 text-[#F472B6]" />
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium">دفع آمن</p>
                    </div>
                    <div className="text-center group">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#F5A0CA]/20 to-[#F472B6]/10 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Clock className="w-5 h-5 text-[#F472B6]" />
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium">توصيل سريع</p>
                    </div>
                    <div className="text-center group">
                      <div className="w-12 h-12 mx-auto bg-gradient-to-br from-[#F5A0CA]/20 to-[#F472B6]/10 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                        <Gem className="w-5 h-5 text-[#F472B6]" />
                      </div>
                      <p className="text-[10px] text-gray-500 font-medium">منتج أصلي</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <ConfirmOrderModal visible={showConfirmModal} onClose={() => setShowConfirmModal(false)} />
    </div>
  );
}

export default CheckoutPage;