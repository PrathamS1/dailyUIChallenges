import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  easeInOut,
} from "framer-motion";
import {
  ArrowRight,
  Check,
  Shield,
  Cpu,
  WifiOff,
  Fingerprint,
  Loader2,
  CornerDownRight,
} from "lucide-react";
import DeviceVisual from "../ui/DeviceVisual";
import { MdPayment } from "react-icons/md";
import BackToHome from "./BackToHome";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const drawLine = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.5, ease: easeInOut },
  },
};


const MonoLabel = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-2 ${className}`}
  >
    <CornerDownRight className="w-3 h-3 text-stone-500" />
    {children}
  </div>
);

type SpecItemProps = {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
};

const SpecItem = ({ icon: Icon, label, value }: SpecItemProps) => (
  <motion.div
    variants={itemVariants}
    className="flex items-center justify-between py-3 border-b border-zinc-800"
  >
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4 text-zinc-400" />
      <span className="text-sm text-zinc-300 font-medium">{label}</span>
    </div>
    <span className="text-sm font-mono text-stone-400">{value}</span>
  </motion.div>
);

const CornerMarks = () => (
  <>
    <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-zinc-700 z-20" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-zinc-700 z-20" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-zinc-700 z-20" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-zinc-700 z-20" />
  </>
);

export default function PreOrderPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const controls = useAnimation();

  useEffect(() => {
    controls.start("visible");
  }, [controls]);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans p-4 lg:p-8 flex items-center justify-center selection:bg-stone-500/30 selection:text-stone-50">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={containerVariants}
        className="w-full max-w-5xl bg-zinc-900 border border-zinc-800 grid grid-cols-1 lg:grid-cols-2 auto-rows-auto shadow-2xl relative overflow-hidden"
      >
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgb(255 255 255) 1px, transparent 0)",
            backgroundSize: "24px 24px",
          }}
        ></div>

        <div className="relative h-[400px]lg:h-auto border-b lg:border-b-0 lg:border-r border-zinc-800 p-8 lg:p-12 overflow-hidden group">

          <CornerMarks />
          <div className="absolute inset-4 z-10 w-fit h-fit">

          <MonoLabel>Fig 1.0 // Internal Architecture</MonoLabel>
          </div>

          <div className="absolute inset-0">
            <DeviceVisual />
          </div>

          <div className="absolute bottom-8 left-8 text-xs font-mono text-zinc-600">
            STATUS: UNCOMPROMISED
          </div>
        </div>

        <div className="relative p-8 lg:p-12 bg-zinc-900/50 flex flex-col justify-center border-b border-zinc-800">
          <CornerMarks />
          <motion.div variants={itemVariants}>
            <span className="inline-block py-1 px-3 rounded-sm bg-stone-950 border border-stone-900 text-stone-400 text-xs font-mono tracking-tight mb-6">
              BATCH_001 // IN PRODUCTION
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              The bank is now <br /> in your pocket.
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-md">
              True cold storage for your digital assets. 100% air-gapped. No
              Bluetooth, no WiFi, no compromise.
            </p>
          </motion.div>
        </div>

        <div className="relative p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-zinc-800 bg-zinc-900/30">
          <CornerMarks />
          <MonoLabel>Fig 2.0 // Specifications Data</MonoLabel>

          <div className="mt-8">
            <SpecItem icon={Shield} label="Secure Element" value="CC EAL5+" />
            <SpecItem
              icon={Fingerprint}
              label="Biometrics"
              value="FPC Sensor"
            />
            <SpecItem
              icon={WifiOff}
              label="Connectivity"
              value="Air-Gapped (QR)"
            />
            <SpecItem
              icon={Cpu}
              label="Encryption"
              value="AES-256 / ChaCha20"
            />
            <div className="py-3 flex justify-between items-center text-xs font-mono text-zinc-500 mt-4">
              <span>CHASSIS: TITANIUM GRADE 5</span>
              <span>WEIGHT: 142G</span>
            </div>
          </div>
        </div>

        <div className="relative p-8 lg:p-12 flex flex-col justify-center bg-zinc-900/80">
          <CornerMarks />
          <MonoLabel className="mb-6">Fig 3.0 // Secure Reservation</MonoLabel>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="bg-zinc-800/50 border border-zinc-700 p-8 rounded-sm text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_2px,rgba(0,0,0,0.2)_2px)] bg-[length:100%_4px] pointer-events-none opacity-50"></div>

                <div className="w-12 h-12 mx-auto bg-stone-950 border border-stone-900 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-5 h-5 text-stone-400" />
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  ALLOCATION SECURED.
                </h3>
                <p className="text-zinc-400 mt-2 font-mono text-sm">
                  Ref ID: CX-994-A2B
                </p>
                <p className="text-zinc-500 mt-4 text-sm">
                  Check your encrypted email inbox for final instructions.
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                variants={itemVariants}
                className="max-w-sm relative z-10"
              >
                <h3 className="text-xl font-bold text-white mb-2 tracking-tight">
                  Reserve Your Unit
                </h3>
                <p className="text-zinc-400 text-sm mb-6">
                  Limited initial run. Reservation ensures priority shipping.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="sr-only">
                      Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="ENTER_SECURE_EMAIL..."
                        className="w-full bg-zinc-950 border-b-2 border-zinc-700 px-4 py-3 text-sm font-mono text-stone-50 placeholder:text-zinc-600 focus:outline-none focus:border-stone-500 transition-colors rounded-t-sm"
                        required
                        disabled={status === "loading"}
                      />
                      <div className="absolute bottom-0 left-0 h-2 w-px bg-zinc-700 group-focus-within:bg-stone-500 transition-colors"></div>
                      <div className="absolute bottom-0 right-0 h-2 w-px bg-zinc-700 group-focus-within:bg-stone-500 transition-colors"></div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-stone-600 hover:bg-stone-500 text-white font-bold py-4 px-6 flex items-center justify-center gap-3 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-widest uppercase rounded-sm relative overflow-hidden group"
                  >
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <span>Initialize Pre-Order</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                    <div className="absolute inset-0 w-full h-full bg-white/10 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out skew-x-12"></div>
                  </button>
                </form>
                <p className="mt-4 text-xs text-center text-zinc-500 font-mono flex items-center justify-center gap-2">
                  <MdPayment size={16}/> Payment collected prior to shipping via secure link.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      <BackToHome challengeDay="75" challengeTitle="Pre-order"/>
    </div>
  );
}
