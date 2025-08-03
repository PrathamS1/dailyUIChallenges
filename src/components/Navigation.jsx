import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Github,
} from "lucide-react";
import MiniCalendar from './MiniCalendar';

const Navigation = () => {
  // UI Challenges data - will expand as you add more
  const challenges = [
    {
      day: "001",
      title: "Sign Up Page",
      description:
        "Sign Up page for an AI-based development automation platform.",
      status: "completed",
      route: "/001",
      technologies: ["React", "Framer Motion", "Tailwind CSS"],
      difficulty: "Easy",
      completedDate: "2025-07-25",
    },
    {
      day: "002",
      title: "Credit Card Checkout",
      description:
        "Checkout page for a credit card payment system with modern UI.",
      status: "completed",
      route: "/002",
      technologies: ["React", "Framer Motion", "Tailwind CSS"],
      difficulty: "Easy",
      completedDate: "2025-07-26",
    },
    {
      day: "003",
      title: "Landing Page",
      description:
        "Landing page for an Intern Management Platform - \"Alverno\".",
      status: "completed",
      route: "/003",
      technologies: ["React", "Framer Motion", "Tailwind CSS", "GSAP", "Locomotive"],
      difficulty: "Intermediate",
      completedDate: "2025-07-27",
    },
    {
      day: "004",
      title: "Carbon Footprint Calculator",
      description:
        "Professional carbon footprint calculator with live calculations and recommendations.",
      status: "completed",
      route: "/004",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      difficulty: "Intermediate",
      completedDate: "2025-07-28",
    },
    {
      day: "005",
      title: "App Icon/Logo Design",
      description:
        "Meet \"Defio\" - A Decentralized Finance's Logo design, showcasing modern UI principles.",
      status: "completed",
      route: "/005",
      technologies: ["Figma", "Illustrator"],
      difficulty: "Intermediate",
      completedDate: "2025-07-29",
    },
    {
      day: "006",
      title: "User Profile",
      description:
        "A Github x LinkedIn user profile design. Showcasing a modern, clean UI with user's data across the platform.",
      status: "completed",
      route: "/006",
      technologies: ["React", "Tailwind CSS"],
      difficulty: "Intermediate",
      completedDate: "2025-07-30",
    },
    {
      day: "007",
      title: "Focus Mode Settings",
      description:
        "A comprehensive mobile-first Focus Mode Settings UI with app blocking, notification control, and ambient settings.",
      status: "completed",
      route: "/007",
      technologies: ["React", "CSS3", "Mobile-First Design"],
      difficulty: "Intermediate",
      completedDate: "2025-07-31",
    },
    {
      day: "008",
      title: "Custom 404 Page",
      description:
        "A creative 404 error page design that guides users back to the main content.",
      status: "completed",
      route: "/008",
      technologies: ["React", "CSS3", "Mobile-First Design"],
      difficulty: "Easy",
      completedDate: "2025-08-01",
    },
    {
      day: "009",
      title: "Music Player UI",
      description:
        "A sleek music player UI with album artwork, playback controls, and a playlist.",
      status: "completed",
      route: "/009",
      technologies: ["React", "Framer Motion", "Tailwind CSS"],
      difficulty: "Intermediate",
      completedDate: "2025-08-02",
    },
    {
      day: "010",
      title: "Social Share",
      description:
        "Social sharing interface for blog posts and articles with platform-specific optimizations and engagement tracking.",
      status: "completed",
      route: "/010",
      technologies: ["React", "Web Share API", "Framer Motion", "Clipboard API"],
      difficulty: "Intermediate",
      completedDate: "2025-08-03",
    },
    // Add more challenges as they're completed
  ];

  const completedCount = challenges.filter(
    (c) => c.status === "completed"
  ).length;
  const progressPercentage = (completedCount / 100) * 100;

  // Extract completed dates for calendar
  const completedDates = challenges
    .filter(c => c.status === "completed" && c.completedDate)
    .map(c => c.completedDate);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white border-b border-zinc-200 sticky top-0 z-40"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                
                <div>
                  <h1 className="text-xl font-bold text-zinc-900">
                    100 Days UI Challenge
                  </h1>
                  <p className="text-sm text-zinc-600">
                    Daily UI components & designs
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-6 text-sm text-zinc-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span>{completedCount} Completed</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-600" />
                  <span>{100 - completedCount} Remaining</span>
                </div>
              </div>

              <motion.a
                href="https://github.com/PrathamS1/dailyUIChallenges"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2 px-4 py-2 bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span className="hidden md:inline">View Source</span>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-6 py-12">
        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-zinc-900 mb-2">
                  Challenge Progress
                </h2>
                <p className="text-zinc-600">
                  Building UI components, one day at a time, enhancing my UI/UX skills
                  and development practices.
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <div className="text-3xl font-bold text-zinc-900">
                  {completedCount}/100
                </div>
                <div className="text-sm text-zinc-500">Days completed</div>
              </div>
            </div>

            <div className="w-full bg-zinc-200 rounded-full h-3">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="bg-gradient-to-r from-zinc-700 to-zinc-900 h-3 rounded-full"
              />
            </div>
            <div className="text-sm text-zinc-500 mt-2">
              {progressPercentage.toFixed(1)}% Complete
            </div>
          </div>
        </motion.div>

        {/* Challenges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {challenges.map((challenge) => (
            <motion.div
              key={challenge.day}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              {challenge.status === "completed" ? (
                <Link to={challenge.route} className="block">
                  <ChallengeCard challenge={challenge} />
                </Link>
              ) : (
                <div className="cursor-not-allowed">
                  <ChallengeCard challenge={challenge} />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center border-b rounded-2xl "
        >
          <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm">
            {/* Mini Calendar Component */}
            <div className="mb-6">
              <MiniCalendar completedDays={completedDates} />
            </div>
            
            <h3 className="text-xl font-bold text-zinc-900 mb-2">
              Daily UI Challenge
            </h3>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Hi!, I am following the popular Daily UI challenge to improve my design and
              development skills. Each day features a new UI component built
              with modern web technologies and best practices.
            </p>
            <p className="mt-2 bg-zinc-800 w-fit mx-auto text-white text-sm px-4 py-1 rounded-full hover:outline-1 hover:outline-zinc-800 hover:outline-offset-4 transition-all ease">
                Learning on the go...
            </p>
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              {[
                "React",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "Vite",
              ].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

// Challenge Card Component
const ChallengeCard = ({ challenge }) => {
  const isCompleted = challenge.status === "completed";

  return (
    <div
      className={`bg-white rounded-2xl p-6 border transition-all duration-300 h-full ${
        isCompleted
          ? "border-zinc-200 hover:border-zinc-300 hover:shadow-lg"
          : "border-zinc-100 opacity-60"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-white ${
              isCompleted ? "bg-zinc-900" : "bg-zinc-400"
            }`}
          >
            {challenge.day}
          </div>
          <div>
            <h3 className="font-bold text-zinc-900">{challenge.title}</h3>
            <span
              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                challenge.status === "completed"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              {challenge.status === "completed" ? "Completed" : "Coming Soon"}
            </span>
          </div>
        </div>

        {isCompleted && (
          <motion.div
            whileHover={{ x: 5 }}
            className="text-zinc-400 group-hover:text-zinc-600"
          >
            <ArrowRight className="w-5 h-5" />
          </motion.div>
        )}
      </div>

      <p className="text-zinc-600 text-sm mb-4 leading-relaxed">
        {challenge.description}
      </p>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs text-zinc-500">Difficulty</span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
              challenge.difficulty
            )}`}
          >
            {challenge.difficulty}
          </span>
        </div>

        <div className="flex flex-wrap gap-1">
          {challenge.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-zinc-100 text-zinc-600 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>

        {challenge.completedDate && (
          <div className="text-xs text-zinc-500 pt-2 border-t border-zinc-100">
            Completed: {new Date(challenge.completedDate).toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
};

const getDifficultyColor = (difficulty) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "Advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default Navigation;
