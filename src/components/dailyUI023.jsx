import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrosoft, FaGithub, FaLock } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { IoArrowBackCircle, IoArrowForwardCircle } from "react-icons/io5";
import { CheckCircle2 } from "lucide-react";
import BackToHome from "./BackToHome";

const theme = {
  primary: "#1176B6 ",
  secondary: "#71DFE7 ",
  background: "#FFFFFF ",
  text: "#22313F ",
  accent: "#31A9B8 ",
  primaryLight: "#B9FFFC ",
  primaryDark: "#005175 ",
  secondaryLight: "#E9FBFC ",
  secondaryDark: "#489EA2 ",
};

const sectionShadow = "shadow-4xl";

const sectionVariants = {
  initial: {
    y: "100vh",
    scale: 1,
    opacity: 1,
    zIndex: 10,
  },
  animate: {
    y: 0,
    scale: 1,
    opacity: 1,
    zIndex: 10,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      ease: "easeOut",
    },
  },
  exit: {
    y: "100vh",
    scale: 1,
    opacity: 0.7,
    zIndex: 10,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      ease: "easeIn",
    },
  },
};

const stackedVariants = {
  stacked: {
    scale: 0.93,
    opacity: 0.7,
    y: -40,
    zIndex: 5,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 18,
      ease: "easeOut",
    },
  },
};

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hovered, setHovered] = useState(null);
  const [role, setRole] = useState("");
  const [roleOther, setRoleOther] = useState("");
  const [goal, setGoal] = useState("");
  const [goalOther, setGoalOther] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [teamSizeOther, setTeamSizeOther] = useState("");
  const steps = [1, 2, 3, 4];
  const [selected, setSelected] = useState(null);

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(4, prev + 1));
  };
  const handleBack = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  return (
    <main className="relative w-screen h-screen overflow-hidden">
      <BackToHome />
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 22,
          delay: 0.12,
        }}
        className="absolute top-1/2 -translate-y-1/2 left-0 w-[38%] mx-2 bg-[url('/onboard.png')] bg-cover bg-no-repeat bg-right rounded-xl h-[96%]  flex flex-col items-center justify-center overflow-hidden"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.7,
            ease: "easeOut",
          }}
          className="flex items-center gap-2 bg-white/90 px-4 py-2 rounded-full shadow border border-gray-200 text-xs font-semibold z-10"
          style={{ color: theme.primaryDark }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="10" cy="10" r="10" fill={theme.primaryLight} />
            <path
              d="M6 10.5L9 13.5L14 7.5"
              stroke={theme.primaryDark}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Trusted by 200+ Organizations
        </motion.div>
        <motion.h1
          className="text-5xl md:text-[3.4rem] leading-20 font-extrabold text-center tracking-wide"
          style={{
            color: theme.text,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          WORK SMARTER,{" "}
          <span style={{ color: theme.primary }}>DELIVER FASTER</span>.
        </motion.h1>
        <motion.p
          className="text-xl md:text-sm text-center w-[80%] font-medium"
          style={{
            color: theme.text,
            borderRadius: "0.5rem",
            padding: "0.75rem 1rem",
            boxShadow: `0 2px 12px ${theme.secondaryDark}33`,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.4,
            duration: 0.7,
            ease: "easeOut",
          }}
        >
          THE ALL-IN-ONE WORKSPACE TRUSTED BY{" "}
          <span className="font-bold" style={{ color: theme.accent }}>
            1,200+ TEAMS
          </span>{" "}
          TO PLAN, TRACK, AND SCALE PROJECTS EFFORTLESSLY.
        </motion.p>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] flex items-center justify-center gap-2 pointer-events-none select-none">
          {steps.map((step) => (
            <motion.div
              key={step}
              className="relative flex items-center"
              initial={{ scale: 0.9, opacity: 0.7 }}
              animate={{
                scale: currentStep === step ? 1.18 : 1,
                opacity: 1,
              }}
              transition={{ type: "spring", stiffness: 180, damping: 22 }}
            >
              {currentStep === step && (
                <div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full"
                  style={{
                    background: `radial-gradient(circle, ${theme.primary}22 0%, transparent 70%)`,
                    filter: "blur(4px)",
                    zIndex: 0,
                    pointerEvents: "none",
                  }}
                />
              )}
              <div
                className="w-5 h-5 rounded-full border-2 flex items-center justify-center relative"
                style={{
                  background:
                    currentStep >= step ? theme.primary : "transparent",
                  borderColor: theme.primaryDark,
                  boxShadow:
                    currentStep === step
                      ? `0 0 0 6px ${theme.primary}18`
                      : "none",
                  transition: "box-shadow 0.3s, background 0.3s",
                }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>
      {steps.map((step) => {
        if (step < currentStep - 1 || step > currentStep) return null;
        const isCurrent = step === currentStep;
        const isStacked = step === currentStep - 1;
        return (
          <AnimatePresence key={step}>
            {isCurrent && (
              <motion.section
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-[60%] mx-2 h-[96%] flex flex-col items-center justify-center  overflow-hidden
                } ${sectionShadow} rounded-xl`}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={sectionVariants}
                style={{ zIndex: 10 }}
              >
                {step === 1 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center w-full h-full bg-[linear-gradient(110deg,_#E9FBFC_0%,_#B9FFFC_80%,_#FFFFFF_100%)]"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <motion.h2
                      className="text-3xl md:text-4xl font-bold mb-4 text-center tracking-wide"
                      style={{ color: theme.text }}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                    >
                      Create Your Free Account
                    </motion.h2>
                    <motion.p
                      className="text-lg md:text-lg mb-8 text-center max-w-md font-medium"
                      style={{
                        color: theme.text,
                        borderRadius: "0.5rem",
                        padding: "0.5rem 1rem",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.4,
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                    >
                      No credit card required. Set up in less than a minute.
                    </motion.p>
                    <form className="w-full max-w-md flex flex-col gap-4 mb-6">
                      <input
                        type="text"
                        placeholder="Enter your name"
                        className="px-4 py-3 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#009688] text-md"
                      />
                      <input
                        type="email"
                        placeholder="Enter your work email"
                        className="px-4 py-3 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#009688] text-md"
                      />
                      <input
                        type="password"
                        placeholder="Create Password"
                        className="px-4 py-3 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#009688] text-md"
                      />
                      <button
                        type="button"
                        className="mt-2 px-6 py-3 rounded-lg font-bold text-white"
                        style={{ background: theme.primary }}
                        onClick={handleNext}
                      >
                        Sign Up
                      </button>
                    </form>
                    <div className="w-full max-w-md flex flex-col gap-2 mb-4">
                      <div className="flex gap-2 justify-center">
                        <button className="flex items-center gap-2 p-2 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition">
                          <FcGoogle size={24} />
                        </button>
                        <button className="flex items-center gap-2 p-2 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition">
                          <FaMicrosoft size={24} style={{ color: "#0078D4" }} />
                        </button>
                        <button className="flex items-center gap-2 p-2 rounded-full border border-gray-300 bg-white text-gray-700 font-semibold hover:bg-gray-50 transition">
                          <FaGithub size={24} />
                        </button>
                      </div>
                    </div>
                    <div className="w-full max-w-md text-xs text-gray-500 text-center mt-2 flex items-center justify-center gap-1">
                      <FaLock className="text-base" /> Enterprise-grade
                      security. SOC 2 Type II compliant.
                    </div>
                  </motion.div>
                ) : step === 2 ? (
                  <motion.div className="flex flex-col items-center justify-center w-full h-full px-2 md:px-8 bg-[linear-gradient(125deg,_#FFFFFF_5%,_#B9FFFC_20%,_#E9FBFC_70%,_#FFFFFF_100%)]">
                    <div className="w-full max-w-xl mx-auto py-6 flex flex-col gap-6 md:gap-7">
                      <h2
                        className="text-3xl md:text-4xl font-bold mb-1 text-center"
                        style={{ color: theme.text }}
                      >
                        Personalize your workspace
                      </h2>
                      <p
                        className="text-sm md:text-base text-center mb-2"
                        style={{ color: theme.text }}
                      >
                        Quick questions to set things up for you.
                      </p>
                      {/* Role */}
                      <div>
                        <div
                          className="text-sm font-semibold mb-1"
                          style={{ color: theme.text }}
                        >
                          Role
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {[
                            "Founder",
                            "Manager",
                            "Developer",
                            "Analyst",
                            "Other",
                          ].map((r) => (
                            <button
                              key={r}
                              type="button"
                              onClick={() => {
                                setRole(r);
                                if (r !== "Other") setRoleOther("");
                              }}
                              className={`px-4 py-2 rounded border text-sm font-medium transition-all focus:outline-none ${
                                role === r ? "border-2" : "border"
                              }`}
                              style={{
                                background:
                                  role === r
                                    ? theme.primaryLight
                                    : theme.background,
                                borderColor:
                                  role === r
                                    ? theme.primaryDark
                                    : theme.primaryLight,
                                color: theme.text,
                              }}
                            >
                              {r}
                            </button>
                          ))}
                        </div>
                        {role === "Other" && (
                          <input
                            type="text"
                            className="mt-2 px-3 py-2 rounded border w-full text-sm"
                            style={{
                              borderColor: theme.primaryLight,
                              color: theme.text,
                              background: theme.background,
                            }}
                            placeholder="Specify your role"
                            value={roleOther}
                            onChange={(e) => setRoleOther(e.target.value)}
                          />
                        )}
                      </div>
                      {/* Goal */}
                      <div>
                        <div
                          className="text-sm font-semibold mb-1"
                          style={{ color: theme.text }}
                        >
                          Goal
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {[
                            "Manage projects",
                            "Track team progress",
                            "Client reporting",
                            "Other",
                          ].map((g) => (
                            <button
                              key={g}
                              type="button"
                              onClick={() => {
                                setGoal(g);
                                if (g !== "Other") setGoalOther("");
                              }}
                              className={`px-4 py-2 rounded border text-sm font-medium transition-all focus:outline-none ${
                                goal === g ? "border-2" : "border"
                              }`}
                              style={{
                                background:
                                  goal === g
                                    ? theme.primaryLight
                                    : theme.background,
                                borderColor:
                                  goal === g
                                    ? theme.primaryDark
                                    : theme.primaryLight,
                                color: theme.text,
                              }}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                        {goal === "Other" && (
                          <input
                            type="text"
                            className="mt-2 px-3 py-2 rounded border w-full text-sm"
                            style={{
                              borderColor: theme.primaryLight,
                              color: theme.text,
                              background: theme.background,
                            }}
                            placeholder="Specify your goal"
                            value={goalOther}
                            onChange={(e) => setGoalOther(e.target.value)}
                          />
                        )}
                      </div>
                      {/* Team Size */}
                      <div>
                        <div
                          className="text-sm font-semibold mb-1"
                          style={{ color: theme.text }}
                        >
                          Team size
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {["Just me", "2–10", "10–50", "50+", "Other"].map(
                            (t) => (
                              <button
                                key={t}
                                type="button"
                                onClick={() => {
                                  setTeamSize(t);
                                  if (t !== "Other") setTeamSizeOther("");
                                }}
                                className={`px-4 py-2 rounded border text-sm font-medium transition-all focus:outline-none ${
                                  teamSize === t ? "border-2" : "border"
                                }`}
                                style={{
                                  background:
                                    teamSize === t
                                      ? theme.primaryLight
                                      : theme.background,
                                  borderColor:
                                    teamSize === t
                                      ? theme.primaryDark
                                      : theme.primaryLight,
                                  color: theme.text,
                                }}
                              >
                                {t}
                              </button>
                            )
                          )}
                        </div>
                        {teamSize === "Other" && (
                          <input
                            type="text"
                            className="mt-2 px-3 py-2 rounded border w-full text-sm"
                            style={{
                              borderColor: theme.primaryLight,
                              color: theme.text,
                              background: theme.background,
                            }}
                            placeholder="Specify team size"
                            value={teamSizeOther}
                            onChange={(e) => setTeamSizeOther(e.target.value)}
                          />
                        )}
                      </div>
                      <button
                        className="w-full py-2 rounded font-bold text-white text-base mt-3 transition-all"
                        style={{
                          background: theme.primary,
                          color: theme.background,
                        }}
                        onClick={handleNext}
                      >
                        Continue
                      </button>
                      <button
                        className="absolute bottom-6 left-1/2 -translate-x-1/2"
                        style={{ display: "block" }}
                        onClick={handleBack}
                      >
                        <IoArrowBackCircle size={56} />
                      </button>
                    </div>
                  </motion.div>
                ) : step === 3 ? (
                  <motion.div
                    className="flex flex-col items-center justify-center w-full h-full bg-[radial-gradient(circle_at_95%_10%,_#71DFE720_0%,_#B9FFFC0D_50%,_#FFFFFF_90%)]"
                    initial={{ opacity: 0, scale: 0.98, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <motion.div
                      className="w-full mx-auto px-4 py-8 flex flex-col gap-8 items-center"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.2,
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                    >
                      <motion.h2
                        className="text-5xl font-extrabold text-center mb-2"
                        style={{ color: theme.text }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.3,
                          duration: 0.7,
                          ease: "easeOut",
                        }}
                      >
                        Welcome to Your Workspace
                      </motion.h2>
                      <motion.p
                        className="text-base text-center mb-6"
                        style={{ color: theme.text }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 0.4,
                          duration: 0.7,
                          ease: "easeOut",
                        }}
                      >
                        Choose how you want to get started. Hover to explore
                        options!
                      </motion.p>
                      <motion.div
                        className="flex w-[90%] gap-12"
                        initial="initial"
                        animate="animate"
                        variants={{
                          initial: { opacity: 0, y: 40 },
                          animate: {
                            opacity: 1,
                            y: 0,
                            transition: {
                              staggerChildren: 0.18,
                              delayChildren: 0.5,
                            },
                          },
                        }}
                      >
                        {[
                          {
                            img: "https://cdn.dribbble.com/userupload/3788623/file/original-0676ffa219061edd3c15a5c80ffd206a.png?format=webp&resize=400x300&vertical=center",
                            title: "Create New Project",
                          },
                          {
                            img: "https://cdn.dribbble.com/userupload/29874850/file/original-bd9d9b236f0a17222109435f4dd7353d.jpg?format=webp&resize=400x300&vertical=center",
                            title: "Explore Templates",
                          },
                          {
                            img: "https://media.istockphoto.com/id/1214380596/vector/refer-a-friend-concept-on-social-media.jpg?s=612x612&w=0&k=20&c=8FeVFbCdKROM5TeWmjOS37F3tlKB8wgnleFfTNuXSts=",
                            title: "Invite Teammates",
                          },
                        ].map((card, idx) => (
                          <motion.div
                            key={card.title}
                            className="relative flex flex-col items-center justify-end w-full h-60 group cursor-pointer"
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                            onClick={() => setSelected(idx)}
                            initial={{ opacity: 0, scale: 0.96, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            transition={{ duration: 0.7, ease: "easeOut" }}
                          >
                            {/* Back Card */}
                            <motion.div
                              aria-hidden
                              className="absolute left-0 bottom-0 w-full h-full rounded-xl bg-[conic-gradient(from_180deg_at_50%_50%,_#71DFE7,_#E9FBFC,_#B9FFFC,_#1176B6,_#71DFE7)] shadow-lg"
                              style={{
                                zIndex: 1,
                                transformOrigin: "left bottom",
                              }}
                              initial={{
                                rotate: 0,
                                x: 0,
                                y: 0,
                                opacity: 0.4,
                                scale: 0.99,
                              }}
                              animate={
                                hovered === idx
                                  ? {
                                      rotate: -12,
                                      x: -8,
                                      y: -4,
                                      opacity: 0.7,
                                      scale: 0.97,
                                    }
                                  : {
                                      rotate: 0,
                                      x: 0,
                                      y: 0,
                                      opacity: 0.4,
                                      scale: 0.99,
                                    }
                              }
                              transition={{ duration: 0.45, ease: "easeOut" }}
                            />

                            <motion.div
                              className="relative w-full h-full rounded-xl bg-white shadow-xl flex flex-col items-center justify-end overflow-hidden z-10"
                              style={{
                                zIndex: 2,
                                transformOrigin: "left bottom",
                              }}
                              initial={{ rotate: 0, y: 0, scale: 1.01 }}
                              animate={
                                hovered === idx
                                  ? { rotate: 7, y: -8, scale: 1.04 }
                                  : { rotate: 0, y: 0, scale: 1.01 }
                              }
                              transition={{ duration: 0.45, ease: "easeOut" }}
                            >
                              <div className="flex-1 w-full flex items-center justify-center">
                                <motion.img
                                  src={card.img}
                                  alt={card.title}
                                  className="object-cover w-full h-full"
                                  initial={{ scale: 1.01, opacity: 0 }}
                                  animate={
                                    hovered === idx
                                      ? { scale: 1.08, opacity: 1 }
                                      : { scale: 1.01, opacity: 1 }
                                  }
                                  transition={{
                                    duration: 0.45,
                                    ease: "easeOut",
                                  }}
                                />
                              </div>
                              <div
                                className="w-full py-3 bg-white/90 text-center font-semibold text-base border-t border-gray-100"
                                style={{ color: "#22313F" }}
                              >
                                {card.title}
                              </div>

                              {selected === idx && (
                                <motion.div
                                  className="absolute top-0 left-0 w-full h-full bg-[#31A9B8]/40 flex items-center justify-center z-20"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{
                                    type: "spring",
                                    duration: 0.48,
                                  }}
                                >
                                  <span className="w-12 h-12 rounded-full bg-white/90 shadow-lg flex items-center justify-center">
                                    <span className="block relative w-6 h-6">
                                      <span
                                        className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 border-b-4 border-r-4 border-green-500 rounded-b-sm animate-draw-check"
                                        style={{
                                          width: 13,
                                          height: 22,
                                          transform: "rotate(45deg)",
                                          boxShadow: "0 1px 6px #07b05b55",
                                        }}
                                      />
                                    </span>
                                  </span>
                                </motion.div>
                              )}
                            </motion.div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex justify-center w-[90%] max-w-xl">
                      <button
                        className=""
                        style={{ display: "block" }}
                        onClick={handleBack}
                      >
                        <IoArrowBackCircle size={56} />
                      </button>
                      <button
                        onClick={handleNext}
                        className="px-6 py-2 rounded bg-white/80 text-gray-800 font-bold shadow"
                      >
                        <IoArrowForwardCircle size={56} />
                      </button>
                    </div>
                  </motion.div>
                ) : step === 4 ? (
                  <motion.div
                    className="flex flex-col items-center gap-2 justify-center w-full h-full px-8 py-12"
                    style={{
                      background: `linear-gradient(100deg, ${theme.secondaryLight} 0%, ${theme.primaryLight} 60%, ${theme.background} 100%)`,
                    }}
                    initial={{ opacity: 0, scale: 0.98, y: 40 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                    >
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </motion.div>
                    <motion.h2
                      className="text-4xl md:text-5xl font-bold text-center mb-2 tracking-tight"
                      style={{
                        color: theme.primaryDark,
                        letterSpacing: "0.04em",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.22,
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                    >
                      Project Created Successfully
                    </motion.h2>
                    <motion.p
                      className="text-base md:text-lg text-center my-4 font-medium"
                      style={{
                        color: theme.text,
                        maxWidth: 420,
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.32,
                        duration: 0.7,
                        ease: "easeOut",
                      }}
                    >
                      Your workspace is ready. Start by adding your first task
                      or inviting teammates to collaborate.
                    </motion.p>
                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-lg mx-auto mb-4">
                      <button
                        className="flex-1 px-7 py-3 rounded-lg font-bold text-base shadow transition-all"
                        style={{
                          background: theme.primary,
                          color: theme.background,
                        }}
                      >
                        Add Task
                      </button>
                      <button
                        className="flex-1 px-7 py-3 rounded-lg font-bold text-base shadow transition-all border"
                        style={{
                          background: theme.background,
                          color: theme.primaryDark,
                          borderColor: theme.primaryLight,
                        }}
                      >
                        Invite Teammates
                      </button>
                    </div>
                    <div
                      className="mt-6 text-sm text-center italic"
                      style={{ color: theme.text, opacity: 0.7 }}
                    >
                      “Every project starts small. Let’s make this one a
                      success.”
                    </div>
                  </motion.div>
                ) : null}
              </motion.section>
            )}
            {isStacked && (
              <motion.section
                className={`absolute right-0 top-1/2 -translate-y-1/2 w-[60%] h-[96%] flex flex-col items-center justify-center bg-[#31A9B8]/10
                } ${sectionShadow} rounded-xl pointer-events-none`}
                animate="stacked"
                variants={stackedVariants}
                style={{ zIndex: 5 }}
              />
            )}
          </AnimatePresence>
        );
      })}
    </main>
  );
}
