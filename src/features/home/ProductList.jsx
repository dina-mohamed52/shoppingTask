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

  // فلترة المنتجات لعرض الكولونات فقط (ids من 1 إلى 8)
  const colonProducts = Data.filter(product => product.id >= 1 && product.id <= 8);

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
            <h1 className="text-3xl sm:text-5xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-gray-600">
                {t("productList.title")}
              </span>
            </h1>
            <div className="h-1 w-24 mx-auto bg-gradient-to-r from-pink-500 to-gray-400 rounded-full"></div>
          </div>

          {/* Subtitle with Icons */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Baby className="text-pink-400 w-5 h-5" />
            <p className="text-xl text-gray-600 font-light">
              {t("productList.subtitle")}
            </p>
            <Heart className="text-pink-400 w-5 h-5" />
          </div>

          {/* Description with Gradient Border */}
          <div className="mt-4 inline-block px-8 py-3 rounded-full border border-pink-200 bg-white/50 backdrop-blur-sm shadow-sm">
            <p className="text-gray-700">
              {t("productList.description")}
            </p>
          </div>
        </div>

        {/* Special Badge for Colons */}
        <div className="absolute -top-4 right-4 sm:right-10 animate-bounce">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-md opacity-50"></div>
            <div className="relative bg-white rounded-full px-4 py-2 shadow-lg border border-pink-200">
              <div className="flex items-center gap-2">
                <Gift className="text-pink-500 w-4 h-4" />
                <span className="text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-500">
                  {t("productList.kids", "كولونات أطفال")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
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
      `}</style>
    </div>
  );
}

export default ProductList;