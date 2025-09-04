import { useState } from "react";

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

export default function OrderForm({ order, selectedOffer, formRef }) {
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

  const shipping = 50;
  const orderTotal = selectedOffer?.price || 0;
  const total = orderTotal + shipping;

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
    setMessage("");

    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    // const orderDetails = safeOrder
    //   .filter((item) => item?.name)
    //   .map((item) => `${item.name} - مقاس (${item.size}) - ${item.color}`)
    //   .join(" | ");

    const orderDetails =
      ` عرض ${selectedOffer?.quantity || "-"}` +
      "\n" +
      safeOrder
        .filter((item) => item?.name)
        .map((item) => `${item.name} - مقاس (${item.size}) - ${item.color}`)
        .join(" + ");

    const today = new Date().toLocaleDateString("en-GB"); 


    const payload = {
      values: [
        [
          today, // 📅 التاريخ
          form.name.trim(), // الاسم
          form.phone.trim(), // الرقم الأساسي
          form.phone2.trim() || "-", // الرقم الثاني (لو فاضي يتحط "-")
          form.address.trim(), // العنوان
          form.governorate, // المحافظة
          orderDetails, // الأوردر
          `${total} ج`, // الحساب (الإجمالي الكلي)
        ],
      ],
    };

    try {
      const res = await fetch(
        "https://api.apico.dev/v1/dY0m5U/1gA3RbeU-npFqOV5CdYPyMcVHDxkLh9QVuGP06KFPu4c/values/orders!A1:append?valueInputOption=USER_ENTERED",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer 2942fab318c52526c56964fac92eaa33eb47c006176ff1217e052f6a22620954",
          },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setMessage("✅ تم إرسال الطلب بنجاح!");
        setForm({
          name: "",
          phone: "",
          phone2: "",
          address: "",
          governorate: "",
        });
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
          📝 إرسل طلبك الآن
        </h2>

        {/* تفاصيل الأوردر */}
        <div className="bg-gray-800 rounded-xl p-4 mb-6">
          <h3 className="font-semibold mb-3 text-yellow-400">
            🛒 تفاصيل الأوردر:
          </h3>
          {safeOrder.length > 0 ? (
            <>
              <ul className="list-disc list-inside space-y-1 text-gray-200 text-sm sm:text-base">
                {safeOrder
                  .filter((o) => o?.name)
                  .map((item) => (
                    <li key={item.id}>
                      {item.name} — مقاس {item.size} — {item.color}
                    </li>
                  ))}
              </ul>
              <p className="mt-2 text-xs sm:text-sm text-gray-400">
                📦 عدد القطع: {safeOrder.filter((o) => o?.name).length}
              </p>
            </>
          ) : (
            <p className="text-gray-400 italic text-sm sm:text-base">
              لا يوجد منتجات في الطلب حالياً
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4">
          {/* الاسم */}
          <div>
            <input
              name="name"
              placeholder="الاسم"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm sm:text-base"
            />
            {errors.name && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.name}
              </p>
            )}
          </div>

          {/* الهاتف الأساسي */}
          <div>
            <input
              name="phone"
              placeholder="رقم التليفون الأساسي"
              value={form.phone}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm sm:text-base"
            />
            {errors.phone && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.phone}
              </p>
            )}
          </div>

          {/* الهاتف الثاني */}
          <div>
            <input
              name="phone2"
              placeholder="رقم تليفون آخر (اختياري)"
              value={form.phone2}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm sm:text-base"
            />
            {errors.phone2 && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.phone2}
              </p>
            )}
          </div>

          {/* العنوان */}
          <div>
            <input
              name="address"
              placeholder="العنوان بالتفصيل (اسم الشارع، رقم العمارة، علامة مميزة)"
              value={form.address}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-gray-600 bg-gray-800 text-gray-200 placeholder-gray-400 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400 outline-none transition-all text-sm sm:text-base"
            />
            {errors.address && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.address}
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
              <option value="">اختر المحافظة</option>
              {EGYPT_GOVS.map((gov) => (
                <option key={gov} value={gov}>
                  {gov}
                </option>
              ))}
            </select>
            {errors.governorate && (
              <p className="text-red-400 text-xs sm:text-sm mt-1">
                {errors.governorate}
              </p>
            )}
          </div>

          {/* ملخص الطلب */}
          <div className="bg-gray-800 p-4 rounded-xl font-medium space-y-1 text-sm sm:text-base">
            <p>🛍️ سعر المنتجات: {orderTotal} ج</p>
            <p>🚚 الشحن: {shipping} ج</p>
            <hr className="border-gray-700" />
            <p className="text-lg font-bold text-yellow-400">
              💰 الإجمالي الكلي: {total} ج
            </p>
          </div>

          {/* زر التأكيد */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold shadow-md transform transition-all duration-300 text-sm sm:text-base ${
              loading
                ? "bg-gray-600 text-gray-300 cursor-not-allowed animate-pulse"
                : "bg-yellow-400 text-gray-900 hover:scale-105 hover:bg-yellow-300 hover:animate-bounce"
            }`}
          >
            {loading ? "⏳ جاري الإرسال..." : "🚀 تأكيد الطلب الآن"}
          </button>

          {/* رسالة الحالة */}
          {message && (
            <div
              className={`p-3 rounded-xl text-center font-medium transition-all text-sm sm:text-base ${
                message.includes("✅")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
