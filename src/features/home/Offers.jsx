import { useTranslation } from "react-i18next";
import { Sparkles, Gift, Star, Crown } from "lucide-react";
import { useState } from "react";

const offerDetails = (t) => [
  { 
    quantity: t("offers.q3"), 
    name: "عرض 3 كولون شتوي",  // إضافة اسم وصفي للعرض
    price: 270, 
    value: 3 
  },
  { 
    quantity: t("offers.q4"), 
    name: "عرض 4 كولون شتوي",
    price: 340, 
    value: 4 
  },
  { 
    quantity: t("offers.q6"), 
    name: "عرض 6 كولون شتوي - الأكثر مبيعاً",
    price: 480, 
    highlight: t("offers.mostWanted"), 
    badgeColor: "from-pink-500 to-pink-600",
    textColor: "text-pink-300",
    icon: <Star className="w-4 h-4" />,
    value: 6 
  },
  { 
    quantity: t("offers.q8"), 
    name: "عرض 8 كولون شتوي",
    price: 600, 
    value: 8 
  },
  { 
    quantity: t("offers.q12"), 
    name: "عرض 12 كولون شتوي - أفضل قيمة",
    price: 840, 
    highlight: t("offers.bestDeal"), 
    badgeColor: "from-pink-600 to-rose-600",
    textColor: "text-pink-300",
    icon: <Crown className="w-4 h-4" />,
    value: 12 
  },
].sort((a, b) => a.price - b.price);

function Offers({ setSelectedOffer, scrollToOrderCollection }) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleSelect = (offer) => {
    // إرسال العرض كاملاً مع الاسم الجديد
    setSelectedOffer(offer);
    if (scrollToOrderCollection) {
      scrollToOrderCollection();
    }
  };

  // حساب أفضل سعر للقطعة
  const getPricePerPiece = (price, value) => {
    return (price / value).toFixed(0);
  };

  return (
    <div 
      id="offersSection" 
      className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-3xl shadow-2xl max-w-4xl mx-auto my-24 p-8 sm:p-12 border border-pink-500/30 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-pink-500 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-gray-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-gray-900/40 pointer-events-none"></div>

      {/* Crown Icon for "Offers" Title */}
      <div className="absolute -top-6 -right-6 z-30">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-pink-400 to-pink-600 p-3 rounded-full shadow-2xl border border-pink-300/30">
            <Gift className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Title Badge - "عروضنا" */}
      <div className="relative mb-12 flex justify-center px-4 sm:px-0">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-xl opacity-30"></div>
        <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 px-4 sm:px-8 py-4 rounded-full border border-pink-500/30 shadow-2xl flex items-center gap-2 sm:gap-3 max-w-full">
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 animate-spin-slow flex-shrink-0" />
          <h2 className="text-xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-300 to-white whitespace-nowrap overflow-x-auto scrollbar-hide text-center">
            {t("offers.title")}
          </h2>
          <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 animate-spin-slow flex-shrink-0" style={{ animationDelay: "0.5s" }} />
        </div>
      </div>

      {/* أضف هذا الـ style لإخفاء شريط التمرير */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Offers Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {offerDetails(t).map((offer, index) => {
          const isHovered = hoveredIndex === index;
          const pricePerPiece = getPricePerPiece(offer.price, offer.value);
          
          return (
            <div
              onClick={() => handleSelect(offer)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              key={index}
              className="relative group cursor-pointer"
            >
              {/* Glow Effect on Hover */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl blur-xl transition-all duration-500 ${
                isHovered ? "opacity-50" : "opacity-0"
              }`}></div>

              {/* Main Card */}
              <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-6 sm:p-8 transition-all duration-500 border-2 ${
                offer.highlight 
                  ? "border-pink-500 shadow-xl shadow-pink-500/20" 
                  : "border-gray-700 hover:border-pink-500/50"
                } ${isHovered ? "transform scale-105" : ""}`}
              >
                {/* Special Badge for Highlighted Offers */}
                {offer.highlight && (
                  <div className="absolute -top-4 -right-4 z-20">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${offer.badgeColor} rounded-full blur-md opacity-50 animate-pulse`}></div>
                      <div className={`relative bg-gradient-to-r ${offer.badgeColor} text-white font-bold px-4 py-1.5 rounded-full text-sm shadow-xl flex items-center gap-1`}>
                        {offer.icon}
                        {offer.highlight}
                      </div>
                    </div>
                  </div>
                )}

                {/* Price Per Piece Badge (ظهر في الكارت) */}
                <div className="absolute -top-3 -left-3 z-20">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-md opacity-30"></div>
                    <div className="relative bg-gray-900 border border-pink-400/30 px-3 py-1 rounded-full">
                      <span className="text-pink-300 text-xs font-bold">
                        {pricePerPiece} ج.م/{t("offers.perPiece", "للقطعة")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-row justify-between items-center gap-4">
                  {/* Quantity with Icon */}
                  <div className="flex items-center gap-2">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-pink-500/20 to-pink-600/20 
                    flex items-center justify-center border border-pink-500/30 ${
                      isHovered ? "animate-pulse" : ""
                    }`}>
                      <Gift className={`w-5 h-5 ${offer.textColor || "text-pink-400"}`} />
                    </div>
                    <span className={`text-md sm:text-xl font-semibold ${offer.textColor || "text-gray-200"}`}>
                      {offer.quantity}
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className={`text-xl sm:text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${
                      offer.highlight ? "from-pink-300 to-pink-100" : "from-pink-400 to-pink-300"
                    }`}>
                      {offer.price}
                    </span>
                    <span className="text-gray-400 text-sm">ج.م</span>
                  </div>
                </div>

                {/* Progress Bar (للأوفر المميزة) */}
                {offer.highlight && (
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>{t("offers.sold", "تم البيع")}</span>
                      <span>70%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* اسم العرض الصغير أسفل البطاقة (اختياري) */}
                <div className="mt-3 text-center">
                  <span className="text-[10px] text-gray-500 bg-gray-800/50 px-2 py-0.5 rounded-full">
                    {offer.name}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="relative z-10 mt-10 text-center">
        <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
          <span className="w-1 h-1 bg-pink-400 font-semibold rounded-full"></span>
          {t("offers.note", "أسعار خاصة للكميات الكبيرة")}
          <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
        </p>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Offers;