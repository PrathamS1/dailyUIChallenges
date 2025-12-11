import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Download,
  ArrowRight,
  FileText,
  Check,
  Copy,
  ArrowUpRight,
  DownloadCloud,
} from "lucide-react";

const ThankYouPage = () => {
  const [downloadReady, setDownloadReady] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDownloadReady(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("ORD-992-881-X");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#fcebf4] text-zinc-900 p-4 md:p-8 font-[Poppins] selection:bg-rose-200">
      <div className="max-w-[1600px] mx-auto h-auto min-h-[calc(100vh-4rem)] grid grid-cols-1 lg:grid-cols-12 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-8 bg-slate-50 border border-slate-200 rounded-3xl relative overflow-hidden flex flex-col justify-between group min-h-[500px] lg:min-h-0"
        >
          <div className="p-8 md:p-12 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-medium text-slate-500 mb-6">
              <DownloadCloud className="w-4 h-4 animate-pulse" />
              150+ Designers Using this
            </div>
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-zinc-900 mb-6 leading-tight">
              Thank you for <br />
              <span className="font-semibold">creating with us.</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-md leading-relaxed">
              We appreciate your support. Your <b>Rose UI Kit</b> has been added
              to your library and we can't wait to see what you build with it.
            </p>
          </div>

          <div className="absolute inset-0 flex items-center justify-center translate-y-20 lg:translate-y-0 opacity-50 lg:opacity-100 pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
              className="absolute w-[600px] h-[600px] border border-slate-200 rounded-full"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute w-[450px] h-[450px] border border-slate-300 rounded-full border-dashed"
            />

            <div className="absolute bottom-30 right-0 w-64 h-fit bg-white shadow-2xl shadow-violet-900/5 rounded-xl border border-slate-100 flex flex-col gap-4 -rotate-6 transition-transform duration-700 group-hover:rotate-0 group-hover:scale-105">
              <div className="h-48 bg-violet-50/50 rounded-lg w-full flex items-center justify-center overflow-hidden">
                <img
                  src="https://cdn.dribbble.com/userupload/35390781/file/original-3800cb5ba98199b010a2d560a49d83a3.png?resize=400x0"
                  className="w-full h-full opacity-65"
                  alt=""
                />
              </div>
            </div>
            <div className="absolute w-64 top-1/2 left-3/4 h-20 bg-rose-200/50 backdrop-blur-sm shadow-xl shadow-slate-900/5 rounded-xl border border-slate-100 -rotate-6 -z-10 transition-transform duration-700 group-hover:rotate-3" />
          </div>

          <div className="p-8 md:p-12 border-t border-slate-200 bg-white/50 backdrop-blur-md flex flex-wrap gap-8 z-10">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                Support
              </p>
              <p className="font-medium text-sm">help@designkit.com</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-wider mb-1">
                Community
              </p>
              <p className="font-medium text-sm">Join Discord</p>
            </div>
          </div>
        </motion.div>

        <div className="lg:col-span-4 flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white rounded-3xl p-6 border border-slate-200 flex-1 flex flex-col"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-zinc-900">Receipt</h3>
              <div className="h-8 w-8 rounded-full bg-slate-50 flex items-center justify-center border border-slate-100">
                <FileText className="w-4 h-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-4 mb-auto">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Reference</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-slate-700">
                    ORD-992-881-X
                  </span>
                  <button
                    onClick={handleCopy}
                    className="text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    {copied ? (
                      <Check className="w-3 h-3" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Date</span>
                <span className="text-slate-900">Dec 11, 2025</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-500">Access Level</span>
                <span className="text-slate-900">Lifetime License</span>
              </div>
              <div className="h-px bg-slate-100 my-4" />
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Paid</span>
                <span className="font-bold text-lg">$49.00</span>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100">
              <a
                href="#"
                className="text-sm text-slate-500 hover:text-zinc-900 flex items-center gap-1 transition-colors"
              >
                Download Invoice PDF <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative"
          >
            <div
              className={`absolute -inset-0.5 rounded-3xl bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 transition-opacity duration-500 ${
                downloadReady ? "opacity-100" : "opacity-0"
              }`}
            />

            <div className="relative bg-white rounded-[22px] p-6 h-full border border-slate-200">
              <div className="mb-4">
                <h3 className="font-semibold text-lg mb-1">
                  {downloadReady
                    ? "Get your files"
                    : "Preparing your bundle..."}
                </h3>
                <p className="text-sm text-slate-500">
                  {downloadReady
                    ? "Your unique license key has been generated."
                    : "We're compressing your assets for download."}
                </p>
              </div>

              <div className="relative h-14 w-full bg-slate-100 rounded-xl overflow-hidden">
                {!downloadReady ? (
                  <div className="absolute inset-0 flex items-center px-4">
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2.5, ease: "easeInOut" }}
                        className="h-full bg-slate-400 rounded-full"
                      />
                    </div>
                  </div>
                ) : (
                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="absolute inset-0 w-full h-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download .ZIP</span>
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-rose-100 rounded-3xl p-6 border border-rose-100 flex items-center justify-between group cursor-pointer hover:bg-rose-50 transition-all hover:shadow-2xl"
          >
            <div>
              <h4 className="font-semibold text-rose-900">Documentation</h4>
              <p className="text-sm text-rose-700/70">
                Start the quick start guide.
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm text-rose-900 group-hover:scale-110 transition-transform">
              <ArrowRight className="w-5 h-5" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
