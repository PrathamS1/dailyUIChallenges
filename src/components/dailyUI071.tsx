import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  User,
  Mail,
  MessageSquare,
  Phone,
  FileText,
  Calendar as CalendarIcon,
} from "lucide-react";
import { IoIosArrowDown } from "react-icons/io";
import BookingCalendar from "../ui/BookingCalendar";
import BackToHome from "./BackToHome";
import { Department, Appointment } from "../utils/types";

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
        #f0f9ff,    /* emerald-50 */
        #e0f2fe,    /* emerald-100 */
        #ccfbf1,    /* teal-100 */
        #99f6e4,    /* teal-200 */
        #e0f2fe,    /* emerald-100 */
        #dbeafe,    /* blue-100 */
        #bfdbfe,    /* blue-200 */
        #e0f2fe     /* emerald-100 */
    );
    background-size: 400% 400%;
    animation: gradient 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
    position: relative;
    overflow: hidden;
  }
  
  .medical-pattern::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: radial-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px);
    background-size: 24px 24px;
    mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
  }
`;

export default function Scheduling() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department>(
    Department.GENERAL
  );

  const [bookingStep, setBookingStep] = useState<
    "date" | "details" | "confirmation"
  >("date");
  const [timeSlotTab, setTimeSlotTab] = useState<"morning" | "afternoon">(
    "morning"
  );
  const [departmentDropdownOpen, setDepartmentDropdownOpen] = useState(false);

  const [bookedAppointments, setBookedAppointments] = useState<Appointment[]>(
    () => {
      try {
        const saved = localStorage.getItem("bookedAppointments");
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        return [];
      }
    }
  );

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    symptoms: "",
    dob: "",
  });

  const generateTimeSlots = (period: "morning" | "afternoon") => {
    if (period === "morning") {
      return ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30"];
    }
    return [
      "13:00",
      "13:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
    ];
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime) return;

    const newAppointment: Appointment = {
      id: Math.random().toString(36).substr(2, 9),
      date: selectedDate.toISOString(),
      time: selectedTime,
      department: selectedDepartment,
      patientName: formData.name,
      email: formData.email,
      phone: formData.phone,
      symptoms: formData.symptoms,
      status: "confirmed",
    };

    setBookedAppointments((prev) => {
      const updated = [...prev, newAppointment];
      localStorage.setItem("bookedAppointments", JSON.stringify(updated));
      return updated;
    });
    setBookingStep("confirmation");
  };

  return (
    <>
      <style>{scrollbarStyles}</style>
      <div className="min-h-screen w-full flex flex-col items-center p-4 lg:p-8 relative overflow-hidden animated-gradient medical-pattern">
        <BackToHome challengeDay="71" challengeTitle="Scheduling" />

        <div className="relative z-10 text-center mb-8 mt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <span className="block text-sm font-semibold tracking-widest text-slate-800 uppercase mb-2">
              City General Hospital
            </span>

            <h2 className="text-4xl md:text-5xl font-bold mb-3 text-slate-900 tracking-tight">
              Patient Scheduling
            </h2>

            <p className="text-slate-600 max-w-md mx-auto">
              Securely book your consultation with our specialist doctors.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 lg:p-8 max-w-6xl w-full grid lg:grid-cols-12 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-5 flex flex-col items-center justify-start pt-4">
            <div className="w-full max-w-md">
              <div className="flex items-center gap-2 mb-6 px-4">
                <CalendarIcon className="w-5 h-5 text-emerald-600" />
                <h3 className="text-lg font-semibold text-slate-800">
                  Select Date
                </h3>
              </div>
              <BookingCalendar
                bookedDates={bookedAppointments.map((apt) => apt.date)}
                selectedDate={selectedDate}
                onSelectDate={(date) => {
                  setSelectedDate(date);
                  setBookingStep("date");
                  setTimeSlotTab("morning");
                }}
                disablePastDates={true}
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col min-h-[500px]">
            <div className="flex-1 overflow-y-auto px-2 styled-scrollbar">
              {!selectedDate && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-8 border-2 border-dashed border-slate-200 rounded-xl"
                >
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                    <CalendarIcon className="w-8 h-8 text-slate-300" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 mb-1">
                    No Date Selected
                  </h3>
                  <p className="text-slate-500 max-w-xs">
                    Please select a preferred date from the calendar to view
                    available specialists and time slots.
                  </p>
                </motion.div>
              )}

              {selectedDate && bookingStep === "date" && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6"
                >
                  <div className="bg-slate-200/50 rounded-xl p-5 border border-slate-100 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Selected Date
                      </p>
                      <p className="text-lg font-bold text-slate-900">
                        {selectedDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedDate(null)}
                      className="text-sm text-emerald-600 font-medium hover:text-emerald-700 underline"
                    >
                      Change
                    </button>
                  </div>

                  <div className="space-y-2 relative z-20">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      Department / Specialty
                    </label>
                    <div
                      className="relative"
                      onClick={() =>
                        setDepartmentDropdownOpen(!departmentDropdownOpen)
                      }
                    >
                      <div className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 flex items-center justify-between cursor-pointer hover:border-emerald-300 transition-colors shadow-sm">
                        <span className="text-slate-700 font-medium">
                          {selectedDepartment}
                        </span>
                        <IoIosArrowDown
                          className={`text-slate-400 transition-transform ${
                            departmentDropdownOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>

                      <AnimatePresence>
                        {departmentDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 5 }}
                            className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-100 rounded-xl shadow-xl z-30 py-1"
                          >
                            {Object.values(Department).map((dept) => (
                              <div
                                key={dept}
                                onClick={() => {
                                  setSelectedDepartment(dept);
                                  setSelectedTime(null);
                                }}
                                className={`px-4 py-2 text-sm cursor-pointer hover:bg-emerald-50 ${
                                  selectedDepartment === dept
                                    ? "bg-emerald-50 text-emerald-700 font-medium"
                                    : "text-slate-600"
                                }`}
                              >
                                {dept}
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                      Available Slots
                    </label>

                    <div className="flex p-1 bg-slate-100 rounded-lg mb-4">
                      <button
                        onClick={() => setTimeSlotTab("morning")}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                          timeSlotTab === "morning"
                            ? "bg-white text-emerald-700 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        Morning
                      </button>
                      <button
                        onClick={() => setTimeSlotTab("afternoon")}
                        className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                          timeSlotTab === "afternoon"
                            ? "bg-white text-emerald-700 shadow-sm"
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                      >
                        Afternoon
                      </button>
                    </div>

                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {generateTimeSlots(timeSlotTab).map((time) => (
                        <motion.button
                          key={time}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setSelectedTime(time);
                            setBookingStep("details");
                          }}
                          className={`
                            py-2 px-3 rounded-lg text-sm font-medium border transition-all
                            ${
                              selectedTime === time
                                ? "bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200 ring-offset-1"
                                : "bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50"
                            }
                          `}
                        >
                          {time}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {selectedDate && selectedTime && bookingStep === "details" && (
                <motion.form
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-6 pt-2"
                  onSubmit={handleBookingSubmit}
                >
                  <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() => setBookingStep("date")}
                      className="text-xs font-semibold text-slate-500 hover:text-emerald-600 uppercase tracking-wide"
                    >
                      ← Back to Selection
                    </button>
                    <div className="flex-1 text-right">
                      <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-medium">
                        {selectedDepartment} • {selectedTime}
                      </span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">
                        Full Name
                      </label>
                      <div className="relative group">
                        <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                          type="text"
                          required
                          placeholder="Ex. Pratham Singh"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50/50 focus:bg-white"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        required
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50/50 focus:bg-white text-slate-700"
                        value={formData.dob}
                        onChange={(e) =>
                          setFormData({ ...formData, dob: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">
                        Email Address
                      </label>
                      <div className="relative group">
                        <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                          type="email"
                          required
                          placeholder="name@example.com"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50/50 focus:bg-white"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-sm font-medium text-slate-700">
                        Phone Number
                      </label>
                      <div className="relative group">
                        <Phone className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                        <input
                          type="tel"
                          required
                          placeholder="00000 xxxxx"
                          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50/50 focus:bg-white"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-slate-700">
                      Reason for Visit (Symptoms)
                    </label>
                    <div className="relative group">
                      <MessageSquare className="w-4 h-4 absolute left-3 top-3.5 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                      <textarea
                        required
                        rows={3}
                        placeholder="Please describe your symptoms briefly..."
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all bg-slate-50/50 focus:bg-white resize-none"
                        value={formData.symptoms}
                        onChange={(e) =>
                          setFormData({ ...formData, symptoms: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="w-full bg-emerald-600 text-white py-3.5 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 hover:shadow-emerald-700/30 transition-all mt-4"
                  >
                    Confirm Appointment
                  </motion.button>
                </motion.form>
              )}

              {bookingStep === "confirmation" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center h-full space-y-6 py-6"
                >
                  <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-2">
                    <Check className="w-10 h-10 text-emerald-600" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-emerald-900 mb-2">
                      Appointment Confirmed!
                    </h3>
                    <p className="text-slate-600">
                      Your appointment has been successfully scheduled.
                    </p>
                  </div>

                  <div className="w-full bg-slate-50 rounded-2xl p-6 border border-slate-100 max-w-sm mx-auto text-left space-y-4 shadow-sm">
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-500 text-sm">Patient</span>
                      <span className="font-medium text-slate-900 text-sm">
                        {formData.name}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-500 text-sm">Department</span>
                      <span className="font-medium text-slate-900 text-sm">
                        {selectedDepartment}
                      </span>
                    </div>
                    <div className="flex justify-between border-b border-slate-200 pb-3">
                      <span className="text-slate-500 text-sm">Date</span>
                      <span className="font-medium text-slate-900 text-sm">
                        {selectedDate?.toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500 text-sm">Time</span>
                      <span className="font-medium text-slate-900 text-sm">
                        {selectedTime}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 w-full max-w-sm mx-auto pt-4">
                    <button className="flex-1 py-2.5 px-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                      <FileText className="w-4 h-4" /> Save Ticket
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDate(null);
                        setSelectedTime(null);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          symptoms: "",
                          dob: "",
                        });
                        setBookingStep("date");
                        setTimeSlotTab("morning");
                      }}
                      className="flex-1 py-2.5 px-4 bg-emerald-600 text-white rounded-xl font-medium hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/20"
                    >
                      New Booking
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}