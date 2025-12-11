import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PenTool, 
  Code, 
  Layers, 
  ArrowRight,
  Cpu,
  Terminal,
  MousePointer2
} from 'lucide-react';

const NARRATIVE_STEPS = [
  { text: "THE CONCEPT...", delay: 0 },
  { text: "THE LOGIC...", delay: 1000 },
  { text: "THE ASSEMBLY...", delay: 2000 },
  { text: "SYSTEM READY.", delay: 3200 }
];


const ComicPanel = ({ children, className = "", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ 
      duration: 0.5, 
      delay: delay, 
      ease: "circOut" 
    }}
    className={`relative border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden ${className}`}
  >
    <div 
      className="absolute inset-0 opacity-[0.05] pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '8px 8px'
      }}
    />
    {children}
  </motion.div>
);

const SpeechBubble = ({ text, direction = "left", delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: delay, type: "spring", stiffness: 200 }}
    className={`absolute z-20 bg-white border-[3px] border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]
      ${direction === "left" ? "bottom-6 left-6" : "top-6 right-6"}
    `}
  >
    <p className="font-bold text-sm tracking-wide uppercase font-mono text-black">
      {text}
    </p>
    <div className={`absolute w-3 h-3 bg-white border-b-[3px] border-r-[3px] border-black ${direction === "left" ? "-bottom-2 left-4 rotate-45" : "-top-2 right-4 -rotate-135"}`}></div>
  </motion.div>
);

