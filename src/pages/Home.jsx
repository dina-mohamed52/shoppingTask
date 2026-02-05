import { useRef, useState } from "react";
import Offers from "../features/home/Offers";
import ProductList from "../features/home/ProductList";
import CustomCarousel from "../ui/CustomCarousel";
import Header1st from "../ui/Header1st";
import OrderForm from "../ui/Orderform";
import OrderCollection from "../features/products/OrderCollection";
import ProductBenefits from "../features/products/ProductBenifits";
import OfferCountdown from "../ui/OfferCountDown";
import PurchaseNotifications from "../ui/PurchaseNotifications";
import { t } from "i18next";import { useTranslation } from "react-i18next";
import SizeTable from "./SizeTable";
import OfferButton from "../features/offer/OfferButton";
function Home() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [order, setOrder] = useState(null);
  const formRef = useRef(null);
 const { t } = useTranslation();
  return (
    <>
      <div className="container mx-auto px-4 mt-4 ">
        <CustomCarousel />
        <div className=" text-yellow-400  p-4   ">
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
          <OfferButton/>

          <ProductList />
          <SizeTable/>
          <Header1st />
          <Offers setSelectedOffer={setSelectedOffer} />
          {selectedOffer && (
            <OrderCollection
              selectedOffer={selectedOffer}
              setOrder={setOrder}
              formRef={formRef}
            />
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
        <OrderForm
          order={order}
          selectedOffer={selectedOffer}
          formRef={formRef}
        />
      </div>
    </>
  );
}
export default Home;
