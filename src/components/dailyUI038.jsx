import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Clock, User, Mail, MessageSquare } from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import BookingCalendar from "./BookingCalendar";
import BackToHome from "./BackToHome";

const scrollbarStyles = `
  .styled-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  .styled-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  .styled-scrollbar::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.1);
    border-radius: 3px;
  }
  .styled-scrollbar::-webkit-scrollbar-thumb:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  @keyframes gradient {
    0% {
      background-position: 0% 50%;
      background-size: 400% 400%;
    }
    50% {
      background-position: 100% 50%;
      background-size: 200% 200%;
    }
    100% {
      background-position: 0% 50%;
      background-size: 400% 400%;
    }
  }

  .animated-gradient {
    background: linear-gradient(-45deg, 
        #f0f9ff,    /* sky-50 */
        #e0f2fe,    /* sky-100 */
        #bae6fd,    /* sky-200 */
        #7dd3fc,    /* sky-300 */
        #e0f2fe,    /* sky-100 */
        #dbeafe,    /* blue-100 */
        #bfdbfe,    /* blue-200 */
        #93c5fd,    /* blue-300 */
        #dbeafe     /* blue-100 */
    );
    background-size: 400% 400%;
    animation: gradient 8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    position: relative;
    overflow: hidden;
  }
  
  .animated-gradient::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.1) 100%
    );
    filter: blur(10px);
    opacity: 0.7;
    animation: shine 4s ease-in-out infinite;
  }

  @keyframes shine {
    0% {
      opacity: 0.5;
      transform: translateX(-100%) translateY(-100%) rotate(45deg);
    }
    50% {
      opacity: 0.7;
    }
    100% {
      opacity: 0.5;
      transform: translateX(100%) translateY(100%) rotate(45deg);
    }
  }
  }
`;

