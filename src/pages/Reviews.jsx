import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, X, ChevronLeft, ChevronRight, Heart, MessageCircle, 
  Sparkles, Quote, Eye, ChevronDown, ChevronUp, Maximize2,
  Grid, LayoutGrid
} from "lucide-react";
import { useTranslation } from "react-i18next";

const reviewImages = [
  {
    id: 1,
    url: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771794334/555_c3bqcn.jpg",
    alt: "Review 1 - Customer feedback about product quality",
  },
  {
    id: 2,
    url: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771794303/495252706_673781162135646_6982662795772231792_n_np1anf.jpg",
    alt: "Review 2 - Happy customer with their purchase",
  },
  {
    id: 3,
    url: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771794303/1_zhdox8.jpg",
    alt: "Review 3 - Customer testimonial",
  },
  {
    id: 4,
    url: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771794292/481766259_609892698524493_3143350412755106085_n_wy3qji.jpg",
    alt: "Review 4 - Product review",
  },
  {
    id: 5,
    url: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771794292/481671737_609893931857703_1470368248243400013_n_fygncv.jpg",
    alt: "Review 5 - Customer satisfaction",
  },
  {
    id: 6,
    url: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771794292/481183760_609893985191031_5574571128089207315_n_w1ubrz.jpg",
    alt: "Review 6 - Product quality feedback",
  },
  {
    id: 7,
    url: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771794292/480701076_609894101857686_332979890116712521_n_owwaii.jpg",
    alt: "Review 7 - Customer testimonial",
  },
  {
    id: 8,
    url: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771794716/480819689_609893915191038_6254013975121748569_n_ecj3et.jpg",
    alt: "Review 8 - Customer testimonial",
  },
  {
    id: 9,
    url: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771794741/481829700_609894231857673_3910082717633262042_n_dm4cox.jpg",
    alt: "Review 9 - Customer testimonial",
  },
  {
    id: 10,
    url: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771794744/481909641_609893901857706_2852423087529994498_n_sfadek.jpg",
    alt: "Review 10 - Customer testimonial",
  },
];
export default function Reviews() {
  const { t } = useTranslation();
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'masonry'
  const [hoveredId, setHoveredId] = useState(null);

  const openModal = (index) => {
    setCurrentIndex(index);
    setSelectedImage(reviewImages[index]);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % reviewImages.length;
    setCurrentIndex(nextIndex);
    setSelectedImage(reviewImages[nextIndex]);
  };

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + reviewImages.length) % reviewImages.length;
    setCurrentIndex(prevIndex);
    setSelectedImage(reviewImages[prevIndex]);
  };

  const showMore = () => {
    setVisibleCount(prev => Math.min(prev + 4, reviewImages.length));
  };

  const showLess = () => {
    setVisibleCount(4);
  };

  const visibleImages = reviewImages.slice(0, visibleCount);
  const hasMore = visibleCount < reviewImages.length;

  // Calculate average rating
  const averageRating = 4.9;
  const totalReviews = 156;

  return (
    <section className="relative py-24 my-16 px-4 overflow-hidden bg-gradient-to-b from-gray-50 to-white">
      {/* Modern Decorative Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 -left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-40 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-20 w-80 h-80 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Modern Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-full mb-6 shadow-lg shadow-pink-500/30"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">{t("reviews.customerSatisfaction", "رضا العملاء")}</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Main Title */}
          <h2 className="text-5xl md:text-6xl font-black mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-pink-500 to-gray-700">
              {t("reviews.title", "آراء عملائنا")}
            </span>
          </h2>

          {/* Rating Summary - Modern Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex items-center justify-center gap-8 flex-wrap"
          >
            {/* Stars Container */}
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-pink-100">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 + i * 0.1 }}
                  >
                    <Star
                      className={`w-6 h-6 ${
                        i < Math.floor(averageRating)
                          ? "text-pink-400 fill-pink-400"
                          : "text-gray-300"
                      }`}
                    />
                  </motion.div>
                ))}
              </div>
              <span className="text-2xl font-bold text-gray-800">{averageRating}</span>
            </div>

            {/* Review Count */}
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-pink-100">
              <MessageCircle className="w-6 h-6 text-pink-400" />
              <span className="text-gray-700 font-medium">
                <span className="text-2xl font-bold text-pink-500">{totalReviews}</span> {t("reviews.review", "تقييم")}
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* View Mode Toggle */}
        <div className="flex justify-end mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg border border-pink-100">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-full transition-all duration-300 ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white' 
                  : 'text-gray-400 hover:text-pink-500'
              }`}
            >
              <LayoutGrid className="w-5 h-5" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-2 rounded-full transition-all duration-300 ${
                viewMode === 'masonry' 
                  ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white' 
                  : 'text-gray-400 hover:text-pink-500'
              }`}
            >
              <Grid className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reviews Grid - Modern Cards */}
        <motion.div
          layout
          className={`grid ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
          } gap-6 lg:gap-8`}
        >
          <AnimatePresence>
            {visibleImages.map((review, index) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -20 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 100
                }}
                whileHover={{ y: -8 }}
                onHoverStart={() => setHoveredId(review.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="relative group cursor-pointer"
                onClick={() => openModal(index)}
              >
                {/* Glass Morphism Card */}
                <div className="relative h-full bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-xl border border-pink-100/50 hover:border-pink-300 transition-all duration-500">
                  
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <motion.img
                      src={review.url}
                      alt={review.alt}
                      className="w-full h-full object-cover"
                      animate={{ scale: hoveredId === review.id ? 1.1 : 1 }}
                      transition={{ duration: 0.6 }}
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-pink-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Floating Elements */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: hoveredId === review.id ? 1 : 0, x: hoveredId === review.id ? 0 : 20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-4 left-4 flex gap-2"
                    >
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg border border-pink-200">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-pink-400 fill-pink-400" />
                          <span className="text-xs font-bold text-gray-800">5.0</span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Quote Icon */}
                    <div className="absolute top-4 right-4">
                      <Quote className="w-6 h-6 text-white/60" />
                    </div>

                    {/* Quick View Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: hoveredId === review.id ? 1 : 0, y: hoveredId === review.id ? 0 : 20 }}
                      transition={{ duration: 0.3 }}
                      className="absolute bottom-4 left-4 right-4"
                    >
                      <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-pink-200 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-pink-400" />
                          <span className="text-xs font-medium text-gray-700">معاينة سريعة</span>
                        </div>
                        <Maximize2 className="w-4 h-4 text-pink-400" />
                      </div>
                    </motion.div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-4 border-t border-pink-100/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{review.id}</span>
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {t("reviews.customer", "عميل")}
                          </p>
                          <p className="text-xs text-pink-500">تقييم موثق</p>
                        </div>
                      </div>
                      <Heart className="w-5 h-5 text-pink-400 hover:fill-pink-400 transition-colors cursor-pointer" />
                    </div>
                  </div>

                  {/* Glow Effect on Hover */}
                  <div className={`absolute -inset-0.5 bg-gradient-to-r from-pink-400 to-pink-500 rounded-3xl blur opacity-0 group-hover:opacity-30 transition-opacity duration-500 -z-10`}></div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modern Show More/Less Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mt-16"
        >
          <motion.button
            onClick={hasMore ? showMore : showLess}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-pink-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            
            {/* Button */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white px-10 py-5 rounded-2xl font-bold shadow-2xl border border-pink-500/30 overflow-hidden">
              <span className="relative z-10 flex items-center gap-3 text-lg">
                {hasMore ? (
                  <>
                    <span>{t("reviews.viewMore", "عرض المزيد")}</span>
                    <motion.div
                      animate={{ y: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ChevronDown className="w-5 h-5 text-pink-400" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <span>{t("reviews.viewLess", "عرض أقل")}</span>
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ChevronUp className="w-5 h-5 text-pink-400" />
                    </motion.div>
                  </>
                )}
              </span>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
            </div>
          </motion.button>
        </motion.div>

        {/* Stats Section */}
        {!hasMore && visibleCount > 4 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { label: "تقييمات إيجابية", value: "98%", icon: Star },
              { label: "عملاء سعداء", value: "150+", icon: Heart },
              { label: "تقييمات موثقة", value: "156", icon: MessageCircle },
              { label: "تقييم 5 نجوم", value: "142", icon: Sparkles },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center border border-pink-100 shadow-lg"
              >
                <stat.icon className="w-8 h-8 text-pink-400 mx-auto mb-3" />
                <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Image Modal - Modern */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={closeModal}
          >
            {/* Close Button */}
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={closeModal}
              className="absolute top-6 right-6 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-white/20"
            >
              <X className="w-6 h-6" />
            </motion.button>

            {/* Navigation Arrows */}
            <motion.button
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-white/20"
            >
              <ChevronLeft className="w-6 h-6" />
            </motion.button>
            <motion.button
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 w-14 h-14 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-pink-400 hover:text-white hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 transition-all duration-300 border border-white/20"
            >
              <ChevronRight className="w-6 h-6" />
            </motion.button>

            {/* Image Container */}
            <motion.div
              key={selectedImage.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative max-w-6xl max-h-[85vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage.url}
                alt={selectedImage.alt}
                className="w-full h-full object-contain rounded-2xl shadow-2xl"
              />
              
              {/* Image Info */}
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20"
              >
                <div className="flex items-center gap-4">
                  <span className="text-pink-400 font-medium">
                    {currentIndex + 1} / {reviewImages.length}
                  </span>
                  <div className="w-px h-4 bg-white/20"></div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
                    <span className="text-white">5.0</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  );
}