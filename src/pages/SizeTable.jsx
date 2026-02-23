import T from "../assets/7.png";
import { useTranslation } from "react-i18next";
import { Ruler, Sparkles } from "lucide-react";
import { useState } from "react";

function SizeTable({ alt = "جدول المقاسات", className = "w-full max-w-md mx-auto" }) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);

  // بيانات جدول المقاسات للعرض بشكل نصي (اختياري)
  const sizeData = [
    { size: "1-0", age: "من حديث الولاده لحد 8 شهور" },
    { size: "2-1", age: "من 9 شهور لحد سنتين " },
    { size: "4-2", age: "من سنتين ل4 سنين" },
    { size: "6-4", age: "من 4 ل6 سنين" },
    { size: "8-6", age: "من 6 ل8 سنين" },
    { size: "10-8", age: "من 8 ل10 سنين" },
    { size: "12-10", age: "من 10 ل12 سنه" },
    { size: "14-12", age: "من 12 ل14 سنه" },
  ];

  return (
    <div className="my-8 px-4 sm:px-0">
      {/* Main Container with Pink & Gray Theme */}
      <div 
        className="relative group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Decorative Background Elements */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-300 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-400 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        {/* Main Card */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 p-8 mb-8 rounded-3xl shadow-2xl border border-pink-500/30 overflow-hidden">
          
          {/* Glow Effect on Hover */}
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
          
          {/* Header with Icon */}
          <div className="relative mb-8 text-center">
            {/* Decorative Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
            
            {/* Title Container */}
            <div className="relative inline-block bg-gray-900 px-6 py-3 rounded-full border border-pink-500/30 shadow-xl">
              <div className="flex items-center justify-center gap-3">
                <Ruler className="w-6 h-6 text-pink-400 animate-pulse" />
                <h2 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-300 to-white">
                  {t("sizeTable.header") || "جدول المقاسات"}
                </h2>
                <Sparkles className="w-5 h-5 text-pink-400 animate-spin-slow" />
              </div>
            </div>
          </div>

          {/* Image Container */}
          <div className="relative max-w-2xl mx-auto">
            {/* Pink Glow Behind Image */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            {/* Image Frame */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 p-2 rounded-2xl shadow-2xl border border-pink-500/20">
              {/* Image with Zoom Effect */}
              <img
                src={T}
                alt={alt}
                className={`${className} rounded-xl shadow-lg object-contain transform transition-all duration-700 ${
                  isHovered ? "scale-105" : "scale-100"
                }`}
              />
              
              {/* Corner Decorations */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-pink-400 rounded-tl-xl"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-pink-400 rounded-tr-xl"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-pink-400 rounded-bl-xl"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-pink-400 rounded-br-xl"></div>
            </div>
          </div>

          {/* Size Chart Text Version (Optional - Can be hidden on mobile) */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sizeData.map((item, index) => (
              <div 
                key={index}
                className="relative group/item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl blur-md opacity-0 group-hover/item:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 border border-gray-700 hover:border-pink-400 transition-all duration-300 text-center">
                  <div className="text-pink-400 font-bold text-sm">{item.size}</div>
                  <div className="text-gray-300 text-[10px] sm:text-xs mt-1 line-clamp-2">{item.age}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
              {t("sizeTable.note", "اختر المقاس المناسب لطفلك")}
              <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
            </p>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }

        .group:hover .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

export default SizeTable;