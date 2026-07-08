import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Clock, Zap, Timer, Sparkles } from "lucide-react";

function ClothesCountdownTimer({ title = "العرض ينتهي خلال", onExpire }) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isExpired, setIsExpired] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // حساب وقت النهاية = الوقت الحالي + 48 ساعة
    const endTime = new Date().getTime() + 48 * 60 * 60 * 1000;

    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = endTime - now;

      if (difference <= 0) {
        setIsExpired(true);
        onExpire?.();
        return {
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      return { hours, minutes, seconds };
    };

    // تحديث القيم الأولية
    setTimeLeft(calculateTimeLeft());

    // تحديث كل ثانية
    const interval = setInterval(() => {
      const newTime = calculateTimeLeft();
      setTimeLeft(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [onExpire]);

  const formatNumber = (num) => String(num).padStart(2, "0");

  const TimeUnit = ({ value, label, delay = 0 }) => (
    <motion.div
      initial={{ scale: 0.8, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, type: "spring" }}
      className="flex flex-col items-center"
    >
      <div className="relative">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 md:px-6 md:py-4 min-w-[60px] md:min-w-[80px] border border-white/20 shadow-lg">
          <motion.span
            key={value}
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-2xl md:text-4xl font-bold text-white font-mono"
            style={{ fontFamily: "'Baloo Bhaijaan 2', 'Cairo', sans-serif" }}
          >
            {formatNumber(value)}
          </motion.span>
        </div>
        {/* Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/20 to-amber-400/20 blur-xl rounded-2xl -z-10" />
      </div>
      <span className="text-[10px] md:text-xs font-medium text-white/70 mt-2 uppercase tracking-wider">
        {label}
      </span>
    </motion.div>
  );

  if (!isClient) {
    return (
      <div className="rounded-3xl p-6 md:p-8" style={{
        background: "linear-gradient(135deg, #3B1F38 0%, #6B2D5E 40%, #3B1F38 100%)",
        boxShadow: "0 20px 60px -20px rgba(59,31,56,0.6)",
      }}>
        <div className="flex items-center justify-center gap-3">
          <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <span className="text-white/60 text-sm">جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (isExpired) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-6 md:p-8 text-center"
        style={{
          background: "linear-gradient(135deg, #3B1F38 0%, #6B2D5E 40%, #3B1F38 100%)",
          boxShadow: "0 20px 60px -20px rgba(59,31,56,0.6)",
        }}
      >
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sparkles className="w-5 h-5 text-amber-400" />
          <span className="text-white font-bold text-lg" style={{ fontFamily: "'Baloo Bhaijaan 2', 'Cairo', sans-serif" }}>
            انتهى العرض! 🎉
          </span>
        </div>
        <p className="text-white/60 text-sm">ترقبوا عروضاً جديدة قريباً</p>
      </motion.div>
    );
  }

  const { hours, minutes, seconds } = timeLeft;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl"
      style={{
        background: "linear-gradient(135deg, #3B1F38 0%, #6B2D5E 40%, #3B1F38 100%)",
        boxShadow: "0 20px 60px -20px rgba(59,31,56,0.6)",
      }}
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        
        {/* Animated particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              top: `${10 + Math.random() * 80}%`,
              left: `${10 + Math.random() * 80}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-6 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 md:gap-3 mb-4 md:mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
          </motion.div>
          <span className="text-white/80 text-sm md:text-base font-medium" style={{ fontFamily: "'Cairo', sans-serif" }}>
            {title}
          </span>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Zap className="w-3 h-3 md:w-4 md:h-4 text-pink-400" />
          </motion.div>
        </div>

        {/* Timer */}
        <div className="flex items-center justify-center gap-2 md:gap-4">
          <TimeUnit value={hours} label="ساعات" delay={0} />
          <span className="text-white/30 text-xl md:text-3xl font-thin">:</span>
          <TimeUnit value={minutes} label="دقائق" delay={0.1} />
          <span className="text-white/30 text-xl md:text-3xl font-thin">:</span>
          <TimeUnit value={seconds} label="ثواني" delay={0.2} />
        </div>

        {/* Progress Bar */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-4 md:mt-6 w-full max-w-md mx-auto h-1 bg-white/10 rounded-full overflow-hidden"
        >
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 via-amber-400 to-pink-400 rounded-full"
            style={{
              backgroundSize: "200% 100%",
              animation: "shimmer 2s linear infinite",
            }}
            initial={{ width: "100%" }}
            animate={{
              width: ["100%", "80%", "60%", "40%", "20%", "0%"],
            }}
            transition={{
              duration: 48 * 60, // 48 ساعة بالثواني
              ease: "linear",
            }}
          />
        </motion.div>

        {/* Total Time Badge */}
        <div className="mt-3 md:mt-4 flex items-center justify-center gap-2">
          <div className="flex items-center gap-1.5 bg-white/5 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
            <Timer className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] md:text-xs text-white/60 font-medium">
              ⏱️ 48 ساعة فقط
            </span>
          </div>
        </div>

        {/* Urgency Badge - when less than 30 minutes left */}
        {hours === 0 && minutes < 30 && minutes > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 md:mt-4 flex items-center justify-center gap-2"
          >
            <div className="flex items-center gap-1.5 bg-red-500/20 backdrop-blur-sm px-3 py-1 rounded-full border border-red-500/30">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
              <span className="text-[10px] md:text-xs text-red-300 font-medium">
                ⚡ ينتهي قريباً! أسرعي
              </span>
            </div>
          </motion.div>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
}

export default ClothesCountdownTimer;