import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ChevronDown, ChevronUp, Package, Shirt, Layers } from "lucide-react";
import { useState } from "react";

function CartItem({ item, updateQuantity, removeItem }) {
  const [expanded, setExpanded] = useState(false);

  // عرض خاص للعروض (isOffer = true)
  if (item.isOffer) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-rose-100 overflow-hidden mb-3 sm:mb-4"
      >
        {/* Header - معلومات العرض */}
        <div className="p-3 sm:p-4 border-b border-rose-100">
          <div className="flex gap-3 sm:gap-4">
            {/* صورة العرض (أول قطعة) */}
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl object-cover bg-rose-50 border border-rose-100 flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1">
                    <span className="text-[10px] sm:text-xs bg-pink-100 text-pink-600 px-1.5 sm:px-2 py-0.5 rounded-full whitespace-nowrap">
                      عرض خاص
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 whitespace-nowrap">
                      {item.offerDetails?.totalPieces || 0} قطع
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm sm:text-lg break-words">
                    {item.name}  
                  </h3>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1 flex-shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>
              </div>
              
              <div className="flex justify-between items-center mt-2 sm:mt-3">
                <div className="flex items-center gap-2"></div>
                <div className="text-right">
                  <p className="text-pink-500 font-bold text-sm sm:text-base">
                    {item.price * item.quantity} ج.م
                  </p>
                  {item.originalPrice && (
                    <p className="text-gray-400 text-[10px] sm:text-xs line-through">
                      {item.originalPrice * item.quantity} ج.م
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* تفاصيل القطع - قابلة للطي */}
        <div>
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full px-3 sm:px-4 py-2 sm:py-2.5 flex items-center justify-between bg-rose-50/50 hover:bg-rose-50 transition-colors"
          >
            <span className="text-[11px] sm:text-xs text-gray-600 font-medium flex items-center gap-1.5 sm:gap-2">
              <span className="text-base sm:text-lg">🎁</span>
              تفاصيل العرض ({item.offerDetails?.pieces?.length || 0} قطعة)
            </span>
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
            )}
          </button>
          
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 sm:p-4 space-y-2 sm:space-y-3 bg-gray-50/30"
            >
              {item.offerDetails?.pieces?.map((piece, idx) => (
                <div key={idx} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-white rounded-lg sm:rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={piece.image}
                      alt={piece.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-800 break-words">{piece.name}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1 sm:mt-1.5">
                      <span className="text-[10px] sm:text-xs text-gray-500 bg-rose-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                        🎨 {piece.color}
                      </span>
                      <span className="text-[10px] sm:text-xs text-gray-500 bg-rose-50 px-1.5 sm:px-2 py-0.5 rounded-full">
                        📏 {piece.size}
                      </span>
                    </div>
                  </div>
                  <div className="text-pink-500 text-[10px] sm:text-xs font-medium bg-pink-50 px-1.5 sm:px-2 py-1 rounded-full whitespace-nowrap">
                    قطعة #{piece.id}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  }

  // عرض عادي للمنتجات الفردية
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-rose-100 p-3 sm:p-4 mb-3 sm:mb-4"
    >
      <div className="flex gap-3 sm:gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg sm:rounded-xl object-cover bg-rose-50 border border-rose-100 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base break-words">
                {item.name}
              </h3>
              {item.nameEn && (
                <p className="text-gray-400 text-[10px] sm:text-xs mt-0.5 break-words">
                  {item.nameEn}
                </p>
              )}
              {(item.size || item.color) && (
                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
                  {item.size && (
                    <span className="text-[10px] sm:text-xs text-gray-500 bg-rose-50 px-1.5 sm:px-2 py-0.5 rounded-lg whitespace-nowrap">
                      {item.size}
                    </span>
                  )}
                  {item.color && (
                    <span className="text-[10px] sm:text-xs text-gray-500 bg-rose-50 px-1.5 sm:px-2 py-0.5 rounded-lg whitespace-nowrap">
                      {item.color}
                    </span>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-300 hover:text-red-500 transition-colors p-1 flex-shrink-0"
            >
              <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0 mt-2 sm:mt-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                className="w-7 h-7 rounded-lg border border-rose-200 hover:border-pink-500 hover:bg-rose-50 transition-all flex items-center justify-center"
              >
                <Minus className="w-3 h-3 text-gray-500" />
              </button>
              <span className="text-gray-700 w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="w-7 h-7 rounded-lg border border-rose-200 hover:border-pink-500 hover:bg-rose-50 transition-all flex items-center justify-center"
              >
                <Plus className="w-3 h-3 text-gray-500" />
              </button>
            </div>
            <div className="text-right w-full sm:w-auto">
              <p className="text-pink-500 font-semibold text-sm sm:text-base">
                {item.price * item.quantity} ج.م
              </p>
              {item.originalPrice && (
                <p className="text-gray-400 text-[10px] sm:text-xs line-through">
                  {item.originalPrice * item.quantity} ج.م
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CartItem;