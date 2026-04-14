
import ProductCard from "../products/ProductCard";
import { useState } from "react";
import ProductModal from "../../ui/ProductModal";
import { useTranslation } from "react-i18next";
import { Sparkles, Gift, Baby, Heart } from "lucide-react";

function ProductList({products}) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

const filteredProducts = products?.filter(product =>
  product.name.includes("كولون") || product.name.includes("ليجن")
) || [];

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
      {/* <div className="relative mb-8 sm:mb-16"> */}
        {/* Decorative Elements - أخف للموبيل */}
        {/* <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 sm:w-32 h-20 sm:h-32 bg-pink-200 rounded-full filter blur-3xl opacity-30"></div> */}
        
        

      {/* Products Grid - 2 كارد للموبيل بشكل أنيق */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
        {filteredProducts.map((product, index) => (
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
      {filteredProducts.length === 0 && (
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