import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hourglass() {
  const [timeLeft, setTimeLeft] = useState(100);

  // محاكاة للوقت المتبقي (اختياري)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 0.5 : 100));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative group">
      {/* Glow Effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      
      <div className="relative w-16 h-24 flex items-center justify-center">
        {/* شكل الساعة نفسها - Updated to Pink/Gray Theme */}
        <div className="absolute w-full h-full border-2 border-pink-400/50 rounded-xl flex flex-col overflow-hidden bg-gray-900/30 backdrop-blur-sm shadow-2xl">
          
          {/* Glass Effect Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-gray-500/5 pointer-events-none"></div>
          
          {/* الجزء العلوي - Pink */}
          <motion.div
            className="relative flex-1 overflow-hidden"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ originY: 1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-pink-500 to-pink-600">
              {/* Sand Particles Effect */}
              <motion.div
                className="absolute inset-0"
                animate={{ y: ["0%", "100%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-gradient-to-t from-pink-400/50 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>
          
          {/* الجزء السفلي - Pink with gradient */}
          <motion.div
            className="relative flex-1 overflow-hidden"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ originY: 0 }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-pink-600 to-pink-500">
              {/* Sand Particles Effect */}
              <motion.div
                className="absolute inset-0"
                animate={{ y: ["-100%", "0%"] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-full h-full bg-gradient-to-b from-pink-400/50 to-transparent"></div>
              </motion.div>
            </div>
          </motion.div>

          {/* Middle Line - Glass Effect */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-pink-400 to-transparent transform -translate-y-1/2"></div>
        </div>

        {/* Side Columns - Glass Effect */}
        <div className="absolute left-0 top-1 w-1 h-5/6 bg-gradient-to-b from-pink-500/30 via-pink-400/20 to-pink-500/30 rounded-full"></div>
        <div className="absolute right-0 top-1 w-1 h-5/6 bg-gradient-to-b from-pink-500/30 via-pink-400/20 to-pink-500/30 rounded-full"></div>

        {/* Top Cap */}
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-t-lg"></div>
        
        {/* Bottom Cap */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-2 bg-gradient-to-r from-pink-600 to-pink-500 rounded-b-lg"></div>

        {/* Time Left Indicator */}
        <motion.div 
          className="absolute -right-8 top-1/2 transform -translate-y-1/2 bg-gray-900/80 backdrop-blur-sm px-2 py-1 rounded-full border border-pink-500/30"
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-xs font-bold text-pink-400">{Math.floor(timeLeft)}%</span>
        </motion.div>

        {/* Floating Particles (Sand) */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-pink-300 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + i * 10}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}