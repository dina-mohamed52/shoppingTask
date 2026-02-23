import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Data } from "../data/Data";
import { ShoppingBag, MapPin, Clock } from "lucide-react";
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

export default function PurchaseNotifications() {
  const [notification, setNotification] = useState(null);
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const randomOffer = offers[Math.floor(Math.random() * offers.length)];
      const randomProduct = Data[Math.floor(Math.random() * Data.length)];

      setNotification({
        id: Date.now(),
        name: randomName,
        city: randomCity,
        offer: randomOffer,
        product: randomProduct,
      });

      setTimeout(() => setNotification(null), 5000);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-24 left-[50%] transform -translate-x-1/2 sm:left-auto sm:right-8 sm:translate-x-0 z-[80]">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: lang === "ar" ? 50 : -50, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: lang === "ar" ? 50 : -50, y: 20 }}
            transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

            {/* Main Notification Card */}
            <div className="relative flex items-start gap-2 bg-gradient-to-br from-gray-900 to-gray-950 text-pink-400 px-4 py-3 rounded-2xl shadow-2xl border border-pink-500/30 w-80 sm:w-96 overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-pink-500 rounded-full filter blur-2xl"></div>
                <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-gray-500 rounded-full filter blur-2xl"></div>
              </div>

              {/* Product Image Container */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg blur-md opacity-50 animate-pulse"></div>
                <img
                  src={notification.product.image}
                  alt={notification.product.name}
                  className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg border-2 border-pink-400 shadow-lg object-cover transform transition-transform duration-300 group-hover:scale-110"
                />
                {/* Live Badge */}
                <div className="absolute -top-1 -right-1">
                  <span className="relative flex h-2.5 w-2.5">
                    <span
                      className="animate-ping absolute inline-flex h-full w-full rounded-full
                     bg-pink-400 opacity-75"
                    ></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-pink-500"></span>
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="relative flex-1">
                {/* Header with Icon */}
                <div className="flex items-center gap-1 mb-1">
                  <ShoppingBag className="w-3.5 h-3.5 text-pink-400" />
                  <span className="text-xs text-gray-400">
                    {t("purchaseNotifications.newPurchase")}
                  </span>
                </div>

                {/* Buyer Info */}
                <div className="flex flex-col gap-1">
                  <span className="text-gray-200 font-medium text-sm">
                    {t("purchaseNotifications.buyer", {
                      name: notification.name,
                      city: notification.city,
                    })}
                  </span>

                  {/* City with Icon */}
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <MapPin className="w-3 h-3 text-pink-400" />
                    <span>{notification.city}</span>
                  </div>

                  {/* Product Name */}
                  <span className="text-xs text-gray-300 line-clamp-1">
                    {lang === "ar"
                      ? notification.product.name
                      : notification.product.nameEn}
                  </span>

                  {/* Offer and Order Time */}
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1 bg-pink-500/20 px-2 py-0.5 rounded-full">
                      <span className="text-pink-300 text-xs font-bold">
                        {t("purchaseNotifications.offer", {
                          offer: notification.offer,
                        })}
                      </span>
                      <span className="text-gray-400 text-xs">•</span>
                      <span className="text-gray-400 text-xs flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5" />
                        {t("purchaseNotifications.now", "الآن")}
                      </span>
                    </div>

                    {/* WhatsApp Icon */}
                    <FaWhatsapp className="w-3.5 h-3.5 text-pink-400/60" />
                  </div>
                </div>

                {/* Progress Bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
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
