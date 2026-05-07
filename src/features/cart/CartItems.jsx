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
        className="bg-white rounded-2xl shadow-md border border-rose-100 overflow-hidden mb-4"
      >
        {/* Header - معلومات العرض */}
        <div className="p-4 border-b border-rose-100">
          <div className="flex gap-4">
            {/* صورة العرض (أول قطعة) */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover bg-rose-50 border border-rose-100"
            />
            
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs bg-pink-100 text-pink-600 px-2 py-0.5 rounded-full">
                      عرض خاص
                    </span>
                    <span className="text-xs text-gray-400">
                      {item.offerDetails?.totalPieces || 0} قطع
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">
                  عرض  {item.name}  
                  </h3>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-gray-300 hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="flex justify-between items-center mt-3">
                <div className="flex items-center gap-2">
                
                
                
                </div>
                <div className="text-right">
                  <p className="text-pink-500 font-bold">
                    {item.price * item.quantity} ج.م
                  </p>
                  {item.originalPrice && (
                    <p className="text-gray-400 text-xs line-through">
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
            className="w-full px-4 py-2.5 flex items-center justify-between bg-rose-50/50 hover:bg-rose-50 transition-colors"
          >
            <span className="text-xs text-gray-600 font-medium flex items-center gap-2">
              🎁 تفاصيل العرض ({item.offerDetails?.pieces?.length || 0} قطعة)
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
              className="p-4 space-y-3 bg-gray-50/30"
            >
              {item.offerDetails?.pieces?.map((piece, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 shadow-sm">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={piece.image}
                      alt={piece.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">{piece.name}</p>
                    <div className="flex gap-2 mt-1.5">
                      <span className="text-xs text-gray-500 bg-rose-50 px-2 py-0.5 rounded-full">
                        🎨 {piece.color}
                      </span>
                      <span className="text-xs text-gray-500 bg-rose-50 px-2 py-0.5 rounded-full">
                        📏 مقاس {piece.size}
                      </span>
                    </div>
                  </div>
                  <div className="text-pink-500 text-xs font-medium bg-pink-50 px-2 py-1 rounded-full">
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
      className="bg-white rounded-2xl shadow-md border border-rose-100 p-4 mb-4"
    >
      <div className="flex gap-4">
        <img
          src={item.image}
          alt={item.name}
          className="w-20 h-20 rounded-xl object-cover bg-rose-50 border border-rose-100"
        />
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              {item.nameEn && (
                <p className="text-gray-400 text-xs mt-0.5">{item.nameEn}</p>
              )}
              {(item.size || item.color) && (
                <div className="flex gap-2 mt-2">
                  {item.size && (
                    <span className="text-xs text-gray-500 bg-rose-50 px-2 py-0.5 rounded-lg">
                      المقاس: {item.size}
                    </span>
                  )}
                  {item.color && (
                    <span className="text-xs text-gray-500 bg-rose-50 px-2 py-0.5 rounded-lg">
                      اللون: {item.color}
                    </span>
                  )}
                </div>
              )}
            </div>
            <button
              onClick={() => removeItem(item.id)}
              className="text-gray-300 hover:text-red-500 transition-colors p-1"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex justify-between items-center mt-3">
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
            <div className="text-right">
              <p className="text-pink-500 font-semibold">
                {item.price * item.quantity} ج.م
              </p>
              {item.originalPrice && (
                <p className="text-gray-400 text-xs line-through">
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