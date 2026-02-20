import { useState } from "react";
import { useTranslation } from "react-i18next";
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
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((err) => ({ ...err, [e.target.name]: "" }));
  };

  // ✅ فاليديشن
  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "⚠️ الاسم مطلوب";
    if (!/^01[0-9]{9}$/.test(form.phone.trim()))
      newErrors.phone = "⚠️ رقم الموبايل غير صحيح (11 رقم ويبدأ بـ 01)";
    if (form.phone2.trim() && !/^01[0-9]{9}$/.test(form.phone2.trim()))
      newErrors.phone2 = "⚠️ رقم الموبايل الثاني غير صحيح";
    if (!form.address.trim()) newErrors.address = "⚠️ العنوان مطلوب";
    if (!form.governorate.trim()) newErrors.governorate = "⚠️ اختر المحافظة";
    return newErrors;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  // 🔒 Guard ضد الضغط المتكرر
  if (loading) return;

  setMessage("");

  // تحقق من وجود عرض مختار وأوردر
  if (!selectedOffer || !safeOrder.length) {
    alert(
      t("orderForm.errors.noOffer", "برجاء اختيار العرض المناسب لك لإتمام الأوردر")
    );
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
        .map((item) => `${item.name} - ${item.size} - ${item.color}`)
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
      const purchaseValue = parseFloat(total) || 0;
      const currency = "EGP";

      // 🆔 إنشاء eventID فريد
      const eventId = "order_" + Date.now();

      try {
        if (window.fbq && purchaseValue > 0) {
          window.fbq("track", "Purchase", {
            value: purchaseValue,
            currency: currency,
            eventID: eventId, // 👈 مهم جدًا
          });
        }
      } catch (e) {
        console.log("FB Pixel error:", e);
      }

      setMessage("✅ تم إرسال الطلب بنجاح!");
      setForm({
        name: "",
        phone: "",
        phone2: "",
        address: "",
        governorate: "",
      });

      handleOrderSuccess();
    } else {
      setMessage("❌ حصل خطأ في الإرسال");
    }
  } catch (err) {
    setMessage("❌ حدث خطأ في الشبكة: " + err.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <div
      ref={formRef}
      className="flex justify-center items-center my-8 px-4 sm:px-0"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 shadow-xl rounded-2xl p-6 sm:p-8 w-full max-w-md sm:max-w-2xl border border-yellow-400 text-yellow-300"
      >
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
          {t("orderForm.title")}
        </h2>

        {/* تفاصيل الأوردر */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-3 text-yellow-400">
            {t("orderForm.orderDetails")}
          </h3>
          {safeOrder.length > 0 ? (
            <>
              <ul className="list-disc list-inside space-y-1 text-gray-200 text-sm sm:text-base">
                {safeOrder
                  .filter((o) => o?.name)
                  .map((item) => (
                    <li key={item.id}>
                      {item.name} — {t("orderForm.size")} {item.size} —{" "}
                      {item.color}
                    </li>
                  ))}
              </ul>
              <p className="mt-2 text-xs sm:text-sm text-gray-400">
                {t("orderForm.piecesCount", { count: safeOrder.length })}
              </p>
            </>
          ) : (
            <p className="text-gray-400 italic text-sm sm:text-base">
              {t("orderForm.emptyOrder")}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {/* الاسم */}
          <div>
            <input
              name="name"
              placeholder={t("orderForm.placeholders.name")}
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm sm:text-base"
            />
            {errors.name && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {t("orderForm.errors.name")}
              </p>
            )}
          </div>

          {/* الهاتف الأساسي */}
          <div>
            <input
              name="phone"
              placeholder={t("orderForm.placeholders.phone")}
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm sm:text-base"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {t("orderForm.errors.phone")}
              </p>
            )}
          </div>

          {/* الهاتف الثاني */}
          <div>
            <input
              name="phone2"
              placeholder={t("orderForm.placeholders.phone2")}
              value={form.phone2}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm sm:text-base"
            />
            {errors.phone2 && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {t("orderForm.errors.phone2")}
              </p>
            )}
          </div>

          {/* العنوان */}
          <div>
            <input
              name="address"
              placeholder={t("orderForm.placeholders.address")}
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm sm:text-base"
            />
            {errors.address && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {t("orderForm.errors.address")}
              </p>
            )}
          </div>

          {/* المحافظة */}
          <div>
            <select
              name="governorate"
              value={form.governorate}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm sm:text-base"
            >
              <option value="">
                {t("orderForm.placeholders.governorate")}
              </option>
              {EGYPT_GOVS.map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
            {errors.governorate && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {t("orderForm.errors.governorate")}
              </p>
            )}
          </div>

          {/* ملخص الطلب */}
          <div className="bg-gray-800 p-4 rounded-xl font-medium space-y-1 text-sm sm:text-base">
            <p>{t("orderForm.summary.products", { price: orderTotal })}</p>
            <p>{t("orderForm.summary.shipping", { price: shipping })}</p>
            <hr className="border-gray-700" />
            <p className="text-lg font-bold text-yellow-400">
              {t("orderForm.summary.total", { price: total })}
            </p>
          </div>

          {/* زر التأكيد */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold shadow-md transform transition-all duration-300 text-sm sm:text-base ${loading
              ? "bg-gray-600 text-gray-300 cursor-not-allowed animate-pulse"
              : "bg-yellow-400 text-gray-900 hover:scale-105 hover:bg-yellow-300 hover:animate-bounce"
              }`}
          >
            {loading
              ? t("orderForm.buttons.loading")
              : t("orderForm.buttons.submit")}
          </button>



          {/* رسالة الحالة */}
          {message && (
            <div
              className={`p-3 rounded-xl text-center font-medium transition-all text-sm sm:text-base ${message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
                }`}
            >
              {message.includes("✅")
                ? t("orderForm.messages.success")
                : message.includes("❌")
                  ? t("orderForm.messages.error")
                  : message}
            </div>
          )}
        </div>
      </form>
      <ConfirmOrderModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
    </div>
  );
}
