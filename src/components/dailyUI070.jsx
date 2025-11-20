import React, { useEffect, useMemo, useState, useRef } from "react";
import BackToHome from "./BackToHome";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronLeft,
  FiChevronRight,
  FiSearch,
  FiMapPin,
  FiTwitter,
  FiLinkedin,
  FiYoutube,
  FiGlobe,
} from "react-icons/fi";
const colorTheme = {
  primary: "#C6FF39",
  primaryDark: "#9FCC2D",
  accent: "#40C9FF",
  bg: "#111317",
  card: "#1A1D22",
  muted: "#8A9099",
  text: "#F1F3F9",
  live: "#FF6363",
};

const sampleEvents = [
  {
    id: "e1",
    title: "React Deep Dive Workshop",
    domain: "Web",
    start: addDaysISO(new Date(), 2, 10),
    end: addDaysISO(new Date(), 3, 12),
    location: "Online",
    image: "/event1.png",
    isLive: false,
  },
  {
    id: "e2",
    title: "Algorithm Sprint — 48hr Coding Jam",
    domain: "Coding",
    start: addDaysISO(new Date(), -1, 14),
    end: addDaysISO(new Date(), 1, 16),
    location: "Hybrid",
    image: "/event2.png",
    isLive: true,
  },
  {
    id: "e3",
    title: "Kubernetes Crash Course",
    domain: "DevOps",
    start: addDaysISO(new Date(), 5, 9),
    end: addDaysISO(new Date(), 5, 17),
    location: "Online",
    image: "/event12.png",
    isLive: false,
  },
  {
    id: "e4",
    title: "UI/UX Fundamentals for Devs",
    domain: "Design",
    start: addDaysISO(new Date(), 8, 11),
    end: addDaysISO(new Date(), 8, 15),
    location: "Online",
    image: "/event11.png",
    isLive: false,
  },
  {
    id: "e5",
    title: "Machine Learning Mini-bootcamp",
    domain: "AI/ML",
    start: addDaysISO(new Date(), 12, 10),
    end: addDaysISO(new Date(), 14, 16),
    location: "Campus",
    image: "/event10.png",
    isLive: false,
  },
  {
    id: "e6",
    title: "Serverless Apps with AWS",
    domain: "Cloud",
    start: addDaysISO(new Date(), 20, 9),
    end: addDaysISO(new Date(), 20, 17),
    location: "Online",
    image: "/event9.png",
    isLive: false,
  },
  {
    id: "e7",
    title: "Competitive Programming Live",
    domain: "Coding",
    start: addDaysISO(new Date(), 0, 18),
    end: addDaysISO(new Date(), 0, 21),
    location: "Online",
    image: "/event3.png",
    isLive: true,
  },
  {
    id: "e8",
    title: "Open Source Contributor Camp",
    domain: "Community",
    start: addDaysISO(new Date(), 25, 10),
    end: addDaysISO(new Date(), 25, 16),
    location: "Online",
    image: "/event8.png",
    isLive: false,
  },
  {
    id: "e9",
    title: "Introduction to Blockchain Dev",
    domain: "Web3",
    start: addDaysISO(new Date(), 30, 10),
    end: addDaysISO(new Date(), 30, 16),
    location: "Hybrid",
    image: "/event7.png",
    isLive: false,
  },
  {
    id: "e10",
    title: "Hands-on TypeScript",
    domain: "Web",
    start: addDaysISO(new Date(), 3, 9),
    end: addDaysISO(new Date(), 3, 13),
    location: "Online",
    image: "/event4.png",
    isLive: false,
  },
  {
    id: "e11",
    title: "Cloud Security Essentials",
    domain: "Cloud",
    start: addDaysISO(new Date(), 40, 9),
    end: addDaysISO(new Date(), 40, 16),
    location: "Campus",
    image: "/event6.png",
    isLive: false,
  },
  {
    id: "e12",
    title: "GraphQL API Workshop",
    domain: "Web",
    start: addDaysISO(new Date(), 15, 10),
    end: addDaysISO(new Date(), 15, 14),
    location: "Online",
    image: "/event5.png",
    isLive: false,
  },
];

