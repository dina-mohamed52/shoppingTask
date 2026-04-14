import { Sparkles, Gift, Baby, Heart } from "lucide-react";
import { useTranslation } from "react-i18next";
function WHeader() {
     const { t } = useTranslation();
    return (
        <div>
           
                    <div className="relative text-center">
                      <div className="inline-block">
                        <h1 className="text-2xl sm:text-5xl font-bold mb-2 sm:mb-4">
                          <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-pink-400 to-gray-600">
                            {t("productList.title")}
                          </span>
                        </h1>
                        <div className="h-0.5 w-16 sm:w-24 mx-auto bg-gradient-to-r from-pink-500 to-gray-400 rounded-full"></div>
                      </div>
            
                      {/* Subtitle with Icons - مبسط للموبيل */}
                      <div className="flex items-center justify-center gap-2 sm:gap-4 mt-3 sm:mt-6">
                        <Baby className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5" />
                        <p className="text-sm sm:text-xl text-gray-600 font-light">
                          {t("productList.subtitle")}
                        </p>
                        <Heart className="text-pink-400 w-4 h-4 sm:w-5 sm:h-5" />
                      </div>
            
                      {/* Description - مخفي على الموبيل الصغير */}
                      <div className="hidden sm:inline-block mt-4 px-8 py-3 rounded-full border border-pink-200 bg-white/50 backdrop-blur-sm shadow-sm">
                        <p className="text-gray-700">
                          {t("productList.description")}
                        </p>
                      </div>
                    </div>
            
                    {/* Special Badge for Colons - أصغر للموبيل */}
                    <div className="absolute -top-2 sm:-top-4 right-2 sm:right-10 animate-bounce">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-md opacity-50"></div>
                        <div className="relative bg-white rounded-full px-2 sm:px-4 py-1 sm:py-2 shadow-lg border border-pink-200">
                          <div className="flex items-center gap-1 sm:gap-2">
                            <Gift className="text-pink-500 w-3 h-3 sm:w-4 sm:h-4" />
                            <span className="text-[10px] sm:text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-pink-500">
                              {t("productList.kids", "كولونات أطفال")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
        // </div>
    )
}

export default WHeader