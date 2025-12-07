import React from "react";
import { motion } from "framer-motion";
import {
  Menu,
  ArrowRight,
  Lock,
  Globe,
  Cpu,
  Layers,
  ArrowUpRight,
  Star,
  Disc,
  User,
} from "lucide-react";
import { BsGithub, BsTwitterX } from "react-icons/bs";
import { FaAppStore } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import BackToHome from "./BackToHome";

const themeStyles = `
  :root {
    --color-base: #1c1f21;
    --color-base-dark: #151718;
    --color-base-light: #2a2d30;
    --color-accent: #01D5B9;
    --color-accent-glow: #01D5B9;
  }
  
  .bg-base { background-color: var(--color-base); }
  .bg-base-dark { background-color: var(--color-base-dark); }
  .bg-base-light { background-color: var(--color-base-light); }
  
  .text-accent { color: var(--color-accent); }
  .text-accent-glow { color: var(--color-accent-glow); }
  
  .border-accent-10 { border-color: rgba(16, 185, 129, 0.1); }
  .border-accent-30 { border-color: rgba(16, 185, 129, 0.3); }
  
  /* Neumorphic Shadows */
  .shadow-neu-flat { 
    box-shadow: 6px 6px 12px #121415, -6px -6px 12px #262a2d; 
  }
  .shadow-neu-pressed { 
    box-shadow: inset 4px 4px 8px #121415, inset -4px -4px 8px #262a2d; 
  }
  .shadow-neu-floating { 
    box-shadow: 12px 12px 24px #0e1011, -12px -12px 24px #2a2e31; 
  }
  .shadow-neu-button { 
    box-shadow: 5px 5px 10px #121415, -5px -5px 10px #262a2d; 
  }
  
  /* Utilities */
  .neu-text-gradient {
    background: linear-gradient(to bottom right, #ffffff, #9ca3af, #4b5563);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

interface NeuButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "icon" | "ghost";
  active?: boolean;
}

const NeuButton: React.FC<NeuButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  active = false,
}) => {
  const baseStyles =
    "relative overflow-hidden transition-all duration-300 ease-out flex items-center justify-center font-bold tracking-wide";

  const variants = {
    primary: `bg-base text-accent border border-accent-10 hover:border-accent-30 px-8 py-4 rounded-lg shadow-neu-button hover:shadow-neu-pressed hover:text-accent-glow active:scale-[0.98]`,
    secondary: `bg-base text-gray-400 border border-white/5 hover:border-white/10 px-6 py-4 rounded-lg shadow-neu-button hover:text-gray-200 active:shadow-neu-pressed active:scale-[0.98]`,
    icon: `bg-base text-gray-400 p-4 rounded-xl shadow-neu-button hover:text-accent hover:shadow-neu-pressed active:scale-95 aspect-square`,
    ghost: `bg-transparent text-gray-400 hover:text-accent px-6 py-3 rounded-lg hover:bg-base hover:shadow-neu-flat`,
  };

  const activeStyle = active ? "shadow-neu-pressed text-accent" : "";

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${activeStyle} ${className}`}
    >
      {children}
    </motion.button>
  );
};

interface NeuCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  noPadding?: boolean;
}

const NeuCard: React.FC<NeuCardProps> = ({
  children,
  className = "",
  delay = 0,
  noPadding = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={`bg-base rounded-2xl shadow-neu-flat border border-white/5 ${
        noPadding ? "" : "p-8"
      } ${className}`}
    >
      {children}
    </motion.div>
  );
};

