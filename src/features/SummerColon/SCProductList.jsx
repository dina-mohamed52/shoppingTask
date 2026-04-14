import { SummerColonData } from "../../data/SummerColon";
import ProductList from "../home/ProductList";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";

function SCProductList() {
  return (
    <div className="px-4 lg:px-8 py-6 ">
      {/* Header Section - جمل تفاعلية */}
      <div className="mb-8 text-center shadow-md shadow-rose-700/60 p-6 rounded-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* شارة علوية */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#864e63]/10 to-[#c6abff]/10 rounded-full px-4 py-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#864e63]" />
            <span className="text-xs font-medium text-[#864e63]">تشكيلة مميزة لأطفالك</span>
            <Heart className="w-3 h-3 text-[#c6abff]" />
          </div>

          {/* العنوان الرئيسي */}
          <h1 className="text-2xl md:text-3xl font-bold text-[#864e63] mb-2">
            كولونات صيفي 2026
          </h1>
          
          {/* جملة تفاعلية */}
          <motion.p 
            className="text-gray-500 text-sm max-w-md mx-auto"
            animate={{ 
              scale: [1, 1.02, 1],
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatDelay: 2
            }}
          >
            🌸 اختاري الأفضل لصغيركِ بأجود الخامات
          </motion.p>

          {/* عدد المنتجات */}
          <div className="mt-3">
            <span className="text-xs text-[#864e63] font-medium bg-[#864e63]/5 px-3 py-1 rounded-full">
              {SummerColonData.length} منتج مميز
            </span>
          </div>
        </motion.div>
      </div>

      {/* Product List */}
      <ProductList products={SummerColonData} />
    </div>
  );
}

export default SCProductList;