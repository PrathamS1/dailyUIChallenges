import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const MiniCalendar = ({ completedDays = [] }) => {
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
  
  const isCompletedDay = (day) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return completedDays.includes(dateStr);
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
      const completed = isCompletedDay(day);
      
      days.push(
        <motion.div
          key={day}
          whileHover={{ scale: 1.1 }}
          className={`w-8 h-8 flex items-center justify-center text-xs font-medium rounded-lg cursor-pointer transition-all ${
            today && completed
            ? 'bg-emerald-300 text-green-800 hover:bg-green-200'
              :today? 'bg-zinc-900 text-white shadow-md'
              : completed
              ? 'bg-green-300 text-green-800 hover:bg-green-200'
              : 'text-zinc-600 hover:bg-zinc-100'
          }`}
        >
          {day}
        </motion.div>
      );
    }
    
    return days;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm max-w-xs mx-auto"
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
          <div className="w-3 h-3 bg-emerald-300 border border-green-200 rounded"></div>
          <span className="text-xs text-zinc-600">Completed</span>
        </div>
      </div>
    </motion.div>
  );
};

export default MiniCalendar;