const NarratorBox = ({ text }) => (
  <motion.div
    key={text}
    initial={{ y: -10, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    exit={{ y: 10, opacity: 0 }}
    className="bg-cyan-300 border-[3px] border-black px-3 py-1 inline-block shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
  >
    <span className="font-bold font-[Bangers] text-xs tracking-widest text-black">
      {text}
    </span>
  </motion.div>
);

export default function ComicLoader() {
  const [loadingStep, setLoadingStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (loadingStep < NARRATIVE_STEPS.length) {
      const timer = setTimeout(() => {
        if (loadingStep === NARRATIVE_STEPS.length - 1) {
          setTimeout(() => setIsComplete(true), 1000);
        } else {
          setLoadingStep(prev => prev + 1);
        }
      }, loadingStep === 0 ? 1000 : 1200);
      
      return () => clearTimeout(timer);
    }
  }, [loadingStep]);

  // if (isComplete) {
  //   return <PortfolioContent />;
  // }

  return (
    <div className="fixed inset-0 bg-[#f4f4f0] flex items-center justify-center p-4 md:p-8 font-sans overflow-hidden">
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
          <div className="absolute inset-0" 
             style={{ 
               backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', 
               backgroundSize: '40px 40px' 
             }} 
          />
      </div>

      <div className="relative z-10 w-full max-w-5xl h-[80vh] grid grid-cols-1 md:grid-cols-12 grid-rows-6 gap-4 md:gap-6">
        
        <ComicPanel className="md:col-span-7 row-span-3 flex items-center justify-center bg-white relative" delay={0.2}>
          <div className='absolute inset-0'>
             <img src="/comic1.jpg" className='w-full h-full object-cover' alt="" />
          </div>
          <div className="absolute top-4 left-4 z-30">
            <AnimatePresence mode="wait">
              <NarratorBox text={NARRATIVE_STEPS[Math.min(loadingStep, 1)].text} />
            </AnimatePresence>
          </div>
          
          <motion.div 
            animate={{ rotate: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
            className="relative w-40"
          >
            <img src="/walk.gif" className='w-full h-full object-cover' alt="" />
          </motion.div>
          
          {loadingStep >= 0 && (
            <SpeechBubble text="Drafting the grid..." direction="left" delay={0.5} />
          )}
        </ComicPanel>

        <ComicPanel className="md:col-span-5 row-span-2 flex items-center justify-center bg-zinc-50" delay={0.8}>
           {loadingStep >= 1 && (
             <>
               <div className="absolute top-4 right-4 z-30">
                 <NarratorBox text="COMPILING..." />
               </div>
               <motion.div
                 initial={{ y: 20, opacity: 0 }}
                 animate={{ y: 0, opacity: 1 }}
                 className="flex flex-col items-center"
               >
                 <Terminal className="w-16 h-16 text-black mb-2" strokeWidth={2} />
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="absolute bottom-4 left-6 font-mono text-[10px] text-zinc-400 leading-tight"
               >
                 {`> git push origin main`}<br/>
                 {`> build_optimized... OK`}
               </motion.div>
             </>
           )}
        </ComicPanel>

        <ComicPanel className="md:col-span-5 row-span-4 flex flex-col items-center justify-center bg-black" delay={1.4}>
            {loadingStep >= 2 && (
              <>
                 <div className="w-full h-full relative overflow-hidden flex items-center justify-center bg-orange-200">
                    {/* Replaced Zap/Matrix with "Layer Assembly" animation */}
                    <div className="relative w-32 h-32">
                        <motion.div 
                            initial={{ y: 40, opacity: 0 }} animate={{ y: 20, opacity: 1 }} transition={{ delay: 0.1 }}
                            className="absolute inset-0 bg-zinc-800 border border-zinc-700 rounded-lg transform scale-90 translate-y-4" 
                        />
                        <motion.div 
                            initial={{ y: 40, opacity: 0 }} animate={{ y: 10, opacity: 1 }} transition={{ delay: 0.3 }}
                            className="absolute inset-0 bg-zinc-700 border border-zinc-600 rounded-lg transform scale-95 translate-y-2" 
                        />
                        <motion.div 
                            initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
                            className="absolute inset-0 bg-orange-200 border border-zinc-200 rounded-lg flex items-center justify-center"
                        >
                          <img src="/loading.gif" className='w-full' alt="" />
                        </motion.div>
                    </div>
                 </div>
                 <div className="absolute bottom-6 w-full text-center">
                    <NarratorBox text="STACKING LAYERS..." />
                 </div>
              </>
            )}
        </ComicPanel>

        <ComicPanel className="md:col-span-7 row-span-3 flex items-center justify-center bg-[url('/comic3.jpg')] bg-no-repeat bg-cover bg-center" delay={2.0}>
            {loadingStep >= 3 ? (
               <motion.div 
                 initial={{ scale: 0.9, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="text-center"
               >
                 <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter text-black drop-shadow-[4px_4px_1px_#cd132d]">
                   ONLINE.
                 </h1>
                 <motion.div 
                    whileHover={{ x: 5 }}
                    className="mt-6 inline-flex items-center gap-3 bg-black text-white px-8 py-3 font-medium text-lg cursor-pointer shadow-[4px_4px_0px_0px_rgba(255,255,255,0.5)] font-[Bangers] tracking-widest"
                 >
                    INITIALIZE <ArrowRight className="w-5 h-5" />
                 </motion.div>
               </motion.div>
            ) : (
               <div className="flex items-center gap-3">
                  <Cpu className="w-8 h-8 text-black animate-spin duration-3000" />
                  <span className="font-mono text-xs font-bold tracking-widest">PROCESSING</span>
               </div>
            )}
        </ComicPanel>

      </div>
    </div>
  );
}

function PortfolioContent() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#f4f4f0] text-black p-8 md:p-12 font-sans relative"
    >
       {/* Decorative Header */}
       <div className="border-b-[3px] border-black pb-6 mb-12 flex justify-between items-end">
          <div>
            <div className="flex gap-2 mb-2">
                <span className="bg-cyan-300 border border-black px-2 py-0.5 font-bold text-[10px] uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Issue #1</span>
                <span className="bg-white border border-black px-2 py-0.5 font-bold text-[10px] uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">First Edition</span>
            </div>
            <h1 className="text-6xl font-black uppercase tracking-tighter">The Portfolio</h1>
          </div>
          <div className="hidden md:block text-right font-mono text-xs">
             <p>EST. 2025</p>
             <p className="text-zinc-500">ID: 884-XJ</p>
          </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
             <div className="relative">
                <h2 className="text-4xl font-black italic relative z-10">
                  CREATIVE<br/>ENGINEER
                </h2>
                <div className="absolute top-4 left-2 w-32 h-12 bg-cyan-300 -z-0 opacity-50 transform -skew-x-12" />
             </div>
             
             {/* Replaced "fighting digital underworld" with professional copy */}
             <p className="text-lg font-medium leading-relaxed max-w-md border-l-[3px] border-black pl-6">
                Specializing in high-performance React applications, WebGL interactions, and structured design systems.
             </p>
             
             <button className="bg-black text-white px-8 py-4 font-bold text-sm tracking-widest hover:bg-zinc-800 transition-colors shadow-[5px_5px_0px_0px_rgba(0,0,0,0.2)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,0.2)] border-2 border-transparent group flex items-center gap-2">
                <MousePointer2 className="w-4 h-4" />
                EXPLORE WORK
             </button>
          </div>

          <div className="relative h-64 md:h-auto bg-white border-[3px] border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center overflow-hidden group">
             {/* Grid Background */}
             <div className="absolute inset-0 opacity-10" 
                  style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }} 
             />
             
             <Layers className="w-32 h-32 text-zinc-200 group-hover:text-cyan-300 transition-colors duration-500" strokeWidth={1} />
             
             <span className="absolute bottom-4 right-4 bg-white border-2 border-black px-3 py-1 font-bold text-xs uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                Selected Works
             </span>
          </div>
       </div>
    </motion.div>
  );
}