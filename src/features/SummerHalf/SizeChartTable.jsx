import { useTranslation } from "react-i18next";
import { Ruler, Sparkles, HelpCircle, ArrowRightCircle } from "lucide-react";
import { useState } from "react";

function SizeChartTable({ alt = "جدول المقاسات", className = "w-full max-w-md mx-auto" }) {
  const { t } = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  const [showTip, setShowTip] = useState(true);

  // دليل المقاسات المعدل حسب طلبك
  const sizeData = [
    { size: "0-1", age: "من 0 إلى 9 شهور" },
    { size: "1-2", age: "من 9 شهور إلى سنة ونص" },
    { size: "2-4", age: "من سنة ونص إلى 3 سنين" },
    { size: "4-6", age: "من 3 إلى 5 سنين" },
    { size: "6-8", age: "من 5 إلى 7 سنين" },
    { size: "8-10", age: "من 8 إلى 10 سنين" },
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
                  {t("sizeTable.header") || "دليل المقاسات"}
                </h2>
                <Sparkles className="w-5 h-5 text-pink-400 animate-spin-slow" />
              </div>
            </div>
          </div>

          {/* Size Chart - Modified with your exact sizes */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {sizeData.map((item, index) => (
              <div 
                key={index}
                className="relative group/item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl blur-md opacity-0 group-hover/item:opacity-30 transition-opacity duration-300"></div>
                <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-xl p-3 border border-gray-700 hover:border-pink-400 transition-all duration-300 text-center">
                  <div className="text-pink-400 font-bold text-lg">{item.size}</div>
                  <div className="text-gray-300 text-[10px] sm:text-xs mt-2 line-clamp-2">{item.age}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
              {t("sizeTable.note", "اختاري المقاس المناسب لطفلك")}
              <span className="w-1 h-1 bg-pink-400 rounded-full"></span>
            </p>
          </div>

          {/* Stylish Tip Tab */}
          <div className="mt-8 relative">
            {/* Toggle Button */}
            {/* <button
              onClick={() => setShowTip(!showTip)}
              className="w-full group/tip relative overflow-hidden rounded-2xl bg-gradient-to-r from-pink-600/20 to-pink-500/10 p-4 border border-pink-500/30 hover:border-pink-400 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 opacity-0 group-hover/tip:opacity-10 transition-opacity duration-300"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <HelpCircle className="w-6 h-6 text-pink-400" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-ping"></span>
                  </div>
                  <span className="text-gray-300 font-medium">
                    {showTip ? "اخفاء النصيحة" : "محتارة بين مقاسين؟"}
                  </span>
                </div>
                <div className={`transform transition-transform duration-300 ${showTip ? 'rotate-180' : ''}`}>
                  <ArrowRightCircle className="w-5 h-5 text-pink-400" />
                </div>
              </div>
            </button> */}

            {/* Tip Content with Animation */}
            <div 
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                showTip ? 'max-h-96 opacity-100 mt-4' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="relative p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-pink-500/20">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-pink-500/10 rounded-full blur-2xl"></div>
                
                {/* Tip Content */}
                <div className="relative text-right">
                  <h3 className="text-lg font-bold text-pink-400 mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5" />
                    نصيحة مهمة
                    <Sparkles className="w-5 h-5" />
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed">
                    إذا كان طفلك بين مقاسين، ننصحك باختيار المقاس الأكبر. 
                    هذا يضمن راحة طفلك ويتيح له مساحة للنمو.
                  </p>
                  
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-gray-400">مقاس أصغر</span>
                      <span className="text-red-400">✕</span>
                    </div>
                    <div className="w-12 h-px bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-green-400">✓</span>
                      <span className="text-gray-200 font-medium">المقاس الأكبر</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 p-3 bg-pink-500/10 rounded-xl border border-pink-500/20">
                    <p className="text-pink-300 text-sm flex items-start gap-2">
                      <span className="text-pink-400 text-lg">💡</span>
                      <span>المقاس الأكبر يوفر راحة أكثر ومدة استخدام أطول لطفلك</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
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

export default SizeChartTable;