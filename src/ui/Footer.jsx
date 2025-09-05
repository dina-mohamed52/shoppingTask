import { FaWhatsapp } from "react-icons/fa";
import { useTranslation } from "react-i18next";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 border-t border-yellow-400">
      <div className="container mx-auto flex flex-col items-center space-y-3">
        <p className="text-sm">{t("footer.copy")}</p>
        <p className="text-sm flex items-center justify-center gap-2">
          {t("footer.designBy")}{" "}
          <a
            href="https://wa.me/201114219671?text=مرحبا%20دينا،%20عايز%20استفسر%20عن%20الموقع%20👋"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-green-500 flex items-center justify-center gap-1 hover:text-green-700 transition"
          >
            <span className="text-yellow-400 font-semibold gap-1 hover:text-yellow-500 transition">
              {t("footer.developerName")}
            </span>
            <FaWhatsapp className="w-5 h-5" />
          </a>
        </p>
      </div>
    </footer>
  );
}
