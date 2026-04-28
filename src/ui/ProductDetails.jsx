import { useParams, useNavigate } from "react-router-dom";
import { HalfColoneData } from "../data/HalfColon";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingCart,
  Heart,
  Share2,
  Star,
  Truck,
  Shield,
  ArrowLeft,
  Check,
  Ruler,
  Droplet,
  Wind,
  Package,
  Shirt,
  Layers,
  ChevronLeft,
} from "lucide-react";
import HalfOffers from "../features/SummerHalf/HalfOffers";
import HalfOrderCollection from "../features/SummerHalf/HalfOrderCollection";
import OrderForm from "../ui/Orderform";

// ========== مكونات مساعدة صغيرة ==========
const RatingStars = () => (
  <div className="flex gap-0.5">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
    ))}
  </div>
);

const FeatureCard = ({ icon, label, value }) => (
  <div className="text-center p-3 bg-gray-50 rounded-xl transition-all hover:bg-gray-100">
    <div className="text-pink-500 mb-1 flex justify-center">{icon}</div>
    <p className="text-xs text-gray-500">{label}</p>
    <p className="text-xs font-semibold text-gray-800">{value}</p>
  </div>
);

const DeliveryInfo = () => (
  <div className="flex justify-between">
    <div className="flex items-center gap-3">
      <Truck className="w-5 h-5 text-pink-500" />
      <div>
        <p className="text-sm font-semibold">توصيل سريع</p>
        <p className="text-xs text-gray-500">خلال 3-5 أيام</p>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <Shield className="w-5 h-5 text-pink-500" />
      <div>
        <p className="text-sm font-semibold">ضمان الجودة</p>
        <p className="text-xs text-gray-500">100% أصلية</p>
      </div>
    </div>
  </div>
);

