import { useEffect, useRef, useState } from "react";
import {
  Sun,
  Snowflake,
  ArrowLeft,
  Star,
  Heart,
  Shield,
  Truck,
  CreditCard,
  Sparkles,
  ShoppingBag,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* ---------- scroll reveal (no external animation library) ---------- */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "reveal-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ---------- content ---------- */
const SEASONS = {
  summer: {
    key: "summer",
    name: "صيفي",
    nameEn: "Summer",
    icon: Sun,
    accent: "#F472B6", // Baby Pink
    accentDark: "#DB2777",
    soft: "#FCE7F3",
    softLight: "#FDF2F8",
    tagline: "إطلالات منعشة بألوان البينك الناعمة",
    categories: [
      {
        id: 4,
        name: " ملابس صيفي",
        nameEn: " توبات وليجن صيفي شيك",
        path: "/clothes",
        image:
          "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783263489/WhatsApp_Image_2026-07-03_at_4.49.06_AM_sibwqi.jpg",
        items: "8+ منتج",
        badge: "جديد",
      },
      {
        id: 1,
        name: "بندانات وتربونات",
        nameEn: "بندانات وتربونات واطقم صيفية",
        path: "/Turbon",
        image:
          "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783006087/WhatsApp_Image_2026-06-28_at_5.38.23_PM_d7vhmp.jpg",
        items: "7+ منتج",
        badge: "الأكثر مبيعاً",
      },
      {
        id: 2,
        name: "هاف كولون",
        nameEn: " هاف كولونات صيفي شيك",
        path: "/SummerHalfColon",
        image:
          "https://res.cloudinary.com/dxenvgjv5/image/upload/v1781882037/WhatsApp_Image_2026-06-08_at_3.56.21_AM_lefkl5.jpg",
        items: "3+ منتج",
        badge: "جديد",
      },
      {
        id: 3,
        name: " كولونات صيفي",
        nameEn: " كولونات وليجن صيفي شيك",
        path: "/SummerColon",
        image:
          "https://res.cloudinary.com/dxenvgjv5/image/upload/q_auto/f_auto/v1776610600/WhatsApp_Image_2026-04-19_at_4.26.08_AM_1_h90nua.jpg",
        items: "8+ منتج",
        badge: "تخفيضات",
      },
    ],
  },
  winter: {
    key: "winter",
    name: "شتوي",
    nameEn: "Winter",
    icon: Snowflake,
    accent: "#60A5FA", // Baby Blue
    accentDark: "#2563EB",
    soft: "#DBEAFE",
    softLight: "#EFF6FF",
   tagline: "دفء وأناقة بأجواء دافئة وإطلالة ناعمة",
    categories: [
      {
        id: 4,
        name: "كولونات رسومات شتوية",
        nameEn: "Winter Collection ",
        path: "/WinterCollection",
        image:
          "https://res.cloudinary.com/dxenvgjv5/image/upload/v1771784141/WhatsApp_Image_2026-02-21_at_10.28.04_AM_1_jgzfpu.jpg",
        items: "10+ منتج",
        badge: "الأكثر طلباً",
      },
      // {
      //   id: 5,
      //   name: "كنزات صوف",
      //   nameEn: "Wool Sweaters",
      //   path: "/WinterSweaters",
      //   image:
      //     "https://res.cloudinary.com/dxenvgjv5/image/upload/v1756575082/468185339_931536052403792_3120323499499149723_n_zp0ej5.jpg",
      //   items: "14+ منتج",
      //   badge: "جودة عالية",
      // },
      // {
      //   id: 6,
      //   name: "بناطيل دافئة",
      //   nameEn: "Warm Pants",
      //   path: "/WinterPants",
      //   image:
      //     "https://res.cloudinary.com/dxenvgjv5/image/upload/v1776012196/WhatsApp_Image_2026-04-08_at_5.55.41_PM_sjakzv.jpg",
      //   items: "9+ منتج",
      //   badge: "تشكيلة جديدة",
      // },
    ],
  },
};

const STATS = [
  { icon: Truck, label: "توصيل سريع", value: "خلال 5 أيام" },
  { icon: Shield, label: "ضمان الجودة", value: "أفضل الخامات" },
  { icon: CreditCard, label: "دفع آمن", value: "طرق متعددة" },
  { icon: Heart, label: "رضا العملاء", value: "98% رضا" },
];

/* ---------- page ---------- */
export default function MainPage({ onNavigate }) {
  const [season, setSeason] = useState("summer");
  const [toast, setToast] = useState(null);
  const active = SEASONS[season];

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 1800);
    return () => clearTimeout(t);
  }, [toast]);


