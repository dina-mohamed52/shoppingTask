import { useTranslation } from "react-i18next";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Gift, 
  Ribbon, 
  Flower2, 
  Tag, 
  Star, 
  Crown,
  CheckCircle,
  ShoppingBag
} from "lucide-react";

function TurbonOffers({ setSelectedOffer, scrollToOrderCollection }) {
  const { t } = useTranslation();
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const turbonOffers = [
    { 
      quantity: 3, 
      price: 210, 
      value: 3,
      badge: t("turbonOffers.popular", "الأكثر طلباً"),
      badgeColor: "from-pink-500 to-pink-600",
      icon: <Ribbon className="w-5 h-5" />,
      savings: 15,
      originalPrice: 225
    },
    { 
      quantity: 5, 
      price: 310, 
      value: 5,
      badge: t("turbonOffers.bestValue", "أفضل قيمة"),
      badgeColor: "from-pink-600 to-rose-600",
      icon: <Crown className="w-5 h-5" />,
      savings: 40,
      originalPrice: 350
    },
    { 
      quantity: 6, 
      price: 360, 
      value: 6,
      badge: t("turbonOffers.bestDeal", "أفضل عرض"),
      badgeColor: "from-pink-700 to-pink-800",
      icon: <Star className="w-5 h-5" />,
      savings: 60,
      originalPrice: 420
    },
  ].sort((a, b) => a.price - b.price);

  const handleSelect = (offer) => {
    console.log("Offer selected:", offer); // للتأكد من أن الحدث شغال
    setSelectedOffer(offer);
    if (scrollToOrderCollection) {
      setTimeout(() => {
        scrollToOrderCollection(); // تأخير بسيط للتأكد من تحديث الـ state
      }, 100);
    }
  };

  // حساب سعر القطعة
  const getPricePerPiece = (price, quantity) => {
    return (price / quantity).toFixed(0);
  };

  return (
    <div id="turbonOffersSection" className="relative py-16 my-16 px-4 overflow-hidden bg-gradient-to-b from-gray-50 to-pink-50/30">
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
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full mb-6 shadow-lg shadow-pink-500/30"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">
              {t("turbonOffers.title", "عروض التربونات")}
            </span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-pink-500 to-gray-700">
              {t("turbonOffers.heading", "اختر عروضنا ووفّر أكثر")}
            </span>
          </h2>

          {/* Subtitle */}
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {t("turbonOffers.subtitle", "عروض خاصة على التربونات - كل ما اشتريت أكتر، وفرت أكتر")}
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {turbonOffers.map((offer, index) => {
            const isHovered = hoveredIndex === index;
            const pricePerPiece = getPricePerPiece(offer.price, offer.quantity);
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
                onClick={() => handleSelect(offer)} // ✅ هنا الحدث الرئيسي
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
                <div className={`relative bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl border-2 transition-all duration-500 ${
                  isHovered 
                    ? "border-pink-500 scale-105" 
                    : "border-pink-100"
                }`}>
                  
                  {/* Badge */}
                  <div className="absolute -top-4 -right-4">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${offer.badgeColor} rounded-full blur-md opacity-50`}></div>
                      <div className={`relative bg-gradient-to-r ${offer.badgeColor} text-white font-bold px-4 py-2 rounded-full text-sm shadow-xl flex items-center gap-1`}>
                        {offer.icon}
                        {offer.badge}
                      </div>
                    </div>
                  </div>

                  {/* Savings Badge */}
                  <div className="absolute -top-4 -left-4">
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-green-500 rounded-full blur-md opacity-50"></div>
                      <div className="relative bg-gradient-to-r from-green-400 to-green-500 text-white font-bold px-3 py-1.5 rounded-full text-xs shadow-xl">
                        وفر {offer.savings} ج.م
                      </div>
                    </div>
                  </div>

                  {/* Icon Container */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className={`absolute inset-0 bg-gradient-to-r ${offer.badgeColor} rounded-full blur-xl opacity-30`}></div>
                      <div className={`relative w-20 h-20 bg-gradient-to-br ${offer.badgeColor} rounded-2xl flex items-center justify-center text-white transform group-hover:rotate-6 transition-transform duration-300`}>
                        {offer.icon}
                      </div>
                    </div>
                  </div>

                  {/* Quantity */}
                  <h3 className="text-3xl font-bold text-center mb-2">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-pink-500">
                      {offer.quantity} {t("turbonOffers.pieces", "تربونات")}
                    </span>
                  </h3>

                  {/* Original Price */}
                  <div className="text-center text-gray-400 line-through text-sm mb-1">
                    {offer.originalPrice} ج.م
                  </div>

                  {/* Price */}
                  <div className="text-center mb-4">
                    <span className="text-4xl font-black text-gray-800">{offer.price}</span>
                    <span className="text-gray-600 text-lg mr-1">ج.م</span>
                  </div>

                  {/* Price Per Piece */}
                  <div className="bg-pink-50 rounded-full py-2 px-4 text-center mb-6">
                    <span className="text-pink-600 font-semibold">
                      {pricePerPiece} ج.م / {t("turbonOffers.perPiece", "للقطعة")}
                    </span>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-pink-400" />
                      <span className="text-sm">توفير {offer.savings} ج.م</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-pink-400" />
                      <span className="text-sm">توصيل سريع</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <CheckCircle className="w-4 h-4 text-pink-400" />
                      <span className="text-sm">ضمان الجودة</span>
                    </div>
                  </div>

                  {/* Select Button - اختياري، ممكن يفضل أو يتشال */}
                  <div className="w-full bg-gradient-to-r from-gray-800 to-gray-900 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-pink-500/20 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                    <ShoppingBag className="w-4 h-4 text-pink-400 group-hover/btn:scale-110 transition-transform" />
                    <span>{t("turbonOffers.select", "اختر العرض")}</span>
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
            <span className="text-gray-700">
              {t("turbonOffers.note", "العروض سارية لفترة محدودة. استفد الآن!")}
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

export default TurbonOffers;