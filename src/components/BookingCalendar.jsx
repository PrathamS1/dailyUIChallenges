import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const curve = {
  initial: {
    strokeDasharray: 1000,
    strokeDashoffset: 1000,
    opacity: 0
  },
  animate: {
    strokeDashoffset: 0,
    opacity: 1,
    transition: {
      duration: 1,
      ease: "easeInOut"
    }
  }
};

const BookingCalendar = ({ 
  selectedDate,
  onSelectDate,
  bookedDates = [],
  disablePastDates = true
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };
  
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelectedDay = (day) => {
    if (!selectedDate) return false;
    const dateToCheck = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return (
      dateToCheck.getDate() === selectedDate.getDate() &&
      dateToCheck.getMonth() === selectedDate.getMonth() &&
      dateToCheck.getFullYear() === selectedDate.getFullYear()
    );
  };

  const isBookedDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookedDates.includes(dateStr);
  };
  


  const isDisabled = (day) => {
    if (!disablePastDates) return false;
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };
  
  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="w-8 h-8"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const today = isToday(day);
      const selected = isSelectedDay(day);
      const booked = isBookedDay(day);
      const disabled = isDisabled(day);
      
      days.push(
        <div key={day} className="relative">
          {(selected || booked) && (
            <div className="absolute -top-8 -left-4">
              <div className="relative inline-flex flex-col items-start">
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="z-20 px-2 py-0.5 bg-emerald-100 text-[10px] font-medium text-emerald-700 rounded rotate-[-15deg] shadow-sm whitespace-nowrap"
                >
                  {booked ? 'Booked' : 'Selected'}
                </motion.div>
                <svg
                  width="17"
                  height="23"
                  viewBox="0 0 20 23"
                  fill="none"
                  className="absolute top-2 left-9 z-10"
                  style={{ pointerEvents: 'none' }}
                >
                  <motion.path
                    d="M12.538 22.8234C12.7166 23.034 13.0321 23.0599 13.2428 22.8813L16.6748 19.9708C16.8854 19.7922 16.9113 19.4767 16.7327 19.2661C16.5541 19.0555 16.2386 19.0295 16.028 19.2081L12.9773 21.7953L10.3901 18.7446C10.2115 18.534 9.89602 18.508 9.68542 18.6867C9.47481 18.8653 9.44887 19.1808 9.62748 19.3914L12.538 22.8234ZM1 0.5L0.770259 0.944093C5.05614 3.16129 13.3974 10.583 12.421 22.459L12.9194 22.5L13.4177 22.541C14.4392 10.1165 5.72257 2.38016 1.22974 0.0559066L1 0.5Z"
                    fill="#10B981"
                    variants={curve}
                    initial="initial"
                    animate="animate"
                  />
                </svg>
              </div>
            </div>
          )}
          <motion.div
            whileHover={!disabled ? { scale: 1.1 } : {}}
            onClick={() => !disabled && onSelectDate?.(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))}
            className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-lg transition-all ${
              disabled
                ? 'text-zinc-300 cursor-not-allowed'
                : booked
                ? 'bg-emerald-500 text-white shadow-lg cursor-default'
                : selected
                ? 'bg-blue-500 text-white shadow-lg cursor-pointer'
                : today
                ? 'bg-zinc-900 text-white shadow-md cursor-pointer'
                : 'text-zinc-600 hover:bg-zinc-100 cursor-pointer'
            }`}
          >
            {day}
          </motion.div>
        </div>
      );
    }
    
    return days;
  };
  console.log("selected date: ", selectedDate);
  console.log(bookedDates);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm w-md max-w-full mx-auto relative"
    >
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigateMonth(-1)}
          className="p-1 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          <ChevronLeft className="w-4 h-4 text-zinc-600" />
        </motion.button>
        
        <h3 className="text-sm font-semibold text-zinc-900">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigateMonth(1)}
          className="p-1 hover:bg-zinc-100 rounded-lg transition-colors"
        >
          <ChevronRight className="w-4 h-4 text-zinc-600" />
        </motion.button>
      </div>
      
      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map((day) => (
          <div
            key={day}
            className="w-8 h-6 flex items-center justify-center text-xs font-medium text-zinc-500"
          >
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      
      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-4 pt-3 border-t border-zinc-100">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-zinc-900 rounded"></div>
          <span className="text-xs text-zinc-600">Today</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-blue-500 rounded"></div>
          <span className="text-xs text-zinc-600">Selected</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-emerald-500 rounded"></div>
          <span className="text-xs text-zinc-600">Booked</span>
        </div>
      </div>
    </motion.div>
  );
};

export default BookingCalendar;