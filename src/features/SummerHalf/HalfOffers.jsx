import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Gift, 
  Tag, 
  CheckCircle,
  ShoppingBag,
  Package,
  Shirt,
  Layers,
  TrendingUp,
  Flame
} from "lucide-react";
import { halfOffersData } from "./HalfOffersData"; 

function HalfOffers({ 
  setSelectedOffer, 
  scrollToOrderCollection, 
  filterByTabType = null,
  filterByProductType = null,
  hideTabs = false  // 👈 Prop جديد للتحكم في إخفاء التبويبات
}) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [activeOfferTab, setActiveOfferTab] = useState(filterByTabType || "half");

  // Get all available tab types from offers data
  const allTabTypes = ["half", "bandana", "turbon", "set"];
  
  const tabLabels = {
    half: "هاف كولون",
    bandana: "بندانات",
    turbon: "تربون",
    set: "أطقم"
  };

  // Filter offers based on active tab
  const filteredOffers = (() => {
    let offers = halfOffersData;
    
    // لو في صفحة منتج محدد (filterByProductType موجود)
    if (filterByProductType) {
      offers = offers.filter(offer => offer.type === filterByProductType);
    } 
    // لو في صفحة العروض الرئيسية (نستخدم الـ tab النشط)
    else if (activeOfferTab) {
      offers = offers.filter(offer => offer.tabType === activeOfferTab);
    }
    
    return offers;
  })();

  // Get dynamic title
  const getTitle = () => {
    if (filterByProductType === "set-mesh") return "عروض طقم بندانه + هاف كولون شبك";
    if (filterByProductType === "set-bow") return "عروض طقم بندانه + هاف كولون فيونكه قطن";
    return "";
  };

  const getSubtitle = () => {
    if (filterByProductType === "set-mesh" || filterByProductType === "set-bow") {
      return "عروض خاصة على هذا الطقم - اختاري عدد القطع المناسب لك";
    }
    if (activeOfferTab === "half") return "اشتري أكتر ووفّري أكتر مع أقوى عروض الهاف كولون";
    if (activeOfferTab === "bandana") return "عروض خاصة على البندانات - كل ما اشتريت أكتر، وفرت أكتر";
    if (activeOfferTab === "turbon") return "عروض خاصة على التربون - جودة عالية وأسعار مميزة";
    if (activeOfferTab === "set") return "أفضل العروض على الأطقم - جودة عالية وأسعار مميزة";
    return "اشتري أكتر ووفّري أكتر مع أقوى العروض";
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

  const getPricePerPiece = (price, quantity) => {
    return (price / quantity).toFixed(0);
  };

  // If no offers match the filter
  if (filteredOffers.length === 0) {
    return null;
  }

  return (
    <div id="halfOffersSection" className="relative py-12 px-4">
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
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e13485] to-[#c01e6f] text-white px-3 py-1.5 rounded-full mb-4 shadow-lg shadow-[#e13485]/30"
        >
          <Flame className="w-3.5 h-3.5" />
          <span className="text-xs font-semibold">عروض حصرية</span>
          <Flame className="w-3.5 h-3.5" />
        </motion.div>

        <h2 className="text-3xl md:text-4xl font-black mb-2">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e13485] via-[#e13485]/80 to-gray-700">
            {getTitle() || "عروض هاف الكولون"}
          </span>
        </h2>

        <p className="text-gray-500 text-sm max-w-2xl mx-auto">
          {getSubtitle()}
        </p>
      </motion.div>

      {/* Tabs - تظهر فقط إذا لم نطلب إخفاءها */}
      {!hideTabs && (
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 p-1 rounded-full">
            {allTabTypes.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveOfferTab(tab)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeOfferTab === tab
                    ? "bg-gradient-to-r from-[#e13485] to-[#c01e6f] text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-200"
                }`}
              >
                <div className="flex items-center sm:text-base text-[0.8rem] gap-0  sm:gap-2">
                  {tab === "half" && <Package className="w-4 h-4" />}
                  {tab === "bandana" && <Shirt className="w-4 h-4" />}
                  {tab === "turbon" && <Shirt className="w-4 h-4" />}
                  {tab === "set" && <Layers className="w-4 h-4" />}
                  {tabLabels[tab]}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
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
                  ? "shadow-xl border-[#e13485]/30 -translate-y-1" 
                  : "hover:shadow-lg"
              }`}>
                
                {offer.popular && (
                  <div className="absolute top-3 left-3 z-10">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                      <TrendingUp className="w-2.5 h-2.5" />
                      <span>{offer.badge}</span>
                    </div>
                  </div>
                )}

                <div className="absolute top-1 right-3 z-10">
                  <div className="bg-purple-700 text-white text-[9px] font-bold px-2 py-0.5 rounded-full shadow-md">
                    وفر {offer.savings}ج
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3 pt-2">
                  <div className={`w-10 h-10 bg-gradient-to-br ${offer.badgeColor} rounded-xl flex items-center justify-center text-white shadow-md shrink-0`}>
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
                      <span className="text-pink-600 font-black text-base">
                        {offer.price}
                      </span>
                      <span className="text-gray-500 text-[10px]">ج</span>
                    </div>
                  </div>
                </div>

                <div className="bg-pink-50 rounded-lg py-1 px-2 mb-3">
                  <span className="text-pink-600 font-semibold text-[11px] flex items-center justify-center gap-1">
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

                <button className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 hover:from-[#e13485] hover:to-[#c01e6f] transition-all duration-300">
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
        <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <Sparkles className="w-3.5 h-3.5 text-pink-400" />
          <span className="text-gray-600 text-xs">
            العروض سارية لفترة محدودة
          </span>
        </div>
      </motion.div>
    </div>
  );
}

export default HalfOffers;