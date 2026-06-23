import { useEffect, useRef, useState } from "react";
import TurbonCarousal from "../features/TurbonParts/TurbonCarousal";
import TurbonOffers from "../features/TurbonParts/TurbonOffers";
import TurbonProductList from "../features/TurbonParts/TurbonProductList";
import TurbonOrderCollection from "../features/TurbonParts/TurbonOrderCollection";
import OfferCountdown from "../ui/OfferCountDown";
import ProductBenefits from "../features/products/ProductBenifits";
import TurbonOfferBtn from "../features/TurbonParts/TurbonOfferBtn";
import PurchaseNotifications from "../ui/PurchaseNotifications";

import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Ribbon, Flower2, ArrowDown } from "lucide-react";

function Turbon() {
  const { t } = useTranslation();
  const location = useLocation();
  const [selectedOffer, setSelectedOffer] = useState(null);

  // Refs ثابتة
  const orderCollectionRef = useRef(null);
  const formRef = useRef(null);
  const offersRef = useRef(null);

  // دالة التمرير للـ TurbonOrderCollection
  const scrollToOrderCollection = () => {
    if (orderCollectionRef.current) {
      orderCollectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // دالة التمرير للعروض
  const scrollToOffers = () => {
    if (offersRef.current) {
      offersRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // دالة التمرير للفورم بعد تأكيد الطلب
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // التمرير للعروض إذا كانت في location state
  useEffect(() => {
    if (location.state?.scrollToOffers) {
      scrollToOffers();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // ✅ التمرير لـ OrderCollection عند اختيار عرض
  useEffect(() => {
    if (selectedOffer) {
      // ننتظر عشان الـ DOM يتحدث والـ TurbonOrderCollection يظهر
      const timer = setTimeout(() => {
        if (orderCollectionRef.current) {
          orderCollectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [selectedOffer]);

  return (
    <div dir="rtl" className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white">
      
      {/* Carousel Section */}
      <section className="relative w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full"
        >
          {/* Brand Badge */}
          <div className="flex justify-center mb-4 px-4">
            <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-pink-200">
              <Sparkles className="w-4 h-4 text-pink-500" />
              <span className="text-sm font-semibold text-gray-700">
                {t("turbonPage.brand", "BabyStyle Turbans")}
              </span>
              <Sparkles className="w-4 h-4 text-pink-500" />
            </div>
          </div>
          
          {/* Carousel */}
          <div className="relative w-full">
            <TurbonCarousal />
          </div>

          {/* Scroll Indicator */}
        
        </motion.div>
      </section>

      <PurchaseNotifications />

      

      <TurbonOfferBtn />

      {/* قائمة المنتجات */}
      <TurbonProductList />

      {/* العروض */}
      <div ref={offersRef} className="scroll-mt-20">
        <TurbonOffers
          setSelectedOffer={setSelectedOffer}
          scrollToOrderCollection={scrollToOrderCollection}
        />
      </div>

      {/* اختيار القطع - Order Collection */}
      <div ref={orderCollectionRef} className="scroll-mt-20">
        <TurbonOrderCollection
          selectedOffer={selectedOffer}
          formRef={formRef}
          scrollToOffers={scrollToOffers}
        />
      </div>

      {/* فوائد المنتجات */}
      <ProductBenefits />
      
      {/* العد التنازلي */}
      <OfferCountdown />

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

export default Turbon;