import { easeIn, easeInOut, motion } from "framer-motion";
import cometVideo from "/visual.mp4";
import BackToHome from "./BackToHome";

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};
const InvitationPage = () => {
  return (
    <div className="relative w-full h-screen bg-[#0a0a0a] overflow-hidden text-gray-200 font-sans selection:bg-rose-500/30">
      <div className="absolute top-[70%] left-1/2 -translate-x-1/2 z-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="w-[900px] h-[600px] rounded-full blur-[80px] opacity-60"
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, #E5E7EB 120deg, transparent 180deg, #FFE4E6 260deg, transparent 360deg)`,
          }}
        />
      </div>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-rose-900/30 rounded-full blur-[120px] pointer-events-none z-0 mix-blend-screen" />
      <div className="absolute left-10 top-1/4 bottom-1/4 w-px bg-linear-to-b from-transparent via-gray-800 to-transparent opacity-50 hidden md:block" />
      <div className="absolute left-16 top-1/3 bottom-1/3 w-px bg-linear-to-b from-transparent via-gray-800 to-transparent opacity-30 hidden md:block" />

      <div className="absolute bottom-20 left-12 flex flex-col items-center gap-[-10px] space-y-[-25px] md:flex z-20">
        <div className="w-12 h-12 border border-gray-500/40 rounded-full bg-[#0a0a0a]" />
        <div className="w-16 h-16 border border-gray-400/60 rounded-full bg-[#0a0a0a]" />
        <div className="w-8 h-8 border border-gray-600 rounded-full bg-[#0a0a0a]" />
      </div>

      <div className="absolute top-1/3 left-24 hidden md:block opacity-40">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          className="mb-2"
        >
          <path
            d="M30 30 L10 10 M10 10 L25 10 M10 10 L10 25"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
        <p className="font-mono text-[10px] rotate-90 origin-left translate-y-4">
          VECTOR_LINE_RANDOM
        </p>
      </div>

      <div className="absolute right-10 top-1/3 flex-col gap-4 opacity-50 hidden md:flex">
        <div className="w-1.5 h-1.5 rounded-full bg-gray-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-500/50" />
        <div className="w-1.5 h-1.5 rounded-full bg-gray-500/20" />
      </div>

      <div className="absolute right-20 bottom-14 items-center gap-4 opacity-60 hidden md:flex">
        <div className="w-22 h-px bg-gray-600" />
        <span className="font-mono text-xs tracking-widest text-gray-400">
          Intelligent Browsing
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        className="flex justify-between items-start h-fit pt-8 px-10"
      >
        <div className="flex flex-col">
          <svg
            width="100"
            height="40"
            viewBox="0 0 176 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15 28C12.2386 28 10 25.7614 10 23V0H0V23C0 31.2843 6.71573 38 15 38H26V28H15Z"
              fill="url(#paint0_linear_5374_3043)"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M45 10C40.0294 10 36 14.0294 36 19C36 23.9706 40.0294 28 45 28C49.9706 28 54 23.9706 54 19C54 14.0294 49.9706 10 45 10ZM26 19C26 8.50659 34.5066 0 45 0C55.4934 0 64 8.50659 64 19C64 29.4934 55.4934 38 45 38C34.5066 38 26 29.4934 26 19Z"
              fill="url(#paint1_linear_5374_3043)"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M153 10C148.029 10 144 14.0294 144 19C144 23.9706 148.029 28 153 28C157.971 28 162 23.9706 162 19C162 14.0294 157.971 10 153 10ZM134 19C134 8.50659 142.507 0 153 0C163.493 0 172 8.50659 172 19C172 29.4934 163.493 38 153 38C142.507 38 134 29.4934 134 19Z"
              fill="url(#paint2_linear_5374_3043)"
            ></path>
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M85 0C74.5066 0 66 8.50659 66 19C66 29.4934 74.5066 38 85 38H113C114.969 38 116.868 37.7004 118.654 37.1444L124 40L129.768 29.196C131.233 26.4457 132 23.3771 132 20.2607L132 19.1006C132 19.0671 132 19.0335 132 19C132 8.50659 123.493 0 113 0H85ZM122 19C122 14.0294 117.971 10 113 10H85C80.0294 10 76 14.0294 76 19C76 23.9706 80.0294 28 85 28H113C117.947 28 121.962 24.0081 122 19.0696L122 19Z"
              fill="url(#paint3_linear_5374_3043)"
            ></path>
            <path
              d="M176 2.5C176 3.88071 174.881 5 173.5 5C172.119 5 171 3.88071 171 2.5C171 1.11929 172.119 0 173.5 0C174.881 0 176 1.11929 176 2.5Z"
              fill="url(#paint4_linear_5374_3043)"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_5374_3043"
                x1="96.5"
                y1="0"
                x2="96.5"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white"></stop>
                <stop offset="1" stop-color="#ADADAD"></stop>
              </linearGradient>
              <linearGradient
                id="paint1_linear_5374_3043"
                x1="96.5"
                y1="0"
                x2="96.5"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white"></stop>
                <stop offset="1" stop-color="#ADADAD"></stop>
              </linearGradient>
              <linearGradient
                id="paint2_linear_5374_3043"
                x1="96.5"
                y1="0"
                x2="96.5"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white"></stop>
                <stop offset="1" stop-color="#ADADAD"></stop>
              </linearGradient>
              <linearGradient
                id="paint3_linear_5374_3043"
                x1="96.5"
                y1="0"
                x2="96.5"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white"></stop>
                <stop offset="1" stop-color="#ADADAD"></stop>
              </linearGradient>
              <linearGradient
                id="paint4_linear_5374_3043"
                x1="96.5"
                y1="0"
                x2="96.5"
                y2="40"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white"></stop>
                <stop offset="1" stop-color="#ADADAD"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="hidden md:block">
          <span className="font-mono text-xs text-gray-500">
            Early Access Distribution
          </span>
        </div>
      </motion.div>
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-evenly">
        <div className="flex flex-col items-center justify-center gap-16 w-full max-w-4xl mx-auto">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="text-center w-full"
          >
            <h2 className="text-3xl md:text-5xl font-light font-[Montserrat] tracking-[0.2em] text-white/90 drop-shadow-xl uppercase font-display">
              Project{" "}
              <motion.span className="font-bold bg-linear-to-r from-white to-rose-500 bg-clip-text text-transparent">
                Horizon
              </motion.span>
            </h2>
          </motion.div>
          <div className="flex gap-6">
            <InvitationCard />
            <ContentCard />
          </div>
        </div>

        <div className="w-full text-center pb-10 opacity-40">
          <p className="font-[Lato] text-[10px] uppercase tracking-widest">
            Project <b>Horizon</b> • Invite Only • V 0.9.2
          </p>
        </div>
      </div>
      <BackToHome />
    </div>
  );
};

const InvitationCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="group relative w-full md:w-[320px] h-[400px] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl"
    >
      <div className="absolute inset-0 bg-neutral-950 flex flex-col justify-between p-6 z-10">
        <div className="flex justify-between items-center border-b border-white/5 pb-4 z-20">
          <div className="w-8 h-8 rounded-full flex items-center justify-center">
            <div className="w-2 h-2 bg-rose-200" />
          </div>
          <span className="font-mono text-[9px] text-gray-400">
            Inv. ID: #882-ALPHA
          </span>
        </div>

        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <video
            src={cometVideo}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-90 mix-blend-screen scale-125 group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>

        <div className="space-y-1 z-20 relative">
          <div className="absolute -inset-4 bg-linear-to-t from-black via-black/80 to-transparent -z-10 blur-md" />
          <h3 className="text-lg font-medium text-white drop-shadow-md">
            Golden Ticket
          </h3>
          <p className="text-xs text-gray-400 drop-shadow-md">
            Access to the future of browsing.
          </p>
        </div>
      </div>

      <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none z-30" />

      <div className="absolute inset-0 border border-transparent group-hover:border-rose-200/30 rounded-2xl transition-colors duration-300 pointer-events-none z-30" />
    </motion.div>
  );
};

const ContentCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.5 }}
      className="group relative w-full md:w-[320px] h-[400px] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-center p-8"
      style={{
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(255, 255, 255, 0.03)",
      }}
    >
      <div className="absolute inset-0 bg-linear-to-br from-rose-500/10 via-silver-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out" />

      <div className="relative h-full z-10 flex flex-col justify-around">
        <div className="space-y-2">
          <p className="font-[Lato] text-xs text-rose-200/70 tracking-wider">
            INVITATION PENDING
          </p>
          <h3 className="text-2xl font-light text-white leading-tight font-[Montserrat]">
            Claim your <br />
            spot in the{" "}
            <span className="text-rose-100 font-normal">horizon.</span>
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed pt-2 font-[Montserrat]">
            Experience the web at lightspeed. You have been selected for early
            access. Redeem your unique token to launch v1.0.
          </p>
        </div>
          <button className="relative overflow-hidden px-6 py-3 bg-white text-black text-sm font-semibold tracking-wide rounded-[10px] hover:bg-rose-50 transition-colors duration-300 w-full group/btn">
            <span className="relative z-10">ACCEPT INVITE</span>
            <div className="absolute inset-0 bg-rose-200/50 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
          </button>
      </div>

      <div className="absolute top-4 right-4 w-2 h-2 border-t border-r bg-white/20" />
      <div className="absolute top-3 right-5 w-2 h-2 border-t border-r bg-white/20" />
      <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l bg-white/20" />
      <div className="absolute bottom-3 left-5 w-2 h-2 border-b border-l bg-white/20" />
    </motion.div>
  );
};

export default InvitationPage;
