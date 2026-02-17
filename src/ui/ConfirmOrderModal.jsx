import { Modal } from "antd";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { 
  ClockIcon, 
  PhoneIcon, 
  CheckCircleIcon,
  ShoppingBagIcon,
  SparklesIcon
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
        {/* Success Animation with theme colors */}
        <div className="absolute -top-20 left-1/2 transform  -translate-x-1/2">
          <div className="relative">
            <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg shadow-yellow-200">
                <CheckCircleIcon className="w-10 h-10 text-gray-800" />
              </div>
            </div>
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

          {/* Order Details Card with theme border */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-2xl p-6 mb-6 border border-yellow-200/80 shadow-lg shadow-yellow-100/50">
            {/* Delivery Time */}
            <div className="flex items-center justify-between py-3 border-b border-gray-200/60">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <ClockIcon className="w-4 h-4 text-gray-800" />
                </div>
                <span className="text-gray-600 font-medium">{t("confirmOrder.deliveryTime")}</span>
              </div>
             
            </div>

           
          </div>

          {/* Info Cards with theme colors */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50/50 p-4 rounded-xl border border-yellow-200/60 group hover:border-yellow-400 transition-all duration-300 hover:shadow-md hover:shadow-yellow-100">
              <CheckCircleIcon className="w-6 h-6 text-gray-800 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-xs font-medium text-gray-600">{t("confirmOrder.preview")}</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-amber-50/50 p-4 rounded-xl border border-yellow-200/60 group hover:border-yellow-400 transition-all duration-300 hover:shadow-md hover:shadow-yellow-100">
              <ShoppingBagIcon className="w-6 h-6 text-gray-800 mb-2 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <p className="text-xs font-medium text-gray-600">{t("confirmOrder.rejection")}</p>
            </div>
          </div>

          {/* Thanks Message with theme accent */}
          <div className="mb-8 relative">
            <SparklesIcon className="w-5 h-5 text-yellow-400 absolute -left-2 -top-2" />
            <p className="text-gray-800 font-medium text-lg">
              {t("confirmOrder.thanks1")}
            </p>
            <p className="text-gray-500 text-sm mt-1">
              {t("confirmOrder.thanks2")}
            </p>
            <SparklesIcon className="w-5 h-5 text-yellow-400 absolute -right-2 -bottom-2" />
          </div>

          {/* Action Button with theme colors */}
          <button
            onClick={onClose}
            className="w-full bg-gray-800 text-yellow-400 font-semibold py-4 px-6 rounded-2xl hover:bg-gray-900 transition-all duration-300 shadow-lg shadow-gray-200/50 hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 border-2 border-yellow-400/20 hover:border-yellow-400/40"
          >
            {t("confirmOrder.gotIt")}
          </button>

          {/* Decorative Elements with theme color */}
          <div className="flex justify-center gap-2 mt-6">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1.5 h-1.5 bg-yellow-400 rounded-full"
                style={{ opacity: 0.3 + i * 0.25 }}
              />
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .confirm-order-modal :global(.ant-modal-content) {
          border-radius: 2rem;
          overflow: hidden;
          box-shadow: 0 30px 60px -15px rgba(250, 204, 21, 0.2);
          animation: slideUp 0.4s ease-out;
          border: 1px solid rgba(250, 204, 21, 0.2);
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
      `}</style>
    </Modal>
  );
}

ConfirmOrderModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};