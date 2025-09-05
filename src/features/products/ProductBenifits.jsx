import { Shirt, Smile, Eye } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProductBenefits() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Shirt className="w-8 h-8 text-yellow-400" />,
      title: t("productBenefits.feature1.title"),
      desc: t("productBenefits.feature1.desc"),
    },
    {
      icon: <Smile className="w-8 h-8 text-yellow-400" />,
      title: t("productBenefits.feature2.title"),
      desc: t("productBenefits.feature2.desc"),
    },
    {
      icon: <Eye className="w-8 h-8 text-yellow-400" />,
      title: t("productBenefits.feature3.title"),
      desc: t("productBenefits.feature3.desc"),
    },
  ];

  return (
    <section className="bg-gray-900 py-12 my-24 p-6 rounded-3xl shadow-lg border border-gray-800">
      <h2 className="text-3xl font-bold text-center text-yellow-400 mb-10">
        {t("productBenefits.heading")}
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-gray-800 rounded-2xl p-6 text-center hover:scale-105 transition-transform duration-300 shadow-md"
          >
            <div className="flex justify-center mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold text-yellow-300 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-8">
        <div className="mt-10 bg-gray-800 p-6 rounded-2xl text-center border border-yellow-400/40 shadow-md">
          <p className="text-lg font-medium text-yellow-300">
            {t("productBenefits.note")}
          </p>
        </div>
      </div>
    </section>
  );
}
