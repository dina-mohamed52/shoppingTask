import { useEffect, useState, useRef } from "react";
import { Clothes } from "../../data/Clothes";
import { useTranslation } from "react-i18next";
import { Sparkles, Heart, ShoppingBag, Star } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import ProductCard from "../../features/products/ProductCard";

function CProductList() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { category } = useParams();
  
  const [mounted, setMounted] = useState(false);
  const productsRef = useRef(null); // Reference to products section

  // Get active tab from URL params - default to "all" if no category
  const activeTab = category || "all";

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Get unique categories from products
  const categories = [
    { id: "top", label: "التوبات", icon: "👕", path: "/clothes/top" },
    { id: "legging", label: "الليجنز", icon: "👖", path: "/clothes/legging" },
    { id: "short", label: "الشورت", icon: "🩳", path: "/clothes/short" },
  ];

  // Filter products based on active tab
  const filteredProducts = activeTab === "all"
    ? Clothes
    : Clothes.filter((p) => p.category === activeTab);

  const titleMap = {
    top: "التوبات",
    legging: "الليجنز",
    short: "الشورت",
  };

  const currentTitle = titleMap[activeTab];

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`);
  };

  // Handle tab change with navigation
  const handleTabChange = (tabId, path) => {
    navigate(path);
  };

  // Handle scroll to products section
  const scrollToProducts = () => {
    if (productsRef.current) {
      productsRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-[#FFF8F0] to-[#FFEFE8]">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header Section */}
        <div className="relative mb-12">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-200/20 rounded-full blur-3xl" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#FBCB5C] to-[#F5A623] text-[#3B1F38] rounded-full px-5 py-2.5 text-sm font-bold mb-5 shadow-lg shadow-yellow-200/50">
              <Sparkles className="w-4 h-4" />
              <span>🎀 كوليكشن الصيف ٢٠٢٦</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#3B1F38] mb-4 font-display">
              تصاميم{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F6A6C1] to-[#B65C7C]">
                فيونكات
              </span>{" "}
              مميزة
            </h1>

            <p className="text-[#5B4458] text-base sm:text-lg max-w-2xl mx-auto">
              {filteredProducts.length}+ تصاميم توب بقطن ريب مضلع ناعم ومرن، بفيونكات بأشكال مختلفة وألوان زاهية
            </p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="max-w-7xl mx-auto mb-8">
          <div className="flex flex-col items-center gap-4">
            {/* Tabs */}
            <div className="flex flex-wrap justify-center gap-2 bg-white/60 backdrop-blur-sm rounded-2xl p-2 shadow-sm border border-white/50">
              {categories.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id, tab.path)}
                    className={`
                      flex items-center gap-2 px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300
                      ${isActive
                        ? "bg-gradient-to-r from-[#F6A6C1] to-[#B65C7C] text-white shadow-lg shadow-pink-200/50 scale-105"
                        : "text-[#5B4458] hover:bg-pink-50 hover:text-[#3B1F38]"
                      }
                    `}
                  >
                    <span className="text-lg">{tab.icon}</span>
                    <span>{tab.label}</span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Tab Results Counter */}
            <div className="text-center">
              <span className="text-sm text-[#8A6E86] bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-white/50">
                {filteredProducts.length} منتج في "{currentTitle}"
              </span>
            </div>
          </div>
        </div>

        {/* Products Grid - Added ref here */}
        <div 
          ref={productsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto scroll-mt-20"
        >
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="transform transition-all duration-700"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? 'translateY(0)' : 'translateY(30px)',
                transitionDelay: `${index * 0.07}s`
              }}
            >
              <ProductCard
                product={product}
                onPreview={handleProductClick}
                onClick={handleProductClick}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="text-xl font-bold text-[#3B1F38] mb-2">لا توجد منتجات</h3>
            <p className="text-[#8A6E86]">لم نجد أي منتجات في هذه الفئة</p>
            <button
              onClick={() => navigate('/clothes')}
              className="mt-4 inline-flex items-center gap-2 bg-gradient-to-r from-[#F6A6C1] to-[#B65C7C] text-white px-6 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
            >
              عرض جميع المنتجات
            </button>
          </div>
        )}

        {/* Features Section */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white/50 hover:border-[#F6A6C1]/30">
              <div className="w-14 h-14 bg-gradient-to-br from-[#FBCB5C]/20 to-[#F5A623]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-7 h-7 text-[#B65C7C]" />
              </div>
              <h3 className="font-bold text-[#3B1F38] mb-2 text-sm sm:text-base">
                قطن ريب ناعم
              </h3>
              <p className="text-[#8A6E86] text-xs sm:text-sm">
                خامة قطن ريب مضلع ناعم ومرن يناسب بشرة طفلتك
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white/50 hover:border-[#C9BBEE]/30">
              <div className="w-14 h-14 bg-gradient-to-br from-[#C9BBEE]/20 to-[#9CC084]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="w-7 h-7 text-[#6B2D5E]" />
              </div>
              <h3 className="font-bold text-[#3B1F38] mb-2 text-sm sm:text-base">
                تشكيلة ألوان
              </h3>
              <p className="text-[#8A6E86] text-xs sm:text-sm">
                ١٠ ألوان زاهية ومبهجة تناسب جميع الأذواق
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 border border-white/50 hover:border-[#FBCB5C]/30">
              <div className="w-14 h-14 bg-gradient-to-br from-[#F6A6C1]/20 to-[#FBCB5C]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-7 h-7 text-[#F5A623]" />
              </div>
              <h3 className="font-bold text-[#3B1F38] mb-2 text-sm sm:text-base">
                هدية مثالية
              </h3>
              <p className="text-[#8A6E86] text-xs sm:text-sm">
                اختيار رائع كهدية لأطفالك أو لأطفال المقربين
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-16 max-w-6xl mx-auto">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#3B1F38] to-[#6B2D5E] p-8 sm:p-12 text-center">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#F6A6C1]/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-[#C9BBEE]/20 rounded-full blur-3xl" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white rounded-full px-4 py-1.5 text-sm font-medium mb-4 border border-white/20">
                <Sparkles className="w-4 h-4" />
                <span>تسوقي الآن</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 font-display">
                استمتعي بخصم يصل إلى <span className="text-[#FBCB5C]">{Math.max(...Clothes.map(c => c.discount))}%</span>
              </h2>
              
              <p className="text-white/80 text-sm sm:text-base max-w-md mx-auto mb-6">
                على جميع تصاميم الفيونكات لفترة محدودة
              </p>
              
              <button 
                className="inline-flex items-center gap-2 bg-[#FBCB5C] hover:bg-[#F5A623] text-[#3B1F38] font-bold py-3 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg shadow-yellow-500/25"
                onClick={scrollToProducts}
              >
                <ShoppingBag className="w-5 h-5" />
                <span>تسوقي الكوليكشن</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CProductList;