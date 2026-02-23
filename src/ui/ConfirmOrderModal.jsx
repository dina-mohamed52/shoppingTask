import { Modal } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { 
  ClockIcon, 
  PhoneIcon, 
  CheckCircleIcon,
  ShoppingBagIcon,
  SparklesIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

export default function ConfirmOrderModal({ visible, onClose }) {
  const { t } = useTranslation();

  return (
    <Modal
      open={visible}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
      closable={false}
      className="confirm-order-modal"
    >
      <div className="relative bg-white">
        {/* Success Animation with Pink theme */}
        <div className="absolute -top-20 left-1/2 transform -translate-x-1/2">
          <div className="relative">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full blur-xl opacity-30 animate-pulse"></div>
            
            {/* Main Circle */}
            <div className="w-24 h-24 bg-pink-50 rounded-full flex items-center justify-center animate-pulse relative border-2 border-pink-200">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg shadow-pink-200">
                <CheckCircleIcon className="w-10 h-10 text-white" />
              </div>
            </div>
            
            {/* Sparkle Icons */}
            <SparklesIcon className="w-5 h-5 text-pink-400 absolute -top-2 -right-2 animate-spin-slow" />
            <SparklesIcon className="w-4 h-4 text-pink-300 absolute -bottom-2 -left-2 animate-spin-slow" style={{ animationDelay: "0.5s" }} />
          </div>
        </div>

        {/* Content */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold pt-6 text-gray-800 mb-2">
            {t("confirmOrder.title")}
          </h2>
          <p className="text-gray-500 text-sm font-semibold mb-8">
            {t("confirmOrder.subtitle")}
          </p>

          {/* Order Details Card with Pink theme */}
          <div className="bg-gradient-to-br from-pink-50 to-gray-50 rounded-2xl p-6 mb-6 border border-pink-200 shadow-lg shadow-pink-100/50">
            {/* Delivery Time */}
            <div className="flex items-center justify-between py-3 border-b border-pink-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-100 rounded-xl flex items-center justify-center">
                  <ClockIcon className="w-4 h-4 text-pink-600" />
                </div>
                <span className="text-gray-600 font-medium">{t("confirmOrder.deliveryTime")}</span>
              </div>
              <span className="text-pink-600 font-bold bg-pink-100 px-3 py-1 rounded-full text-sm">
                24-48 {t("confirmOrder.hours")}
              </span>
            </div>

            {/* Customer Support */}
            <div className="flex items-center justify-between py-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-pink-100 rounded-xl flex items-center justify-center">
                  <PhoneIcon className="w-4 h-4 text-pink-600" />
                </div>
                <span className="text-gray-600 font-medium">{t("confirmOrder.support")}</span>
              </div>
              <a 
                href="tel:+201114219671" 
                className="text-pink-600 font-bold hover:text-pink-700 transition-colors"
              >
                01114219671
              </a>
            </div>
          </div>

          {/* Info Cards with Pink theme */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200 group hover:border-pink-400 transition-all duration-300 hover:shadow-md hover:shadow-pink-100">
              <CheckCircleIcon className="w-6 h-6 text-pink-600 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-xs font-medium text-gray-600">{t("confirmOrder.preview")}</p>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 p-4 rounded-xl border border-pink-200 group hover:border-pink-400 transition-all duration-300 hover:shadow-md hover:shadow-pink-100">
              <ShoppingBagIcon className="w-6 h-6 text-pink-600 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-xs font-medium text-gray-600">{t("confirmOrder.rejection")}</p>
            </div>
          </div>

          {/* Thanks Message with Pink theme */}
          <div className="mb-8 relative">
            <HeartIcon className="w-5 h-5 text-pink-400 absolute -left-2 -top-2 animate-pulse" />
            <p className="text-gray-800 font-medium text-lg">
              {t("confirmOrder.thanks1")}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {t("confirmOrder.thanks2")}
            </p>
            <HeartIcon className="w-5 h-5 text-pink-400 absolute -right-2 -bottom-2 animate-pulse" style={{ animationDelay: "0.5s" }} />
          </div>

          {/* Action Button with Pink theme */}
          <button
            onClick={onClose}
            className="relative group w-full overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-pink-500 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
            
            {/* Button */}
            <div className="relative bg-gradient-to-r from-gray-800 to-gray-900 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-pink-200/50 hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 border border-pink-400/30">
              <span className="flex items-center justify-center gap-2">
                <SparklesIcon className="w-5 h-5 text-pink-400" />
                {t("confirmOrder.gotIt")}
                <SparklesIcon className="w-5 h-5 text-pink-400" />
              </span>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>
            </div>
          </button>

          {/* Decorative Elements with Pink theme */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full animate-pulse"
                style={{ 
                  opacity: 0.2 + i * 0.15,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .confirm-order-modal :global(.ant-modal-content) {
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 30px 60px -15px rgba(236, 72, 153, 0.2);
          animation: slideUp 0.4s ease-out;
          border: 1px solid rgba(236, 72, 153, 0.2);
        }
        .confirm-order-modal :global(.ant-modal-body) {
          padding: 1.5rem;
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
    </Modal>
  );
}

ConfirmOrderModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};