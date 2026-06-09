// src/features/checkout/ShippingStep.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Smartphone,
  MapPinned,
  Home,
  AlertCircle,
  Package,
  Truck,
  CreditCard,
  Sparkles,
} from "lucide-react";
import ConfirmOrderModal from "../../ui/ConfirmOrderModal";

const EGYPT_GOVS = [
  "القاهرة",
  "الإسكندرية",
  "الجيزة",
  "البحيرة",
  "كفر الشيخ",
  "الدقهلية",
  "الشرقية",
  "الغربية",
  "المنوفية",
  "القليوبية",
  "دمياط",
  "الإسماعيلية",
  "السويس",
  "بورسعيد",
  "الفيوم",
  "بني سويف",
  "المنيا",
  "أسيوط",
  "سوهاج",
  "قنا",
  "الأقصر",
  "أسوان",
  "مطروح",
  "شمال سيناء",
  "جنوب سيناء",
  "البحر الأحمر",
  "الوادي الجديد",
];

const HIGH_SHIPPING_GOVS = [
  "مطروح",
  "البحر الأحمر",
  "الوادي الجديد",
  "جنوب سيناء",
  "شمال سيناء",
];

const SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwgp_vt9LBjp47TL5X4sHwYfyQB1OeyiwXun6TmLV9_q4hPaD9H02YFI-2JJXW8awAr0w/exec";

