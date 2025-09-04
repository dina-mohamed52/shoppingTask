import { useState, useMemo } from "react";
import { Data } from "../../data/Data";

function OrderCollection({ selectedOffer, setOrder, formRef }) {
  const count = selectedOffer?.value || 0;

  const initialPieces = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i + 1,
      name: "",
      size: "",
      color: "",
    }));
  }, [count]);

  const [pieces, setPieces] = useState(initialPieces);

  const getAvailableSizes = (productName) => {
    const product = Data.find((item) => item.name === productName);

    // كل المقاسات
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
      // يبدأ من 2-4
      return allSizes.slice(2);
    }

    if (product.id === 11) {
      // لحد 10-12
      return allSizes.slice(0, 7);
    }

    return allSizes;
  };

  // ✅ لما الـ count يتغير (عرض جديد) نعيد تهيئة القطع
  if (pieces.length !== count) {
    setPieces(initialPieces);
  }

  const handleChange = (id, field, value) => {
    const updated = pieces.map((p) =>
      p.id === id ? { ...p, [field]: value } : p
    );
    setPieces(updated);
    setOrder(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // لو أي قطعة ناقصة حاجة
    const invalid = pieces.some((p) => !p.name || !p.size || !p.color);

    if (invalid) {
      alert("⚠️ لازم تختاري المنتج + المقاس + اللون لكل القطع قبل تأكيد الطلب");
      return;
    }

    // ✅ هنا بيعمل Scroll للفورم
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getAvailableColors = (productName) => {
    const product = Data.find((item) => item.name === productName);
    return product ? product.avalibeColors : [];
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        {pieces.length > 0 && (
          <>
            <h1 className="text-center text-xl font-bold mb-6 text-yellow-400">
              ✨ الخطوة 2: اختاري منتجاتك ({pieces.length} قطع)
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              {pieces.map((piece) => {
                const colors = getAvailableColors(piece.name);
                return (
                  <div
                    key={piece.id}
                    className="bg-gray-800 p-6 rounded-xl border border-gray-300"
                  >
                    <h2 className="font-bold text-center mb-2">
                      القطعة رقم {piece.id}
                    </h2>

                    <select
                      value={piece.name}
                      onChange={(e) =>
                        handleChange(piece.id, "name", e.target.value)
                      }
                      className="w-full bg-gray-800 mb-2 p-2 rounded-lg border border-gray-300"
                    >
                      <option value="">اختاري الكولون</option>
                      {Data.map((product) => (
                        <option key={product.id} value={product.name}>
                          {product.name}
                        </option>
                      ))}
                    </select>

                    <select
                      value={piece.size}
                      onChange={(e) =>
                        handleChange(piece.id, "size", e.target.value)
                      }
                      className="w-full bg-gray-800 mb-2 p-2 rounded-lg border border-gray-300"
                    >
                      <option value="">اختاري المقاس</option>
                      {getAvailableSizes(piece.name).map((size, i) => (
                        <option key={i} value={size}>
                          مقاس {size}
                        </option>
                      ))}
                    </select>

                    <select
                      value={piece.color}
                      onChange={(e) =>
                        handleChange(piece.id, "color", e.target.value)
                      }
                      disabled={!piece.name}
                      className="w-full p-2 bg-gray-800 rounded-lg border border-gray-300"
                    >
                      <option value="">اختاري اللون</option>
                      {colors.map((c, i) => (
                        <option key={i} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center items-center">
              <button
                type="submit"
                className="w-fit mt-6 py-5 px-10 rounded-2xl font-bold shadow-lg 
              bg-gradient-to-r from-yellow-400 via-gray-600 to-gray-800 
              text-yellow-400 tracking-wide
              hover:from-gray-700 hover:to-gray-800 
              hover:scale-105 hover:shadow-yellow-400/30 
              active:scale-95 transition-all duration-300"
              >
                🚀 تأكيد الطلب
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default OrderCollection;
