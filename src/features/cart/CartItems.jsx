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
        className="bg-white rounded-xl shadow-md border border-rose-100 overflow-hidden mb-2"
      >
        {/* Header - معلومات العرض */}
        <div className="p-3 border-b border-rose-100">
          <div className="flex gap-3">
            {/* صورة العرض (أول قطعة) */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-lg object-cover bg-rose-50 border border-rose-100 flex-shrink-0"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-1">
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1 flex-shrink-0 -mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-1 mb-1">
                    <span className="text-[10px] bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full whitespace-nowrap">
                      عرض خاص
                    </span>
                    <span className="text-[10px] text-gray-400 whitespace-nowrap">
                      {item.offerDetails?.totalPieces || 0} قطع
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-sm leading-tight">
                    {item.name}  
                  </h3>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="text-left">
                  <p className="text-pink-500 font-bold text-sm">
                    {item.price * item.quantity} ج.م
                  </p>
                  {item.originalPrice && (
                    <p className="text-gray-400 text-[10px] line-through">
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
            className="w-full px-3 py-2 flex items-center justify-between bg-rose-50/50 hover:bg-rose-50 transition-colors"
          >
            <span className="text-xs text-gray-600 font-medium flex items-center gap-1">
              <span>🎁</span>
              تفاصيل العرض ({item.offerDetails?.pieces?.length || 0} قطعة)
            </span>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-gray-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-400" />
            )}
          </button>
          
          {expanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-3 space-y-2 bg-gray-50/30"
            >
              {item.offerDetails?.pieces?.map((piece, idx) => (
                <div key={idx} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={piece.image}
                      alt={piece.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-gray-800 truncate">
                      {piece.name}
                    </p>
                    <div className="flex flex-col gap-0.5 mt-0.5">
                      {piece.color && (
                        <span className="text-[10px] text-gray-500 bg-rose-50 px-1.5 py-0.5 rounded-full w-fit">
                          اللون: {piece.color}
                        </span>
                      )}
                      {piece.size && (
                        <span className="text-[10px] text-gray-500 bg-rose-50 px-1.5 py-0.5 rounded-full w-fit">
                          المقاس: {piece.size}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-pink-500 text-[10px] font-medium bg-pink-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    #{piece.id}
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
      className="bg-white rounded-xl shadow-md border border-rose-100 p-3 mb-2"
    >
      <div className="flex gap-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-lg object-cover bg-rose-50 border border-rose-100 flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-1">
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-300 hover:text-red-500 transition-colors p-1 flex-shrink-0 -mt-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-gray-800 text-sm leading-tight">
                {item.name}
              </h3>
              {item.nameEn && (
                <p className="text-gray-400 text-[10px] mt-0.5 truncate">
                  {item.nameEn}
                </p>
              )}
              
              {/* 👇 اللون والمقاس في سطرين منفصلين */}
              <div className="flex flex-col gap-0.5 mt-1.5">
                {item.color && (
                  <span className="text-[11px] text-gray-600 bg-rose-50 px-2 py-0.5 rounded-lg inline-block w-fit">
                    اللون: {item.color}
                  </span>
                )}
                {item.size && (
                  <span className="text-[11px] text-gray-600 bg-rose-50 px-2 py-0.5 rounded-lg inline-block w-fit">
                    المقاس: {item.size}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col gap-1.5 mt-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded-lg border border-rose-200 hover:border-pink-500 hover:bg-rose-50 transition-all flex items-center justify-center"
                >
                  <Minus className="w-3.5 h-3.5 text-gray-500" />
                </button>
                <span className="text-gray-700 w-8 text-center text-sm font-medium">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded-lg border border-rose-200 hover:border-pink-500 hover:bg-rose-50 transition-all flex items-center justify-center"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-500" />
                </button>
              </div>
              <div className="text-left">
                <p className="text-pink-500 font-semibold text-sm">
                  {item.price * item.quantity} ج.م
                </p>
                {item.originalPrice && (
                  <p className="text-gray-400 text-[10px] line-through">
                    {item.originalPrice * item.quantity} ج.م
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default CartItem;