const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-6 md:px-12 pointer-events-none w-full">
      <div className="w-full flex justify-between items-center pointer-events-auto">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <svg
              data-logo="logo"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 56 40"
            >
              <g
                style={{ opacity: "1" }}
                id="logogram"
                transform="translate(0, 0) rotate(0)"
              >
                <path
                  d="M43 0C50.1797 6.44277e-07 56 5.8203 56 13C56 20.1797 50.1797 26 43 26H34.4844L48.4844 40H31.5156L15.7578 24.2422C14.672 23.1564 14 21.6569 14 20C14 16.6863 16.6863 14 20 14H43C43.5523 14 44 13.5523 44 13C44 12.4477 43.5523 12 43 12H20C15.5817 12 12 15.5817 12 20C12 22.3901 13.0482 24.5347 14.71 26H14.6875L28.6875 40H20C8.95431 40 0 31.0457 0 20C0 8.95431 8.9543 0 20 0H43Z"
                  fill="#01D5B9"
                ></path>
                <path
                  d="M56 28V40H51.3125L39.3125 28H56Z"
                  fill="#004D42"
                ></path>
              </g>
              <g
                style={{ opacity: "1" }}
                id="logotype"
                transform="translate(56, 20)"
              ></g>
            </svg>
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-100">
            Devest
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 bg-base px-8 py-3 rounded-xl shadow-neu-flat border border-white/5">
          <a
            href="#features"
            className="text-sm font-medium tracking-wider text-gray-400 hover:text-[#01D5B9] transition-colors"
          >
            Features
          </a>
          <a
            href="#security"
            className="text-sm font-medium tracking-wider text-gray-400 hover:text-[#01D5B9] transition-colors"
          >
            Security
          </a>
          <a
            href="#testimonials"
            className="text-sm font-medium tracking-wider text-gray-400 hover:text-[#01D5B9] transition-colors"
          >
            Stories
          </a>
        </div>

        <div className="flex items-center gap-4">
          <NeuButton
            variant="secondary"
            className="hidden md:flex !py-2 !px-6 !rounded-lg text-sm !shadow-neu-button"
          >
            Newsletter
          </NeuButton>
          <div className="md:hidden">
            <NeuButton variant="icon" className="!rounded-lg">
              <Menu size={20} />
            </NeuButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-6 md:px-12 relative overflow-hidden flex flex-col items-center w-full">
      <div className="absolute top-[-20%] left-[20%] w-[800px] h-[800px] bg-base-light rounded-full blur-[150px] pointer-events-none opacity-5" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-emerald-900 rounded-full blur-[120px] pointer-events-none opacity-10" />

      <div className="w-full max-w-[1600px] flex flex-col items-center text-center z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-base shadow-neu-pressed text-xs font-bold text-accent tracking-wider uppercase mb-8 border border-accent-10"
        >
          Trusted by 100K Users Globally
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-6xl md:text-8xl font-extrabold text-gray-100 leading-[0.95] tracking-tight mb-8"
        >
          Compounding, <br />
          <span className="neu-text-gradient">Automated.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl text-gray-400 max-w-2xl leading-relaxed mb-10"
        >
          Devest bridges the gap between complex DeFi protocols and one-tap
          investing. Earn high-yield APY on your stablecoins without the
          headache.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 w-full"
        >
          <NeuButton className="gap-3 w-full sm:w-auto !rounded-lg !px-10">
            <FaAppStore size={24} />
            <div className="flex flex-col items-start text-xs">
              <span className="opacity-70 font-normal">Download on</span>
              <span className="text-sm font-bold">App Store</span>
            </div>
          </NeuButton>

          <NeuButton
            variant="secondary"
            className="gap-3 w-full sm:w-auto !rounded-lg !px-10"
          >
            <BiLogoPlayStore size={24} />
            <div className="flex flex-col items-start text-xs">
              <span className="opacity-70 font-normal">Get it on</span>
              <span className="text-sm font-bold">Google Play</span>
            </div>
          </NeuButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 100, rotateX: 10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 1, type: "spring", bounce: 0.2, delay: 0.4 }}
        className="w-full max-w-[1400px] perspective-1000 relative"
      >
        <div className="relative w-full aspect-[16/9] md:aspect-[21/9] bg-base rounded-t-[1rem] border-t border-x border-white/5 shadow-neu-floating p-4 md:p-8 flex items-end justify-center overflow-hidden">
          <div className="w-full h-full bg-base-dark/50 rounded-t-[2rem] border-t border-x border-white/5 relative overflow-hidden backdrop-blur-sm">
            <div className="absolute top-0 left-0 w-full h-20 border-b border-white/5 flex items-center justify-between px-8 bg-base/80 backdrop-blur-md z-20">
              <div className="flex gap-8">
                <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                <div className="h-4 w-24 bg-white/5 rounded-full"></div>
                <div className="h-4 w-24 bg-white/5 rounded-full"></div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-[#10b981]/20 flex items-center justify-center text-accent">
                  <User size={20} />
                </div>
              </div>
            </div>

            <div className="p-8 pt-28 grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
              <div className="col-span-2 space-y-6">
                <div className="w-full h-64 bg-base shadow-neu-pressed rounded-2xl relative overflow-hidden group">
                  <svg
                    className="absolute bottom-0 left-0 w-full h-full"
                    viewBox="0 0 400 150"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 150 L0 100 Q 50 120, 100 80 T 200 60 T 300 90 T 400 40 V 150 H 0"
                      fill="url(#grad)"
                      opacity="0.2"
                    />
                    <path
                      d="M0 100 Q 50 120, 100 80 T 200 60 T 300 90 T 400 40"
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="3"
                    />
                    <defs>
                      <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="#10b981" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute top-6 left-6">
                    <div className="text-sm text-gray-500 mb-1">
                      Portfolio Value
                    </div>
                    <div className="text-3xl font-bold text-white">
                      $124,592.00
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-32 bg-base shadow-neu-flat rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-[#10b981]"></div>
                      <span className="text-gray-400 text-sm">Yield</span>
                    </div>
                    <div className="text-2xl font-bold text-white">+12.4%</div>
                  </div>
                  <div className="h-32 bg-base shadow-neu-flat rounded-2xl p-6 border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-gray-400 text-sm">Staked</span>
                    </div>
                    <div className="text-2xl font-bold text-white">$82,000</div>
                  </div>
                </div>
              </div>

              <div className="hidden md:block bg-base shadow-neu-pressed rounded-2xl p-6 space-y-4 border border-white/5">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-base shadow-neu-flat flex items-center justify-center text-gray-400 font-bold text-xs">
                        {i === 1
                          ? "USDC"
                          : i === 2
                          ? "ETH"
                          : i === 3
                          ? "SOL"
                          : "BTC"}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-200">
                          Deposited
                        </div>
                        <div className="text-xs text-gray-500">
                          Auto-compound
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-white">$4,200</div>
                      <div className="text-xs text-accent">+5.2%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#1c1f21] via-[#1c1f21]/80 to-transparent z-20 pointer-events-none"></div>
        </div>
      </motion.div>
    </section>
  );
};

