import { useState } from "react";

export default function OrderForm() {
  const [form, setForm] = useState({
    name: "",
    order: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (
      !form.name.trim() ||
      !form.order.trim() ||
      !form.phone.trim() ||
      !form.address.trim()
    ) {
      setMessage("❌ رجاءً عبّي كل الحقول");
      setLoading(false);
      return;
    }

    const payload = {
      values: [
        [
          form.name.trim(),
          form.order.trim(),
          form.phone.trim(),
          form.address.trim(),
          new Date().toLocaleString(),
        ],
      ],
    };

    try {
      const res = await fetch(
        "https://api.apico.dev/v1/dY0m5U/1XbQfRji9WfrR-LIJ3YE410pHMW3ruxjHyH8ipq1ABJc/values/orders!A1:append?valueInputOption=USER_ENTERED",
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

      const text = await res.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = text;
      }

      if (res.ok) {
        setMessage("✅ تم إرسال الطلب بنجاح!");
        setForm({ name: "", order: "", phone: "", address: "" });
      } else {
        const serverMsg =
          typeof data === "string" ? data : data?.error || JSON.stringify(data);
        setMessage(`❌ خطأ: ${res.status} — ${serverMsg}`);
      }
    } catch (err) {
      setMessage("❌ حدث خطأ في الشبكة: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center my-12">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          📝 إرسل طلبك الآن
        </h2>

        <div className="flex flex-col gap-4">
          <input
            name="name"
            placeholder="الاسم"
            value={form.name}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
          />
          <input
            name="order"
            placeholder="الأوردر"
            value={form.order}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
          />
          <input
            name="phone"
            placeholder="التليفون"
            value={form.phone}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
          />
          <input
            name="address"
            placeholder="العنوان"
            value={form.address}
            onChange={handleChange}
            required
            className="p-3 rounded-xl border border-gray-300 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-400 outline-none transition-all"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-xl font-semibold shadow-md transition-all duration-300 ${
              loading
                ? "bg-gray-400 text-white cursor-not-allowed"
                : "bg-gray-900 text-yellow-400 hover:bg-gray-800"
            }`}
          >
            {loading ? "⏳ جاري الإرسال..." : "🚀 إرسال الطلب"}
          </button>

          {message && (
            <div
              className={`p-3 rounded-xl text-center font-medium transition-all ${
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
