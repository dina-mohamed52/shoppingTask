import { CheckCircle, Shirt, Smile, Eye } from "lucide-react";

export default function ProductBenefits() {
  const features = [
    {
      icon: <Shirt className="w-8 h-8 text-yellow-400" />,
      title: "خامة مريحة وعملية",
      desc: "مصنوعة من قطن ناعم وجودة عالية 👕، مثالية للحركة اليومية والدراسة واللعب.",
    },
    {
      icon: <Smile className="w-8 h-8 text-yellow-400" />,
      title: "راحة تامة للأطفال",
      desc: "تصميم يضمن الحرية والانطلاق 😀، بدون أي إحساس بالضيق أو ثِقل.",
    },
    {
      icon: <Eye className="w-8 h-8 text-yellow-400" />,
      title: "معاينة قبل الاستلام",
      desc: "جرب المنتج بنفسك قبل الدفع ✨، للتأكد من المقاس والجودة 100%.",
    },
  ];

  return (
    <section className="bg-gray-900 py-12 my-24 p-6 rounded-3xl shadow-lg border border-gray-800">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">
        ✨😉 ليه تختار منتجاتنا؟
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 shadow-md"
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">{f.title}</h3>
            <p className="text-gray-300 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* العبارة الخاصة */}
      <div className="p-8">

      <div className="mt-10 bg-gray-800 p-6 rounded-2xl text-center border border-yellow-400/40 shadow-md">
        <p className="text-lg font-medium  text-yellow-300">
          🎨 متاح تشكيلات متنوعة من الألوان والمقاسات، 
          جرب وشوف بنفسك قبل الاستلام للتأكد من الجودة والمقاس 💯
        </p>
      </div>
      </div>
    </section>
  );
}
