import { useRef, useState } from "react";
import Part1 from "../features/SummerHalf/Part1";
import { HalfColoneData } from "../data/HalfColon";
import SproductList from "../features/SummerHalf/SproductList";
import SizeChartTable from "../features/SummerHalf/SizeChartTable";
import HalfOffers from "../features/SummerHalf/HalfOffers";
import OfferCountdown from "../ui/OfferCountDown";
import ProductBenefits from "../features/products/ProductBenifits";
import HalfOrderCollection from "../features/SummerHalf/HalfOrderCollection";
import OrderForm from "../ui/Orderform";

function SummerColon() {
  const product = HalfColoneData[0];

  // ✅ state للـ order و العرض المختار
  const [order, setOrder] = useState(null);
  const [selectedOffer, setSelectedOffer] = useState(null);

  // ✅ refs ثابتة
  const orderCollectionRef = useRef(null);
  const formRef = useRef(null);

  // ✅ دالة التمرير للـ HalfOrderCollection
  const scrollToOrderCollection = () => {
    if (orderCollectionRef.current) {
      orderCollectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // ✅ دالة التمرير تلقائي للفورم بعد اختيار القطع
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
      <HalfOffers
        setSelectedOffer={setSelectedOffer}
        scrollToOrderCollection={scrollToOrderCollection}
      />

      {/* قائمة المنتجات */}
      <SproductList />

      {/* جدول المقاسات */}
      <SizeChartTable
        sizes={product.sizes}
        productName={product.name}
        className="mb-4"
      />

      {/* اختيار القطع - Order Collection */}
      <div ref={orderCollectionRef}>
        <HalfOrderCollection
          selectedOffer={selectedOffer}
          setOrder={(order) => {
            setOrder(order);
            // تمرير للـ OrderForm تلقائيًا
            setTimeout(scrollToForm, 200); // تأخير بسيط عشان DOM يحدث
          }}
          formRef={formRef}
        />
      </div>


      {/* فوائد المنتجات */}
      <ProductBenefits />
      {/* العد التنازلي */}
      <OfferCountdown />

      {/* فورم الطلب */}
      {order && order.length > 0 && (
        <div ref={formRef} className="mt-10">
          <OrderForm
            order={order}
            selectedOffer={selectedOffer}
            formRef={formRef}
          />
        </div>
      )}
    </div>
  );
}

export default SummerColon;