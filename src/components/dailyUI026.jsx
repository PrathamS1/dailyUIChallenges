import { motion } from "framer-motion";
import LetterGlitch from "../ui/LetterGlitch";

export default function Subscription() {
  return (
    <div className="w-full h-screen flex items-center relative justify-center">
      <LetterGlitch
        glitchSpeed={50}
        centerVignette={true}
        outerVignette={false}
        smooth={true}
      />
      <div className="w-[55%] relative z-10">
        <motion.div
          initial={{ opacity: 0, rotate: 20 }}
          animate={{ opacity: 1, rotate: -12 }}
          whileHover={{ scale: 1.12, boxShadow: "0 0 12px #28623a" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-0 right-0 z-10"
        >
          <div className="relative w-6 h-6">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-6 h-6 bg-emerald-600"
            ></motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute left-1 top-1 w-6 h-6 bg-emerald-800 -z-10"
            ></motion.div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, rotate: 0 }}
          animate={{ opacity: 1, rotate: 12 }}
          whileHover={{ scale: 1.08, boxShadow: "0 0 16px #28623a" }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="absolute -top-4 right-0 z-10"
        >
          <div className="relative w-12 h-12">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-12 h-12 bg-emerald-600"
            ></motion.div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute left-1 top-1 w-12 h-12 bg-emerald-800 -z-10"
            ></motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 80, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-1/3 absolute bottom-0 h-fit z-10 drop-shadow-[4px_0px_20px] drop-shadow-[#0f2027]/80"
        >
          <motion.img
            src="/agent.png"
            className="w-full h-full object-cover"
            alt=""
            initial={{ filter: "blur(2px)", opacity: 0, y: 40 }}
            animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>
        {/* modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
          className="absolute top-0 right-0 w-4/5 border-2 rounded-2xl float-left h-full bg-[radial-gradient(circle_at_30%_30%,#28623a_0%,#0f2027_40%,#000_90%)] -z-1"
        ></motion.div>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="relative w-3/4 h-full float-right m-2 p-[2px] rounded-2xl bg-gradient-to-l from-emerald-600 via-emerald-800 to-transparent"
        >
          <div className="flex flex-col items-center h-full w-full rounded-2xl bg-[#0f2027]/80 backdrop-blur-md p-4 gap-4 text-white">
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.4 }}
              className="text-3xl font-semibold tracking-wider font-[VT323]"
            >
              Access Restricted. Premium Members Only
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.5 }}
              className="text-center px-4 font-[Inter] w-3/4"
            >
              Agent 7 has detected classified content. To proceed, subscribe
              now.
            </motion.p>
            <div className="w-3/4 space-y-4">
              <motion.input
                type="email"
                placeholder="Enter your email"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                className="w-full rounded-xl border border-emerald-700/60 bg-[#0f2027]/60 px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 backdrop-blur-md shadow-inner"
              />
              <div className="flex items-center justify-end gap-4">
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: "0 0 16px #28623a" }}
                  className="rounded-xl bg-[linear-gradient(135deg,#28623a_0%,#0f2027_100%)] px-6 py-2 text-white font-regular text-xl tracking-wider shadow-lg shadow-emerald-900/50 transition-all duration-200 font-[vt323]"
                >
                  Subscribe
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.08, boxShadow: "0 0 12px #0f2027" }}
                  className="rounded-xl border border-emerald-600/70 bg-[#0f2027]/70 px-6 py-2 text-gray-300 font-regular backdrop-blur-sm transition-all duration-200 hover:text-white hover:border-emerald-400 font-[Inter]"
                >
                  Maybe
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
