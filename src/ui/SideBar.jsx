import { useState } from "react";
import { Menu, ShoppingCart, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Phone, Sparkles, Heart } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n, t } = useTranslation();

  const isRTL = i18n.language === "ar";

  const handleScrollToOffers = () => {
    const section = document.getElementById("offersSection");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  const navLinks = [
    {
      to: "/",
      icon: <Home size={20} />,
      label: { ar: "الرئيسية", en: "Home" },
      gradient: "from-pink-400 to-pink-500",
    },
    {
      to: "/WinterCollection",
      icon: <Home size={20} />,
      label: { ar: "كولونات رسومات شتوي", en: "Home" },
      gradient: "from-pink-400 to-pink-500",
    },
    {
      to: "/Turbon",
      icon: <ShoppingBag size={20} />,
      label: { ar: "تربونات وأطقم صيفية", en: "Turbans" },
      gradient: "from-pink-400 via-pink-500 to-pink-600",
      special: true,
    },
    {
      to: "/SummerHalfColon",
      icon: <Sparkles size={20} />,
      label: { ar: "هاف كولون", en: " summer colons" },
      gradient: "from-pink-300 to-pink-500",
      // onClick: handleScrollToOffers,
    },
    {
    to: "/SummerColon",
    icon: <Sparkles size={20} />,
    label: { ar: "كولونات صيفي", en: "Summer Colon" },
    gradient: "from-pink-400 via-pink-400 to-pink-600",
  },
    {
    to: "/Checkout",
    icon: <ShoppingCart size={20} />,
    label: { ar: "السلة", en: "Summer Colon" },
    gradient: "from-pink-400 via-pink-400 to-pink-600",
  },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-2 z-[100] bg-gray-800/90 backdrop-blur-sm p-3 rounded-xl border
           border-pink-500/50 text-pink-400 hover:bg-gradient-to-r hover:from-pink-500
            hover:to-pink-600 hover:text-white transition-all duration-300 shadow-lg shadow-pink-500/20
             hover:shadow-pink-500/40 ${
          isRTL ? "left-5" : "right-5"
        } ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Menu size={16} />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-gradient-to-br from-gray-900/80
           via-pink-900/30 to-gray-900/80 backdrop-blur-md z-[60] transition-all duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${
          isRTL ? "left-0" : "right-0"
        } h-full w-72 bg-gradient-to-b from-gray-900 to-gray-950 shadow-2xl z-[65] transform transition-transform duration-500 ease-out ${
          isOpen
            ? "translate-x-0"
            : isRTL
              ? "-translate-x-full"
              : "translate-x-full"
        }`}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -right-10 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 -left-10 w-40 h-40 bg-gray-500 rounded-full filter blur-3xl"></div>
        </div>

        {/* Header */}
        <div className="relative flex justify-between items-center p-6 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-300 to-gray-200 font-bold text-xl">
              BabyStyle
            </h2>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-pink-400 transition-all duration-300 hover:rotate-90 hover:scale-110"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="relative flex flex-col p-4 gap-2">
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.to}
              onClick={() => {
                setIsOpen(false);
                if (link.onClick) link.onClick();
              }}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden
                ${isActive ? "text-white" : "text-gray-400 hover:text-white"}`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Active/Background Effect */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${
                      isActive
                        ? `${link.gradient} to-pink-600 opacity-20`
                        : "from-gray-800 to-gray-800 opacity-0 group-hover:opacity-100"
                    } transition-opacity duration-300`}
                  ></div>

                  {/* Glow Effect on Hover */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-300"></div>

                  {/* Icon with Gradient */}
                  <div
                    className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                      isActive
                        ? "text-pink-400"
                        : "text-gray-400 group-hover:text-pink-400"
                    }`}
                  >
                    {link.icon}
                  </div>

                  {/* Label */}
                  <span
                    className={`relative z-10 font-medium transition-all duration-300 ${
                      link.special
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-300 to-pink-500 font-bold tracking-wide"
                        : isActive
                          ? "text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300"
                          : "group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-pink-300"
                    }`}
                  >
                    {link.label[i18n.language] || link.label.en}
                  </span>

                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute right-0 w-1 h-8 bg-gradient-to-b from-pink-400 to-pink-600 rounded-l-full"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer - Fixed Version */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="border-t border-gray-800 pt-4">
            <div className="text-center text-gray-500 text-xs space-y-2">
              <div>© 2024 BabyStyle</div>
              <div className="text-pink-400/60">Elegance in Every Detail</div>

              {/* Developer Credit - Fixed Structure */}
              <div className="flex items-center justify-center gap-2 bg-gray-800/30 px-3 py-1.5 rounded-full backdrop-blur-sm border border-gray-700 mt-2">
                <span className="text-gray-400 text-xs">
                  {t("footer.designBy")}
                </span>
                <a
                  href="https://wa.me/201114219671?text=مرحبا%20دينا،%20عايز%20استفسر%20عن%20الموقع%20👋"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold flex items-center gap-1 group"
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-300 group-hover:from-pink-300 group-hover:to-pink-400 transition-all duration-300 text-xs">
                    {t("footer.developerName")}
                  </span>
                  <FaWhatsapp className="w-3 h-3 text-pink-400 group-hover:scale-110 transition-transform duration-300" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
