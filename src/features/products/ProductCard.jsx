import { useTranslation } from "react-i18next";

function ProductCard({ product, onPreview }) {
  const { t } = useTranslation();

  return (
    <div className="bg-white border  w-full   border-gray-300 rounded-2xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-300 flex flex-col">
      {/* صورة المنتج */}
      <div className="relative group bg-gray-50">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[19rem] object-cover p-1 transition-transform duration-300 group-hover:scale-105"
        />

        {/* تاج (مثلاً New أو Sale) */}
        {product.name && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow">
            {product.name}
          </span>
        )}
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-4 flex flex-col flex-grow">
        {/* زر معاينة الصور */}
        <button
          onClick={() => onPreview(product)}
          className="mt-auto w-full py-2.5 px-4 text-yellow-400 hover:text-gray-800 rounded-xl bg-gray-900 font-semibold shadow-sm hover:bg-yellow-400 transition-all duration-300"
        >
          {t("productCard.preview")}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
