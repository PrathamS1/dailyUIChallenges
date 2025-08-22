import { useState, useRef, useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { motion, AnimatePresence } from "framer-motion";
import BackToHome from "./BackToHome";

export default function SearchBar() {
  // Mouse movement for background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      mouseX.set(x);
      mouseY.set(y);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);
  const [value, setValue] = useState("");
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [filter, setFilter] = useState("All");
  const suggestions = [
    "React UI inspiration",
    "Tailwind CSS tricks",
    "Modern search bar",
    "Trending animations",
    "Glitch effect",
    "Minimalist design",
    "Neumorphism",
    "Glassmorphism",
    "Dark mode",
    "Accessibility tips",
  ];

  const filteredSuggestions = value
    ? suggestions.filter((s) => s.toLowerCase().includes(value.toLowerCase()))
    : suggestions;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden">
      <BackToHome />
      <motion.div
        className="fixed top-0 left-0 w-screen h-screen -z-10 pointer-events-none"
        style={{ x: springX, y: springY }}
      >
        <img
          src="/abst-bg.png"
          alt="Abstract background"
          className="w-full h-full object-cover absolute top-0 left-0"
          style={{
            minHeight: "100vh",
            minWidth: "100vw",
            zIndex: -10,
            pointerEvents: "none",
          }}
        />
      </motion.div>
      <div className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2 tracking-tight drop-shadow-lg">
          Searchbar Inspired by Retro UI
        </h1>
        <p className="text-lg text-gray-600">
          Find inspiration, trends, and more with a unique search bar UI.
        </p>
      </div>
      <motion.div
        className="relative w-[60%] input-container flex flex-col gap-4"
        initial={{ opacity: 0, y: 60, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{
          duration: 0.7,
          type: "spring",
          stiffness: 80,
          damping: 18,
        }}
      >
        <div className="flex gap-6 items-center">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-16 px-4 border-4 border-black bg-white text-black font-mono text-lg shadow-[8px_8px_0_#000] focus:bg-black focus:text-white focus:border-white transition-all duration-300 outline-none"
          >
            <option>All</option>
            <option>UI</option>
            <option>Data</option>
            <option>Animation</option>
            <option>Design</option>
          </select>
          <div className="relative flex-1">
            <motion.input
              ref={inputRef}
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Search for almost everything..."
              className={`input w-full h-16 px-4 text-lg font-mono text-black bg-white border-4 border-black outline-none transition-all duration-300 shadow-[8px_8px_0_#000] rounded-none
                placeholder:text-gray-500
                focus:bg-black focus:text-white focus:border-white focus:placeholder:text-white
                ${isFocused ? "ring-4 ring-blue-300" : ""}
                ${value ? "font-bold tracking-wide" : ""}
              `}
              style={{
                boxShadow: isFocused ? "12px 12px 0 #000" : "8px 8px 0 #000",
                transform: isFocused ? "translate(-4px, -4px)" : "none",
              }}
              initial={{ scale: 0.98, opacity: 0.8 }}
              animate={{ scale: isFocused ? 1.03 : 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 text-black pointer-events-none select-none ${
                isFocused ? "text-white" : ""
              }`}
              style={{
                animation: "blink 0.7s step-end infinite",
              }}
            >
              |
            </span>
          </div>
          <motion.button
            className="h-16 px-8 bg-black text-white font-bold border-4 border-black shadow-[8px_8px_0_#000] transition-all duration-300 hover:bg-white hover:text-black hover:border-white hover:shadow-[12px_12px_0_#000] active:scale-95"
            onClick={() => alert(`Searching for: ${value} (${filter})`)}
            whileHover={{ scale: 1.07, boxShadow: "0px 0px 16px #818cf8" }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            Search
          </motion.button>
        </div>
        
        <div className="mt-2">
          <AnimatePresence>
            {isFocused && filteredSuggestions.length > 0 && (
              <motion.ul
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white border-4 border-black shadow-[8px_8px_0_#000] rounded-none p-2 max-h-56 overflow-y-auto"
              >
                {filteredSuggestions.map((s, idx) => (
                  <motion.li
                    key={s}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.25, delay: idx * 0.05 }}
                    className="py-2 px-3 text-lg font-mono text-black hover:bg-black hover:text-white transition-all duration-200 cursor-pointer"
                    onMouseDown={() => setValue(s)}
                  >
                    {s}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <style>
          {`
                /* Subtle input background transition */
                .input {
                  transition: background-color 0.4s cubic-bezier(.4,0,.2,1), color 0.4s cubic-bezier(.4,0,.2,1);
                }
                @keyframes blink {
                    50% { opacity: 0; }
                }
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeInUp 0.5s ease both;
                }
          `}
        </style>
      </motion.div>
    </div>
  );
}
