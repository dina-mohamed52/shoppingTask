import { useState, useMemo, useEffect } from "react";
import { Data } from "../../data/Data";
import { useTranslation } from "react-i18next";
import {
  ShoppingBag,
  CheckCircle,
  Package,
  Palette,
  Ruler,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useCart } from "../cart/CartContext";
import { toast } from "react-toastify";

function OrderCollection({ selectedOffer, formRef }) {
  const { t } = useTranslation();
  const count = selectedOffer?.value || 0;
  const { addToCart } = useCart();
  // إنشاء مصفوفة منفصلة للكولونات فقط
  const colonProducts = useMemo(() => {
    return Data.filter((product) => product.name.includes("كولون"));
  }, []);

  const initialPieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: "",
      size: "",
      color: "",
    }));
  }, [count]);

  const [pieces, setPieces] = useState(initialPieces);
  const [completedPieces, setCompletedPieces] = useState({});
  const [openDropdown, setOpenDropdown] = useState({ type: null, id: null });

  useEffect(() => {
    // تحديث حالة القطع المكتملة
    const completed = {};
    pieces.forEach((piece) => {
      completed[piece.id] = !!(piece.name && piece.size && piece.color);
    });
    setCompletedPieces(completed);
  }, [pieces]);

  const getAvailableSizes = (productName) => {
    const product = Data.find((item) => item.name === productName);

    const allSizes = [
      "0-1",
      "1-2",
      "2-4",
      "4-6",
      "6-8",
      "8-10",
      "10-12",
      "12-14",
    ];

    if (!product) return allSizes;

    if (product.id === 8) {
      return allSizes.slice(2);
    }

    if (product.id === 11) {
      return allSizes.slice(0, 7);
    }

    return allSizes;
  };

  useEffect(() => {
    setPieces(initialPieces);
  }, [initialPieces]);

  const handleChange = (id, field, value) => {
    const updated = pieces.map((p) =>
      p.id === id ? { ...p, [field]: value } : p,
    );
    setPieces(updated);
  
    // addToCart(updated);
    setOpenDropdown({ type: null, id: null });
  };

 const handleSubmit = (e) => {
  e.preventDefault();

  const invalid = pieces.some((p) => !p.name || !p.size || !p.color);

  if (invalid) {
    alert(t("orderCollection.alert"));
    return;
  }

  addToCart([
  {
    id: Date.now(), 
    name: selectedOffer?.name,
    price: selectedOffer?.price,
    quantity: 1,
    items: pieces,
  },
]);

  toast.success("تم إضافة الطلب للكارت ✅");

  setPieces(initialPieces);
  setCompletedPieces({});
};
  const getAvailableColors = (productName) => {
    const product = Data.find((item) => item.name === productName);
    return product ? product.avalibeColors : [];
  };

  // دالة لتحويل اسم اللون العربي إلى كود لون
  const getColorCode = (colorName) => {
    const colorMap = {
      أبيض: "#FFFFFF",
      أسود: "#000000",
      رمادي: "#808080",
      روز: "#FFC0CB",
      بينك: "#FF69B4",
      كحلي: "#000080",
      بيج: "#F5F5DC",
      لبني: "#FDF5E6",
      default: "#CCCCCC",
    };
    return colorMap[colorName] || colorMap.default;
  };

  // حساب نسبة الإكتمال
  const completionPercentage = useMemo(() => {
    const completed = Object.values(completedPieces).filter(Boolean).length;
    return (completed / pieces.length) * 100;
  }, [completedPieces, pieces.length]);

  // Custom Dropdown Component
  const CustomDropdown = ({
    id,
    field,
    value,
    options,
    placeholder,
    icon: Icon,
    disabled = false,
    getOptionLabel = (opt) => opt,
    getOptionValue = (opt) => opt,
    renderOption = null,
  }) => {
    const isOpen = openDropdown.type === field && openDropdown.id === id;
    const selectedOption = options.find((opt) => getOptionValue(opt) === value);

    const toggleDropdown = () => {
      if (disabled) return;
      setOpenDropdown(isOpen ? { type: null, id: null } : { type: field, id });
    };

    const handleSelect = (optionValue) => {
      handleChange(id, field, optionValue);
    };

    return (
      <div className="relative w-full">
        {/* Dropdown Button */}
        <button
          type="button"
          onClick={toggleDropdown}
          disabled={disabled}
          className={`w-full flex items-center justify-between gap-2 px-4 py-3.5 rounded-xl border-2 transition-all duration-300 ${
            isOpen
              ? "border-pink-500 bg-gray-800/80 shadow-lg shadow-pink-500/20"
              : value
                ? "border-pink-500/50 bg-gray-800/50 hover:border-pink-500"
                : "border-gray-700 bg-gray-800/30 hover:border-gray-600"
          } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
        >
          <div className="flex items-center gap-3">
            <Icon
              className={`w-5 h-5 ${value ? "text-pink-400" : "text-gray-500"}`}
            />
            <span className={`${value ? "text-gray-200" : "text-gray-500"}`}>
              {selectedOption ? getOptionLabel(selectedOption) : placeholder}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {value && field === "color" && (
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: getColorCode(value) }}
              ></div>
            )}
            {isOpen ? (
              <ChevronUp className="w-4 h-4 text-pink-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-500" />
            )}
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Backdrop for closing on click outside */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setOpenDropdown({ type: null, id: null })}
            />

            {/* Dropdown Options */}
            <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-pink-500/30 rounded-xl shadow-2xl overflow-hidden backdrop-blur-sm">
              <div className="max-h-60 overflow-y-auto custom-scrollbar">
                {options.length > 0 ? (
                  options.map((option, index) => {
                    const optionValue = getOptionValue(option);
                    const isSelected = optionValue === value;

                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSelect(optionValue)}
                        className={`w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 hover:bg-gradient-to-r hover:from-pink-500/20 hover:to-pink-600/20 ${
                          isSelected
                            ? "bg-gradient-to-r from-pink-500/30 to-pink-600/30 border-r-4 border-pink-500"
                            : ""
                        }`}
                      >
                        {field === "color" && (
                          <div
                            className="w-6 h-6 rounded-full border-2 border-white shadow-md"
                            style={{ backgroundColor: getColorCode(option) }}
                          />
                        )}

                        {renderOption ? (
                          renderOption(option)
                        ) : (
                          <span
                            className={`flex-1 text-right ${isSelected ? "text-pink-400 font-medium" : "text-gray-300"}`}
                          >
                            {getOptionLabel(option)}
                          </span>
                        )}

                        {isSelected && (
                          <CheckCircle className="w-4 h-4 text-pink-400" />
                        )}
                      </button>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500">
                    {t("orderCollection.noOptions", "لا توجد خيارات متاحة")}
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 md:p-6 lg:p-8" id="orderCollection">
      <div className="relative max-w-7xl mx-auto">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute top-0 left-0 w-64 h-64 bg-pink-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-gray-500 rounded-full filter blur-3xl"></div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          {pieces.length > 0 && (
            <>
              {/* Header with Progress */}
              <div className="mb-10 text-center">
                {/* Main Title */}
                <div className="relative inline-block mb-4">
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-xl opacity-30"></div>
                  <div className="relative bg-gradient-to-r from-gray-900 to-gray-800 px-8 py-4 rounded-full border border-pink-500/30 shadow-2xl">
                    <div className="flex items-center gap-3">
                      <Package className="w-6 h-6 text-pink-400 animate-pulse" />
                      <h1 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-300 to-white">
                        {t("orderCollection.step", { count: pieces.length })}
                      </h1>
                      <ShoppingBag className="w-6 h-6 text-pink-400 animate-pulse" />
                    </div>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="max-w-2xl mx-auto">
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>
                      {t("orderCollection.completed", "القطع المكتملة")}
                    </span>
                    <span className="text-pink-400 font-bold">
                      {Object.values(completedPieces).filter(Boolean).length}/
                      {pieces.length}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                    <div
                      className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full transition-all duration-500 relative"
                      style={{ width: `${completionPercentage}%` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pieces Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-2">
                {pieces.map((piece) => {
                  const colors = getAvailableColors(piece.name);
                  const isCompleted = piece.name && piece.size && piece.color;

                  return (
                    <div
                      key={piece.id}
                      className={`group relative bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-2xl border-2 transition-all duration-500 ${
                        isCompleted
                          ? "border-pink-500 shadow-xl shadow-pink-500/20"
                          : "border-gray-700 hover:border-pink-500/50"
                      }`}
                    >
                      {/* Glow Effect on Hover */}
                      <div
                        className={`absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}
                      ></div>

                      {/* Piece Number Badge */}
                      <div className="absolute -top-3 -right-3 z-10">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-md opacity-50"></div>
                          <div className="relative bg-gradient-to-r from-pink-500 to-pink-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm shadow-lg border border-pink-300/30">
                            {piece.id}
                          </div>
                        </div>
                      </div>

                      {/* Completed Check */}
                      {isCompleted && (
                        <div className="absolute -top-3 -left-3 z-10">
                          <div className="relative">
                            <div className="absolute inset-0 bg-green-500 rounded-full blur-md opacity-50"></div>
                            <div className="relative bg-green-500 text-white rounded-full p-1">
                              <CheckCircle className="w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      )}

                      <h2 className="text-center text-lg font-bold mb-4 text-gray-200 border-b border-gray-700 pb-2">
                        {t("orderCollection.pieceNumber", { id: piece.id })}
                      </h2>

                      <div className="space-y-4">
                        {/* Product Dropdown - الآن يستخدم colonProducts بدلاً من Data */}
                        <CustomDropdown
                          id={piece.id}
                          field="name"
                          value={piece.name}
                          options={colonProducts} // تم التغيير هنا
                          placeholder={t("orderCollection.selectProduct")}
                          icon={ShoppingBag}
                          getOptionLabel={(product) => product.name}
                          getOptionValue={(product) => product.name}
                        />

                        {/* Size Dropdown */}
                        <CustomDropdown
                          id={piece.id}
                          field="size"
                          value={piece.size}
                          options={getAvailableSizes(piece.name)}
                          placeholder={t("orderCollection.selectSize")}
                          icon={Ruler}
                          disabled={!piece.name}
                          getOptionLabel={(size) => t(`sizes.${size}`)}
                        />

                        {/* Color Dropdown */}
                        <CustomDropdown
                          id={piece.id}
                          field="color"
                          value={piece.color}
                          options={colors}
                          placeholder={t("orderCollection.selectColor")}
                          icon={Palette}
                          disabled={!piece.name}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center items-center mt-10">
                <div className="relative group">
                  {/* Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>

                  <button
                    type="submit"
                    className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl border border-pink-500/30 hover:scale-105 active:scale-95 transition-all duration-300 overflow-hidden group/btn"
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 translate-x-[-100%] group-hover/btn:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000"></div>

                    <span className="relative z-10 flex items-center gap-3 text-lg">
                      <ShoppingBag className="w-5 h-5 text-pink-400" />
                      {t("orderCollection.confirmOrder")}
                      <span className="text-pink-400 text-xl">✨</span>
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </form>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #ec4899, #db2777);
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #f472b6, #ec4899);
        }
      `}</style>
    </div>
  );
}

export default OrderCollection;
