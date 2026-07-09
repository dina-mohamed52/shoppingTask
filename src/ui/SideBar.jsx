import { useState } from "react";
import { Menu, ShoppingCart, X, ChevronDown, ChevronLeft } from "lucide-react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { Home, ShoppingBag, Phone, Sparkles, Heart, Sun, Snowflake } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

function SideBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const { i18n, t } = useTranslation();

  const isRTL = i18n.language === "ar";

  const toggleExpand = (section) => {
    setExpanded(expanded === section ? null : section);
  };

  const navLinks = [
    {
      to: "/",
      icon: <Home size={20} />,
      label: { ar: "الرئيسية", en: "Home" },
      gradient: "from-pink-400 to-pink-500",
    },
    {
      type: "section",
      icon: <Sun size={20} />,
      label: { ar: "صيفي", en: "Summer" },
      gradient: "from-pink-400 to-pink-500",
      color: "#F472B6",
      children: [
        {
          to: "/Turbon",
          label: { ar: "بندانات وتربونات", en: "Turbans" },
          badge: "الأكثر مبيعاً",
        },
        {
          to: "/SummerHalfColon",
          label: { ar: "هاف كولون", en: "Half Colon" },
          badge: "جديد",
        },
        {
          to: "/SummerColon",
          label: { ar: "كولونات صيفي", en: "Summer Colon" },
          badge: "تخفيضات",
        },
        {
          to: "/Clothes",
          label: { ar: "ملابس صيفي", en: "Summer clothes" },
          badge: "جديد",
        },
      ],
    },
    {
      type: "section",
      icon: <Snowflake size={20} />,
      label: { ar: "شتوي", en: "Winter" },
      gradient: "from-blue-400 to-blue-500",
      color: "#60A5FA",
      children: [
        {
          to: "/WinterCollection",
          label: { ar: "كولونات رسومات شتوية", en: "Winter Collection" },
          badge: "الأكثر طلباً",
        },
      ],
    },
    {
      to: "/Checkout",
      icon: <ShoppingCart size={20} />,
      label: { ar: "السلة", en: "Cart" },
      gradient: "from-pink-400 via-pink-400 to-pink-600",
    },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`fixed top-5 z-[100] bg-white/80 backdrop-blur-md p-3 rounded-2xl border
           border-[#F472B6]/30 text-[#F472B6] hover:bg-gradient-to-r hover:from-[#F472B6] 
            hover:to-[#60A5FA] hover:text-white transition-all duration-300 shadow-lg shadow-[#F472B6]/20
             hover:shadow-[#60A5FA]/40 ${
          isRTL ? "left-5" : "right-5"
        } ${isOpen ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        <Menu size={20} />
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 bg-gradient-to-br from-[#F472B6]/20 
           via-[#60A5FA]/10 to-[#F8FAFC]/20 backdrop-blur-sm z-[60] transition-all duration-500 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 ${
          isRTL ? "left-0" : "right-0"
        } h-full w-80 bg-gradient-to-b from-[#FDF2F8] via-[#F8FAFC] to-[#EFF6FF] shadow-2xl z-[65] transform transition-transform duration-500 ease-out ${
          isOpen
            ? "translate-x-0"
            : isRTL
              ? "-translate-x-full"
              : "translate-x-full"
        }`}
      >
        {/* Decorative Blobs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 -right-20 w-60 h-60 bg-[#F472B6] rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 -left-20 w-60 h-60 bg-[#60A5FA] rounded-full filter blur-3xl opacity-10"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-[#F472B6]/5 to-[#60A5FA]/5 rounded-full filter blur-2xl"></div>
        </div>

        {/* Header */}
        <div className="relative flex justify-between items-center p-6 border-b border-[#F472B6]/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#F472B6] to-[#60A5FA] rounded-xl flex items-center justify-center shadow-lg shadow-[#F472B6]/20">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <div>
              <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] to-[#60A5FA] font-bold text-xl">
                BabyStyle
              </h2>
              <p className="text-[10px] text-[#64748B]/60">أطفالك بأجمل إطلالة</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#64748B] hover:text-[#F472B6] transition-all duration-300 hover:rotate-90 hover:scale-110"
          >
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="relative flex flex-col p-4 gap-2 overflow-y-auto h-[calc(100%-160px)]">
          {navLinks.map((link, index) => {
            if (link.type === "section") {
              const isExpanded = expanded === link.label.ar;
              const isActive = link.children.some(child => 
                window.location.pathname === child.to
              );
              
              return (
                <div key={index} className="space-y-1">
                  <button
                    onClick={() => toggleExpand(link.label.ar)}
                    className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                      ${isActive || isExpanded ? "text-[#1E293B]" : "text-[#64748B]"}`}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                      isActive || isExpanded 
                        ? `from-[${link.color}]/10 to-[${link.color}]/5` 
                        : "from-gray-100/50 to-gray-100/50 opacity-0 group-hover:opacity-100"
                    } transition-opacity duration-300 rounded-xl`}></div>
                    
                    <div className="flex items-center gap-3 relative z-10">
                      <div className={`transition-transform duration-300 group-hover:scale-110 ${
                        isActive || isExpanded ? `text-[${link.color}]` : "text-[#64748B] group-hover:text-[#F472B6]"
                      }`}>
                        {link.icon}
                      </div>
                      <span className={`font-medium relative z-10 transition-all duration-300 ${
                        isActive || isExpanded
                          ? "text-[#1E293B] font-bold"
                          : "group-hover:text-[#1E293B]"
                      }`}>
                        {link.label[i18n.language] || link.label.en}
                      </span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F472B6] animate-pulse"></span>
                      )}
                    </div>
                    
                    <div className={`relative z-10 transition-transform duration-300 ${
                      isExpanded ? "rotate-180" : ""
                    }`}>
                      <ChevronDown size={18} className="text-[#64748B]" />
                    </div>
                  </button>
                  
                  {isExpanded && (
                    <div className="mr-4 space-y-1 border-r-2 border-[#F472B6]/20 pl-4">
                      {link.children.map((child, childIndex) => (
                        <NavLink
                          key={childIndex}
                          to={child.to}
                          onClick={() => setIsOpen(false)}
                          className={({ isActive: isChildActive }) =>
                            `flex items-center justify-between px-4 py-2.5 rounded-lg transition-all duration-300 group
                            ${isChildActive 
                              ? "bg-gradient-to-r from-[#F472B6]/10 to-[#60A5FA]/10 text-[#1E293B]" 
                              : "text-[#64748B] hover:bg-[#F472B6]/5 hover:text-[#1E293B]"}`
                          }
                        >
                          {({ isActive: isChildActive }) => (
                            <>
                              <div className="flex items-center gap-3">
                                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                  isChildActive ? "bg-[#F472B6]" : "bg-[#64748B]/30 group-hover:bg-[#F472B6]"
                                }`}></div>
                                <span className="text-sm">
                                  {child.label[i18n.language] || child.label.en}
                                </span>
                              </div>
                              {child.badge && (
                                <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#F472B6]/10 text-[#F472B6] font-bold">
                                  {child.badge}
                                </span>
                              )}
                            </>
                          )}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            // Regular link
            return (
              <NavLink
                key={index}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden
                  ${isActive ? "text-[#1E293B]" : "text-[#64748B] hover:text-[#1E293B]"}`
                }
              >
                {({ isActive }) => (
                  <>
                    <div className={`absolute inset-0 bg-gradient-to-r ${
                      isActive 
                        ? "from-[#F472B6]/10 to-[#60A5FA]/10" 
                        : "from-gray-100/50 to-gray-100/50 opacity-0 group-hover:opacity-100"
                    } transition-opacity duration-300`}></div>
                    
                    <div className={`relative z-10 transition-transform duration-300 group-hover:scale-110 ${
                      isActive ? "text-[#F472B6]" : "text-[#64748B] group-hover:text-[#F472B6]"
                    }`}>
                      {link.icon}
                    </div>
                    
                    <span className={`relative z-10 font-medium transition-all duration-300 ${
                      isActive ? "text-[#1E293B] font-bold" : ""
                    }`}>
                      {link.label[i18n.language] || link.label.en}
                    </span>
                    
                    {isActive && (
                      <div className="absolute right-0 w-1 h-8 bg-gradient-to-b from-[#F472B6] to-[#60A5FA] rounded-l-full"></div>
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#FDF2F8]/80 to-transparent backdrop-blur-sm border-t border-[#F472B6]/10">
          <div className="text-center text-[#64748B] text-xs space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Heart size={12} className="text-[#F472B6] fill-[#F472B6] animate-pulse" />
              <span>© 2024 BabyStyle</span>
              <Heart size={12} className="text-[#60A5FA] fill-[#60A5FA] animate-pulse" />
            </div>
            <div className="text-[#F472B6]/60 text-[10px]">Elegance in Every Detail</div>

            <div className="flex items-center justify-center gap-2 bg-white/50 px-3 py-1.5 rounded-full backdrop-blur-sm border border-[#F472B6]/10 mt-2">
              <span className="text-[#64748B] text-[10px]">
                {t("footer.designBy")}
              </span>
              <a
                href="https://wa.me/201114219671?text=مرحبا%20دينا،%20عايز%20استفسر%20عن%20الموقع%20👋"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold flex items-center gap-1 group"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F472B6] to-[#60A5FA] group-hover:from-[#60A5FA] group-hover:to-[#F472B6] transition-all duration-300 text-[10px]">
                  {t("footer.developerName")}
                </span>
                <FaWhatsapp className="w-3 h-3 text-[#F472B6] group-hover:scale-110 transition-transform duration-300" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;