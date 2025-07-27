import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const DailyUI003: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStage, setCurrentStage] = useState(0);

  //   useEffect(() => {
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //     if (timelineRef.current && containerRef.current) {
  //       const timeline = timelineRef.current;
  //       const container = containerRef.current;
  //       const stages = 6; // Number of timeline stages
  //     const sections = gsap.utils.toArray<HTMLElement>(".timeline-stage");

  //       // Set up horizontal scroll with snap functionality
  //       const scrollTween = gsap.to(timeline, {
  //         x: () => -(timeline.scrollWidth - window.innerWidth),
  //         ease: "none",
  //         scrollTrigger: {
  //           trigger: container,
  //           start: "top top",
  //           end: () => `+=${stages * window.innerHeight}`, // Each stage takes 1 viewport height
  //           scrub: 1,
  //           pin: true,
  //           anticipatePin: 1,
  //           invalidateOnRefresh: true,
  //           snap: {
  //             snapTo: (progress) => {
  //               // Snap to increments of 1/6 (for 6 stages)
  //               const snapIncrement = 1 / stages;
  //               const snappedProgress = Math.round(progress / snapIncrement) * snapIncrement;
  //               return Math.max(0, Math.min(1, snappedProgress));
  //             },
  //             duration: { min: 0.3, max: 0.7 },
  //             delay: 0.05,
  //             ease: "power2.inOut",
  //             directional: false
  //           },
  //           onUpdate: (self) => {
  //             // Calculate current stage based on progress
  //             const stageIndex = Math.floor(self.progress * stages);
  //             setCurrentStage(Math.min(stageIndex, stages - 1));
  //             console.log(`Current stage: ${stageIndex + 1}, Progress: ${(self.progress * 100).toFixed(1)}%`);
  //           }
  //         },
  //       });

  //       console.log(
  //         "Timeline setup - Stages:",
  //         stages,
  //         "Scroll Width:",
  //         timeline.scrollWidth,
  //         "Window Width:",
  //         window.innerWidth,
  //         "Total scroll distance:",
  //         stages * window.innerHeight
  //       );

  //       // Handle window resize to recalculate snap points
  //       const handleResize = () => {
  //         ScrollTrigger.refresh();
  //       };

  //       window.addEventListener('resize', handleResize);

  //       return () => {
  //         scrollTween.kill();
  //         ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //         window.removeEventListener('resize', handleResize);
  //       };
  //     }
  //   }, []);
  useEffect(() => {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    if (timelineRef.current && containerRef.current) {
      const timeline = timelineRef.current;
      const container = containerRef.current;

      const sections = gsap.utils.toArray<HTMLElement>(".timeline-stage");
      const stages = sections.length;

      // Calculate full horizontal scroll distance
      const scrollTween = gsap.to(timeline, {
        x: () => -(timeline.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${stages * window.innerHeight}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: (progress) => {
              const snapIncrement = 1 / (stages - 1);
              const snappedProgress =
                Math.round(progress / snapIncrement) * snapIncrement;
              return Math.max(0, Math.min(1, snappedProgress));
            },
            // duration: { min: 0.3, max: 0.7 },
            // delay: 0.05,
            duration: { min: 0.05, max: 0.15 },
            delay: 0.01,
            ease: "power2.inOut",
          },
          onUpdate: (self) => {
            const stageIndex = Math.floor(self.progress * stages);
            setCurrentStage(Math.min(stageIndex, stages - 1));
          },
        },
      });

      const handleResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);

      return () => {
        scrollTween.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [timelineRef, containerRef, setCurrentStage]);

  return (
    <div className="bg-white text-gray-900">
      {/* Navigation Header - Outside hero section */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="text-xl sm:text-2xl font-bold text-[var(--landing-text)]">
              Alverno
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a
                href="#features"
                className="text-[var(--landing-text)] hover:text-[var(--landing-accent)] transition-colors text-sm lg:text-base"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-[var(--landing-text)] hover:text-[var(--landing-accent)] transition-colors text-sm lg:text-base"
              >
                Pricing
              </a>
              <a
                href="#testimonials"
                className="text-[var(--landing-text)] hover:text-[var(--landing-accent)] transition-colors text-sm lg:text-base"
              >
                Testimonials
              </a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-landing-primary text-white px-4 sm:px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-all text-sm lg:text-base"
              >
                Get Started
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-landing-primary text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition-all text-sm"
              >
                Menu
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - "Internships, Done Right" */}
      <section className="min-h-screen bg-[url('/landingHero.jpg')] bg-cover relative overflow-hidden pt-20">

        {/* Main Hero Content */}
        <div className="relative z-20 flex items-center py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              {/* Left Column - Content */}
              <div className="text-center lg:text-left order-2 lg:order-1">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-[var(--landing-text)] mb-4 sm:mb-6 tracking-tight leading-tight"
                >
                  Rethinking
                  <br />
                  <span className="text-[var(--landing-background)] bg-[var(--landing-accent)] rounded">
                    Internships
                  </span>
                  <span className="text-[var(--landing-text)]">
                     &nbsp;for Modern Teams
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-lg sm:text-xl lg:text-2xl text-[var(--landing-text)] opacity-80 mb-6 sm:mb-8 max-w-2xl mx-auto lg:mx-0"
                >
                  One platform to onboard, manage, and grow interns —
                  effortlessly.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 25px rgba(74, 144, 226, 0.3)",
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-landing-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:opacity-90 transition-all shadow-lg"
                  >
                    Book a Demo
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      document
                        .querySelector("#journey")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="border-2 border-landing-primary text-landing-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-landing-primary hover:text-white transition-all"
                  >
                    See How It Works
                  </motion.button>
                </motion.div>
              </div>

              {/* Right Column - Visual Element */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="relative order-1 lg:order-2"
              >
                {/* Main Image Container */}
                <motion.div 
                  className="relative max-w-lg mx-auto lg:max-w-none group"
                  whileHover="hover"
                  initial="initial"
                >
                  {/* Sample Dashboard Image */}
                  <motion.div 
                    className="relative rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-200 aspect-[4/3] cursor-pointer"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                      alt="Internship Management Dashboard"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay for better contrast */}
                    <div className="absolute inset-0 bg-gradient-to-br from-landing-primary/20 to-landing-secondary/20 mix-blend-overlay"></div>
                  </motion.div>

                  {/* Floating Success Badge - Top Right */}
                  <motion.div
                    className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6"
                    variants={{
                      initial: { 
                        y: 0,
                        rotate: 0,
                        scale: 1 
                      },
                      hover: { 
                        y: 8,
                        x: -8,
                        rotate: -15,
                        scale: 1.1,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }
                    }}
                  >
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                      <img
                        src="/people.png"
                        alt="Intern Onboarded"
                        className="w-20 h-16 sm:w-24 sm:h-16 object-contain"
                      />
                    </div>
                  </motion.div>

                  {/* Floating Progress Badge - Bottom Left */}
                  <motion.div
                    className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6"
                    variants={{
                      initial: { 
                        y: 0,
                        rotate: 0,
                        scale: 1 
                      },
                      hover: { 
                        y: -8,
                        x: 8,
                        rotate: 15,
                        scale: 1.1,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }
                    }}
                  >
                    <div className="bg-white shadow-lg border border-gray-200 p-1 sm:p-2 hover:shadow-xl transition-shadow">
                      <img
                        src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=150&q=80"
                        alt="Progress Tracking"
                        className="w-12 h-12 sm:w-10 sm:h-10 object-cover"
                      />
                    </div>
                  </motion.div>

                  {/* Additional Floating Element - Top Left */}
                  <motion.div
                    className="absolute top-12 -left-3 sm:top-16 sm:-left-4 hidden sm:block"
                    variants={{
                      initial: { 
                        y: 0,
                        rotate: 0,
                        scale: 1 
                      },
                      hover: { 
                        y: 4,
                        x: 4,
                        rotate: 10,
                        scale: 1.1,
                        transition: { duration: 0.3, ease: "easeOut" }
                      }
                    }}
                  >
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-2 sm:p-3 hover:shadow-lg transition-shadow">
                      <div className="w-6 h-6 sm:w-8 sm:h-8 bg-landing-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-xs sm:text-sm font-bold">!</span>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-landing-primary rounded-full flex justify-center">
            <div className="w-1 h-3 bg-landing-primary rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Before & After - Intern Chaos vs Structure */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-4xl lg:text-5xl font-bold text-[var(--landing-text)] mb-6"
            >
              From Chaotic Management to a Clear Process
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-xl text-[var(--landing-text)] opacity-70 max-w-4xl mx-auto"
            >
              Before using our platform, internship management feels like
              scattered docs, missed updates, and lost momentum.
              <br />
              After? One connected system to onboard, assign, track, and support
              interns — without the mess.
            </motion.p>
          </div>

          {/* Before & After Comparison */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE - BEFORE (Chaos) */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >

              <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-red-200">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-red-600 mb-2">
                    The Old Way — Messy & Manual
                  </h3>
                  <div className="w-16 h-1 bg-red-400 mx-auto rounded"></div>
                </div>

                {/* Chaotic Visual Elements */}
                <div className="relative mb-8 h-52 bg-gray-50 rounded-lg overflow-hidden">
                  {/* Scattered Sticky Notes - Consistent sizing and better text handling */}
                  <motion.div
                    animate={{
                      rotate: [0, 2, -1, 1, 0],
                      x: [0, 2, -1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute top-3 left-3 w-20 h-16 bg-yellow-300 rounded shadow-md p-2 text-xs transform rotate-12 flex items-center justify-center"
                  >
                    <div className="text-gray-700 text-center leading-tight overflow-hidden">
                      Check intern progress
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      rotate: [0, -2, 1, -1, 0],
                      y: [0, 1, -2, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1,
                    }}
                    className="absolute top-6 right-4 w-20 h-16 bg-pink-300 rounded shadow-md p-2 text-xs transform -rotate-6 flex items-center justify-center"
                  >
                    <div className="text-gray-700 text-center leading-tight overflow-hidden">
                      Meeting notes lost?
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      rotate: [0, 1, -2, 1, 0],
                      x: [0, -1, 1, 0],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2,
                    }}
                    className="absolute bottom-4 left-6 w-20 h-16 bg-blue-300 rounded shadow-md p-2 text-xs transform rotate-3 flex items-center justify-center"
                  >
                    <div className="text-gray-700 text-center leading-tight overflow-hidden">
                      Email from intern?
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      rotate: [0, -1, 2, -1, 0],
                      y: [0, -1, 1, 0],
                    }}
                    transition={{
                      duration: 4.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="absolute top-16 left-1/2 transform -translate-x-1/2 w-20 h-16 bg-green-300 rounded shadow-md p-2 text-xs rotate-[-8deg] flex items-center justify-center"
                  >
                    <div className="text-gray-700 text-center leading-tight overflow-hidden">
                      Spreadsheet chaos
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{
                      rotate: [0, 1.5, -1, 0.5, 0],
                      x: [0, 1, -1, 0],
                    }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1.5,
                    }}
                    className="absolute bottom-8 right-8 w-20 h-16 bg-purple-300 rounded shadow-md p-2 text-xs transform rotate-8 flex items-center justify-center"
                  >
                    <div className="text-gray-700 text-center leading-tight overflow-hidden">
                      No feedback loop
                    </div>
                  </motion.div>

                  {/* Background Icons - More spread out and consistent */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="text-3xl opacity-15"
                    >
                      📧
                    </motion.div>
                  </div>

                  <div className="absolute bottom-2 right-2 text-2xl opacity-15">
                    💬
                  </div>
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl opacity-15">
                    📊
                  </div>
                  <div className="absolute top-1/2 left-2 text-xl opacity-10">
                    �
                  </div>
                  <div className="absolute top-1/2 right-2 text-xl opacity-10">
                    ⏰
                  </div>
                </div>

                {/* Pain Points List */}
                <div className="space-y-4">
                  {[
                    "Scattered communication across email, Slack & docs",
                    "Confusing onboarding & unclear expectations",
                    "Progress tracking in spreadsheets (or not at all)",
                    "No visibility into how interns are really performing",
                    "Mentors overloaded, interns unengaged",
                  ].map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* RIGHT SIDE - AFTER (Structure) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-landing-secondary border-opacity-30">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-[var(--landing-text)] mb-2">
                    The New Way — Structured & Scalable
                  </h3>
                  <div className="w-16 h-1 bg-landing-secondary mx-auto rounded"></div>
                </div>

                {/* Clean Dashboard Preview */}
                <div className="mb-8 h-52 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 overflow-hidden relative">
                  <div className="p-4 h-full">
                    {/* Dashboard Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-medium text-[var(--landing-text)] flex items-center gap-2">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 bg-landing-secondary rounded-full"
                        ></motion.div>
                        Intern Dashboard
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="text-xs text-green-600">Live</div>
                      </div>
                    </div>

                    {/* Enhanced Intern Cards */}
                    <div className="space-y-3">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-landing-primary to-blue-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">JS</span>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gradient-to-r from-landing-primary to-blue-400 rounded w-20 mb-1"></div>
                          <div className="h-1 bg-gray-100 rounded w-16"></div>
                        </div>
                        <div className="text-xs text-landing-secondary font-medium">
                          ✓ Completed
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-landing-accent to-orange-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">AR</span>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gradient-to-r from-landing-accent to-orange-400 rounded w-24 mb-1"></div>
                          <div className="h-1 bg-gray-100 rounded w-20"></div>
                        </div>
                        <div className="text-xs text-landing-accent font-medium">
                          ⏳ In progress
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.9 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3 bg-white p-3 rounded-lg shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs font-bold">SM</span>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gradient-to-r from-green-500 to-green-400 rounded w-16 mb-1"></div>
                          <div className="h-1 bg-gray-100 rounded w-12"></div>
                        </div>
                        <div className="text-xs text-green-600 font-medium">
                          📝 Review
                        </div>
                      </motion.div>
                    </div>

                    {/* Enhanced Progress Bar */}
                    <div className="mt-4">
                      <div className="flex justify-between text-xs text-gray-500 mb-2">
                        <span className="font-medium">Overall Progress</span>
                        <motion.span
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 0.5, delay: 1.2 }}
                          viewport={{ once: true }}
                          className="font-bold text-landing-primary"
                        >
                          78%
                        </motion.span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "78%" }}
                          transition={{ duration: 1.5, delay: 1 }}
                          viewport={{ once: true }}
                          className="bg-gradient-to-r from-landing-primary via-blue-500 to-landing-secondary h-3 rounded-full relative"
                        >
                          <motion.div
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                          ></motion.div>
                        </motion.div>
                      </div>
                    </div>

                    {/* Success Indicators */}
                    <div className="absolute top-2 right-2 flex gap-1">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-green-400 rounded-full opacity-60"
                      ></motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                        className="w-2 h-2 bg-blue-400 rounded-full opacity-60"
                      ></motion.div>
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="w-2 h-2 bg-purple-400 rounded-full opacity-60"
                      ></motion.div>
                    </div>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-4">
                  {[
                    "Smooth onboarding with templates & auto-reminders",
                    "Centralized dashboard for interns & mentors",
                    "Clear task allocation & submission flow",
                    "Real-time progress tracking & feedback",
                    "Organized documentation & growth reports",
                  ].map((benefit, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-landing-secondary rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700 text-sm">{benefit}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider with Arrow */}
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <div className="bg-landing-primary text-white px-6 py-3 rounded-full flex items-center gap-2 shadow-lg">
              <span className="text-sm font-medium">
                Transform Your Process
              </span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features */}
      <section className="relative bg-gradient-to-b from-landing-background to-gray-100 overflow-hidden">
        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[var(--landing-text)] mb-6">
              Designed to Support Every Step of the Internship
            </h2>
            <p className="text-xl text-landing-secondary max-w-4xl mx-auto">
              From onboarding to final review, we've engineered features that
              make internships effective, engaging, and easy to manage — for
              interns, mentors, and teams alike.
            </p>
          </motion.div>
        </div>

        {/* Feature Cards Stack */}
        <div className="space-y-8 pb-20">
          {/* Feature 1: Smart Onboarding Workflows */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto px-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--landing-text)] mb-4">
                    Smart Onboarding Workflows
                  </h3>
                  <p className="text-landing-secondary text-lg mb-6">
                    Automate welcome kits, timelines & role-based docs
                  </p>
                  <p className="text-[var(--landing-text)] opacity-80">
                    Build an intern's first-day experience once and reuse it
                    every time. Auto-assign tasks, resources, and walkthroughs
                    so interns feel at home — and teams save hours.
                  </p>
                </div>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                      alt="Team onboarding meeting"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2: Structured Task & Project Flow */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto px-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="lg:order-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--landing-text)] mb-4">
                    Structured Task & Project Flow
                  </h3>
                  <p className="text-landing-secondary text-lg mb-6">
                    Assign tasks, link deadlines, track deliverables
                  </p>
                  <p className="text-[var(--landing-text)] opacity-80">
                    Assign, organize, and monitor intern tasks with Kanban-style
                    views or sprint modes. Tag mentors, set milestones, and keep
                    everything in one place.
                  </p>
                </div>
                <div className="lg:order-1 relative">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                      alt="Project management dashboard"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 3: Progress Insights & Feedback */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto px-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--landing-text)] mb-4">
                    Progress Insights & Feedback
                  </h3>
                  <p className="text-landing-secondary text-lg mb-6">
                    Visual performance graphs & regular feedback loop
                  </p>
                  <p className="text-[var(--landing-text)] opacity-80">
                    Get real-time clarity on progress — see what interns are
                    working on, where they're stuck, and how they're growing.
                    Regular feedback prompts ensure no one's left guessing.
                  </p>
                </div>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                      alt="Analytics dashboard with charts"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 4: Mentor Dashboards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto px-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="lg:order-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--landing-text)] mb-4">
                    Mentor Dashboards
                  </h3>
                  <p className="text-landing-secondary text-lg mb-6">
                    Manage mentees, track touchpoints, and assist
                  </p>
                  <p className="text-[var(--landing-text)] opacity-80">
                    Mentors can see their assigned interns, recent updates,
                    pending check-ins, and performance stats — all in one
                    minimal dashboard that reduces their overhead.
                  </p>
                </div>
                <div className="lg:order-1 relative">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                      alt="Mentor meeting with team"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 5: Central Resource Hub */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto px-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--landing-text)] mb-4">
                    Central Resource Hub
                  </h3>
                  <p className="text-landing-secondary text-lg mb-6">
                    Docs, links, videos, templates – all organized
                  </p>
                  <p className="text-[var(--landing-text)] opacity-80">
                    No more lost links in Slack. Every document, repo, or guide
                    has a home. Interns can search, favorite, and revisit them
                    easily throughout the program.
                  </p>
                </div>
                <div className="relative">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                      alt="Digital library and resources"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 6: Completion & Evaluation Engine */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-6xl mx-auto px-6"
          >
            <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 border border-gray-200 hover:shadow-2xl transition-shadow duration-500">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="lg:order-2">
                  <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-[var(--landing-text)] mb-4">
                    Completion & Evaluation Engine
                  </h3>
                  <p className="text-landing-secondary text-lg mb-6">
                    Auto-generated reports, feedback forms & review templates
                  </p>
                  <p className="text-[var(--landing-text)] opacity-80">
                    Close the loop with structured final reviews. Collect
                    feedback from both sides, auto-generate completion
                    certificates, and export performance reports in one click.
                  </p>
                </div>
                <div className="lg:order-1 relative">
                  <div className="rounded-xl overflow-hidden shadow-lg">
                    <img
                      src="https://images.unsplash.com/photo-1434626881859-194d67b2b86f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80"
                      alt="Certificate and evaluation documents"
                      className="w-full h-64 object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intern Journey Timeline */}
      <section
        id="journey"
        className="relative bg-gradient-to-br from-gray-50 to-white overflow-hidden"
      >
        {/* Section Header */}
        <div className="max-w-6xl mx-auto px-6 pt-20 pb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-[var(--landing-text)] mb-6">
              A Guided Internship Experience – From Day One to Day Done
            </h2>
            <p className="text-xl text-landing-secondary max-w-4xl mx-auto">
              Interns thrive when they know what to expect. Here's how your team
              can create clarity, consistency, and confidence every step of the
              way.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Scroll Timeline Container */}
        <div ref={containerRef} className="relative overflow-hidden">
          {/* Horizontal Timeline */}
          <div ref={timelineRef} className="flex" style={{ height: "100vh" }}>
            {/* Stage 1: Welcome & Onboarding */}
            <div className="timeline-stage min-w-screen h-screen flex items-center justify-center px-12 relative bg-white">
              <div className="absolute top-1/2 left-12 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform -translate-y-1/2 z-20">
                1
              </div>

              <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                  </div>

                  <h3 className="text-5xl font-bold text-[var(--landing-text)] mb-6">
                    Welcome & Onboarding
                  </h3>

                  <p className="text-xl text-landing-secondary mb-8">
                    Automate welcome kits, timelines & role-based docs
                  </p>

                  <p className="text-lg text-[var(--landing-text)] opacity-80 leading-relaxed mb-8">
                    Set the tone with a structured welcome. Auto-assign
                    documents, videos, and first tasks with role-based
                    workflows.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-lg text-gray-600 font-medium">
                      Day 1-2
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200">
                    <div className="space-y-8">
                      <div className="flex items-center gap-6">
                        <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                        <span className="text-xl">Welcome kit auto-sent ✓</span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                        <span className="text-xl">
                          Role documents assigned ✓
                        </span>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                        <span className="text-xl">Timeline created ✓</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 2: First Tasks & Orientation */}
            <div className="timeline-stage min-w-screen h-screen flex items-center justify-center px-12 relative bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="absolute top-1/2 left-12 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform -translate-y-1/2 z-20">
                2
              </div>

              <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 6h6m-6 4h6" />
                    </svg>
                  </div>

                  <h3 className="text-5xl font-bold text-[var(--landing-text)] mb-6">
                    First Tasks & Orientation
                  </h3>

                  <p className="text-xl text-landing-secondary mb-8">
                    Assign small wins and exploratory tasks
                  </p>

                  <p className="text-lg text-[var(--landing-text)] opacity-80 leading-relaxed mb-8">
                    Assign small wins and exploratory tasks. Get interns
                    familiar with tools, teams, and basic workflows without
                    pressure.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-lg text-gray-600 font-medium">
                      Week 1
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200">
                    <div className="space-y-6">
                      <div className="text-lg font-medium text-[var(--landing-text)] mb-6">
                        Task Board
                      </div>
                      <div className="bg-gray-100 rounded-xl p-6">
                        <div className="text-lg font-medium">
                          Exploration Tasks
                        </div>
                        <div className="text-sm opacity-80 mt-2">
                          3 small wins assigned
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-xl p-6">
                        <div className="text-lg font-medium">
                          Team Introductions
                        </div>
                        <div className="text-sm opacity-80 mt-2">
                          Meeting scheduled
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 3: Learning in Motion */}
            <div className="timeline-stage min-w-screen h-screen flex items-center justify-center px-12 relative bg-gradient-to-br from-green-50 to-green-100">
              <div className="absolute top-1/2 left-12 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform -translate-y-1/2 z-20">
                3
              </div>

              <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>

                  <h3 className="text-5xl font-bold text-[var(--landing-text)] mb-6">
                    Learning in Motion
                  </h3>

                  <p className="text-xl text-landing-secondary mb-8">
                    Track progress, log blockers, receive feedback
                  </p>

                  <p className="text-lg text-[var(--landing-text)] opacity-80 leading-relaxed mb-8">
                    Interns begin meaningful work. They track progress, log
                    blockers, and receive feedback as they go — all inside one
                    dashboard.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-lg text-gray-600 font-medium">
                      Week 2-4
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200">
                    <div className="space-y-6">
                      <div className="text-lg font-medium text-[var(--landing-text)] mb-6">
                        Progress Dashboard
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-lg">
                          <span>Project Progress</span>
                          <span>68%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-4">
                          <div
                            className="bg-gray-500 h-4 rounded-full"
                            style={{ width: "68%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-xl p-6 text-lg">
                        Latest feedback: "Great progress on the API
                        integration!"
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 4: Mid-Point Review */}
            <div className="timeline-stage min-w-screen h-screen flex items-center justify-center px-12 relative bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="absolute top-1/2 left-12 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform -translate-y-1/2 z-20">
                4
              </div>

              <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>

                  <h3 className="text-5xl font-bold text-[var(--landing-text)] mb-6">
                    Mid-Point Review
                  </h3>

                  <p className="text-xl text-landing-secondary mb-8">
                    Check-in, feedback, and goal adjustments
                  </p>

                  <p className="text-lg text-[var(--landing-text)] opacity-80 leading-relaxed mb-8">
                    The platform prompts a check-in — mentors give feedback,
                    interns reflect, and goals are reset or adjusted for the
                    second half.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-lg text-gray-600 font-medium">
                      Mid-point
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200">
                    <div className="space-y-6">
                      <div className="text-lg font-medium text-[var(--landing-text)] mb-6">
                        Review Session
                      </div>
                      <div className="bg-gray-100 rounded-xl p-6">
                        <div className="text-lg font-medium">
                          Mentor Feedback
                        </div>
                        <div className="text-sm opacity-80 mt-2">
                          4.2/5.0 rating
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-xl p-6">
                        <div className="text-lg font-medium">
                          Goal Adjustment
                        </div>
                        <div className="text-sm opacity-80 mt-2">
                          3 new objectives set
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 5: Final Deliverables */}
            <div className="timeline-stage min-w-screen h-screen flex items-center justify-center px-12 relative bg-gradient-to-br from-indigo-50 to-indigo-100">
              <div className="absolute top-1/2 left-12 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform -translate-y-1/2 z-20">
                5
              </div>

              <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>

                  <h3 className="text-5xl font-bold text-[var(--landing-text)] mb-6">
                    Final Deliverables
                  </h3>

                  <p className="text-xl text-landing-secondary mb-8">
                    Project completion and mentor assistance
                  </p>

                  <p className="text-lg text-[var(--landing-text)] opacity-80 leading-relaxed mb-8">
                    Interns wrap up their major task/project. Progress is
                    tracked visually and mentors can assist if anything stalls.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-lg text-gray-600 font-medium">
                      Final weeks
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200">
                    <div className="space-y-6">
                      <div className="text-lg font-medium text-[var(--landing-text)] mb-6">
                        Project Status
                      </div>
                      <div className="bg-gray-100 rounded-xl p-6">
                        <div className="text-lg font-medium">Final Project</div>
                        <div className="text-sm opacity-80 mt-2">
                          95% complete
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-xl p-6">
                        <div className="text-lg font-medium">Code Review</div>
                        <div className="text-sm opacity-80 mt-2">
                          Approved by mentor
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stage 6: Review & Recognition */}
            <div className="timeline-stage min-w-screen h-screen flex items-center justify-center px-12 relative bg-gradient-to-br from-gray-50 to-gray-100">
              <div className="absolute top-1/2 left-12 w-16 h-16 bg-black rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg transform -translate-y-1/2 z-20">
                6
              </div>

              <div className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
                <div className="text-center lg:text-left">
                  <div className="w-20 h-20 bg-gray-100 rounded-xl flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                  </div>

                  <h3 className="text-5xl font-bold text-[var(--landing-text)] mb-6">
                    Review & Recognition
                  </h3>

                  <p className="text-xl text-landing-secondary mb-8">
                    Completion reports and certificates
                  </p>

                  <p className="text-lg text-[var(--landing-text)] opacity-80 leading-relaxed mb-8">
                    Auto-generate a summary report, mentor feedback, and issue a
                    personalized certificate — all backed by platform insights.
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    <span className="text-lg text-gray-600 font-medium">
                      Completion
                    </span>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-3xl p-10 shadow-2xl border border-gray-200">
                    <div className="space-y-6">
                      <div className="text-lg font-medium text-[var(--landing-text)] mb-6">
                        Completion Dashboard
                      </div>
                      <div className="bg-gray-100 rounded-xl p-6">
                        <div className="text-lg font-medium">
                          Final Review: 4.8/5.0
                        </div>
                        <div className="text-sm opacity-80 mt-2">
                          All milestones completed
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-xl p-6">
                        <div className="text-lg font-medium">Certificate Generated</div>
                        <div className="text-sm opacity-80 mt-2">
                          Ready for download
                        </div>
                      </div>
                      <div className="bg-gray-100 rounded-xl p-6">
                        <div className="text-lg font-medium">Performance Report</div>
                        <div className="text-sm opacity-80 mt-2">
                          Exported to PDF
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center z-30">
            <div className="text-sm text-landing-secondary mb-2">
              Scroll down to navigate timeline
            </div>

            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-2xl"
            >
              ↓
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mentor Experience Demo */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-1/4 right-1/3 w-96 h-96 opacity-5"
          >
            <div className="w-full h-full border border-landing-primary rounded-full"></div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-6xl font-bold text-[var(--landing-text)] mb-6">
                Give Mentors Superpowers,
                <br />
                <span className="text-landing-primary">Without the Stress</span>
              </h2>
              <p className="text-xl text-landing-secondary max-w-4xl mx-auto leading-relaxed">
                Your platform isn't just intern-focused — it equips mentors to guide, 
                track, and support without extra meetings or micro-management.
              </p>
            </motion.div>
          </div>

          {/* Main Demo Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Side - Simplified Features */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-[var(--landing-text)] mb-8">
                  Everything mentors need in one place
                </h3>
                
                <div className="space-y-6">
                  {[
                    {
                      title: "Visual Progress Tracking",
                      desc: "See who's thriving, who's blocked, and who needs attention at a glance."
                    },
                    {
                      title: "Instant Feedback Tools", 
                      desc: "Respond to intern updates, approve work, and give feedback in one click."
                    },
                    {
                      title: "Smart Notifications",
                      desc: "Get notified about deadlines, submissions, and requests automatically."
                    },
                    {
                      title: "Centralized Information",
                      desc: "Access resumes, check-ins, work logs, and performance data instantly."
                    },
                    {
                      title: "One-Click Reports",
                      desc: "Auto-generate performance summaries and completion certificates."
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-2 h-2 bg-landing-primary rounded-full mt-3 group-hover:scale-150 transition-transform duration-300"></div>
                      <div>
                        <h4 className="font-semibold text-[var(--landing-text)] mb-2 group-hover:text-landing-primary transition-colors">
                          {feature.title}
                        </h4>
                        <p className="text-landing-secondary leading-relaxed">
                          {feature.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200"
              >
                <h4 className="font-semibold text-[var(--landing-text)] mb-4">
                  Mentor Impact
                </h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-landing-primary">5+</div>
                    <div className="text-sm text-landing-secondary">Hours saved/week</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-landing-primary">92%</div>
                    <div className="text-sm text-landing-secondary">Completion rate</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-landing-primary">4.8</div>
                    <div className="text-sm text-landing-secondary">Mentor rating</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Dashboard Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative lg:col-span-1"
            >
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden w-full">
                <img
                  src="/dash.png"
                  alt="Mentor Dashboard Interface"
                  className="w-full h-auto object-cover"
                />
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 20px 40px rgba(74, 144, 226, 0.3)" 
              }}
              whileTap={{ scale: 0.95 }}
              className="bg-landing-primary text-white px-12 py-4 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              <span className="flex items-center gap-3">
                Try the Mentor Dashboard
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </span>
            </motion.button>
            <p className="text-sm text-landing-secondary mt-4">
              See how mentors save 5+ hours per week with our platform
            </p>
          </motion.div>
        </div>
      </section>

      {/* Testimonials - The Dialogue Wall */}
      <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Quotation Marks */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-10 text-9xl text-landing-primary opacity-5 select-none"
          >
            ❝
          </motion.div>
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-32 right-16 text-7xl text-landing-accent opacity-5 select-none"
          >
            ❞
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[var(--landing-text)] mb-6">
                Trusted by Fast-Moving Teams
              </h2>
              <p className="text-xl text-landing-secondary max-w-4xl mx-auto leading-relaxed">
                Real stories from mentors, founders, and interns who streamlined 
                their internship experience with our platform.
              </p>
            </motion.div>
          </div>

          {/* Testimonial Grid - Staggered Layout */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {/* Column 1 */}
            <div className="space-y-8">
              {/* Card 1 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
                }}
                className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all duration-400 relative overflow-hidden group"
                style={{ 
                  background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)"
                }}
              >
                {/* Background Quote Mark */}
                <div className="absolute -top-4 -right-4 text-6xl text-landing-primary/10 group-hover:text-landing-primary/20 transition-colors duration-400">
                  ❝
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    AM
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--landing-text)]">
                      Anita Mehta
                      <span className="inline-block w-8 h-0.5 bg-landing-primary ml-2"></span>
                    </h4>
                    <p className="text-sm text-landing-secondary">CTO @ FlowState</p>
                  </div>
                </div>
                
                <blockquote className="text-[var(--landing-text)] italic leading-relaxed">
                  "Finally, no more scattered spreadsheets. Our interns are onboarded 
                  seamlessly and stay engaged throughout."
                </blockquote>
              </motion.div>

              {/* Card 2 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
                }}
                className="bg-gradient-to-br from-purple-50/80 to-purple-100/60 backdrop-blur-sm rounded-2xl p-6 border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-400 relative overflow-hidden group"
                style={{ marginTop: "2rem" }}
              >
                <div className="absolute -top-4 -right-4 text-6xl text-purple-400/20 group-hover:text-purple-400/30 transition-colors duration-400">
                  ❞
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    RK
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--landing-text)]">
                      Rohit Kumar
                      <span className="inline-block w-8 h-0.5 bg-purple-500 ml-2"></span>
                    </h4>
                    <p className="text-sm text-landing-secondary">Engineering Manager @ TechFlow</p>
                  </div>
                </div>
                
                <blockquote className="text-[var(--landing-text)] italic leading-relaxed">
                  "The progress tracking alone saves me 4+ hours per week. 
                  I can actually mentor instead of just managing."
                </blockquote>
              </motion.div>
            </div>

            {/* Column 2 - Featured Testimonial */}
            <div className="lg:mt-8">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -12, 
                  scale: 1.02,
                  boxShadow: "0 30px 60px rgba(0,0,0,0.15)" 
                }}
                className="bg-gradient-to-br from-[var(--landing-accent)]/25 to-landing-accent/5 backdrop-blur-xl rounded-3xl p-8 border border-landing-primary/20 shadow-2xl hover:shadow-3xl transition-all duration-500 relative overflow-hidden group"
              >
                {/* Featured Background Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/50 to-transparent"></div>
                <div className="absolute -top-8 -left-8 text-8xl text-landing-primary/10 group-hover:text-landing-primary/20 transition-colors duration-500">
                  ❝
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-[var(--landing-primary)] to-landing-accent rounded-full flex items-center justify-center text-black font-bold text-lg">
                      TS
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-[var(--landing-text)]">
                        Tanaya Shah
                        <span className="inline-block w-12 h-0.5 bg-landing-primary ml-3"></span>
                      </h4>
                      <p className="text-landing-secondary">Growth Lead @ ArkaTech</p>
                    </div>
                  </div>
                  
                  <motion.blockquote 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-xl text-[var(--landing-text)] italic leading-relaxed font-medium mb-4"
                  >
                    "I used to onboard interns in Notion. This is 5x smoother, 
                    and they actually complete their projects on time now."
                  </motion.blockquote>
                  
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.7 + (i * 0.1) }}
                        viewport={{ once: true }}
                        className="text-yellow-400 text-lg"
                      >
                        ⭐
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Column 3 */}
            <div className="space-y-8">
              {/* Card 3 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
                }}
                className="bg-gradient-to-br from-green-50/80 to-green-100/60 backdrop-blur-sm rounded-2xl p-6 border border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-400 relative overflow-hidden group"
                style={{ marginTop: "1.5rem" }}
              >
                <div className="absolute -top-4 -right-4 text-6xl text-green-400/20 group-hover:text-green-400/30 transition-colors duration-400">
                  ❝
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    PS
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--landing-text)]">
                      Priya Singh
                      <span className="inline-block w-8 h-0.5 bg-green-500 ml-2"></span>
                    </h4>
                    <p className="text-sm text-landing-secondary">Product Manager @ GrowthLab</p>
                  </div>
                </div>
                
                <blockquote className="text-[var(--landing-text)] italic leading-relaxed">
                  "Our intern feedback process went from chaotic to structured. 
                  Everyone knows what's expected and when."
                </blockquote>
              </motion.div>

              {/* Card 4 */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 40px rgba(0,0,0,0.1)" 
                }}
                className="bg-gradient-to-br from-orange-50/80 to-orange-100/60 backdrop-blur-sm rounded-2xl p-6 border border-orange-200/50 shadow-lg hover:shadow-xl transition-all duration-400 relative overflow-hidden group"
              >
                <div className="absolute -top-4 -right-4 text-6xl text-orange-400/20 group-hover:text-orange-400/30 transition-colors duration-400">
                  ❞
                </div>
                
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    DC
                  </div>
                  <div>
                    <h4 className="font-semibold text-[var(--landing-text)]">
                      David Chen
                      <span className="inline-block w-8 h-0.5 bg-orange-500 ml-2"></span>
                    </h4>
                    <p className="text-sm text-landing-secondary">Founder @ StartupForge</p>
                  </div>
                </div>
                
                <blockquote className="text-[var(--landing-text)] italic leading-relaxed">
                  "As a small team, we needed something that scaled with us. 
                  This platform grows as our intern program grows."
                </blockquote>
              </motion.div>
            </div>
          </div>

          {/* Additional Testimonials Row */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)" 
              }}
              className="bg-gradient-to-br from-indigo-50/80 to-indigo-100/60 backdrop-blur-sm rounded-2xl p-6 border border-indigo-200/50 shadow-lg hover:shadow-xl transition-all duration-400 relative overflow-hidden group"
            >
              <div className="absolute -top-4 -right-4 text-6xl text-indigo-400/20 group-hover:text-indigo-400/30 transition-colors duration-400">
                ❝
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-400 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  SK
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--landing-text)]">
                    Sarah Kim
                    <span className="inline-block w-8 h-0.5 bg-indigo-500 ml-2"></span>
                  </h4>
                  <p className="text-sm text-landing-secondary">VP Engineering @ ScaleWorks</p>
                </div>
              </div>
              
              <blockquote className="text-[var(--landing-text)] italic leading-relaxed">
                "The automated check-ins and progress reports give me peace of mind. 
                I know exactly how each intern is progressing."
              </blockquote>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 15px 30px rgba(0,0,0,0.1)" 
              }}
              className="bg-gradient-to-br from-pink-50/80 to-pink-100/60 backdrop-blur-sm rounded-2xl p-6 border border-pink-200/50 shadow-lg hover:shadow-xl transition-all duration-400 relative overflow-hidden group"
            >
              <div className="absolute -top-4 -right-4 text-6xl text-pink-400/20 group-hover:text-pink-400/30 transition-colors duration-400">
                ❞
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  MJ
                </div>
                <div>
                  <h4 className="font-semibold text-[var(--landing-text)]">
                    Maya Joshi
                    <span className="inline-block w-8 h-0.5 bg-pink-500 ml-2"></span>
                  </h4>
                  <p className="text-sm text-landing-secondary">Tech Lead @ InnovateHub</p>
                </div>
              </div>
              
              <blockquote className="text-[var(--landing-text)] italic leading-relaxed">
                "From day one onboarding to final presentations, everything flows smoothly. 
                Our interns love the clarity and structure."
              </blockquote>
            </motion.div>
          </div>

          {/* Company Logos Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-landing-secondary font-medium mb-8">
              Used by teams at
            </p>
            
            <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-80 transition-opacity duration-300">
              {[
                "FlowState", "TechFlow", "ArkaTech", "GrowthLab", "StartupForge", 
                "ScaleWorks", "InnovateHub", "CodeCraft", "BuildNext", "DevCore"
              ].map((company, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + (index * 0.1) }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1, 
                    opacity: 1,
                    color: "var(--landing-primary)" 
                  }}
                  className="text-lg font-semibold text-[var(--landing-text)]/50 hover:text-landing-primary transition-all duration-300 cursor-pointer"
                >
                  {company}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans - Split-Board Columns */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Workspace Grid Background */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-12 h-full">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="border-r border-landing-text/10"></div>
              ))}
            </div>
          </div>
          
          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 right-20 w-32 h-32 bg-landing-primary/5 rounded-2xl"
          ></motion.div>
          
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute bottom-32 left-16 w-24 h-24 bg-landing-accent/5 rounded-full"
          ></motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-[var(--landing-text)] mb-6">
                Simple, Transparent Pricing
              </h2>
              <p className="text-xl text-landing-secondary max-w-4xl mx-auto leading-relaxed">
                Start free, scale as you grow. No hidden fees, no per-seat surprises. 
                Built for teams that value clarity over complexity.
              </p>
            </motion.div>
          </div>

          {/* Billing Toggle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center mb-12"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-2 border border-gray-200/50 shadow-lg">
              <div className="flex items-center gap-4">
                <button className="px-6 py-3 bg-landing-primary text-white rounded-xl font-medium transition-all duration-300">
                  Monthly
                </button>
                <button className="px-6 py-3 text-[var(--landing-text)] hover:bg-gray-100/50 rounded-xl font-medium transition-all duration-300">
                  Yearly
                  <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    Save 20%
                  </span>
                </button>
              </div>
            </div>
          </motion.div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            
            {/* Starter Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12, 
                rotateX: 5,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)" 
              }}
              className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group flex flex-col justify-between"
              style={{
                background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)"
              }}
            >
              {/* Card Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                  🚀 Perfect to Start
                </div>
                <h3 className="text-2xl font-bold text-[var(--landing-text)] mb-2">Starter</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-[var(--landing-text)]">₹0</span>
                  <span className="text-landing-secondary ml-2">/ forever</span>
                </div>
                <p className="text-landing-secondary">Solo founders, 1-2 interns</p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  "Basic onboarding workflow",
                  "Up to 2 active interns",
                  "Essential progress tracking",
                  "Email notifications",
                  "Basic templates"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 text-xs">✓</span>
                    </div>
                    <span className="text-[var(--landing-text)]">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gray-800 text-white py-4 rounded-2xl font-semibold hover:bg-gray-900 transition-all duration-300 shadow-lg"
              >
                Get Started Free
              </motion.button>

              <p className="text-xs text-landing-secondary text-center mt-4">
                No credit card required
              </p>
            </motion.div>

            {/* Team Plan - Popular */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -16, 
                rotateX: 5,
                boxShadow: "0 30px 60px rgba(165, 88, 243, 0.2)" 
              }}
              className="bg-gradient-to-br flex flex-col justify-between from-landing-primary/5 to-landing-accent/5 backdrop-blur-xl rounded-3xl p-8 border-2 border-landing-primary/30 shadow-2xl hover:shadow-3xl transition-all duration-500 relative group transform scale-105"
            >
              {/* Popular Badge */}
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="bg-gradient-to-r from-[var(--landing-primary)] to-[var(--landing-accent)] text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg"
                >
                  🔥 Most Popular
                </motion.div>
              </div>

              {/* Card Header */}
              <div className="text-center mb-8 mt-4">
                <h3 className="text-2xl font-bold text-[var(--landing-text)] mb-2">Team</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-landing-primary">₹899</span>
                  <span className="text-landing-secondary ml-2">/ month</span>
                </div>
                <p className="text-landing-secondary">Startups with 3–10 interns</p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  "Advanced onboarding workflows",
                  "Up to 10 active interns",
                  "Full mentor dashboard",
                  "Automated feedback cycles",
                  "Custom task templates",
                  "Progress analytics",
                  "Slack integration",
                  "Priority support"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 bg-landing-primary/20 rounded-full flex items-center justify-center">
                      <span className="text-landing-primary text-xs">✓</span>
                    </div>
                    <span className="text-[var(--landing-text)]">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 10px 30px rgba(165, 88, 243, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-[var(--landing-primary)] to-[var(--landing-accent)] text-white py-4 rounded-2xl font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                Start 14-Day Trial
              </motion.button>

              <p className="text-xs text-landing-secondary text-center mt-4">
                Then ₹899/month • Cancel anytime
              </p>
            </motion.div>

            {/* Scale Plan */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ 
                y: -12, 
                rotateX: 5,
                boxShadow: "0 25px 50px rgba(0,0,0,0.15)" 
              }}
              className="bg-gradient-to-br from-gray-900/5 to-gray-800/5 backdrop-blur-lg rounded-3xl p-8 flex flex-col justify-between border border-gray-300/50 shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
            >
              {/* Card Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                  ⚡ Enterprise Ready
                </div>
                <h3 className="text-2xl font-bold text-[var(--landing-text)] mb-2">Scale</h3>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-[var(--landing-text)]">Custom Quote</span>
                </div>
                <p className="text-landing-secondary">Large teams, bootcamps, orgs</p>
              </div>

              {/* Features List */}
              <div className="space-y-4 mb-8">
                {[
                  "Unlimited interns & mentors",
                  "Custom onboarding flows",
                  "Advanced analytics & reporting",
                  "API access & integrations",
                  "White-label options",
                  "Dedicated success manager",
                  "Custom training sessions",
                  "99.9% SLA guarantee"
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 + (index * 0.1) }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 text-xs">✓</span>
                    </div>
                    <span className="text-[var(--landing-text)]">{feature}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full border-2 border-gray-800 text-gray-800 py-4 rounded-2xl font-semibold hover:bg-gray-800 hover:text-white transition-all duration-300"
              >
                Book a Demo
              </motion.button>

              <p className="text-xs text-landing-secondary text-center mt-4">
                Custom pricing based on your needs
              </p>
            </motion.div>
          </div>

          {/* Feature Comparison Quick View */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 shadow-lg"
          >
            <h3 className="text-xl font-semibold text-[var(--landing-text)] mb-6 text-center">
              Feature Comparison
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-4 px-4 font-medium text-[var(--landing-text)]">Feature</th>
                    <th className="text-center py-4 px-4 font-medium text-[var(--landing-text)]">Starter</th>
                    <th className="text-center py-4 px-4 font-medium text-landing-primary">Team</th>
                    <th className="text-center py-4 px-4 font-medium text-[var(--landing-text)]">Scale</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { feature: "Onboarding Workflows", starter: true, team: true, scale: true },
                    { feature: "Mentor Dashboard", starter: false, team: true, scale: true },
                    { feature: "Automated Feedback", starter: false, team: true, scale: true },
                    { feature: "Custom Integrations", starter: false, team: false, scale: true },
                    { feature: "API Access", starter: false, team: false, scale: true }
                  ].map((row, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                      viewport={{ once: true }}
                      className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors duration-200"
                    >
                      <td className="py-4 px-4 text-[var(--landing-text)]">{row.feature}</td>
                      <td className="py-4 px-4 text-center">
                        {row.starter ? (
                          <span className="text-green-600 text-lg">✓</span>
                        ) : (
                          <span className="text-gray-300 text-lg">✗</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.team ? (
                          <span className="text-landing-primary text-lg">✓</span>
                        ) : (
                          <span className="text-gray-300 text-lg">✗</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-center">
                        {row.scale ? (
                          <span className="text-gray-700 text-lg">✓</span>
                        ) : (
                          <span className="text-gray-300 text-lg">✗</span>
                        )}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <h3 className="text-2xl font-semibold text-[var(--landing-text)] mb-8">
              Frequently Asked Questions
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                {
                  question: "What counts as an 'active intern'?",
                  answer: "An intern who has logged in or been assigned tasks in the current billing period."
                },
                {
                  question: "Can I change plans anytime?",
                  answer: "Yes! Upgrade or downgrade your plan at any time. Changes take effect immediately."
                },
                {
                  question: "Is there a setup fee?",
                  answer: "No setup fees, ever. Start with our free plan and upgrade when you're ready."
                },
                {
                  question: "Do you offer refunds?",
                  answer: "Yes, we offer a 30-day money-back guarantee for all paid plans."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1 + (index * 0.1) }}
                  viewport={{ once: true }}
                  className="bg-white/60 backdrop-blur-sm rounded-xl p-6 text-left border border-gray-200/50 hover:shadow-lg transition-all duration-300"
                >
                  <h4 className="font-semibold text-[var(--landing-text)] mb-2">{faq.question}</h4>
                  <p className="text-landing-secondary text-sm">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Call-to-Action */}
      <section className="relative py-32 bg-gradient-to-br from-[var(--landing-background)] via-white to-gray-100 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Slow Zoom Background Texture */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 2, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute inset-0 opacity-5"
          >
            <div className="w-full h-full bg-gradient-to-br from-[var(--landing-primary)]/10 via-transparent to-[var(--landing-secondary)]/10"></div>
          </motion.div>
          
          {/* Floating Geometric Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/4 left-1/4 w-32 h-32 bg-[var(--landing-primary)]/5 rounded-2xl"
          ></motion.div>
          
          <motion.div
            animate={{
              y: [0, 15, 0],
              rotate: [0, -3, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
            className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-[var(--landing-secondary)]/5 rounded-full"
          ></motion.div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          {/* Floating Glass-Style Card */}
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-12 lg:p-16 border border-white/30 shadow-2xl relative overflow-hidden">
              {/* Glass Card Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-[var(--landing-primary)]/5 rounded-3xl"></div>
              
              {/* Content */}
              <div className="relative z-10 text-center">
                {/* Headline */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-4xl lg:text-6xl font-bold text-[var(--landing-text)] mb-6 leading-tight">
                    Internships shouldn't be chaotic.
                    <br />
                    <span className="text-[var(--landing-primary)] bg-gradient-to-r from-[var(--landing-accent)] to-[var(--landing-accent)]/60 bg-clip-text text-transparent">
                      Build clarity, structure, and growth
                    </span>
                    <br />
                    — from Day 1.
                  </h2>
                </motion.div>

                {/* Subheadline */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="mb-12"
                >
                  <p className="text-xl lg:text-2xl text-[var(--landing-secondary)] max-w-4xl mx-auto leading-relaxed">
                    Designed for founders, mentors, and fast-moving teams.
                    <br />
                    Start managing your interns the smart way.
                  </p>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                >
                  {/* Primary CTA */}
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 20px 40px rgba(28, 28, 30, 0.3)" 
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative bg-gradient-to-r from-[var(--landing-primary)] to-[var(--landing-secondary)] text-white px-12 py-5 rounded-2xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Ripple Effect */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0.5 }}
                      whileHover={{ scale: 1, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="absolute inset-0 bg-white rounded-2xl"
                    ></motion.div>
                    
                    <span className="relative flex items-center gap-3">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Get Started – It's Free
                      <motion.span
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        →
                      </motion.span>
                    </span>
                  </motion.button>

                  {/* Secondary CTA */}
                  <motion.button
                    whileHover={{ 
                      scale: 1.05,
                      backgroundColor: "rgba(28, 28, 30, 0.05)"
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="group border-2 border-[var(--landing-accent)] text-[var(--landing-text)] px-10 py-5 rounded-2xl text-lg font-semibold hover:bg-[var(--landing-accent)] hover:text-black transition-all duration-300"
                  >
                    <span className="flex items-center gap-3">
                      <motion.div
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-5 h-5 bg-[var(--landing-primary)] rounded-full flex items-center justify-center"
                      >
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l8-5-8-5z" />
                        </svg>
                      </motion.div>
                      Watch a Demo
                    </span>
                  </motion.button>
                </motion.div>

                {/* Trust Indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                  className="mt-12 pt-8 border-t border-gray-200/50"
                >
                  <p className="text-sm text-[var(--landing-secondary)] mb-4">
                    Trusted by 200+ teams • No credit card required • Setup in under 5 minutes
                  </p>
                  
                  {/* Mini Feature Icons */}
                  <div className="flex justify-center items-center gap-8 opacity-60">
                    {[
                      { 
                        icon: (
                          <svg className="w-5 h-5 text-[var(--landing-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                          </svg>
                        ), 
                        label: "Secure" 
                      },
                      { 
                        icon: (
                          <svg className="w-5 h-5 text-[var(--landing-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        ), 
                        label: "Fast Setup" 
                      },
                      { 
                        icon: (
                          <svg className="w-5 h-5 text-[var(--landing-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ), 
                        label: "Results Driven" 
                      },
                      { 
                        icon: (
                          <svg className="w-5 h-5 text-[var(--landing-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                          </svg>
                        ), 
                        label: "Smart Automation" 
                      }
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 1 + (index * 0.1) }}
                        viewport={{ once: true }}
                        className="flex flex-col items-center gap-1"
                      >
                        <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                          {item.icon}
                        </div>
                        <span className="text-xs text-[var(--landing-secondary)]">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gradient-to-br from-gray-500 to-[var(--landing-accent)] border-t border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-12 gap-12 mb-12"
          >
            {/* Logo & Tagline */}
            <div className="lg:col-span-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-2xl font-bold text-[var(--landing-text)] mb-2">
                  Alverno
                </h3>
                <p className="text-white">
                  Built for intern teams. Designed for growth.
                </p>
              </motion.div>
              
              {/* Newsletter Signup */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h4 className="font-semibold text-[var(--landing-text)] mb-3">
                  Get intern management insights
                </h4>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 px-4 py-3 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-landing-primary/50 transition-all duration-300"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-landing-primary text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition-all duration-300"
                  >
                    Subscribe
                  </motion.button>
                </div>
                <p className="text-xs text-white mt-2">
                  Once a month. No spam. Unsubscribe anytime.
                </p>
              </motion.div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-[var(--landing-text)] mb-4">Product</h4>
                <ul className="space-y-3">
                  {[
                    "Features",
                    "Pricing",
                    "Demo",
                    "Integrations",
                    "API Docs"
                  ].map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a 
                        href="#" 
                        className="text-white hover:text-landing-primary transition-colors duration-300 group"
                      >
                        <span className="relative">
                          {link}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-landing-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Support */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-[var(--landing-text)] mb-4">Support</h4>
                <ul className="space-y-3">
                  {[
                    "Help Center",
                    "Blog",
                    "Community",
                    "Contact",
                    "Status"
                  ].map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a 
                        href="#" 
                        className="text-white hover:text-landing-primary transition-colors duration-300 group"
                      >
                        <span className="relative">
                          {link}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-landing-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Company */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-[var(--landing-text)] mb-4">Company</h4>
                <ul className="space-y-3">
                  {[
                    "About",
                    "Careers",
                    "Privacy",
                    "Terms",
                    "Security"
                  ].map((link, index) => (
                    <motion.li
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <a 
                        href="#" 
                        className="text-white hover:text-landing-primary transition-colors duration-300 group"
                      >
                        <span className="relative">
                          {link}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-landing-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Contact */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
              >
                <h4 className="font-semibold text-[var(--landing-text)] mb-4">Connect</h4>
                <div className="space-y-3 mb-4">
                  <a 
                    href="mailto:hello@internops.com" 
                    className="text-white hover:text-landing-primary transition-colors duration-300 block"
                  >
                    hello@alverno.com
                  </a>
                </div>
                
                {/* Social Icons */}
                <div className="flex gap-4">
                  {[
                    { icon: "𝕏", label: "Twitter" },
                    { icon: "in", label: "LinkedIn" },
                    { icon: "𝗚", label: "GitHub" }
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: 5,
                        backgroundColor: "var(--landing-primary)",
                        color: "white"
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 bg-white/70 backdrop-blur-sm border border-gray-200/50 rounded-xl flex items-center justify-center font-bold text-[var(--landing-text)] hover:shadow-lg transition-all duration-300"
                      aria-label={social.label}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            viewport={{ once: true }}
            className="pt-8 border-t border-gray-200/50 flex flex-col md:flex-row justify-between items-center gap-4"
          >
            <p className="text-sm text-white">
              © 2025 Alverno Platform. UI By Pratham Singh. All rights reserved.
            </p>
            
            <div className="flex items-center gap-6 text-sm text-landing-secondary">
              <motion.a 
                href="#"
                whileHover={{ color: "var(--landing-primary)" }}
                className="hover:underline text-white transition-colors duration-300"
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ color: "var(--landing-primary)" }}
                className="hover:underline text-white transition-colors duration-300"
              >
                Terms of Service
              </motion.a>
              <motion.a 
                href="#"
                whileHover={{ color: "var(--landing-primary)" }}
                className="hover:underline text-white transition-colors duration-300"
              >
                Cookie Policy
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default DailyUI003;
