import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Data } from "../data/Data";
import { ShoppingBag, MapPin, Clock, Crown } from "lucide-react";
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";

const names = [
  "تقي",
  "سارة",
  "محمود",
  "ليلى",
  "يوسف",
  "مريم",
  "علي",
  "أحمد",
  "عمر",
  "ندى",
  "هاجر",
  "سلمى",
  "ملك",
  "رحمة",
  "زين",
  "آدم",
  "نور",
  "جميلة",
  "إسراء",
  "أميرة",
  "خالد",
  "إبراهيم",
  "ياسمين",
  "فاطمة",
  "حسن",
  "عائشة",
  "كارما",
];

const cities = [
  "قنا",
  "القاهرة",
  "الجيزة",
  "الإسكندرية",
  "المنصورة",
  "سوهاج",
  "أسيوط",
  "طنطا",
  "بورسعيد",
  "الفيوم",
  "دمياط",
  "بني سويف",
  "الأقصر",
  "أسوان",
  "كفر الشيخ",
  "المحلة",
  "حلوان",
  "شبين الكوم",
  "مرسى مطروح",
  "العريش",
];

const offers = ["4", "6", "8", "12"];

// عروض التربونات المميزة
const turbonOffers = [
  {
    name: "عرض 3 تربونات",
    nameEn: "3 Turbans Offer",
    price: "210",
    originalPrice: "270",
    savings: "60",
    pieces: "3",
    image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784141/WhatsApp_Image_2026-02-21_at_10.28.04_AM_1_jgzfpu.jpg"
  },
  {
    name: "عرض 5 تربونات",
    nameEn: "5 Turbans Offer",
    price: "310",
    originalPrice: "450",
    savings: "140",
    pieces: "5",
    image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784141/WhatsApp_Image_2026-02-21_at_10.28.04_AM_2_gw3for.jpg"
  },
  {
    name: "عرض 6 تربونات",
    nameEn: "6 Turbans Offer",
    price: "360",
    originalPrice: "540",
    savings: "180",
    pieces: "6",
    image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771844899/WhatsApp_Image_2026-02-23_at_3.06.01_AM_xvgu2h.jpg"
  }
];

