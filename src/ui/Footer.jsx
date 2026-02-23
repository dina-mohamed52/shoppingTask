import { FaWhatsapp, FaFacebookF } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-gray-950 text-gray-300 py-8 overflow-hidden">
      {/* Simple Decorative Element */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-32 h-32 bg-pink-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-gray-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main Content */}
        <div className="flex flex-col items-center space-y-4">
          {/* Brand */}
          <Link
            to="/"
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-300 to-gray-200"
          >
            BabyStyle
          </Link>

          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/BBYstyle22"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 hover:text-white transition-all duration-300 transform hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-4 h-4" />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/201154864111?text=مرحبا%%20عايز%20استفسر%20عن%20الموقع%20👋"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 bg-gray-800/80 rounded-full flex items-center justify-center text-gray-400 hover:bg-gradient-to-r hover:from-pink-500 hover:to-pink-600 hover:text-white transition-all duration-300 transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-4 h-4" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {t("footer.copy")}
          </p>

          {/* Developer Credit */}
          <p className="text-sm flex items-center justify-center gap-2 bg-gray-800/30 px-4 py-1.5 rounded-full backdrop-blur-sm">
            <span className="text-gray-400">{t("footer.designBy")}</span>
            <a
              href="https://wa.me/201114219671?text=مرحبا%20دينا،%20عايز%20استفسر%20عن%20الموقع%20👋"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold flex items-center gap-1 group"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300">
                {t("footer.developerName")}
              </span>
              <FaWhatsapp className="w-3 h-3 text-pink-400" />
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}