function addDaysISO(baseDate, daysToAdd = 0, hourOfDay = 10) {
  const d = new Date(baseDate);
  d.setDate(d.getDate() + daysToAdd);
  d.setHours(hourOfDay, 0, 0, 0);
  return d.toISOString();
}
function formatMonthShort(date) {
  const d = new Date(date);
  const month = d.toLocaleString("en-US", { month: "short" });
  const year = String(d.getFullYear()).slice(2);
  return `${month}, ${year}`;
}
function formatCardDateShort(date) {
  const d = new Date(date);
  const day = d.getDate();
  const month = d.toLocaleString("en-US", { month: "short" });
  return `${day} ${month}`;
}
function generateMonthsNextYear() {
  const months = [];
  const now = new Date();
  now.setDate(1); // start of current month
  for (let i = 0; i < 12; i++) {
    const m = new Date(now.getFullYear(), now.getMonth() + i, 1);
    months.push(m);
  }
  return months;
}
function timeLeftText(endISO) {
  const now = Date.now();
  const end = new Date(endISO).getTime();
  const delta = end - now;
  if (delta <= 0) return "Ended";
  const minutes = Math.floor(delta / 60000);
  if (minutes < 60) return `${minutes} min left`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} hr left`;
  const days = Math.floor(hours / 24);
  return `${days} day${days > 1 ? "s" : ""} left`;
}
function chunkArray(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export default function EventListing() {
  const theme = colorTheme;
  const [events] = useState(sampleEvents);
  const [query, setQuery] = useState("");
  const [activeDomainFilter, setActiveDomainFilter] = useState(null);
  const [rightTab, setRightTab] = useState("live");
  const months = useMemo(() => generateMonthsNextYear(), []);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(0);
  
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const fade = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
  };

  const liveEvents = useMemo(
    () =>
      events.filter(
        (e) =>
          e.isLive ||
          (new Date(e.start) <= new Date() && new Date(e.end) >= new Date())
      ),
    [events]
  );

  const selectedMonth = months[selectedMonthIndex];
  const upcomingForMonth = useMemo(() => {
    const year = selectedMonth.getFullYear();
    const month = selectedMonth.getMonth();
    return events
      .filter((e) => {
        const d = new Date(e.start);
        return d.getFullYear() === year && d.getMonth() === month;
      })
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [events, months, selectedMonthIndex]);

  const headerItems = useMemo(
    () =>
      events
        .slice()
        .sort((a, b) => new Date(a.start) - new Date(b.start))
        .slice(0, 4),
    [events]
  );

  const [headerIndex, setHeaderIndex] = useState(0);
  const headerRef = useRef(null);

  useEffect(() => {
    headerRef.current = setInterval(() => {
      setHeaderIndex((i) => (i + 1) % headerItems.length);
    }, 4000);
    return () => clearInterval(headerRef.current);
  }, [headerItems.length]);

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events
      .filter((e) => {
        if (activeDomainFilter && e.domain !== activeDomainFilter) return false;
        if (!q) return true;
        return (
          e.title.toLowerCase().includes(q) ||
          e.domain.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => new Date(a.start) - new Date(b.start));
  }, [events, query, activeDomainFilter]);

  const now = new Date();

  const recommended = filteredEvents.filter((e) => {
    const diff = (new Date(e.start) - now) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  });

  const trending = filteredEvents.filter(
    (e) => new Date(e.start) <= now && new Date(e.end) >= now
  );

  const newReleases = filteredEvents.filter((e) => {
    const diff = (new Date(e.start) - now) / (1000 * 60 * 60 * 24);
    return diff > 10;
  });

  const sections = [
    { title: "Recommended for You", items: recommended },
    { title: "Trending Now", items: trending },
    { title: "New Events", items: newReleases },
  ];

  const initialSliderState = {};
  sections.forEach((_, i) => (initialSliderState[i] = 0));

  const [sectionSlideIndex, setSectionSlideIndex] = useState(initialSliderState);

  function changeSlide(sectionIndex, delta) {
    const items = sections[sectionIndex].items;
    const chunks = Math.max(1, Math.ceil(items.length / 6));
    setSectionSlideIndex((prev) => {
      let next = prev[sectionIndex] + delta;
      if (next < 0) next = chunks - 1;
      if (next >= chunks) next = 0;
      return { ...prev, [sectionIndex]: next };
    });
  }

  function handleSubscribe(e) {
    e.preventDefault();
    const email = (e.target.elements?.email?.value || "").trim();
    if (!email) {
      console.log("enter email");
      return;
    }
    console.log("Subscribed:", email);
    e.target.reset();
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.bg,
        color: theme.text,
        fontFamily:
          "Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto",
      }}
    >
      {/* navbar */}
      <motion.header
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="border-b w-full sticky inset-0 z-50"
        style={{ borderColor: "#e6edf1", backgroundColor: `${theme.bg}` }}
      >
        <div className="w-full px-8 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div>
              <svg
                width="56"
                height="40"
                viewBox="0 0 56 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M23.3333 0C23.7194 0 24.1033 0.00932962 24.4847 0.0280265C24.4924 0.0284028 24.4989 0.0222809 24.4989 0.0145938V0.0145938C24.4989 0.00716838 24.5049 0.0011489 24.5123 0.0011489H45.8418C46.2974 0.00137965 46.6667 0.373466 46.6667 0.83295C46.6666 1.05356 46.5798 1.26515 46.4251 1.42119L40.8322 7.05882H52.7444C53.5415 7.05882 54.27 7.52957 54.5456 8.27757C55.4857 10.829 56 13.5892 56 16.4706C56 29.4655 45.5533 40 32.6667 40C32.2808 40 31.8971 39.9896 31.5158 39.9709C31.5078 39.9705 31.5011 39.9768 31.5011 39.9848V39.9848C31.5011 39.9926 31.4949 39.9989 31.4871 39.9989H10.1582C9.7026 39.9986 9.33333 39.6265 9.33333 39.1671C9.33336 38.9464 9.42022 38.7348 9.57487 38.5788L15.1655 32.9412H3.25562C2.45846 32.9412 1.73002 32.4704 1.4544 31.7224C0.514256 29.171 0 26.4109 0 23.5294C0 10.5345 10.4467 0 23.3333 0ZM31.3177 16.6556C29.3919 14.383 26.5301 12.9412 23.3333 12.9412C17.5343 12.9412 12.8333 17.6817 12.8333 23.5294C12.8333 24.7672 13.0456 25.9547 13.4326 27.0588H20.9989L24.6823 23.3444C26.6081 25.617 29.4699 27.0588 32.6667 27.0588C38.4657 27.0588 43.1667 22.3183 43.1667 16.4706C43.1667 15.2328 42.9544 14.0453 42.5674 12.9412H35.0011L31.3177 16.6556Z"
                  fill="#dff6a5"
                ></path>
              </svg>
            </div>

            <div
              className="font-extrabold text-2xl"
              style={{ color: theme.primaryDark }}
            >
              Devxro
            </div>
          </motion.div>

          <nav className="flex items-center gap-4">
            <button className="text-sm text-gray-300 hover:text-white">
              Explore
            </button>
            <button className="text-sm text-gray-300 hover:text-white">
              Community
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              className="px-4 py-1 rounded-md text-sm shadow outline-1 outline-offset-1 outline-white hover:outline-offset-4 transition-all ease-in"
              style={{
                color: `${theme.text}`,
                border: `1px solid ${theme.primary}`,
              }}
            >
              Host an event
            </motion.button>
          </nav>
        </div>
      </motion.header>

      <main className="w-full px-8 py-8 space-y-10">
                {/* slider */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="rounded-lg overflow-hidden shadow relative w-full h-72 md:h-120"
        >
          <AnimatePresence>
            {headerItems.map((item, idx) =>
              idx === headerIndex ? (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('${item.image}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className="flex h-full items-center px-10 bg-linear-to-r from-black/80 to-transparent">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.15 }}
                      className="text-white max-w-2xl"
                    >
                      <div className="text-sm uppercase opacity-80 mb-2">
                        Featured
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm md:text-base opacity-90">
                        {item.domain} • {formatCardDateShort(item.start)} —{" "}
                        {formatCardDateShort(item.end)}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        className="mt-6 px-5 py-2 rounded-md font-bold"
                        style={{ background: theme.primary, color: theme.card }}
                      >
                        Register
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              ) : null
            )}
          </AnimatePresence>
        </motion.section>

        {/* discover */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-center space-y-5"
        >
          <h2 className="text-3xl font-bold">Discover Events</h2>

          <div className="flex flex-wrap justify-center gap-3">
            {Array.from(new Set(events.map((e) => e.domain))).map((d) => (
              <motion.button
                key={d}
                whileTap={{ scale: 0.96 }}
                onClick={() =>
                  setActiveDomainFilter((prev) => (prev === d ? null : d))
                }
                className="px-5 py-2 rounded-full text-sm font-medium border shadow-sm"
                style={{
                  borderColor:
                    activeDomainFilter === d ? theme.primary : "#e6edf1",
                  background:
                    activeDomainFilter === d
                      ? "rgba(14,165,164,0.1)"
                      : theme.card,
                  color:
                    activeDomainFilter === d ? theme.primaryDark : theme.text,
                }}
              >
                {d}
              </motion.button>
            ))}
          </div>
        </motion.section>

        {/* action bar */}
        <motion.section
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="w-full flex justify-center space-x-4"
        >
          <div className="flex items-center gap-3 bg-white/10 px-5 py-3 rounded-lg shadow-md w-[50%] max-w-4xl">
            <FiSearch className="text-gray-600" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events..."
              className="flex-1 outline-none text-sm"
            />
          </div>

          <motion.select
            whileHover={{ scale: 1.01 }}
            className="text-sm px-3 py-1 rounded-md border"
            style={{ borderColor: "#e6edf1", backgroundColor: `${theme.card}` }}
          >
            <option>Sort: Upcoming</option>
            <option>Popularity</option>
          </motion.select>
        </motion.section>

        {/* listing grid */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* MAIN LEFT LISTING */}
            <div className="lg:col-span-8 space-y-12">
              {sections.map((section, idx) => {
                const items = section.items;
                const chunks = chunkArray(items, 6);
                const current = sectionSlideIndex[idx] || 0;
                if (items.length === 0) return null;

                return (
                  <motion.div
                    key={idx}
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    className="rounded-lg p-6 shadow"
                    style={{ backgroundColor: theme.card }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="text-xl font-semibold">{section.title}</h3>

                      <div className="flex items-center gap-2 text-xl">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => changeSlide(idx, -1)}
                          className="p-2 hover:bg-gray-100/30 hover:text-black rounded"
                        >
                          <FiChevronLeft />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          onClick={() => changeSlide(idx, +1)}
                          className="p-2 hover:bg-gray-100/30 hover:text-black rounded"
                        >
                          <FiChevronRight />
                        </motion.button>
                      </div>
                    </div>

                    {/* Slider */}
                    <div className="overflow-hidden relative">
                      <motion.div
                        animate={{
                          x: `-${(current * 100) / chunks.length}%`,
                        }}
                        transition={{ duration: 0.5 }}
                        className="flex"
                        style={{
                          width: `${chunks.length * 100}%`,
                        }}
                      >
                        {chunks.map((chunk, cIdx) => (
                          <div
                            key={cIdx}
                            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full"
                            style={{ width: `${100 / chunks.length}%` }}
                          >
                            {chunk.map((e) => (
                              <motion.article
                                key={e.id}
                                whileHover={{ y: -4 }}
                                className="relative rounded-lg overflow-hidden h-56 shadow-sm"
                                style={{
                                  backgroundImage: `linear-gradient(rgba(0,0,0,0.15), rgba(0,0,0,0.35)),
                                  url(${e.image})`,
                                  backgroundSize: "cover",
                                  backgroundPosition: "center",
                                }}
                              >
                                <div className="absolute inset-0 flex flex-col justify-between p-4 bg-linear-to-t from-black/70 to-transparent">
                                  <div className="flex justify-between">
                                    <div className="px-3 py-1 text-xs rounded-full text-white bg-black/30">
                                      {e.domain}
                                    </div>
                                  </div>

                                  <div>
                                    <h4 className="text-white text-sm font-semibold leading-tight">
                                      {e.title}
                                    </h4>

                                    <div className="flex items-center justify-between mt-3">
                                      <div className="px-2 py-1 rounded-full text-xs bg-white/90 text-black">
                                        {formatCardDateShort(e.start)}
                                      </div>

                                      <div className="px-2 py-1 rounded-full text-xs text-white bg-black/40 flex items-center gap-1">
                                        <FiMapPin className="text-xs" />{" "}
                                        {e.location}
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                <div className="absolute right-3 top-3 px-2 py-1 text-xs rounded bg-black/70 text-white">
                                  {timeLeftText(e.end)}
                                </div>
                              </motion.article>
                            ))}

                            {/* filler blocks */}
                            {Array.from({ length: 6 - chunk.length }).map(
                              (_, i) => (
                                <div key={i} className="hidden md:block" />
                              )
                            )}
                          </div>
                        ))}
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* RIGHT ASIDE */}
            <aside className="lg:col-span-4 space-y-6">
              <div className="sticky top-6 space-y-6">
                {/* Tabs */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  className="p-5 rounded-lg shadow"
                  style={{ backgroundColor: `${theme.card}` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex bg-gray-100/20 rounded-full p-1">
                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRightTab("live")}
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          rightTab === "live" ? "text-black" : "text-white/50"
                        }`}
                        style={{
                          background:
                            rightTab === "live"
                              ? theme.primaryDark
                              : "transparent",
                        }}
                      >
                        Live
                      </motion.button>

                      <motion.button
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setRightTab("upcoming")}
                        className={`px-4 py-1 rounded-full text-sm font-medium ${
                          rightTab === "upcoming"
                            ? "text-black"
                            : "text-white/50"
                        }`}
                        style={{
                          background:
                            rightTab === "upcoming"
                              ? theme.primaryDark
                              : "transparent",
                        }}
                      >
                        Upcoming
                      </motion.button>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {rightTab === "live" ? (
                      <motion.div
                        key="liveTab"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        {liveEvents.length ? (
                          liveEvents.map((e) => (
                            <motion.div
                              key={e.id}
                              whileHover={{ y: -2 }}
                              className="flex items-center gap-3 p-2 rounded-md border"
                              style={{ borderColor: `${theme.accent}` }}
                            >
                              <img
                                src={e.image}
                                className="w-16 h-12 rounded object-cover"
                              />
                              <div className="flex-1">
                                <div className="text-sm font-semibold">
                                  {e.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {e.domain}
                                </div>
                              </div>
                              <div className="text-xs px-2 py-1 rounded bg-red-100 text-red-600">
                                {timeLeftText(e.end)}
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-sm text-gray-500">
                            No live events
                          </div>
                        )}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="upcomingTab"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-sm font-medium">Upcoming</div>

                          <motion.select
                            whileHover={{ scale: 1.02 }}
                            value={selectedMonthIndex}
                            onChange={(e) =>
                              setSelectedMonthIndex(Number(e.target.value))
                            }
                            className="text-sm rounded-full px-3 py-1 bg-black/40 border"
                            style={{ borderColor: theme.accent }}
                          >
                            {months.map((m, idx) => (
                              <option key={idx} value={idx} className="bg-black">
                                {formatMonthShort(m)}
                              </option>
                            ))}
                          </motion.select>
                        </div>

                        <div className="space-y-3">
                          {upcomingForMonth.map((e) => (
                            <motion.div
                              key={e.id}
                              whileHover={{ y: -2 }}
                              className="flex items-center gap-3 p-2"
                            >
                              <img
                                src={e.image}
                                className="w-14 h-10 rounded object-cover"
                              />
                              <div className="flex-1">
                                <div className="text-sm font-semibold">
                                  {e.title}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {formatCardDateShort(e.start)}
                                </div>
                              </div>
                            </motion.div>
                          ))}

                          {upcomingForMonth.length === 0 && (
                            <div className="text-sm text-gray-500">
                              No events this month
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Host section */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  whileHover={{ y: -4 }}
                  className="bg-gradient-to-br from-[#374b04] to-[#40C9FF] text-white rounded-lg p-6 shadow"
                >
                  <h3 className="text-lg font-bold">Host Your Event</h3>
                  <p className="mt-2 text-sm opacity-90">
                    Reach thousands of developer students. Manage registrations
                    with ease.
                  </p>

                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    className="mt-4 px-4 py-2 rounded-md font-semibold"
                    style={{ background: "#fff", color: theme.bg }}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              </div>
            </aside>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full relative mt-16" aria-labelledby="footer-heading">
        {/* watermark */}
        <div
          aria-hidden="true"
          className="absolute top-[35%] left-1/2 -translate-x-1/2 text-[20rem] flex items-center justify-center pointer-events-none"
          style={{
            zIndex: 11,
            opacity: 0.02,
            fontWeight: 900,
            color: theme.text,
            letterSpacing: 6,
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          DEVXRO
        </div>

        <div className="relative z-10 mx-auto w-full px-6">
          {/* top footer card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="max-w-5xl h-[20rem] mx-auto mb-10"
          >
            <div
              className="rounded-2xl h-full flex items-center overflow-hidden shadow-lg mb-8"
              style={{
                backgroundImage:
                  "linear-gradient(180deg, rgba(5,8,12,0.8), rgba(8,10,15,0.8)), url('/absBg.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: "1px solid rgba(0,0,0,0.06)",
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-8 md:p-10">
                {/* tagline */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="md:col-span-7"
                >
                  <h2 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                    Imaginative minds{" "}
                    <span className="block">for imaginative builders.</span>
                  </h2>
                  <p className="mt-3 text-sm md:text-base text-white/80 max-w-xl">
                    Host and discover workshops, bootcamps and live events
                    tailored for developer learners. Promote, manage and grow
                    your community.
                  </p>
                </motion.div>

                {/* subscribe */}
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="md:col-span-5 flex flex-col items-start md:items-end"
                >
                  <p className="text-sm text-white/90">
                    Get curated updates & event highlights
                  </p>
                  <form
                    onSubmit={handleSubscribe}
                    className="mt-3 w-full md:w-auto flex gap-2"
                  >
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      className="px-3 py-2 rounded-md text-sm outline-none"
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        color: "#fff",
                        border: "1px solid rgba(255,255,255,0.06)",
                      }}
                    />

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      type="submit"
                      className="px-4 py-2 rounded-md text-sm font-semibold inline-flex items-center gap-2"
                      style={{ background: theme.primary, color: "black" }}
                    >
                      Subscribe <FiChevronRight />
                    </motion.button>
                  </form>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* bottom footer card */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="rounded-2xl overflow-hidden mx-auto pt-10"
            style={{
              background: theme.card,
              boxShadow: "0 16px 40px rgba(12,18,35,0.06)",
              border: "1px solid rgba(15,23,42,0.04)",
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 md:p-10">
              {/* logo + socials */}
              <motion.div
                variants={fadeUp}
                className="lg:col-span-3 space-y-4"
              >
                <div className="flex items-center gap-3">
                  <div>
                    <svg
                      width="56"
                      height="40"
                      viewBox="0 0 56 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M23.3333 0C23.7194 0 24.1033 0.00932962 24.4847 0.0280265C24.4924 0.0284028 24.4989 0.0222809 24.4989 0.0145938V0.0145938C24.4989 0.00716838 24.5049 0.0011489 24.5123 0.0011489H45.8418C46.2974 0.00137965 46.6667 0.373466 46.6667 0.83295C46.6666 1.05356 46.5798 1.26515 46.4251 1.42119L40.8322 7.05882H52.7444C53.5415 7.05882 54.27 7.52957 54.5456 8.27757C55.4857 10.829 56 13.5892 56 16.4706C56 29.4655 45.5533 40 32.6667 40C32.2808 40 31.8971 39.9896 31.5158 39.9709C31.5078 39.9705 31.5011 39.9768 31.5011 39.9848V39.9848C31.5011 39.9926 31.4949 39.9989 31.4871 39.9989H10.1582C9.7026 39.9986 9.33333 39.6265 9.33333 39.1671C9.33336 38.9464 9.42022 38.7348 9.57487 38.5788L15.1655 32.9412H3.25562C2.45846 32.9412 1.73002 32.4704 1.4544 31.7224C0.514256 29.171 0 26.4109 0 23.5294C0 10.5345 10.4467 0 23.3333 0ZM31.3177 16.6556C29.3919 14.383 26.5301 12.9412 23.3333 12.9412C17.5343 12.9412 12.8333 17.6817 12.8333 23.5294C12.8333 24.7672 13.0456 25.9547 13.4326 27.0588H20.9989L24.6823 23.3444C26.6081 25.617 29.4699 27.0588 32.6667 27.0588C38.4657 27.0588 43.1667 22.3183 43.1667 16.4706C43.1667 15.2328 42.9544 14.0453 42.5674 12.9412H35.0011L31.3177 16.6556Z"
                        fill="#dff6a5"
                      ></path>
                    </svg>
                  </div>

                  <div>
                    <div
                      className="text-lg font-semibold"
                      style={{ color: theme.text }}
                    >
                      Devxro
                    </div>
                    <div className="text-sm text-gray-200">
                      Events & workshops for dev learners
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-300 max-w-sm">
                  We connect student developers with hands-on learning—
                  workshops, bootcamps and live events to build real skills.
                </p>

                <div className="flex items-center gap-3">
                  {[FiTwitter, FiLinkedin, FiYoutube, FiGlobe].map(
                    (Icon, i) => (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        key={i}
                        href="#"
                        aria-label="icon"
                        className="w-9 h-9 rounded-md bg-gray-100 flex items-center justify-center text-gray-700 hover:bg-[#40C9FF]"
                      >
                        <Icon />
                      </motion.a>
                    )
                  )}
                </div>
              </motion.div>

              {/* footer columns */}
              <motion.div
                variants={fadeUp}
                className="lg:col-span-6 grid grid-cols-2 md:grid-cols-4 gap-6"
              >
                {[
                  {
                    title: "Events",
                    items: ["Workshops", "Bootcamps", "Live Sessions"],
                  },
                  {
                    title: "Company",
                    items: ["About", "Careers", "Contact"],
                  },
                  {
                    title: "Resources",
                    items: ["Docs", "Guides", "Community"],
                  },
                  {
                    title: "Legal",
                    items: ["Privacy", "Terms", "Cookies"],
                  },
                ].map((col, idx) => (
                  <motion.div
                    variants={fadeUp}
                    key={idx}
                    className="space-y-2"
                  >
                    <h6 className="text-sm font-semibold text-[#C6FF39] mb-3">
                      {col.title}
                    </h6>
                    <ul className="space-y-2 text-sm text-gray-400">
                      {col.items.map((item) => (
                        <li
                          key={item}
                          className="hover:underline cursor-pointer"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>

              {/* promo boxes */}
              <motion.div
                variants={fadeUp}
                className="lg:col-span-3 flex flex-col gap-4"
              >
                {[
                  {
                    title: "Host a workshop",
                    desc: "Reach thousands of student developers.",
                  },
                  {
                    title: "Partnerships",
                    desc: "Collaborate with clubs and universities.",
                  },
                  {
                    title: "Student discounts",
                    desc: "Special pricing and campus offers.",
                  },
                ].map((box, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -4 }}
                    className="rounded-lg border p-4 border-[#40C9FF]/40"
                  >
                    <div className="font-semibold text-[#9aa284]">
                      {box.title}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {box.desc}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* bottom bar */}
            <motion.div
              variants={fade}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="border-t"
              style={{ borderColor: "rgba(15,23,42,0.04)" }}
            >
              <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-3">
                <div className="text-sm text-gray-600">
                  © {new Date().getFullYear()} Devxro
                </div>

                <div className="flex items-center gap-6">
                  <motion.a whileHover={{ scale: 1.05 }} className="text-sm text-gray-600 hover:underline">
                    Privacy
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.05 }} className="text-sm text-gray-600 hover:underline">
                    Terms
                  </motion.a>
                  <motion.a whileHover={{ scale: 1.05 }} className="text-sm text-gray-600 hover:underline">
                    Contact
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </footer>
    <BackToHome challengeDay="70" challengeTitle="Event Listing"/>
    </div>
  );
}