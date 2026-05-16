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

import { useTranslation } from "react-i18next";
import Reviews from "./Reviews";
import { Data } from "../data/Data";
import WHeader from "../features/home/WHeader";

function Home() {
  const [selectedOffer, setSelectedOffer] = useState(null);

  const formRef = useRef(null);
  const orderCollectionRef = useRef(null);
  const { t } = useTranslation();

  // useEffect لتفعيل scroll بعد ظهور OrderCollection
  useEffect(() => {
    if (selectedOffer && orderCollectionRef.current) {
      orderCollectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "nearest",
      });
    }
  }, [selectedOffer]);

  return (
    <>
      {/* Offer Button - خارج الـ container عشان يثبت في الشاشة كلها */}
      <OfferButton />

      <div className="container mx-auto px-4 mt-4">
        <CustomCarousel />

        {/* Price Tag Section - Updated with Pink & Gray Theme */}
        <div className="relative mt-6 mb-4 p-5  overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-pink-200 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-300 rounded-full filter blur-3xl opacity-20"></div>

          {/* Discount Badge */}
          <div className="relative flex items-center gap-4 flex-wrap">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-md opacity-50 animate-pulse"></div>
              <span className="relative bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm font-bold px-4 py-2 rounded-full shadow-lg shadow-pink-500/30 flex items-center gap-1">
                -56%
              </span>
            </div>

            {/* Price Container */}
            <div className="flex items-center gap-3 flex-wrap">
              {/* Current Price */}
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-700 to-pink-600">
                  110
                </span>
                <span className="text-lg font-semibold text-gray-700">ج.م</span>
                <span className="text-sm text-gray-500 mr-1">
                  {" "}
                  / {t("pricing.perPiece")}
                </span>
              </div>

              {/* Old Price */}
              <div className="flex items-center gap-2">
                <span className="text-gray-400 line-through text-xl">
                  250 ج.م
                </span>
                <span className="bg-pink-100 text-pink-600 text-xs font-semibold px-2 py-1 rounded-full">
                  وفر 140 ج.م
                </span>
              </div>
            </div>
          </div>

          {/* Limited Offer Strip */}
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 text-pink-500">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
              </span>
              <span className="font-semibold">عرض محدود</span>
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="text-gray-600">
              <span className="font-bold text-pink-500">4</span> ساعات متبقية
            </div>
            <div className="h-4 w-px bg-gray-300"></div>
            <div className="text-gray-600">
              <span className="font-bold text-pink-500">12</span> قطعة متبقية
            </div>
          </div>
        </div>
        <WHeader />
        <ProductList products={Data} />
        <SizeTable />
        <Header1st />

        <Offers setSelectedOffer={setSelectedOffer} />

        {selectedOffer && (
          <div ref={orderCollectionRef}>
            <OrderCollection selectedOffer={selectedOffer} formRef={formRef} />
          </div>
        )}
      </div>

      <div>
        <OfferCountdown />
        <PurchaseNotifications />
        <div className="p-6">
          <ProductBenefits />
        </div>
        <Reviews />
      </div>

     
    </>
  );
}

export default Home;
