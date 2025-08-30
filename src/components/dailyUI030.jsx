import { motion } from "framer-motion";
import BackToHome from "./BackToHome";

export default function PricingCard() {
  // Framer Motion variants for staggered letter animation
  const heading = "PRICING";
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.13,
        delayChildren: 0.2,
      },
    },
  };
  const letter = {
    hidden: { opacity: 0, y: 40, scale: 0.7, rotate: -30 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
      },
    },
  };
  const features = [
    "100K API Calls / month",
    "10 GB Cloud Storage",
    "Early Access to Beta APIs",
    "Advanced Analytics Dashboard",
  ];
  return (
    <div className="w-full h-screen flex items-center justify-center bg-[url('/pricingbg2.jpg')] bg-cover bg-no-repeat bg-center">
      <BackToHome />
      <motion.h1
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold font-[Montserrat] bg-gradient-to-b from-[#ff4b4b] tracking-widest to-white bg-clip-text text-transparent"
        style={{
          fontSize: "clamp(3rem, 19vw, 20rem)",
          lineHeight: 1,
        }}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {heading.split("").map((char, i) => (
          <motion.span
            key={i}
            variants={letter}
            whileHover={{
              scale: 1.25,
              color: "#ff4b4b",
              textShadow: "0 0 24px #ff4b4b, 0 0 8px #fff",
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 22,
                duration: 0.35,
              },
            }}
          >
            {char}
          </motion.span>
        ))}
      </motion.h1>
      {/* frame */}
      <motion.div
        className="w-[24rem] bg-[#121212] p-4 relative flex items-center justify-center overflow-hidden"
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 80, damping: 18 }}
        whileHover={{ scale: 1.03, boxShadow: "0 8px 32px #E50A19" }}
      >
        {/* corner circle */}
        <motion.div
          className="absolute -inset-12 z-1 rounded-full w-36 h-36 bg-[#FF0707] blur-[100px]"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        />
        <svg
          width="165"
          height="173"
          viewBox="0 0 165 173"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-52 z-2"
        >
          <g filter="url(#filter0_if_611_287)">
            <path
              d="M175 16.5C162.833 42 76.9 135.6 16.5 156"
              stroke="#5D1616"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </g>
          <defs>
            <filter
              id="filter0_if_611_287"
              x="0.2"
              y="0.199512"
              width="191.1"
              height="172.101"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="0.5" />
              <feComposite
                in2="hardAlpha"
                operator="arithmetic"
                k2="-1"
                k3="1"
              />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
              />
              <feBlend
                mode="normal"
                in2="shape"
                result="effect1_innerShadow_611_287"
              />
              <feGaussianBlur
                stdDeviation="6.9"
                result="effect2_foregroundBlur_611_287"
              />
            </filter>
          </defs>
        </svg>

        <hr className="w-[80%] bg-gradient-to-r from-[#000000]/0 via-50% via-[#D60C0C] to-[#000000]/0 h-[2px] z-4 absolute top-4" />

        {/* main container */}
        <div className="w-full h-full bg-[#D9D9D9]/4 z-2 relative">
          {/* premium badge */}
          <motion.div
            className="absolute top-4 right-4 p-[2px]"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
            whileHover={{ scale: 1.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#F17642] via-50% via-[#E50A19] to-[#370303] blur-[4px] -z-1 rounded-full flex items-center justify-center"></div>
            <div className="w-full h-full z-2 flex items-center justify-center bg-[#121212] rounded-full py-1 px-4">
              <span className="text-white text-xs font-bold font-[Montserrat]">
                PREMIUM
              </span>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold relative w-fit text-white font-[Montserrat] px-4 bg-white/1 backdrop-blur-[4px] py-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 120 }}
            whileHover={{ scale: 1.05, color: "#E50A19" }}
          >
            $49.9
            <span className="text-lg font-normal font-[Montserrat] absolute bottom-0 left-6">
              / month
            </span>
            <div
              className="absolute inset-0 -z-1"
              style={{
                background:
                  "radial-gradient(24.44% 101.59% at 73.33% -1.59%, #731313 0%, rgba(41, 22, 22, 0) 100%)",
              }}
            />
          </motion.h1>
          <motion.ul
            className="mt-8 px-8"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { staggerChildren: 0.25, delayChildren: 0.9 },
              },
            }}
          >
            {features.map((text) => (
              <motion.li
                key={text}
                className="text-sm text-white font-[Montserrat] py-2 flex items-center gap-2"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                whileHover={{ scale: 1.08, color: "#09FA6A" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <mask
                    id="mask0_611_266"
                    style={{ maskType: "alpha" }}
                    maskUnits="userSpaceOnUse"
                    x="0"
                    y="0"
                    width="7"
                    height="8"
                  >
                    <path
                      d="M6.82843 1.17157C6.26902 0.612163 5.55628 0.2312 4.78036 0.0768588C4.00444 -0.077482 3.20017 0.00173146 2.46927 0.304482C1.73836 0.607233 1.11365 1.11992 0.674121 1.77772C0.234596 2.43552 -1.19457e-07 3.20888 0 4C1.19457e-07 4.79113 0.234596 5.56448 0.674122 6.22228C1.11365 6.88008 1.73836 7.39277 2.46927 7.69552C3.20017 7.99827 4.00444 8.07748 4.78036 7.92314C5.55629 7.7688 6.26902 7.38784 6.82843 6.82843L5.73778 5.73778C5.39408 6.08149 4.95618 6.31555 4.47945 6.41038C4.00273 6.5052 3.50859 6.45654 3.05952 6.27053C2.61045 6.08452 2.22663 5.76952 1.95658 5.36537C1.68654 4.96122 1.5424 4.48607 1.5424 4C1.5424 3.51393 1.68654 3.03878 1.95658 2.63463C2.22663 2.23048 2.61045 1.91548 3.05952 1.72948C3.50858 1.54347 4.00273 1.4948 4.47945 1.58962C4.95618 1.68445 5.39408 1.91851 5.73778 2.26222L6.82843 1.17157Z"
                      fill="#09FA6A"
                    />
                  </mask>
                  <g mask="url(#mask0_611_266)">
                    <path
                      d="M1.17157 6.82843C1.73098 7.38784 2.44371 7.7688 3.21964 7.92314C3.99556 8.07748 4.79983 7.99827 5.53073 7.69552C6.26164 7.39277 6.88635 6.88008 7.32588 6.22228C7.7654 5.56448 8 4.79113 8 4C8 3.20887 7.7654 2.43552 7.32588 1.77772C6.88635 1.11992 6.26164 0.607232 5.53073 0.304482C4.79983 0.00173133 3.99556 -0.077482 3.21964 0.0768589C2.44371 0.2312 1.73098 0.612163 1.17157 1.17157L2.26222 2.26222C2.60592 1.91851 3.04382 1.68445 3.52055 1.58962C3.99727 1.4948 4.49141 1.54347 4.94048 1.72947C5.38955 1.91548 5.77337 2.23048 6.04342 2.63463C6.31346 3.03878 6.4576 3.51393 6.4576 4C6.4576 4.48607 6.31346 4.96122 6.04342 5.36537C5.77337 5.76952 5.38955 6.08452 4.94048 6.27053C4.49141 6.45653 3.99727 6.5052 3.52055 6.41038C3.04382 6.31555 2.60592 6.08149 2.26222 5.73778L1.17157 6.82843Z"
                      fill="#09FA6A"
                    />
                    <path
                      d="M0 4C-9.12597e-08 5.04389 0.408083 6.04642 1.13712 6.79355C1.86616 7.54069 2.85839 7.97322 3.90197 7.9988C4.94555 8.02438 5.95778 7.64099 6.72255 6.93048C7.48733 6.21997 7.94404 5.23864 7.9952 4.196L6.45465 4.12042C6.42322 4.76102 6.14261 5.36395 5.67274 5.80049C5.20286 6.23702 4.58094 6.47258 3.93977 6.45686C3.2986 6.44114 2.68897 6.1754 2.24105 5.71636C1.79313 5.25732 1.5424 4.64137 1.5424 4L0 4Z"
                      fill="#09FA6A"
                    />
                  </g>
                </svg>
                {text}
              </motion.li>
            ))}
          </motion.ul>

          {/* cta button */}
          <motion.button
            type="button"
            className="relative p-[6px] mx-auto block my-4 w-fit cursor-pointer hover:scale-105 transition-scale"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{
              delay: 0.6,
              type: "spring",
              stiffness: 180,
              duration: 0.5,
            }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="absolute inset-0 bg-gradient-to-l from-[#F17642] via-50% via-[#E50A19] to-[#370303] blur-[4px] -z-1 rounded-full flex items-center justify-center"></div>
            <div className=" z-2 flex items-center justify-center bg-[#121212] rounded-full py-1 px-6">
              <span className="text-white text-lg font-medium font-[Montserrat]">
                Subscribe To Premium
              </span>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
