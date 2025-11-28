import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Settings, 
  Play, 
  SkipForward, 
  SkipBack, 
  Cloud, 
  Battery, 
  Wifi, 
  MessageSquare, 
  Globe, 
  Layers,
   Gamepad2, 
  Video, 
  Box, 
  Mic, 
  Eye, 
  Bluetooth, 
  Volume2, 
  Sun,
  ShieldCheck,
  Cpu,
  GalleryVertical,
  LoaderPinwheel
} from 'lucide-react';
import { BiDevices } from 'react-icons/bi';
import BackToHome from './BackToHome';

const GlassCard = ({ children, className = "", onClick, active }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05, rotateX: 5, z: 50 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onClick}
      className={`
        relative overflow-hidden backdrop-blur-xl border 
        transition-colors duration-300 cursor-pointer
        ${active 
          ? 'bg-white/20 border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.2)]' 
          : 'bg-black/40 border-white/10 hover:border-white/30 hover:bg-white/10'}
        rounded-3xl p-6 ${className}
      `}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      {children}
    </motion.div>
  );
};

const Reticle = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePos({ x: e.clientX, y: e.clientY });
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 mix-blend-difference"
      animate={{ x: mousePos.x - 20, y: mousePos.y - 20 }}
      transition={{ type: "spring", damping: 20, stiffness: 250, mass: 0.5 }}
    >
      <div className="w-10 h-10 border-2 border-cyan-400 rounded-full flex items-center justify-center opacity-80">
        <div className="w-1 h-1 bg-cyan-400 rounded-full" />
      </div>
    </motion.div>
  );
};

const StatusBar = () => (
  <motion.div 
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="flex justify-between items-center px-12 py-6 w-full max-w-6xl mx-auto"
  >
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-cyan-300/80 font-mono text-sm bg-black/30 px-4 py-2 rounded-full border border-white/5">
        <LoaderPinwheel size={14} color='green'/>
        SYSTEM ONLINE
      </div>
    </div>
    <div className="flex items-center gap-6 text-white/70">
      <div className="flex items-center gap-2">
        <Wifi size={18} />
        <span className="text-xs font-mono">5G</span>
      </div>
      <div className="flex items-center gap-2">
        <Battery size={18} />
        <span className="text-xs font-mono">98%</span>
      </div>
      <span className="text-xl font-light tracking-widest">{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
    </div>
  </motion.div>
);

const WeatherWidget = () => (
  <div className="flex flex-col h-full justify-between">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-white/50 text-sm font-bold tracking-wider uppercase">Atmosphere</h3>
        <h2 className="text-4xl text-white font-thin mt-2">24°C</h2>
      </div>
      <Cloud className="text-cyan-400" size={40} />
    </div>
    <div className="space-y-2">
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <div className="h-full w-2/3 bg-gradient-to-r from-cyan-500 to-blue-500" />
      </div>
      <p className="text-xs text-white/40 font-mono">HUMIDITY: 45% // AIR: CLEAN</p>
    </div>
  </div>
);

const MediaPlayer = () => (
  <div className="flex flex-col items-center justify-center h-full">
    <div className="absolute inset-0 -z-1 rounded-2xl h-full">
      <img src="https://marketplace.canva.com/EAGl2RBdUF0/1/0/1600w/canva-dark-green-and-white-modern-lost-in-stars-album-cover-LkSUXx1d-Sw.jpg" className="opacity-40 w-full h-full object-cover" />
    </div>
    <div className="flex items-center gap-6">
      <SkipBack className="text-white/50 hover:text-white cursor-pointer" size={24} />
      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform text-black">
        <Play size={20} fill="currentColor" />
      </div>
      <SkipForward className="text-white/50 hover:text-white cursor-pointer" size={24} />
    </div>
  </div>
);

const SocialFeed = () => (
  <div className="space-y-4">
    <div className="flex items-center justify-between pb-2 border-b border-white/10">
      <h3 className="text-white/50 text-sm font-bold uppercase">Messages</h3>
      <div className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">3 NEW</div>
    </div>
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex items-center gap-3 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
          <MessageSquare size={14} className="text-cyan-300" />
        </div>
        <div>
          <p className="text-sm text-white">User {'A' + i}</p>
          <p className="text-xs text-white/40">Sent a message...</p>
        </div>
      </div>
    ))}
  </div>
);


