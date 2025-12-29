import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Check } from "lucide-react";
import BackToHome from "./BackToHome";

const SaberProgressButton = () => {
  const [status, setStatus] = useState("idle");
  const [progress, setProgress] = useState(0);

  const startDownload = () => {
    setStatus("loading");
    setProgress(0);
  };

  useEffect(() => {
    if (status === "loading") {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setStatus("success"), 600);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center gap-6">
      <motion.button
        layout
        onClick={status === "idle" ? startDownload : undefined}
        whileHover={
          status === "idle"
            ? {
                y: -2,
                boxShadow:
                  "0 12px 24px rgba(255, 255, 255, 0.18), 0 4px 4px rgba(0, 0, 0, 0.6)",
              }
            : {}
        }
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 25,
          mass: 1.2,
        }}
        className={`
          relative flex items-center justify-center overflow-hidden
          ${
            status === "loading"
              ? "w-[450px] h-14 bg-[#0a0a0a] border-gray-800"
              : "w-56 h-14 bg-black border-gray-700"
          }
          ${status === "success" ? "w-64 h-14 bg-black" : ""}
          border rounded-2xl cursor-pointer transition-colors duration-500
        `}
      >
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="idle"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 text-gray-300 font-medium"
            >
              <Download size={20} />
              <span>Initialize Download</span>
            </motion.div>
          )}

          {status === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full px-8 h-full flex items-center"
            >
              <div className="relative w-full h-1.5 bg-gray-900 rounded-full overflow-visible">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-white rounded-full"
                  style={{
                    width: `${progress}%`,
                    boxShadow:
                      "0 0 15px 2px rgba(255, 255, 255, 0.7), 0 0 5px 1px rgba(192, 192, 192, 0.5)",
                  }}
                >
                  {progress < 100 && (
                    <div className="absolute right-0 top-1/2 -translate-y-1/2">
                      {/* Central Glow Point */}
                      <motion.div
                        animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
                        transition={{ repeat: Infinity, duration: 0.1 }}
                        className="w-3 h-3 bg-white rounded-full blur-[2px] translate-x-1/2 shadow-[0_0_15px_#fff]"
                      />
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          animate={{
                            x: [0, Math.random() * 15, 0],
                            y: [0, (Math.random() - 0.5) * 20, 0],
                            opacity: [1, 0],
                          }}
                          transition={{
                            repeat: Infinity,
                            duration: 0.2,
                            delay: i * 0.05,
                          }}
                          className="absolute w-1 h-1 bg-silver rounded-full blur-[1px]"
                        />
                      ))}
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          )}

          {status === "success" && (
            <motion.div
              key="success"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center gap-2 text-white font-bold"
            >
              <Check size={20} strokeWidth={3} />
              <span>COMPLETED</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <div className="h-6">
        <AnimatePresence>
          {status === "loading" && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-sm tracking-[0.2em] uppercase flex items-center gap-2"
            >
              <span className="text-black">Processing</span>
              <span className="w-12 text-right text-black font-black">
                {Math.floor(progress)}%
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default function StatusUpdate() {
  return (
    <>
      <div className="w-full min-h-screen bg-zinc-200 flex items-center justify-center">
        <SaberProgressButton />
        <BackToHome challengeDay="81" challengeTitle="Status Update"/>
      </div>
    </>
  );
}
