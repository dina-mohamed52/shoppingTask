import { BandanaTurbonData } from "../../data/Turbon";
import { useTranslation } from "react-i18next";
import { Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../features/products/ProductCard";

function TurbonProductList() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const turbonProducts = BandanaTurbonData;

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-400 text-white rounded-full px-5 py-2 text-sm font-medium mb-5 shadow-lg shadow-pink-200">
              <Sparkles className="w-4 h-4" />
              <span>تشكيلة الربيع 2026</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
              تربونات{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-400">
                بيبي ستايل
              </span>
            </h1>

            <p className="text-gray-500 text-base sm:text-lg max-w-2xl mx-auto">
              موديلين حصريين: فيونكه أنيقة ووردة ناعمة، مصممة بعناية لراحة طفلتك
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
          {turbonProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPreview={() => handleProductClick(product)}
            />
          ))}
        </div>

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧵</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                خامة قطن ناعمة
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                مصنوعة من قطن عالي الجودة يناسب بشرة طفلتك
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎨</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                ألوان متعددة
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                تشكيلة واسعة من الألوان تناسب جميع الأذواق
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 border border-gray-100">
              <div className="w-14 h-14 bg-pink-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💝</span>
              </div>
              <h3 className="font-bold text-gray-800 mb-2 text-sm sm:text-base">
                هدية مثالية
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm">
                اختيار رائع كهدية لأطفالك أو لأطفال المقربين
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TurbonProductList;