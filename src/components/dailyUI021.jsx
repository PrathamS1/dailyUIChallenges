import { useState } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Moon,
  Lock,
  Unlock,
  Home,
  Camera,
  Bolt,
  Lightbulb,
  Tv,
  Fan,
  Flame,
  Refrigerator,
  DoorOpen,
  Plug,
  AlertCircle,
  CheckCircle,
  ArrowUp,
  ArrowDown,
  XCircle,
  TrendingUp,
  IndianRupee,
  Droplet,
  ThermometerSnowflake,
} from "lucide-react";
import BackToHome from "./BackToHome";

const COLORS = {
  primary: "var(--home-control-primary)",
  secondary: "var(--home-control-secondary)",
  background: "var(--home-control-background)",
  text: "var(--home-control-text)",
  accent: "var(--home-control-accent)",
};

const ROOMS = ["Living Room", "Kitchen", "Bedroom", "Garage"];
const CAMERAS = ["Front Door", "Backyard", "Garage", "Hallway"];
const cameraImages = {
  "Front Door":
    "https://media.gettyimages.com/id/1358425240/video/animal-opossum-at-night.jpg?s=640x640&k=20&c=I10U8IZ4T-ig5xh6-YNhzXZDKD6lRNbBAdyN9JQCOSw=",
  Backyard:
    "https://gray-wilx-prod.gtv-cdn.com/resizer/v2/XOJTAZFZSVMW5LLZBS47N4R65E.jpg?auth=d77ac1a68896ea4fc130a4a71f9ac0732cd8227c5efdfa3b6b1af1841cb77607&width=800&height=450&smart=true",
  Garage: "/garagecctv.png",
  Hallway:
    "https://media.gettyimages.com/id/2005204588/video/surveillance-camera-video-footage-of-a-man-walking-through-a-house-then-leaving-the-scene.jpg?s=640x640&k=20&c=3ZTikeazC19Rhu53aJ5eEpCP_w1GhSqCQkVmxX0GdEI=",
};
const DEVICES = {
  "Living Room": [
    { name: "Main Light", type: "light", status: true },
    { name: "AC", type: "ac", status: false },
    { name: "TV", type: "tv", status: true },
  ],
  Kitchen: [
    { name: "Oven", type: "oven", status: false },
    { name: "Fridge", type: "fridge", status: true },
    { name: "Light", type: "light", status: true },
  ],
  Bedroom: [
    { name: "Lamp", type: "light", status: false },
    { name: "Fan", type: "fan", status: true },
    { name: "Heater", type: "heater", status: false },
  ],
  Garage: [
    { name: "Door", type: "door", status: true },
    { name: "Light", type: "light", status: false },
    { name: "Charger", type: "charger", status: true },
  ],
};
const LOCKS = ["Front Door", "Back Door", "Garage", "Window"];
const ENTRIES = [
  { type: "motion", text: "Motion detected at Front Door", time: "2 min ago" },
  { type: "delivery", text: "Package delivered", time: "10 min ago" },
  { type: "unlock", text: "Garage unlocked", time: "30 min ago" },
];

function getTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}
function getDate() {
  return new Date().toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

const deviceIcons = {
  light: Lightbulb,
  ac: Fan,
  tv: Tv,
  oven: Flame,
  fridge: Refrigerator,
  fan: Fan,
  heater: Flame,
  door: DoorOpen,
  charger: Plug,
};

// Dashboard section layout
export default function HomeMonitoringDashboard() {
  const [room, setRoom] = useState(ROOMS[0]);
  const [camera, setCamera] = useState(CAMERAS[0]);
  const [locks, setLocks] = useState([true, true, true, false]);
  const [devices, setDevices] = useState(DEVICES);
  const [toast, setToast] = useState(null);

  const [temperature, setTemperature] = useState(22);
  const humidity = "42";
  const aqiLabel = "Good";
  const [boilerOn, setBoilerOn] = useState(false);
  const [acOn, setAcOn] = useState(false);
  const [purifierMode, setPurifierMode] = useState("Auto");

  const toggleLock = (idx, name) => {
    setLocks((prev) => {
      const updated = [...prev];
      updated[idx] = !updated[idx];
      return updated;
    });
    setToast({
      message: locks[idx] ? `${name} unlocked` : `${name} locked`,
      type: locks[idx] ? "unlocked" : "locked",
    });
    setTimeout(() => setToast(null), 1800);
  };

  const toggleDevice = (roomName, idx) => {
    setDevices((prev) => {
      const updated = { ...prev };
      updated[roomName] = updated[roomName].map((dev, i) =>
        i === idx ? { ...dev, status: !dev.status } : dev
      );
      return updated;
    });
  };

  return (
    <div
      className="min-h-screen w-full flex flex-col bg-[url('/home-bg.png')] bg-cover bg-center bg-no-repeat"
      style={{ color: COLORS.text }}
    >
      <BackToHome />
      <header className="sticky top-1 mx-auto z-30 w-[98%] rounded-lg px-4 md:px-8 py-2 md:py-3 flex flex-col md:flex-row items-center justify-between bg-white/90 backdrop-blur border-b border-gray-200 shadow-lg">
        <div className="flex items-center gap-2 md:gap-4 w-full md:w-auto mb-2 md:mb-0">
          <Home
            className="w-6 md:w-7 h-6 md:h-7"
            style={{ color: COLORS.primary }}
          />
          <span
            className="font-bold text-lg md:text-xl tracking-tight"
            style={{ color: COLORS.primary }}
          >
            Home Monitor
          </span>
        </div>
        <div className="flex-1 flex items-center justify-center w-full md:w-auto mb-2 md:mb-0">
          <span
            className="font-mono text-sm md:text-base px-2 md:px-4 py-1 rounded bg-gray-50 border border-gray-200"
            style={{ color: COLORS.text }}
          >
            {getDate()} {getTime()}
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto justify-center md:justify-end">
          <motion.button
            title="Toggle Theme"
            className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none"
            whileTap={{ scale: 0.92 }}
          >
            <Moon
              className="w-5 h-5 md:w-5 md:h-5"
              style={{ color: COLORS.primary }}
            />
          </motion.button>
          <motion.button
            title="Notifications"
            className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none"
            whileTap={{ scale: 0.92 }}
          >
            <AlertCircle
              className="w-5 h-5 md:w-5 md:h-5"
              style={{ color: COLORS.secondary }}
            />
          </motion.button>
          <motion.button
            title="Settings"
            className="p-2 rounded-full hover:bg-gray-100 transition focus:outline-none"
            whileTap={{ scale: 0.92 }}
          >
            <Sun
              className="w-5 h-5 md:w-5 md:h-5"
              style={{ color: COLORS.accent }}
            />
          </motion.button>
        </div>
      </header>

      {/* Bento Grid */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8 max-w-7xl mx-auto">
        {/* Security Status */}
        <section className="col-span-1 row-span-1 bg-white rounded-2xl p-4 md:p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <Lock
              className="w-5 md:w-6 h-5 md:h-6"
              style={{ color: COLORS.primary }}
            />
            <h2 className="text-lg md:text-xl font-bold">Security Status</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4 w-full max-w-xs mx-auto">
            {LOCKS.map((l, idx) => {
              const Icon = locks[idx] ? Lock : Unlock;
              return (
                <motion.button
                  key={l}
                  className="flex flex-col items-center focus:outline-none"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  title={locks[idx] ? "Locked" : "Unlocked"}
                  onClick={() => toggleLock(idx, l)}
                  whileTap={{ scale: 0.92 }}
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                  }}
                >
                  <Icon
                    className={`w-7 h-7 ${locks[idx] ? "" : "animate-pulse"}`}
                    style={{
                      color: locks[idx] ? COLORS.secondary : COLORS.accent,
                    }}
                  />
                  <span className="text-xs mt-1 font-medium">{l}</span>
                </motion.button>
              );
            })}
          </div>

          {toast && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed left-1/2 -translate-x-1/2 bottom-8 z-50 px-4 py-2 rounded-xl shadow-lg flex items-center gap-2"
              style={{
                background:
                  toast.type === "locked" ? COLORS.secondary : COLORS.accent,
                color: COLORS.background,
              }}
            >
              {toast.type === "locked" ? (
                <CheckCircle className="w-5 h-5" />
              ) : (
                <XCircle className="w-5 h-5" />
              )}
              <span className="font-semibold">{toast.message}</span>
            </motion.div>
          )}
          <div className="mt-1">
            <h3 className="text-sm font-semibold mb-2">Recent Activity</h3>
            <ul className="space-y-2">
              {ENTRIES.map((e, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 text-xs text-gray-700 shadow"
                >
                  {e.type === "motion" && (
                    <AlertCircle className="w-4 h-4 text-black" />
                  )}
                  {e.type === "delivery" && (
                    <CheckCircle className="w-4 h-4 text-black" />
                  )}
                  {e.type === "unlock" && (
                    <Unlock className="w-4 h-4 text-black" />
                  )}
                  <span className="font-medium">{e.text}</span>
                  <span className="ml-auto text-gray-400">{e.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CCTV Feeds */}
        <section className="col-span-1 lg:col-span-2 row-span-1 bg-white rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Camera
              className="w-5 md:w-6 h-5 md:h-6"
              style={{ color: COLORS.primary }}
            />
            <h2 className="text-lg md:text-xl font-bold">CCTV Feeds</h2>
          </div>
          <div className="flex gap-2 mb-4">
            <div className="flex flex-wrap gap-2 w-full">
              {CAMERAS.map((c) => (
                <motion.button
                  key={c}
                  onClick={() => setCamera(c)}
                  className={`min-w-[100px] px-3 py-2 rounded-full font-medium transition-colors text-xs sm:text-sm md:text-base whitespace-nowrap`}
                  style={{
                    background:
                      camera === c ? COLORS.primary : COLORS.background,
                    color: camera === c ? COLORS.background : COLORS.primary,
                    border: `1px solid ${COLORS.primary}`,
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  title={c}
                >
                  {c}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.div
            key={camera}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative rounded-2xl overflow-hidden h-full flex items-center justify-center group shadow"
            style={{
              background: COLORS.background,
              border: `1px solid ${COLORS.primary}`,
            }}
          >
            <motion.img
              src={`${cameraImages[camera]}`}
              alt={camera}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105 rounded-2xl"
              initial={{ scale: 1 }}
              whileHover={{ scale: 1.08 }}
            />
            <motion.button
              className="absolute bottom-2 right-2 px-3 py-1 rounded-full font-semibold shadow-lg"
              style={{ background: COLORS.background, color: COLORS.text }}
              whileTap={{ scale: 0.92 }}
              title="Expand Fullscreen"
            >
              Fullscreen
            </motion.button>
            {camera === "Front Door" && (
              <motion.div
                className="absolute inset-0 rounded-2xl border-4 pointer-events-none"
                style={{ borderColor: COLORS.accent }}
                initial={{ opacity: 0.7, scale: 1 }}
                animate={{ opacity: [0.7, 0.2, 0], scale: [1, 1.1, 1.2] }}
                transition={{ duration: 1.2 }}
              />
            )}
          </motion.div>
        </section>

        {/* Energy Usage */}
        <section className="col-span-1 row-span-1 bg-white rounded-2xl p-6 shadow-xl flex flex-col justify-start">
          <div className="flex items-center gap-2 mb-4">
            <Bolt
              className="w-5 md:w-6 h-5 md:h-6"
              style={{ color: COLORS.accent }}
            />
            <h2 className="text-lg md:text-xl font-bold tracking-tight">
              Energy Usage
            </h2>
          </div>
          <div className="w-full flex flex-col items-center">
            <div className="flex items-end gap-2 mb-2">
              <span
                className="text-5xl font-extrabold"
                style={{ color: COLORS.primary }}
              >
                12.4
              </span>
              <span
                className="text-lg font-semibold mb-1"
                style={{ color: COLORS.text }}
              >
                kWh
              </span>
            </div>
            <span
              className="text-xs mb-4 font-medium"
              style={{ color: COLORS.accent }}
            >
              Today
            </span>
            <div className="w-full h-16 flex items-end gap-1 mb-2 mt-6">
              {[60, 80, 40, 100, 70, 90, 50].map((v, i) => (
                <motion.div
                  key={i}
                  className="flex-1 rounded bg-gradient-to-t from-[var(--home-control-accent)] to-[var(--home-control-secondary)]"
                  style={{ height: `${v}%` }}
                  initial={{ scaleY: 0.7, opacity: 0.6 }}
                  animate={{ scaleY: 1, opacity: 1 }}
                  transition={{ duration: 0.5 + i * 0.1 }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between w-full mb-2">
              <span
                className="text-xs font-semibold"
                style={{ color: COLORS.text }}
              >
                Peak: 3pm
              </span>
              <span
                className="text-xs font-semibold"
                style={{ color: COLORS.text }}
              >
                Lowest: 6am
              </span>
            </div>
            <div className="w-full flex flex-col items-start mt-8 gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>8% higher than yesterday</span>
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <IndianRupee className="w-4 h-4" />
                <span>Est. Cost: ₹1145</span>
              </div>
            </div>
          </div>
        </section>

        {/* Devices per Room */}
        <section className="col-span-1 lg:col-span-2 row-span-1 bg-white rounded-2xl p-6 shadow-xl flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Home
              className="w-5 md:w-6 h-5 md:h-6"
              style={{ color: COLORS.primary }}
            />
            <h2 className="text-lg md:text-xl font-bold">Room Devices</h2>
          </div>
          <div className="flex gap-2 mb-4">
            <div className="flex flex-wrap gap-2 w-full">
              {ROOMS.map((r, idx) => (
                <motion.button
                  key={r}
                  onClick={() => setRoom(ROOMS[idx])}
                  className={`min-w-[100px] px-3 py-2 rounded-full font-medium transition-colors focus:outline-none text-xs sm:text-sm md:text-base whitespace-nowrap ${
                    room === ROOMS[idx] ? "ring-2 ring-primary" : ""
                  }`}
                  style={{
                    background:
                      room === ROOMS[idx] ? COLORS.primary : COLORS.background,
                    color:
                      room === ROOMS[idx]
                        ? COLORS.background
                        : COLORS.secondary,
                    border: `1px solid ${COLORS.secondary}`,
                  }}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.96 }}
                  title={r}
                  aria-pressed={room === ROOMS[idx]}
                >
                  {r}
                </motion.button>
              ))}
            </div>
          </div>
          <motion.div
            key={room}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
          >
            {devices[room].map((d, idx) => {
              const Icon = deviceIcons[d.type] || Home;
              return (
                <motion.div
                  key={d.name}
                  className="rounded-2xl p-5 flex flex-col items-center shadow hover:shadow-xl transition-shadow"
                  style={{
                    background: COLORS.background,
                    border: `1px solid ${COLORS.secondary}`,
                  }}
                  whileHover={{ scale: 1.04 }}
                  title={d.name}
                >
                  <motion.div
                    className={`mb-2 w-10 h-10 rounded-full flex items-center justify-center`}
                    style={{
                      background: d.status ? COLORS.primary : COLORS.background,
                      boxShadow: d.status
                        ? `0 0 16px 4px ${COLORS.primary}55`
                        : "none",
                    }}
                    animate={{
                      boxShadow: d.status
                        ? `0 0 16px 4px ${COLORS.primary}55`
                        : "none",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Icon
                      className={`w-6 h-6`}
                      style={{
                        color: d.status ? COLORS.background : COLORS.primary,
                      }}
                    />
                  </motion.div>
                  <span
                    className="font-semibold mb-2 text-center"
                    style={{ color: COLORS.text }}
                  >
                    {d.name}
                  </span>
                  <motion.button
                    onClick={() => toggleDevice(room, idx)}
                    className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors focus:outline-none ${
                      d.status
                        ? "bg-[var(--home-control-secondary)]"
                        : "bg-[var(--home-control-background)]"
                    }`}
                    style={{ border: `1px solid ${COLORS.secondary}` }}
                    whileTap={{ scale: 0.92 }}
                    title={d.status ? "Turn Off" : "Turn On"}
                    aria-pressed={d.status}
                  >
                    <motion.div
                      className={`w-5 h-5 rounded-full shadow-md"}`}
                      style={{ background: COLORS.primary }}
                      layout
                      animate={{ x: d.status ? 20 : -2 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    />
                  </motion.button>
                </motion.div>
              );
            })}
          </motion.div>
        </section>

        {/* Home Climate & Air Section */}
        <section
          className="col-span-1 lg:col-span-2 row-span-1 bg-white/80 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-2xl flex flex-col justify-between border border-gray-100"
          style={{ minWidth: 0 }}
        >
          <div className="flex items-center flex-wrap gap-2 justify-between mb-4">
            <div className="flex items-center gap-2">
              <ThermometerSnowflake
                className="w-5 md:w-6 h-5 md:h-6"
                style={{ color: COLORS.primary }}
              />
              <h2 className="text-lg md:text-xl font-bold">
                Temperature & Air
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[var(--home-control-background)] text-[var(--home-control-primary)] flex items-center gap-1">
                <Flame className="w-4 h-4" />
                {temperature}°C
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[var(--home-control-background)] text-[var(--home-control-primary)] flex items-center gap-1">
                <Droplet className="w-4 h-4" />
                {humidity}%
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[var(--home-control-background)] text-[var(--home-control-primary)] flex items-center gap-1">
                <Plug className="w-4 h-4" />
                AQI: {aqiLabel}
              </span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 mb-4">
            {/* Temperature Panel */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div
                  className="absolute inset-0 rounded-full bg-[var(--home-control-secondary)]/30"
                  style={{ filter: "blur(2px)" }}
                ></div>
                <span className="text-4xl z-10 font-extrabold text-[var(--home-control-primary)]">
                  {temperature}°C
                </span>
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="p-2 rounded-full bg-[var(--home-control-background)] text-[var(--home-control-primary)] shadow hover:bg-gray-100 transition"
                  onClick={() => setTemperature((t) => Math.max(10, t - 1))}
                >
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-full bg-[var(--home-control-background)] text-[var(--home-control-primary)] shadow hover:bg-gray-100 transition"
                  onClick={() => setTemperature((t) => Math.min(35, t + 1))}
                >
                  <ArrowUp className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Humidity Panel */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-8 h-24 flex flex-col items-center justify-end">
                <div
                  className="absolute bottom-0 w-24 rounded-t-lg bg-[var(--home-control-secondary)]/40"
                  style={{ height: `${humidity}%`, minHeight: "8px" }}
                ></div>
                <Droplet className="w-6 h-6 text-[var(--home-control-primary)] mb-1 animate-bounce" />
                <span className="text-lg font-bold text-[var(--home-control-text)]">
                  {humidity}%
                </span>
                <span className="text-xs text-[var(--home-control-text)] w-20 text-center">
                  Ideal: 40-60%
                </span>
              </div>
            </div>

            {/* Air Quality Panel */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative w-24 h-24 flex flex-col items-center justify-between">
                <span className="items-center justify-center">
                  <img
                    src="/airq.png"
                    alt="air quality icon"
                    className="w-full h-full object-cover"
                  />
                </span>
                <span className="text-xs text-[var(--home-control-primary)]">
                  {aqiLabel}
                </span>
              </div>
            </div>
          </div>
          {/* Bottom Controls Strip */}
          <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4 mt-2 w-full">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--home-control-background)] text-[var(--home-control-primary)] text-xs font-semibold">
                <Flame className="w-4 h-4" />
                Boiler
              </span>
              <motion.button
                onClick={() => setBoilerOn((prev) => !prev)}
                className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors focus:outline-none ${
                  boilerOn
                    ? "bg-[var(--home-control-secondary)]"
                    : "bg-[var(--home-control-background)]"
                }`}
                style={{ border: `1px solid ${COLORS.secondary}` }}
                whileTap={{ scale: 0.92 }}
                title={boilerOn ? "Turn Off" : "Turn On"}
                aria-pressed={boilerOn}
              >
                <motion.div
                  className={`w-5 h-5 rounded-full shadow-md"}`}
                  style={{ background: COLORS.primary }}
                  layout
                  animate={{ x: boilerOn ? 20 : -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
              </motion.button>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--home-control-background)] text-[var(--home-control-primary)] text-xs font-semibold">
                <Fan className="w-4 h-4" />
                AC
              </span>
              <motion.button
                onClick={() => setAcOn((prev) => !prev)}
                className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors focus:outline-none ${
                  acOn
                    ? "bg-[var(--home-control-secondary)]"
                    : "bg-[var(--home-control-background)]"
                }`}
                style={{ border: `1px solid ${COLORS.secondary}` }}
                whileTap={{ scale: 0.92 }}
                title={acOn ? "Turn Off" : "Turn On"}
                aria-pressed={acOn}
              >
                <motion.div
                  className={`w-5 h-5 rounded-full shadow-md"}`}
                  style={{ background: COLORS.primary }}
                  layout
                  animate={{ x: acOn ? 20 : -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                />
              </motion.button>
            </div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-[var(--home-control-background)] text-[var(--home-control-primary)] text-xs font-semibold">
                <Plug className="w-4 h-4" />
                Air Purifier
              </span>
              <select
                className="ml-1 px-2 py-1 rounded-full bg-[var(--home-control-background)] text-[var(--home-control-primary)] text-xs font-semibold focus:outline-none"
                value={purifierMode}
                onChange={(e) => setPurifierMode(e.target.value)}
              >
                <option>Auto</option>
                <option>Boost</option>
                <option>Sleep</option>
              </select>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