function ShippingStep({ onSuccess, onBack, cartItems }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    phone2: "",
    address: "",
    city: "",
    notes: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Refs للسكرول التلقائي
  const fullNameRef = useRef(null);
  const phoneRef = useRef(null);
  const phone2Ref = useRef(null);
  const cityRef = useRef(null);
  const addressRef = useRef(null);

  // حساب الشحن والمجموع
  const subtotal =
    cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shipping = HIGH_SHIPPING_GOVS.includes(formData.city) ? 90 : 60;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // دالة السكرول إلى أول عنصر فيه خطأ
  const scrollToFirstError = (errorFields) => {
    const fieldOrder = ["fullName", "phone", "phone2", "city", "address"];
    for (let field of fieldOrder) {
      if (errorFields[field]) {
        const refMap = {
          fullName: fullNameRef,
          phone: phoneRef,
          phone2: phone2Ref,
          city: cityRef,
          address: addressRef,
        };
        const targetRef = refMap[field];
        if (targetRef?.current) {
          targetRef.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
        break;
      }
    }
  };

  // دالة عرض الأخطاء كـ Alert
  const showErrorsInAlert = (errorFields) => {
    const errorMessages = {
      fullName: "⚠️ الاسم الكامل مطلوب",
      phone: "⚠️ رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01",
      phone2: "⚠️ رقم الهاتف الإضافي غير صحيح",
      city: "⚠️ المحافظة مطلوبة",
      address: "⚠️ العنوان مطلوب",
    };

    const errorList = [];
    if (errorFields.fullName) errorList.push(errorMessages.fullName);
    if (errorFields.phone) errorList.push(errorMessages.phone);
    if (errorFields.phone2) errorList.push(errorMessages.phone2);
    if (errorFields.city) errorList.push(errorMessages.city);
    if (errorFields.address) errorList.push(errorMessages.address);
    
    // حالة خاصة لرقمين متطابقين
    if (errorFields.phone2 === "رقم الهاتف الإضافي يجب أن يختلف عن الرقم الأساسي") {
      errorList.push("⚠️ رقم الهاتف الإضافي يجب أن يختلف عن الرقم الأساسي");
    }

    if (errorList.length > 0) {
      alert(`❌ الرجاء تصحيح الأخطاء التالية:\n\n${errorList.join("\n")}`);
    }
  };

  const validate = () => {
    const newErrors = {};
    const phone1 = formData.phone.trim();
    const phone2 = formData.phone2.trim();

    if (!formData.fullName.trim()) newErrors.fullName = "الاسم الكامل مطلوب";
    if (!/^01[0-9]{9}$/.test(phone1))
      newErrors.phone = "رقم الهاتف يجب أن يكون 11 رقم ويبدأ بـ 01";
    if (phone2 && !/^01[0-9]{9}$/.test(phone2))
      newErrors.phone2 = "رقم الهاتف الإضافي غير صحيح";
    if (phone1 && phone2 && phone1 === phone2) {
      newErrors.phone2 = "رقم الهاتف الإضافي يجب أن يختلف عن الرقم الأساسي";
    }
    if (!formData.address.trim()) newErrors.address = "العنوان مطلوب";
    if (!formData.city.trim()) newErrors.city = "المحافظة مطلوبة";

    return newErrors;
  };

  const sendToGoogleSheet = async () => {
    const orderDetails = cartItems
      .map((item) => {
        if (item.isOffer) {
          return item.offerDetails?.pieces
            ?.map(
              (piece) =>
                `${piece.name}${
                  piece.size ? ` - مقاس ${piece.size}` : ""
                } - ${piece.color}`,
            )
            .join(" | ");
        }
        return `${item.name} - ${item.size || ""} - ${item.color || ""}`;
      })
      .join(" | ");

    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
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

    if (!res.ok) {
      throw new Error(data.error || "فشل في إرسال الطلب");
    }

    return data;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      // عرض الأخطاء في Alert
      showErrorsInAlert(newErrors);
      // السكرول إلى أول حقل فيه خطأ
      scrollToFirstError(newErrors);
      return;
    }

    setLoading(true);

    try {
      await sendToGoogleSheet();

      if (window.fbq) {
        window.fbq("track", "Purchase", {
          value: total,
          currency: "EGP",
          eventID: "order_" + Date.now(),
        });
      }

      setShowConfirmModal(true);

      setTimeout(() => {
        setShowConfirmModal(false);
        onSuccess();
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
    const baseClass =
      "w-full bg-rose-50/30 border-2 rounded-xl py-3.5 px-4 text-gray-700 text-sm outline-none transition-all duration-300 placeholder-gray-400";
    if (errors[fieldName]) {
      return `${baseClass} border-red-500/50 focus:border-red-500 pr-12`;
    }
    if (formData[fieldName]) {
      return `${baseClass} border-pink-500/50 focus:border-pink-500 pr-12`;
    }
    return `${baseClass} border-rose-200 focus:border-pink-500 pr-12`;
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="space-y-6"
      >
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-rose-100"
        >
          <div className="flex items-center gap-2 mb-6 pb-3 border-b border-rose-100">
            <div className="w-8 h-8 bg-gradient-to-br from-[#d52c7d]/10 to-[#f6b0d7]/10 rounded-xl flex items-center justify-center">
              <User className="w-4 h-4 text-[#d52c7d]" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              معلومات الشحن
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* الاسم الكامل */}
            <div className="md:col-span-2" ref={fullNameRef}>
              <label className="block text-gray-600 text-sm mb-2">
                الاسم الكامل *
              </label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={getFieldClass("fullName")}
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
            </div>

            {/* رقم الهاتف */}
            <div ref={phoneRef}>
              <label className="block text-gray-600 text-sm mb-2">
                رقم الهاتف *
              </label>
              <div className="relative">
                <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={getFieldClass("phone")}
                  placeholder="01XXXXXXXXX"
                />
              </div>
            </div>

            {/* رقم هاتف إضافي */}
            <div ref={phone2Ref}>
              <label className="block text-gray-600 text-sm mb-2">
                رقم هاتف إضافي (اختياري)
              </label>
              <div className="relative">
                <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="tel"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                  className={getFieldClass("phone2")}
                  placeholder="رقم آخر (اختياري)"
                />
              </div>
            </div>

            {/* المحافظة */}
            <div ref={cityRef}>
              <label className="block text-gray-600 text-sm mb-2">
                المحافظة *
              </label>
              <div className="relative">
                <MapPinned className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className={`${getFieldClass("city")} appearance-none cursor-pointer`}
                >
                  <option value="">اختر المحافظة</option>
                  {EGYPT_GOVS.map((gov) => (
                    <option key={gov} value={gov}>
                      {gov}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* العنوان التفصيلي */}
            <div className="md:col-span-2" ref={addressRef}>
              <label className="block text-gray-600 text-sm mb-2">
                العنوان بالتفصيل *
              </label>
              <div className="relative">
                <Home className="absolute right-3 top-4 w-4 h-4 text-gray-400" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  className={getFieldClass("address")}
                  placeholder="رقم المبني، الشارع، الحي، العلامة المميزة..."
                />
              </div>
            </div>

            {/* ملاحظات */}
            <div className="md:col-span-2">
              <label className="block text-gray-600 text-sm mb-2">
                ملاحظات إضافية (اختياري)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="2"
                className="w-full bg-rose-50/30 border border-rose-200 rounded-xl py-3 px-4 text-gray-700 text-sm focus:border-[#d52c7d] focus:outline-none focus:ring-2 focus:ring-[#d52c7d]/20 transition-all"
                placeholder="أي ملاحظات إضافية للطلب..."
              />
            </div>
          </div>

          {/* ملخص الشحن */}
          <div className="mt-6 p-4 bg-rose-50 rounded-xl border border-rose-100">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">المجموع الفرعي:</span>
              <span className="font-semibold">{subtotal} ج.م</span>
            </div>
            <div className="flex justify-between items-center text-sm mt-2">
              <span className="text-gray-600">الشحن:</span>
              <span className="font-semibold">{shipping} ج.م</span>
            </div>
            {HIGH_SHIPPING_GOVS.includes(formData.city) && (
              <div className="text-xs text-pink-500 mt-2 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />* 30 ج.م إضافية للمحافظات
                البعيدة
              </div>
            )}
            <div className="border-t border-rose-200 mt-3 pt-3 flex justify-between items-center font-bold">
              <span>الإجمالي المتوقع:</span>
              <span className="text-[#d52c7d] text-lg">{total} ج.م</span>
            </div>
          </div>

          {/* أخطاء عامة */}
          <AnimatePresence>
            {errors.submit && (
              <motion.div className="mt-4 p-3 bg-red-500/20 text-red-400 rounded-xl text-center text-sm">
                {errors.submit}
              </motion.div>
            )}
          </AnimatePresence>

          {/* أزرار */}
          <div className="flex gap-4 mt-6">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onBack}
              className="flex-1 py-4 border border-rose-200 text-gray-600 rounded-xl font-medium hover:border-[#d52c7d] hover:text-[#d52c7d] transition-all"
            >
              رجوع للسلة
            </motion.button>
            <motion.button
              type="submit"
              disabled={loading}
              className={`flex-1 py-4 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
                loading
                  ? "bg-rose-100 text-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#d52c7d] to-[#f6b0d7] text-white shadow-md hover:shadow-lg"
              }`}
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  جاري الإرسال...
                </>
              ) : (
                <>
                  <CreditCard className="w-4 h-4" />
                  تأكيد الطلب
                </>
              )}
            </motion.button>
          </div>
        </form>
      </motion.div>

      {/* مودال تأكيد الطلب */}
      <ConfirmOrderModal
        visible={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
      />
    </>
  );
}

export default ShippingStep;