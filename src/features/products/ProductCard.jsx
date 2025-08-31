function ProductCard({ product, onPreview }) {
  return (
    <div className="bg-white border border-gray-300   rounded-2xl shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-lg duration-300 flex flex-col">
      {/* صورة المنتج */}
      <div className="relative group bg-gray-50">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[19rem] object-cover p-4 transition-transform duration-300 group-hover:scale-105"
        />

        {/* تاج (مثلاً New أو Sale) */}
        {product.tag && (
          <span className="absolute top-3 left-3 bg-yellow-400 text-gray-800 text-xs font-bold px-3 py-1 rounded-full shadow">
            {product.tag}
          </span>
        )}
      </div>

      {/* تفاصيل المنتج */}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-1">
          {product.title}
        </h2>

      

        {/* زر معاينة الصور */}
        <button
          onClick={() => onPreview(product)}
          className="mt-auto w-full py-2.5 px-4 text-yellow-400 hover:text-gray-800 rounded-xl bg-gray-900  font-semibold shadow-sm hover:bg-yellow-500 transition-all duration-300"
        >
          معاينة الصور
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