// ========== مكون التقييمات الاحترافي ==========
const ReviewsSection = () => {
  const [showAll, setShowAll] = useState(false);

  const reviews = [
    {
      id: 1,
      name: "أم محمد",
      rating: 5,
      comment: "منتج رائع جداً، القماش ناعم ومريح للأطفال. أنصح فيه بشدة 👍",
      date: "منذ 3 أيام",
      verified: true,
    },
    {
      id: 2,
      name: "أحمد السيد",
      rating: 5,
      comment: "جودة عالية وسعر مناسب، أولادي حبوه مره 😍",
      date: "منذ أسبوع",
      verified: true,
    },
    {
      id: 3,
      name: "سارة خالد",
      rating: 4,
      comment: "جميل جداًوالمقاس مناسب، غير كده ممتاز",
      date: "منذ أسبوعين",
      verified: false,
    },
    {
      id: 4,
      name: "نور علي",
      rating: 5,
      comment: "التوصيل سريع والمنتج زي الصورة بالضبط. شكراً لكم",
      date: "منذ 3 أسابيع",
      verified: true,
    },
  ];

  const displayedReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="space-y-5">
      {/* الهيدر حق التقييمات */}
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <span className="text-2xl text-yellow-500">★</span>
            <span className="text-2xl font-bold text-gray-800">4.8</span>
          </div>
          <div className="h-5 w-px bg-gray-200" />
          <span className="text-gray-500 text-sm">127 تقييم</span>
        </div>
        {reviews.length > 3 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-pink-500 text-sm font-medium hover:text-pink-600 transition-colors"
          >
            {showAll ? "عرض أقل" : "عرض الكل ←"}
          </button>
        )}
      </div>

      {/* قائمة التقييمات */}
      <div className="space-y-4">
        {displayedReviews.map((review, idx) => (
          <div key={review.id} className="group">
            <div className="flex items-start gap-3">
              {/* صورة افتراضية للمستخدم */}
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-pink-500 font-semibold text-sm">
                  {review.name.charAt(0)}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex items-center flex-wrap gap-2 mb-1">
                  <span className="font-semibold text-gray-800 text-sm">
                    {review.name}
                  </span>
                  {review.verified && (
                    <span className="flex items-center gap-0.5 text-xs text-green-600">
                      <Check className="w-3 h-3" />
                      مشترٍ موثوق
                    </span>
                  )}
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>

                <div className="flex gap-0.5 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-200"}`}
                    />
                  ))}
                </div>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {review.comment}
                </p>
              </div>
            </div>
            {idx !== displayedReviews.length - 1 && (
              <div className="border-b border-gray-50 mt-4" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// ========== المكون الرئيسي ==========
function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  // حالات
  const [selectedColor, setSelectedColor] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState("description");
  const [isImageZoomed, setIsImageZoomed] = useState(false);

  const [selectedOfferForOrder, setSelectedOfferForOrder] = useState(null);
  const [order, setOrder] = useState(null);

  // مراجع
  const orderCollectionRef = useRef(null);
  const formRef = useRef(null);
  const offersRef = useRef(null);

  // جلب المنتج
  const product = HalfColoneData.find((item) => item.id === Number(id));

  // تأثيرات
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    if (!product) return;

    const offerMap = {
      half: {
        name: "4 هاف كولون",
        quantity: 4,
        price: 240,
        originalPrice: 320,
        savings: 80,
      },
      bandana: {
        name: "6 بندانات",
        quantity: 6,
        price: 270,
        originalPrice: 360,
        savings: 90,
      },
      set: {
        name: "3 اطقم",
        quantity: 3,
        price: 285,
        originalPrice: 380,
        savings: 95,
      },
    };

    const getIcon = () => {
      if (product.tabType === "bandana") return <Shirt className="w-5 h-5" />;
      if (product.tabType === "set") return <Layers className="w-5 h-5" />;
      return <Package className="w-5 h-5" />;
    };

    const getBadgeColor = () => {
      if (product.tabType === "bandana")
        return "from-emerald-400 to-emerald-500";
      if (product.tabType === "set") return "from-purple-400 to-purple-500";
      return "from-pink-400 to-pink-500";
    };

    const config = offerMap[product.tabType] || offerMap.half;

    setSelectedOfferForOrder({
      id: `default-${product.id}`,
      ...config,
      tabType: product.tabType || "half",
      unit: "قطعة",
      icon: getIcon(),
      badgeColor: getBadgeColor(),
      popular: true,
      badge: "الأكثر طلباً",
    });
  }, [product]);

  // المعالجات
  const handleOfferSelect = (offer) => {
    setSelectedOfferForOrder(offer);
    setOrder(null);
    setTimeout(() => {
      orderCollectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 100);
  };

  const handleSetOrder = (newOrder) => {
    setOrder(newOrder);
  };

  const scrollToOffers = () => {
    offersRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // لو المنتج مش موجود
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <div className="text-center">
          <div className="text-7xl mb-4">😢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            المنتج غير موجود
          </h2>
          <button
            onClick={() => navigate(-1)}
            className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all"
          >
            العودة
          </button>
        </div>
      </div>
    );
  }

  const currentColorData = product.productColors[selectedColor];
  const features = [
    {
      icon: <Ruler className="w-4 h-4" />,
      label: "مقاسات",
      value: "جميع المقاسات",
    },
    { icon: <Droplet className="w-4 h-4" />, label: "خامة", value: "قطن 100%" },
    {
      icon: <Wind className="w-4 h-4" />,
      label: "تهوية",
      value: "مريح للبشرة",
    },
  ];

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      {/* الهيدر */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 max-w-6xl">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-600 hover:text-pink-500 transition-colors group"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
              <span className="text-sm font-medium">العودة</span>
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Heart
                  className={`w-5 h-5 transition-all duration-200 ${
                    isWishlisted
                      ? "fill-red-500 text-red-500 scale-110"
                      : "text-gray-600"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* قسم المنتج - صورة + معلومات */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* معرض الصور */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 cursor-zoom-in group"
              onClick={() => setIsImageZoomed(true)}
            >
              <img
                src={currentColorData?.img || product.productColors[0]?.img}
                alt={product.name}
                className="w-full h-[420px] object-contain p-6 transition-transform duration-700 group-hover:scale-105"
              />
              {product.discount && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                  -{product.discount}%
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors" />
            </motion.div>

            {/* الصور المصغرة */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.productColors.map((color, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`relative flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden transition-all duration-200 ${
                    selectedColor === index
                      ? "ring-2 ring-pink-500 ring-offset-2 shadow-lg"
                      : "ring-1 ring-gray-200 hover:ring-gray-300"
                  }`}
                >
                  <img
                    src={color.img}
                    alt={`لون ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {selectedColor === index && (
                    <div className="absolute inset-0 bg-pink-500/5 flex items-center justify-center">
                      <Check className="w-5 h-5 text-pink-500" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* معلومات المنتج */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-5"
            >
              {/* التصنيفات */}
              <div className="flex flex-wrap gap-2">
                {product.category && (
                  <span className="bg-pink-50 text-pink-600 text-xs px-3 py-1 rounded-full font-medium">
                    {product.category}
                  </span>
                )}
                {product.season && (
                  <span className="bg-purple-50 text-purple-600 text-xs px-3 py-1 rounded-full font-medium">
                    {product.season}
                  </span>
                )}
              </div>

              {/* العنوان */}
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* التقييم */}
              <div className="flex items-center gap-3">
                <RatingStars />
                <span className="text-sm text-gray-500">4.8 • 127 تقييم</span>
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" /> موثوق
                </span>
              </div>

              {/* الوصف */}
              <p className="text-gray-600 leading-relaxed border-r-2 border-pink-200 pr-4">
                {product.description || "منتج عالي الجودة مصمم خصيصاً لأطفالك."}
              </p>

              {/* مميزات المنتج */}
              <div className="grid grid-cols-3 gap-2">
                {features.map((feature, i) => (
                  <FeatureCard key={i} {...feature} />
                ))}
              </div>

              {/* اختيار اللون */}
              <div>
                <label className="font-semibold text-gray-900 flex items-center gap-2 text-sm mb-2">
                  <div className="w-4 h-4 rounded-full bg-pink-500" /> اختر
                  اللون
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.productColors.map((color, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                        selectedColor === index
                          ? "bg-pink-500 text-white shadow-md scale-105"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {color.name || `لون ${index + 1}`}
                    </button>
                  ))}
                </div>
              </div>

              {/* زر عرض العروض */}
              <button
                onClick={scrollToOffers}
                className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3.5 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                شوف العروض
              </button>

              {/* معلومات التوصيل */}
              <DeliveryInfo />
            </motion.div>
          </div>
        </div>

        {/* تبويبات */}
        <div className="mt-12">
          <div className="border-b border-gray-100">
            <div className="flex gap-8">
              {[
                { id: "description", label: "الوصف" },
                { id: "specifications", label: "المواصفات" },
                { id: "reviews", label: "التقييمات" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-3 font-medium transition-all duration-200 relative ${
                    activeTab === tab.id
                      ? "text-pink-500"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-pink-400 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="py-6">
            <AnimatePresence mode="wait">
              {activeTab === "description" && (
                <motion.div
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <p className="text-gray-600 leading-relaxed">
                    {product.description ||
                      "منتج عالي الجودة مصمم خصيصاً لأطفالك. يتميز بتصميم عصري وألوان زاهية."}
                  </p>
                </motion.div>
              )}

              {activeTab === "specifications" && (
                <motion.div
                  key="spec"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-500 text-sm">الخامة</span>
                      <span className="font-semibold text-gray-800">
                        {product.material || "قطن 100%"}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-500 text-sm">الفصل</span>
                      <span className="font-semibold text-gray-800">
                        {product.season || "صيفي"}
                      </span>
                    </div>
                    {/* <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-500 text-sm">المقاسات</span>
                      <span className="font-semibold text-gray-800">S, M, L, XL</span>
                    </div> */}
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-500 text-sm">العناية</span>
                      <span className="font-semibold text-gray-800">
                        غسيل بارد
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === "reviews" && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <ReviewsSection />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* قسم العروض */}
      <div ref={offersRef} className="scroll-mt-20">
        <HalfOffers
          filterByTabType={product.tabType || "half"}
          setSelectedOffer={handleOfferSelect}
          scrollToOrderCollection={() =>
            orderCollectionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        />
      </div>

      {/* قسم تجميع الطلب */}
      <div ref={orderCollectionRef} className="mt-12 scroll-mt-20">
        {selectedOfferForOrder &&
          !selectedOfferForOrder.id?.includes("default") && (
            <HalfOrderCollection
              selectedOffer={selectedOfferForOrder}
              setOrder={handleSetOrder}
              formRef={formRef}
              disableProductSelection={true}
              defaultProductName={product.name}
              onOrderConfirmed={() => {
                setTimeout(() => {
                  formRef.current?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }, 200);
              }}
            />
          )}
      </div>

      {/* نموذج الطلب */}
      {order && order.length > 0 && (
        <div ref={formRef} className="mt-10 scroll-mt-20">
          <OrderForm
            order={order}
            selectedOffer={selectedOfferForOrder}
            formRef={formRef}
          />
        </div>
      )}

      {/* مودال تكبير الصورة */}
      <AnimatePresence>
        {isImageZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageZoomed(false)}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-8 cursor-zoom-out"
          >
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={currentColorData?.img || product.productColors[0]?.img}
              alt={product.name}
              className="max-w-full max-h-full object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ProductDetails;
