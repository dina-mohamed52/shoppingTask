import { useRef, useState } from "react";
import TurbonCarousal from "../features/TurbonParts/TurbonCarousal";
import TurbonOffers from "../features/TurbonParts/TurbonOffers";
import TurbonProductList from "../features/TurbonParts/TurbonProductList";
import TurbonOrderCollection from "../features/TurbonParts/TurbonOrderCollection";
import OrderForm from "../ui/Orderform";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles, Ribbon, Flower2, ArrowDown } from "lucide-react";
import OfferCountDown from "../ui/OfferCountDown";
import ProductBenifits from "../features/products/ProductBenifits";
import TurbonOfferBtn from "../features/TurbonParts/TurbonOfferBtn";

function Turbon() {
  const { t } = useTranslation();
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [order, setOrder] = useState(null);
  const formRef = useRef(null);
  const orderCollectionRef = useRef(null);

  // دالة التمرير إلى OrderCollection
  const scrollToOrderCollection = () => {
    if (orderCollectionRef.current) {
      orderCollectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // دالة التمرير إلى الفورم بعد تأكيد الطلب
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-pink-50/30 to-white">
      
      {/* Carousel Section - First Thing */}
     {/* Carousel Section - First Thing */}
<section className="relative w-full">
  {/* Carousel Container بدون أي حدود أو خلفيات */}
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
    className="relative w-full"
  >
    {/* Brand Badge فوق الكاروسيل - يمكنك إبقاؤه أو إزالته حسب رغبتك */}
    <div className="flex justify-center mb-4 px-4">
      <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm px-6 py-2 rounded-full shadow-lg border border-pink-200">
        <Sparkles className="w-4 h-4 text-pink-500" />
        <span className="text-sm font-semibold text-gray-700">
          {t("turbonPage.brand", "BabyStyle Turbans")}
        </span>
        <Sparkles className="w-4 h-4 text-pink-500" />
      </div>
    </div>
    
    {/* Carousel - بدون حدود أو ظلال */}
    <div className="relative w-full">
      <TurbonCarousal />
    </div>

    {/* Scroll Indicator */}
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="flex justify-center mt-8"
    >
      <ArrowDown className="w-6 h-6 text-pink-400" />
    </motion.div>
  </motion.div>
</section>
      {/* Header Section بعد الكاروسيل */}
      <section className="relative py-12 text-center overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        </div>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600">
              {t("turbonPage.title", "تربونات بيبي ستايل")}
            </span>
          </h1>
          <div className="flex items-center justify-center gap-3">
            <Ribbon className="w-6 h-6 text-pink-400" />
            <p className="text-xl text-gray-600 max-w-2xl mx-auto px-4">
              {t("turbonPage.subtitle", "أجمل التربونات بألوان عصرية وتصاميم حصرية")}
            </p>
            <Flower2 className="w-6 h-6 text-pink-400" />
          </div>
        </motion.div>
      </section>
<TurbonOfferBtn/>
      {/* Offers Section with Glass Effect */}
      <section className="relative mt-8">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink-50/50 to-transparent"></div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <TurbonOffers 
            setSelectedOffer={setSelectedOffer}
            scrollToOrderCollection={scrollToOrderCollection}
          />
        </motion.div>
      </section>

      {/* Order Collection Section with Entrance Animation */}
      {selectedOffer && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative mt-16"
        >
          <div ref={orderCollectionRef} className="scroll-mt-24">
            {/* Section Header */}
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-pink-500">
                {t("turbonPage.customize", "خصص تربوناتك")}
              </h2>
              <p className="text-gray-500 mt-2">اختر الموديل واللون لكل قطعة</p>
            </div>
            
            <TurbonOrderCollection
              selectedOffer={selectedOffer}
              setOrder={setOrder}
              formRef={formRef}
            />
          </div>
        </motion.section>
      )}

      {/* Product List Section - Hidden when offer selected */}
      {!selectedOffer && (
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mt-16"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-700">
              {t("turbonPage.products", "تشكيلتنا")}
            </h2>
          </div>
          <TurbonProductList />
        </motion.section>
      )}

      <OfferCountDown />
<ProductBenifits />
      {/* Order Form Section - Shows when order is complete */}
      {order && order.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-b from-gray-50 to-pink-50/30 py-16 mt-8"
        >
          <OrderForm 
            order={order} 
            selectedOffer={selectedOffer} 
            formRef={formRef} 
          />
        </motion.section>
      )}

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