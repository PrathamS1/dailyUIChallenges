import React, { useState, useEffect, useRef } from "react";
import { Home, ArrowLeft, Search } from "lucide-react";

const Simple404 = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState([]);
  const [hoveredButton, setHoveredButton] = useState(null);
  const [glitchActive, setGlitchActive] = useState(false);
  const [breathe, setBreathe] = useState(0);
  const backgroundRef = useRef(null);

  const triggerGlitch = () => {
    setGlitchActive(true);
    setTimeout(() => setGlitchActive(false), 5000);
  };

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          speed: Math.random() * 0.5 + 0.1,
          direction: Math.random() * 360,
        });
      }
      setParticles(newParticles);
    };

    generateParticles();

    const glitchInterval = setInterval(() => {
      if (Math.random() > 0.7) triggerGlitch();
    }, Math.random() * 4000 + 8000);

    const breatheInterval = setInterval(() => {
      setBreathe(prev => (prev + 1) % 360);
    }, 50);

    const handleMouseMove = (e) => {
      if (backgroundRef.current) {
        const rect = backgroundRef.current.getBoundingClientRect();
        setMousePosition({
          x: ((e.clientX - rect.left) / rect.width) * 100,
          y: ((e.clientY - rect.top) / rect.height) * 100,
        });
      }
    };

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => {
        let newX = particle.x + Math.cos(particle.direction) * particle.speed * 0.1;
        let newY = particle.y + Math.sin(particle.direction) * particle.speed * 0.1;
        
        if (newX > 100) newX = 0;
        if (newX < 0) newX = 100;
        if (newY > 100) newY = 0;
        if (newY < 0) newY = 100;
        
        return { ...particle, x: newX, y: newY };
      }));
    };

    const interval = setInterval(animateParticles, 50);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      clearInterval(interval);
      clearInterval(glitchInterval);
      clearInterval(breatheInterval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={backgroundRef}
      className="min-h-screen bg-[url('/darkBg.png')] bg-no-repeat bg-cover text-white flex items-center justify-center relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-10 transition-all duration-1000 ease-out"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`,
          }}
        />

        {particles.map((particle) => {
          const dx = mousePosition.x - particle.x;
          const dy = mousePosition.y - particle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          const repulsionRadius = 20;
          let repelX = 0;
          let repelY = 0;
          
          if (distance < repulsionRadius && distance > 0) {
            const repulsionForce = (repulsionRadius - distance) / repulsionRadius * 4;
            repelX = -(dx / distance) * repulsionForce;
            repelY = -(dy / distance) * repulsionForce;
          }
          
          return (
            <div
              key={particle.id}
              className="absolute rounded-full bg-white transition-all duration-500 ease-out"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                opacity: particle.opacity,
                transform: `translate(${repelX}px, ${repelY}px)`,
              }}
            />
          );
        })}

        <div 
          className="absolute w-96 h-96 rounded-full opacity-5 transition-all duration-600 ease-out pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
            left: `${mousePosition.x * 0.8 + 10}%`,
            top: `${mousePosition.y * 0.8 + 10}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="white" stopOpacity="0.2" />
              <stop offset="50%" stopColor="white" stopOpacity="0.1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line 
            x1="10%" 
            y1="20%" 
            x2={`${20 + mousePosition.x * 0.15 + (mousePosition.x < 30 ? (30 - mousePosition.x) * 0.2 : 0)}%`} 
            y2={`${40 + mousePosition.y * 0.1 + (mousePosition.y < 30 ? (30 - mousePosition.y) * 0.2 : 0)}%`} 
            stroke="url(#lineGradient)" 
            strokeWidth="1"
            className="transition-all duration-700 ease-out"
          />
          <line 
            x1="80%" 
            y1="30%" 
            x2={`${60 + mousePosition.x * 0.1 - (mousePosition.x > 70 ? (mousePosition.x - 70) * 0.15 : 0)}%`} 
            y2={`${70 + mousePosition.y * 0.15 + (mousePosition.y < 40 ? (40 - mousePosition.y) * 0.1 : 0)}%`} 
            stroke="url(#lineGradient)" 
            strokeWidth="1"
            className="transition-all duration-800 ease-out"
          />
          <line 
            x1="30%" 
            y1="80%" 
            x2={`${70 + mousePosition.x * 0.05 + (mousePosition.x < 50 ? (50 - mousePosition.x) * 0.1 : 0)}%`} 
            y2={`${20 + mousePosition.y * 0.2 - (mousePosition.y > 60 ? (mousePosition.y - 60) * 0.15 : 0)}%`} 
            stroke="url(#lineGradient)" 
            strokeWidth="1"
            className="transition-all duration-900 ease-out"
          />
        </svg>
      </div>

      <div 
        className="text-center max-w-md mx-auto px-6 relative z-10 transition-all duration-300"
        style={{
          transform: `scale(${1 + Math.sin(breathe * 0.05) * 0.008}) translateY(${Math.sin(breathe * 0.03) * 1}px)`,
        }}
      >
        
        <div className="mb-8">
          <div 
            className="relative cursor-pointer group"
            onClick={() => triggerGlitch()}
            onMouseEnter={() => {
              if (!glitchActive) triggerGlitch();
            }}
          >
            <h1 
              className={`text-8xl md:text-9xl font-bold text-white mb-4 tracking-wider transition-all duration-200 select-none ${
                glitchActive ? 'animate-pulse' : 'group-hover:scale-105'
              }`}
              style={{
                textShadow: glitchActive 
                  ? `2px 0 #ff0040, -2px 0 #00ffff, 0 0 20px rgba(255,255,255,0.5)` 
                  : 'none',
                transform: glitchActive 
                  ? `skew(${Math.random() * 2 - 1}deg, ${Math.random() * 2 - 1}deg)` 
                  : 'none',
              }}
            >
              4{glitchActive && Math.random() > 0.5 ? '?' : '0'}4
            </h1>
            
            {glitchActive && (
              <div className="absolute inset-0 pointer-events-none">
                <div 
                  className="text-8xl md:text-9xl font-bold text-red-500 mb-4 tracking-wider opacity-70"
                  style={{
                    transform: `translate(2px, -1px)`,
                    mixBlendMode: 'screen',
                  }}
                >
                  4{Math.random() > 0.5 ? '!' : '0'}4
                </div>
                <div 
                  className="text-8xl md:text-9xl font-bold text-cyan-400 mb-4 tracking-wider opacity-70"
                  style={{
                    transform: `translate(-2px, 1px)`,
                    mixBlendMode: 'screen',
                  }}
                >
                  {Math.random() > 0.5 ? '#' : '4'}04
                </div>
              </div>
            )}
          </div>
          
          <div 
            className="w-24 h-1 bg-white mx-auto transition-all duration-500"
            style={{
              transform: glitchActive ? 'scaleX(1.5)' : 'scaleX(1)',
              boxShadow: glitchActive ? '0 0 10px rgba(255,255,255,0.8)' : 'none',
            }}
          ></div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 transition-all duration-300 hover:text-gray-300">
            Page Not Found
          </h2>
          <p 
            className="text-gray-400 leading-relaxed transition-all duration-300 hover:text-gray-300"
            style={{
              transform: mousePosition.x ? `translateX(${(mousePosition.x - 50) * 0.02}px)` : 'none',
            }}
          >
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="space-y-4">
          <button 
            className="w-full px-6 py-3 bg-white text-black hover:bg-gray-200 transition-all duration-300 rounded-lg font-medium flex items-center justify-center space-x-2 group transform hover:scale-105 hover:shadow-lg"
            onMouseEnter={() => setHoveredButton('home')}
            onMouseLeave={() => setHoveredButton(null)}
            style={{
              boxShadow: hoveredButton === 'home' ? '0 0 20px rgba(255,255,255,0.3)' : 'none',
            }}
          >
            <Home className={`w-4 h-4 transition-transform duration-300 ${hoveredButton === 'home' ? 'rotate-12' : ''}`} />
            <span>Go Home</span>
          </button>
          
          <div className="flex space-x-4">
            <button 
              className="flex-1 px-6 py-3 border border-gray-600 hover:border-gray-400 transition-all duration-300 rounded-lg font-medium flex items-center justify-center space-x-2 group transform hover:scale-105"
              onMouseEnter={() => setHoveredButton('back')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                backgroundColor: hoveredButton === 'back' ? 'rgba(255,255,255,0.05)' : 'transparent',
                transform: hoveredButton === 'back' ? 'translateX(-2px)' : 'none',
              }}
            >
              <ArrowLeft className={`w-4 h-4 transition-transform duration-300 ${hoveredButton === 'back' ? '-translate-x-1' : ''}`} />
              <span>Back</span>
            </button>
            <button 
              className="flex-1 px-6 py-3 border border-gray-600 hover:border-gray-400 transition-all duration-300 rounded-lg font-medium flex items-center justify-center space-x-2 group transform hover:scale-105"
              onMouseEnter={() => setHoveredButton('search')}
              onMouseLeave={() => setHoveredButton(null)}
              style={{
                backgroundColor: hoveredButton === 'search' ? 'rgba(255,255,255,0.05)' : 'transparent',
              }}
            >
              <Search className={`w-4 h-4 transition-transform duration-300 ${hoveredButton === 'search' ? 'scale-110 rotate-12' : ''}`} />
              <span>Search</span>
            </button>
          </div>
        </div>

        <div 
          className="mt-16 pt-8 border-t border-gray-800 transition-all duration-500"
          style={{
            transform: `translateY(${mousePosition.y * 0.02}px)`,
            opacity: 0.8 + (mousePosition.y * 0.002),
          }}
        >
          <p 
            className="text-gray-600 text-sm cursor-default hover:text-gray-500 transition-colors duration-300"
            onClick={() => triggerGlitch()}
          >
            Error Code: 404 • Page Not Found
          </p>
        </div>
      </div>
    </div>
  );
};

export default Simple404;
