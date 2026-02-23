import { useState, useEffect } from "react";
import { Sun, Cloud, Umbrella, Heart, Sparkles, Waves, Clock, Bell, Star } from "lucide-react";

function SummerColon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown to next summer (June 1st)
  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let summerStart = new Date(currentYear, 5, 1); // June 1st
      
      if (now > summerStart) {
        summerStart = new Date(currentYear + 1, 5, 1);
      }
      
      const difference = summerStart - now;
      
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen mt-[-1rem] bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 relative overflow-hidden" dir="rtl">
      
      {/* Animated Background Elements - Light Pink & Gray */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Light Pink Glow Orbs */}
        <div className="absolute top-20 right-20">
          <div className="relative">
            <div className="w-96 h-96 bg-pink-200 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <div className="absolute inset-0 w-96 h-96 bg-pink-300 rounded-full filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>
        
        <div className="absolute bottom-20 left-20">
          <div className="relative">
            <div className="w-80 h-80 bg-gray-300 rounded-full filter blur-3xl opacity-20 animate-pulse"></div>
            <div className="absolute inset-0 w-80 h-80 bg-gray-400 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: "2s" }}></div>
          </div>
        </div>

        {/* Floating Stars - Light Pink */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-pink-200"
            style={{
              top: `${Math.random() * 100}%`,
              right: `${Math.random() * 100}%`,
              animation: `float-star ${10 + i * 2}s linear infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          >
            <Star className="w-6 h-6" />
          </div>
        ))}

        {/* Floating Bubbles in Light Pink */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-pink-200/20 to-pink-300/20"
            style={{
              width: `${Math.random() * 150 + 30}px`,
              height: `${Math.random() * 150 + 30}px`,
              top: `${Math.random() * 100}%`,
              right: `${Math.random() * 100}%`,
              animation: `bubble ${20 + Math.random() * 15}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}

        {/* Decorative Lines */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header with Coming Soon Badge - Light Pink & Gray */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-8">
            <div className="relative">
              {/* Animated Rings */}
              <div className="absolute inset-0 rounded-full animate-ping-slow">
                <div className="w-full h-full border-2 border-pink-300 rounded-full"></div>
              </div>
              <div className="absolute inset-0 rounded-full animate-ping-slower" style={{ animationDelay: "0.5s" }}>
                <div className="w-full h-full border-2 border-pink-200 rounded-full"></div>
              </div>
              
              {/* Main Badge */}
              <div className="relative bg-white/80 backdrop-blur-sm px-10 py-5 rounded-full border-2 border-pink-200 shadow-xl">
                <div className="flex items-center gap-3">
                  <Sparkles className="w-6 h-6 text-pink-300 animate-spin-slow" />
                  <span className="text-3xl capitalize py-4 md:text-4xl font-bold bg-gradient-to-r from-pink-400 via-pink-300 to-gray-600 bg-clip-text text-transparent">
                    coming soon ✦
                  </span>
                  <Sparkles className="w-6 h-6 text-pink-300 animate-spin-slow" />
                </div>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-8xl font-black mb-6">
            <span className="bg-gradient-to-r from-gray-600 to-gray-800 bg-clip-text text-transparent">
              كولكشن
            </span>
            <span className="mx-2 text-pink-300">✦</span>
            <span className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-400 bg-clip-text text-transparent">
              الصيف
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto mb-12">
            استعدي لأحر موسم مع كولكشن الصيف الحصري
          </p>
        </div>

        {/* Countdown Timer - Light Pink & Gray */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-300 to-pink-200 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
            
            <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-pink-200">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-700 flex items-center justify-center gap-3">
                <Clock className="w-8 h-8 text-pink-300" />
                الوقت المتبقي
                <Clock className="w-8 h-8 text-pink-300" />
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "يوم", value: timeLeft.days },
                  { label: "ساعة", value: timeLeft.hours },
                  { label: "دقيقة", value: timeLeft.minutes },
                  { label: "ثانية", value: timeLeft.seconds }
                ].map((item, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-4 border border-pink-200 shadow-md">
                      <div className="text-4xl md:text-5xl font-black text-pink-300 mb-2">
                        {item.value.toString().padStart(2, '0')}
                      </div>
                      <div className="text-sm md:text-base text-gray-500 font-semibold">
                        {item.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Decoration */}
        <div className="text-center mt-20 text-gray-400 text-sm">
          <p className="flex items-center justify-center gap-2">
            <Heart className="w-4 h-4 text-pink-300" />
            استعدي لصيف أحلامك
            <Heart className="w-4 h-4 text-pink-300" />
          </p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float-star {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.3;
          }
          100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes bubble {
          0% {
            transform: translateY(100vh) scale(0) rotate(0deg);
            opacity: 0;
          }
          50% {
            opacity: 0.2;
          }
          100% {
            transform: translateY(-100vh) scale(1.5) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes ping-slow {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.5;
          }
          100% {
            transform: scale(1.5);
            opacity: 0;
          }
        }

        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }

        .animate-ping-slow {
          animation: ping-slow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-ping-slower {
          animation: ping-slow 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default SummerColon;