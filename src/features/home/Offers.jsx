const offerDetails = [
  { quantity: "4 قطع", price: 300 ,value : 4 },
  { quantity: "6 قطع", price: 420, highlight: "الأكثر طلباً", color: "yellow-400",value:6 },
  { quantity: "8 قطع", price: 560 ,value:8},
  { quantity: "دسته 12 قطعة", price: 810, highlight: "عرض التوفير", color: "green-100",value:12 },
];


function Offers({setSelectedOffer}) {
  return (
    <div className="bg-gray-900 rounded-3xl shadow-2xl max-w-4xl mx-auto  my-24 p-8 sm:p-12 border border-yellow-400 relative overflow-hidden">
      {/* خلفية شكلية */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-transparent to-gray-900/40 pointer-events-none"></div>

      {/* تاج "عروضنا" */}
      <div className="absolute sm:-top-0  -top-2 sm:-left-1 -left-4 bg-yellow-400
      
      text-gray-900 text-2xl sm:text-3xl font-extrabold px-8 py-3 rounded-xl shadow-2xl transform -rotate-12 z-20">
        اختر عرضك 😉
      </div>

      {/* الكروت */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {offerDetails.map((offer, index) => (
          <div
          onClick={() => setSelectedOffer(offer)}
            key={index}
            className={`relative cursor-pointer bg-gray-800 rounded-3xl p-6 sm:p-8 flex justify-between items-center transition-transform transform hover:scale-105 hover:shadow-2xl border ${
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

            <span className="text-yellow-300 sm:text-xl text-sm font-semibold">{offer.quantity}</span>
            <span className="text-yellow-400 font-bold  sm:text-xl text-sm">{offer.price} 💛</span>
          </div>
        ))}
      </div>

    
    </div>
  );
}

export default Offers;