export default function PurchaseNotifications() {
  const [notification, setNotification] = useState(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      
      // 40% فرصة لظهور عرض تربونات (لجعلها مميزة)
      const showTurbonOffer = Math.random() < 0.4;
      
      if (showTurbonOffer) {
        // عرض تربونات مميز
        const randomTurbonOffer = turbonOffers[Math.floor(Math.random() * turbonOffers.length)];
        setNotification({
          id: Date.now(),
          name: randomName,
          city: randomCity,
          type: 'turbon',
          offer: randomTurbonOffer,
        });
      } else {
        // منتج عادي
        const randomOffer = offers[Math.floor(Math.random() * offers.length)];
        const randomProduct = Data[Math.floor(Math.random() * Data.length)];
        setNotification({
          id: Date.now(),
          name: randomName,
          city: randomCity,
          type: 'regular',
          offer: randomOffer,
          product: randomProduct,
        });
      }

      setTimeout(() => setNotification(null), 5000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  // تحديد إذا كان الإشعار الحالي لعرض تربونات
  const isTurbonOffer = notification?.type === 'turbon';

  return (
    <div className="fixed bottom-20 left-0 right-0 sm:left-auto sm:right-8 sm:bottom-24 z-[80] flex justify-center sm:block px-3 sm:px-0">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
            className="relative group w-full max-w-[320px] sm:max-w-sm mx-auto"
          >
            {/* Glow Effect - مختلف للتربونات */}
            <div className={`absolute -inset-1 bg-gradient-to-r rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300 ${
              isTurbonOffer ? 'from-purple-500 to-pink-600' : 'from-pink-500 to-pink-600'
            }`}></div>

            {/* Main Notification Card - تصميم مميز للتربونات */}
            <div className={`relative flex items-start gap-2.5 bg-gradient-to-br px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl shadow-2xl border overflow-hidden ${
              isTurbonOffer 
                ? 'from-purple-900 to-gray-950 border-purple-500/30' 
                : 'from-gray-900 to-gray-950 border-pink-500/30'
            }`}>
              
              {/* شعار خاص للتربونات - مع z-index عالي */}
              {isTurbonOffer && (
                <div className="absolute top-0 right-0 bg-gradient-to-l from-purple-500 to-pink-500 px-2.5 py-0.5 rounded-bl-lg rounded-tr-lg z-30">
                  <span className="text-white text-[10px] sm:text-xs font-bold flex items-center gap-1">
                    <Crown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                    <span className="hidden xs:inline">عرض تربونات</span>
                    <span className="xs:hidden">تربونات</span>
                  </span>
                </div>
              )}

              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className={`absolute -top-10 -right-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full filter blur-2xl ${
                  isTurbonOffer ? 'bg-purple-500' : 'bg-pink-500'
                }`}></div>
                <div className="absolute -bottom-10 -left-10 w-16 h-16 sm:w-20 sm:h-20 bg-gray-500 rounded-full filter blur-2xl"></div>
              </div>

              {/* Product Image Container - مع margin-top للتربونات */}
              <div className={`relative flex-shrink-0 ${isTurbonOffer ? 'mt-5 sm:mt-6' : ''}`}>
                <div className={`absolute inset-0 bg-gradient-to-r rounded-lg blur-md opacity-50 animate-pulse ${
                  isTurbonOffer ? 'from-purple-500 to-pink-500' : 'from-pink-500 to-pink-600'
                }`}></div>
                <img
                  src={isTurbonOffer ? notification.offer.image : notification.product.image}
                  alt={isTurbonOffer ? notification.offer.name : notification.product.name}
                  className={`relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-lg border-2 shadow-lg object-cover transform transition-transform duration-300 group-hover:scale-110 ${
                    isTurbonOffer ? 'border-purple-400' : 'border-pink-400'
                  }`}
                />
                {/* Live Badge */}
                <div className="absolute -top-1 -right-1">
                  <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-pink-500"></span>
                  </span>
                </div>
              </div>

              {/* Content - مع margin-top للتربونات */}
              <div className={`relative flex-1 min-w-0 ${isTurbonOffer ? 'mt-5 sm:mt-6' : ''}`}>
                {/* Header with Icon */}
                <div className="flex items-center gap-1 mb-0.5">
                  <ShoppingBag className={`w-3 h-3 sm:w-3.5 sm:h-3.5 flex-shrink-0 ${
                    isTurbonOffer ? 'text-purple-400' : 'text-pink-400'
                  }`} />
                  <span className="text-[10px] sm:text-xs text-gray-400 truncate">
                    {isTurbonOffer 
                      ? "✨ عرض خاص" 
                      : t("purchaseNotifications.newPurchase")}
                  </span>
                </div>

                {/* Buyer Info */}
                <div className="flex flex-col gap-0.5">
                  <span className="text-gray-200 font-medium text-[11px] sm:text-sm truncate">
                    {t("purchaseNotifications.buyer", {
                      name: notification.name,
                      city: notification.city,
                    })}
                  </span>

                  {/* City with Icon */}
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-400">
                    <MapPin className={`w-2.5 h-2.5 sm:w-3 sm:h-3 flex-shrink-0 ${
                      isTurbonOffer ? 'text-purple-400' : 'text-pink-400'
                    }`} />
                    <span className="truncate">{notification.city}</span>
                  </div>

                  {/* Product/Offer Details */}
                  {isTurbonOffer ? (
                    // عرض تفاصيل التربونات بشكل مميز
                    <div className="mt-1 space-y-1">
                      <span className="text-[11px] sm:text-sm font-bold text-purple-300 block truncate">
                        {lang === "ar" ? notification.offer.name : notification.offer.nameEn}
                      </span>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                        <span className="text-[9px] sm:text-xs line-through text-gray-500">
                          {notification.offer.originalPrice} ج.م
                        </span>
                        <span className="text-xs sm:text-sm font-bold text-purple-400">
                          {notification.offer.price} ج.م
                        </span>
                        <span className="text-[8px] sm:text-xs bg-purple-500/30 text-purple-300 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
                          وفر {notification.offer.savings} ج.م
                        </span>
                      </div>
                      <span className="text-[8px] sm:text-xs text-gray-400 block truncate">
                        {notification.offer.pieces} تربونات • {Math.round(notification.offer.price / notification.offer.pieces)} ج.م / قطعة
                      </span>
                    </div>
                  ) : (
                    // منتج عادي
                    <>
                      <span className="text-[10px] sm:text-xs text-gray-300 line-clamp-1">
                        {lang === "ar"
                          ? notification.product.name
                          : notification.product.nameEn}
                      </span>
                      {/* Offer and Order Time */}
                      <div className="flex items-center justify-between mt-0.5">
                        <div className={`flex items-center gap-1 px-1.5 sm:px-2 py-0.5 rounded-full ${
                          isTurbonOffer ? 'bg-purple-500/20' : 'bg-pink-500/20'
                        }`}>
                          <span className={`text-[9px] sm:text-xs font-bold whitespace-nowrap ${
                            isTurbonOffer ? 'text-purple-300' : 'text-pink-300'
                          }`}>
                            {t("purchaseNotifications.offer", {
                              offer: notification.offer,
                            })}
                          </span>
                          <span className="text-gray-400 text-[8px] sm:text-xs">•</span>
                          <span className="text-gray-400 text-[8px] sm:text-xs flex items-center gap-0.5 whitespace-nowrap">
                            <Clock className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                            الآن
                          </span>
                        </div>
                      </div>
                    </>
                  )}

                  {/* WhatsApp Icon - موجود في الحالتين */}
                  <div className="absolute bottom-0 right-0">
                    <FaWhatsapp className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                      isTurbonOffer ? 'text-purple-400/60' : 'text-pink-400/60'
                    }`} />
                  </div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r rounded-full ${
                    isTurbonOffer 
                      ? 'from-purple-500 to-pink-500' 
                      : 'from-pink-500 to-pink-600'
                  }`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 4.5, ease: "linear" }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}