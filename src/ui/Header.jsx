import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";

function Header() {
  const totalItems = useSelector((state) => state.cart.totalItems);
  const { i18n } = useTranslation();

  // تغيير اتجاه الصفحة حسب اللغة
  useEffect(() => {
    document.body.dir = i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("lang", lang);
  };

  const items = [
    {
      key: "ar",
      label: (
        <span className="block px-3 py-1" onClick={() => changeLanguage("ar")}>
          عربي
        </span>
      ),
    },
    {
      key: "en",
      label: (
        <span className="block px-3 py-1" onClick={() => changeLanguage("en")}>
           English
        </span>
      ),
    },
  ];

  return (
    <header className="bg-gray-900 shadow-lg fixed top-0 left-0 w-full py-3 z-50">
      <div className="container mx-auto flex justify-between items-center p-4 relative">
        {/* Language Selector */}
        <Dropdown
          menu={{ items }}
          trigger={["click"]}
          placement={i18n.language === "ar" ? "bottomLeft" : "bottomRight"}
        >
          <button className="text-white cursor-pointer flex items-center gap-1">
            {i18n.language === "ar" ? " عربي" : " English"}
            <FaCaretDown  className="text-xs mt-2" />
          </button>
        </Dropdown>

        {/* Brand في النص */}
        <Link
          to="/"
          className="absolute left-1/2 transform -translate-x-1/2 text-3xl sm:text-4xl font-bold font-fantasy text-white transition-all duration-500 hover:scale-105"
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 animate-gradient-x">
            BabyStyle
          </span>
        </Link>
      </div>
    </header>
  );
}

export default Header;
