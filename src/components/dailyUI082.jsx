import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  Map,
  Briefcase,
  Building,
  FileText,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  Moon,
  Sun,
} from "lucide-react";

const DeveloperForm = () => {
  const [step, setStep] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    city: "",
    state: "",
    country: "",
    role: "",
    company: "",
    bio: "",
  });

  const totalSteps = 3;

  const nextStep = () => setStep((s) => Math.min(s + 1, totalSteps + 1));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputStyles = `w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 
                       rounded-lg px-10 py-2.5 outline-none focus:ring-2 focus:ring-zinc-400 
                       dark:focus:ring-zinc-600 transition-all text-zinc-900 dark:text-zinc-100`;

  const labelStyles = `text-xs font-medium text-zinc-500 dark:text-zinc-400 mb-1.5 block ml-1`;
  const iconStyles = `absolute left-3 top-[38px] text-zinc-400 dark:text-zinc-500 w-4 h-4`;

  return (
    <div>
      <div className="min-h-screen bg-zinc-100 dark:bg-zinc-950 flex flex-col gap-10 items-center justify-center p-6 transition-colors duration-300">
    <h1 className="text-4xl bg-linear-to-br from-zinc-50 to-zinc-700 bg-clip-text font-mono font-semibold text-transparent">Registration Form</h1>

        <div className="w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-xl overflow-hidden">
          <div className="h-1.5 w-full bg-zinc-100 dark:bg-zinc-800 flex">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              className="h-full bg-zinc-900 dark:bg-zinc-100"
            />
          </div>

          <div className="p-8">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <header className="mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      Personal Info
                    </h2>
                    <p className="text-sm text-zinc-500">
                      Let's start with the basics.
                    </p>
                  </header>

                  <div className="relative">
                    <label className={labelStyles}>Full Name</label>
                    <User className={iconStyles} />
                    <input
                      name="name"
                      type="text"
                      placeholder="Pratham Singh"
                      className={inputStyles}
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <label className={labelStyles}>Email Address</label>
                    <Mail className={iconStyles} />
                    <input
                      name="email"
                      type="email"
                      placeholder="email@example.com"
                      className={inputStyles}
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <label className={labelStyles}>Phone Number</label>
                    <Phone className={iconStyles} />
                    <input
                      name="contact"
                      type="tel"
                      placeholder="000 000 0000"
                      className={inputStyles}
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <header className="mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      Location
                    </h2>
                    <p className="text-sm text-zinc-500">
                      Where are you based?
                    </p>
                  </header>

                  <div className="relative">
                    <label className={labelStyles}>Country</label>
                    <Globe className={iconStyles} />
                    <input
                      name="country"
                      type="text"
                      placeholder="India"
                      className={inputStyles}
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="relative">
                      <label className={labelStyles}>State / Prov</label>
                      <Map className={iconStyles} />
                      <input
                        name="state"
                        type="text"
                        placeholder="Maharashtra"
                        className={inputStyles}
                        value={formData.state}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="relative">
                      <label className={labelStyles}>City</label>
                      <MapPin className={iconStyles} />
                      <input
                        name="city"
                        type="text"
                        placeholder="Mumbai"
                        className={inputStyles}
                        value={formData.city}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-4"
                >
                  <header className="mb-6">
                    <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                      Professional
                    </h2>
                    <p className="text-sm text-zinc-500">
                      Tell us about your work.
                    </p>
                  </header>

                  <div className="relative">
                    <label className={labelStyles}>Current Role</label>
                    <Briefcase className={iconStyles} />
                    <input
                      name="role"
                      type="text"
                      placeholder="Software Engineer"
                      className={inputStyles}
                      value={formData.role}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <label className={labelStyles}>Company</label>
                    <Building className={iconStyles} />
                    <input
                      name="company"
                      type="text"
                      placeholder="XYZ Company"
                      className={inputStyles}
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="relative">
                    <label className={labelStyles}>Short Bio</label>
                    <FileText className="absolute left-3 top-[38px] text-zinc-400 dark:text-zinc-500 w-4 h-4" />
                    <textarea
                      name="bio"
                      rows="3"
                      placeholder="Something brief about yourself..."
                      className={`${inputStyles} resize-none`}
                      value={formData.bio}
                      onChange={handleChange}
                    />
                  </div>
                </motion.div>
              )}

              {step > 3 && (
                <motion.div
                  key="success"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center py-10"
                >
                  <div className="flex justify-center mb-4">
                    <CheckCircle2 className="w-16 h-16 text-zinc-900 dark:text-zinc-100" />
                  </div>
                  <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
                    Success!
                  </h2>
                  <p className="text-zinc-500 mt-2">
                    Your developer profile has been registered.
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="mt-8 text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 underline underline-offset-4"
                  >
                    Start Over
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {step <= totalSteps && (
              <div className="flex items-center justify-between mt-10">
                <button
                  onClick={prevStep}
                  disabled={step === 1}
                  className={`flex items-center gap-2 text-sm font-medium transition-colors
                    ${
                      step === 1
                        ? "opacity-0 cursor-default"
                        : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                    }`}
                >
                  <ChevronLeft size={16} /> Back
                </button>

                <button
                  onClick={nextStep}
                  className="bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 px-6 py-2.5 rounded-lg 
                             font-medium text-sm flex items-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 
                             transition-all active:scale-95 shadow-lg shadow-zinc-200 dark:shadow-none"
                >
                  {step === totalSteps ? "Complete" : "Continue"}
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default function DeveloperRegistrationForm() {
  return (
    <>
      <DeveloperForm />
    </>
  );
}
