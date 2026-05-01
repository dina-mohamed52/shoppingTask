import { MessageCircle } from "lucide-react";

const WhatsAppButton = ({ phone = "201234567890", message = "" }) => {
  const handleClick = () => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="
        fixed bottom-4 right-4 z-50
        flex items-center justify-center
        bg-green-500 text-white shadow-lg
        rounded-full
        w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16
        hover:scale-110 active:scale-95
        transition-all duration-300
      "
    >
      <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
    </button>
  );
};

export default WhatsAppButton;