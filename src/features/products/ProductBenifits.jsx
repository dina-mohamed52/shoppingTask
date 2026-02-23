import { motion } from "framer-motion";
import { Shirt, Smile, Eye, Sparkles, Heart, Shield, Star } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ProductBenefits() {
  const { t } = useTranslation();

  const features = [
    {
      icon: <Shirt className="w-8 h-8 text-pink-500" />,
      title: t("productBenefits.feature1.title"),
      desc: t("productBenefits.feature1.desc"),
      gradient: "from-pink-600 to-pink-700",
      bgGradient: "from-pink-600/20 to-pink-700/20",
      delay: 0.1,
    },
    {
      icon: <Smile className="w-8 h-8 text-pink-500" />,
      title: t("productBenefits.feature2.title"),
      desc: t("productBenefits.feature2.desc"),
      gradient: "from-pink-500 to-rose-600",
      bgGradient: "from-pink-500/20 to-rose-600/20",
      delay: 0.2,
    },
    {
      icon: <Eye className="w-8 h-8 text-pink-500" />,
      title: t("productBenefits.feature3.title"),
      desc: t("productBenefits.feature3.desc"),
      gradient: "from-pink-700 to-pink-600",
      bgGradient: "from-pink-700/20 to-pink-600/20",
      delay: 0.3,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="relative py-16 my-16 px-4 overflow-hidden bg-white">
      {/* Decorative Background - أغمق وأقل وضوحاً */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-600 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gray-700 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {/* Title with Glow - أغمق */}
          <div className="relative inline-block w-full sm:w-auto">
  <div className="absolute inset-0 bg-gradient-to-r from-pink-700 to-pink-800 rounded-full blur-2xl opacity-20"></div>
  <h2 className="relative text-2xl sm:text-5xl font-bold
    bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-300 to-gray-600 
    px-4 sm:px-8 py-4
    whitespace-nowrap overflow-x-auto scrollbar-hide
    text-center">
    {t("productBenefits.heading")}
  </h2>
</div>

{/* أضف هذا الـ style لإخفاء شريط التمرير */}
<style jsx>{`
  .scrollbar-hide::-webkit-scrollbar {
    display: none;
  }
  .scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`}</style>
          
          {/* Decorative Line */}
          <div className="w-32 h-1 bg-gradient-to-r from-pink-700 to-pink-800 mx-auto mt-4 rounded-full"></div>
          
          {/* Subtitle - أغمق */}
          <p className="text-gray-600 mt-4 text-lg max-w-2xl mx-auto font-medium">
            {t("productBenefits.subtitle", "نقدم لك أفضل المنتجات بأعلى جودة")}
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              className="relative group"
            >
              {/* Glow Effect - أغمق */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${feature.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
              
              {/* Main Card - أغمق */}
              <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-pink-600/30 shadow-xl overflow-hidden h-full flex flex-col">
                
                {/* Decorative Elements - أغمق */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-pink-700 rounded-full filter blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-gray-700 rounded-full filter blur-2xl"></div>
                </div>

                {/* Icon Container */}
                <div className="relative mb-6">
                  {/* Icon Background Glow - أغمق */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-pink-700 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  
                  {/* Icon Circle - أغمق */}
                  <div className="relative w-20 h-20 mx-auto bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl border-2 border-pink-600/40 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    {feature.icon}
                    
                    {/* Sparkle Icons - أغمق */}
                    <Sparkles className="absolute -top-2 -right-2 w-4 h-4 text-pink-600 animate-pulse" />
                    <Sparkles className="absolute -bottom-2 -left-2 w-3 h-3 text-pink-600 animate-pulse" style={{ animationDelay: "0.5s" }} />
                  </div>
                </div>

                {/* Content */}
                <div className="relative text-center flex-1">
                  <h3 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-pink-600">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 leading-relaxed font-medium">
                    {feature.desc}
                  </p>
                </div>

                {/* Bottom Decoration - أغمق */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Note Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-12"
        >
          <div className="relative group max-w-3xl mx-auto">
            {/* Glow Effect - أغمق */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-700 to-pink-800 rounded-2xl blur-xl opacity-10 group-hover:opacity-20 transition-opacity duration-300"></div>
            
            {/* Note Card - أغمق */}
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-pink-600/30 shadow-xl overflow-hidden">
              
              {/* Decorative Icons - أغمق */}
              <div className="absolute top-0 left-0 p-4">
                <Heart className="w-6 h-6 text-pink-600/30" />
              </div>
              <div className="absolute bottom-0 right-0 p-4">
                <Star className="w-6 h-6 text-pink-600/30" />
              </div>
              
              {/* Content */}
              <div className="relative flex items-center gap-4 flex-wrap justify-center">
                <Shield className="w-10 h-10 text-pink-500 animate-pulse" />
                <p className="text-xl font-medium text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-pink-300">
                  {t("productBenefits.note")}
                </p>
                <Sparkles className="w-8 h-8 text-pink-500 animate-spin-slow" />
              </div>

              {/* Progress Bar - أغمق */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-700 to-pink-800 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </div>
          </div>
        </motion.div>

        {/* Additional Stats - أغمق */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { label: t("productBenefits.stats.products", "منتج"), value: "50+" },
            { label: t("productBenefits.stats.customers", "عميل"), value: "1000+" },
            { label: t("productBenefits.stats.years", "عام"), value: "5+" },
            { label: t("productBenefits.stats.satisfaction", "رضا"), value: "98%" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-100 backdrop-blur-sm rounded-xl p-4 text-center border border-pink-600/30 shadow-md"
            >
              <div className="text-2xl font-bold text-pink-700">{stat.value}</div>
              <div className="text-sm text-gray-700 mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
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
      `}</style>
    </section>
  );
}