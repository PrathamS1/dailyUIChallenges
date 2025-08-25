import { useRef, useState } from "react";
import { AiFillHome } from "react-icons/ai";
import { FaChevronLeft, FaChevronRight, FaHeart } from "react-icons/fa";
import { HiMiniUserCircle, HiPlayCircle } from "react-icons/hi2";
import { TbSettingsFilled } from "react-icons/tb";
import { motion } from "framer-motion";

const movies = [
  {
    id: 1,
    title: "The Bad Guys 2",
    summary:
      "The Bad Guys are struggling to find trust and acceptance in their newly minted lives as Good Guys, when they are pulled out of retirement and forced to do 'one last job' by an all-female squad of criminals.",
    genre: "Animated",
    tags: ["Comedy", "Animated", "Adventure"],
    releaseDate: "2025",
    rating: 7.1,
    cover:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/6cecad26-a322-424d-aaa2-6b42cb34feac/dk8m6a3-c86f7e4e-2a25-46df-964c-65dfefc82dc2.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzZjZWNhZDI2LWEzMjItNDI0ZC1hYWEyLTZiNDJjYjM0ZmVhY1wvZGs4bTZhMy1jODZmN2U0ZS0yYTI1LTQ2ZGYtOTY0Yy02NWRmZWZjODJkYzIuanBnIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.tjEUOBzBj4ydiYnbhECNKcS4f48aQ3v7qR_wkVPmW9M",
  },
  {
    id: 2,
    title: "F1: The Movie",
    summary:
      "A Formula One driver comes out of retirement to mentor and team up with a younger driver.",
    genre: "Action",
    tags: ["Drama", "Sport", "Action"],
    releaseDate: "2025",
    rating: 7.8,
    cover: "https://wallpapercave.com/wp/wp15474028.jpg",
  },
  {
    id: 3,
    title: "Jurassic World: Rebirth",
    summary:
      "Five years post-Jurassic World: Dominion (2022), an expedition braves isolated equatorial regions to extract DNA from three massive prehistoric creatures for a groundbreaking medical breakthrough.",
    genre: "Sci-Fi",
    tags: ["Thriller", "Adventure", "Action"],
    releaseDate: "2025",
    rating: 6.4,
    cover: "https://images7.alphacoders.com/139/1397495.jpg",
  },
  {
    id: 4,
    title: "The Fantastic Four: First Steps",
    summary:
      "Forced to balance their roles as heroes with the strength of their family bond, the Fantastic Four must defend Earth from a ravenous space god called Galactus and his enigmatic herald, the Silver Surfer.",
    genre: "Sci-Fi",
    tags: ["Superhero", "Adventure", "Marvel"],
    releaseDate: "2025",
    rating: 7.3,
    cover:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSswC-_pM7AIY_E-HWmhg7wF9puGPgCwzfpEg&s",
  },
  {
    id: 5,
    title: "How to Train Your Dragon",
    summary:
      "As an ancient threat endangers both Vikings and dragons alike on the isle of Berk, the friendship between Hiccup, an inventive Viking, and Toothless, a Night Fury dragon, becomes the key to both species forging a new future together.",
    genre: "Fantasy",
    tags: ["Adventure", "Fantasy", "Family"],
    releaseDate: "2025",
    rating: 7.8,
    cover: "https://images8.alphacoders.com/138/1383707.jpg",
  },
  {
    id: 6,
    title: "The Shawshank Redemption",
    summary:
      "A banker convicted of uxoricide forms a friendship over a quarter century with a hardened convict, while maintaining his innocence and trying to remain hopeful through simple compassion.",
    genre: "Drama",
    tags: ["Drama", "Crime"],
    releaseDate: "1994",
    rating: 9.3,
    cover:
      "https://m.media-amazon.com/images/M/MV5BMTcxMzgyNzk2Ml5BMl5BanBnXkFtZTcwNDEzNTkyMQ@@._V1_.jpg",
  },
  {
    id: 7,
    title: "Weapons",
    summary:
      "When all but one child from the same class mysteriously vanish on the same night at exactly the same time, a community is left questioning who or what is behind their disappearance.",
    genre: "Horror",
    tags: ["Supernatural", "Mystery", "Psychological Horror"],
    releaseDate: "2025",
    rating: 7.8,
    cover:
      "https://www.qualbert.com/wp-content/uploads/2025/08/Weapons-Wallpaper-1170x720.jpg",
  },
];
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.2, ease: "easeOut" },
  },
};
const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      ease: "easeOut",
      duration: 0.6,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: "easeOut", duration: 0.5 } },
};

