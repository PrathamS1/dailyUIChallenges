import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  Search,
  ExternalLink,
  MoreHorizontal,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import BackToHome from "./BackToHome";

export default function TrendingPage() {
  const [dark, setDark] = useState(true);
  const accent = dark ? "#4ADE80" : "#059669";

  const items = [
    { symbol: "BTC", name: "Bitcoin", price: 103143.76, changePct: 1.4, volume24h: "₹48.26B", marketCap: "₹2.05T" },
    { symbol: "ETH", name: "Ethereum", price: 3484.98, changePct: 2.93, volume24h: "₹22.76B", marketCap: "₹419.40B" },
    { symbol: "SOL", name: "Solana", price: 160.06, changePct: 1.72, volume24h: "₹3.31B", marketCap: "₹88.58B" },
    { symbol: "BNB", name: "BNB", price: 986.12, changePct: -0.07, volume24h: "₹2.44B", marketCap: "₹136.01B" },
    { symbol: "XRP", name: "Ripple", price: 2.29, changePct: 0.68, volume24h: "₹2.56B", marketCap: "₹137.05B" },
    { symbol: "ADA", name: "Cardano", price: 0.54, changePct: 2.1, volume24h: "₹1.23B", marketCap: "₹62.3B" },
    { symbol: "DOG", name: "Dogecoin", price: 0.081, changePct: -0.9, volume24h: "₹2.02B", marketCap: "₹32.1B" },
    { symbol: "MAT", name: "Polygon", price: 0.74, changePct: 0.3, volume24h: "₹1.12B", marketCap: "₹45.5B" },
    { symbol: "AVA", name: "Avalanche", price: 24.3, changePct: 3.2, volume24h: "₹0.98B", marketCap: "₹27.8B" },
    { symbol: "DOT", name: "Polkadot", price: 7.54, changePct: -1.1, volume24h: "₹0.72B", marketCap: "₹18.4B" },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.06, duration: 0.6, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={dark ? "dark" : "light"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className={`transition-colors duration-500 pb-10 ${
          dark ? "bg-[#0b0b0c] text-white" : "bg-gray-50 text-gray-900"
        }`}
      >
        <motion.nav
          initial={{ y: -60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full sticky top-0 z-40 border-b backdrop-blur-md ${
            dark ? "border-gray-800 bg-[#111]/80" : "border-gray-200 bg-white/80"
          }`}
        >
          <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-3">
            <div className="flex items-center gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="text-xl font-semibold flex items-center gap-2"
              >
                <img src="/strade.png" className="w-28 object-cover" alt="icon" />
              </motion.div>
              <ul className="hidden md:flex gap-6 text-sm font-medium">
                {["Markets", "Portfolio", "News", "Community"].map((link) => (
                  <motion.li
                    key={link}
                    whileHover={{ scale: 1.05, color: accent }}
                    className="cursor-pointer transition-colors"
                  >
                    {link}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 bg-transparent px-3 py-2 rounded-md border text-sm border-gray-600/30">
                <Search size={16} />
                <input
                  type="text"
                  placeholder="Search assets..."
                  className={`bg-transparent outline-none w-28 md:w-40 text-sm ${
                    dark ? "placeholder-gray-400" : "placeholder-gray-600"
                  }`}
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={() => setDark(!dark)}
                className={`p-2 rounded-full border hover:scale-105 transition-transform ${
                  dark ? "border-gray-700" : "border-gray-300"
                }`}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                className={`px-4 py-2 rounded-md font-medium ${
                  dark ? "bg-emerald-500 text-black" : "bg-emerald-600 text-white"
                }`}
              >
                Sign Up
              </motion.button>
            </div>
          </div>
        </motion.nav>

        <motion.header
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-6xl mx-auto px-6 mt-10 mb-6 flex justify-between items-end flex-wrap gap-4"
        >
          <div>
            <h1 className="text-3xl font-semibold">Trending</h1>
            <p
              className={`${dark ? "text-gray-400" : "text-gray-600"} text-sm mt-1`}
            >
              Top performing assets based on 24-hour trading volume and momentum.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 rounded-full px-2 py-1 border ${
                dark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <button className="text-sm px-3 py-1 rounded-full bg-emerald-600 text-white">
                Gainers
              </button>
              <button className="text-sm px-3 py-1 rounded-full">Losers</button>
              <button className="text-sm px-3 py-1 rounded-full">Volume</button>
            </div>
            <div
              className={`flex items-center gap-2 border rounded-full px-3 py-1 ${
                dark ? "border-gray-700" : "border-gray-200"
              }`}
            >
              <span className="text-sm">24h</span>
              <ChevronDown size={16} />
            </div>
          </div>
        </motion.header>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className={`hidden md:grid grid-cols-12 max-w-6xl mx-auto gap-4 px-8 py-2 text-sm font-medium ${
            dark ? "text-gray-400" : "text-gray-600"
          }`}
        >
          <div className="col-span-4">Name</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-1 text-right">24h</div>
          <div className="col-span-2 text-right">24h Volume</div>
          <div className="col-span-2 text-right">Market Cap</div>
          <div className="col-span-1 text-right">Actions</div>
        </motion.div>

        <main className="max-w-6xl mx-auto mt-2 mb-10">
          <motion.ul
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="divide-y divide-transparent"
          >
            {items.map((it) => (
              <motion.li
                variants={itemVariants}
                key={it.symbol}
                whileHover={{
                  scale: 1.01,
                  boxShadow: dark
                    ? "0 0 20px rgba(74,222,128,0.15)"
                    : "0 0 15px rgba(5,150,105,0.15)",
                }}
                className={`grid grid-cols-12 items-center gap-4 px-8 py-4 rounded-lg transition-all duration-300 border border-transparent hover:border-emerald-600/30 ${
                  dark ? "hover:bg-[#111214]" : "hover:bg-gray-100"
                }`}
              >
                <div className="col-span-4 flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-md flex items-center justify-center font-bold text-sm"
                    style={{
                      background: dark ? "#0f1720" : "#e0f2fe",
                      color: accent,
                    }}
                  >
                    {it.symbol}
                  </div>
                  <div>
                    <div className="font-medium">
                      {it.symbol}{" "}
                      <span className="text-sm text-gray-400">{it.name}</span>
                    </div>
                    <div
                      className={`${
                        dark ? "text-gray-500" : "text-gray-500"
                      } text-xs`}
                    >
                      Spot · Main market
                    </div>
                  </div>
                </div>

                <div className="col-span-2 text-right">
                  <div className="font-semibold">
                    ₹{it.price.toLocaleString()}
                  </div>
                  <div
                    className={`${
                      dark ? "text-gray-500" : "text-gray-500"
                    } text-xs`}
                  >
                    ${(it.price * 0.012).toFixed(2)}
                  </div>
                </div>

                <div className="col-span-1 text-right">
                  <div
                    className={`font-medium ${
                      it.changePct >= 0
                        ? "text-emerald-400"
                        : "text-rose-400"
                    } flex items-center justify-end gap-1`}
                  >
                    {it.changePct >= 0 ? (
                      <ArrowUpRight size={14} />
                    ) : (
                      <ArrowDownRight size={14} />
                    )}
                    {Math.abs(it.changePct)}%
                  </div>
                </div>

                <div className="col-span-2 text-right">
                  <div className="text-sm font-medium">{it.volume24h}</div>
                  <div
                    className={`${
                      dark ? "text-gray-500" : "text-gray-500"
                    } text-xs`}
                  >
                    24h Volume
                  </div>
                </div>

                <div className="col-span-2 text-right">
                  <div className="text-sm font-medium">{it.marketCap}</div>
                  <div
                    className={`${
                      dark ? "text-gray-500" : "text-gray-500"
                    } text-xs`}
                  >
                    Market Cap
                  </div>
                </div>

                <div className="col-span-1 flex items-center justify-end gap-2">
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className={`p-2 rounded-md border transition-colors ${
                      dark
                        ? "border-gray-700 hover:border-emerald-500"
                        : "border-gray-300 hover:border-emerald-500"
                    }`}
                  >
                    <ExternalLink size={16} />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.85 }}
                    className={`p-2 rounded-md border transition-colors ${
                      dark
                        ? "border-gray-700 hover:border-emerald-500"
                        : "border-gray-300 hover:border-emerald-500"
                    }`}
                  >
                    <MoreHorizontal size={16} />
                  </motion.button>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </main>
      </motion.div>
      <BackToHome challengeDay="69" challengeTitle="Trending Page"/>
    </AnimatePresence>
  );
}