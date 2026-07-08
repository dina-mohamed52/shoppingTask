import { useRef, useState } from "react";
import CHeadSection from "../features/clothes/CHeadSection";
import ClothesOffers from "../features/clothes/ClothesOffers";
import CProductList from "../features/clothes/CProductList";
import ClothesOrderCollection from "../features/clothes/ClothesOrderCollection";
import ClothesCountdownTimer from "../features/clothes/ClothesCountdownTimer";

function Clothes() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const orderCollectionRef = useRef(null);
  const offersRef = useRef(null);
  const productListRef = useRef(null); // 👈 إضافة ref لقسم المنتجات

  // دالة للتمرير إلى Order Collection
  const scrollToOrderCollection = () => {
    if (orderCollectionRef.current) {
      orderCollectionRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // دالة للتمرير إلى قسم العروض
  const scrollToOffers = () => {
    if (offersRef.current) {
      offersRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  // 👈 دالة جديدة للتمرير إلى Product List
  const scrollToProductList = () => {
    if (productListRef.current) {
      productListRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  return (
    <div> 
      {/* 👈 تمرير دالة التمرير إلى CHeadSection */}
      <CHeadSection scrollToProductList={scrollToProductList} />
      
      <ClothesCountdownTimer />
      
      {/* 👈 إضافة ref لقسم المنتجات */}
      <div ref={productListRef}>
        <CProductList />
      </div>
      
      {/* قسم العروض */}
      <div ref={offersRef}>
        <ClothesOffers
          setSelectedOffer={setSelectedOffer}
          scrollToOrderCollection={scrollToOrderCollection}
        />
      </div>

      {/* Order Collection Section */}
      <div ref={orderCollectionRef}>
        <ClothesOrderCollection 
          selectedOffer={selectedOffer}
          scrollToOffers={scrollToOffers}
        />
      </div>
    </div>
  );
}

export default Clothes;