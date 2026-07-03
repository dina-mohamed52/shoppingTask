import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Sun,
  Snowflake,
  ArrowLeft,
  Star,
  Heart,
  Shield,
  Truck,
  CreditCard,
  Sparkles,
  Flame,
  Palette,
  ShoppingBag,
} from "lucide-react";

function MainPage() {
  const navigate = useNavigate();
  const [hoveredSeason, setHoveredSeason] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const seasons = [
    {
      id: "summer",
      name: "صيفي",
      nameEn: "Summer Collection",
      icon: <Sun className="w-8 h-8" />,
      color: "#FF6B35",
      gradient: "from-orange-400 to-rose-400",
      bgGradient: "from-orange-50 to-rose-50",
      borderColor: "border-orange-200",
      description: "إطلالات منعشة لأيام الصيف الحارة",
      categories: [
        {
          id: 1,
          name: "فستان صيفي",
          nameEn: "Summer Dresses",
          path: "/SummerDresses",
          image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1776012196/WhatsApp_Image_2026-04-08_at_5.55.41_PM_sjakzv.jpg",
          items: "15+ منتج",
          badge: "الأكثر مبيعاً",
          badgeColor: "bg-orange-500",
        },
        {
          id: 2,
          name: "تيشيرتات قطن",
          nameEn: "Cotton T-Shirts",
          path: "/SummerTshirts",
          image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1775499022/WhatsApp_Image_2026-04-03_at_6.40.14_PM_1_bbdvk1.jpg",
          items: "12+ منتج",
          badge: "جديد",
          badgeColor: "bg-rose-500",
        },
        {
          id: 3,
          name: "شورتات كاجوال",
          nameEn: "Casual Shorts",
          path: "/SummerShorts",
          image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575082/468185339_931536052403792_3120323499499149723_n_zp0ej5.jpg",
          items: "8+ منتج",
          badge: "تخفيضات",
          badgeColor: "bg-yellow-500",
        },
      ],
    },
    {
      id: "winter",
      name: "شتوي",
      nameEn: "Winter Collection",
      icon: <Snowflake className="w-8 h-8" />,
      color: "#4A90D9",
      gradient: "from-blue-400 to-indigo-400",
      bgGradient: "from-blue-50 to-indigo-50",
      borderColor: "border-blue-200",
      description: "دفء وأناقة لأيام الشتاء الباردة",
      categories: [
        {
          id: 4,
          name: "جواكت شتوية",
          nameEn: "Winter Jackets",
          path: "/WinterJackets",
          image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784141/WhatsApp_Image_2026-02-21_at_10.28.04_AM_1_jgzfpu.jpg",
          items: "10+ منتج",
          badge: "الأكثر طلباً",
          badgeColor: "bg-blue-500",
        },
        {
          id: 5,
          name: "كنزات صوف",
          nameEn: "Wool Sweaters",
          path: "/WinterSweaters",
          image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575082/468185339_931536052403792_3120323499499149723_n_zp0ej5.jpg",
          items: "14+ منتج",
          badge: "جودة عالية",
          badgeColor: "bg-indigo-500",
        },
        {
          id: 6,
          name: "بناطيل دافئة",
          nameEn: "Warm Pants",
          path: "/WinterPants",
          image: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1776012196/WhatsApp_Image_2026-04-08_at_5.55.41_PM_sjakzv.jpg",
          items: "9+ منتج",
          badge: "تشكيلة جديدة",
          badgeColor: "bg-cyan-500",
        },
      ],
    },
  ];

  const stats = [
    { icon: <Truck className="w-5 h-5" />, label: "توصيل سريع", value: "خلال 5 أيام" },
    { icon: <Shield className="w-5 h-5" />, label: "ضمان الجودة", value: "أفضل الخامات" },
    { icon: <CreditCard className="w-5 h-5" />, label: "دفع آمن", value: "طرق متعددة" },
    { icon: <Heart className="w-5 h-5" />, label: "رضا العملاء", value: "98% رضا" },
  ];

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 pt-12 pb-20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <Palette className="w-12 h-12 text-[#864e63] mx-auto mb-4" />
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              مجموعات <span className="text-[#864e63]">أطفالك</span> المثالية
            </h1>
            <p className="text-gray-600 text-lg md:text-xl max-w-2xl mx-auto">
              اكتشفي أجمل التشكيلات المصممة خصيصاً لأطفالك بين الصيف والشتاء
            </p>
            <div className="flex gap-4 justify-center mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('seasons')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-3 bg-[#864e63] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                استكشفي المجموعات
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Seasons Section */}
      <div id="seasons" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              اختاري <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">الفصل</span> المفضل
            </h2>
            <p className="text-gray-600">كل فصل يحمل مجموعة مميزة من التصاميم</p>
          </motion.div>

          {seasons.map((season, seasonIndex) => (
            <motion.div
              key={season.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: seasonIndex * 0.2 }}
              viewport={{ once: true }}
              className="mb-20 last:mb-0"
            >
              {/* Season Header */}
              <div
                className={`relative bg-gradient-to-r ${season.bgGradient} rounded-3xl p-8 mb-8 border ${season.borderColor} shadow-lg`}
                onMouseEnter={() => setHoveredSeason(season.id)}
                onMouseLeave={() => setHoveredSeason(null)}
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-2xl bg-gradient-to-r ${season.gradient} text-white shadow-lg`}>
                      {season.icon}
                    </div>
                    <div>
                      <h3 className={`text-3xl font-bold bg-gradient-to-r ${season.gradient} bg-clip-text text-transparent`}>
                        {season.name}
                      </h3>
                      <p className="text-gray-600">{season.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-500 text-sm">{season.categories.length} أقسام</span>
                    <motion.div
                      animate={{ x: hoveredSeason === season.id ? 5 : 0 }}
                      className="text-gray-400"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {season.categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    onMouseEnter={() => setHoveredCard(category.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                    onClick={() => navigate(category.path)}
                    className="group cursor-pointer"
                  >
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
                      {/* Image Container */}
                      <div className="relative h-64 overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        {/* Badge */}
                        <div className="absolute top-4 right-4 z-10">
                          <div className={`${category.badgeColor} px-3 py-1.5 rounded-full shadow-lg`}>
                            <span className="text-white text-xs font-bold">{category.badge}</span>
                          </div>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl">
                            <span className="text-[#864e63] font-bold flex items-center gap-2">
                              <ShoppingBag className="w-5 h-5" />
                              تسوقي الآن
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h4 className="text-lg font-bold text-gray-800 group-hover:text-[#864e63] transition-colors">
                              {category.name}
                            </h4>
                            <p className="text-sm text-gray-500">{category.nameEn}</p>
                          </div>
                          <div className="flex items-center gap-1 text-yellow-500">
                            <Star className="w-4 h-4 fill-yellow-500" />
                            <span className="text-xs text-gray-600">4.8</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                          <span className="text-sm text-gray-500">{category.items}</span>
                          <motion.div
                            animate={{ x: hoveredCard === category.id ? -5 : 0 }}
                            className="text-[#864e63]"
                          >
                            <ArrowLeft className="w-4 h-4" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-16 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg transition-all duration-300 group border border-transparent hover:border-[#864e63]/20"
              >
                <div className="text-[#864e63] mb-3 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h4 className="text-gray-800 font-bold text-lg mb-1">{stat.label}</h4>
                <p className="text-gray-500 text-sm">{stat.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[#864e63] to-[#c6abff] opacity-5"></div>
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#864e63] rounded-full blur-[100px] opacity-10"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#c6abff] rounded-full blur-[100px] opacity-10"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Sparkles className="w-10 h-10 text-[#864e63] mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              استعدي للموسم <span className="text-[#864e63]">الجديد</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              تصفحي مجموعاتنا الصيفية والشتوية واختاري الأجمل لصغارك
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/WinterCollection")}
                className="px-8 py-3 bg-gradient-to-r from-[#864e63] to-[#c6abff] text-white rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                استكشفي المجموعات
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;