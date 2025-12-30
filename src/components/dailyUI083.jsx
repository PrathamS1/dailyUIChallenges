import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Button = ({ children, className, variant = "primary", ...props }) => {
  const variants = {
    darkPrimary:
      "bg-black text-white shadow-lg shadow-black/20 hover:bg-black",
    darkSecondary: "bg-zinc-600 text-zinc-100 hover:bg-zinc-600",
    darkMuted: "bg-zinc-200 text-zinc-600 hover:text-zinc-900",

    lightPrimary:
      "text-white shadow-lg hover:opacity-90 transition-opacity",
    lightSecondary: "hover:opacity-85 transition-opacity",
    lightMuted: "hover:opacity-80 transition-opacity",

    outline:
      "border-2 border-slate-300 bg-transparent text-slate-700 hover:border-slate-900 hover:text-slate-900 transition-colors",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03, y: -2 }}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "px-6 py-2.5 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default function ButtonShowcase() {
  return (
    <div className="min-h-screen     p-10 flex flex-col font-[poppins] items-center gap-12 relative">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img src="https://images.unsplash.com/photo-1707054437518-dfd402977b03?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full h-full object-cover object-bottom opacity-25" alt="" />
        <div className="absolute inset-0 bg-linear-to-b from-white via-white/80 to-transparent" />
      </div>
      <div className="grid grid-cols-1 gap-10 w-full max-w-4xl">
        <div className="space-y-4 p-6 rounded-3xl border border-slate-800">
          <h3 className="text-black text-sm mb-4">DARK THEME</h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="darkPrimary">Primary Dark</Button>
            <Button variant="darkSecondary">Secondary</Button>
            <Button variant="darkMuted">Muted</Button>
          </div>
        </div>

        <div className="space-y-4 p-6 bg-white rounded-3xl border border-slate-200 shadow-sm">
          <h3 className="text-black text-sm mb-4">LIGHT THEME</h3>
          <div className="flex flex-wrap gap-4">
            <button style={{ backgroundColor: "#ec4899" }} className="px-6 py-2.5 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105">Primary Light</button>
            <button style={{ backgroundColor: "#fce7f3", color: "#155E75" }} className="px-6 py-2.5 font-medium rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105">Secondary</button>
            <button style={{ backgroundColor: "#fff1f7", color: "#164E63" }} className="px-6 py-2.5 font-medium rounded-xl transition-all hover:scale-105">Muted</button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 items-center max-w-5xl">
        <Button variant="outline">Outline Design</Button>

        <motion.div className="relative rounded-full overflow-hidden p-1">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-xl"
            style={{
              background: "linear-gradient(to bottom, rgba(249, 115, 22,0), rgba(234, 179, 8,1), rgba(245, 158, 11,1), rgba(249, 115, 22,0))"
            }}
          />
          <button className="relative px-8 py-4 bg-yellow-50 border border-yellow-300 rounded-full text-slate-900 font-medium leading-none flex items-center">
            Animated Border
          </button>
        </motion.div>

        <motion.button
          whileHover="hover"
          initial="initial"
          className="relative px-8 py-3 bg-slate-900 text-slate-100 rounded-xl overflow-hidden border border-slate-700"
        >
          <motion.div
            variants={{
              initial: { x: "-100%" },
              hover: { x: "100%" },
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
          />
          <span className="relative">Silver Shimmer</span>
        </motion.button>

        <motion.button
          whileTap={{
            scale: 0.95,
            boxShadow: "inset 4px 4px 8px #cbd5e1, inset -4px -4px 8px #ffffff",
          }}
          className="px-6 py-2.5 bg-slate-100 text-slate-600 font-semibold rounded-xl shadow-[6px_6px_12px_#cbd5e1,-6px_-6px_12px_#ffffff] transition-all"
        >
          Neumorphic
        </motion.button>

        <div className="relative">
          <div className="absolute -inset-1 bg-linear-to-r from-pink-400 to-rose-400 rounded-2xl blur opacity-25" />
          <motion.button
            whileHover={{
              y: -5,
              boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
            }}
            className="relative px-6 py-2.5 bg-white/70 backdrop-blur-md border border-white/40 text-blue-600 font-bold rounded-2xl"
          >
            Glass Float
          </motion.button>
        </div>

        <motion.button
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="px-6 py-2.5 bg-rose-600 text-white font-medium rounded-xl shadow-lg"
        >
          Spring Scale
        </motion.button>
      </div>
    </div>
  );
}