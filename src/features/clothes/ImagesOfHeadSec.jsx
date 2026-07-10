// ImagesOfHeadSec.jsx
import { memo, useState, useEffect, useMemo } from "react";

// تعريف الصور لكل كاتيجوري
const CATEGORY_IMAGES = {
  top: {
    hero: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783263489/WhatsApp_Image_2026-07-03_at_4.49.06_AM_sibwqi.jpg",
    collage: [
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783263379/WhatsApp_Image_2026-07-03_at_5.01.08_AM_mpqjiq.jpg",
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783263445/WhatsApp_Image_2026-07-03_at_4.57.05_AM_vqbuok.jpg",
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783263449/WhatsApp_Image_2026-07-03_at_4.58.09_AM_pqukmk.jpg"
    ]
  },
  legging: {
    hero: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615458/WhatsApp_Image_2026-07-09_at_9.07.02_AM_2_pc3is5.jpg",
    collage: [
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615536/WhatsApp_Image_2026-07-09_at_9.07.02_AM_1_yr3it2.jpg",
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615465/WhatsApp_Image_2026-07-09_at_9.07.02_AM_kcitd3.jpg",
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615463/WhatsApp_Image_2026-07-09_at_9.07.01_AM_jk9ri6.jpg"
    ]
  },
  short: {
    hero: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615454/WhatsApp_Image_2026-07-09_at_9.08.15_AM_ty3syu.jpg",
    collage: [
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615458/WhatsApp_Image_2026-07-09_at_9.07.02_AM_2_pc3is5.jpg",
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615536/WhatsApp_Image_2026-07-09_at_9.07.02_AM_1_yr3it2.jpg",
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615465/WhatsApp_Image_2026-07-09_at_9.07.02_AM_kcitd3.jpg"
    ]
  },
  // يمكنك إضافة المزيد من الكاتيجوريات هنا
  dress: {
    hero: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615463/WhatsApp_Image_2026-07-09_at_9.07.01_AM_jk9ri6.jpg",
    collage: [
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615458/WhatsApp_Image_2026-07-09_at_9.07.02_AM_2_pc3is5.jpg",
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615536/WhatsApp_Image_2026-07-09_at_9.07.02_AM_1_yr3it2.jpg",
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615465/WhatsApp_Image_2026-07-09_at_9.07.02_AM_kcitd3.jpg"
    ]
  },
  jacket: {
    hero: "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615458/WhatsApp_Image_2026-07-09_at_9.07.02_AM_2_pc3is5.jpg",
    collage: [
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615536/WhatsApp_Image_2026-07-09_at_9.07.02_AM_1_yr3it2.jpg",
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615465/WhatsApp_Image_2026-07-09_at_9.07.02_AM_kcitd3.jpg",
      "https://res.cloudinary.com/dxenvgjv5/image/upload/v1783615463/WhatsApp_Image_2026-07-09_at_9.07.01_AM_jk9ri6.jpg"
    ]
  }
};

const ImagesOfHeadSec = memo(({ 
  category = "top", // إضافة prop للكاتيجوري
  hero, 
  collage, 
  mounted, 
  onImageLoad 
}) => {
  const [loadedImages, setLoadedImages] = useState({});
  const [allLoaded, setAllLoaded] = useState(false);

  // الحصول على الصور المناسبة للكاتيجوري
  const categoryImages = useMemo(() => {
    return CATEGORY_IMAGES[category] || CATEGORY_IMAGES.top;
  }, [category]);

  // دمج صور الهيرو والكولاج مع الصور الخاصة بالكاتيجوري
  const imagesToUse = useMemo(() => {
    return {
      hero: categoryImages.hero,
      collage: categoryImages.collage.map((url, index) => ({
        ...collage[index],
        image: url
      }))
    };
  }, [categoryImages, collage]);

  // تحميل الصور
  useEffect(() => {
    const imageUrls = [imagesToUse.hero, ...imagesToUse.collage.map(c => c.image)];
    let loadedCount = 0;
    const totalImages = imageUrls.length;

    imageUrls.forEach(url => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        setLoadedImages(prev => ({ ...prev, [url]: true }));
        if (loadedCount === totalImages) {
          setAllLoaded(true);
          onImageLoad?.();
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === totalImages) {
          setAllLoaded(true);
          onImageLoad?.();
        }
      };
    });
  }, [imagesToUse, onImageLoad]);





  return (
    <>
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
        {/* Lazy loading with placeholder */}
        <div style={{ position: "relative", width: "100%", height: 380 }}>
          {!loadedImages[imagesToUse.hero] && (
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(135deg, #f0e6e0 0%, #e8d8d0 100%)",
              animation: "khsShimmer 1.5s ease-in-out infinite",
              backgroundSize: "200% 200%",
            }} />
          )}
          <img
            src={imagesToUse.hero}
            alt={hero?.name || "Product"}
            loading="lazy"
            decoding="async"
            style={{
              width: "100%",
              height: 380,
              objectFit: "cover",
              display: "block",
              opacity: loadedImages[imagesToUse.hero] ? 1 : 0,
              transition: "opacity 0.5s ease",
            }}
            onLoad={() => setLoadedImages(prev => ({ ...prev, [imagesToUse.hero]: true }))}
          />
        </div>

        {/* Discount Badge */}
        {hero?.discount && (
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
        )}

        {/* Price Tag */}
        {hero && (
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
             {category}
            </div>
            <div
              className="khs-eyebrow-font price"
              style={{ fontSize: 13, color: "#B65C7C", fontWeight: 700 }}
            >
              {hero.price} ج.م
              {hero.originalPrice && (
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
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Collage - Mini floating items */}
      <div
        className="khs-collage-mobile khs-slide-up"
        style={{ animationDelay: ".3s" }}
      >
        {imagesToUse.collage.map((item, i) => (
          <div
            key={i}
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
              alt={item.name || `Product ${i}`}
              loading="lazy"
              decoding="async"
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

      {/* Desktop Collage & Dots */}
      <div className="khs-dot-desktop">
        {imagesToUse.collage.map((item, i) => {
          const pos = [
            { top: "75%", right: "-2%", w: 140, rot: 8, delay: 0.1 },
            { top: "8%", right: "-8%", w: 118, rot: -12, delay: 0.2 },
            { top: "45%", right: "58%", w: 110, rot: 15, delay: 0.3 },
          ][i];
          return (
            <div
              key={i}
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
                alt={item.name || `Product ${i}`}
                loading="lazy"
                decoding="async"
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
    </>
  );
});

ImagesOfHeadSec.displayName = 'ImagesOfHeadSec';

export default ImagesOfHeadSec;