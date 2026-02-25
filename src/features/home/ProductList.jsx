import { Data } from "../../data/Data";
import ProductCard from "../products/ProductCard";
import { useState } from "react";
import ProductModal from "../../ui/ProductModal";
import { useTranslation } from "react-i18next";
import { Sparkles, Gift, Baby, Heart } from "lucide-react";

function ProductList() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // فلترة المنتجات لعرض الكولونات فقط (أي منتج يحتوي على كلمة "كولون" في الاسم)
  const colonProducts = Data.filter(product => product.name.includes("كولون"));

  const handlePreview = (product) => {
    const allUrls = product.productColors.map((c) => c.img);

    setSelectedProduct({
      ...product,
      previewImages: allUrls,
    });

    setOpen(true);
  };

  return (
    <div className="container mx-auto px-3 sm:px-6 py-8 sm:py-16 w-full bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section - مبسط للموبيل */}
      <div className="relative mb-8 sm:mb-16">
        {/* Decorative Elements - أخف للموبيل */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 sm:w-32 h-20 sm:h-32 bg-pink-200 rounded-full filter blur-3xl opacity-30"></div>
        
        {/* Main Title */}
        <div className="relative text-center">
          <div className="inline-block">
            <h1 className="text-2xl sm:text-5xl font-bold mb-2 sm:mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-gray-600">
                {t("productList.title")}
              </span>
            </h1>
            <div className="h-0.5 w-16 sm:w-24 mx-auto bg-gradient-to-r from-pink-500 to-gray-400 rounded-full"></div>
          </div>

          {/* Subtitle with Icons - مبسط للموبيل */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-3 sm:mt-6">
            <Baby className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5" />
            <p className="text-sm sm:text-xl text-gray-600 font-light">
              {t("productList.subtitle")}
            </p>
            <Heart className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5" />
          </div>

          {/* Description - مخفي على الموبيل الصغير */}
          <div className="hidden sm:inline-block mt-4 px-8 py-3 rounded-full border border-pink-200 bg-white/50 backdrop-blur-sm shadow-sm">
            <p className="text-gray-700">
              {t("productList.description")}
            </p>
          </div>
        </div>

        {/* Special Badge for Colons - أصغر للموبيل */}
        <div className="absolute -top-2 sm:-top-4 right-2 sm:right-10 animate-bounce">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-md opacity-50"></div>
            <div className="relative bg-white rounded-full px-2 sm:px-4 py-1 sm:py-2 shadow-lg border border-pink-200">
              <div className="flex items-center gap-1 sm:gap-2">
                <Gift className="text-pink-500 w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-500">
                  {t("productList.kids", "كولونات أطفال")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid - 2 كارد للموبيل بشكل أنيق */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
        {colonProducts.map((product, index) => (
          <div
            key={product.id}
            className="transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
            }}
          >
            <ProductCard
              product={product}
              onPreview={handlePreview}
            />
          </div>
        ))}
      </div>

      {/* رسالة إذا مافيش منتجات */}
      {colonProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">لا توجد منتجات متاحة</p>
        </div>
      )}

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

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradientShift 3s ease infinite;
        }

        @media (max-width: 640px) {
          .grid {
            gap: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}

export default ProductList;