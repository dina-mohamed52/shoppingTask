import { motion } from "framer-motion";

export default function Hourglass() {
  return (
    <div className="relative w-12 h-20 flex items-center justify-center">
      {/* شكل الساعة نفسها */}
      <div className="absolute w-full h-full border-4 border-yellow-400 rounded-lg flex flex-col overflow-hidden">
        {/* الجزء العلوي */}
        <motion.div
          className="flex-1 bg-yellow-400"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
        {/* الجزء السفلي */}
        <motion.div
          className="flex-1 bg-yellow-400"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* خط فاصل نصفي */}
      <div className="absolute w-2 h-full bg-dark-gray"></div>
    </div>
  );
}
