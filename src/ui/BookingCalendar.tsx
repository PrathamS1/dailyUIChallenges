import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BookingCalendarProps {
  bookedDates?: string[]; // ISO date strings yyyy-mm-dd
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  disablePastDates?: boolean;
}

export default function BookingCalendar({
  bookedDates = [],
  selectedDate,
  onSelectDate,
  disablePastDates = true,
}: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth.getMonth() === today.getMonth() &&
      currentMonth.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentMonth.getMonth() === selectedDate.getMonth() &&
      currentMonth.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isPast = (day: number) => {
    if (!disablePastDates) return false;
    const dateToCheck = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day, 23, 59, 59);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dateToCheck < today;
  };

  const handleDateClick = (day: number) => {
    if (isPast(day)) return;
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelectDate(newDate);
  };

  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const blanks = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  return (
    <div className="w-full max-w-[360px] p-4 bg-white rounded-2xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-zinc-900">
          {currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-1">
          <button
            onClick={prevMonth}
            className="p-2 hover:bg-zinc-100 rounded-full text-zinc-600 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={nextMonth}
            className="p-2 hover:bg-zinc-100 rounded-full text-zinc-600 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <div key={day} className="text-center text-xs font-medium text-zinc-400 py-2">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {blanks.map((_, i) => (
          <div key={`blank-${i}`} />
        ))}
        {days.map((day) => {
          const isDisabled = isPast(day);
          const selected = isSelected(day);
          const today = isToday(day);

          return (
            <motion.button
              key={day}
              whileHover={!isDisabled ? { scale: 1.1 } : {}}
              whileTap={!isDisabled ? { scale: 0.95 } : {}}
              onClick={() => handleDateClick(day)}
              disabled={isDisabled}
              className={`
                relative h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
                ${selected ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200' : ''}
                ${!selected && !isDisabled ? 'hover:bg-zinc-100 text-zinc-700' : ''}
                ${isDisabled ? 'text-zinc-300 cursor-not-allowed' : ''}
                ${today && !selected ? 'border border-emerald-600 text-emerald-600' : ''}
              `}
            >
              {day}
              {/* Optional: Add a dot for availability or appointments */}
              <div className="absolute bottom-1.5 w-1 h-1 rounded-full bg-current opacity-50"></div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}