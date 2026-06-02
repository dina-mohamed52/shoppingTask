import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sparkles,
  ArrowLeft,
  Star,
  Heart,
  Shield,
  Truck,
  CreditCard,
  TrendingUp,
  Flame,
  Crown,
} from "lucide-react";

function MainPage() {
  const navigate = useNavigate();
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    {
      id: 1,
      name: "شتوية دافئة",
      nameEn: "Winter Collection",
      path: "/WinterCollection",
      image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575082/468185339_931536052403792_3120323499499149723_n_zp0ej5.jpg",
      color: "#4A90D9",
      gradient: "from-blue-600 to-cyan-500",
      description: "أدفأ تشكيلة شتوية لصغارك",
      items: "20+ منتج",
      badge: "الأكثر مبيعاً",
      badgeColor: "bg-blue-500",
    },
    {
      id: 2,
      name: "صيفي أنيق",
      nameEn: "Summer Collection",
      path: "/SummerColon",
      image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1776012196/WhatsApp_Image_2026-04-08_at_5.55.41_PM_sjakzv.jpg",
      color: "#FF8C42",
      gradient: "from-orange-500 to-yellow-500",
      description: "خامات قطن ناعمة ومنعشة",
      items: "15+ منتج",
      badge: "خصم 28%",
      badgeColor: "bg-orange-500",
    },
    {
      id: 3,
      name: "هاف صيفي",
      nameEn: "Half Summer",
      path: "/SummerHalfColon",
      image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1775499022/WhatsApp_Image_2026-04-03_at_6.40.14_PM_1_bbdvk1.jpg",
      color: "#2D9C7A",
      gradient: "from-green-500 to-emerald-500",
      description: "لأيام الربيع والخريف المعتدلة",
      items: "12+ منتج",
      badge: "تشكيلة جديدة",
      badgeColor: "bg-green-500",
    },
    {
      id: 4,
      name: "تربونات فاخرة",
      nameEn: "Turbon Collection",
      path: "/Turbon",
      image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784141/WhatsApp_Image_2026-02-21_at_10.28.04_AM_1_jgzfpu.jpg",
      color: "#9B59B6",
      gradient: "from-purple-600 to-pink-500",
      description: "إكسسوارات أنيقة ومميزة",
      items: "8+ منتج",
      badge: "أحدث التصاميم",
      badgeColor: "bg-purple-500",
    },
  ];

  const stats = [
    { icon: <Truck className="w-5 h-5" />, label: "توصيل سريع", value: "خلال 5 أيام" },
    { icon: <Shield className="w-5 h-5" />, label: "ضمان الجودة", value: "أفضل الخامات" },
    { icon: <CreditCard className="w-5 h-5" />, label: "دفع آمن", value: "طرق متعددة" },
    { icon: <Heart className="w-5 h-5" />, label: "رضا العملاء", value: "98% رضا" },
  ];

  return (
    <div  dir="rtl" className="min-h-screen bg-black">
      {/* Categories Section - MOVED TO TOP */}
      <div id="categories" className="py-20 px-4  bg-gradient-to-br from-[#0a0a0a] via-[#1a1a2e] to-[#16213e]">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Flame className="w-8 h-8 text-[#864e63] mx-auto mb-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              مجموعاتنا
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              اكتشفي أحدث التشكيلات المصممة خصيصاً لأطفالك
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-[#864e63] to-[#c6abff] mx-auto mt-6 rounded-full"></div>
          </motion.div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.3 }}
                onMouseEnter={() => setHoveredCard(category.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate(category.path)}
                className="relative group cursor-pointer overflow-hidden rounded-2xl"
              >
                {/* Card Background Image */}
                <div className="relative h-[400px] md:h-[500px] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-5 right-5 z-10">
                    <div className={`${category.badgeColor} px-4 py-2 rounded-full shadow-lg backdrop-blur-sm bg-opacity-90`}>
                      <span className="text-white text-sm font-bold">{category.badge}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-0 transition-transform duration-500 group-hover:-translate-y-4">
                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm mb-2">{category.nameEn}</p>
                    <p className="text-gray-300 mb-4">{category.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-white text-sm">{category.items}</span>
                      </div>
                      
                      <motion.div
                        animate={{ x: hoveredCard === category.id ? -10 : 0 }}
                        className="flex items-center gap-2 text-white font-medium"
                      >
                        <span>تسوقي الآن</span>
                        <ArrowLeft className="w-4 h-4" />
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

     
      {/* Stats Section */}
      <div className="bg-gradient-to-br from-[#0a0a0a] to-[#1a1a2e] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#864e63]/50 transition-all duration-300 group"
              >
                <div className="text-[#864e63] mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h4 className="text-white font-bold text-lg mb-1">{stat.label}</h4>
                <p className="text-gray-400 text-sm">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#864e63] to-[#c6abff] opacity-10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#864e63] rounded-full blur-[100px]"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#c6abff] rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              جاهزة لتسوقي لأطفالك؟
            </h2>
            <p className="text-gray-300 text-lg mb-8">
              تصفحي مجموعاتنا واختاري الأجمل لصغارك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/WinterCollection")}
                className="px-8 py-3 bg-gradient-to-r from-[#864e63] to-[#c6abff] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                تسوقي الآن
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;