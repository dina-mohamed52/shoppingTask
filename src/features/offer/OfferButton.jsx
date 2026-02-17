import { useTranslation } from "react-i18next";

function OfferButton() {
  const { t } = useTranslation();

  const handleClick = () => {
    const offersSection = document.getElementById("offersSection");
    if (offersSection) {
      offersSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed sm:absolute sm:bottom-[20%] bottom-4 sm:right-[20%] right-[30%] z-50">
      <button
        onClick={handleClick}
        className="
          bg-yellow-400 text-gray-900 
          rounded-full shadow-lg
          flex items-center justify-center
          transition-all duration-300
          hover:scale-110 hover:shadow-2xl
          font-semibold
          w-auto h-auto px-4 py-3 text-sm sm:text-lg
        "
      >
        {/* نص كامل على الديسكتوب */}
        <span className="hidden sm:inline">{t("offerButton.text", "اكتشف عروضنا 😉🔥")}</span>
        {/* نص مختصر على الموبايل */}
        <span className="inline sm:hidden">{t("offerButton.mobileText", " اكتشف عروضنا 🔥")}</span>
      </button>
    </div>
  );
}

export default OfferButton;
