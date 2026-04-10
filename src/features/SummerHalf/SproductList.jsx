import { HalfColoneData } from "../../data/HalfColon";
import ProductCard from "../products/ProductCard";
import { useState } from "react";
import ProductModal from "../../ui/ProductModal";
import { useTranslation } from "react-i18next";
import { Sparkles, Gift } from "lucide-react";

function SproductList() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // فلترة المنتجات (غيري ال id حسب المنتج اللي عايزاه)
  const sProducts = HalfColoneData

  const handlePreview = (product) => {
    const allUrls = product.productColors.map((c) => c.img);

    setSelectedProduct({
      ...product,
      previewImages: allUrls,
    });

    setOpen(true);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 w-full ">

      {/* Header */}
      <div className="text-center mb-14 relative">

        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-32 h-32 bg-pink-200 blur-3xl opacity-30 rounded-full"></div>

        <h1 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-gray-600">
            {t("sproductList.title", "كولكشن جديد")}
          </span>
        </h1>

        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-pink-500 to-gray-400 rounded-full"></div>

        <p className="mt-5 text-gray-600 text-lg">
          {t("sproductList.subtitle", "منتجات مختارة بعناية ليكي")}
        </p>

        {/* Badge */}
        <div className="absolute right-6 -top-6 animate-bounce">
          <div className="bg-white px-4 py-2 rounded-full shadow border border-pink-200 flex items-center gap-2">
            <Gift className="text-pink-500 w-4 h-4" />
            <span className="text-sm font-semibold text-pink-500">
              {t("sproductList.new", "جديد")}
            </span>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">

        {sProducts.map((product, index) => (
          <div
            key={product.id}
            className="transform transition duration-500 hover:scale-105 hover:-translate-y-2"
            style={{
              animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
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

      {/* Animation */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(25px);
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

export default SproductList;