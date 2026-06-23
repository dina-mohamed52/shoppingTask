import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Sparkles, Heart, Star } from "lucide-react";

function Header1st() {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative w-full mx-auto my-8 px-4 sm:px-6"
    >
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-pink-600/20 rounded-3xl blur-2xl"></div>
      
      {/* Main Container */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-950 text-white p-8 sm:p-10 rounded-3xl shadow-2xl border border-pink-500/30 overflow-hidden">
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500 rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gray-500 rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
        </div>

        {/* Sparkle Icons */}
        <div className="absolute top-4 right-4">
          <Sparkles className="w-6 h-6 text-pink-400 animate-spin-slow" />
        </div>
        <div className="absolute bottom-4 left-4">
          <Heart className="w-6 h-6 text-pink-400 animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center">
          {/* Title with Gradient */}
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl sm:text-5xl font-extrabold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-pink-300 to-white">
              {t("header.title")}
            </span>
          </motion.h1>

          {/* Decorative Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="h-1 bg-gradient-to-r from-pink-500 to-pink-600 mx-auto mb-8 rounded-full"
          />

          {/* Description Lines */}
          <div className="space-y-4">
            {/* First Line */}
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="text-base sm:text-xl font-medium text-gray-300 leading-relaxed"
            >
              {t("header.desc1")}{" "}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-pink-600 blur-md opacity-30"></span>
                <span className="relative bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent font-bold">
                  {t("header.highlight")}
                </span>
              </span>{" "}
              {t("header.desc2")}
            </motion.p>

            {/* Second Line */}
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="text-base sm:text-xl font-medium text-gray-300 leading-relaxed"
            >
              {t("header.desc3")}
            </motion.p>
          </div>

          {/* Stats or Additional Info (Optional) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-8 flex items-center justify-center gap-4"
          >
            <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-500/30">
              <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
              <span className="text-sm text-gray-300">1000+ {t("header.happyCustomers", "عميل سعيد")}</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-pink-500/30">
              <Heart className="w-4 h-4 text-pink-400" />
              <span className="text-sm text-gray-300">50+ {t("header.products", "منتج")}</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Glow Line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent"></div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}

export default Header1st;