const VRInterface = () => {
  const [activeTab, setActiveTab] = useState('home');

  const menuItems = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'map', icon: Globe, label: 'World' },
    { id: 'library', icon: Layers, label: 'Apps' },
    { id: 'settings', icon: Settings, label: 'System' },
  ];

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden font-[DM_Sans] selection:bg-cyan-500/30">

      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1598928506311-c55ded91a20c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Room Environment" 
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/40" />
      </div>
      
      <Reticle />

      <div className="relative z-10 flex flex-col h-full">
        <StatusBar />

        <div className="flex-1 flex items-center justify-center perspective-[2000px]">
          <div className="relative w-full max-w-6xl px-8 flex flex-col md:flex-row gap-8 items-center justify-center">
            
            <motion.div 
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex flex-col gap-4 w-64 transform rotate-y-12 origin-right"
            >
              <GlassCard className="h-48">
                <WeatherWidget />
              </GlassCard>
              <GlassCard className="h-64">
                <SocialFeed />
              </GlassCard>
            </motion.div>

            <motion.div 
              layout
              className="w-full md:w-[600px] aspect-square md:aspect-[4/3] relative"
            >
              <AnimatePresence mode="wait">
                {activeTab === 'home' && (
                  <motion.div 
                    key="home"
                    initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                    animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ scale: 1.1, opacity: 0, filter: 'blur(10px)' }}
                    transition={{ type: "spring", bounce: 0.3 }}
                    className="h-full w-full"
                  >
                    <GlassCard className="h-full flex flex-col items-center justify-center border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.15)]">
                      <div className="absolute top-6 left-6 text-xs font-mono text-cyan-500 uppercase tracking-widest">
                        Dashboard // V.2.0
                      </div>
                      
                      <div className="text-center space-y-6">
                        <div className="inline-block p-4 rounded-full border border-white/10 bg-white/5 mb-4 animate-pulse">
                          <img 
                            src="https://img.freepik.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg?semt=ais_hybrid&w=740&q=80" 
                            alt="Avatar" 
                            className="w-20 h-20 rounded-full"
                          />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-thin text-white tracking-normal">
                          Welcome Back, <span className="text-cyan-400 font-normal">User</span>
                        </h1>
                        <p className="text-white/50 text-lg max-w-md mx-auto">
                          Environment stabilized. 3 notifications pending. Gestures enabled.
                        </p>
                        
                        <div className="grid grid-cols-2 gap-4 mt-8 w-full max-w-sm mx-auto">
                           <button className="bg-white/10 hover:bg-cyan-500 hover:text-black text-white py-4 rounded-xl backdrop-blur-md border border-white/10 transition-all font-bold tracking-wide">
                              RESUME
                           </button>
                           <button className="bg-white/10 hover:bg-cyan-200 hover:text-black text-white py-4 rounded-xl backdrop-blur-md border border-white/10 transition-all font-bold tracking-wide">
                              CALIBRATE
                           </button>
                        </div>
                      </div>
                    </GlassCard>
                  </motion.div>
                )}

                {activeTab === 'map' && (
                   <motion.div 
                     key="map"
                     initial={{ rotateY: 90, opacity: 0 }}
                     animate={{ rotateY: 0, opacity: 1 }}
                     exit={{ rotateY: -90, opacity: 0 }}
                     className="h-full w-full"
                   >
                     <GlassCard className="h-full relative group">
                        <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png')] bg-cover bg-center opacity-20 group-hover:opacity-40 transition-opacity invert" />
                        <div className="relative z-10 flex items-center justify-center h-full">
                           <div className="text-center">
                              <Globe size={64} className="mx-auto text-cyan-400 mb-4 animate-spin-slow" />
                              <h2 className="text-2xl text-white">Global Positioning</h2>
                              <p className="text-cyan-300 font-mono text-sm mt-2">Searching for satellites...</p>
                           </div>
                        </div>
                     </GlassCard>
                   </motion.div>
                )}

                {activeTab === 'library' && (
                  <motion.div
                    key="library"
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: -20 }}
                    className="h-full w-full"
                  >
                    <GlassCard className="h-full flex flex-col relative overflow-hidden">
                      {/* Header */}
                      <div className="flex justify-between items-end mb-6 border-b border-white/10 pb-4">
                        <h2 className="text-3xl font-light text-white">Application Matrix</h2>
                        <div className="flex gap-2">
                           <span className="text-cyan-400 font-bold border-b-2 border-cyan-400 pb-1 cursor-pointer">INSTALLED</span>
                           <span className="text-white/40 font-bold hover:text-white pb-1 px-2 cursor-pointer transition-colors">STORE</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 overflow-hidden pr-2 custom-scrollbar">
                        {[
                          { name: 'Stream', icon: Video, color: 'text-purple-400' },
                          { name: 'Hyper Gaming', icon: Gamepad2, color: 'text-green-400' },
                          { name: '3D Studio', icon: Box, color: 'text-blue-400' },
                          { name: 'Voice Command', icon: Mic, color: 'text-pink-400' },
                          { name: 'Gallery', icon: GalleryVertical, color: 'text-white' },
                          { name: 'Device', icon: BiDevices, color: 'text-cyan-400' },
                        ].map((app, i) => (
                          <motion.div
                            key={i}
                            whileHover={{ scale: .9, backgroundColor: 'rgba(255,255,255,0.1)' }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col items-center justify-center gap-3 cursor-pointer group transition-colors hover:border-cyan-500/30"
                          >
                            <div className={`w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors`}>
                              <app.icon className={app.color} size={24} />
                            </div>
                            <span className="text-sm text-white/80 font-medium group-hover:text-white">{app.name}</span>
                          </motion.div>
                        ))}
                      </div>
                    </GlassCard>
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div
                    key="settings"
                    initial={{ rotateX: -15, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    exit={{ rotateX: 15, opacity: 0 }}
                    className="h-full w-full"
                  >
                     <GlassCard className="h-full flex flex-col">
                        <h2 className="text-3xl font-light text-white mb-8">System Control</h2>
                        
                        <div className="space-y-6 flex-1 overflow-y-auto pr-2">
                           
                           <div className="space-y-6 p-4 bg-black/20 rounded-2xl border border-white/5">
                              <div className="space-y-2">
                                 <div className="flex justify-between text-white/70 text-sm">
                                    <div className="flex items-center gap-2"><Sun size={16}/> Brightness</div>
                                    <span>85%</span>
                                 </div>
                                 <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                       initial={{ width: 0 }} animate={{ width: '85%' }} 
                                       className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative"
                                    >
                                       <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
                                    </motion.div>
                                 </div>
                              </div>

                              <div className="space-y-2">
                                 <div className="flex justify-between text-white/70 text-sm">
                                    <div className="flex items-center gap-2"><Volume2 size={16}/> Audio Immersion</div>
                                    <span>60%</span>
                                 </div>
                                 <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                    <motion.div 
                                       initial={{ width: 0 }} animate={{ width: '60%' }} 
                                       className="h-full bg-gradient-to-r from-purple-500 to-pink-500 relative"
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_10px_white]" />
                                    </motion.div>
                                 </div>
                              </div>
                           </div>

                           <div className="grid grid-cols-2 gap-4">
                              {[
                                 { icon: Bluetooth, label: 'Bluetooth', active: true },
                                 { icon: ShieldCheck, label: 'Security', active: true },
                                 { icon: Eye, label: 'Eye Track', active: false },
                                 { icon: Cpu, label: 'Performance Boost', active: true },
                              ].map((item, idx) => (
                                 <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                       <item.icon size={18} className="text-white/60" />
                                       <span className="text-sm text-white/80">{item.label}</span>
                                    </div>
                                    <div className={`w-10 h-5 rounded-full relative ${item.active ? 'bg-green-500' : 'bg-white/20'}`}>
                                       <motion.div 
                                          layout
                                          className={`absolute top-1 w-3 h-3 bg-white rounded-full shadow-md ${item.active ? 'left-6' : 'left-1'}`}
                                       />
                                    </div>
                                 </div>
                              ))}
                           </div>

                        </div>
                     </GlassCard>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div 
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="hidden md:flex flex-col gap-4 w-64 transform -rotate-y-12 origin-left"
            >
              <GlassCard className="h-64">
                <MediaPlayer />
              </GlassCard>
              <GlassCard className="h-48 flex items-center justify-center">
                 <div className="text-center space-y-2">
                    <div className="text-4xl font-bold text-white/20">VR</div>
                    <div className="text-xs text-white/40 uppercase tracking-widest">Controls Active</div>
                 </div>
              </GlassCard>
            </motion.div>

          </div>
        </div>

        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="pb-8 pt-4 flex justify-center perspective-[1000px]"
        >
          <div className="flex gap-4 p-4 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl transform rotate-x-12 origin-bottom hover:rotate-x-0 transition-transform duration-500">
            {menuItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                whileHover={{ scale: 1.2, y: -10 }}
                whileTap={{ scale: 0.9 }}
                className={`
                  relative group flex flex-col items-center justify-center w-20 h-20 rounded-2xl transition-all duration-300
                  ${activeTab === item.id ? 'bg-cyan-500 text-black shadow-[0_0_20px_rgba(6,182,212,0.6)]' : 'bg-white/5 text-white hover:bg-white/20'}
                `}
              >
                <item.icon size={28} strokeWidth={1.5} />
                <span className={`text-[10px] font-bold mt-2 uppercase tracking-wide ${activeTab === item.id ? 'opacity-100' : 'opacity-20 group-hover:opacity-100 transition-opacity'}`}>
                  {item.label}
                </span>
                
                {activeTab === item.id && (
                  <motion.div 
                    layoutId="activeDot"
                    className="absolute -bottom-2 w-1 h-1 bg-white rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
      <BackToHome challengeDay='73' challengeTitle='Virtual Reality'/>
    </div>
  );
};

export default VRInterface;