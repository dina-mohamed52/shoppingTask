import { useTranslation } from "react-i18next";
import { Sparkles, Gift } from "lucide-react";

function OfferButton() {
  const { t } = useTranslation();

  const handleClick = () => {
    const offersSection = document.getElementById("offersSection");
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed sm:absolute sm:bottom-[-10%] bottom-4 sm:right-[30%] right-[25%] z-[100]">
      {/* Button Container with Gradient Border */}
      <div className="relative group">
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
        
        {/* Main Button */}
        <button
          onClick={handleClick}
          className="
            relative bg-gradient-to-r from-gray-900 to-gray-800 
            text-white rounded-full shadow-xl
            flex items-center justify-center gap-2
            transition-all duration-500
            hover:scale-110 hover:shadow-pink-500/40
            font-semibold overflow-hidden
            w-auto h-auto px-5 py-3.5 sm:px-6 sm:py-4 text-sm sm:text-base
            border border-pink-500/40
            animate-float
          "
        >
          {/* Shine Effect */}
          <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
          
          {/* Icons */}
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400 animate-spin-slow" />
          <Gift className="w-4 h-4 sm:w-5 sm:h-5 text-pink-300 animate-bounce" style={{ animationDelay: "0.2s" }} />
          
          {/* نفس النص للموبيل والديسكتوب */}
          <span className="inline bg-clip-text text-transparent bg-gradient-to-r from-pink-200 to-white font-bold text-xs sm:text-base">
            {t("offerButton.text", "🎀 اكتشف عروضنا المميزة! 🎀")}
          </span>

        
        </button>

        {/* Tooltip on Hover */}
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-pink-300 text-xs px-3 py-1.5 rounded-full whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-pink-500/30 shadow-xl pointer-events-none">
          {t("offerButton.tooltip", "خصومات تصل إلى 50%!")}
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 border-r border-b border-pink-500/30 rotate-45"></div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) scale(1); 
          }
          25% { 
            transform: translateY(-5px) scale(1.02); 
          }
          50% { 
            transform: translateY(-8px) scale(1.05); 
          }
          75% { 
            transform: translateY(-3px) scale(1.02); 
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        .animate-ping {
          animation: ping 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes ping {
          75%, 100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

export default OfferButton;