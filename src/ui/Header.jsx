import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";
import SideBar from "./SideBar";
import { useEffect, useState } from "react";
import { useCart } from "../features/cart/CartContext";


function Header() {
  const { cartItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  
  // حساب totalItems من cartItems
  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  // تأثير التمرير
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SideBar />
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-gray-900/95 backdrop-blur-md shadow-xl py-2"
            : "bg-gradient-to-r from-gray-900 to-gray-800 py-3 sm:py-4"
        }`}
      >
        <div className="container mx-auto flex justify-between items-center px-3 sm:px-6 relative">
          {/* SideBar Trigger - left side on mobile */}
          <div className="flex items-center gap-2">
            <SideBar />
          </div>

          {/* Brand في النص - centered */}
          <Link
            to="/"
            className="absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap"
          >
            <div className="relative group">
              <span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-fantasy bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-300 to-gray-200 animate-gradient-x drop-shadow-lg">
               Baby Style
              </span>
              <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-pink-500 to-gray-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </div>
          </Link>

          {/* Cart Icon - right side */}
          <Link to="/Checkout" className="group relative">
            <div className="flex items-center justify-end gap-1 sm:gap-2 text-pink-400 transition-all duration-300 border border-gray-700 hover:border-pink-400/50 rounded-full px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 bg-gray-800/50 backdrop-blur-sm">
              <FaShoppingBag className="text-base sm:text-lg group-hover:scale-110 transition-transform duration-300" />
              <span className="text-xs sm:text-sm font-medium hidden sm:inline">
                السلة
              </span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-[10px] sm:text-xs rounded-full min-w-[18px] sm:min-w-[20px] h-[18px] sm:h-[20px] flex items-center justify-center font-bold shadow-lg px-1">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </div>
          </Link>
        </div>

        {/* شريط سفلي متحرك */}
        <div
          className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent transform transition-opacity duration-500 ${
            scrolled ? "opacity-50" : "opacity-100"
          }`}
        ></div>
      </header>

      <style jsx global>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        /* تحسينات للموبيل */
        @media (max-width: 640px) {
          header {
            padding-left: 0;
            padding-right: 0;
          }
        }
      `}</style>
    </>
  );
}

export default Header;