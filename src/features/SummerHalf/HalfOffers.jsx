import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Gift, 
  Ribbon, 
  Tag, 
  Star, 
  Crown,
  CheckCircle,
  ShoppingBag,
  Package,
  Shirt,
  Layers,
  Zap
} from "lucide-react";

function HalfOffers({ setSelectedOffer, scrollToOrderCollection }) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const halfOffers = [
    { 
      name: "6 هاف كولون",
      quantity: 6, 
      price: 300, 
      badge: "الأكثر طلباً",
      badgeColor: "from-[#e13485] to-[#c01e6f]",
      icon: <Package className="w-5 h-5" />,
      savings: 120,
      originalPrice: 420,
      unit: "هاف كولون",
      popular: true,
      tabType: "half"
    },
    { 
      name: "6 بندانات",
      quantity: 6, 
      price: 270, 
      badge: "عرض خاص",
      badgeColor: "from-[#c01e6f] to-[#a0105a]",
      icon: <Shirt className="w-5 h-5" />,
      savings: 110,
      originalPrice: 380,
      unit: "بندانة",
      popular: false,
       tabType: "bandana"
    },
    { 
      name: "3 اطقم",
      quantity: 3, 
      price: 285, 
      badge: "أفضل قيمة",
      badgeColor: "from-[#a0105a] to-[#e13485]",
      icon: <Layers className="w-5 h-5" />,
      savings: 115,
      originalPrice: 400,
      unit: "طقم",
      popular: false,
       tabType: "set"
    },
    { 
      name: "6 اطقم",
      quantity: 6, 
      price: 535, 
      badge: "أفضل عرض",
      badgeColor: "from-[#e13485] to-[#801040]",
      icon: <Gift className="w-5 h-5" />,
      savings: 215,
      originalPrice: 750,
      unit: "قطعة",
      popular: false,
       tabType: "set"
    },
  ];

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

  return (
    <div id="halfOffersSection" className="relative py-16 my-16 px-4 overflow-hidden ">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#e13485] to-[#c01e6f] text-white px-4 py-2 rounded-full mb-6 shadow-lg shadow-[#e13485]/30"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">
              عروض هاف الكولون
            </span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e13485] via-[#e13485]/80 to-gray-700">
              اختري عروضنا ووفّري أكتر
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            عروض خاصة على الهاف الكولون والبندانات - كل ما اشتريت أكتر، وفرت أكتر
          </p>
        </motion.div>

        {/* Offers Grid - 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {halfOffers.map((offer, index) => {
            const isHovered = hoveredIndex === index;
            const pricePerPiece = getPricePerPiece(offer.price, offer.quantity);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => handleSelect(offer)}
                className="relative group cursor-pointer"
              >
                {/* Glow Effect */}
                <motion.div
                  animate={{ scale: isHovered ? 1.05 : 1 }}
                  className={`absolute -inset-1 bg-gradient-to-r ${offer.badgeColor} rounded-3xl blur-xl transition-opacity duration-500 ${
                    isHovered ? "opacity-50" : "opacity-0"
                  }`}
                />

                {/* Main Card */}
                <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl border-2 transition-all duration-500 ${
                  isHovered 
                    ? "border-[#e13485] scale-105" 
                    : "border-pink-100"
                }`}>
                  
                  {/* Badge */}
                  <div className="absolute -top-4 -right-4">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${offer.badgeColor} rounded-full blur-md opacity-50`}></div>
                      <div className={`relative bg-gradient-to-r ${offer.badgeColor} text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-xl flex items-center gap-1`}>
                        {offer.icon}
                        {offer.badge}
                      </div>
                    </div>
                  </div>

                 
                  {/* Icon Container */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${offer.badgeColor} rounded-full blur-xl opacity-30`}></div>
                      <div className={`relative w-16 h-16 bg-gradient-to-br ${offer.badgeColor} rounded-2xl flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform duration-300`}>
                        {offer.icon}
                      </div>
                    </div>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-center mb-1">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#e13485] to-[#c01e6f]">
                      {offer.name}
                    </span>
                  </h3>

                  {/* Original Price */}
                  <div className="text-center text-gray-400 line-through text-xs mb-1">
                    {offer.originalPrice} ج
                  </div>

                  {/* Price */}
                  <div className="text-center mb-3">
                    <span className="text-3xl font-black text-gray-800">{offer.price}</span>
                    <span className="text-gray-600 text-sm mr-1">ج</span>
                  </div>

                  {/* Price Per Piece */}
                  <div className="bg-pink-50 rounded-full py-1.5 px-3 text-center mb-4">
                    <span className="text-pink-600 font-semibold text-xs">
                      {pricePerPiece} ج / {offer.unit}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-pink-400" />
                      <span>توفير {offer.savings} ج</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-pink-400" />
                      <span>توصيل سريع</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-xs">
                      <CheckCircle className="w-3.5 h-3.5 text-pink-400" />
                      <span>ضمان الجودة</span>
                    </div>
                  </div>

                  {/* Select Button */}
                  <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn text-sm">
                    <ShoppingBag className="w-4 h-4 text-pink-400 group-hover/btn:scale-110 transition-transform" />
                    <span>اختر العرض</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg border border-pink-200">
            <Tag className="w-4 h-4 text-pink-400" />
            <span className="text-gray-700 text-sm">
              العروض سارية لفترة محدودة. استفدي الآن!
            </span>
          </div>
        </motion.div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}

export default HalfOffers;