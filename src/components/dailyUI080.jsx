import React, { useState, useMemo } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  eachDayOfInterval,
  setYear,
  setMonth,
} from "date-fns";
import { motion, AnimatePresence, easeIn, easeInOut } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  History,
} from "lucide-react";
import BackToHome from "./BackToHome";

const HeritageDatePicker = ({ onSelect }) => {
  const [view, setView] = useState("days");
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 0, 1));
  const [activeDate, setActiveDate] = useState(new Date(2025, 0, 1));

  const rows = useMemo(() => {
    const start = startOfWeek(startOfMonth(activeDate));
    const end = endOfWeek(endOfMonth(activeDate));
    return eachDayOfInterval({ start, end });
  }, [activeDate]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getYearRange = (date) => {
    const startYear = Math.floor(date.getFullYear() / 12) * 12;
    return Array.from({ length: 12 }, (_, i) => startYear + i);
  };

  const handleNext = () => {
    if (view === "days") setActiveDate(addMonths(activeDate, 1));
    if (view === "months" || view === "years")
      setActiveDate(setYear(activeDate, activeDate.getFullYear() + 12));
  };

  const handlePrev = () => {
    if (view === "days") setActiveDate(subMonths(activeDate, 1));
    if (view === "months" || view === "years")
      setActiveDate(setYear(activeDate, activeDate.getFullYear() - 12));
  };

  const Header = () => (
    <div className="p-5 border-b border-stone-200 bg-white">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-400 mb-1">
            Archive Chronology
          </h3>
          <button
            onClick={() => setView(view === "decades" ? "days" : "decades")}
            className="text-4xl font-serif text-stone-900 hover:text-stone-600 transition-colors"
          >
            {format(activeDate, "yyyy")}
          </button>
        </div>
        <History size={18} className="text-stone-300" />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setView("months")}
          className="text-sm font-medium uppercase tracking-widest text-stone-500 hover:text-black"
        >
          {format(activeDate, "MMMM")}
        </button>

        <div className="flex gap-1">
          <button
            onClick={handlePrev}
            className="p-1.5 hover:bg-stone-100 border border-stone-200 transition-colors"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="p-1.5 hover:bg-stone-100 border border-stone-200 transition-colors"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-[350px] bg-[#FDFDFB] border-l-2 border-t-2 border-zinc-300 hover:translate-y-2 hover:translate-x-2 hover:shadow-none transition-all ease-in duration-100 hover:border-zinc-400 shadow-[8px_8px_0px_#000000] select-none overflow-hidden">
      <Header />

      <div className="relative min-h-[300px] p-4">
        <AnimatePresence mode="wait">
          {view === "days" && (
            <motion.div
              key="days"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              className="grid grid-cols-7 gap-px"
            >
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div
                  key={d}
                  className="h-8 flex items-center justify-center text-[10px] font-bold text-stone-400 uppercase"
                >
                  {d}
                </div>
              ))}
              {rows.map((date, i) => {
                const isSelected = isSameDay(date, selectedDate);
                const isCurrentMonth = isSameMonth(date, activeDate);
                return (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedDate(date);
                      if (onSelect) onSelect(date);
                    }}
                    className={`
                      h-10 text-sm transition-all relative
                      ${isCurrentMonth ? "text-stone-800" : "text-stone-300"}
                      ${
                        isSelected
                          ? "bg-stone-900 text-white font-bold"
                          : "hover:bg-stone-100"
                      }
                    `}
                  >
                    {format(date, "d")}
                  </button>
                );
              })}
            </motion.div>
          )}

          {view === "months" && (
            <motion.div
              key="months"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="grid grid-cols-3 gap-2 pt-4"
            >
              {months.map((m, i) => (
                <button
                  key={m}
                  onClick={() => {
                    setActiveDate(setMonth(activeDate, i));
                    setView("days");
                  }}
                  className="py-4 text-xs font-bold uppercase tracking-widest border border-stone-100 hover:border-stone-900 transition-all"
                >
                  {m}
                </button>
              ))}
            </motion.div>
          )}

          {view === "decades" && (
            <motion.div
              key="decades"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 gap-2 pt-4"
            >
              {getYearRange(activeDate).map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setActiveDate(setYear(activeDate, year));
                    setView("months");
                  }}
                  className="py-4 text-sm font-serif border border-stone-100 hover:border-stone-900 transition-all"
                >
                  {year}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-[9px] uppercase font-bold text-stone-400">
            Selected Point
          </span>
          <span className="text-xs font-serif">
            {format(selectedDate, "dd MMMM yyyy")}
          </span>
        </div>
        <button
          className="bg-stone-900 text-white px-5 py-2 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:shadow-[inset_2px_2px_0px_rgba(0,0,0,1),inset_-2px_-2px_8px_rgba(0,0,0,0.35)]  transition-all ease-in"
          onClick={() => console.log("Final Date:", selectedDate)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default function DatePickerShowcase() {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center bg-zinc-200">
        <motion.div
          initial={{ opacity: 0, y: -50, x: -50 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          transition={{ ease: easeInOut, duration: 0.9 }}
        >
          <HeritageDatePicker />
        </motion.div>
      </div>
      <BackToHome challengeDay="80" challengeTitle="Date Picker"/>
    </>
  );
}