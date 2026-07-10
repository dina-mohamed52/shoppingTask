import { useState } from "react";
import { Package, Shirt, Sparkles, ShoppingBag, Flame, TrendingUp, Zap } from "lucide-react";
import { ClothesOffersData } from "./ClothesOfferesData";

function ClothesOffers({ 
  setSelectedOffer, 
  scrollToOrderCollection,
  filterByTabType = null,
  filterByProductType = null,
  hideTabs = false
}) {
  const [activeTab, setActiveTab] = useState(filterByTabType || "top");
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const filteredOffers = ClothesOffersData.filter(offer => {
    if (filterByProductType) {
      return offer.type === filterByProductType;
    }
    // if (activeTab === "all") return true;
    if (activeTab === "legging") return offer.tabType === "legging";
    if (activeTab === "short") return offer.tabType === "short";
    if (activeTab === "top") return offer.tabType === "top";
    if (activeTab === "popular") return offer.popular === true;
    return true;
  });

  // const tabs = [
  //   { id: "all", label: "الكل", icon: <ShoppingBag className="w-4 h-4" /> },
  //   { id: "legging", label: "ليجن ريب", icon: <Package className="w-4 h-4" /> },
  //   { id: "short", label: "شورت", icon: <Shirt className="w-4 h-4" /> },
  //   { id: "top", label: "توب", icon: <Sparkles className="w-4 h-4" /> },
  // ];

  const getOfferIcon = (type) => {
    switch(type) {
      case "legging": return <Package className="w-5 h-5" />;
      case "short": return <Shirt className="w-5 h-5" />;
      case "top": return <Sparkles className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case "legging": return "from-pink-400 to-rose-400";
      case "short": return "from-purple-400 to-violet-400";
      case "top": return "from-amber-400 to-orange-400";
      default: return "from-pink-400 to-rose-400";
    }
  };

  const getTypeLightColor = (type) => {
    switch(type) {
      case "legging": return "bg-pink-50";
      case "short": return "bg-purple-50";
      case "top": return "bg-amber-50";
      default: return "bg-pink-50";
    }
  };

  const getTypeTextColor = (type) => {
    switch(type) {
      case "legging": return "text-pink-500";
      case "short": return "text-purple-500";
      case "top": return "text-amber-500";
      default: return "text-pink-500";
    }
  };

  const handleSelect = (offer) => {
    console.log("Offer selected:", offer);
    if (setSelectedOffer) {
      setSelectedOffer(offer);
    }
    if (scrollToOrderCollection) {
      setTimeout(() => {
        scrollToOrderCollection();
      }, 100);
    }
  };

  // If no offers match the filter
  if (filteredOffers.length === 0) {
    return null;
  }

  return (
    <div 
      dir="rtl" 
      style={{ 
        background: "linear-gradient(160deg, #FFF8F0 0%, #FFEFE8 50%, #FFF5F0 100%)",
        padding: "60px 0 80px",
        position: "relative",
        overflow: "hidden"
      }}
    >
      {/* Background Decorations - Matching Hero */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;700;800&family=Cairo:wght@400;500;600;700&display=swap');

        .offers-display-font { font-family: 'Baloo Bhaijaan 2', 'Cairo', sans-serif; }
        .offers-body-font { font-family: 'Cairo', sans-serif; }

        @keyframes offersFloat {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-12px) rotate(var(--r, 0deg)); }
        }

        @keyframes offersPulse {
          0%, 100% { transform: scale(1); opacity: 0.4; }
          50% { transform: scale(1.6); opacity: 1; }
        }

        @keyframes offersSlideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .offers-float { animation: offersFloat 5s ease-in-out infinite; }
        .offers-slide-up { animation: offersSlideUp 0.8s cubic-bezier(.22,1,.36,1) both; }
        .offers-card {
          transition: transform 0.4s cubic-bezier(.34,1.56,.64,1), box-shadow 0.4s ease;
          will-change: transform;
        }
        .offers-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 28px 50px -18px rgba(59,31,56,0.25) !important;
        }

        /* Tab Styles */
        .offers-tab {
          transition: all 0.3s ease;
          position: relative;
        }
        .offers-tab::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: linear-gradient(135deg, #FBCB5C, #F5A623);
          border-radius: 10px;
          transition: width 0.3s ease;
        }
        .offers-tab.active::after {
          width: 60%;
        }

        /* CTA Button */
        .offers-cta {
          background: linear-gradient(135deg, #3B1F38 0%, #6B2D5E 50%, #3B1F38 100%);
          background-size: 200% 200%;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        .offers-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px -12px rgba(59,31,56,0.4);
          background-position: 100% 100%;
        }
        .offers-cta:active { transform: scale(0.95); }

        /* Mobile Responsive */
        @media (max-width: 640px) {
          .offers-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
            padding: 0 12px !important;
          }
          .offers-tabs-wrapper {
            overflow-x: auto !important;
            padding: 0 12px 8px !important;
            gap: 4px !important;
            -webkit-overflow-scrolling: touch;
          }
          .offers-tabs-wrapper::-webkit-scrollbar { height: 2px; }
          .offers-tabs-wrapper::-webkit-scrollbar-thumb { 
            background: #F6A6C1; 
            border-radius: 10px; 
          }
          .offers-tab {
            padding: 8px 14px !important;
            font-size: 13px !important;
            white-space: nowrap;
          }
          .offers-header h2 {
            font-size: 24px !important;
          }
          .offers-header p {
            font-size: 13px !important;
            padding: 0 16px !important;
          }
          .offers-price {
            font-size: 26px !important;
          }
          .offers-card-content {
            padding: 16px !important;
          }
        }

        @media (min-width: 641px) and (max-width: 1024px) {
          .offers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .offers-float, .offers-slide-up, .offers-card,
          .offers-cta, .offers-tab { 
            animation: none !important; 
            transition: none !important; 
          }
        }
      `}</style>

      {/* Background Blobs - Matching Hero */}
      <div
        style={{
          position: "absolute",
          width: "min(500px, 60vw)",
          height: "min(500px, 60vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, #F6A6C1, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.15,
          top: -80,
          right: -60,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "min(400px, 50vw)",
          height: "min(400px, 50vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, #C9BBEE, transparent 70%)",
          filter: "blur(100px)",
          opacity: 0.12,
          bottom: -60,
          left: -40,
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: "min(200px, 30vw)",
          height: "min(200px, 30vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, #FBCB5C, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.08,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 0,
        }}
      />

      <div className="w-full max-w-7xl mx-auto px-4 relative z-10">
        {/* Header - Matching Hero Style */}
        <div className="text-center mb-12 offers-header">
          <div 
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-4 offers-slide-up"
            style={{
              background: "linear-gradient(135deg, #FBCB5C, #F5A623)",
              color: "#3B1F38",
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 4px 14px rgba(251,203,92,0.3)",
            }}
          >
            <Zap className="w-4 h-4" />
            <span className="offers-body-font">عروض الحزم</span>
          </div>
          <h2 className="offers-display-font text-3xl md:text-4xl font-bold" style={{ color: "#3B1F38" }}>
            اختاري الكمية المناسبة لكِ
          </h2>
          <p className="offers-body-font text-gray-500 mt-2 text-sm max-w-md mx-auto" style={{ color: "#5B4458" }}>
            كلما زادت الكمية، زاد التوفير! استفيدي من عروضنا المميزة
          </p>
        </div>

        {/* Tabs - Clean & Modern - Hide if needed */}
        {/* {!hideTabs && ( */}
          {/* // <div className="flex justify-center gap-1 bg-white/60 backdrop-blur-sm p-1.5 rounded-full max-w-2xl mx-auto mb-12 offers-tabs-wrapper border border-white/50 shadow-sm"> */}
            {/* {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  offers-tab offers-body-font
                  flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap
                  transition-all duration-300
                  ${activeTab === tab.id
                    ? "active text-gray-900 shadow-lg shadow-gray-200/30"
                    : "text-gray-500 hover:text-gray-700"
                  }
                `}
                style={{
                  background: activeTab === tab.id ? "white" : "transparent",
                  color: activeTab === tab.id ? "#3B1F38" : "#8A6E86",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        )} */}

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 offers-grid">
          {filteredOffers.map((offer, index) => {
            const savingsPercentage = offer.savings > 0 
              ? Math.round((offer.savings / offer.originalPrice) * 100)
              : 0;
            const pricePerItem = Math.round(offer.price / offer.quantity);
            const isHovered = hoveredIndex === index;

            return (
              <div
                key={index}
                className={`offers-card bg-white rounded-3xl border border-white/60 overflow-hidden shadow-lg shadow-gray-100/30 cursor-pointer ${
                  isHovered ? "ring-2 ring-pink-400/50" : ""
                }`}
                style={{ 
                  animationDelay: `${index * 0.08}s`,
                  opacity: 0,
                  animation: `offersSlideUp 0.6s cubic-bezier(.22,1,.36,1) ${index * 0.08}s forwards`
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSelect(offer)}
              >
                {/* Gradient Top Bar */}
                <div className={`h-1.5 bg-gradient-to-r ${getTypeColor(offer.tabType)}`}></div>

                {/* Content */}
                <div className="p-6 offers-card-content">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-2xl ${getTypeLightColor(offer.tabType)}`}>
                        <div className={getTypeTextColor(offer.tabType)}>
                          {getOfferIcon(offer.tabType)}
                        </div>
                      </div>
                      <div>
                        <h3 className="offers-body-font font-bold" style={{ color: "#3B1F38" }}>{offer.name}</h3>
                        <span className="offers-body-font text-xs" style={{ color: "#8A6E86" }}>{offer.quantity} قطعة</span>
                      </div>
                    </div>
                    
                    {offer.popular && (
                      <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/50">
                        <Flame className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-[10px] font-bold text-amber-600 offers-body-font">رائج</span>
                      </div>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mb-4">
                    <div className="flex items-end gap-3">
                      <span className="offers-display-font text-3xl font-bold offers-price" style={{ color: "#3B1F38" }}>
                        {offer.price} 
                        <span className="offers-body-font text-sm font-normal" style={{ color: "#8A6E86" }}> ج.م</span>
                      </span>
                      {offer.savings > 0 && (
                        <span className="offers-body-font text-sm line-through" style={{ color: "#B65C7C" }}>
                          {offer.originalPrice} ج.م
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <span className="offers-body-font text-xs" style={{ color: "#8A6E86" }}>سعر القطعة</span>
                      <span className="offers-body-font text-sm font-semibold" style={{ color: "#5B4458" }}>{pricePerItem} ج.م</span>
                    </div>
                  </div>

                  {/* Savings Badge */}
                  {offer.savings > 0 && (
                    <div className="flex items-center gap-2 bg-emerald-50/70 px-3 py-2 rounded-xl mb-4 border border-emerald-200/30">
                      <TrendingUp className="w-4 h-4 text-emerald-500" />
                      <span className="offers-body-font text-sm font-medium text-emerald-700">
                        وفر {offer.savings} ج.م 
                        <span className="text-emerald-500 mr-1">({savingsPercentage}%)</span>
                      </span>
                    </div>
                  )}

                  {/* CTA Button - Hero Style */}
                  <button 
                    className="offers-cta w-full py-3.5 rounded-2xl text-white font-medium offers-body-font flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(offer);
                    }}
                  >
                    <ShoppingBag className="w-4 h-4" />
                    اختر العرض
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredOffers.length === 0 && (
          <div className="text-center py-16">
            <div className="inline-block p-6 bg-white/50 backdrop-blur-sm rounded-full mb-4 border border-white/50">
              <Package className="w-12 h-12" style={{ color: "#C9BBEE" }} />
            </div>
            <h3 className="offers-body-font text-xl font-bold" style={{ color: "#3B1F38" }}>لا توجد عروض</h3>
            <p className="offers-body-font text-sm" style={{ color: "#8A6E86" }}>جرب اختيار فئة أخرى</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClothesOffers;