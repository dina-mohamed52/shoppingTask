import { useTranslation } from "react-i18next";
import { Sparkles, Gift, Star, Crown, Gem, Zap, Heart } from "lucide-react";
import { useState } from "react";

function SCOffers({ setSelectedOffer, scrollToOrderCollection }) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const offerDetails = [
    { quantity: "3 كولون", price: 285, oldPrice: 330, value: 3, discount: 14 },
    { quantity: "4 كولون", price: 360, oldPrice: 440, value: 4, discount: 18 },
    { 
      quantity: "6 كولون", 
      price: 510, 
      oldPrice: 660,
      value: 6, 
      discount: 23,
      highlight: "الأكثر مبيعاً", 
      icon: <Star className="w-3.5 h-3.5" />,
    },
    { quantity: "8 كولون", price: 640, oldPrice: 880, value: 8, discount: 27 },
    { 
      quantity: "12 كولون", 
      price: 900, 
      oldPrice: 1320,
      value: 12, 
      discount: 32,
      highlight: "أفضل عرض", 
      icon: <Crown className="w-3.5 h-3.5" />,
    },
  ];

  const handleSelect = (offer) => {
    if (setSelectedOffer) setSelectedOffer(offer);
    // سكرول لـ SCOrderCollection بعد اختيار العرض
    setTimeout(() => {
      if (scrollToOrderCollection) {
        scrollToOrderCollection();
      }
    }, 100);
  };

  const getPricePerPiece = (price, value) => {
    return (price / value).toFixed(0);
  };

  const getSavings = (oldPrice, price) => {
    return oldPrice - price;
  };

  return (
    <div 
      id="offersSection" 
      className="relative
       bg-gradient-to-br from-white via-[#f5f0f7] to-white rounded-3xl 
       shadow-xl max-w-4xl mx-auto my-16 p-6 sm:p-10 border border-[#864e63]/15 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#864e63] rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#c6abff] rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#864e63]/5 via-transparent to-[#c6abff]/5 pointer-events-none"></div>

      {/* Gift Icon */}
      <div className="absolute -top-6 -right-6 z-30">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full blur-xl opacity-40 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-[#864e63] to-[#c6abff] p-3 rounded-full shadow-lg border border-white/30">
            <Gift className="w-7 h-7 text-white" />
          </div>
        </div>
      </div>

      {/* Title Badge */}
      <div className="relative mb-10 flex justify-center px-4 sm:px-0">
        <div className="absolute inset-0 bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full blur-xl opacity-20"></div>
        <div className="relative bg-white/90 backdrop-blur-sm px-6 sm:px-8 py-3 rounded-full border border-[#864e63]/20 shadow-md flex items-center gap-2 sm:gap-3">
          <Sparkles className="w-5 h-5 sm:w-5 sm:h-5 text-[#864e63] animate-spin-slow" />
          <h2 className="text-lg sm:text-2xl font-black bg-clip-text text-transparent bg-gradient-to-l from-[#864e63] to-[#c6abff]">
            عروض الكولونات
          </h2>
          <Heart className="w-4 h-4 sm:w-4 sm:h-4 text-[#864e63] animate-pulse" />
        </div>
      </div>

      {/* Offers Grid */}
      <div className="relative  grid grid-cols-1 sm:grid-cols-2 gap-5">
        {offerDetails.map((offer, index) => {
          const isHovered = hoveredIndex === index;
          const pricePerPiece = getPricePerPiece(offer.price, offer.value);
          const savings = getSavings(offer.oldPrice, offer.price);
          
          return (
            <div
              onClick={() => handleSelect(offer)}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              key={index}
              className="relative group cursor-pointer"
            >
              {/* Glow Effect on Hover */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-2xl blur-md transition-all duration-500 ${
                isHovered ? "opacity-50" : "opacity-0"
              }`}></div>

              {/* Main Card */}
              <div className={`relative bg-white rounded-2xl p-5 transition-all duration-500 border ${
                offer.highlight 
                  ? "border-[#864e63] shadow-lg shadow-[#864e63]/10" 
                  : "border-gray-100 hover:border-[#864e63]/30 shadow-sm"
                } ${isHovered ? "transform scale-[1.02]" : ""}`}
              >
                {/* Special Badge */}
                {offer.highlight && (
                  <div className="absolute -top-3 -right-3 ">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full blur-sm opacity-40"></div>
                      <div className="relative bg-gradient-to-r from-[#864e63] to-[#c6abff] text-white font-bold px-2.5 py-1 rounded-full text-[11px] shadow-md flex items-center gap-1">
                        {offer.icon}
                        {offer.highlight}
                      </div>
                    </div>
                  </div>
                )}

                {/* Discount Badge */}
                <div className="absolute -top-3 -left-3 ">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full blur-sm opacity-30"></div>
                    <div className="relative bg-gradient-to-r from-[#864e63] to-[#c6abff] px-2 py-1 rounded-full shadow-sm">
                      <span className="text-white text-[11px] font-bold">-{offer.discount}%</span>
                    </div>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col gap-3">
                  {/* Quantity and Price Row */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br from-[#864e63]/10 to-[#c6abff]/10 
                      flex items-center justify-center border border-[#864e63]/20 transition-all ${
                        isHovered ? "scale-105" : ""
                      }`}>
                        <Gift className="w-4 h-4 text-[#864e63]" />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-gray-700">{offer.quantity}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#864e63]">
                          {offer.price}
                        </span>
                        <span className="text-xs text-gray-400">ج.م</span>
                      </div>
                      <div className="text-[11px] text-gray-400 line-through">
                        {offer.oldPrice} ج.م
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

                  {/* Price Per Piece & Savings */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 bg-[#864e63]/5 px-2.5 py-1 rounded-full">
                      <Zap className="w-3 h-3 text-[#864e63]" />
                      <span className="text-[11px] text-gray-500">القطعة</span>
                      <span className="text-sm font-bold text-[#864e63]">{pricePerPiece} ج</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <Gem className="w-3 h-3 text-emerald-400" />
                      <span className="text-[11px] text-gray-500">وفر</span>
                      <span className="text-sm font-bold text-emerald-500">{savings} ج</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {offer.highlight && (
                  <div className="mt-4 pt-2">
                    <div className="flex justify-between text-[10px] text-gray-400 mb-1">
                      <span className="flex items-center gap-1">🔥 نفاذ سريع</span>
                      <span>{offer.discount}% خصم</span>
                    </div>
                    <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full"
                        style={{ width: `${offer.discount * 2.5}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {/* Subtle hover indicator */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-[#864e63] to-transparent rounded-full"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Note */}
      <div className="relative  mt-10 text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#864e63]/5 to-[#c6abff]/5 backdrop-blur-sm rounded-full px-4 py-2 border border-[#864e63]/10">
          <Sparkles className="w-3.5 h-3.5 text-[#864e63]" />
          <p className="text-gray-500 text-xs flex items-center gap-2">
            🎁 خصم إضافي <strong className="text-[#864e63]">5%</strong> عند شراء عرضين أو أكثر
          </p>
          <Sparkles className="w-3.5 h-3.5 text-[#c6abff]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-spin-slow {
          animation: spin-slow 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default SCOffers;