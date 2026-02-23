import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Clock, Users, Sparkles } from "lucide-react";

export default function OfferCountdown() {
  const { t } = useTranslation();
  const [timeLeft, setTimeLeft] = useState(36000); // 10 ساعات
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
    <div className="relative group max-w-xl mx-auto my-8">
      {/* Glow Effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl p-6 sm:p-8 shadow-2xl border border-pink-500/30 overflow-hidden">
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gray-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        {/* Header with Icon */}
        <div className="relative mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Clock className="w-6 h-6 text-pink-400 animate-pulse" />
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xl sm:text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-300 to-white"
            >
              {t("offer2.title")}
            </motion.h2>
            <Sparkles className="w-5 h-5 text-pink-400 animate-spin-slow" />
          </div>
          
          {/* Decorative Line */}
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto rounded-full"></div>
        </div>

        {/* Hourglass Animation */}
        <div className="flex justify-center mb-6">
          <Hourglass />
        </div>

        {/* Countdown Timer */}
        <div className="flex justify-center gap-3 sm:gap-4 rtl:space-x-reverse mb-6">
          <FlipUnit value={hours} label={t("offer2.hours")} />
          <FlipUnit value={minutes} label={t("offer2.minutes")} />
          <FlipUnit value={seconds} label={t("offer2.seconds")} />
        </div>

        {/* Viewers Counter */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="relative mt-4"
        >
          <div className="flex items-center justify-center gap-3 bg-gray-800/50 backdrop-blur-sm px-4 py-3 rounded-full border border-pink-500/30">
            <Users className="w-4 h-4 text-pink-400" />
            <p className="text-sm sm:text-base text-gray-300">
              {t("offer2.viewers", { count: viewers })}
            </p>
            {/* Live Indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
            </span>
          </div>
        </motion.div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>{t("offer2.timeLeft", "الوقت المتبقي")}</span>
            <span className="text-pink-400">
              {Math.floor((timeLeft / 36000) * 100)}%
            </span>
          </div>
          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-pink-500 to-pink-600 rounded-full"
              initial={{ width: "100%" }}
              animate={{ width: `${(timeLeft / 36000) * 100}%` }}
              transition={{ duration: 1 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FlipUnit({ value, label }) {
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    setIsFlipping(true);
    const timeout = setTimeout(() => setIsFlipping(false), 500);
    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        {/* Glow Effect */}
        <div className={`absolute -inset-1 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl blur-md transition-opacity duration-300 ${
          isFlipping ? "opacity-50" : "opacity-0"
        }`}></div>
        
        {/* Flip Card */}
        <div className="relative w-14 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-to-br from-gray-800 to-gray-900 border-2 border-pink-500/30 rounded-xl shadow-2xl overflow-hidden cursor-default group/card">
          
          {/* Card Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent"></div>
          </div>
          
          <AnimatePresence mode="popLayout">
            <motion.div
              key={value}
              initial={{ rotateX: -90, opacity: 0 }}
              animate={{ 
                rotateX: 0, 
                opacity: 1,
                scale: isFlipping ? 1.1 : 1
              }}
              exit={{ rotateX: 90, opacity: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeInOut",
              }}
              className="absolute inset-0 flex items-center justify-center text-2xl sm:text-4xl md:text-5xl font-bold"
              style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-pink-400 to-pink-300 drop-shadow-lg">
                {value}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Card Reflection */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"></div>
        </div>
      </div>
      
      {/* Label */}
      <span className="text-xs sm:text-sm mt-2 text-gray-400 font-medium">
        {label}
      </span>
    </div>
  );
}

function Hourglass() {
  return (
    <motion.div
      className="relative w-16 h-16 sm:w-20 sm:h-20"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-xl opacity-30 animate-pulse"></div>
      
      {/* Hourglass SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="relative w-full h-full drop-shadow-2xl"
      >
        <defs>
          <linearGradient id="hourglassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="50%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#db2777" />
          </linearGradient>
        </defs>
        
        {/* Top Part */}
        <motion.path
          d="M6 2h12v2c0 3.314-2.686 6-6 6s-6-2.686-6-6V2z"
          fill="url(#hourglassGradient)"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Bottom Part */}
        <motion.path
          d="M18 22H6v-2c0-3.314 2.686-6 6-6s6 2.686 6 6v2z"
          fill="url(#hourglassGradient)"
          animate={{ opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        />
        
        {/* Middle Connector */}
        <motion.circle
          cx="12"
          cy="12"
          r="1.5"
          fill="#ffffff"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Sand Particles */}
        <motion.g
          animate={{ rotate: [0, 180] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        >
          {[...Array(3)].map((_, i) => (
            <motion.circle
              key={i}
              cx="12"
              cy={8 + i * 2}
              r="0.5"
              fill="#ffffff"
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.g>
      </svg>
    </motion.div>
  );
}