export default function Calendar() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [bookingStep, setBookingStep] = useState("date");
  const [selectedTab, setSelectedTab] = useState("morning");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState(() => {
    const saved = localStorage.getItem('bookedAppointments');
    return saved ? JSON.parse(saved) : [];
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    notes: "",
  });

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="min-h-screen w-full flex flex-col items-center p-4 relative overflow-hidden animated-gradient">
        <BackToHome />
        {/* Header content */}
        <div className="relative z-10 text-center mb-10 mt-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.8,
              ease: "easeOut"
            }}
            className="relative"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: 0.4,
                duration: 0.8,
                ease: "easeOut"
              }}
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full"
            />

            <span className="block text-sm font-medium tracking-wider text-zinc-500 mb-2">
              SCHEDULE YOUR TIME
            </span>

            <h2 className="text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-b from-zinc-900 via-zinc-800 to-zinc-600">
              Book an Appointment
            </h2>

            <div className="w-40 h-1 bg-gradient-to-r from-black via-black to-black/5 mx-auto rounded-full" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1,
            delay: 0.6,
            ease: "easeOut"
          }}
          className="bg-white rounded-xl shadow-lg border z-50 border-zinc-100 p-6 max-w-5xl w-full grid md:grid-cols-2 gap-8"
        >
          {/* calendar */}
          <div className="flex flex-col items-center justify-center h-full w-full max-w-md mx-auto">
            <BookingCalendar
              bookedDates={bookedAppointments.map((apt) => apt.date)}
              selectedDate={selectedDate}
              onSelectDate={(date) => {
                setSelectedDate(date);
                setBookingStep("time");
                setSelectedTab("morning");
              }}
              disablePastDates={true}
            />
          </div>

          {/* booking */}
          <div className="flex flex-col h-[500px]">
            <div className="space-y-4 h-full overflow-y-auto pr-2 styled-scrollbar">
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-zinc-50 rounded-lg p-4 border border-zinc-100"
                >
                  <p className="text-sm text-zinc-500 mb-1">Selected Date</p>
                  <p className="text-zinc-900 font-medium">
                    {selectedDate.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </motion.div>
              )}

              {!selectedDate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-zinc-50 rounded-lg p-4 border border-zinc-100 h-full flex items-center justify-center"
                >
                  <p className="text-sm text-zinc-600 text-center">
                    <span className="block font-semibold text-zinc-800">
                      No date selected.
                    </span>
                    Please select a date from the calendar to proceed.
                  </p>
                </motion.div>
              )}

              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-white p-4 flex items-center gap-3">
                    <div className="flex rounded-md overflow-hidden border border-black">
                      <motion.button
                        onClick={() => setSelectedTab("morning")}
                        className={`px-4 py-2 text-sm font-medium ${
                          selectedTab === "morning"
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-zinc-50"
                        }`}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <motion.span
                          initial={false}
                          animate={{
                            opacity: selectedTab === "morning" ? 1 : 0.7,
                          }}
                        >
                          Morning
                        </motion.span>
                      </motion.button>
                      <motion.button
                        onClick={() => setSelectedTab("afternoon")}
                        className={`px-4 py-2 text-sm font-medium border-l border-black ${
                          selectedTab === "afternoon"
                            ? "bg-black text-white"
                            : "bg-white text-black hover:bg-zinc-50"
                        }`}
                        whileTap={{ scale: 0.95 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 25,
                        }}
                      >
                        <motion.span
                          initial={false}
                          animate={{
                            opacity: selectedTab === "afternoon" ? 1 : 0.7,
                          }}
                        >
                          Afternoon
                        </motion.span>
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-3 flex-1 relative">
                      <Clock className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 transform -translate-y-1/2" />
                      <div
                        onClick={() => setDropdownOpen((prev) => !prev)}
                        className="flex-1 pl-9 pr-4 py-2 border border-black rounded-md text-black cursor-pointer flex items-center justify-between bg-white shadow-md hover:shadow-lg transition-shadow"
                      >
                        <span
                          className={
                            selectedTime ? "text-black" : "text-zinc-500"
                          }
                        >
                          {selectedTime || "Select time"}
                        </span>
                        <motion.span
                          animate={{ rotate: dropdownOpen ? 180 : 0 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          }}
                        >
                          <IoIosArrowDown className="w-4 h-4 text-black" />
                        </motion.span>
                      </div>

                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute left-0 right-0 top-full mt-2 bg-white border border-black rounded-md shadow-lg z-10 py-1 overflow-hidden"
                          >
                            <motion.div
                              initial="hidden"
                              animate="visible"
                              variants={{
                                hidden: {},
                                visible: {
                                  transition: {
                                    staggerChildren: 0.03,
                                  },
                                },
                              }}
                            >
                              {(selectedTab === "morning"
                                ? [
                                    "09:00",
                                    "09:30",
                                    "10:00",
                                    "10:30",
                                    "11:00",
                                    "11:30",
                                  ]
                                : [
                                    "13:00",
                                    "13:30",
                                    "14:00",
                                    "14:30",
                                    "15:00",
                                    "15:30",
                                    "16:00",
                                    "16:30",
                                  ]
                              ).map((time) => (
                                <motion.div
                                  key={time}
                                  variants={{
                                    hidden: { opacity: 0, y: -10 },
                                    visible: { opacity: 1, y: 0 },
                                  }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 25,
                                  }}
                                  onClick={() => {
                                    setSelectedTime(time);
                                    setDropdownOpen(false);
                                    setBookingStep("details");
                                  }}
                                  className={`px-4 py-2 cursor-pointer relative ${
                                    selectedTime === time
                                      ? "text-white"
                                      : "hover:bg-zinc-50 text-black"
                                  }`}
                                  whileHover={{ x: 4 }}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {selectedTime === time && (
                                    <motion.div
                                      layoutId="selected-time"
                                      className="absolute inset-0 bg-black -z-10"
                                      initial={false}
                                      transition={{
                                        type: "spring",
                                        bounce: 0.2,
                                      }}
                                    />
                                  )}
                                  {time}
                                </motion.div>
                              ))}
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* name and email stuff */}
              {selectedDate && selectedTime && bookingStep === "details" && (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="space-y-4 py-2 px-4 border-t border-zinc-100"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const newAppointment = {
                      date: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
                      time: selectedTime,
                      ...formData,
                    };
                    setBookedAppointments((prev) => {
                      const updated = [...prev, newAppointment];
                      localStorage.setItem('bookedAppointments', JSON.stringify(updated));
                      console.log("Updated appointments:", updated);
                      return updated;
                    });
                    setBookingStep("confirmation");
                  }}
                >
                  <motion.div
                    className="space-y-4"
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.1,
                        },
                      },
                    }}
                  >
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="space-y-1"
                    >
                      <label className="text-sm text-zinc-600">Full Name</label>
                      <div className="relative">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          required
                          className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-colors"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="space-y-1"
                    >
                      <label className="text-sm text-zinc-600">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="email"
                          placeholder="email@example.com"
                          required
                          className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-colors"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </motion.div>

                    <motion.div
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 },
                      }}
                      className="space-y-1"
                    >
                      <label className="text-sm text-zinc-600">
                        Additional Notes
                      </label>
                      <div className="relative">
                        <MessageSquare className="w-4 h-4 absolute left-3 top-4 text-zinc-400" />
                        <textarea
                          placeholder="Leave any specific request..."
                          className="w-full pl-9 pr-4 py-2 rounded-lg border border-zinc-200 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:border-black focus:ring-2 focus:ring-black/10 transition-colors"
                          rows={3}
                          value={formData.notes}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              notes: e.target.value,
                            }))
                          }
                        />
                      </div>
                    </motion.div>
                  </motion.div>

                  <motion.button
                    type="submit"
                    className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-zinc-800 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Confirm Booking
                  </motion.button>
                </motion.form>
              )}

              {/* final  */}
              {bookingStep === "confirmation" && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="space-y-6"
                >
                  <motion.div
                    className="flex items-center gap-4 p-4 bg-emerald-50 rounded-lg border border-emerald-100 overflow-hidden relative"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", bounce: 0.3 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.2,
                      }}
                      className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-5 h-5 text-emerald-600" />
                    </motion.div>
                    <motion.div
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4 className="font-medium text-emerald-900">
                        Booking Confirmed
                      </h4>
                      <p className="text-sm text-emerald-700">
                        Your appointment has been scheduled
                      </p>
                    </motion.div>
                    <motion.div
                      initial={{ scale: 2 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 bg-emerald-100 -z-10 origin-center"
                      style={{ opacity: 0.5 }}
                    />
                  </motion.div>

                  <motion.div
                    className="space-y-4 p-4 bg-zinc-50 rounded-lg border border-zinc-100"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      <p className="text-sm text-zinc-500">Date & Time</p>
                      <p className="font-medium text-zinc-900">
                        {selectedDate?.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}{" "}
                        at {selectedTime}
                      </p>
                    </motion.div>

                    <motion.div
                      className="pt-3 border-t border-zinc-400 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.button
                        onClick={() => {
                          setSelectedDate(null);
                          setSelectedTime(null);
                          setFormData({ name: "", email: "", notes: "" });
                          setBookingStep("date");
                          setSelectedTab("morning");
                        }}
                        className="text-sm bg-zinc-100 cursor-pointer px-12 py-2 rounded-lg text-black ring-1 ring-zinc-400 hover:ring-offset-2 hover:bg-zinc-900 hover:text-white font-medium transition-all"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Book Another Appointment
                      </motion.button>
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}