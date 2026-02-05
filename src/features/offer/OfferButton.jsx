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
    <div className="flex justify-center my-6">
      <button
        onClick={handleClick}
        className="bg-yellow-400 text-gray-900 font-bold text-lg px-6 py-3 rounded-full shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300"
      >
        {t("offerButton.text", "اكتشف العروض 😉🔥")}
      </button>
    </div>
  );
}

export default OfferButton;
