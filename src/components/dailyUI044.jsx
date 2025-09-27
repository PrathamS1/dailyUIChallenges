import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiGrid, FiList } from "react-icons/fi";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const movies = [
  {
    id: 1,
    title: "Inception",
    year: 2010,
    genre: "Sci-Fi",
    description:
      "A thief who steals corporate secrets through dream-sharing technology is given the inverse task: plant an idea into the mind of a CEO. Layers of reality and memory blur as the team dives deeper.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: 2,
    title: "Spirited Away",
    year: 2001,
    genre: "Animation",
    description:
      "A young girl, Chihiro, stumbles into a world of spirits and must find courage and cleverness to save her parents and return to the human world.",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQs1qUgCaVjH7CwwRYS7gArjgnqR_zNTRU_GA&s",
  },
  {
    id: 3,
    title: "Parasite",
    year: 2019,
    genre: "Drama",
    description:
      "An intricate, darkly comic tale of class conflict. A poor family's clever infiltration into a wealthy household spirals into unexpected and tragic consequences.",
    poster:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaDqKkcUQG8PtYkVwC7RA0iMqDWgGG7W7KcQ&s",
  },
  {
    id: 4,
    title: "Until Dawn",
    year: 2025,
    genre: "Horror",
    description:
      "A group of friends trapped in a time loop, where mysterious foes chase and kill them in gruesome ways, must survive until dawn to escape it.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BZWU4NDY0ODktOGI3OC00NWE1LWIwYmQtNmJiZWU3NmZlMDhkXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: 5,
    title: "The Last of Us",
    year: 2023,
    genre: "Horror",
    description:
      "After a global pandemic destroys civilization, a hardened survivor takes charge of a 14-year-old girl who may be humanity's last hope.",
    poster:
      "https://m.media-amazon.com/images/M/MV5BYWI3ODJlMzktY2U5NC00ZjdlLWE1MGItNWQxZDk3NWNjN2RhXkEyXkFqcGc@._V1_.jpg",
  },
];

function truncate(text, n = 120) {
  if (!text) return "";
  return text.length > n ? text.slice(0, n - 1) + "…" : text;
}

