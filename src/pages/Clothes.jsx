import { useRef, useState } from "react";
import CHeadSection from "../features/clothes/CHeadSection";
import ClothesOffers from "../features/clothes/ClothesOffers";
import CProductList from "../features/clothes/CProductList";
import ClothesOrderCollection from "../features/clothes/ClothesOrderCollection";
import ClothesCountdownTimer from "../features/clothes/ClothesCountdownTimer";
import { useParams } from "react-router-dom";

function Clothes() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const orderCollectionRef = useRef(null);
  const offersRef = useRef(null);
  const productListRef = useRef(null); 

  const { category } = useParams();


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
      <CHeadSection scrollToProductList={scrollToProductList} category={category} />
      
      <ClothesCountdownTimer />
      
      {/* 👈 إضافة ref لقسم المنتجات */}
      <div ref={productListRef}>
        <CProductList category={category} />
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