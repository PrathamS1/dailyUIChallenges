import React, { useEffect, useRef, useState } from 'react';
import { Terminal, Shield, Ticket, Zap, ArrowRight, Code, Box, Layers } from 'lucide-react';

/* --- UTILITY COMPONENTS --- */

// A reusable Dither/Noise effect component
const DitherEffect = ({ opacity = 0.1, animate = false }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };
    
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      const idata = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(idata.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.5) {
          buffer32[i] = 0xffffffff; // White noise
        }
      }

      ctx.putImageData(idata, 0, 0);
      if (animate) {
        animationFrameId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [animate]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay"
      style={{ opacity }}
    />
  );
};

// Animated Code Typer
const CodeStream = () => {
  const [text, setText] = useState('');
  const fullText = `const TicketContract = {\n  priceCeiling: "0.5 ETH",\n  transferable: true,\n  royalty: 500,\n  enforceCap: function(val) {\n    if(val > this.priceCeiling)\n    throw "CEILING_HIT";\n  }\n}`;

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) i = 0;
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono text-[10px] text-stone-400 leading-relaxed whitespace-pre">
      {text}
      <span className="animate-pulse">_</span>
    </div>
  );
};

/* --- MAIN PAGE --- */

export default function LandingPageTest() {
  return (
    <div className="min-h-screen bg-[#12100e] text-[#e6e0d4] font-sans selection:bg-[#e6e0d4] selection:text-[#12100e] overflow-x-hidden">
      
      {/* 1. NAVBAR: Minimal, Sharp, Small Text */}
      <nav className="fixed top-0 w-full z-50 bg-[#12100e]/90 backdrop-blur-sm border-b border-[#e6e0d4]/10">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#e6e0d4] relative">
               <DitherEffect opacity={0.5} />
            </div>
            <span className="text-xs font-bold tracking-widest uppercase">Ceiling.Protocol</span>
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest text-[#e6e0d4]/60">
            <a href="#" className="hover:text-[#e6e0d4] transition-colors">Infrastructure</a>
            <a href="#" className="hover:text-[#e6e0d4] transition-colors">Docs</a>
            <a href="#" className="hover:text-[#e6e0d4] transition-colors">Connect</a>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-32 pb-20 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 border-l border-r border-[#e6e0d4]/5 min-h-[80vh] items-center">
        
        {/* Left: Copy */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 border border-[#e6e0d4]/20 px-2 py-1 w-fit">
            <div className="w-1.5 h-1.5 bg-green-500 animate-pulse"></div>
            <span className="text-[9px] uppercase tracking-widest">Mainnet v1.0 Live</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-light tracking-tighter leading-[0.9]">
            The Fair Ticketing <br />
            <span className="italic font-serif opacity-80">Infrastructure.</span>
          </h1>
          
          <p className="text-sm text-[#e6e0d4]/60 max-w-md leading-relaxed">
            White-label NFT infrastructure enforcing secondary market price ceilings at the contract level. Eliminate scalping via immutable logic.
          </p>

          <div className="flex gap-4 mt-4">
            <button className="bg-[#e6e0d4] text-[#12100e] px-6 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-2 group">
              Start Building 
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/>
            </button>
            <button className="border border-[#e6e0d4]/20 px-6 py-3 text-xs font-bold uppercase tracking-widest hover:border-[#e6e0d4] transition-all">
              Read Whitepaper
            </button>
          </div>
        </div>

        {/* Right: Animated Dither AI Visualization */}
        <div className="lg:col-span-5 relative h-64 lg:h-96 w-full border border-[#e6e0d4]/10 bg-[#0a0908] overflow-hidden">
            {/* The Animated Dither Layer */}
            <DitherEffect opacity={0.15} animate={true} />
            
            {/* Decorative Elements inside the box */}
            <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <CodeStream />
                    <div className="w-8 h-8 border border-[#e6e0d4]/20 flex items-center justify-center">
                        <Zap className="w-3 h-3" />
                    </div>
                </div>
                
                {/* Abstract Graph */}
                <div className="flex items-end gap-1 h-12 w-full opacity-50">
                    {[40, 60, 45, 70, 50, 80, 50, 50, 50, 50, 50, 50].map((h, i) => (
                        <div key={i} style={{height: `${h}%`}} className={`flex-1 ${h === 50 && i > 5 ? 'bg-[#e6e0d4]' : 'bg-[#e6e0d4]/20'}`}></div>
                    ))}
                </div>
            </div>
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES */}
      <section className="px-6 pb-32 max-w-7xl mx-auto border-l border-r border-[#e6e0d4]/5">
        <div className="mb-12 flex items-end justify-between border-b border-[#e6e0d4]/10 pb-4">
          <h2 className="text-xl font-light">Core Architecture</h2>
          <span className="text-[10px] text-[#e6e0d4]/40 font-mono">01 — 04</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 grid-rows-2 gap-4 h-auto md:h-[500px]">
            
            {/* Large Card: Price Ceiling Logic */}
            <div className="md:col-span-2 row-span-2 border border-[#e6e0d4]/10 bg-[#161412] relative group overflow-hidden hover:border-[#e6e0d4]/30 transition-colors">
                <DitherEffect opacity={0.03} />
                <div className="absolute top-0 right-0 p-4">
                    <Shield className="w-4 h-4 text-[#e6e0d4]/60" />
                </div>
                <div className="p-8 h-full flex flex-col justify-end relative z-10">
                    {/* Illustration: The Ceiling */}
                    <div className="absolute top-1/4 left-8 right-8 h-32 border-t border-dashed border-[#e6e0d4]/30">
                        <div className="absolute -top-3 right-0 text-[9px] uppercase text-[#e6e0d4]/50">Max Cap: 0.5 ETH</div>
                        <div className="absolute bottom-0 left-0 w-full h-full flex items-end gap-2">
                             <div className="w-8 h-[20%] bg-[#e6e0d4]/10"></div>
                             <div className="w-8 h-[40%] bg-[#e6e0d4]/20"></div>
                             <div className="w-8 h-[80%] bg-[#e6e0d4]/40"></div>
                             <div className="w-8 h-[100%] bg-[#e6e0d4]"></div>
                             <div className="w-8 h-[100%] bg-[#e6e0d4]"></div>
                             <div className="w-8 h-[100%] bg-[#e6e0d4]"></div>
                        </div>
                    </div>

                    <h3 className="text-lg font-medium mb-2">Immutable Price Ceilings</h3>
                    <p className="text-xs text-[#e6e0d4]/60 max-w-sm">
                        Smart contracts enforce a hard cap on resale values. If a transfer is attempted above the cap, the transaction reverts automatically at the EVM level.
                    </p>
                </div>
            </div>

            {/* Small Card: White Label */}
            <div className="border border-[#e6e0d4]/10 bg-[#161412] relative group p-6 flex flex-col justify-between hover:border-[#e6e0d4]/30 transition-colors">
                 <DitherEffect opacity={0.05} />
                 <Layers className="w-4 h-4 text-[#e6e0d4]/60" />
                 <div>
                    <h3 className="text-sm font-medium mb-1">White-Label SDK</h3>
                    <p className="text-[10px] text-[#e6e0d4]/60">Your brand, your UI. We just provide the rails.</p>
                 </div>
            </div>

            {/* Small Card: Ticket Logic */}
            <div className="border border-[#e6e0d4]/10 bg-[#161412] relative group p-6 flex flex-col justify-between hover:border-[#e6e0d4]/30 transition-colors">
                 <DitherEffect opacity={0.05} />
                 <Ticket className="w-4 h-4 text-[#e6e0d4]/60" />
                 
                 {/* Mini Illustration */}
                 <div className="w-full h-12 flex gap-1 mt-2">
                    <div className="flex-1 bg-[#e6e0d4]/10 animate-pulse"></div>
                    <div className="flex-1 bg-[#e6e0d4]/10"></div>
                    <div className="flex-1 bg-[#e6e0d4]/10"></div>
                 </div>

                 <div>
                    <h3 className="text-sm font-medium mb-1">QR & Validity</h3>
                    <p className="text-[10px] text-[#e6e0d4]/60">Dynamic QR generation compatible with all wallet standards.</p>
                 </div>
            </div>

        </div>
      </section>

      {/* 4. INTEGRATION SECTION */}
      <section className="py-20 bg-[#e6e0d4] text-[#12100e] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
            <DitherEffect opacity={0.2} animate={false} />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div>
                <h2 className="text-3xl font-light tracking-tight mb-6">Designed for <br/>Developer Velocity</h2>
                <div className="space-y-4">
                    <div className="flex items-center gap-4 border-b border-[#12100e]/10 pb-4">
                        <Terminal className="w-4 h-4" />
                        <span className="text-xs font-mono">npm install @ceiling/sdk</span>
                    </div>
                    <div className="flex items-center gap-4 border-b border-[#12100e]/10 pb-4">
                        <Box className="w-4 h-4" />
                        <span className="text-xs font-mono">import {`{ Enforcer }`} from '@ceiling/core'</span>
                    </div>
                </div>
            </div>
            
            <div className="bg-[#12100e] text-[#e6e0d4] p-6 text-xs font-mono shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)]">
                <div className="flex gap-2 mb-4 border-b border-[#e6e0d4]/20 pb-2">
                    <div className="w-2 h-2 bg-red-500"></div>
                    <div className="w-2 h-2 bg-yellow-500"></div>
                    <div className="w-2 h-2 bg-green-500"></div>
                </div>
                <p className="opacity-50">// Initialize Pricing Logic</p>
                <p><span className="text-purple-400">const</span> ticket = <span className="text-blue-400">new</span> Ticket(0x...);</p>
                <p className="mt-2"><span className="text-purple-400">await</span> ticket.deploy({`{`}</p>
                <p className="pl-4">supply: <span className="text-orange-400">10000</span>,</p>
                <p className="pl-4">ceilingPrice: <span className="text-orange-400">"0.2 ETH"</span>,</p>
                <p className="pl-4">royalty: <span className="text-orange-400">500</span> <span className="opacity-50">// 5%</span></p>
                <p>{`}`});</p>
            </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="bg-[#12100e] pt-20 pb-10 border-t border-[#e6e0d4]/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-end gap-8">
            <div>
                <div className="w-4 h-4 bg-[#e6e0d4] mb-4"></div>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Ceiling Protocol</h4>
                <p className="text-[10px] text-[#e6e0d4]/40">© 2024 Infrastructure Inc.</p>
            </div>
            <div className="flex gap-8 text-[10px] uppercase tracking-widest">
                <a href="#" className="hover:underline decoration-1 underline-offset-4">GitHub</a>
                <a href="#" className="hover:underline decoration-1 underline-offset-4">Twitter</a>
                <a href="#" className="hover:underline decoration-1 underline-offset-4">Discord</a>
            </div>
        </div>
      </footer>

    </div>
  );
}