import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignalHigh,
  SignalMedium,
  SignalLow,
  Clock,
  MapPin,
} from "lucide-react";

const statusMeta = {
  live: {
    label: "Live",
    icon: SignalHigh,
    ringCount: 3,
  },
  moving: {
    label: "Moving",
    icon: SignalMedium,
    ringCount: 2,
  },
  idle: {
    label: "Idle",
    icon: SignalLow,
    ringCount: 1,
  },
  lost: {
    label: "Offline",
    icon: Clock,
    ringCount: 0,
  },
};

const ringVariant = {
  initial: { opacity: 0.5, scale: 0.9 },
  animate: (i) => ({
    opacity: [0.4, 0.25, 0],
    scale: [0.9, 1.6 + i * 0.3, 2.0 + i * 0.4],
    transition: {
      duration: 3 + i * 0.6, // slower pulse
      ease: "easeOut",
      repeat: Infinity,
      delay: i * 0.4,
    },
  }),
};

function classNames(...cls) {
  return cls.filter(Boolean).join(" ");
}

export function TrackerPin({
  avatarUrl,
  name = "Jordan",
  note = "Last seen 2 min ago",
  status = "live",
  size = "md",
  interactive = true,
}) {
  const meta = statusMeta[status] ?? statusMeta.live;
  const Icon = meta.icon;

  const sizes = {
    sm: { avatar: 44, line: 64, dot: 10, gap: 12 },
    md: { avatar: 56, line: 88, dot: 12, gap: 14 },
    lg: { avatar: 72, line: 112, dot: 14, gap: 18 },
  }[size];

  return (
    <motion.div
      role="group"
      aria-label={`${name} location: ${meta.label}`}
      className="relative flex flex-col items-center select-none"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className={classNames(
          "relative rounded-full border border-black/80 bg-white",
          "shadow-[0_0_0_3px_rgba(255,255,255,1),0_0_32px_0_rgba(0,0,0,0.06)]"
        )}
        style={{ width: sizes.avatar, height: sizes.avatar }}
        whileHover={interactive ? { scale: 1.04 } : undefined}
        whileTap={interactive ? { scale: 0.98 } : undefined}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 1 }}
          whileHover={{ opacity: 0.5, scale: [1, 1.1, 1.3, 1], transition: { duration: 0.7, ease: "easeOut" } }}
        >
          <div
            className="rounded-full border-2 border-black w-full h-full"
          />
        </motion.div>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={name}
            className="h-full w-full object-cover rounded-full"
            draggable={false}
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-black font-bold text-lg">
            {name.charAt(0)}
          </div>
        )}
      </motion.div>

      <div
        className="relative w-px mt-1"
        style={{
          height: sizes.line,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
        }}
      />

      <div className="relative mt-3">
        <div className="absolute inset-0 flex items-center justify-center">
          {Array.from({ length: meta.ringCount }).map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={ringVariant}
              initial="initial"
              animate="animate"
              className="absolute rounded-full border border-black/40"
              style={{
                width: sizes.dot * (1.5 + i * 0.8),
                height: sizes.dot * (1.5 + i * 0.8),
              }}
            />
          ))}
        </div>

        <motion.div
          className="relative rounded-full bg-black"
          style={{ width: sizes.dot, height: sizes.dot }}
          animate={{ scale: status === "lost" ? 1 : [1, 1.04, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <AnimatePresence>
        {interactive && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.35 }}
            className="mt-2 rounded-2xl border border-black/15 bg-white/80 text-black px-3 py-2 backdrop-blur-md shadow-xl"
          >
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4" aria-hidden />
              <span className="text-sm font-medium tracking-wide">{name}</span>
              <span className="text-xs text-black/60">
                · {statusMeta[status]?.label}
              </span>
            </div>
            {note && (
              <div className="text-[11px] text-black/50 mt-1">{note}</div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function LocationTrackerPin() {
  const people = [
    {
      name: "Kevin",
      status: "live",
      note: "Downtown • 2 min ago",
      avatarUrl:
        "https://images.unsplash.com/photo-1722322426803-101270837197?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
    },
    {
      name: "Milan",
      status: "moving",
      note: "Heading NE • 450m",
      avatarUrl:
        "https://images.unsplash.com/photo-1620000617482-821324eb9a14?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzJ8fHByb2ZpbGUlMjBwaWN8ZW58MHx8MHx8fDA%3D",
    },
    { name: "Riya", status: "idle", note: "Cafe • 25 min idle" },
    { name: "Kai", status: "lost", note: "Signal lost • 1h ago" },
  ];

  return (
    <div className="min-h-screen w-full bg-zinc-200 text-black">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
          Location Tracker Pin
        </h1>
        <p className="text-black/60 max-w-xl mt-2">
          A light-theme tracker element. Avatar or initials on top,
          connective stem, and a smooth pulsing precision dot.
        </p>

        <div className="mt-10 rounded-3xl border border-black/10 bg-gradient-to-b from-zinc-100 to-transparent p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 place-items-center">
            {people.map((p) => (
              <TrackerPin
                key={p.name}
                name={p.name}
                status={p.status}
                note={p.note}
                avatarUrl={p.avatarUrl}
                size="lg"
                interactive
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
