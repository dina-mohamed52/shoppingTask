import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown } from "antd";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { FaCaretDown, FaShoppingBag } from "react-icons/fa";
import { HiOutlineHeart } from "react-icons/hi";
import { MdPersonOutline } from "react-icons/md";
import SideBar from "./SideBar";

function Header() {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const { i18n } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  // تغيير اتجاه الصفحة حسب اللغة
  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  // تأثير التمرير
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const items = [
    {
      key: "ar",
      label: (
        <span 
          className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 rounded-lg"
          onClick={() => changeLanguage("ar")}
        >
          عربي
        </span>
      ),
    },
    {
      key: "en",
      label: (
        <span 
          className="block px-4 py-2 text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition-all duration-300 rounded-lg"
          onClick={() => changeLanguage("en")}
        >
         English
        </span>
      ),
    },
  ];

  return (
    <>
      <SideBar />
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled 
            ? "bg-gray-900/95 backdrop-blur-md shadow-xl py-2" 
            : "bg-gradient-to-r from-gray-900 to-gray-800 py-4"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-6 relative">
          {/* Language Selector */}
          <Dropdown
            menu={{ items }}
            trigger={["click"]}
            placement={i18n.language === "ar" ? "bottomLeft" : "bottomRight"}
            overlayClassName="language-dropdown"
          >
            <button className="group flex items-center  gap-2 text-gray-300 hover:text-pink-400 transition-all duration-300 border border-gray-700 hover:border-pink-400/50 rounded-full px-4 py-2 bg-gray-800/50 backdrop-blur-sm">
              <span className="text-sm font-medium w-full text-center">
                {i18n.language === "ar" ? "عربي" : "English"}
              </span>
              <FaCaretDown className="text-xs group-hover:rotate-180 transition-transform duration-300 text-pink-400" />
            </button>
          </Dropdown>

          {/* Brand في النص */}
          <Link
            to="/"
            className="absolute left-1/2 transform -translate-x-1/2"
          >
            <div className="relative">
              <span className="text-3xl sm:text-4xl font-bold font-fantasy bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-300 to-gray-200 animate-gradient-x drop-shadow-lg">
                BabyStyle
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-gray-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </Link>

          </div>
        {/* شريط سفلي متحرك */}
        <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent transform transition-opacity duration-500 ${
          scrolled ? "opacity-50" : "opacity-100"
        }`}></div>
      </header>

      <style jsx global>{`
        .language-dropdown .ant-dropdown-menu {
          background: rgba(255, 255, 255, 0.95) !important;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(236, 72, 153, 0.2);
          border-radius: 16px !important;
          padding: 8px !important;
          box-shadow: 0 20px 40px -10px rgba(236, 72, 153, 0.3) !important;
          min-width: 140px;
        }

        .language-dropdown .ant-dropdown-menu-item {
          padding: 0 !important;
          border-radius: 12px !important;
          overflow: hidden;
        }

        .language-dropdown .ant-dropdown-menu-item:hover {
          background: transparent !important;
        }

        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </>
  );
}

export default Header;