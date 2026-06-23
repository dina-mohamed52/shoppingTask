import { useTranslation } from "react-i18next";
import { Ribbon, Flower2, Gift } from "lucide-react";
import { useEffect, useState } from "react";

function TurbonOfferBtn() {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // التحقق من حجم الشاشة
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleClick = () => {
    const offersSection = document.getElementById("turbonOffersSection");
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed z-[100] 
      bottom-4 sm:bottom-6 
      left-1/2 transform -translate-x-1/2
      w-[90%] sm:w-auto
      max-w-[300px] sm:max-w-none
    ">
      {/* Button Container with Gradient Border */}
      <div className="relative group w-full">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-md sm:blur-lg opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        
        {/* Main Button */}
        <button
          onClick={handleClick}
          className="
            relative w-full
            bg-gradient-to-r from-gray-900 to-gray-800 
            text-white rounded-full shadow-xl
            flex items-center justify-center gap-1 sm:gap-2
            transition-all duration-500
            hover:scale-105 sm:hover:scale-110 hover:shadow-pink-500/40
            font-semibold overflow-hidden
            px-4 py-3 sm:px-8 sm:py-5
            text-xs sm:text-base
            border border-pink-400/40
            animate-float
          "
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
          
          {/* Icons */}
          <Ribbon className="w-4 h-4 sm:w-6 sm:h-6 text-pink-400 animate-spin-slow" />
          
          {/* Text -显示 دائمًا مع تغيير المحتوى حسب حجم الشاشة */}
          <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-white font-bold whitespace-nowrap">
            {isMobile 
              ? t("turbonOfferBtn.mobileText", "عروض التربونات") 
              : t("turbonOfferBtn.text", "🎀 عروض التربونات 🎀")}
          </span>
          
          <Flower2 className="w-4 h-4 sm:w-6 sm:h-6 text-pink-300 animate-bounce" style={{ animationDelay: "0.2s" }} />
          
          {/* Gift icon - يظهر على الديسكتوب بس */}
          {!isMobile && (
            <Gift className="w-5 h-5 sm:w-6 sm:h-6 text-pink-300 animate-pulse" style={{ animationDelay: "0.4s" }} />
          )}
        </button>

        {/* Tooltip on Hover - مخفي على الموبيل */}
        {!isMobile && (
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-pink-300 text-xs px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-pink-400/30 shadow-xl pointer-events-none">
            {t("turbonOfferBtn.tooltip", "خصومات خاصة على التربونات!")}
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-pink-400/30 rotate-45"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TurbonOfferBtn;