import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Tag, 
  CheckCircle,
  ShoppingBag,
  Package,
  Shirt,
  Layers,
  TrendingUp,
  Flame
} from "lucide-react";
import { halfOffersData } from "../SummerHalf/HalfOffersData";

function TurbonOffers({ 
  setSelectedOffer, 
  scrollToOrderCollection,
  filterByTabType = null,
  filterByProductType = null,
  hideTabs = false
}) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeOfferTab, setActiveOfferTab] = useState(filterByTabType || "turbon");

  // Get all available tab types from offers data
  const allTabTypes = ["turbon", "bandana", "set"];
  
  const tabLabels = {
    turbon: "عروض التربون",
    bandana: "عروض البندانات",
    set: "عروض الأطقم"
  };

  // Filter offers based on active tab
  const filteredOffers = (() => {
    let offers = halfOffersData.filter(offer => offer.tabType !== "half");
    
    if (filterByProductType) {
      offers = offers.filter(offer => offer.type === filterByProductType);
    } 
    else if (activeOfferTab) {
      offers = offers.filter(offer => offer.tabType === activeOfferTab);
    }
    
    return offers;
  })();

  const getTitle = () => {
    if (filterByProductType === "set-bandana") {
      return "عروض طقم بندانه + هاف كولون";
    }
    if (filterByProductType === "set-turbon") {
      return "عروض طقم تربون + هاف كولون";
    }
    if (activeOfferTab === "turbon") {
      return "عروض التربون";
    }
    if (activeOfferTab === "bandana") {
      return "عروض البندانات";
    }
    if (activeOfferTab === "set") {
      return "عروض الأطقم";
    }
    return "العروض";
  };

  const getSubtitle = () => {
    if (filterByProductType === "set-bandana" || filterByProductType === "set-turbon") {
      return "عروض خاصة على هذا الطقم - اختاري عدد القطع المناسب لك";
    }
    if (activeOfferTab === "turbon") return "عروض خاصة على التربون - جودة عالية وأسعار مميزة";
    if (activeOfferTab === "bandana") return "عروض خاصة على البندانات - كل ما اشتريت أكتر، وفرت أكتر";
    if (activeOfferTab === "set") return "أفضل العروض على الأطقم - جودة عالية وأسعار مميزة";
    return "اشتري أكتر ووفّري أكتر مع أقوى العروض";
  };

 const handleSelect = (offer) => {
  console.log("Offer selected:", offer);
  if (setSelectedOffer) {
    setSelectedOffer({
      ...offer,
      selectedTabType: activeOfferTab, // turbon, bandana, set
    });
  }
  if (scrollToOrderCollection) {
    setTimeout(() => {
      scrollToOrderCollection();
    }, 100);
  }
};
  const getPricePerPiece = (price, quantity) => {
    return (price / quantity).toFixed(0);
  };

  if (filteredOffers.length === 0) {
    return null;
  }

  return (
    <div id="turbonOffersSection" className="relative py-12 px-4 bg-gray-50">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 bg-pink-500 text-white px-3 py-1.5 rounded-full mb-4 shadow-lg shadow-pink-500/30"
        >
          <Flame className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">عروض حصرية</span>
          <Flame className="w-3.5 h-3.5" />
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-black mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-gray-700">
            {getTitle() || "عروض التربون"}
          </span>
        </h2>

        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          {getSubtitle()}
        </p>
      </motion.div>

      {/* Tabs */}
      {!hideTabs && (
        <div dir="rtl" className="flex justify-center mb-8 px-4">
          <div className="inline-flex flex-wrap justify-center gap-2 bg-white p-2 rounded-2xl shadow-md border border-gray-100 max-w-md sm:max-w-5xl mx-auto">
            {allTabTypes.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveOfferTab(tab)}
                className={`
                  flex-1 min-w-[calc(50%-0.5rem)] sm:min-w-0
                  px-2 py-2 rounded-xl text-sm font-medium transition-all duration-300
                  ${activeOfferTab === tab
                    ? "bg-pink-500 px-3 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"}
                `}
              >
                <div className="flex items-center justify-center whitespace-nowrap gap-1 sm:gap-2 text-[0.8rem] sm:text-base font-bold">
                  {tab === "turbon" && <Shirt className="w-4 h-4" />}
                  {tab === "bandana" && <Shirt className="w-4 h-4" />}
                  {tab === "set" && <Layers className="w-4 h-4" />}
                  <span>{tabLabels[tab]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Offers Grid */}
      <div dir="rtl" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
        {filteredOffers.map((offer, index) => {
          const isHovered = hoveredIndex === index;
          const pricePerPiece = getPricePerPiece(offer.price, offer.quantity);
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              onClick={() => handleSelect(offer)}
              className="relative group cursor-pointer"
            >
              <div className={`relative bg-white rounded-2xl p-4 shadow-md border border-gray-100 transition-all duration-300 ${
                isHovered 
                  ? "shadow-xl border-pink-300 -translate-y-1" 
                  : "hover:shadow-lg"
              }`}>
                
                {offer.popular && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <TrendingUp className="w-2.5 h-2.5" />
                      <span>{offer.badge}</span>
                    </div>
                  </div>
                )}

                <div className="absolute top-1 right-3 z-10">
                  <div className="bg-gray-800 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    وفر {offer.savings}ج
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3 pt-2">
                  <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center text-white shadow-md shrink-0">
                    {offer.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 text-sm truncate">
                      {offer.name}
                    </h3>
                    <div className="flex items-baseline gap-1 flex-wrap">
                      <span className="text-gray-400 line-through text-[10px]">
                        {offer.originalPrice}ج
                      </span>
                      <span className="text-pink-500 font-black text-base">
                        {offer.price}
                      </span>
                      <span className="text-gray-500 text-[10px]">ج</span>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-lg py-1 px-2 mb-3">
                  <span className="text-pink-500 font-semibold text-[11px] flex items-center justify-center gap-1">
                    <Tag className="w-3 h-3" />
                    {pricePerPiece} ج / {offer.unit}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2 mb-3 text-[10px] text-gray-500">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>{offer.quantity} قطعة</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-green-500" />
                    <span>توصيل سريع</span>
                  </div>
                </div>

                <button className="w-full bg-gray-800 text-white py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:bg-pink-500 transition-all duration-300">
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>اختر العرض</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        className="text-center mt-8"
      >
        <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-gray-600 text-xs">
            العروض سارية لفترة محدودة
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default TurbonOffers;