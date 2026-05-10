import { useRef, useState } from "react";
import ProductBenefits from "../features/products/ProductBenifits";
import HeroBanner1 from "../features/SummerColon/HeroBanner1";
import SCHeroSec from "../features/SummerColon/SCHeroSec";
import SCOffers from "../features/SummerColon/SCOffers";
import SCOrderCollection from "../features/SummerColon/SCOrrderCollection";
import SCProductList from "../features/SummerColon/SCProductList";
import Reviews from "../pages/Reviews";
import SizeTable from "../pages/SizeTable";
import OrderForm from "../ui/Orderform";

function SummerColon() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  
  const orderCollectionRef = useRef(null)
    const formRef = useRef(null);;

  const scrollToOrderCollection = () => {
    orderCollectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
   const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToOffers = () => {
    const offersSection = document.getElementById("offersSection");
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const scrollToProducts = () => {
    const productsSection = document.getElementById("productList");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div>
       
      <SCHeroSec
        scrollToOffers={scrollToOffers}
        scrollToProducts={scrollToProducts}
      />
      <HeroBanner1 />
      <SCOffers
        setSelectedOffer={setSelectedOffer}
        scrollToOrderCollection={scrollToOrderCollection}
      />
      <SCProductList />
      <SizeTable/>
      <div ref={orderCollectionRef}>
        <SCOrderCollection
          selectedOffer={selectedOffer}
       
           formRef={formRef}
          scrollToOffers={scrollToOffers}
        />
      </div>
      <Reviews/>

      <ProductBenefits />
       {/* فورم الطلب */}
            {/* {order && order.length > 0 && (
              <div ref={formRef} className="mt-10">
                <OrderForm
                  order={order}
                  selectedOffer={selectedOffer}
                  formRef={formRef}
                />
              </div>
            )} */}
    </div>
  );
}

export default SummerColon;