const Stats: React.FC = () => {
  const stats = [
    { label: "Total Value Locked", value: "$4.2B" },
    { label: "Total Yield Paid", value: "$342M" },
    { label: "Active Investors", value: "89.2K" },
    { label: "Protocols Indexed", value: "142" },
  ];

  return (
    <section className="py-10 border-y border-white/5 bg-base-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center group cursor-default">
              <p className="text-sm text-gray-500 font-medium mb-1 tracking-wider uppercase">
                {stat.label}
              </p>
              <p className="text-2xl md:text-3xl font-bold text-white group-hover:text-accent transition-colors duration-300">
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Features: React.FC = () => {
  return (
    <section
      id="features"
      className="py-32 px-6 md:px-12 w-full bg-base overflow-hidden"
    >
        
      <div className="w-full max-w-[1800px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 px-4">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-100 max-w-3xl leading-[0.9]">
            Infrastructure for <br />
            <span className="text-accent">Hyper-Growth.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md mt-6 md:mt-0 text-right">
            We abstracted away the complexities of DeFi.
            <br />
            You just see the yield.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[minmax(250px,auto)]">
          <div className="md:col-span-1 md:row-span-2 lg:col-span-4 lg:row-span-2">
            <NeuCard
              className="h-full flex flex-col justify-between group cursor-pointer hover:border-accent-30 transition-colors"
              noPadding
            >
              <div className="p-8">
                <div className="w-14 h-14 rounded-xl bg-base shadow-neu-pressed flex items-center justify-center mb-8 text-accent">
                  <img
                    alt="icon"
                    src="/transaction.png"
                    className="invert opacity-65 w-1/2"
                  />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Gasless
                  <br />
                  Transactions
                </h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  Our meta-transaction relayers handle all gas fees. You sign,
                  we pay. Experience crypto as it should be—frictionless and
                  free.
                </p>
              </div>
              <div className="relative h-48 w-full mt-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1f21]/10 to-transparent z-10" />
                <div className="absolute -right-10 -bottom-20 w-64 h-64 bg-[#10b981]/10 rounded-full blur-3xl group-hover:bg-[#10b981]/20 transition-all duration-500" />
                <div className="absolute right-8 bottom-8">
                  <ArrowUpRight
                    size={48}
                    className="text-accent opacity-20 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </div>
              </div>
            </NeuCard>
          </div>

          <div className="md:col-span-1 lg:col-span-5 lg:row-span-1">
            <NeuCard
              className="h-full relative overflow-hidden group hover:border-accent-30 transition-colors"
              noPadding
            >
              <div className="p-8 flex flex-col h-full justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <Globe
                    size={24}
                    className="text-gray-500 group-hover:text-accent transition-colors"
                  />
                  <h3 className="text-2xl font-bold text-white">
                    Multi-Chain Routing
                  </h3>
                </div>
                <p className="text-gray-400 mt-4 max-w-sm">
                  Access liquidity across Ethereum, Solana, and Arbitrum from a
                  single vault.
                </p>
              </div>
              {/* Visual */}
              <div className="absolute top-1/2 right-[-20px] -translate-y-1/2 w-40 h-40 bg-base shadow-neu-pressed rounded-full border border-white/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <div className="w-24 h-24 rounded-full border border-accent-10 animate-[spin_8s_linear_infinite]" />
                <div className="absolute w-32 h-32 rounded-full border border-dashed border-gray-700 animate-[spin_12s_linear_infinite_reverse]" />
              </div>
            </NeuCard>
          </div>

          <div className="md:col-span-1 lg:col-span-3 lg:row-span-1">
            <NeuCard
              className="h-full bg-base-dark flex flex-col justify-center items-center text-center p-6 hover:shadow-neu-pressed transition-shadow"
              noPadding
            >
              <Cpu size={32} className="text-accent mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">AI Sentinel</h3>
              <p className="text-sm text-gray-500">24/7 Threat Detection</p>
            </NeuCard>
          </div>

          <div className="md:col-span-1 lg:col-span-3 lg:row-span-1">
            <NeuCard
              className="h-full p-6 flex flex-col justify-between hover:translate-y-[-2px] transition-transform"
              noPadding
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-base shadow-neu-pressed flex items-center justify-center text-gray-300">
                  <Lock size={18} />
                </div>
                <h3 className="text-lg font-bold text-white">Non-Custodial</h3>
              </div>
              <div className="w-full flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-t from-[#1c1f21] to-transparent z-10" />
                <img
                  src="/smart-contract.png"
                  className="w-1/2 h-full opacity-50"
                  alt=""
                />
              </div>
              <p className="text-sm text-gray-400">
                Your keys, your crypto. Smart contracts handle the logic, you
                own the assets.
              </p>
            </NeuCard>
          </div>

          <div className="md:col-span-1 lg:col-span-5 lg:row-span-1">
            <NeuCard
              className="h-full flex items-center gap-6 p-8 group hover:border-accent-30 transition-colors"
              noPadding
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Layers size={24} className="text-accent" />
                  <h3 className="text-2xl font-bold text-white">
                    Yield Aggregation
                  </h3>
                </div>
                <p className="text-gray-400">
                  We check 50+ protocols every block to ensure you're always in
                  the highest performing pool.
                </p>
              </div>
              <div className="hidden sm:flex flex-col gap-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-32 h-2 bg-base shadow-neu-pressed rounded-full overflow-hidden"
                  >
                    <div
                      className="h-full bg-[#10b981]"
                      style={{ width: `${80 + i * 5}%` }}
                    />
                  </div>
                ))}
              </div>
            </NeuCard>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials: React.FC = () => {
  return (
    <section
      id="testimonials"
      className="py-32 px-6 md:px-12 w-full bg-base relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none opacity-20" />

      <div className="w-full max-w-[1600px] mx-auto relative z-10">
        <div className="mb-20">
          <span className="text-accent font-bold tracking-widest uppercase text-sm mb-2 block">
            Community
          </span>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Built by investors,
            <br />
            for investors.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5">
            <NeuCard className="h-full flex flex-col justify-between hover:shadow-neu-floating transition-shadow duration-500 border-l-4 border-[#10b981]">
              <div className="mb-8">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-2xl font-medium text-gray-200 leading-normal">
                  "The UI is insanely clean. It feels like I'm using a fintech
                  app from 2050. The yields on stablecoins are unbeatable
                  compared to my bank."
                </p>
              </div>
              <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                <div className="w-12 h-12 rounded-lg bg-base shadow-neu-pressed flex items-center justify-center text-xl font-bold text-white">
                  A
                </div>
                <div>
                  <p className="font-bold text-white">Alex V.</p>
                  <p className="text-sm text-gray-500">@alexdefi_eth</p>
                </div>
                <BsTwitterX size={20} className="ml-auto text-gray-600" />
              </div>
            </NeuCard>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="md:col-span-2 md:w-[90%]">
              <NeuCard className="bg-base-light/5 border border-white/5 backdrop-blur-sm">
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={14}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-6">
                  "Finally, a DeFi aggregator that doesn't look like a science
                  experiment. Devest made me delete 4 other apps instantly."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10b981] to-emerald-800 flex items-center justify-center text-white font-bold text-sm">
                    S
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Sarah J.</p>
                    <p className="text-xs text-gray-500">Product Designer</p>
                  </div>
                </div>
              </NeuCard>
            </div>

            <div className="md:col-span-2 md:w-[90%]">
              <NeuCard className="bg-base-dark border border-white/5">
                <p className="text-lg text-gray-300 mb-6 italic">
                  "Gasless transactions changed the game for me. I can rebalance
                  my portfolio daily without eating into profits."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-base shadow-neu-flat flex items-center justify-center text-white font-bold text-sm">
                    M
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">Marcus T.</p>
                    <p className="text-xs text-gray-500">Early Adopter</p>
                  </div>
                </div>
              </NeuCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-base-dark border-t border-white/5 relative overflow-hidden">
      <div className="w-full px-6 md:px-12 pt-24 pb-20 relative z-10">
        <div className="max-w-[1400px] mx-auto bg-base rounded-3xl shadow-neu-flat border border-white/5 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left overflow-hidden relative">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#10b981]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="max-w-2xl relative z-10">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to compound?
            </h3>
            <p className="text-xl text-gray-400 mb-8">
              Join the fastest growing DeFi protocol. No gas fees, no
              complexity. Just yield.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <NeuButton className="gap-2 !py-4 !px-8 text-lg !rounded-lg hover:translate-y-[-2px] transition-transform">
                Download Now <ArrowRight size={20} />
              </NeuButton>
              <NeuButton
                variant="secondary"
                className="!py-4 !px-8 text-lg !rounded-lg bg-transparent border-white/10 hover:bg-white/5"
              >
                View Documentation
              </NeuButton>
            </div>
          </div>

          <div className="absolute -right-20 w-120 z-10">
            <div className="w-full flex items-center justify-center text-accent relative">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#151718] blur-2xl to-transparent " />
              <img
                src="/abstract.png"
                className="w-full h-full object-cover opacity-5"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full px-6 md:px-12 pb-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 pt-16 border-t border-white/5">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 flex items-center justify-center">
                <svg
                  data-logo="logo"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 56 40"
                >
                  <g
                    style={{ opacity: "1" }}
                    id="logogram"
                    transform="translate(0, 0) rotate(0)"
                  >
                    <path
                      d="M43 0C50.1797 6.44277e-07 56 5.8203 56 13C56 20.1797 50.1797 26 43 26H34.4844L48.4844 40H31.5156L15.7578 24.2422C14.672 23.1564 14 21.6569 14 20C14 16.6863 16.6863 14 20 14H43C43.5523 14 44 13.5523 44 13C44 12.4477 43.5523 12 43 12H20C15.5817 12 12 15.5817 12 20C12 22.3901 13.0482 24.5347 14.71 26H14.6875L28.6875 40H20C8.95431 40 0 31.0457 0 20C0 8.95431 8.9543 0 20 0H43Z"
                      fill="#01D5B9"
                    ></path>
                    <path
                      d="M56 28V40H51.3125L39.3125 28H56Z"
                      fill="#004D42"
                    ></path>
                  </g>
                  <g
                    style={{ opacity: "1" }}
                    id="logotype"
                    transform="translate(56, 20)"
                  ></g>
                </svg>
              </div>
              <span className="text-xl font-bold text-white">Devest</span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              The world's most advanced DeFi aggregation layer, packaged in a
              beautiful mobile experience.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Product</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors block py-1"
                >
                  Yield Vaults
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors block py-1"
                >
                  Auto-Compounder
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors block py-1"
                >
                  Devest Card
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors block py-1"
                >
                  Tokenomics
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors block py-1"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors block py-1"
                >
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors block py-1"
                >
                  Legal & Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="hover:text-accent transition-colors block py-1"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col">
            <h4 className="text-white font-bold mb-6 tracking-wide">Socials</h4>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-base shadow-neu-pressed flex items-center justify-center text-gray-400 hover:text-white hover:shadow-neu-pressed hover:scale-95 transition-all"
              >
                <BsTwitterX size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-base shadow-neu-pressed flex items-center justify-center text-gray-400 hover:text-white hover:shadow-neu-pressed hover:scale-95 transition-all"
              >
                <BsGithub size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 rounded-xl bg-base shadow-neu-pressed flex items-center justify-center text-gray-400 hover:text-white hover:shadow-neu-pressed hover:scale-95 transition-all"
              >
                <Disc size={20} />
              </a>
            </div>

            <h4 className="text-white font-bold mb-6 tracking-wide mt-3">
              Download
            </h4>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center gap-6 w-full"
            >
              <NeuButton className="gap-2 w-full sm:w-auto !rounded-lg !px-4">
                <FaAppStore size={24} />
                <span className="text-sm font-bold">App Store</span>
              </NeuButton>

              <NeuButton
                variant="secondary"
                className="gap-2 w-full sm:w-auto !rounded-lg !px-4"
              >
                <BiLogoPlayStore size={24} />
                <span className="text-sm font-bold">Google Play</span>
              </NeuButton>
            </motion.div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto text-center pt-12 mt-12 border-t border-white/5">
          <p className="text-xs text-gray-700">
            &copy; 2025 Devest Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default function AppDownloadPage() {
  return (
    <>
      <style>{themeStyles}</style>
      <div className="bg-base min-h-screen text-gray-200 selection:bg-[#10b981] selection:text-white font-[DM_Sans]">
        <Navbar />
        <main>
          <Hero />
          <Stats />
          <div className="absolute shadow-neu-floating mt-10 z-50 left-1/2 -translate-x-1/2 w-2/4 h-5 bg-base-dark"/>
          <Features />
          <Testimonials />
        </main>
        <Footer />
      </div>
      <BackToHome challengeDay="74" challengeTitle="App Download Page"/>
    </>
  );
}
