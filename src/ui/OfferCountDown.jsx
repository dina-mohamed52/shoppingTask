import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ المكون الرئيسي
export default function OfferCountdown() {
  const [timeLeft, setTimeLeft] = useState(36000); // 10 ساعات = 36000 ثانية
  const [viewers, setViewers] = useState(20);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 36000));
    }, 1000);

    const randomizer = setInterval(() => {
      setViewers(Math.floor(Math.random() * (50 - 13 + 1)) + 13);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(randomizer);
    };
  }, []);

  const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");
  const seconds = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="bg-gray-900 text-yellow-400 rounded-2xl p-4 sm:p-6 shadow-2xl w-full max-w-xl mx-auto text-center space-y-6">
      {/* الساعة الرملية */}
      <div className="flex justify-center">
        <Hourglass />
      </div>

      {/* العنوان */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-lg sm:text-2xl font-bold"
      >
        ⏳ عرضنا الحلو هينتهي كمان
      </motion.h2>

      {/* التايمر */}
      <div className="flex justify-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
        <FlipUnit value={hours} label="ساعات" />
        <FlipUnit value={minutes} label="دقايق" />
        <FlipUnit value={seconds} label="ثواني" />
      </div>

      {/* عدد المشاهدين */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm sm:text-lg text-gray-300"
      >
        👀 <span className="text-yellow-400 font-semibold">{viewers}</span>{" "}
        بيشوفوا العرض دلوقتي
      </motion.p>
    </div>
  );
}

// ✅ مكون Flip لكل رقم
function FlipUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-12 h-16 sm:w-16 sm:h-20 md:w-20 md:h-24 bg-gray-800 border border-yellow-400 rounded-xl shadow-lg overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={value}
            initial={{ rotateX: -90, opacity: 0, scale: 0.9 }}
            animate={{ rotateX: 0, opacity: 1, scale: 1 }}
            exit={{ rotateX: 90, opacity: 0, scale: 0.9 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
            }}
            className="absolute inset-0 flex items-center justify-center text-2xl sm:text-4xl md:text-5xl font-bold text-yellow-400 drop-shadow-lg"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            {value}
          </motion.div>
        </AnimatePresence>
      </div>
      <span className="text-xs sm:text-sm text-gray-400 mt-2">{label}</span>
    </div>
  );
}

// ✅ مكون الساعة الرملية
function Hourglass() {
  return (
    <motion.div
      className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400"
      animate={{ rotate: [0, 180, 360] }}
      transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6 2h12v2c0 3.314-2.686 6-6 6s-6-2.686-6-6V2zm12 20H6v-2c0-3.314 2.686-6 6-6s6 2.686 6 6v2z" />
      </svg>
    </motion.div>
  );
}
