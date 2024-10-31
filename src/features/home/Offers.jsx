
const offerDetails = [
    { quantity: "4 قطع", price: "300 ج" },
    { quantity: "6 قطع", price: "420 ج" },
    { quantity: "8 قطع", price: "540 ج" },
    { quantity: "دسته 12 قطعة", price: "750 ج" },
];

function Offers() {
    return (
        <div className="bg-white rounded-lg shadow-lg max-w-3xl mx-auto my-8 p-8 border border-pink-500">
            <h3 className="text-pink-600 sm:text-3xl text-xl font-bold mb-6 text-center">
                عروض الكولونات الشتوية للأطفال
            </h3>
            <p className="text-gray-600 text-base leading-relaxed mb-8 text-center">
                بأفضل خامة شتوي وتقفيل لكولونات الأطفال، الخامة 90% قطن تقيل + 10% ليكرا معالج. ضد الحساسية وناعمة على البشرة.
                <br /> متوفر بمقاسات من حديث الولادة حتى 14 سنة.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                {offerDetails.map((offer, index) => (
                    <div
                        key={index}
                        className="bg-gray-100 rounded-lg shadow-md p-6 text-center transition-transform transform hover:scale-105 hover:shadow-xl"
                    >
                        <strong className="text-pink-600 text-xl">{offer.quantity}</strong>
                        <br />
                        <span className="text-green-600 font-bold text-lg">
                            بسعر {offer.price} ❤🥰
                        </span>
                    </div>
                ))}
            </div>

            <p className="text-gray-600 text-base leading-relaxed mt-6 text-center">
                متاح تشكيل ألوان وأشكال ومقاسات مختلفة. <br />
                متاح معاينة قبل الاستلام للتأكيد على الجودة والمقاس ✨
            </p>
        </div>
    );
}

export default Offers;
