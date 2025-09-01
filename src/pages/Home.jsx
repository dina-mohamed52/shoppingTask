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
function Home() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [order, setOrder] = useState(null);
  const formRef = useRef(null);

  return (
    <>
      <div className="container mx-auto px-4 mt-4 ">
        <CustomCarousel />
        <div className=" text-yellow-400  p-4 mt-16 ">
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
        <ProductList />
        <OfferCountdown/>
        <PurchaseNotifications/>
        <div className="p-6">
          <ProductBenefits />
        </div>
      </div>
      <div className="bg-gray-900 py-8">
        <OrderForm order={order} selectedOffer={selectedOffer}   formRef={formRef}  />
      </div>
    </>
  );
}
export default Home;
