import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Package,
  Truck,
  CreditCard,
  AlertCircle,
  CheckCircle,
  MapPinned,
  Home,
  Smartphone,
} from "lucide-react";
import ConfirmOrderModal from "./ConfirmOrderModal";

const EGYPT_GOVS = [
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "الشرقية",
  "الدقهلية",
  "البحيرة",
  "المنيا",
  "القليوبية",
  "سوهاج",
  "الغربية",
  "أسيوط",
  "الفيوم",
  "كفر الشيخ",
  "قنا",
  "بني سويف",
  "أسوان",
  "دمياط",
  "الإسماعيلية",
  "الأقصر",
  "بورسعيد",
  "السويس",
  "مطروح",
  "شمال سيناء",
  "جنوب سيناء",
  "الوادي الجديد",
  "البحر الأحمر",
];

const HIGH_SHIPPING_GOVS = [
  "مطروح",
  "البحر الأحمر",
  "الوادي الجديد",
  "جنوب سيناء",
  "شمال سيناء",
];

export default function OrderForm({ order, selectedOffer, formRef }) {
  const { t } = useTranslation();
  const safeOrder = Array.isArray(order) ? order : [];
  const [form, setForm] = useState({
    name: "",
    phone: "",
    phone2: "",
    address: "",
    governorate: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleOrderSuccess = () => {
    setIsModalVisible(true);
  };

  const baseShipping = 60;
  const shipping = HIGH_SHIPPING_GOVS.includes(form.governorate)
    ? baseShipping + 20
    : baseShipping;
  const orderTotal = selectedOffer?.price || 0;
  const total = Number(orderTotal) + Number(shipping);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const phone1 = form.phone.trim();
    const phone2 = form.phone2.trim();

    if (!form.name.trim()) newErrors.name = t("orderForm.errors.name");
    if (!/^01[0-9]{9}$/.test(phone1))
      newErrors.phone = t("orderForm.errors.phone");
    if (phone2 && !/^01[0-9]{9}$/.test(phone2))
      newErrors.phone2 = t("orderForm.errors.phone2");
    if (phone1 && phone2 && phone1 === phone2) {
      newErrors.phone2 = t("orderForm.errors.duplicatePhone");
    }
    if (!form.address.trim()) newErrors.address = t("orderForm.errors.address");
    if (!form.governorate.trim())
      newErrors.governorate = t("orderForm.errors.governorate");

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setMessage("");

    if (!selectedOffer || !safeOrder.length) {
      alert(t("orderForm.errors.noOffer"));
      return;
    }

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    const today = new Date().toLocaleDateString("en-GB");
    const payload = {
      data: {
        التاريخ: today,
        الاسم: form.name.trim(),
        التليفون: form.phone.trim(),
        "التليفون 2": form.phone2.trim() || "-",
        العنوان: `${form.governorate} - ${form.address.trim()}`,
        الاوردر: safeOrder
          .filter((item) => item?.name)
          // .map((item) => `${item.name} - ${item.size} - ${item.color}`)
          .map((item) =>
            item.size
              ? `${item.name} - ${item.size} - ${item.color}`
              : `${item.name} - ${item.color}`,
          )
          .join(" | "),
        المبلغ: `${total}`,
      },
    };

    try {
      const res = await fetch("https://sheetdb.io/api/v1/ud7ooi446r6mh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const purchaseValue = Number(total) || 0;
        // const purchaseValue = parseFloat(total) || 0;
        const currency = "EGP";
        const eventId = "order_" + Date.now();

        try {
          // if (window.fbq && purchaseValue > 0) {
          //   window.fbq("track", "Purchase", {
          //     value: purchaseValue,
          //     currency: currency,
          //     eventID: eventId,
          //   });
          if (window.fbq && purchaseValue > 0) {
            window.fbq("track", "Purchase", {
              value: purchaseValue,
              currency: "EGP",
              eventID: eventId,
              contents: safeOrder.map((item, index) => ({
                id: item.name || `product_${index}`,
                quantity: 1,
              })),
              content_type: "product",
            });
            // }
          }
        } catch (e) {
          console.log("FB Pixel error:", e);
        }

        setMessage("✅ " + t("orderForm.messages.success"));
        setForm({
          name: "",
          phone: "",
          phone2: "",
          address: "",
          governorate: "",
        });

        handleOrderSuccess();
      } else {
        setMessage("❌ " + t("orderForm.messages.error"));
      }
    } catch (err) {
      setMessage(
        "❌ " + t("orderForm.messages.network", { error: err.message }),
      );
    } finally {
      setLoading(false);
    }
  };

  // دالة مساعدة لإرجاع كلاس الحقل بناءً على حالة الخطأ
  const getFieldClass = (fieldName) => {
    const baseClass =
      "w-full bg-gray-800/50 border-2 rounded-xl py-3.5 px-4 text-gray-200 outline-none transition-all duration-300 placeholder-gray-500";
    if (errors[fieldName]) {
      return `${baseClass} border-red-500/50 focus:border-red-500 pr-12`;
    }
    if (form[fieldName]) {
      return `${baseClass} border-pink-500/50 focus:border-pink-500 pr-12`;
    }
    return `${baseClass} border-gray-700 focus:border-pink-500 pr-12`;
  };

  return (
    <div
      ref={formRef}
      className="flex justify-center items-center my-8 px-4 sm:px-0"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl"
      >
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl blur-xl opacity-20"></div>

        {/* Main Form */}
        <form
          onSubmit={handleSubmit}
          className="relative bg-gradient-to-br from-gray-900 to-gray-950 shadow-2xl rounded-2xl p-6 sm:p-8 border border-pink-500/30 overflow-hidden"
        >
          {/* Decorative Elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gray-500 rounded-full filter blur-3xl"></div>
          </div>

          {/* Header */}
          <div className="relative mb-8 text-center">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-300 to-white">
                {t("orderForm.title")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto mt-2 rounded-full"></div>
            </motion.div>
          </div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-5 mb-6 border border-pink-500/20"
          >
            <div className="absolute -top-2 -right-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-md opacity-50"></div>
                <div className="relative bg-gradient-to-r from-pink-500 to-pink-600 p-1.5 rounded-full">
                  <Package className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>

            <h3 className="font-semibold mb-3 text-pink-400 flex items-center gap-2">
              <Package className="w-4 h-4" />
              {t("orderForm.orderDetails")}
            </h3>

            {safeOrder.length > 0 ? (
              <>
                <ul className="space-y-2 text-gray-300 text-sm sm:text-base">
                  {safeOrder
                    .filter((o) => o?.name)
                    .map((item, idx) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex items-center gap-2 border-b border-gray-700/50 pb-1 last:border-0"
                      >
                        <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                        <span className="flex-1">{item.name}</span>
                        <span className="text-pink-400 text-xs">
                          {t("orderForm.size")} {item.size}
                        </span>
                        <span className="text-gray-400 text-xs">
                          {item.color}
                        </span>
                      </motion.li>
                    ))}
                </ul>
                <p className="mt-3 text-xs sm:text-sm text-gray-400 flex items-center gap-1">
                  <Package className="w-3 h-3" />
                  {t("orderForm.piecesCount", { count: safeOrder.length })}
                </p>
              </>
            ) : (
              <p className="text-gray-400 italic text-sm sm:text-base flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-pink-400" />
                {t("orderForm.emptyOrder")}
              </p>
            )}
          </motion.div>

          {/* Form Fields - الحقول العادية */}
          <div className="space-y-4">
            {/* حقل الاسم */}
            <div className="relative">
              <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="text"
                name="name"
                placeholder={t("orderForm.placeholders.name")}
                value={form.name}
                onChange={handleChange}
                className={getFieldClass("name")}
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-xs sm:text-sm mt-1 mr-2 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* حقل الهاتف الأول */}
            <div className="relative">
              <Smartphone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="tel"
                name="phone"
                placeholder={t("orderForm.placeholders.phone")}
                value={form.phone}
                onChange={handleChange}
                className={getFieldClass("phone")}
              />
              <AnimatePresence>
                {errors.phone && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-xs sm:text-sm mt-1 mr-2 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* حقل الهاتف الثاني */}
            <div className="relative">
              <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="tel"
                name="phone2"
                placeholder={t("orderForm.placeholders.phone2")}
                value={form.phone2}
                onChange={handleChange}
                className={getFieldClass("phone2")}
              />
              <AnimatePresence>
                {errors.phone2 && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-xs sm:text-sm mt-1 mr-2 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone2}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* حقل العنوان */}
            <div className="relative">
              <Home className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <input
                type="text"
                name="address"
                placeholder={t("orderForm.placeholders.address")}
                value={form.address}
                onChange={handleChange}
                className={getFieldClass("address")}
              />
              <AnimatePresence>
                {errors.address && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-xs sm:text-sm mt-1 mr-2 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.address}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* حقل المحافظة - select */}
            <div className="relative">
              <MapPinned className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
              <select
                name="governorate"
                value={form.governorate}
                onChange={handleChange}
                className={`${getFieldClass("governorate")} appearance-none cursor-pointer`}
              >
                <option value="" className="bg-gray-800">
                  {t("orderForm.placeholders.governorate")}
                </option>
                {EGYPT_GOVS.map((gov) => (
                  <option
                    key={gov}
                    value={gov}
                    className="bg-gray-800 text-gray-200"
                  >
                    {gov}
                  </option>
                ))}
              </select>
              <AnimatePresence>
                {errors.governorate && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-xs sm:text-sm mt-1 mr-2 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3" />
                    {errors.governorate}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 bg-gradient-to-br from-gray-800 to-gray-900 p-5 rounded-xl border border-pink-500/20"
          >
            <div className="space-y-2 text-sm sm:text-base">
              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2">
                  <Package className="w-4 h-4 text-pink-400" />
                  {t("orderForm.summary.products", { price: orderTotal })}
                </span>
                <span className="text-gray-200 font-medium">
                  {orderTotal} ج.م
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-gray-400 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-pink-400" />
                  {t("orderForm.summary.shipping", { price: shipping })}
                </span>
                <span className="text-gray-200 font-medium">
                  {shipping} ج.م
                </span>
              </div>

              {HIGH_SHIPPING_GOVS.includes(form.governorate) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-pink-400 bg-pink-500/10 p-2 rounded-lg"
                >
                  ✨ 20 ج.م إضافية للمحافظات البعيدة
                </motion.div>
              )}

              <hr className="border-gray-700 my-2" />

              <div className="flex justify-between items-center text-lg font-bold">
                <span className="text-gray-300 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-pink-400" />
                  {t("orderForm.summary.total", { price: total })}
                </span>
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-300">
                  {total} ج.م
                </span>
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-6"
          >
            <button
              type="submit"
              disabled={loading}
              className="relative w-full group overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

              {/* Button */}
              <div
                className={`
                relative flex items-center justify-center gap-2 w-full py-4 rounded-xl font-semibold
                transition-all duration-300 transform
                ${
                  loading
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-gray-900 to-gray-800 text-white border border-pink-500/30 hover:scale-105 active:scale-95"
                }
              `}
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-pink-400 border-t-transparent rounded-full animate-spin"></div>
                    <span>{t("orderForm.buttons.loading")}</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 text-pink-400" />
                    <span>{t("orderForm.buttons.submit")}</span>
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                      className="text-pink-400"
                    >
                      ←
                    </motion.span>
                  </>
                )}

                {/* Shine Effect */}
                <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
              </div>
            </button>
          </motion.div>

          {/* Status Message */}
          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`mt-4 p-3 rounded-xl text-center font-medium text-sm sm:text-base ${
                  message.includes("✅")
                    ? "bg-green-500/20 text-green-400 border border-green-500/30"
                    : "bg-red-500/20 text-red-400 border border-red-500/30"
                }`}
              >
                {message}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </motion.div>

      <ConfirmOrderModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </div>
  );
}
