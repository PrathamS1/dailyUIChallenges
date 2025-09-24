import { motion, useMotionValue, useSpring } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Moon, Sun } from "lucide-react";
import BackToHome from "./BackToHome";

const rotateStyle = `
  @keyframes rotate {
    0% {
      transform: translate(-50%, -50%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -50%) rotate(360deg);
    }
  }
`;

const testimonials = [
  {
    id: 1,
    name: "Emily Chen",
    role: "Operations Director",
    company: "TechFlow Solutions",
    image:
      "https://images.unsplash.com/photo-1542305983-c4100e4b8cd2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBlcnNvbnxlbnwwfDJ8MHx8fDA%3D",
    content:
      "Automated workflows cut department coordination time by 80%. Real-time analytics doubled our team's productivity in 3 months.",
  },
  {
    id: 2,
    name: "James Wilson",
    role: "CFO",
    company: "GrowthWise Capital",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8MnwwfHx8MA%3D%3D",
    content:
      "AI-powered forecasting reduced reporting time by 70% and boosted margins by 25%. Game-changing financial insights for strategic decisions.",
  },
  {
    id: 3,
    name: "Sarah Park",
    role: " Lead Developer",
    company: "CloudServe Pro",
    image:
      "https://images.unsplash.com/photo-1543949806-2c9935e6aa78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGhlYWRzaG90fGVufDB8MXwwfHx8MA%3D%3D",
    content:
      "Cut response times from hours to minutes. AI-powered routing and 40% higher customer satisfaction scores.",
  },
  {
    id: 4,
    name: "Michael Rodriguez",
    role: "CEO",
    company: "Innovate Retail",
    image:
      "https://images.unsplash.com/photo-1710974481447-fb001ad9ad5a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjB8fHBlcnNvbnxlbnwwfDJ8MHx8fDI%3D",
    content:
      "35% reduction in excess inventory. Seamlessly unified online and physical store operations across multiple locations.",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    role: "HR Director",
    company: "TalentForge",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aGVhZHNob3R8ZW58MHwxfDB8fHww",
    content:
      "Streamlined HR processes cut admin work by 60%. Data-driven performance reviews and onboarding at scale.",
  },
  {
    id: 6,
    name: "David Kim",
    role: "Marketing Director",
    company: "Growth Pilots",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHNob3R8ZW58MHwxfDB8fHww",
    content:
      "45% improved campaign efficiency. Real-time ROI tracking across channels led to 3x more qualified leads.",
  },
  {
    id: 7,
    name: "Alexandra Foster",
    role: "Small Business Owner",
    company: "Urban Wellness Co",
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fGhlYWRzaG90fGVufDB8MXwwfHx8MA%3D%3D",
    content:
      "Saves 15 hours weekly with automated scheduling and invoicing. Perfect all-in-one solution for small businesses.",
  },
];

