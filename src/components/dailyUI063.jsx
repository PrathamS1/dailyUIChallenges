import { useRef, useState } from "react";
import BackToHome from "./BackToHome";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCommand,
  FiStar,
  FiChevronDown,
  FiMenu,
  FiSearch,
} from "react-icons/fi";
import { SiNotion, SiOpenai } from "react-icons/si";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { TbBrain, TbCalendarTime } from "react-icons/tb";

const tools = [
  {
    name: "Notion AI",
    description:
      "Your all-in-one workspace that writes, summarizes, and organizes with AI.",
    category: "Writing & Organization",
    link: "https://www.notion.so/product/ai",
    icon: <SiNotion className="w-8 h-8" />,
    color: "bg-gray-100",
  },
  {
    name: "Motion",
    description:
      "An AI planner that automatically builds your perfect daily schedule.",
    category: "Productivity Automation",
    link: "https://www.usemotion.com/",
    icon: <FiCommand className="w-8 h-8" />,
    color: "bg-blue-50",
  },
  {
    name: "GrammarlyGO",
    description:
      "Context-aware AI writing assistant for emails, documents, and chat.",
    category: "Communication & Writing",
    link: "https://www.grammarly.com/grammarlygo",
    icon: <HiOutlinePencilAlt className="w-8 h-8" />,
    color: "bg-green-50",
  },
  {
    name: "Reclaim AI",
    description:
      "An intelligent calendar assistant that prioritizes your focus and breaks.",
    category: "Time Management",
    link: "https://reclaim.ai/",
    icon: <TbCalendarTime className="w-8 h-8" />,
    color: "bg-purple-50",
  },
  {
    name: "ChatGPT (OpenAI)",
    description:
      "Your conversational copilot for ideation, research, and content creation.",
    category: "Versatile AI Assistant",
    link: "https://chat.openai.com/",
    icon: <SiOpenai className="w-8 h-8" />,
    color: "bg-teal-50",
  },
  {
    name: "Jasper AI",
    description:
      "AI content generation platform for marketing teams and creators.",
    category: "Marketing & Copywriting",
    link: "https://www.jasper.ai/",
    icon: <TbBrain className="w-8 h-8" />,
    color: "bg-orange-50",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

function TopNav({ onExploreClick }) {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [searching, setIsSearching] = useState(false);
  const handleMouseEnter = (dropdownName) => {
    setActiveDropdown(dropdownName);
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };
  return (
    <header className="w-full fixed top-4 left-0 z-40">
      <div className="container mx-auto px-4">
        <motion.nav
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white/70 backdrop-blur-md border border-slate-100 rounded-full shadow-sm px-4 py-2 flex items-center justify-between gap-4"
          aria-label="Primary"
        >
          {/* Left: brand */}
          <div className="flex items-center gap-3">
            <div className="flex font-black items-center">
              <img
                src="/logo.png"
                className="w-10 h-10 object-cover rounded-full"
                alt=""
              />
              Toooly
            </div>
          </div>

          {/* Center: nav links */}
          <ul className="hidden md:flex items-center gap-6 text-sm text-slate-700">
            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter("bestOf")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-2 hover:text-blue-700 focus:outline-none">
                Best Of
                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "bestOf" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full pt-3 min-w-[220px] ${
                  activeDropdown === "bestOf"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                } transition-all duration-200`}
              >
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-2">
                  <ul className="py-1">
                    <li>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        AI Tools
                      </a>
                    </li>
                    <li>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Design Systems
                      </a>
                    </li>
                    <li>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        UX Patterns
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter("collections")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-2 hover:text-blue-700 focus:outline-none">
                Collections
                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "collections" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full pt-3 w-[680px] ${
                  activeDropdown === "collections"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                } transition-all duration-200`}
              >
                <div className="bg-white rounded-xl shadow-lg border border-slate-100">
                  <div className="p-5 grid grid-cols-3 gap-4">
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase">
                        Productivity
                      </h4>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        AI Planners
                      </a>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Time Savers
                      </a>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Workflows
                      </a>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase">
                        Content
                      </h4>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Copy & Marketing
                      </a>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Design Assistants
                      </a>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Research Tools
                      </a>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-semibold text-slate-500 uppercase">
                        Community
                      </h4>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Creators
                      </a>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Teams
                      </a>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Case Studies
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li className="group relative">
              <a className="hover:text-blue-700" href="#">
                Inspiration
              </a>
            </li>

            <li
              className="relative"
              onMouseEnter={() => handleMouseEnter("explore")}
              onMouseLeave={handleMouseLeave}
            >
              <button className="flex items-center gap-2 hover:text-blue-700 focus:outline-none">
                Explore
                <FiChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    activeDropdown === "explore" ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`absolute left-0 top-full pt-3 min-w-[220px] ${
                  activeDropdown === "explore"
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                } transition-all duration-200`}
              >
                <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-2">
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={onExploreClick}
                        className="w-full text-left px-3 py-2 rounded-md hover:bg-slate-50"
                      >
                        Featured Tools
                      </button>
                    </li>
                    <li>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Latest Picks
                      </a>
                    </li>
                    <li>
                      <a
                        className="block px-3 py-2 rounded-md hover:bg-slate-50"
                        href="#"
                      >
                        Curated Sets
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>

          {/* Right: actions */}
          <div className="flex items-center gap-3 relative">
            {searching && (

              <motion.input
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: searching ? 180 : 0,
                opacity: searching ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
              onFocus={() => setIsSearching(true)}
              onBlur={() => setIsSearching(false)}
              type="text"
              className="border border-gray-500/40 py-1 px-2 rounded-full text-sm outline-blue-400"
              placeholder="Search for tools.."
              />
            )}
            <button className="hidden md:flex items-center gap-2 px-3 py-2 rounded-full cursor-pointer hover:bg-slate-100" onClick={() => setIsSearching(!searching)}>
              <FiSearch className="w-4 h-4 text-slate-600" />
            </button>

            <button
              onClick={onExploreClick}
              className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 text-white text-sm hover:bg-blue-700 shadow-sm"
            >
              Explore Tools
              <FiArrowRight className="w-4 h-4" />
            </button>

            {/* mobile menu button */}
            <button className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/60 border border-slate-100 shadow-sm">
              <FiMenu className="w-5 h-5 text-slate-700" />
            </button>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}

export default function BestOfPage() {
  const toolsRef = useRef(null);

  const scrollToTools = () => {
    toolsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 font-['DM_Sans',sans-serif]">
      <BackToHome challengeTitle="Best Of Page" challengeDay="63" />
      <TopNav onExploreClick={scrollToTools} />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 pt-20 pb-32 text-center h-screen flex flex-col justify-center items-center bg-[url('/absBack.jpg')] bg-cover bg-no-repeat  relative"
      >
        <div className="relative z-10">
          <motion.h1
            className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Best Of AI Productivity Tools
          </motion.h1>

          <motion.p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            A handpicked collection of the smartest AI tools boosting focus,
            creativity, and workflow.
          </motion.p>

          <motion.button
            onClick={scrollToTools}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12 inline-flex items-center px-8 py-4 border-2 border-blue-600 text-blue-600 bg-transparent rounded-full hover:bg-blue-600 hover:text-white font-medium shadow-lg hover:shadow-blue-500/25 transition-colors"
          >
            Explore Tools
            <FiArrowRight className="ml-2 w-5 h-5" />
          </motion.button>
        </div>
      </motion.section>

      {/* Tools Grid */}
      <section
        ref={toolsRef}
        className="container mx-auto px-4 py-20 z-20 bg-gradient-to-tr from-[#B6C7C7] via-white to-[#E0F4FF] relative"
      >
        <div className="absolute inset-0 h-full w-16 -z-1 bg-gradient-to-b from-[#D9E7E8] to-[#B6C7C7]" />
        <motion.h2
          className="text-4xl font-bold text-center mb-16 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Featured AI Tools
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {tools.map((tool) => (
            <motion.div
              key={tool.name}
              variants={item}
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-2xl p-8 transition-all hover:shadow-xl border border-gray-100"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 rounded-xl bg-blue-50">{tool.icon}</div>
                <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {tool.category}
                </span>
              </div>

              <h3 className="text-2xl font-semibold mb-3 text-gray-800">
                {tool.name}
              </h3>
              <p className="text-gray-600 mb-6 min-h-[60px]">
                {tool.description}
              </p>

              <a
                href={tool.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-900 font-medium transition-colors"
              >
                Visit Tool
                <FiArrowRight className="ml-2 w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
}
