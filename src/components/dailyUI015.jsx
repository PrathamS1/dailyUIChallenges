import { useState } from "react";
import { motion } from "framer-motion";
import BackToHome from "./BackToHome";

const GeometricToggle = () => {
  const [isOn, setIsOn] = useState(false);

  const handleToggle = () => {
    setIsOn(!isOn);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-zinc-800 flex items-center justify-center relative overflow-hidden">
      <BackToHome />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, white 1px, transparent 1px),
              radial-gradient(circle at 75% 75%, white 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px, 80px 80px",
          }}
        />
      </div>

      <div className="text-center space-y-12 relative z-10">
        <div>
          <h1 className="text-5xl font-extralight text-white mb-4 tracking-wide">
            Toggle Switch
          </h1>
          <p className="text-xl font-light text-gray-300">
            {isOn ? "On State" : "Off State"}
          </p>
        </div>

        <motion.div
          className="relative mx-auto cursor-pointer"
          onClick={handleToggle}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          style={{
            width: "300px",
            height: "120px",
          }}
        >
          <motion.div
            className="absolute inset-0 rounded-full border-4"
            style={{
              background: isOn
                ? "linear-gradient(135deg, #1a1a1a, #000000)"
                : "linear-gradient(135deg, #2a2a2a, #1a1a1a)",
              borderColor: isOn ? "#ffffff" : "#404040",
              boxShadow: isOn
                ? `
                  inset 0 6px 20px rgba(0,0,0,0.8), 
                  0 12px 40px rgba(255, 255, 255, 0.2),
                  0 0 0 2px rgba(255, 255, 255, 0.1),
                  0 0 20px rgba(255, 255, 255, 0.1)
                `
                : `
                  inset 0 4px 12px rgba(0,0,0,0.5),
                  0 4px 20px rgba(0,0,0,0.3)
                `,
            }}
            animate={{
              borderColor: isOn ? "#ffffff" : "#404040",
              scale: isOn ? [1, 1.02, 1.01] : 1,
            }}
            transition={{
              borderColor: { duration: 0.4 },
              scale: { duration: 0.6, ease: "easeInOut" },
            }}
          />

          <motion.div
            className="absolute top-2 flex items-center justify-center"
            style={{
              width: "96px",
              height: "96px",
            }}
            animate={{
              x: isOn ? 210 : 16,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.8,
            }}
          >
            <motion.div
              className="relative"
              style={{
                width: isOn ? "100px" : "80px",
                height: isOn ? "100px" : "80px",
                background: isOn
                  ? `linear-gradient(135deg, #ffffff, #f0f0f0)`
                  : `linear-gradient(135deg, #4a4a4a, #2a2a2a)`,
                boxShadow: isOn
                  ? `
                    0 20px 50px rgba(255, 255, 255, 0.3),
                    0 8px 20px rgba(0,0,0,0.6),
                    inset -8px -8px 16px rgba(220, 220, 220, 0.4),
                    inset 8px 8px 16px rgba(255, 255, 255, 0.8)
                  `
                  : `
                    0 12px 30px rgba(0, 0, 0, 0.6), 
                    0 4px 12px rgba(0,0,0,0.4),
                    inset -4px -4px 8px rgba(0, 0, 0, 0.3),
                    inset 4px 4px 8px rgba(100, 100, 100, 0.2)
                  `,
              }}
              animate={{
                borderRadius: isOn ? "20px" : "50%",
                rotate: isOn ? 45 : 0,
                scale: isOn ? [1, 1.2, 1.15] : [1, 0.95, 1],
              }}
              transition={{
                borderRadius: {
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                },
                rotate: {
                  duration: 0.9,
                  ease: "easeInOut",
                },
                scale: {
                  duration: 0.7,
                  ease: "easeOut",
                },
              }}
            >
              <motion.div
                className="absolute inset-3"
                style={{
                  background: isOn
                    ? `linear-gradient(225deg, 
                        rgba(255,255,255,0.6) 0%, 
                        transparent 40%
                      )`
                    : `linear-gradient(225deg, 
                        rgba(120,120,120,0.3) 0%, 
                        transparent 40%
                      )`,
                  borderRadius: isOn ? "14px" : "50%",
                }}
                animate={{
                  borderRadius: isOn ? "14px" : "50%",
                  opacity: isOn ? 0.8 : 0.6,
                }}
                transition={{
                  duration: 0.8,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
              />

              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                animate={{ opacity: isOn ? 1 : 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <motion.div
                  className="w-4 h-4 border-2 border-black/40"
                  style={{
                    borderRadius: "3px",
                    background:
                      "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))",
                  }}
                  animate={{
                    rotate: isOn ? 45 : 0,
                    scale: isOn ? [0, 1.2, 1] : [1, 0],
                  }}
                  transition={{
                    duration: 0.7,
                    ease: "easeOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: isOn ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={`h-${i}`}
                className="absolute bg-white/40"
                style={{
                  left: "25%",
                  right: "25%",
                  top: `${35 + i * 30}%`,
                  height: "1px",
                }}
                animate={{
                  scaleX: isOn ? [0, 1] : [1, 0],
                  opacity: isOn ? [0, 0.6] : [0.6, 0],
                }}
                transition={{
                  duration: 1.2,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
              />
            ))}

            <motion.div
              className="absolute bg-white/30"
              style={{
                left: "50%",
                top: "30%",
                bottom: "30%",
                width: "1px",
                transform: "translateX(-50%)",
              }}
              animate={{
                scaleY: isOn ? [0, 1] : [1, 0],
                opacity: isOn ? [0, 0.5] : [0.5, 0],
              }}
              transition={{
                duration: 1.5,
                delay: 0.3,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center justify-center space-x-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="flex items-center space-x-3"
            animate={{
              opacity: isOn ? 1 : 0.4,
              scale: isOn ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="w-6 h-6 bg-white transform rotate-45"
              style={{ borderRadius: "20%" }}
            />
            <span className="text-lg font-light text-white">On</span>
          </motion.div>

          <div className="w-px h-8 bg-gray-600" />

          <motion.div
            className="flex items-center space-x-3"
            animate={{
              opacity: !isOn ? 1 : 0.4,
              scale: !isOn ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-6 h-6 bg-gray-400 rounded-full" />
            <span className="text-lg font-light text-white">Off</span>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-16 p-6 rounded-xl bg-white/95 border border-gray-200 shadow-lg max-w-sm mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-5 5v-5zm-9-5h5v5H6v-5zm9-9h5v5l-5-5zM6 3h5v5H6V3z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900">
                  Push Notifications
                </h3>
                <motion.p
                  className="text-xs"
                  animate={{
                    color: isOn ? "#10b981" : "#6b7280",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {isOn ? "Enabled" : "Disabled"}
                </motion.p>
              </div>
            </div>

            <motion.div
              className="relative cursor-pointer"
              onClick={handleToggle}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              style={{ width: "60px", height: "32px" }}
            >
              <motion.div
                className="absolute inset-0 rounded-full border-2"
                style={{
                  background: isOn
                    ? "linear-gradient(135deg, #1a1a1a, #000000)"
                    : "linear-gradient(135deg, #2a2a2a, #1a1a1a)",
                  borderColor: isOn ? "#ffffff" : "#404040",
                  boxShadow: isOn
                    ? `
                      inset 0 2px 6px rgba(0,0,0,0.8), 
                      0 3px 8px rgba(255, 255, 255, 0.2),
                      0 0 0 1px rgba(255, 255, 255, 0.1)
                    `
                    : `
                      inset 0 2px 4px rgba(0,0,0,0.5),
                      0 2px 6px rgba(0,0,0,0.3)
                    `,
                }}
                animate={{
                  borderColor: isOn ? "#ffffff" : "#404040",
                }}
                transition={{ duration: 0.3 }}
              />

              <motion.div
                className="absolute top-1 flex items-center justify-center"
                style={{ width: "24px", height: "24px" }}
                animate={{ x: isOn ? 40 : 4 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  mass: 0.8,
                }}
              >
                <motion.div
                  className="relative"
                  style={{
                    width: "24px",
                    height: "24px",
                    background: isOn
                      ? `linear-gradient(135deg, #ffffff, #f0f0f0)`
                      : `linear-gradient(135deg, #4a4a4a, #2a2a2a)`,
                    boxShadow: isOn
                      ? `
                        0 4px 12px rgba(255, 255, 255, 0.3),
                        0 2px 6px rgba(0,0,0,0.6),
                        inset -2px -2px 4px rgba(220, 220, 220, 0.4),
                        inset 2px 2px 4px rgba(255, 255, 255, 0.8)
                      `
                      : `
                        0 3px 8px rgba(0, 0, 0, 0.6), 
                        0 1px 3px rgba(0,0,0,0.4),
                        inset -1px -1px 2px rgba(0, 0, 0, 0.3),
                        inset 1px 1px 2px rgba(100, 100, 100, 0.2)
                      `,
                  }}
                  animate={{
                    borderRadius: isOn ? "4px" : "50%",
                    rotate: isOn ? 45 : 0,
                    scale: isOn ? [1, 1.1, 1.05] : [1, 0.95, 1],
                  }}
                  transition={{
                    borderRadius: {
                      duration: 0.8,
                      ease: [0.34, 1.56, 0.64, 1],
                    },
                    rotate: {
                      duration: 0.9,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: 0.7,
                      ease: "easeOut",
                    },
                  }}
                >
                  <motion.div
                    className="absolute inset-0.5"
                    style={{
                      background: isOn
                        ? `linear-gradient(225deg, 
                            rgba(255,255,255,0.6) 0%, 
                            transparent 40%
                          )`
                        : `linear-gradient(225deg, 
                            rgba(120,120,120,0.3) 0%, 
                            transparent 40%
                          )`,
                      borderRadius: isOn ? "3px" : "50%",
                    }}
                    animate={{
                      borderRadius: isOn ? "3px" : "50%",
                      opacity: isOn ? 0.8 : 0.6,
                    }}
                    transition={{
                      duration: 0.8,
                      ease: [0.34, 1.56, 0.64, 1],
                    }}
                  />

                  <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    animate={{ opacity: isOn ? 1 : 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <motion.div
                      className="w-1.5 h-1.5 border border-black/40"
                      style={{
                        borderRadius: "1px",
                        background:
                          "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))",
                      }}
                      animate={{
                        rotate: isOn ? 45 : 0,
                        scale: isOn ? [0, 1.2, 1] : [1, 0],
                      }}
                      transition={{
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                    />
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GeometricToggle;