function MouseFollower({ mouseX, mouseY, isDark }) {
  const springConfig = { damping: 25, stiffness: 300 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  const scale = useSpring(1, { damping: 15, stiffness: 150 });

  useEffect(() => {
    const styleSheet = document.createElement("style");
    styleSheet.textContent = rotateStyle;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);

  const darkGradient =
    "linear-gradient(45deg, #6200EA, #9C27B0, #3D5AFE, #651FFF)";
  const lightGradient = "linear-gradient(45deg, #FF06CD, #FFFFFF, #00FFEA)";

  return (
    <motion.div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: "150px",
        height: "150px",
        borderRadius: "50%",
        background: isDark ? darkGradient : lightGradient,
        animation: "rotate 8s linear infinite",
        filter: "blur(30px)",
        transform: "translate(-50%, -50%)",
        zIndex: 0,
        pointerEvents: "none",
        scale: scale,
      }}
      animate={{
        scale: [1, 1.2, 1],
        transition: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
    />
  );
}

function TestimonialCard({ name, role, company, image, content, isDark }) {
  const bgGradient = isDark
    ? "bg-gradient-to-br from-zinc-900/95 via-zinc-900 to-zinc-800/95 border-zinc-800/30"
    : "bg-gradient-to-br from-white/95 via-white to-zinc-50/95 border-zinc-100/50";

  const hoverGradient = isDark
    ? "before:from-violet-600/10 before:via-fuchsia-600/10 before:to-blue-600/10"
    : "before:from-rose-500/10 before:via-rose-500/10 before:to-purple-500/10";

  const hoverShadow = isDark
    ? "0 20px 40px rgba(0,0,0,0.3), 0 0 50px rgba(98, 0, 234, 0.1)"
    : "0 20px 40px rgba(0,0,0,0.1), 0 0 50px rgba(255, 6, 205, 0.1)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -10 }}
      whileInView={{
        opacity: 1,
        y: 0,
        rotateX: 0,
        transition: {
          type: "spring",
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        },
      }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{
        scale: 1.02,
        rotateY: 2,
        boxShadow: hoverShadow,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 30,
        },
      }}
      className={`
        relative overflow-hidden p-8 rounded-3xl
        ${bgGradient}
        border-[0.5px] backdrop-blur-xl shadow-lg
        transition-all duration-500 ease-out w-full h-full
        before:absolute before:inset-0 before:opacity-0 before:transition-opacity
        before:duration-500 before:bg-gradient-to-br
        ${hoverGradient}
        hover:before:opacity-100
        perspective-1000
      `}
    >
      <motion.div
        className="relative z-10 flex flex-col h-full gap-4 justify-center"
        initial={false}
        transition={{ duration: 0.2 }}
      >
        {/* content */}
        <div className="flex-1 flex items-center">
          <motion.p
            className={`
              relative text-lg leading-relaxed font-light
              ${isDark ? "text-zinc-200" : "text-zinc-700"}
              before:content-['"'] before:absolute before:-left-1 before:-top-4
              before:text-4xl before:opacity-50 before:font-serif
            `}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{
              opacity: 1,
              y: 0,
              scale: 1,
              transition: {
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.1,
              },
            }}
            viewport={{ once: true }}
          >
            {content}
          </motion.p>
        </div>

        {/* people */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2,
            },
          }}
          viewport={{ once: true }}
          className={`
            relative flex items-center gap-4 pt-4
            before:absolute before:top-0 before:left-0 before:right-0 before:h-px
            before:bg-gradient-to-r 
            ${
              isDark
                ? "before:from-violet-500/30 before:via-fuchsia-500/20 before:to-transparent"
                : "before:from-pink-500/30 before:via-rose-500/20 before:to-transparent"
            }
          `}
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: 3 }}
            className={`
              relative rounded-full overflow-hidden
              ${
                isDark ? "ring-1 ring-violet-500/30" : "ring-1 ring-pink-500/30"
              }
              after:absolute after:inset-0 
              after:bg-gradient-to-br after:from-transparent 
              ${isDark ? "after:to-violet-600/20" : "after:to-pink-500/20"}
            `}
          >
            <motion.img
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.4 }}
              src={image}
              alt={name}
              className="w-12 h-12 object-cover"
            />
          </motion.div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <motion.h3
                className={`
                  font-medium text-base
                  ${isDark ? "text-white" : "text-zinc-900"}
                `}
              >
                {name}
              </motion.h3>
              <span
                className={`
                  inline-block w-1 h-1 rounded-full
                  ${isDark ? "bg-violet-500/50" : "bg-pink-500/50"}
                `}
              />
              <p
                className={`
                  text-sm font-medium
                  ${isDark ? "text-violet-400" : "text-pink-500"}
                `}
              >
                {role}
              </p>
            </div>

            <div className="flex items-center gap-2 mt-0.5">
              <p
                className={`
                  text-sm
                  ${isDark ? "text-zinc-500" : "text-zinc-400"}
                `}
              >
                {company}
              </p>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className={`
                  w-1.5 h-1.5 rounded-full
                  ${isDark ? "bg-violet-500/40" : "bg-pink-500/40"}
                `}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default function Testimonials() {
  const [isDark, setIsDark] = useState(false);
  const gridRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const currentRef = gridRef.current;
    const handleMouseMove = (e) => {
      const rect = currentRef?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        mouseX.set(x);
        mouseY.set(y);
      }
    };

    if (currentRef) {
      currentRef.addEventListener("mousemove", handleMouseMove);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [mouseX, mouseY]);
  return (
    <div
      className={`min-h-screen pb-10 w-full transition-colors duration-300 ${
        isDark ? "bg-zinc-950" : "bg-zinc-50"
      }`}
    >
      <BackToHome />
      {/* light/dark toggle*/}
      <div className="fixed top-8 right-8 z-50">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsDark((prev) => !prev)}
          className={`
            p-3 rounded-full
            ${
              isDark
                ? "bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
                : "bg-white text-zinc-600 hover:bg-zinc-100"
            }
            shadow-lg
          `}
        >
          {isDark ? <Moon size={20} /> : <Sun size={20} />}
        </motion.button>
      </div>

      {/* header */}
      <div className="relative z-10 text-center pt-20 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className={`
              text-4xl md:text-5xl font-bold mb-4
              ${isDark ? "text-white" : "text-zinc-900"}
            `}
          >
            What People Say
          </h1>
          <div
            className={`
              w-40 h-1 mx-auto rounded-full
              ${
                isDark
                  ? "bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800/5"
                  : "bg-gradient-to-r from-black via-black to-black/5"
              }
            `}
          />
        </motion.div>
      </div>

      {/* testimonial grid */}
      <div
        ref={gridRef}
        className="relative w-[95%] md:max-w-[80%] mx-auto overflow-hidden p-3 rounded-xl"
      >
        <MouseFollower mouseX={mouseX} mouseY={mouseY} isDark={isDark} />
        <motion.div
          className="grid auto-rows-auto gap-3 relative z-10"
          style={{
            gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          }}
          variants={{
            hidden: {
              opacity: 0,
              scale: 0.9,
              filter: "blur(10px)",
            },
            show: {
              opacity: 1,
              scale: 1,
              filter: "blur(0px)",
              transition: {
                staggerChildren: 0.15,
                duration: 0.8,
                ease: [0.19, 1, 0.22, 1],
              },
            },
          }}
          initial="hidden"
          animate="show"
        >
          <div className="col-span-6 md:col-span-2 row-span-1">
            <TestimonialCard {...testimonials[0]} isDark={isDark} />
          </div>

          <div className="col-span-6 md:col-span-2 row-span-1 md:row-span-2">
            <TestimonialCard {...testimonials[1]} isDark={isDark} />
          </div>

          <div className="col-span-6 md:col-span-2 row-span-1">
            <TestimonialCard {...testimonials[2]} isDark={isDark} />
          </div>

          <div className="col-span-6 md:col-span-2 row-span-1">
            <TestimonialCard {...testimonials[3]} isDark={isDark} />
          </div>
          <div className="col-span-6 md:col-span-2 row-span-1">
            <TestimonialCard {...testimonials[4]} isDark={isDark} />
          </div>

          <div className="col-span-6 md:col-span-3 row-span-1">
            <TestimonialCard {...testimonials[5]} isDark={isDark} />
          </div>
          <div className="col-span-6 md:col-span-3 row-span-1">
            <TestimonialCard {...testimonials[6]} isDark={isDark} />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
