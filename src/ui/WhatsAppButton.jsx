import { FaFacebookMessenger } from "react-icons/fa";

const WhatsAppButton = ({ pageId = "856928450832907" }) => {
  const handleClick = () => {
    const url = `https://m.me/${pageId}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="
        fixed bottom-4 right-4 z-50
        flex items-center justify-center
        bg-[#0084FF] text-white shadow-lg
        rounded-full
        w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16
        hover:scale-110 active:scale-95
        hover:bg-[#0073E6]
        transition-all duration-300
      "
      aria-label="فتح المحادثة في ماسنجر"
    >
      <FaFacebookMessenger className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
    </button>
  );
};

export default WhatsAppButton;