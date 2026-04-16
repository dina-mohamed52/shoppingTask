import { motion, AnimatePresence } from "framer-motion";
import { Truck, Shield, Clock, Sparkles, Star, Heart } from "lucide-react";

function HeroBanner1() {
  const features = [
    {
      icon: <Truck className="w-5 h-5 md:w-6 md:h-6" />,
      title: "معاينة مجانية",
      description: "جربي قبل الشراء",
    },
    {
      icon: <Shield className="w-5 h-5 md:w-6 md:h-6" />,
      title: "ضمان الجودة",
      description: "خامات مضمونة",
    },
    {
      icon: <Clock className="w-5 h-5 md:w-6 md:h-6" />,
      title: "توصيل سريع",
      description: "خلال 5 أيام",
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl md:rounded-3xl mb-6 md:mb-12 mx-2 md:mx-0 shadow-md"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#864e63]/5 via-[#c6abff]/5 to-white" />
      
      {/* Animated Background Shapes - مبسطة للموبيل */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 45, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-40 h-40 md:w-80 md:h-80 bg-gradient-to-r from-[#864e63]/15 to-[#c6abff]/15 rounded-full blur-2xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.15, 1],
            rotate: [0, -30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute -bottom-20 -left-20 w-48 h-48 md:w-96 md:h-96 bg-gradient-to-r from-[#c6abff]/15 to-[#864e63]/15 rounded-full blur-2xl"
        />
      </div>

      {/* Main Content */}
      <div className="relative  p-5 md:p-8 lg:p-12">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-1.5 md:gap-2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 shadow-sm border border-[#864e63]/20"
        >
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#864e63]" />
          <span className="text-[10px] md:text-sm font-medium text-[#864e63]">تخفيضات تصل إلى 50%</span>
          <Star className="w-2 h-2 md:w-3 md:h-3 text-yellow-500 fill-yellow-500" />
        </motion.div>

        <div className="flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-8 lg:gap-12">
          {/* Left Content */}
          <motion.div 
            className="text-center lg:text-right flex-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-4xl gap-2 lg:text-5xl font-bold mb-3 md:mb-4">
              <span className="bg-gradient-to-l from-[#864e63] to-[#c6abff] bg-clip-text text-transparent">
                 مرحباً بكِ في
              </span>
              
              <span className="text-[#864e63]  mr-1 relative inline-block text-2xl md:text-3xl lg:text-5xl">
                عالم بيبي ستايل  {""}
                <motion.span
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="absolute bottom-0 left-0 h-0.5 md:h-1
                   bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full"
                />
              </span>
              <motion.span
                animate={{ rotate: [0, 10, -10, 10, 0] }}
                transition={{ delay: 1, duration: 0.5 }}
                className="inline-block mr-1 text-xl md:text-3xl"
              >
                ✨
              </motion.span>
            </h2>
            
            <p className="text-gray-500 text-xs md:text-base max-w-md mx-auto lg:mx-0 leading-relaxed px-2 md:px-0">
              اكتشفي أحدث تشكيلات الكولونات الصيفية والهاف كولون المصممة خصيصاً لصغاركِ 
              بأفضل الخامات وأجود الأنواع
            </p>

            {/* Animated Counter */}
            <motion.div 
              className="flex justify-center lg:justify-start gap-4 md:gap-6 mt-4 md:mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center gap-1 md:gap-2">
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-[#864e63]" />
                <span className="text-[10px] md:text-sm text-gray-500">
                  <strong className="text-[#864e63]">10,000+</strong> عميل سعيد
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Grid - 3 أعمدة على الموبيل */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -3 }}
                  className="relative group"
                >
                  <div className="bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl p-3 md:p-5 text-center border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-3 rounded-xl bg-gradient-to-r from-[#864e63] to-[#c6abff] flex items-center justify-center text-white shadow-md"
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <h3 className="font-bold text-gray-800 text-xs md:text-base mb-0.5 md:mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[8px] md:text-xs text-gray-400 hidden sm:block">
                      {feature.description}
                    </p>
                    
                    {/* Decorative Line - يظهر فقط على الشاشات الكبيرة */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "30%" }}
                      transition={{ duration: 0.3 }}
                      className="h-0.5 bg-gradient-to-r from-[#864e63] to-[#c6abff] rounded-full mx-auto mt-2 hidden md:block"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements - أقل عدد على الموبيل */}
        <motion.div 
          className="flex justify-center gap-1.5 md:gap-2 mt-6 md:mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-1 h-1 rounded-full bg-[#864e63]/40"
            />
          ))}
        </motion.div>
      </div>

      {/* Corner Decoration - مبسطة */}
      <div className="absolute top-0 left-0 w-20 h-20 md:w-32 md:h-32 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -left-10 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-br from-[#864e63]/10 to-transparent rounded-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-20 h-20 md:w-32 md:h-32 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-10 -right-10 w-16 h-16 md:w-32 md:h-32 bg-gradient-to-tl from-[#c6abff]/10 to-transparent rounded-full" />
      </div>
    </motion.div>
  );
}

export default HeroBanner1;