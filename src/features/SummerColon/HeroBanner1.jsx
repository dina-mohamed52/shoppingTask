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
      className="relative overflow-hidden rounded-2xl 
  
      md:rounded-3xl mb-6 md:mb-12 mx-2 md:mx-0 shadow-xl"
    >
      {/* Background - لون صلب مع نسيج خفيف */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-[#F472B6]/5 to-[#1A2A4F]/10" />
      
      {/* Background Shapes - أكثر وضوحاً */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-32 -right-32 w-80 h-80 md:w-96 md:h-96 bg-[#F472B6]/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -45, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear", delay: 1 }}
          className="absolute -bottom-32 -left-32 w-96 h-96 md:w-[30rem] md:h-[30rem] bg-[#1A2A4F]/15 rounded-full blur-3xl"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-radial from-transparent via-[#F472B6]/5 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative p-5 md:p-8 lg:p-12">
        {/* Floating Badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-1.5 md:gap-2 bg-white rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-4 md:mb-6 shadow-md border border-[#F472B6]/30"
        >
          <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-[#F472B6]" />
          <span className="text-[10px] md:text-sm font-bold text-[#F472B6]">تخفيضات تصل إلى 50%</span>
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
              <span className="text-[#1A2A4F]">
                مرحباً بكِ في
              </span>
              <br />
              <span className="text-[#F472B6] relative font-bold inline-block text-2xl md:text-3xl lg:text-5xl mt-1">
                عالم Baby Style
               
              </span>
             
            </h2>
            
            <p className="text-gray-700 text-sm md:text-base max-w-md mx-auto lg:mx-0 leading-relaxed px-2 md:px-0 font-medium">
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
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-1.5 shadow-md">
                <Heart className="w-3 h-3 md:w-4 md:h-4 text-[#F472B6] fill-[#F472B6]" />
                <span className="text-xs md:text-sm text-gray-700 font-semibold">
                  <strong className="text-[#F472B6] text-base">10,000+</strong> عميل سعيد
                </span>
              </div>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <div className="flex-1 w-full">
            <div className="grid grid-cols-3 gap-3 md:gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="relative group"
                >
                  <div className="bg-white rounded-xl md:rounded-2xl p-3 md:p-5 text-center border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 hover:border-[#F472B6]/50">
                    {/* Icon Container */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-10 h-10 md:w-14 md:h-14 mx-auto mb-2 md:mb-3 rounded-xl bg-gradient-to-br from-[#F472B6] to-[#F472B6]/80 flex items-center justify-center text-white shadow-lg"
                    >
                      {feature.icon}
                    </motion.div>
                    
                    <h3 className="font-bold text-[#1A2A4F] text-xs md:text-base mb-0.5 md:mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-[10px] md:text-xs text-gray-600 font-medium">
                      {feature.description}
                    </p>
                    
                    {/* Decorative Line */}
                    <motion.div
                      initial={{ width: 0 }}
                      whileHover={{ width: "50%" }}
                      transition={{ duration: 0.3 }}
                      className="h-0.5 bg-[#F472B6] rounded-full mx-auto mt-2"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Decorative Elements */}
        <motion.div 
          className="flex justify-center gap-3 mt-8 md:mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ 
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity, 
                delay: i * 0.15,
                ease: "easeInOut"
              }}
              className={`w-1.5 h-1.5 rounded-full ${
                i % 2 === 0 ? 'bg-[#F472B6]' : 'bg-[#1A2A4F]'
              }`}
            />
          ))}
        </motion.div>
      </div>

      {/* Corner Decorations */}
      <div className="absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 overflow-hidden pointer-events-none">
        <div className="absolute -top-16 -right-16 w-32 h-32 md:w-40 md:h-40 bg-[#F472B6]/10 rounded-full" />
      </div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-40 md:h-40 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-16 -left-16 w-32 h-32 md:w-40 md:h-40 bg-[#1A2A4F]/10 rounded-full" />
      </div>
    </motion.div>
  );
}

export default HeroBanner1;