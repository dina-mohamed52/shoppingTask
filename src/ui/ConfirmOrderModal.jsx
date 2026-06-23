import { Modal } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { 
  ClockIcon, 
  PhoneIcon, 
  CheckCircleIcon,
  ShoppingBagIcon,
  SparklesIcon,
  HeartIcon,
  GiftIcon,
  StarIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function ConfirmOrderModal({ visible, onClose }) {
  const { t } = useTranslation();
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    if (visible) {
      // إنشاء تأثير احتفال بسيط
      const newConfetti = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        delay: Math.random() * 2,
        size: Math.random() * 10 + 5,
        color: i % 2 === 0 ? '#ec4899' : '#f472b6'
      }));
      setConfetti(newConfetti);
    }
  }, [visible]);

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={450}
      centered
      closable={false}
      className="confirm-order-modal"
    >
      <div className="relative bg-gradient-to-br from-white to-pink-50/30 rounded-2xl overflow-hidden">
        
        {/* Confetti Effect */}
        <AnimatePresence>
          {visible && confetti.map((c) => (
            <motion.div
              key={c.id}
              initial={{ y: -20, opacity: 1, rotate: 0 }}
              animate={{ y: 400, opacity: 0, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 3, delay: c.delay, ease: "easeOut" }}
              className="absolute pointer-events-none"
              style={{ 
                left: c.left, 
                top: -20,
                width: c.size,
                height: c.size,
                backgroundColor: c.color,
                borderRadius: '50%',
                zIndex: 10
              }}
            />
          ))}
        </AnimatePresence>

        {/* Decorative Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-200 rounded-full blur-3xl opacity-30"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-pink-300 rounded-full blur-3xl opacity-30"></div>
        </div>

        {/* Success Animation */}
        <div className="relative pt-16 pb-8 px-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="relative w-32 h-32 mx-auto -mt-8 mb-6"
          >
            {/* Glow Rings */}
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-xl opacity-30"
            />
            <motion.div
              animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
              className="absolute inset-2 bg-gradient-to-r from-pink-300 to-pink-400 rounded-full blur-lg opacity-20"
            />
            
            {/* Main Circle */}
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="relative w-full h-full bg-gradient-to-br from-pink-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-pink-200"
            >
              <CheckCircleIcon className="w-16 h-16 text-white" />
            </motion.div>

            {/* Floating Icons */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-4 -right-4"
            >
              <div className="bg-pink-100 p-2 rounded-full shadow-lg border border-pink-300">
                <GiftIcon className="w-4 h-4 text-pink-600" />
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2, delay: 0.3 }}
              className="absolute -bottom-4 -left-4"
            >
              <div className="bg-pink-100 p-2 rounded-full shadow-lg border border-pink-300">
                <StarIcon className="w-4 h-4 text-pink-600" />
              </div>
            </motion.div>
          </motion.div>

          {/* Title with Gradient */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-bold text-center mb-2"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-600 via-pink-500 to-pink-600">
              {t("confirmOrder.title")}
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-500 text-center mb-8"
          >
            {t("confirmOrder.subtitle")}
          </motion.p>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-pink-200 shadow-xl"
          >
            {/* Delivery Time */}
            <div className="flex items-center justify-between py-3 border-b border-pink-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 text-pink-600" />
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">{t("confirmOrder.deliveryTime")}</p>
                  <p className="text-xs text-gray-400">{t("confirmOrder.workingDays")}</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold px-4 py-2 rounded-full text-sm shadow-lg">
               5 {t("confirmOrder.workingDays")}
              </div>
            </div>

            {/* Customer Support */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-pink-200 rounded-xl flex items-center justify-center">
                  <PhoneIcon className="w-5 h-5 text-pink-600" />
                </div>
                <div className="text-right">
                  <p className="text-gray-600 text-sm">{t("confirmOrder.support")}</p>
                  <p className="text-xs text-gray-400">{t("confirmOrder.supportHours")}</p>
                </div>
              </div>
             
            </div>
          </motion.div>

          {/* Info Cards Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 gap-4 mb-8"
          >
            {[
              { icon: CheckCircleIcon, text: t("confirmOrder.preview"), color: "from-pink-400 to-pink-500" },
              { icon: ShoppingBagIcon, text: t("confirmOrder.rejection"), color: "from-pink-500 to-pink-600" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white rounded-xl p-4 text-center shadow-md border border-pink-100 cursor-pointer group"
              >
                <div className={`w-12 h-12 mx-auto mb-2 bg-gradient-to-br ${item.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all`}>
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <p className="text-sm font-medium text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Thanks Message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="relative mb-8 p-4 bg-gradient-to-r from-pink-50 to-pink-100/50 rounded-2xl border border-pink-200"
          >
            <HeartSolidIcon className="w-8 h-8 text-pink-400 absolute -left-2 -top-2 animate-pulse" />
            <p className="text-gray-800 font-medium text-center">
              {t("confirmOrder.thanks1")}
            </p>
            <p className="text-pink-600 text-sm text-center mt-1">
              {t("confirmOrder.thanks2")}
            </p>
            <HeartSolidIcon className="w-8 h-8 text-pink-400 absolute -right-2 -bottom-2 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </motion.div>

          {/* Action Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="relative w-full group overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            
            {/* Button */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white font-bold py-4 px-6 rounded-2xl shadow-2xl border border-pink-400/30">
              <span className="flex items-center justify-center gap-2 text-lg">
                <SparklesIcon className="w-6 h-6 text-pink-400" />
                {t("confirmOrder.gotIt")}
                <SparklesIcon className="w-6 h-6 text-pink-400" />
              </span>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
            </div>
          </motion.button>

          {/* Decorative Dots */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }}
                className="w-2 h-2 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full"
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .confirm-order-modal :global(.ant-modal-content) {
          background: transparent;
          box-shadow: none;
          border-radius: 2rem;
          overflow: hidden;
        }
        .confirm-order-modal :global(.ant-modal-body) {
          padding: 0;
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </Modal>
  );
}

ConfirmOrderModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};