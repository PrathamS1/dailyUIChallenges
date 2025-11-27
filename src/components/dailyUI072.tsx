import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import BackToHome from "./BackToHome";

const CARD_WIDTH = 320;
const CARD_HEIGHT = 400;
const GAP = 60;
const IMAGES = [
  "https://images.unsplash.com/photo-1764111812995-b73ff58fc7d7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1763607058547-bbb9689bbb30?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDE2fDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1763718205007-fb085a276026?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDQwfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1763389568414-1fb002c6e1a7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDYxfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1738691035045-3fb009e8aa26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDcxfDZzTVZqVExTa2VRfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1752061159819-f290b8f48b08?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fENEd3V3WEpBYkV3fHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1711322605758-5cdcd7b1c51e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDc5fHFQWXNEenZKT1ljfHxlbnwwfHx8fHw%3D",
  "https://images.unsplash.com/photo-1761960083580-7bda5603a8cf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDEwN3x0b3dKWkZza3BHZ3x8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1762912302731-508b4580735f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExNXx0b3dKWkZza3BHZ3x8ZW58MHx8fHx8",
  "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dGVjaHxlbnwwfDF8MHx8fDI%3D",
];

const SliderCard = ({ imgUrl, index, x, windowWidth }) => {
  // the position of this specific card relative to the start of the strip
  const cardOffset = index * (CARD_WIDTH + GAP);
  const [isLoaded, setIsLoaded] = useState(false);

  // the distance of this card from the center of the viewport
  // center of screen = windowWidth / 2
  // center of card = x + cardOffset + CARD_WIDTH / 2
  const distance = useTransform(x, (latestX) => {
    const cardCenter = latestX + cardOffset + CARD_WIDTH / 2;
    return Math.abs(cardCenter - windowWidth / 2);
  });

  const scale = useTransform(distance, [0, 200, 600], [1.1, 0.9, 0.8]);
  const opacity = useTransform(distance, [0, 300, 800], [1, 0.5, 0.2]);
  const zIndex = useTransform(distance, (d) =>
    d < CARD_WIDTH / 2 ? 50 : 10 - Math.round(d / 100)
  );

  const imageX = useTransform(distance, [0, 500], [0, 30]);

  return (
    <motion.div
      style={{
        width: CARD_WIDTH,
        height: CARD_HEIGHT,
        marginRight: GAP,
        zIndex,
        scale,
        opacity,
      }}
      className="relative flex-shrink-0"
    >
      <div className="w-full h-full rounded-[24px] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl">
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-800 animate-pulse z-0" />
        )}
        <motion.img
          src={imgUrl}
          alt=""
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-700 ease-out ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ x: imageX, scale: 1.25 }}
        />

        <div className="absolute top-4 right-4 text-4xl font-black text-white/10 font-mono">
          {index < 9 ? `0${index + 1}` : index + 1}
        </div>

        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent mix-blend-overlay rounded-[24px]"
          style={{ opacity: useTransform(distance, [0, 150], [1, 0]) }}
        />
      </div>
    </motion.div>
  );
};

const Slider = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0 });

  const x = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 20, stiffness: 100, mass: 0.8 });

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      setWindowWidth(w);
      const startPosition = w / 2 - CARD_WIDTH / 2;

      const contentWidth =
        IMAGES.length * CARD_WIDTH + (IMAGES.length - 1) * GAP;

      const endPosition = startPosition - (contentWidth - CARD_WIDTH / 2);

      setDragConstraints({ right: startPosition, left: endPosition });

      if (x.get() === 0) x.set(startPosition);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [x]);

  useEffect(() => {
    const handleWheel = (e) => {
      const current = x.get();
      const newPos = current - e.deltaY;

      if (newPos > dragConstraints.right + 100) {
      } else if (newPos < dragConstraints.left - 100) {
      } else {
        x.set(newPos);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [x, dragConstraints]);

  return (
    <>
      <div className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-center text-white font-[Vt323]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-[-50%] opacity-[0.15]"
            style={{
              backgroundImage: `linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
              maskImage:
                "radial-gradient(circle at center, black 40%, transparent 80%)",
              transform: "perspective(800px) rotateX(60deg) scale(2)",
            }}
          />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-900/20 blur-[150px] rounded-full mix-blend-screen" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-10 left-10 mix-blend-difference z-20"
        >
          <h1 className="text-5xl font-bold uppercase tracking-tight font-[VT323]">
            Slider<span className="text-cyan-500">.</span>V.01
          </h1>
          <p className="text-sm text-gray-500 mt-2 font-[DM_Sans] tracking-widest">
            SCROLL/DRAG • {IMAGES.length} FRAMES
          </p>
        </motion.div>

        <div className="relative z-10 w-full h-[600px] perspective-[1000px] flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 100, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 5 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="flex flex-nowrap min-w-max items-center cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={dragConstraints}
            dragElastic={0.05}
            style={{
              x: smoothX,
              rotateX: 5,
              rotateY: -5,
              rotateZ: 2,
              transformStyle: "preserve-3d",
              paddingLeft: 0,
            }}
          >
            {IMAGES.map((img, i) => (
              <SliderCard
                key={i}
                index={i}
                imgUrl={img}
                x={smoothX}
                windowWidth={windowWidth}
              />
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-12 w-64 h-1 bg-gray-900 rounded-full overflow-hidden border border-white/5"
        >
          <motion.div
            className="h-full bg-cyan-500 box-shadow-[0_0_15px_rgba(6,182,212,0.5)]"
            style={{
              width: useTransform(
                smoothX,
                [dragConstraints.right, dragConstraints.left],
                ["0%", "100%"]
              ),
            }}
          />
        </motion.div>
      </div>
      <BackToHome challengeDay="72" challengeTitle="Slider" />
    </>
  );
};

export default Slider;
