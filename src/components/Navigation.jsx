import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  Github,
  Search,
  Filter,
  SortAsc,
  Calendar,
  TrendingUp,
  Award,
} from "lucide-react";
import MiniCalendar from "./MiniCalendar";

const Navigation = () => {
  // State for search and filters
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [sortBy, setSortBy] = useState("day");
  const [showFilters, setShowFilters] = useState(false);

  // UI Challenges data - will expand as you add more
  const challenges = useMemo(
    () => [
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
          'Landing page for an Intern Management Platform - "Alverno".',
        status: "completed",
        route: "/003",
        technologies: [
          "React",
          "Framer Motion",
          "Tailwind CSS",
          "GSAP",
          "Locomotive",
        ],
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
          'Meet "Defio" - A Decentralized Finance\'s Logo design, showcasing modern UI principles.',
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
        technologies: [
          "React",
          "Web Share API",
          "Framer Motion",
          "Clipboard API",
        ],
        difficulty: "Intermediate",
        completedDate: "2025-08-03",
      },
      {
        day: "011",
        title: "Flash Message",
        description:
          "Interactive toast notifications with contextual theming, smart timing, and action buttons for login, upload, and subscription flows.",
        status: "completed",
        route: "/011",
        technologies: ["React", "Framer Motion", "Tailwind CSS", "Context API"],
        difficulty: "Easy",
        completedDate: "2025-08-04",
      },
      {
        day: "012",
        title: "Ice Cream Shop",
        description:
          "A delightful ice cream shop UI with product listings, cart functionality, and a checkout flow.",
        status: "completed",
        route: "/012",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-05",
      },
      {
        day: "013",
        title: "Direct Messaging",
        description:
          "Marketplace buyer-seller chat UI inspired by Shopify commerce platforms with trust indicators and product context.",
        status: "completed",
        route: "/013",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-06",
      },
      {
        day: "014",
        title: "Countdown Timer",
        description:
          "Retro arcade-style game launch countdown with CRT monitor effects, scanlines, and neon cyberpunk aesthetics.",
        status: "completed",
        route: "/014",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-07",
      },
      {
        day: "015",
        title: "On/Off Switch",
        description:
          "Geometric toggle switch with smooth rhombus-to-circle morphing animation.",
        status: "completed",
        route: "/015",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Easy",
        completedDate: "2025-08-13",
      },
      {
        day: "016",
        title: "Pop-up Overlay",
        description:
          "Premium content gated subscription overlay with sophisticated pricing tiers.",
        status: "completed",
        route: "/016",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-14",
      },
      {
        day: "017",
        title: "Purchase Receipt",
        description:
          "Digital purchase receipt with hybrid professional-playful design and QR tracking.",
        status: "completed",
        route: "/017",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Easy",
        completedDate: "2025-08-18",
      },
      {
        day: "018",
        title: "Analytics Chart",
        description:
          "Finance analytics dashboard featuring a custom line chart for portfolio growth and a donut chart for asset allocation.",
        status: "completed",
        route: "/018",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-19",
      },
      {
        day: "019",
        title: "Leaderboard",
        description:
          "A professional leaderboard UI for top NFT creators, featuring ranks, avatars, stats, and NFT previews in a modern dark theme.",
        status: "completed",
        route: "/019",
        technologies: ["React", "Tailwind CSS"],
        difficulty: "Advanced",
        completedDate: "2025-08-19",
      },
      {
        day: "020",
        title: "Location Tracker",
        description:
          "A location tracker UI for showing people's location in a real-time map.",
        status: "completed",
        route: "/020",
        technologies: ["React", "Tailwind CSS"],
        difficulty: "Easy",
        completedDate: "2025-08-20",
      },
      {
        day: "021",
        title: "Home Monitoring Dashboard",
        description:
          "A smart home dashboard UI with security, CCTV, energy usage, rooms, devices, and environment controls.",
        status: "completed",
        route: "/021",
        technologies: ["React", "Tailwind CSS", "Framer Motion"],
        difficulty: "Advanced",
        completedDate: "2025-08-21",
      },
      {
        day: "022",
        title: "Search Bar",
        description:
          "An immersive search bar UI with contextual suggestions and animations.",
        status: "completed",
        route: "/022",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-22",
      },
      {
        day: "023",
        title: "Onboarding",
        description:
          "A multi-step onboarding flow with progress indicators and animations.",
        status: "completed",
        route: "/023",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-23",
      },
      {
        day: "024",
        title: "Boarding Pass",
        description:
          "A digital boarding pass UI with flight details, QR code, and responsive design.",
        status: "completed",
        route: "/024",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-24",
      },
      {
        day: "025",
        title: "TV App",
        description:
          "A sleek TV app interface showcasing a movies and shows.",
        status: "completed",
        route: "/025",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-25",
      },
      {
        day: "026",
        title: "Subscription",
        description:
          "A subscription modal UI on 8-bit design theme.",
        status: "completed",
        route: "/026",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-26",
      },
      {
        day: "027",
        title: "Dropdowns",
        description:
          "A showcase of various dropdown styles and interactions.",
        status: "completed",
        route: "/027",
        technologies: ["React", "Framer Motion", "Tailwind CSS"],
        difficulty: "Intermediate",
        completedDate: "2025-08-27",
      },
      // Add more challenges as they're completed
    ],
    []
  );

  // Helper Functions
  const getProgressStats = () => {
    const completed = challenges.filter((c) => c.status === "completed").length;
    const total = 100;
    const percentage = (completed / total) * 100;

    // Calculate streak (consecutive days)
    const completedDates = challenges
      .filter((c) => c.status === "completed" && c.completedDate)
      .map((c) => new Date(c.completedDate))
      .sort((a, b) => b - a);

    let currentStreak = 0;
    if (completedDates.length > 0) {
      const today = new Date();
      let checkDate = new Date(completedDates[0]);

      while (
        completedDates.some(
          (date) => date.toDateString() === checkDate.toDateString()
        )
      ) {
        currentStreak++;
        checkDate.setDate(checkDate.getDate() - 1);
      }
    }

    return { completed, total, percentage, currentStreak };
  };

  const getDifficultyStats = () => {
    const stats = challenges.reduce((acc, challenge) => {
      if (challenge.status === "completed") {
        acc[challenge.difficulty] = (acc[challenge.difficulty] || 0) + 1;
      }
      return acc;
    }, {});
    return stats;
  };

  const getTechnologyStats = () => {
    const techCount = {};
    challenges.forEach((challenge) => {
      if (challenge.status === "completed") {
        challenge.technologies.forEach((tech) => {
          techCount[tech] = (techCount[tech] || 0) + 1;
        });
      }
    });

    return Object.entries(techCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([tech, count]) => ({ tech, count }));
  };

  // Filtering and Sorting Logic
  const filteredAndSortedChallenges = useMemo(() => {
    let filtered = challenges.filter((challenge) => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        challenge.technologies.some((tech) =>
          tech.toLowerCase().includes(searchTerm.toLowerCase())
        );

      const matchesDifficulty =
        difficultyFilter === "all" || challenge.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });

    // Sort logic
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "day":
          return parseInt(a.day) - parseInt(b.day);
        case "difficulty": {
          const difficultyOrder = { Easy: 1, Intermediate: 2, Advanced: 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        }
        case "date":
          if (!a.completedDate || !b.completedDate) return 0;
          return new Date(b.completedDate) - new Date(a.completedDate);
        case "title":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    return filtered;
  }, [challenges, searchTerm, difficultyFilter, sortBy]);

  const completedCount = challenges.filter(
    (c) => c.status === "completed"
  ).length;
  const progressPercentage = (completedCount / 100) * 100;

  // Extract completed dates for calendar
  const completedDates = challenges
    .filter((c) => c.status === "completed" && c.completedDate)
    .map((c) => c.completedDate);

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
                  Building UI components, one day at a time, enhancing my UI/UX
                  skills and development practices.
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

        {/* Search and Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="bg-white rounded-2xl p-6 border border-zinc-200 shadow-sm">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search challenges..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-zinc-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`flex items-center gap-2 px-3 py-2 border rounded-lg transition-colors ${
                    showFilters
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 hover:bg-zinc-50"
                  }`}
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-sm">Filters</span>
                </button>

                <div className="flex items-center gap-2 px-3 py-2 border border-zinc-200 rounded-lg bg-white">
                  <SortAsc className="w-4 h-4 text-zinc-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm bg-transparent border-none outline-none focus:ring-0 cursor-pointer min-w-0 px-2"
                  >
                    <option value="day">Day Order</option>
                    <option value="difficulty">Difficulty Level</option>
                    <option value="date">Completion Date</option>
                    <option value="title">Alphabetical</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 pt-4 border-t border-zinc-200"
              >
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-zinc-600">Difficulty:</label>
                    <select
                      value={difficultyFilter}
                      onChange={(e) => setDifficultyFilter(e.target.value)}
                      className="px-3 py-1 border border-zinc-200 rounded text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    >
                      <option value="all">All</option>
                      <option value="Easy">Easy</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-4 ml-auto">
                    <div className="flex items-center gap-1 text-sm text-zinc-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Streak: {getProgressStats().currentStreak}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-zinc-600">
                      <Award className="w-4 h-4" />
                      <span>Total: {completedCount}/100</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Results Counter */}
        {(searchTerm || difficultyFilter !== "all") && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4"
          >
            <p className="text-sm text-zinc-600">
              Showing {filteredAndSortedChallenges.length} of{" "}
              {challenges.length} challenges
              {searchTerm && ` for "${searchTerm}"`}
              {difficultyFilter !== "all" &&
                ` (${difficultyFilter} difficulty)`}
            </p>
          </motion.div>
        )}

        {/* Challenges Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredAndSortedChallenges.length > 0 ? (
            filteredAndSortedChallenges.map((challenge) => (
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
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full text-center py-12"
            >
              <Search className="w-12 h-12 text-zinc-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-zinc-900 mb-2">
                No challenges found
              </h3>
              <p className="text-zinc-600">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center border-b rounded-2xl "
        >
          <div className="bg-white rounded-2xl p-8 border border-zinc-200 shadow-sm">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900">
                  {getProgressStats().currentStreak}
                </div>
                <div className="text-sm text-zinc-600">Day Streak</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900">
                  {Object.values(getDifficultyStats()).reduce(
                    (a, b) => a + b,
                    0
                  )}
                </div>
                <div className="text-sm text-zinc-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900">
                  {getTechnologyStats().length}
                </div>
                <div className="text-sm text-zinc-600">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-zinc-900">
                  {getProgressStats().percentage.toFixed(0)}%
                </div>
                <div className="text-sm text-zinc-600">Progress</div>
              </div>
            </div>

            {/* Mini Calendar Component */}
            <div className="mb-6">
              <MiniCalendar completedDays={completedDates} />
            </div>

            <h3 className="text-xl font-bold text-zinc-900 mb-2">
              Daily UI Challenge
            </h3>
            <p className="text-zinc-600 max-w-2xl mx-auto">
              Hi!, I am following the popular Daily UI challenge to improve my
              design and development skills. Each day features a new UI
              component built with modern web technologies and best practices.
            </p>
            <p className="mt-2 bg-zinc-800 w-fit mx-auto text-white text-sm px-4 py-1 rounded-full hover:outline-1 hover:outline-zinc-800 hover:outline-offset-4 transition-all ease">
              Learning on the go...
            </p>

            {/* Top Technologies */}
            <div className="mt-6">
              <h4 className="text-sm font-medium text-zinc-700 mb-3">
                Most Used Technologies
              </h4>
              <div className="flex flex-wrap justify-center gap-2">
                {getTechnologyStats().map(({ tech, count }) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-xs font-medium flex items-center gap-1"
                  >
                    {tech}
                    <span className="bg-zinc-200 px-1.5 py-0.5 rounded-full text-xs">
                      {count}
                    </span>
                  </span>
                ))}
              </div>
            </div>

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
