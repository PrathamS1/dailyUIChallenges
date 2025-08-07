import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 15,
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  const [prevTimeLeft, setPrevTimeLeft] = useState({
    days: 15,
    hours: 23,
    minutes: 45,
    seconds: 30,
  });

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        setPrevTimeLeft(prev);
        let { days, hours, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else if (days > 0) {
          days--;
          hours = 23;
          minutes = 59;
          seconds = 59;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label, prevValue }) => {
    const digits = value.toString().padStart(2, "0").split("");
    const prevDigits = prevValue.toString().padStart(2, "0").split("");

    return (
      <div className="flex flex-col items-center">
        <motion.div
          className="bg-gray-100 border-4 border-gray-800 p-6 mb-3 min-w-[140px] text-center relative overflow-hidden cursor-pointer"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
          }}
          whileHover={{
            scale: 1.05,
            rotateY: 5,
            backgroundColor: "#f3f4f6",
            borderColor: "#374151",
            transition: { duration: 0.3, ease: "easeOut" },
          }}
          whileTap={{
            scale: 0.98,
            transition: { duration: 0.1 },
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-indigo-50"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gray-800"></div>
          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-800"></div>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent opacity-0"
            whileHover={{
              opacity: 1,
              x: ["-100%", "100%"],
              transition: {
                opacity: { duration: 0.3 },
                x: { duration: 0.8, ease: "easeInOut" },
              },
            }}
          />

          <div className="flex justify-center space-x-2 relative z-10">
            {digits.map((digit, index) => {
              const hasChanged = digit !== prevDigits[index];

              return (
                <motion.div
                  key={index}
                  className="relative h-20 w-10 perspective-1000"
                  animate={
                    hasChanged
                      ? {
                          y: [0, -10, 0],
                          rotateY: [0, 15, 0],
                        }
                      : {}
                  }
                  transition={{
                    duration: 0.6,
                    ease: "easeInOut",
                  }}
                >
                  <div className="relative w-full h-full preserve-3d">
                    {hasChanged ? (
                      <motion.div
                        key={digit}
                        initial={{ rotateX: 90 }}
                        animate={{ rotateX: 0 }}
                        exit={{ rotateX: -90 }}
                        transition={{
                          duration: 0.6,
                          ease: "easeInOut",
                        }}
                        className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-900 font-mono backface-hidden"
                      >
                        {digit}
                      </motion.div>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-gray-900 font-mono">
                        {digit}
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        <div className="text-gray-800 text-sm md:text-base font-bold uppercase tracking-wider font-mono">
          {label}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Retro background pattern */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-gray-400 to-gray-100"></div>
      <div className="max-w-5xl mx-auto text-center relative z-10">

        <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-gray-800"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-gray-800"></div>
        
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4 font-mono tracking-wider">
            LAUNCH COUNTDOWN
          </h1>
          <p className="text-gray-700 text-lg md:text-xl font-mono">
            &gt; SYSTEM ACTIVATION IMMINENT &lt;
          </p>
        </motion.div>

        {/* Timer Container with Retro Box */}
        <div
          className="bg-gray-100 border-4 border-gray-900 p-8 mb-16 relative overflow-hidden mx-auto max-w-4xl shadow-lg"
          style={{
            clipPath:
              "polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))",
          }}
        >
          {/* Box decorative elements */}
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-900"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-gray-900"></div>
          <div className="absolute top-0 left-0 w-2 h-full bg-gray-900"></div>
          <div className="absolute top-0 right-0 w-2 h-full bg-gray-900"></div>

          {/* Timer Display */}
          <div className="flex justify-center items-center space-x-6 md:space-x-8 relative z-10">
            <TimeUnit
              value={timeLeft.days}
              label="DAYS"
              prevValue={prevTimeLeft.days}
            />
            <div className="text-4xl md:text-6xl text-gray-600 font-bold font-mono pb-8">
              :
            </div>
            <TimeUnit
              value={timeLeft.hours}
              label="HOURS"
              prevValue={prevTimeLeft.hours}
            />
            <div className="text-4xl md:text-6xl text-gray-600 font-bold font-mono pb-8">
              :
            </div>
            <TimeUnit
              value={timeLeft.minutes}
              label="MINUTES"
              prevValue={prevTimeLeft.minutes}
            />
            <div className="text-4xl md:text-6xl text-gray-600 font-bold font-mono pb-8">
              :
            </div>
            <TimeUnit
              value={timeLeft.seconds}
              label="SECONDS"
              prevValue={prevTimeLeft.seconds}
            />
          </div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="space-y-6"
        >
          <p className="text-gray-700 text-lg max-w-md mx-auto font-mono">
            &gt; PREPARE FOR SYSTEM INITIALIZATION &lt;
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gray-800 text-white px-8 py-4 font-bold text-lg flex items-center space-x-2 mx-auto shadow-lg border-2 border-gray-900 font-mono tracking-wider hover:bg-gray-700 transition-colors"
            style={{
              clipPath:
                "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
            }}
          >
            <Play className="w-5 h-5" />
            <span>ACTIVATE</span>
          </motion.button>
        </motion.div>

        {/* Countdown Pulse Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-16"
        >
          <div className="flex flex-col items-center space-y-4">
            {/* Pulse Circle */}
            <div className="relative">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="w-12 h-12 rounded-full border-2 border-gray-600 absolute"
              />
              <motion.div
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="w-12 h-12 rounded-full border-2 border-gray-500 absolute"
              />
              <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center relative z-10">
                <div className="w-2 h-2 rounded-full bg-gray-100"></div>
              </div>
            </div>
            
            {/* Minimal Status Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="text-center"
            >
              <motion.p 
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-gray-700 font-mono text-sm tracking-wider"
              >
                COUNTING DOWN...
              </motion.p>
              
              {/* Time Until Launch */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2 }}
                className="mt-3 flex items-center justify-center space-x-2"
              >
                <div className="w-2 h-2 bg-gray-600 transform rotate-45"></div>
                <span className="text-gray-600 font-mono text-xs uppercase tracking-widest">
                  T-{String(timeLeft.days * 24 + timeLeft.hours).padStart(3, '0')}H {String(timeLeft.minutes).padStart(2, '0')}M
                </span>
                <div className="w-2 h-2 bg-gray-600 transform rotate-45"></div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CountdownTimer;