const navigate= useNavigate();

  const go = (path, label) => {
    setToast(`فتح: ${label}`);
   navigate(path);
  };

  return (
    <div dir="rtl" className="mp-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;600;700;800&family=Tajawal:wght@400;500;700;800&display=swap');

        .mp-root {
          --paper: #F8FAFC;
          --paper-deep: #F1F5F9;
          --ink: #1E293B;
          --ink-soft: #64748B;
          --brand: #EC4899;
          --brand-light: #F472B6;
          --brand-dark: #BE185D;
          --summer: #F472B6;
          --summer-soft: #FCE7F3;
          --summer-light: #FDF2F8;
          --winter: #60A5FA;
          --winter-soft: #DBEAFE;
          --winter-light: #EFF6FF;
          font-family: 'Tajawal', sans-serif;
          background: var(--paper);
          color: var(--ink);
          min-height: 100vh;
          overflow-x: hidden;
        }
        .mp-display { font-family: 'Baloo Bhaijaan 2', 'Tajawal', sans-serif; }

        .reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s ease; }
        .reveal-visible { opacity: 1; transform: translateY(0); }

        @keyframes swing { 0%, 100% { transform: rotate(-3deg); } 50% { transform: rotate(3deg); } }
        .mp-tag { animation: swing 4.5s ease-in-out infinite; transform-origin: top center; }

        @keyframes drift { 0% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-10px) translateX(4px); } 100% { transform: translateY(0) translateX(0); } }
        .mp-drift { animation: drift 6s ease-in-out infinite; }

        .mp-toggle-thumb { transition: transform .35s cubic-bezier(.65,0,.35,1); }

        /* FIX: Image container to prevent cropping */
        .mp-card-img-wrapper {
          border-radius: 26px 26px 26px 64px;
          position: relative;
          aspect-ratio: 4 / 5;
          overflow: hidden;
        }
        .mp-card-img-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }
        
        .mp-card { transition: transform .45s ease, box-shadow .45s ease; }
        .mp-card:hover { transform: translateY(-6px); }

        .mp-tagshape { clip-path: polygon(18% 0, 100% 0, 100% 100%, 18% 100%, 0 50%); }

        .mp-rack-line { background: linear-gradient(90deg, transparent, var(--brand-light) 20%, var(--brand-light) 80%, transparent); height: 2px; }

        .mp-gradient-text {
          background: linear-gradient(135deg, var(--summer), var(--winter));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ========== GRID SYSTEM ========== */
        /* Default: 3 columns for desktop */
        .mp-cards-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        /* Tablet: 2 columns */
        @media (max-width: 1024px) {
          .mp-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
        }

        /* Mobile: 2 columns with smaller spacing */
        @media (max-width: 768px) {
          .mp-cards-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .mp-card-img-wrapper {
            aspect-ratio: 3 / 4;
            border-radius: 18px 18px 18px 40px;
          }
          .mp-card {
            border-radius: 20px;
          }
          .mp-card .p-5 {
            padding: 12px;
          }
          .mp-card h4 {
            font-size: 14px !important;
          }
          .mp-card .text-xs {
            font-size: 10px !important;
          }
          .mp-card .text-sm {
            font-size: 11px !important;
          }
          .mp-card .mp-tagshape {
            padding: 4px 10px;
          }
          .mp-card .mp-tagshape span {
            font-size: 9px !important;
          }
          .mp-card .absolute.inset-0 .bg-white\\/95 {
            padding: 8px 14px;
            font-size: 11px;
          }
          .mp-card .flex.items-center.gap-1 .w-4 {
            width: 14px;
            height: 14px;
          }
          .mp-card .border-t {
            margin-top: 8px;
            padding-top: 8px;
          }
          .mp-card .w-4.h-4 {
            width: 14px;
            height: 14px;
          }
        }

        /* Small mobile: keep 2 columns but smaller */
        @media (max-width: 480px) {
          .mp-cards-grid {
            gap: 10px;
          }
          .mp-card-img-wrapper {
            aspect-ratio: 4 / 5;
            border-radius: 14px 14px 14px 30px;
          }
          .mp-card .p-5 {
            padding: 10px;
          }
          .mp-card h4 {
            font-size: 12px !important;
          }
          .mp-card .text-xs {
            font-size: 9px !important;
          }
          .mp-card .text-sm {
            font-size: 10px !important;
          }
          .mp-card .mp-tagshape {
            padding: 3px 8px;
          }
          .mp-card .mp-tagshape span {
            font-size: 8px !important;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .mp-tag, .mp-drift, .reveal, .mp-card, .mp-toggle-thumb { animation: none !important; transition: none !important; }
          .reveal { opacity: 1; transform: none; }
        }
      `}</style>

      {/* toast */}
      <div
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 transition-all duration-300"
        style={{
          opacity: toast ? 1 : 0,
          pointerEvents: "none",
          transform: toast ? "translate(-50%, 0)" : "translate(-50%, -12px)",
        }}
      >
        <div className="bg-[var(--ink)] text-white text-sm px-5 py-2.5 rounded-full shadow-xl">
          {toast}
        </div>
      </div>

      {/* HERO — Baby Pink & Baby Blue Blend */}
      <section className="relative pt-16 pb-28 px-4 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(115deg, ${SEASONS.summer.soft} 0%, ${SEASONS.summer.soft} 42%, var(--paper) 50%, ${SEASONS.winter.soft} 58%, ${SEASONS.winter.soft} 100%)`,
          }}
        />
        <div
          className="mp-drift absolute rounded-full opacity-50"
          style={{
            top: "8%",
            right: "8%",
            width: 120,
            height: 120,
            background: "radial-gradient(circle, #FBCFE8 0%, transparent 70%)",
          }}
        />
        <div
          className="mp-drift absolute rounded-full opacity-40"
          style={{
            bottom: "12%",
            left: "10%",
            width: 100,
            height: 100,
            background: "radial-gradient(circle, #BFDBFE 0%, transparent 70%)",
          }}
        />
        <Sun
          className="mp-drift absolute w-6 h-6 opacity-30"
          style={{
            top: "20%",
            left: "12%",
            color: "var(--summer)",
            animationDelay: "0.5s",
          }}
        />
        <Snowflake
          className="mp-drift absolute w-6 h-6 opacity-30"
          style={{
            top: "30%",
            right: "15%",
            color: "var(--winter)",
            animationDelay: "1.5s",
          }}
        />

        <div className="relative max-w-4xl mx-auto text-center">
          <div className="mp-tag inline-block mb-6">
            <div className="w-px h-8 bg-[var(--brand-light)] mx-auto opacity-40" />
            <div className="mp-tagshape bg-white/90 backdrop-blur-sm shadow-lg px-6 py-2 flex items-center gap-2 border border-[var(--brand-light)]/30">
              <Sparkles className="w-4 h-4" style={{ color: "var(--brand)" }} />
              <span
                className="text-xs font-bold tracking-wide"
                style={{ color: "var(--brand)" }}
              >
                تشكيلة الموسم
              </span>
            </div>
          </div>

          <h1 className="mp-display text-4xl md:text-6xl font-bold mb-5 leading-[1.15]">
            خزانة أطفالك جاهزة
            <br />
            <span className="mp-gradient-text">لكل فصل</span>
          </h1>
          <p className="text-[var(--ink-soft)] text-lg md:text-xl max-w-xl mx-auto mb-9">
            من دفء الشتاء إلى نسمة الصيف، قطع مختارة بعناية لراحة صغارك
            وأناقتهم.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("seasons")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-9 py-3.5 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, var(--summer), var(--brand-light), var(--winter))",
            }}
          >
            استكشفي المجموعات
          </button>
        </div>
      </section>

      {/* SEASON TOGGLE + CATEGORIES */}
      <section id="seasons" className="px-4 py-16 md:py-20">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-10">
            <p
              className="text-xs font-bold tracking-[0.2em] mb-2"
              style={{ color: "var(--brand)" }}
            >
              اختاري الموسم
            </p>
            <h2 className="mp-display text-2xl md:text-3xl font-bold">
              أي <span className="mp-gradient-text">فصل</span> تبحثين عنه اليوم؟
            </h2>
          </Reveal>

          <Reveal className="flex justify-center mb-10" delay={80}>
            <div
              className="relative flex rounded-full p-1.5 shadow-inner"
              style={{ background: "var(--paper-deep)" }}
            >
              <div
                className="mp-toggle-thumb absolute top-1.5 bottom-1.5 rounded-full shadow-md"
                style={{
                  width: "calc(50% - 6px)",
                  background:
                    season === "summer"
                      ? "linear-gradient(135deg, var(--summer), var(--brand-light))"
                      : "linear-gradient(135deg, var(--winter), #93BBFC)",
                  transform:
                    season === "summer"
                      ? "translateX(0%)"
                      : "translateX(-100%)",
                  right: "6px",
                }}
              />
              {["summer", "winter"].map((key) => {
                const s = SEASONS[key];
                const Icon = s.icon;
                const isActive = season === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSeason(key)}
                    className="relative z-10 flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm md:text-base transition-colors duration-300"
                    style={{ color: isActive ? "#fff" : "var(--ink-soft)" }}
                  >
                    <Icon className="w-4 h-4" />
                    {s.name}
                  </button>
                );
              })}
            </div>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-center text-[var(--ink-soft)] mb-10">
              {active.tagline}
            </p>
          </Reveal>

          {/* CARDS GRID - 3 columns desktop, 2 columns mobile */}
          <div className="mp-cards-grid">
            {active.categories.map((cat, i) => (
              <Reveal key={cat.id} delay={i * 100}>
                <div
                  onClick={() => go(cat.path, cat.name)}
                  className="mp-card group cursor-pointer bg-white rounded-3xl shadow-md hover:shadow-2xl overflow-hidden border border-[var(--brand-light)]/10"
                >
                  {/* Image container with proper sizing */}
                  <div className="mp-card-img-wrapper">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      loading="lazy"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x300/FCE7F3/EC4899?text=صورة+غير+متاحة";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute top-4 right-4">
                      <div
                        className="mp-tagshape px-4 py-1.5 shadow-md"
                        style={{ background: active.accent }}
                      >
                        <span className="text-white text-xs font-bold">
                          {cat.badge}
                        </span>
                      </div>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div
                        className="bg-white/95 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-xl flex items-center gap-2 font-bold text-sm"
                        style={{ color: active.accentDark }}
                      >
                        <ShoppingBag className="w-4 h-4" />
                        تسوقي الآن
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <h4
                          className="mp-display font-bold text-lg"
                          style={{ color: "var(--ink)" }}
                        >
                          {cat.name}
                        </h4>
                        <p className="text-xs text-[var(--ink-soft)]">
                          {cat.nameEn}
                        </p>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 shrink-0">
                        <Star className="w-4 h-4 fill-amber-500" />
                        <span className="text-xs text-[var(--ink-soft)]">
                          4.8
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-[var(--brand-light)]/10">
                      <span className="text-sm text-[var(--ink-soft)]">
                        {cat.items}
                      </span>
                      <ArrowLeft
                        className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                        style={{ color: active.accent }}
                      />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section
        className="py-16 px-4"
        style={{ background: "var(--paper-deep)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="mp-rack-line mb-10" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Reveal key={i} delay={i * 80} className="relative text-center">
                  <div
                    className="w-px mx-auto mb-2"
                    style={{
                      height: 16,
                      background: "var(--brand-light)",
                      opacity: 0.4,
                    }}
                  />
                  <div
                    className="w-12 h-12 rounded-full mx-auto flex items-center justify-center mb-3 shadow-md transition-transform hover:scale-110 duration-300"
                    style={{
                      background:
                        "linear-gradient(135deg, var(--summer-light), var(--winter-light))",
                      color: "var(--brand)",
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-sm md:text-base mb-1">
                    {stat.label}
                  </h4>
                  <p className="text-[var(--ink-soft)] text-xs md:text-sm">
                    {stat.value}
                  </p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(120deg, var(--summer-soft) 0%, var(--winter-soft) 100%)",
            opacity: 0.5,
          }}
        />
        <div className="absolute inset-0">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full"
            style={{
              background: "var(--summer-light)",
              filter: "blur(100px)",
              opacity: 0.3,
            }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full"
            style={{
              background: "var(--winter-light)",
              filter: "blur(100px)",
              opacity: 0.3,
            }}
          />
        </div>
        <Reveal className="relative max-w-3xl mx-auto text-center">
          <Sparkles
            className="w-9 h-9 mx-auto mb-4"
            style={{ color: "var(--brand)" }}
          />
          <h2 className="mp-display text-3xl md:text-4xl font-bold mb-4">
            استعدي للموسم <span className="mp-gradient-text">القادم</span>
          </h2>
          <p className="text-[var(--ink-soft)] text-lg mb-8">
            تصفحي مجموعاتنا الصيفية والشتوية واختاري الأجمل لصغارك.
          </p>
          <button
            onClick={() =>
              document
                .getElementById("seasons")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-9 py-3.5 rounded-full font-bold text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{
              background:
                "linear-gradient(135deg, var(--summer), var(--brand-light), var(--winter))",
            }}
          >
            استكشفي المجموعات
          </button>
        </Reveal>
      </section>
    </div>
  );
}