const Section = ({ title, movies }) => {
  const scrollRef = useRef(null);
  const [hovering, setHovering] = useState(false);

  const container = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.section
      className="relative w-full px-10 py-6"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <h2 className="text-2xl font-bold text-white mb-6 font-[Roboto]">
        {title}
      </h2>
      {hovering && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 bg-black/50 p-2 rounded-full text-white z-10 hover:bg-black/80 transition"
          >
            <FaChevronLeft size={22} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 bg-black/50 p-2 rounded-full text-white z-10 hover:bg-black/80 transition"
          >
            <FaChevronRight size={22} />
          </button>
        </>
      )}
      <motion.div
        ref={scrollRef}
        variants={container}
        className="flex gap-6 overflow-hidden py-2 scroll-smooth relative"
      >
        {movies.slice(0, 15).map((movie, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.05 }}
            className="relative min-w-[220px] h-36 rounded-xl overflow-hidden cursor-pointer group flex-shrink-0"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: `
                linear-gradient(to top, rgba(0,0,0,0.6), transparent),
                url(${movie.cover})
              `,
              }}
            />

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <HiPlayCircle size={50} className="text-white drop-shadow-xl" />
            </motion.div>

            <div className="absolute bottom-2 left-2 right-2 text-white font-[Inter]">
              <p className="text-sm font-medium truncate">{movie.title}</p>
              {title === "Continue Watching" && (
                <div className="w-full bg-gray-700 h-1 rounded-full mt-1">
                  <div
                    className="bg-purple-500 h-1 rounded-full"
                    style={{ width: `${(index + 1) * 18}%` }}
                  />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};
const sidebarVariants = {
  hidden: { x: -80, opacity: 0 },
  show: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 14 },
  },
};
const icons = [
  { id: "home", icon: <AiFillHome size={28} />, label: "Home" },
  {
    id: "movies",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path
          fill="#fff"
          d="m20.84 2.18l-3.93.78l2.74 3.54l1.97-.4zm-6.87 1.36L12 3.93l2.75 3.53l1.96-.39zm-4.9.96l-1.97.41l2.75 3.53l1.96-.39zm-4.91 1l-.98.19a2 2 0 0 0-1.57 2.35L2 10l4.9-.97zM2 10v10a2 2 0 0 0 2 2h16c1.11 0 2-.89 2-2V10z"
        />
      </svg>
    ),
    label: "Movies",
  },
  {
    id: "tv",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24">
        <path
          fill="#fff"
          d="M5.94 1.897c-.375.189-.81.117-1.14-.213c-.421-.42-.421-1.01 0-1.431a1.14 1.14 0 0 1 1.432 0c.33.33.401.764.213 1.139l3.323 3.324l.032.033a3.25 3.25 0 0 1 2.242-.875a3.2 3.2 0 0 1 2.189.843v-.001l3.297-3.225c-.256-.395-.203-.879.156-1.238c.421-.337 1.095-.337 1.432 0c.42.42.42 1.01 0 1.431c-.297.297-.676.384-1.022.264L14.821 5.22a.5.5 0 0 1-.093.076c.327.482.539 1.06.598 1.692H8.842c0-.635.185-1.217.505-1.701a.5.5 0 0 1-.084-.067zM4.883 24C2.442 24 .421 21.979.421 19.537v-7.242c0-2.442 2.021-4.463 4.463-4.463h14.232c2.442 0 4.463 2.02 4.463 4.463v7.242c0 2.442-2.021 4.463-4.463 4.463ZM3.032 13.137v5.642c0 1.347 1.094 2.526 2.526 2.526h12.968c1.348 0 2.527-1.094 2.527-2.526v-5.642c0-1.348-1.095-2.526-2.527-2.526H5.558c-1.432 0-2.526 1.094-2.526 2.526"
        />
      </svg>
    ),
    label: "TV",
  },
  { id: "favorites", icon: <FaHeart size={24} />, label: "Favorites" },
];

