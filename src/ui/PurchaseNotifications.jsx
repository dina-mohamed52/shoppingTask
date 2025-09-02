import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Data } from "../data/Data";
import { AlertCircle } from "lucide-react";


const names = ["تقي", "سارة", "محمود", "ليلى", "يوسف", "مريم", "علي"];
const cities = ["قنا", "القاهرة", "الجيزة", "الإسكندرية", "المنصورة", "سوهاج"];
const offers = ["4 قطع", "6 قطع", "8 قطع", "12 قطعة"];

export default function PurchaseNotifications() {
  const [notification, setNotification] = useState(null);

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

      // يخفي بعد 4 ثواني
      setTimeout(() => setNotification(null), 4000);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-6 sm:ml-8 ml-16 z-50">
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6 }}
            className="flex items-start gap-4 bg-gray-900 text-yellow-400 px-8 py-3 rounded-2xl shadow-xl border border-yellow-400 w-80 sm:w-80"
          >
            {/* صورة المنتج */}
            <img
              src={notification.product.image}
              alt={notification.product.name}
              className="w-12 h-12 rounded-lg border-2 border-yellow-400 shadow-md object-cover"
            />

            {/* النصوص */}
            <div className="flex flex-col text-center">
              <span className="text-sm text-gray-200 font-medium">
                {notification.name} من {notification.city}
              </span>
                
              <span className="text-base text-gray-200 font-bold flex items-center gap-1">
  <AlertCircle className="w-5 h-5 text-yellow-400" />
  طلب الان <span className="text-yellow-400"> باقه {notification.offer} </span>
</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
