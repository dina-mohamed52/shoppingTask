import { useTranslation } from "react-i18next";
import { Sparkles, Gift, Star, Crown, Gem, Zap, Heart } from "lucide-react";
import { useState } from "react";

function SCOffers({ setSelectedOffer, scrollToOrderCollection }) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const offerDetails = [
    { 
      quantity: "3 كولون", 
      name: "عرض 3 كولون صيفي",  
      price: 345, 
      oldPrice: 480, 
      value: 3, 
      discount: 14 
    },
    { 
      quantity: "4 كولون", 
      name: "عرض 4 كولون صيفي",
      price: 440, 
      oldPrice: 620, 
      value: 4, 
      discount: 18 
    },
    { 
      quantity: "6 كولون", 
      name: "عرض 6 كولون صيفي",
      price: 600, 
      oldPrice: 910,
      value: 6, 
      discount: 23,
      highlight: "الأكثر مبيعاً", 
      icon: <Star className="w-3.5 h-3.5" />,
    },
    { 
      quantity: "8 كولون", 
      name: "عرض 8 كولون صيفي",
      price: 720, 
      oldPrice: 1180, 
      value: 8, 
      discount: 27 
    },
    { 
      quantity: "12 كولون", 
      name: "عرض 12 كولون صيفي",
      price: 960, 
      oldPrice: 1720,
      value: 12, 
      discount: 32,
      highlight: "أفضل عرض", 
      icon: <Crown className="w-3.5 h-3.5" />,
    },
  ];

  const handleSelect = (offer) => {
    if (setSelectedOffer) setSelectedOffer(offer);
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
       bg-gradient-to-br from-pink-500/50 via-white to-blue-950/60 rounded-3xl  
       shadow-lg max-w-4xl mx-auto my-16 p-6 sm:p-12 border border-slate-200 overflow-hidden"
    >
      {/* Decorative Background Elements - أخف وأكثر نعومة */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-[#F472B6] rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-[#1A2A4F] rounded-full filter blur-3xl"></div>
      </div>

      {/* Gift Icon */}
      <div className="absolute top-4 right-4 z-30">
        <div className="relative">
          <div className="relative bg-white p-3 rounded-full shadow-md border border-slate-200">
            <Gift className="w-7 h-7 text-[#F472B6]" />
          </div>
        </div>
      </div>

      {/* Title Badge */}
      <div className="relative mb-10 flex justify-center px-4 sm:px-0">
        <div className="relative bg-white px-6 sm:px-8 py-3 rounded-full border border-slate-200 shadow-sm flex items-center gap-2 sm:gap-3">
          <Sparkles className="w-5 h-5 sm:w-5 sm:h-5 text-[#F472B6]" />
          <h2 className="text-lg sm:text-2xl font-bold text-slate-800">
            عروض الكولونات
          </h2>
          <Heart className="w-4 h-4 sm:w-4 sm:h-4 text-[#F472B6]" />
        </div>
      </div>

      {/* Offers Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-5">
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
              {/* Main Card */}
              <div className={`relative bg-white rounded-2xl p-5 transition-all duration-300 border ${
                offer.highlight 
                  ? "border-[#F472B6]/30 shadow-md" 
                  : "border-slate-200 hover:border-slate-300 shadow-sm"
                } ${isHovered ? "transform scale-[1.01] shadow-lg" : ""}`}
              >
                {/* Special Badge */}
                {offer.highlight && (
                  <div className="absolute -top-3 -right-3">
                    <div className="relative bg-[#F472B6] text-white font-bold px-2.5 py-1 rounded-full text-[11px] shadow-md flex items-center gap-1">
                      {offer.icon}
                      {offer.highlight}
                    </div>
                  </div>
                )}

                {/* Discount Badge */}
                <div className="absolute -top-3 -left-3">
                  <div className="relative bg-pink-500 px-2 py-1 rounded-full shadow-sm">
                    <span className="text-white text-[11px] font-bold">-{offer.discount}%</span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="flex flex-col gap-3">
                  {/* Quantity and Price Row */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`w-9 h-9 rounded-xl bg-slate-100 
                      flex items-center justify-center transition-all ${
                        isHovered ? "scale-105 bg-[#F472B6]/10" : ""
                      }`}>
                        <Gift className={`w-4 h-4 transition-colors ${
                          isHovered ? "text-[#F472B6]" : "text-slate-400"
                        }`} />
                      </div>
                      <div>
                        <span className="text-lg font-bold text-slate-700">{offer.quantity}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-[#F472B6]">
                          {offer.price}
                        </span>
                        <span className="text-xs text-slate-400">ج.م</span>
                      </div>
                      <div className="text-[11px] text-slate-400 line-through">
                        {offer.oldPrice} ج.م
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                  {/* Price Per Piece & Savings */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2.5 py-1 rounded-full">
                      <Zap className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px] text-slate-500">القطعة</span>
                      <span className="text-sm font-bold text-slate-700">{pricePerPiece} ج</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-emerald-50 px-2.5 py-1 rounded-full">
                      <Gem className="w-3 h-3 text-pink-500" />
                      <span className="text-[11px] text-slate-500">وفر</span>
                      <span className="text-sm font-bold text-pink-600">{savings} ج</span>
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                {offer.highlight && (
                  <div className="mt-4 pt-2">
                    <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                      <span className="flex items-center gap-1 text-[#F472B6]">🔥 نفاذ سريع</span>
                      <span className="text-[#F472B6]">{offer.discount}% خصم</span>
                    </div>
                    <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-[#F472B6] rounded-full"
                        style={{ width: `${offer.discount * 2.5}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default SCOffers;