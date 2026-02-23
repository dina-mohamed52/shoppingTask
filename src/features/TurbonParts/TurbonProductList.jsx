import { Data } from "../../data/Data";
import ProductCard from "../products/ProductCard";
import { useState } from "react";
import ProductModal from "../../ui/ProductModal";
import { useTranslation } from "react-i18next";
import { Sparkles, Gift, Ribbon, Flower2 } from "lucide-react";

function TurbonProductList() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // فلترة المنتجات لعرض التربونات فقط (id 9 و 10)
  const turbonProducts = Data.filter(product => product.id === 9 || product.id === 10);

  // دالة تحويل اسم اللون إلى كود لون - محدثة بناءً على الألوان الفعلية
  const getColorCode = (colorName) => {
    const colorMap = {
      // الألوان الأساسية
      "أبيض": "#FFFFFF",
      "أسود": "#000000",
      "رمادي": "#9CA3AF",
      "بيج": "#F5E6D3",
      "لبني": "#4B6A7B",
      "عاجي": "#FFF8E7",
      
      // ألوان البينك والوردي
      "بينك": "#FF69B4",
      "وردي": "#FFB6C1",
      "فوشيا": "#FF00FF",
      "روز": "#FFC0CB",
      "موف": "#C8A2C8",
      "خوخي": "#FFDAB9",
      
      // ألوان أخرى
      "أحمر": "#FF4444",
      "أصفر": "#FFD700",
      "أخضر": "#98D8C8",
      "نعناعي": "#A7F0D9",
      "سماوي": "#87CEEB",
      "كحلي": "#1E2F4F",
      "نيلي": "#4B6A8B",
      
      // ألوان البني
      "كافيه": "#8B5E3C",
      "بني": "#8B4513",
      "بندقي": "#D2B48C",
      
      default: "#E5E7EB" // رمادي فاتح للافتراضي
    };
    return colorMap[colorName] || colorMap.default;
  };

  const handlePreview = (product) => {
    const allUrls = product.productColors.map((c) => c.img);

    setSelectedProduct({
      ...product,
      previewImages: allUrls,
    });

    setOpen(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <div className="relative mb-16">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-32 bg-pink-200 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-gray-300 rounded-full filter blur-3xl opacity-20"></div>
        
        {/* Main Title */}
        <div className="relative text-center">
          <div className="inline-block">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-gray-600">
                {t("turbonList.title", "تربونات بيبي ستايل")}
              </span>
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-pink-500 to-gray-400 rounded-full"></div>
          </div>

          {/* Subtitle with Icons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Ribbon className="text-pink-400 w-5 h-5" />
            <p className="text-xl text-gray-600 font-light">
              {t("turbonList.subtitle", "أجمل التربونات بألوان عصرية")}
            </p>
            <Flower2 className="text-pink-400 w-5 h-5" />
          </div>

          {/* Description with Gradient Border */}
          <div className="mt-4 inline-block px-8 py-3 rounded-full border border-pink-200 bg-white/50 backdrop-blur-sm shadow-sm">
            <p className="text-gray-700">
              {t("turbonList.description", "موديلين حصريين: فيونكه أنيقة ووردة ناعمة")}
            </p>
          </div>
        </div>

        {/* Special Badge for Turbons */}
        <div className="absolute -top-4 right-4 sm:right-10 animate-bounce">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-md opacity-50"></div>
            <div className="relative bg-white rounded-full px-4 py-2 shadow-lg border border-pink-200">
              <div className="flex items-center gap-2">
                <Gift className="text-pink-500 w-4 h-4" />
                <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-500">
                  {t("turbonList.new", "جديد")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 sm:gap-10 max-w-4xl mx-auto">
        {turbonProducts.map((product, index) => (
          <div
            key={product.id}
            className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.2}s both`
            }}
          >
            <ProductCard
              product={product}
              onPreview={handlePreview}
            />
          </div>
        ))}
      </div>

      {/* Color Guide Section */}
      <div className="mt-16 bg-gradient-to-r from-gray-50 to-pink-50/30 rounded-3xl p-8 border border-pink-200 shadow-lg">
        <h3 className="text-2xl font-bold text-center mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-pink-500">
          {t("turbonList.colors", "الألوان المتاحة")}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Turbon Bow Colors */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-pink-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                <Ribbon className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800">
                {t("turbonList.bow", "تربون فيونكه")}
              </h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "أبيض", code: "#FFFFFF" },
                { name: "أسود", code: "#000000" },
                { name: "بينك", code: "#FF69B4" },
              { name: "أوف وايت", code: "#FAF9F6" },
                { name: "كافيه", code: "#8B5E3C" },
                // { name: "بيج", code: "#F5E6D3" },
                { name: "أحمر", code: "#FF4444" },
                // { name: "لبني", code: "oklch(70.7% 0.165 254.624)" }
              ].map((color, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-pink-200">
                  <div 
                    className="w-4 h-4 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: color.code }}
                  ></div>
                  <span className="text-sm text-gray-700">{color.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Turbon Flower Colors */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-md border border-pink-100">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                <Flower2 className="w-5 h-5 text-white" />
              </div>
              <h4 className="text-xl font-bold text-gray-800">
                {t("turbonList.flower", "تربون ورده")}
              </h4>
            </div>
            <div className="flex flex-wrap gap-3">
              {[
                { name: "أبيض", code: "#FFFFFF" },
                { name: "أصفر", code: "#FFD700" },
                { name: "بينك", code: "#FF69B4" },
                { name: "موف", code: "#C8A2C8" },
                // { name: "روز", code: "#FFC0CB" },
                { name: "بيج", code: "#F5E6D3" },
                // { name: "لبني", code: "oklch(70.7% 0.165 254.624)" },
                { name: "أوف وايت", code: "#F8F8FF" }
              ].map((color, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full border border-pink-200">
                  <div 
                    className="w-4 h-4 rounded-full border border-white shadow-sm"
                    style={{ backgroundColor: color.code }}
                  ></div>
                  <span className="text-sm text-gray-700">{color.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

     

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          open={open}
          OnClose={() => setOpen(false)}
          product={selectedProduct}
        />
      )}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default TurbonProductList;