export default function FavoriteSection() {
  const [view, setView] = useState("grid");
  const [favs, setFavs] = useState(() => new Set([1, 2, 3, 4, 5]));

  function toggleFav(id) {
    setFavs((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  }

  return (
    <section className="min-h-screen p-6 md:p-10 bg-gradient-to-br from-black via-[var(--fav-primary)] to-[var(--fav-bg)] text-[var(--fav-text)] font-[Inter]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-16">
          <div>
            <h2 className="text-3xl md:text-4xl font-[Poppins] leading-tight">
              Your Favorites
            </h2>
          </div>

          <div className="flex items-center">
            <div className="relative bg-black/20 rounded-full p-1 flex items-center">
              <button
                onClick={() => setView("grid")}
                className={`relative z-10 px-4 py-2 rounded-full text-sm ${
                  view === "grid" ? "text-white" : "text-white/60"
                }`}
              >
                <FiGrid size={16} />
              </button>

              <button
                onClick={() => setView("list")}
                className={`relative z-10 px-4 py-2 rounded-full text-sm ${
                  view === "list" ? "text-white" : "text-white/60"
                }`}
              >
                <FiList size={16} />
              </button>

              <motion.div
                initial={false}
                animate={{ x: view === "grid" ? "0" : "100%" }}
                className="absolute inset-1 w-[calc(50%-4px)] rounded-full bg-[var(--fav-accent)]"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="mt-6">
          <AnimatePresence mode="sync" initial={false}>
            {view === "grid" ? (
              <motion.div
                key="grid"
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5"
              >
                {movies.map((m) => (
                  <motion.article
                    key={m.id}
                    layout
                    whileHover={{ scale: 1.02 }}
                    className="group relative rounded-2xl overflow-hidden shadow-2xl cursor-pointer bg-black/10"
                  >
                    <img
                      src={m.poster}
                      alt={`${m.title} poster`}
                      className="w-full h-56 sm:h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
                      draggable={false}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent pointer-events-none" />

                    <div className="absolute left-4 right-4 bottom-4 text-[var(--fav-text)]">
                      <h3 className="text-lg font-semibold font-[Poppins] leading-tight">
                        {m.title}
                      </h3>
                      <div className="text-sm text-[var(--fav-text-muted)] mt-1">
                        {m.year}
                      </div>
                    </div>

                    <div className="absolute top-3 right-3">
                      <motion.button
                        whileTap={{ scale: 0.85 }}
                        onClick={() => toggleFav(m.id)}
                        aria-label={favs.has(m.id) ? "Unfavorite" : "Favorite"}
                        className="opacity-70 hover:opacity-100 transition-opacity bg-black/20 backdrop-blur-sm p-1.5 rounded-full"
                      >
                        <AnimatePresence mode="wait">
                          {favs.has(m.id) ? (
                            <motion.span
                              key="fill"
                              initial={{ scale: 1 }}
                              animate={{
                                scale: [1, 1.2, 1],
                                transition: {
                                  duration: 0.3,
                                  ease: "easeInOut",
                                },
                              }}
                            >
                              <AiFillHeart
                                size={20}
                                className="text-red-500/90"
                              />
                            </motion.span>
                          ) : (
                            <motion.span
                              key="outline"
                              initial={{ scale: 1 }}
                              animate={{
                                scale: 1,
                                transition: {
                                  duration: 0.2,
                                },
                              }}
                            >
                              <AiOutlineHeart
                                size={20}
                                className="text-red-500/90"
                              />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </motion.button>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5"
              >
                {movies.map((m, i) => (
                  <motion.article
                    key={m.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: i * 0.1 },
                    }}
                    whileHover={{
                      y: -4,
                      transition: { duration: 0.2 },
                    }}
                    className="group relative rounded-2xl overflow-hidden bg-black/20 backdrop-blur-sm p-4 flex gap-5 items-center border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="w-28 h-40 flex-shrink-0 rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-300">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        src={m.poster}
                        alt={`${m.title} poster`}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <motion.h3
                            layout
                            className="text-lg font-semibold font-[Poppins] leading-tight"
                          >
                            {m.title}
                          </motion.h3>
                          <div className="text-sm text-[var(--fav-text-muted)] mt-2 flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded-full bg-white/5">
                              {m.genre}
                            </span>
                            <span>•</span>
                            <span>{m.year}</span>
                          </div>
                        </div>

                        <motion.div
                          initial={{ opacity: 0.6 }}
                          whileHover={{ opacity: 1 }}
                          className="ml-2 absolute top-4 right-4"
                        >
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => toggleFav(m.id)}
                            aria-label={
                              favs.has(m.id) ? "Unfavorite" : "Favorite"
                            }
                            className="bg-black/20 backdrop-blur-sm p-2 rounded-full shadow-lg"
                          >
                            <AnimatePresence mode="wait">
                              {favs.has(m.id) ? (
                                <motion.span
                                  key="fill"
                                  initial={{ scale: 0.8 }}
                                  animate={{
                                    scale: [0.8, 1.2, 1],
                                    transition: {
                                      duration: 0.4,
                                      ease: "easeInOut",
                                    },
                                  }}
                                >
                                  <AiFillHeart
                                    size={22}
                                    className="text-red-500"
                                  />
                                </motion.span>
                              ) : (
                                <motion.span
                                  key="outline"
                                  initial={{ scale: 0.8 }}
                                  animate={{ scale: 1 }}
                                >
                                  <AiOutlineHeart
                                    size={22}
                                    className="text-red-500/70"
                                  />
                                </motion.span>
                              )}
                            </AnimatePresence>
                          </motion.button>
                        </motion.div>
                      </div>

                      <motion.p
                        layout
                        className="mt-3 text-sm text-[var(--fav-text-muted)] leading-relaxed"
                      >
                        {truncate(m.description, 140)}
                      </motion.p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