export default function TVApp() {
  const [selectedMovie, setSelectedMovie] = useState(movies[4]);
  const [expanded, setExpanded] = useState(false);
  const [active, setActive] = useState("home");

  const summaryTooLong = selectedMovie?.summary?.split(" ").length > 20;

  return (
    <>
      <div className="w-full h-screen bg-gradient-to-br from-[#0b0b0b] via-[#141414] via-60% to-[#2d0f3d]">
        <motion.aside
          variants={sidebarVariants}
          initial="hidden"
          animate="show"
          className="w-24 h-full fixed top-0 left-0 z-50 flex flex-col items-center gap-24 py-6 
                 bg-gradient-to-b from-[#121212] to-[#0f0f0f] 
                 border-r border-gray-800/50 backdrop-blur-md shadow-lg"
        >
          <motion.div
            whileHover={{ rotate: 360, scale: 1.1 }}
            transition={{ duration: 0.6, type: "spring", delay: 0.7 }}
            className="border-2 border-gray-700 rounded-full w-16 h-16 overflow-hidden flex items-center justify-center"
          >
            <img
              src="/logo.png"
              alt="Logo"
              className="w-full h-full object-cover"
            />
          </motion.div>
          <div className="flex flex-col gap-10 items-center justify-center w-full">
            {icons.map((item) => (
              <motion.div
                key={item.id}
                onClick={() => setActive(item.id)}
                whileHover={{ scale: 1.2 }}
                className="relative cursor-pointer group"
              >
                {active === item.id && (
                  <motion.span
                    layoutId="activeIndicator"
                    className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-6 bg-purple-500 rounded-full"
                  />
                )}
                <div
                  className={`text-white transition group-hover:text-purple-400 ${
                    active === item.id
                      ? "text-purple-400 drop-shadow-[0_0_8px_#a855f7]"
                      : "text-gray-300"
                  }`}
                >
                  {item.icon}
                </div>
                <span className="absolute left-14 top-1/2 z-50 -translate-y-1/2 px-2 py-1 bg-black/80 text-xs text-white rounded opacity-0 group-hover:opacity-100 transition">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.aside>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="absolute top-7 left-36 z-10"
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-64 h-12 rounded-4xl p-4 bg-white/30 shadow-2xl shadow-[#1e1e1e]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          className="absolute top-7 right-6 flex z-10 items-center gap-4"
        >
          <TbSettingsFilled color="white" size={40} />
          <HiMiniUserCircle color="white" size={40} />
        </motion.div>

        {/* hero */}
        <section className="w-full h-full bg-[#0f0f0f]">
          <div
            key={selectedMovie?.id || selectedMovie?.title}
            className="ml-24 h-full bg-white/50 rounded-tl-2xl rounded-bl-2xl overflow-hidden relative shadow-[0_4px_200px_#3c0b5a]"
          >
            <motion.div
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              style={{
                backgroundImage: `
      linear-gradient(to bottom right, rgba(0,0,0,0.6), rgba(0,0,0,0.3)),
      linear-gradient(to top right, rgba(0,0,0,0.6), transparent),
      url(${selectedMovie?.cover})
    `,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="w-full h-full"
            />

            <motion.div
              className="absolute bottom-14 left-14 text-white z-10 w-4/7"
              variants={containerVariants}
              initial="hidden"
              animate="show"
            >
              <motion.div
                className="flex gap-4 mb-4 font-[Inter]"
                variants={childVariants}
              >
                <p className="text-sm">{selectedMovie?.releaseDate}</p>
                <p className="text-sm">⭐ {selectedMovie?.rating}</p>
              </motion.div>

              {/* Title */}
              <motion.h1
                className="text-6xl font-[Roboto] tracking-wide uppercase font-bold mb-4"
                variants={childVariants}
              >
                {selectedMovie?.title}
              </motion.h1>

              <motion.p
                className={`mb-4 font-[Inter] text-lg ${
                  !expanded ? "line-clamp-2" : ""
                }`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: !expanded ? 2 : "unset",
                  WebkitBoxOrient: "vertical",
                  overflow: !expanded ? "hidden" : "visible",
                  textOverflow: !expanded ? "ellipsis" : "unset",
                }}
                variants={childVariants}
              >
                {selectedMovie?.summary}
              </motion.p>

              {!expanded && summaryTooLong && (
                <motion.button
                  className="text-white underline text-md font-[Roboto]"
                  onClick={() => setExpanded(true)}
                  variants={childVariants}
                >
                  More Info
                </motion.button>
              )}
              {expanded && (
                <motion.button
                  className="text-blue-300 underline text-sm mb-4"
                  onClick={() => setExpanded(false)}
                  variants={childVariants}
                >
                  Show less
                </motion.button>
              )}

              <motion.div
                className="flex gap-4 items-center mt-4"
                variants={childVariants}
              >
                {selectedMovie.tags?.map((tag, index) => (
                  <motion.span
                    key={index}
                    className="bg-black/40 font-[Roboto] px-6 py-2 rounded-full text-md text-white/70"
                    variants={childVariants}
                  >
                    {tag}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col gap-6 absolute top-1/2 -translate-y-1/2 right-8"
          >
            <h2 className="text-white/80 text-lg font-semibold">Last Watched</h2>
            {movies.slice(0, 3).map((movie, index) => {
              const isSelected = selectedMovie?.title === movie.title;

              return (
                <motion.div
                  key={index}
                  variants={item}
                  whileHover={{ scale: 1.05 }}
                  onClick={() => setSelectedMovie(movie)}
                  className={`relative w-60 h-36 rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    isSelected
                      ? "ring-2 ring-purple-500 shadow-lg shadow-purple-500/30 scale-110 -translate-x-4"
                      : "ring-1 ring-gray-700"
                  }`}
                >
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `
              linear-gradient(to top, rgba(0,0,0,0.6), transparent),
              url(${movie.cover})
            `,
                    }}
                  />
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="absolute w-full h-full top-0 left-0 flex items-center justify-center"
                  >
                    <HiPlayCircle size={48} color="white" />
                  </motion.div>

                  <div className="absolute bottom-2 left-2 right-2 text-white">
                    <p
                      className={`text-sm font-medium truncate ${
                        isSelected ? "text-purple-300" : "text-white"
                      }`}
                    >
                      {movie.title}
                    </p>
                    <div className="w-full bg-gray-700 h-1 rounded-full mt-1">
                      <div
                        className="bg-purple-500 h-1 rounded-full"
                        style={{ width: `${(index + 1) * 22}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </section>
        <div className="ml-24 ">
          <section className="w-full pt-8 bg-[radial-gradient(circle_at_80%_80%,rgba(92,0,133,0.25)_0%,rgba(20,20,20,0.95)_60%,#0a0a0a_100%),linear-gradient(135deg,#0a0a0a_0%,#121212_100%)]">
            <Section title="Continue Watching" movies={movies} />
            <Section title="Recommended" movies={movies} />
            <Section title="Popular" movies={movies} />
          </section>
        </div>
      </div>
    </>
  );
}
