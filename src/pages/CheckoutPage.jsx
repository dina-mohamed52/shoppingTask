import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Package,
  Crown,
  CheckCircle,
  Sparkles,
  Heart,
  ShoppingBag,
  Gem,
  Shield,
  Clock,
} from "lucide-react";
import { useCart } from "../features/cart/CartContext";
import CartItem from "../features/cart/CartItems";
import ShippingStep from "../features/cart/ShippingStep";

function CheckoutPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const { cartItems, updateQuantity, removeItem, clearCart } = useCart();

  const subtotal =
    cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0) || 0;
  const shippingCost = 60;
  const discount = subtotal > 500 ? 10 : 0;
  const total = subtotal + shippingCost;

  const handleOrderSuccess = () => {
    setOrderPlaced(true);
    clearCart();
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-[#1c2533] via-pink-50/30 to-[#1c2533] flex items-center justify-center px-4"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-400 to-pink-500 text-white px-4 py-1.5 rounded-full mb-6 shadow-lg shadow-pink-400/30"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">تم بنجاح</span>
          </motion.div>
          <div className="w-20 h-20 mx-auto bg-pink-50/20 rounded-2xl flex items-center justify-center mb-4 border border-pink-200/30 backdrop-blur-sm">
            <CheckCircle className="w-10 h-10 text-pink-400" />
          </div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-semibold text-[#1c2533] mt-4 mb-2"
          >
            تم استلام طلبك! 🎀
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-sm"
          >
            جاري تحويلك إلى الصفحة الرئيسية...
          </motion.p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50/20 to-gray-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-pink-100/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <motion.button
              whileHover={{ x: -5 }}
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-gray-500 hover:text-pink-500 transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>العودة</span>
            </motion.button>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-pink-100 to-pink-50 rounded-xl flex items-center justify-center">
                <Crown className="w-4 h-4 text-pink-500" />
              </div>
              <h1 className="text-lg font-semibold text-[#1c2533]">
                إتمام الطلب
              </h1>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm bg-pink-50/50 px-3 py-1.5 rounded-full border border-pink-100">
              <Package className="w-4 h-4 text-pink-400" />
              <span>
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)} منتجات
              </span>
            </div>
          </div>

          {/* Steps Progress */}
          <div className="flex justify-center gap-8 mt-8">
            {[
              { step: 1, label: "السلة" },
              { step: 2, label: "الشحن والتأكيد" },
            ].map((s) => (
              <div key={s.step} className="flex items-center gap-3">
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center text-sm transition-all duration-300 ${
                    step >= s.step
                      ? "bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-md shadow-pink-400/30"
                      : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > s.step ? <CheckCircle className="w-4 h-4" /> : s.step}
                </div>
                <span
                  className={`text-sm hidden sm:inline ${
                    step >= s.step
                      ? "text-pink-500 font-medium"
                      : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {/* Step 1: Cart Review */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-pink-100/50">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-lg font-semibold text-[#1c2533] flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-br from-pink-100 to-pink-50 rounded-lg flex items-center justify-center">
                          <ShoppingBag className="w-3.5 h-3.5 text-pink-500" />
                        </div>
                        سلة التسوق
                      </h2>
                      <span className="text-sm text-gray-400">
                        {cartItems.length} منتجات
                      </span>
                    </div>

                    <div className="divide-y divide-pink-50">
                      {cartItems.map((item) => (
                        <CartItem
                          key={item.id}
                          item={item}
                          updateQuantity={updateQuantity}
                          removeItem={removeItem}
                        />
                      ))}
                    </div>

                    {cartItems.length === 0 && (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto bg-pink-50 rounded-2xl flex items-center justify-center mb-4">
                          <Heart className="w-6 h-6 text-pink-300" />
                        </div>
                        <p className="text-gray-400">سلة التسوق فارغة</p>
                        <button
                          onClick={() => navigate("/")}
                          className="mt-5 px-6 py-2 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-sm rounded-xl shadow-md hover:shadow-lg transition-all"
                        >
                          تسوق الآن
                        </button>
                      </div>
                    )}
                  </div>

                  {cartItems.length > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStep(2)}
                      className="w-full py-4 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-xl font-semibold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      متابعة الشحن والتأكيد
                    </motion.button>
                  )}
                </motion.div>
              )}

              {/* Step 2: Shipping Information */}
              {step === 2 && (
                <ShippingStep
                  key="shipping"
                  cartItems={cartItems}
                  onSuccess={handleOrderSuccess}
                  onBack={() => setStep(1)}
                />
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:w-96">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="sticky top-24 bg-gradient-to-br from-white to-pink-50/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-6 border border-pink-100"
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-pink-100">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-400 rounded-xl flex items-center justify-center shadow-md shadow-pink-200">
                    <Gem className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      ملخص الطلب
                    </h3>
                    <p className="text-xs text-gray-400">تفاصيل المشتريات</p>
                  </div>
                </div>
                <div className="bg-pink-100/50 px-3 py-1.5 rounded-full">
                  <span className="text-xs text-pink-600 font-medium">
                    {cartItems.length} منتجات
                  </span>
                </div>
              </div>

              {/* Price Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-500 text-sm">المجموع الفرعي</span>
                  <span className="text-gray-800 font-medium">
                    {subtotal} ج.م
                  </span>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-dashed border-pink-100">
                  <span className="text-gray-500 text-sm">رسوم الشحن</span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-800 font-medium">
                      {shippingCost} ج.م
                    </span>
                   
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-3 mt-2">
                  <span className="text-gray-800 font-bold text-lg">
                    الإجمالي
                  </span>
                  <div className="text-right">
                    <span className="text-pink-500 font-bold text-2xl">
                      {total} ج.م
                    </span>
                    <p className="text-[10px] text-gray-400">شامل الضريبة</p>
                  </div>
                </div>
              </div>

              {/* Features Grid */}
              <div className="grid grid-cols-3 gap-2 mt-6 pt-4 border-t border-pink-100">
                <div className="text-center p-2 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 mx-auto bg-pink-50 rounded-lg flex items-center justify-center mb-1">
                    <Shield className="w-4 h-4 text-pink-500" />
                  </div>
                  <p className="text-[10px] text-gray-600">دفع آمن</p>
                </div>

                <div className="text-center p-2 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 mx-auto bg-pink-50 rounded-lg flex items-center justify-center mb-1">
                    <Clock className="w-4 h-4 text-pink-500" />
                  </div>
                  <p className="text-[10px] text-gray-600">توصيل سريع</p>
                </div>

                <div className="text-center p-2 rounded-xl bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 mx-auto bg-pink-50 rounded-lg flex items-center justify-center mb-1">
                    <Gem className="w-4 h-4 text-pink-500" />
                  </div>
                  <p className="text-[10px] text-gray-600">أصلي 100%</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
