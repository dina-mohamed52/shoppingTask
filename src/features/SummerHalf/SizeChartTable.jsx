import { motion } from "framer-motion";
import { FiInfo, FiCalendar } from "react-icons/fi";
import { LuRuler } from "react-icons/lu";

const SizeChartTable = ({ sizes,className = "" }) => {
  if (!sizes || sizes.length === 0) return null;

  const getAgeBadge = (age) => {
    if (age.includes("زيرو"))
      return { label: "حديثي الولادة", color: "bg-pink-500/30 text-pink-200", icon: "👶" };

    if (age.includes("شهور"))
      return { label: "رضع", color: "bg-blue-500/30 text-blue-200", icon: "🍼" };

    if (age.includes("سنه") && !age.includes("سنتين"))
      return { label: "طفل صغير", color: "bg-purple-500/30 text-purple-200", icon: "🧒" };

    if (age.includes("سنتين"))
      return { label: "طفل", color: "bg-orange-500/30 text-orange-200", icon: "👧" };

    return { label: age, color: "bg-gray-500/30 text-gray-200", icon: "📏" };
  };

  return (
    <div className={`w-full max-w-6xl mx-auto bg-gray-900 pb-8 rounded-full ${className}`}>

     {/* Header - Chic & Modern */}
<div className="mb-10 p-8 text-center">
  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#e13485]/10 border border-[#e13485]/30 mb-5 backdrop-blur-sm">
    <LuRuler className="w-4 h-4 text-[#e13485]" />
    <span className="text-sm font-bold text-[#e13485] tracking-wide uppercase">
      دليل المقاسات
    </span>
  </div>



  <div className="flex items-center justify-center gap-2">
    <div className="w-8 h-[2px] bg-gradient-to-r from-transparent to-[#e13485]"></div>
    <p className="text-base font-medium bg-gradient-to-r from-[#e134c7] via-[#e13485]/80 to-[#890b83] bg-clip-text text-transparent">
      اختاري المقاس المناسب لطفلك
    </p>
    <div className="w-8 h-[2px] bg-gradient-to-l from-transparent to-[#e13485]"></div>
  </div>
</div>

      {/* Sizes Grid - Centered */}
      
       <div className="flex justify-center mt-[-2rem] pb-4">
  <div className="flex flex-wrap justify-center gap-6 max-w-[72rem]">
    {sizes.map((size, idx) => {
      const ageBadge = getAgeBadge(size.age);

      return (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          whileHover={{ y: -6, scale: 1.03 }}
          className="group w-[17rem] rounded-2xl border border-gray-700 
          bg-gradient-to-br from-gray-800 to-gray-900 
          p-6 transition-all duration-300
          hover:border-purple-400 hover:shadow-xl hover:shadow-purple-500/20"
        >
          {/* Size */}
          <div className="flex justify-center mb-4">
            <div className="w-20 h-12 flex items-center justify-center 
            rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 
            text-white font-bold text-xl shadow-lg">
              {size.size}
            </div>
          </div>

          {/* Age */}
          <div className="flex items-center justify-center gap-2 text-gray-200 text-sm mb-3">
            <FiCalendar className="w-4 h-4 text-purple-300" />
            {size.age}
          </div>

          {/* Badge */}
          <div className="flex justify-center">
            <span
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium ${ageBadge.color}`}
            >
              <span>{ageBadge.icon}</span>
              {ageBadge.label}
            </span>
          </div>
        </motion.div>
      );
    })}
  </div>
</div>
      {/* Tip - Improved visibility */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-4   flex gap-4 p-4 rounded-xl bg-purple-600/20 border border-purple-400/30 max-w-2xl mx-auto"
      >
        <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md">
          <FiInfo className="w-4 h-4" />
        </div>

        <p className="text-sm text-gray-100  leading-relaxed">
          <span className="font-semibold text-purple-500">
            نصيحة:
          </span>{" "}
          <span className="text-pink-500 font-semibold">
            لو طفلك بين مقاسين اختاري المقاس الأكبر عشان الراحة ولمدة استخدام أطول.
          </span>
        </p>
      </motion.div>
    </div>
  );
};

export default SizeChartTable;