import { useEffect, useState } from "react";
import { Clothes } from "../../data/Clothes";

function CHeadSection({ scrollToProductList }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(t);
  }, []);

  const shirts = Clothes.filter((c) => c.category === "top");

  const maxDiscount = Math.max(...Clothes.map((c) => c.discount));
  const hero = Clothes[0];
  const collage = [Clothes[1], Clothes[3], Clothes[6]];

  const colorSwatches = {
    أبيض: "#FFFFFF",
    أسود: "#2A2A2A",
    بينك: "#F6A6C1",
    احمر: "#D6483D",
    لبني: "#BFD7EA",
    اصفر: "#FBCB5C",
    كيوي: "#9CC084",
    لافندر: "#C9BBEE",
    سكري: "#F4D4C4",
    اورنج: "#F0924A",
  };

  // 👈 دالة للتعامل مع النقر على زر "تسوقي الكوليكشن"
  const handleShopClick = () => {
    if (scrollToProductList) {
      scrollToProductList();
    }
  };

  return (
    <div
      dir="rtl"
      style={{
        background:
          "linear-gradient(160deg, #FFF8F0 0%, #FFEFE8 50%, #FFF5F0 100%)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@500;700;800&family=Cairo:wght@400;500;600;700&display=swap');

        .khs-eyebrow-font { font-family: 'Cairo', sans-serif; }
        .khs-display-font { font-family: 'Baloo Bhaijaan 2', 'Cairo', sans-serif; }
        .khs-body-font { font-family: 'Cairo', sans-serif; }

        @keyframes khsRise {
          from { opacity: 0; transform: translateY(30px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes khsFloat {
          0%, 100% { transform: translateY(0) rotate(var(--r, 0deg)); }
          50% { transform: translateY(-15px) rotate(var(--r, 0deg)); }
        }
        @keyframes khsFloatMobile {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-10px) scale(1.02); }
        }
        @keyframes khsDraw {
          from { stroke-dashoffset: 900; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes khsPulseDot {
          0%, 100% { transform: scale(1); opacity: .4; }
          50% { transform: scale(1.8); opacity: 1; }
        }
        @keyframes khsBlob {
          0%, 100% { transform: translate(0,0) scale(1) rotate(0deg); }
          50% { transform: translate(30px,-25px) scale(1.1) rotate(10deg); }
        }
        @keyframes khsShimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes khsSlideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes khsScaleIn {
          from { opacity: 0; transform: scale(0.8) rotate(-5deg); }
          to { opacity: 1; transform: scale(1) rotate(0deg); }
        }

        .khs-fadeup { animation: khsRise .8s cubic-bezier(.22,1,.36,1) both; }
        .khs-float { animation: khsFloat 5.5s ease-in-out infinite; }
        .khs-float-mobile { animation: khsFloatMobile 4.5s ease-in-out infinite; }
        .khs-blob { animation: khsBlob 12s ease-in-out infinite; }
        .khs-slide-up { animation: khsSlideUp .9s cubic-bezier(.22,1,.36,1) both; }
        .khs-scale-in { animation: khsScaleIn .7s cubic-bezier(.34,1.56,.64,1) both; }
        .khs-ribbon-path {
          stroke-dasharray: 900;
          stroke-dashoffset: 900;
          animation: khsDraw 2s ease-out .4s forwards;
        }
        
        .khs-card {
          transition: transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .4s ease;
          will-change: transform;
        }
        .khs-card:hover {
          transform: translateY(-8px) scale(1.04) !important;
          box-shadow: 0 28px 50px -18px rgba(59,31,56,0.35) !important;
        }
        .khs-cta-primary {
          background: linear-gradient(135deg, #3B1F38 0%, #6B2D5E 50%, #3B1F38 100%);
          background-size: 200% 200%;
          transition: all .3s ease;
          position: relative;
          overflow: hidden;
        }
        .khs-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 36px -12px rgba(59,31,56,0.5);
          background-position: 100% 100%;
        }
        .khs-cta-primary:active {
          transform: scale(0.95);
        }
        .khs-cta-secondary {
          border: 2px solid #3B1F38;
          transition: all .3s ease;
          position: relative;
          overflow: hidden;
        }
        .khs-cta-secondary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: #3B1F38;
          transform: translateY(100%);
          transition: transform .3s ease;
          z-index: -1;
        }
        .khs-cta-secondary:hover::after {
          transform: translateY(0);
        }
        .khs-cta-secondary:hover {
          color: #FFF8F0 !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 28px -12px rgba(59,31,56,0.3);
        }

        /* Desktop Layout */
        .khs-grid {
          display: grid;
          grid-template-columns: 0.95fr 1.05fr;
          gap: 50px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 72px 24px 64px;
          position: relative;
          align-items: center;
        }
        .khs-visual { order: 0; }
        .khs-content { order: 1; }

        /* Mobile Layout - Modern & Dynamic */
        @media (max-width: 900px) {
          .khs-grid {
            grid-template-columns: 1fr;
            gap: 16px;
            padding: 16px 14px 32px;
          }
          .khs-visual { 
            order: -1;
            height: auto !important;
            min-height: 320px;
            padding: 8px 0 4px;
          }
          .khs-content { order: 1; }

          /* Hero Image - Modern card style */
          .khs-hero-wrapper {
            width: 92% !important;
            max-width: 320px !important;
            margin: 0 auto !important;
            border-radius: 24px 24px 24px 8px !important;
          }
          .khs-hero-image {
            height: 260px !important;
          }

          /* Mobile Collage - Mini floating items */
          .khs-collage-mobile {
            display: flex !important;
            gap: 10px;
            justify-content: center;
            margin-top: -18px;
            padding: 0 8px;
            position: relative;
            z-index: 3;
          }
          .khs-collage-mobile-item {
            width: 60px !important;
            height: 60px !important;
            border-radius: 16px !important;
            border: 3px solid #FFF8F0;
            box-shadow: 0 8px 20px -8px rgba(59,31,56,0.25);
            transition: all .3s ease;
            cursor: pointer;
          }
          .khs-collage-mobile-item:active {
            transform: scale(0.92);
          }

          /* Mobile Heading */
          .khs-heading {
            font-size: clamp(26px, 7vw, 32px) !important;
            text-align: center !important;
            line-height: 1.25 !important;
          }
          .khs-heading br {
            display: none;
          }
          .khs-heading::after {
            content: ' ✨';
          }

          /* Mobile Description */
          .khs-description {
            text-align: center !important;
            margin: 12px auto 0 !important;
            font-size: 14px !important;
            line-height: 1.8 !important;
            padding: 0 4px;
          }

          /* Mobile Eyebrow */
          .khs-eyebrow {
            margin: 0 auto !important;
            font-size: 12px !important;
            padding: 6px 14px !important;
            gap: 6px !important;
          }

          /* Mobile Colors */
          .khs-colors {
            justify-content: center !important;
            gap: 8px !important;
            margin-top: 16px !important;
          }
          .khs-colors span:first-child {
            font-size: 13px !important;
          }
          .khs-color-swatch {
            width: 22px !important;
            height: 22px !important;
            border-width: 2px !important;
          }

          /* Mobile CTA - Modern stacked */
          .khs-cta-group {
            flex-direction: column !important;
            width: 100% !important;
            gap: 10px !important;
            margin-top: 22px !important;
          }
          .khs-cta-group button {
            width: 100% !important;
            justify-content: center !important;
            padding: 14px 20px !important;
            font-size: 15px !important;
            border-radius: 14px !important;
          }

          /* Mobile Stats - Modern cards */
          .khs-stats {
            gap: 10px !important;
            margin-top: 24px !important;
            padding-top: 18px !important;
            justify-content: center !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            padding-bottom: 4px;
            -webkit-overflow-scrolling: touch;
          }
          .khs-stats::-webkit-scrollbar {
            height: 2px;
          }
          .khs-stats::-webkit-scrollbar-thumb {
            background: #F6A6C1;
            border-radius: 10px;
          }
          .khs-stats-item {
            flex: 0 0 auto !important;
            min-width: 85px !important;
            background: rgba(255,255,255,0.5);
            backdrop-filter: blur(10px);
            padding: 10px 14px;
            border-radius: 14px;
            border: 1px solid rgba(255,255,255,0.6);
            gap: 6px !important;
          }
          .khs-stats-item .icon {
            font-size: 18px !important;
          }
          .khs-stats-item .number {
            font-size: 18px !important;
          }
          .khs-stats-item .label {
            font-size: 11px !important;
          }

          /* Mobile Badges */
          .khs-badge {
            font-size: 12px !important;
            padding: 4px 12px !important;
            top: 10px !important;
            left: 10px !important;
            border-radius: 16px !important;
          }
          .khs-price-tag {
            bottom: 10px !important;
            right: 10px !important;
            padding: 6px 12px !important;
            border-radius: 12px !important;
          }
          .khs-price-tag .name {
            font-size: 12px !important;
          }
          .khs-price-tag .price {
            font-size: 11px !important;
          }

          /* Mobile Dots - repositioned */
          .khs-dot-mobile {
            display: block !important;
          }
          .khs-dot-desktop {
            display: none !important;
          }

          /* Mobile Blobs - smaller */
          .khs-blob-mobile {
            width: 200px !important;
            height: 200px !important;
            filter: blur(60px) !important;
          }
        }

        @media (max-width: 480px) {
          .khs-grid { padding: 12px 10px 24px; gap: 12px; }
          .khs-visual { min-height: 270px; padding: 4px 0; }
          .khs-hero-wrapper { width: 95% !important; max-width: 280px !important; }
          .khs-hero-image { height: 220px !important; }
          .khs-collage-mobile-item { width: 50px !important; height: 50px !important; }
          .khs-heading { font-size: 22px !important; }
          .khs-description { font-size: 13px !important; }
          .khs-stats-item { min-width: 70px !important; padding: 8px 10px; }
          .khs-stats-item .number { font-size: 16px !important; }
          .khs-stats-item .label { font-size: 10px !important; }
          .khs-cta-group button { padding: 12px 16px !important; font-size: 14px !important; border-radius: 12px !important; }
        }

        @media (min-width: 901px) {
          .khs-collage-mobile { display: none !important; }
          .khs-dot-mobile { display: none !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .khs-fadeup, .khs-float, .khs-float-mobile, .khs-blob, 
          .khs-ribbon-path, .khs-slide-up, .khs-scale-in,
          .khs-card, .khs-cta-primary, .khs-cta-secondary { 
            animation: none !important; 
            transition: none !important; 
          }
        }
      `}</style>

      {/* Background Blobs - Mobile optimized */}
      <div
        className="khs-blob khs-blob-mobile"
        style={{
          position: "absolute",
          width: "min(400px, 70vw)",
          height: "min(400px, 70vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, #F6A6C1, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.3,
          top: -40,
          right: -30,
          zIndex: 0,
        }}
      />
      <div
        className="khs-blob khs-blob-mobile"
        style={{
          position: "absolute",
          width: "min(350px, 60vw)",
          height: "min(350px, 60vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, #C9BBEE, transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.25,
          bottom: -30,
          left: -30,
          animationDelay: "2.5s",
          zIndex: 0,
        }}
      />
      <div
        className="khs-blob khs-blob-mobile"
        style={{
          position: "absolute",
          width: "min(200px, 40vw)",
          height: "min(200px, 40vw)",
          borderRadius: "50%",
          background: "radial-gradient(circle, #FBCB5C, transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.15,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animationDelay: "1.5s",
          zIndex: 0,
        }}
      />

      <div className="khs-grid">
        {/* ===== Visual Column ===== */}
        <div className="khs-visual" style={{ position: "relative", zIndex: 1 }}>
          {/* Desktop Decorative Ribbon */}
          <svg
            viewBox="0 0 420 480"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              zIndex: 0,
              pointerEvents: "none",
              display: "none",
            }}
            className="khs-ribbon-desktop"
          >
            <path
              className="khs-ribbon-path"
              d="M -20 60 C 90 20, 140 140, 60 190 C -20 240, 40 340, 150 330 C 250 322, 260 400, 200 440"
              fill="none"
              stroke="#F6A6C1"
              strokeWidth="3"
              strokeLinecap="round"
              opacity="0.5"
            />
          </svg>

          {/* Main Hero Image */}
          <div
            className="khs-card khs-hero-wrapper khs-float-mobile"
            style={{
              position: "relative",
              width: "min(72%, 340px)",
              margin: "0 auto",
              borderRadius: "28px 28px 28px 10px",
              overflow: "hidden",
              boxShadow:
                "0 20px 45px -14px rgba(59,31,56,0.3), 0 0 0 1px rgba(255,255,255,0.3)",
              zIndex: 2,
              opacity: mounted ? 1 : 0,
              transition: "opacity 0.7s ease, transform 0.7s ease",
              transform: mounted
                ? "rotate(-2deg)"
                : "rotate(-2deg) translateY(25px)",
              "--r": "-2deg",
            }}
          >
            <img
              src={hero.image}
              alt={hero.name}
              className="khs-hero-image"
              style={{
                width: "100%",
                height: 380,
                objectFit: "cover",
                display: "block",
              }}
            />

            {/* Discount Badge */}
            <div
              className="khs-badge"
              style={{
                position: "absolute",
                top: 16,
                left: 16,
                background: "linear-gradient(135deg, #FBCB5C, #F5A623)",
                color: "#3B1F38",
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 14,
                fontWeight: 800,
                boxShadow: "0 4px 14px rgba(251,203,92,0.4)",
                zIndex: 3,
              }}
            >
              {hero.discount}% OFF
            </div>

            {/* Price Tag */}
            <div
              className="khs-price-tag"
              style={{
                position: "absolute",
                bottom: 16,
                right: 16,
                background: "rgba(255,248,240,0.92)",
                backdropFilter: "blur(8px)",
                borderRadius: 14,
                padding: "10px 16px",
                boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
                border: "1px solid rgba(255,255,255,0.5)",
                zIndex: 3,
              }}
            >
              <div
                className="khs-body-font name"
                style={{ fontSize: 14, fontWeight: 700, color: "#3B1F38" }}
              >
                {hero.name}
              </div>
              <div
                className="khs-eyebrow-font price"
                style={{ fontSize: 13, color: "#B65C7C", fontWeight: 700 }}
              >
                {hero.price} ج.م
                <span
                  style={{
                    color: "#8A6E86",
                    textDecoration: "line-through",
                    marginRight: 8,
                    fontWeight: 400,
                  }}
                >
                  {hero.originalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Mobile Collage - Mini floating items */}
          <div
            className="khs-collage-mobile khs-slide-up"
            style={{ animationDelay: ".3s" }}
          >
            {collage.map((item, i) => (
              <div
                key={item.id}
                className="khs-collage-mobile-item khs-float-mobile"
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 16,
                  overflow: "hidden",
                  border: "3px solid #FFF8F0",
                  boxShadow: "0 8px 20px -8px rgba(59,31,56,0.25)",
                  transition: "all .3s ease",
                  animationDelay: `${i * 0.2}s`,
                  "--r": `${[4, -6, 8][i]}deg`,
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </div>
            ))}
          </div>

          {/* Mobile Dots */}
          <div className="khs-dot-mobile">
            {[
              { top: "8%", right: "8%", c: "#FBCB5C", size: 12, delay: 0 },
              { top: "85%", right: "5%", c: "#9CC084", size: 10, delay: 0.5 },
              { top: "50%", left: "5%", c: "#F6A6C1", size: 14, delay: 1 },
            ].map((d, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  top: d.top,
                  right: d.right,
                  left: d.left,
                  width: d.size,
                  height: d.size,
                  borderRadius: "50%",
                  background: d.c,
                  boxShadow: `0 0 20px ${d.c}44`,
                  animation: `khsPulseDot ${2.8 + i * 0.3}s ease-in-out ${d.delay}s infinite`,
                  zIndex: 1,
                }}
              />
            ))}
          </div>

          {/* Desktop Collage & Dots - hidden on mobile */}
          <div className="khs-dot-desktop">
            {collage.map((item, i) => {
              const pos = [
                { top: "75%", right: "-2%", w: 140, rot: 8, delay: 0.1 },
                { top: "8%", right: "-8%", w: 118, rot: -12, delay: 0.2 },
                { top: "45%", right: "58%", w: 110, rot: 15, delay: 0.3 },
              ][i];
              return (
                <div
                  key={item.id}
                  className="khs-card khs-float"
                  style={{
                    position: "absolute",
                    top: pos.top,
                    right: pos.right,
                    width: pos.w,
                    borderRadius: 18,
                    overflow: "hidden",
                    boxShadow:
                      "0 16px 36px -14px rgba(59,31,56,0.28), 0 0 0 3px #FFF8F0",
                    transform: mounted
                      ? `rotate(${pos.rot}deg)`
                      : `rotate(${pos.rot}deg) translateY(40px) scale(0.9)`,
                    opacity: mounted ? 1 : 0,
                    transition: `opacity 0.6s ease ${pos.delay}s, transform 0.6s ease ${pos.delay}s`,
                    zIndex: 3,
                    animationDelay: `${i * 0.5}s`,
                    "--r": `${pos.rot}deg`,
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: pos.w * 1.1,
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
              );
            })}
            {[
              { top: "5%", right: "45%", c: "#FBCB5C", size: 14, delay: 0 },
              { top: "88%", right: "15%", c: "#9CC084", size: 12, delay: 0.4 },
              { top: "35%", right: "78%", c: "#F6A6C1", size: 16, delay: 0.8 },
              { top: "65%", right: "30%", c: "#C9BBEE", size: 10, delay: 1.2 },
            ].map((d, i) => (
              <span
                key={i}
                style={{
                  position: "absolute",
                  top: d.top,
                  right: d.right,
                  width: d.size,
                  height: d.size,
                  borderRadius: "50%",
                  background: d.c,
                  boxShadow: `0 0 20px ${d.c}44`,
                  animation: `khsPulseDot ${2.6 + i * 0.3}s ease-in-out ${d.delay}s infinite`,
                  zIndex: 1,
                }}
              />
            ))}
          </div>
        </div>

        {/* ===== Content Column ===== */}
        <div
          className="khs-content"
          style={{ position: "relative", zIndex: 2 }}
        >
          {/* Eyebrow Badge */}
          <div
            className="khs-eyebrow khs-eyebrow-font khs-fadeup"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #FBCB5C, #F5A623)",
              color: "#3B1F38",
              padding: "8px 20px",
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 14,
              boxShadow: "0 4px 14px rgba(251,203,92,0.3)",
            }}
          >
            <span style={{ fontSize: 16 }}>🎀</span>
            كوليكشن الصيف ٢٠٢٦
          </div>

          {/* Heading */}
          <h1
            className="khs-heading khs-display-font khs-fadeup"
            style={{
              fontSize: "clamp(32px, 5vw, 56px)",
              fontWeight: 800,
              color: "#3B1F38",
              lineHeight: 1.2,
              margin: "16px 0 0",
              animationDelay: ".1s",
            }}
          >
            لبس يفرح قلبها،
            <br />
            وفيونكة تكمّل الطلة
          </h1>

          {/* Description */}
          <p
            className="khs-description khs-body-font khs-fadeup"
            style={{
              fontSize: "clamp(15px, 1vw, 17px)",
              color: "#5B4458",
              lineHeight: 1.9,
              maxWidth: 480,
              margin: "14px 0 0",
              animationDelay: ".18s",
            }}
          >
          {`${shirts.length} تصاميم توب بقطن ريب مضلع ناعم ومرن، بفيونكات بأشكال مختلفة وألوان زاهية، لكل بنت طلتها الخاصة.`}
          </p>

          {/* Color Swatches */}
          <div
            className="khs-colors khs-fadeup"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginTop: 22,
              animationDelay: ".24s",
              flexWrap: "wrap",
            }}
          >
            <span
              className="khs-eyebrow-font"
              style={{ fontSize: 14, fontWeight: 600, color: "#8A6E86" }}
            >
              الألوان المتاحة:
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              {hero.avalibeColors.map((c) => (
                <span
                  key={c}
                  title={c}
                  className="khs-color-swatch"
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: colorSwatches[c] || "#ddd",
                    border: "3px solid #FFF8F0",
                    boxShadow:
                      "0 0 0 1.5px rgba(59,31,56,0.1), 0 4px 12px rgba(0,0,0,0.05)",
                    transition: "transform 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.transform = "scale(1.15)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div
            className="khs-cta-group khs-fadeup"
            style={{
              display: "flex",
              gap: 14,
              marginTop: 32,
              flexWrap: "wrap",
              animationDelay: ".3s",
            }}
          >
            <button
              onClick={handleShopClick} // 👈 إضافة onClick
              className="khs-cta-primary khs-body-font"
              style={{
                color: "#FFF8F0",
                border: "none",
                borderRadius: 999,
                padding: "16px 34px",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                position: "relative",
                zIndex: 1,
              }}
            >
              <span>تسوقي الكوليكشن</span>
              <span style={{ fontSize: 18 }}>✨</span>
            </button>
            <button
              className="khs-cta-secondary khs-body-font"
              style={{
                background: "transparent",
                color: "#3B1F38",
                borderRadius: 999,
                padding: "16px 34px",
                fontSize: 16,
                fontWeight: 700,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
                position: "relative",
                zIndex: 1,
              }}
            >
              <span>شاهدي كل الألوان</span>
              <span style={{ fontSize: 16 }}>🎨</span>
            </button>
          </div>

          {/* Stats - Modern cards on mobile */}
          <div
            className="khs-stats khs-fadeup"
            style={{
              display: "flex",
              gap: 32,
              marginTop: 38,
              paddingTop: 26,
              borderTop: "2px solid rgba(59,31,56,0.08)",
              animationDelay: ".36s",
              flexWrap: "wrap",
            }}
          >
            {[
              { n: `6+`, l: "تصاميم فيونكة", icon: "👗" },
              { n: `حتى ${maxDiscount}%`, l: "خصم على القطعة", icon: "💰" },
              { n: "١.٥ – ١٤", l: "مقاسات بالسنين", icon: "📏" },
            ].map((s) => (
              <div
                key={s.l}
                className="khs-stats-item"
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <span className="icon" style={{ fontSize: 22 }}>
                  {s.icon}
                </span>
                <div>
                  <div
                    className="khs-display-font number"
                    style={{
                      fontSize: 22,
                      fontWeight: 800,
                      color: "#3B1F38",
                      lineHeight: 1.2,
                    }}
                  >
                    {s.n}
                  </div>
                  <div
                    className="khs-eyebrow-font label"
                    style={{ fontSize: 13, color: "#8A6E86", marginTop: 2 }}
                  >
                    {s.l}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CHeadSection;
