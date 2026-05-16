import { useEffect, useRef, useState } from "react";
import Part1 from "../features/SummerHalf/Part1";
import { HalfColoneData } from "../data/HalfColon";
import SproductList from "../features/SummerHalf/SproductList";
import SizeChartTable from "../features/SummerHalf/SizeChartTable";
import HalfOffers from "../features/SummerHalf/HalfOffers";
import OfferCountdown from "../ui/OfferCountDown";
import ProductBenefits from "../features/products/ProductBenifits";
import HalfOrderCollection from "../features/SummerHalf/HalfOrderCollection";

import { useLocation } from "react-router-dom";

function SummerHalfColon() {
  const product = HalfColoneData[0];
  const location = useLocation();
  

  const [selectedOffer, setSelectedOffer] = useState(null);

  // Refs ثابتة
  const orderCollectionRef = useRef(null);
  const formRef = useRef(null);
  const offersRef = useRef(null);

  // دالة التمرير للـ HalfOrderCollection
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

  useEffect(() => {
    if (location.state?.scrollToOffers) {
      scrollToOffers();
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // دالة التمرير تلقائي للفورم بعد اختيار القطع
  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div>
      {/* الجزء الأول */}
      <Part1 HalfColoneData={HalfColoneData} />

      {/* العروض */}
      <div ref={offersRef} className="scroll-mt-20">
        <HalfOffers
          setSelectedOffer={setSelectedOffer}
          scrollToOrderCollection={scrollToOrderCollection}
          
        />
      </div>
      
      {/* قائمة المنتجات */}
      <SproductList />

      {/* جدول المقاسات */}
      <SizeChartTable
        // sizes={product.sizes}
        productName={product.name}
        className="mb-4"
      />

      {/* اختيار القطع - Order Collection */}
      <div ref={orderCollectionRef} className="scroll-mt-20">
        <HalfOrderCollection
          selectedOffer={selectedOffer}
         
          formRef={formRef}
           scrollToOffers={scrollToOffers}
        />
      </div>

      {/* فوائد المنتجات */}
      <ProductBenefits />
      
      {/* العد التنازلي */}
      <OfferCountdown />

      {/* فورم الطلب - يظهر فقط بعد تأكيد الطلب */}
    
    </div>
  );
}

export default SummerHalfColon;