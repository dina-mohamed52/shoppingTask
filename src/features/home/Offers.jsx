const offerDetails = [
  { quantity: "4 قطع", price: "300 ج" },
  { quantity: "6 قطع", price: "420 ج" },
  { quantity: "8 قطع", price: "540 ج" },
  { quantity: "دسته 12 قطعة", price: "750 ج" },
];

function Offers() {
  return (
    <div className="bg-gray-900 rounded-3xl shadow-xl max-w-4xl mx-auto my-12 p-10 border border-yellow-400 relative overflow-hidden">
      {/* خلفية شكلية */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-gray-900/30 pointer-events-none"></div>

      {/* العنوان */}
      <h3 className="relative z-10 text-yellow-400 sm:text-4xl text-2xl font-extrabold mb-6 text-center tracking-wide">
        عروض الكولونات الشتوية للأطفال
      </h3>

      {/* وصف العرض */}
      <p className="relative z-10 text-gray-300 text-lg leading-relaxed mb-10 text-center max-w-2xl mx-auto">
        بأفضل خامة شتوي وتقفيل لكولونات الأطفال، <br />
        <span className="text-yellow-300 font-medium">
          الخامة 90% قطن تقيل + 10% ليكرا معالج
        </span>{" "}
        ✨ ضد الحساسية وناعمة على البشرة. <br /> متوفر بمقاسات من حديث الولادة حتى 14 سنة.
      </p>

      {/* الكروت */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        {offerDetails.map((offer, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-2xl shadow-md p-8 text-center transition-transform transform hover:scale-105 hover:shadow-2xl border border-yellow-500/40"
          >
            <strong className="text-yellow-300 text-2xl block mb-3 font-semibold">
              {offer.quantity}
            </strong>
            <span className="text-yellow-400 font-bold text-xl">
              بسعر {offer.price} 💛
            </span>
          </div>
        ))}
      </div>

      {/* النص الختامي */}
      <p className="relative z-10 text-gray-400 text-base leading-relaxed mt-8 text-center">
        متاح تشكيل ألوان وأشكال ومقاسات مختلفة. <br />
        <span className="text-yellow-300">معاينة قبل الاستلام</span> للتأكيد على الجودة والمقاس ✅
      </p>
    </div>
  );
}

export default Offers;
