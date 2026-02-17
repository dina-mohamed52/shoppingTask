import { useRef, useState, useEffect } from "react";
import Offers from "../features/home/Offers";
import OrderCollection from "../features/products/OrderCollection";
import CustomCarousel from "../ui/CustomCarousel";
import ProductList from "../features/home/ProductList";
import Header1st from "../ui/Header1st";
import SizeTable from "./SizeTable";
import OfferButton from "../features/offer/OfferButton";
import OfferCountdown from "../ui/OfferCountDown";
import PurchaseNotifications from "../ui/PurchaseNotifications";
import ProductBenefits from "../features/products/ProductBenifits";
import OrderForm from "../ui/Orderform";
import { useTranslation } from "react-i18next";

function Home() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [order, setOrder] = useState(null);
  const formRef = useRef(null);
  const orderCollectionRef = useRef(null);
  const { t } = useTranslation();

  // useEffect لتفعيل scroll بعد ظهور OrderCollection
  useEffect(() => {
    if (selectedOffer && orderCollectionRef.current) {
     orderCollectionRef.current.scrollIntoView({
  behavior: "smooth", // الحركة السلسة
  block: "start",     // يوضع العنصر في بداية الشاشة
  inline: "nearest"   // في المحور الأفقي
});

    }
  }, [selectedOffer]);

  return (
    <>
      <div className="container mx-auto px-4 mt-4 ">
        <CustomCarousel />
        <div className="text-yellow-400 p-4">
          <div className="flex items-center gap-3">
            <span className="bg-yellow-400 text-gray-700 text-xs font-bold px-2 py-1 rounded-full">
              -42%
            </span>
            <span className="text-3xl font-extrabold text-gray-900">
              150 <span className="text-base">ج.م</span>
              <span className="text-xs text-gray-400 ml-1"> / {t("pricing.perPiece")}</span>
            </span>
            <span className="text-gray-400 line-through text-lg">250 ج.م</span>
          </div>

          <OfferButton />
          <ProductList />
          <SizeTable />
          <Header1st />

          <Offers setSelectedOffer={setSelectedOffer} />

          {selectedOffer && (
            <div ref={orderCollectionRef}>
              <OrderCollection
                selectedOffer={selectedOffer}
                setOrder={setOrder}
                formRef={formRef}
              />
            </div>
          )}
        </div>
      </div>

      <div>
        <OfferCountdown />
        <PurchaseNotifications />
        <div className="p-6">
          <ProductBenefits />
        </div>
      </div>

      <div className="bg-gray-900 py-8">
        <OrderForm order={order} selectedOffer={selectedOffer} formRef={formRef} />
      </div>
    </>
  );
}

export default Home;
