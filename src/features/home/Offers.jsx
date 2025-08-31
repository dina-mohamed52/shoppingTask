const offerDetails = [
  { quantity: "4 قطع", price: "300 ج" },
  { quantity: "6 قطع", price: "420 ج", highlight: "الأكثر طلباً", color: "yellow-400" },
  { quantity: "8 قطع", price: "560 ج" },
  { quantity: "دسته 12 قطعة", price: "810 ج", highlight: "عرض التوفير", color: "green-100" },
];

function Offers() {
  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-4xl mx-auto my-12 p-8 sm:p-12 border border-yellow-400 relative overflow-hidden">
      {/* خلفية شكلية */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-gray-900/40 pointer-events-none"></div>

      {/* تاج "عروضنا" */}
      <div className="absolute sm:-top-0  -top-2 sm:-left-1 -left-4 bg-yellow-400
      
      text-gray-900 text-3xl sm:text-4xl font-extrabold px-8 py-3 rounded-xl shadow-2xl transform -rotate-12 z-20">
        عروضنا
      </div>

      {/* الكروت */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {offerDetails.map((offer, index) => (
          <div
            key={index}
            className={`relative bg-gray-800 rounded-3xl p-6 sm:p-8 flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-2xl border ${
              offer.highlight ? "border-yellow-300" : "border-yellow-600/10"
            }`}
          >
            {/* التاج الخاص بالعروض المميزة */}
            {offer.highlight && (
              <span
                className={`absolute -top-4 -right-4 bg-${offer.color} text-gray-900 font-bold px-4 py-1 rounded-full text-sm shadow-lg transform rotate-6`}
              >
                {offer.highlight}
              </span>
            )}

            <span className="text-yellow-300 text-xl font-semibold">{offer.quantity}</span>
            <span className="text-yellow-400 font-bold text-xl">{offer.price} 💛</span>
          </div>
        ))}
      </div>

      {/* النص الختامي */}
      <p className="relative z-10 text-gray-300 text-base sm:text-lg leading-relaxed mt-10 text-center">
        متاح تشكيل ألوان وأشكال ومقاسات مختلفة،{" "}
        <span className="text-yellow-300 font-semibold px-2"> معاينة قبل الاستلام</span> 
        للتأكيد على الجودة والمقاس ✅
      </p>
    </div>
  );
}

export default Offers;
