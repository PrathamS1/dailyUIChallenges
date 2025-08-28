import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaQuestionCircle,
  FaComments,
  FaPhoneAlt,
  FaUsers,
  FaTicketAlt,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import {
  BookOpen,
  CheckCheckIcon,
  Copy,
  MessageSquare,
  Star,
  Users,
  X,
} from "lucide-react";
import { LiaLinkedin } from "react-icons/lia";
import { BsGithub } from "react-icons/bs";
import { Link } from "react-router-dom";

function SupportCard({ icon, title, desc }) {
  return (
    <div className="flex flex-col items-start gap-3 bg-[#f7f8fa] border border-emerald-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all w-[14rem] min-w-[14rem] max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[14rem] xl:max-w-[14rem]">
      <div className="flex items-center justify-center gap-2">
        <div className="flex-shrink-0">{icon}</div>
        <h3 className="font-semibold text-[#222] text-base mb-1">{title}</h3>
      </div>
      <div className="flex-grow">
        <p className="text-sm text-[#444]">{desc}</p>
      </div>
    </div>
  );
}
const issueTypes = [
  { value: "billing", label: "Billing Issue" },
  { value: "technical", label: "Technical Issue" },
  { value: "general", label: "General Query" },
];

function ContactForm() {
  const [step, setStep] = useState(1);
  const [issueType, setIssueType] = useState([]);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    details: "",
    files: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleFiles(e) {
    setForm((prev) => ({
      ...prev,
      files: Array.from(e.target.files),
    }));
  }

  function handleNext(e) {
    e.preventDefault();
    if (
      step === 1 &&
      issueType.length > 0 &&
      form.email &&
      form.name &&
      form.contact
    )
      setStep(2);
    else if (step === 2 && form.details) setStep(3);
  }

  function handleBack(e) {
    e.preventDefault();
    if (step > 1) setStep(step - 1);
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess(true);
    setStep(1);
    setIssueType("");
    setForm({ name: "", email: "", contact: "", details: "", files: [] });
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="w-full max-w-md bg-white border border-emerald-300 rounded-2xl shadow-xl p-6 flex flex-col gap-4"
    >
      <div className="mb-2 text-green-600 font-semibold text-sm flex items-center gap-2 mx-auto">
        {success ? (
          "Form Completed"
        ) : (
          <>
            <motion.span
              className="inline-flex gap-2 ml-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className={`w-2 h-2 rounded-full bg-green-400 inline-block ${
                    step - 1 === i ? "scale-125 bg-green-600" : "opacity-60"
                  }`}
                  animate={{
                    scale: step - 1 === i ? 1.5 : 1,
                    opacity: step - 1 === i ? 0.7 : 0.6,
                  }}
                />
              ))}
            </motion.span>
          </>
        )}
      </div>
      <AnimatePresence mode="wait">
        {success ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center justify-center py-8"
          >
            <motion.div
              className="relative w-20 h-20 mb-4 rounded-full flex items-center justify-center"
              initial={{
                background: "conic-gradient(#16a34a 0deg, #e5e7eb 0deg)",
              }}
              animate={{
                background: "conic-gradient(#16a34a 360deg, #e5e7eb 360deg)",
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            >
              <div className="absolute inset-1 bg-white rounded-full flex items-center justify-center">
                <CheckCheckIcon size={36} className="text-[#16a34a]" />
              </div>
            </motion.div>
            <div className="text-lg text-[#222] font-semibold mb-2">
              Request Submitted!
            </div>
            <div className="text-[#444] text-center">
              Thank you for reaching out. Our team will get back to you soon.
            </div>
            <div className="text-[#444] text-center mt-4 flex items-center gap-2">
              Your ticket id is{" "}
              <span className="font-mono bg-green-200 px-2 py-1 rounded">
                #123456
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="cursor-pointer group"
                onClick={() => navigator.clipboard.writeText("#123456")}
              >
                <Copy size={14} />
                <span className="text-sm group-focus:block absolute hidden ">
                  Copied
                </span>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key={step}
            onSubmit={step === 3 ? handleSubmit : handleNext}
            className="flex flex-col gap-4"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {step === 1 && (
              <>
                <label className="text-[#222] font-medium mb-1">
                  Select Issue Type
                </label>
                <Dropdown
                  options={issueTypes.map((type) => type.label)}
                  selected={issueType}
                  setSelected={setIssueType}
                />
                <label className="text-[#222] font-medium mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="border border-[#353637] rounded-lg p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#16a34a]"
                  required
                />
                <label className="text-[#222] font-medium mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="example@example.com"
                  className="border border-[#353637] rounded-lg p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#16a34a]"
                  required
                />
                <label className="text-[#222] font-medium mb-1">
                  Contact Number
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                  placeholder="Enter your contact number"
                  className="border border-[#353637] rounded-lg p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-offset-2 focus:ring-[#16a34a]"
                  required
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="submit"
                    className="bg-[#16a34a] text-white rounded-lg py-2 px-4 font-semibold hover:bg-[#15803d] transition-all w-full"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <label className="text-[#222] font-medium mb-1">
                  Describe Your Issue
                </label>
                <textarea
                  name="details"
                  value={form.details}
                  onChange={handleChange}
                  className="border border-[#414142] rounded-lg p-2 mb-2 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-[#0ad755]"
                  rows={4}
                  required
                />
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-[#e5e7eb] text-[#222] rounded-lg py-2 px-4 font-semibold hover:bg-[#d1d5db] transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#16a34a] text-white rounded-lg py-2 px-4 font-semibold hover:bg-[#15803d] transition-all"
                  >
                    Next
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <label className="text-[#222] font-medium mb-1">
                  Attach Files (optional)
                </label>
                <div className="border-2 border-dashed border-[#16a34a] rounded-lg p-4 flex flex-col items-center justify-center bg-[#f7f8fa] mb-2">
                  <input
                    type="file"
                    name="files"
                    multiple
                    accept="image/*,application/pdf"
                    onChange={handleFiles}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <span className="text-[#16a34a] font-semibold mb-1">
                      Click to select files
                    </span>
                    <span className="text-xs text-[#444]">
                      You can attach screenshots or documents (jpg, png, pdf)
                    </span>
                  </label>
                  {form.files.length > 0 && (
                    <div className="mt-2 w-full">
                      <ul className="text-xs text-[#222]">
                        {form.files.map((file, idx) => (
                          <li key={idx} className="truncate">
                            {file.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex gap-2 mt-2">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="bg-[#e5e7eb] text-[#222] rounded-lg py-2 px-4 font-semibold hover:bg-[#d1d5db] transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-[#16a34a] text-white rounded-lg py-2 px-4 font-semibold hover:bg-[#15803d] transition-all"
                  >
                    Submit
                  </button>
                </div>
              </>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function Dropdown({ options, selected, setSelected }) {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [clicked, setClicked] = useState(false);

  const toggleOption = (opt) => {
    setSelected([opt]);
  };

  return (
    <div className="w-full relative h-fit">
      <motion.div
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseDown={() => setClicked(true)}
        onMouseUp={() => setClicked(false)}
        onClick={() => setOpen((o) => !o)}
        className={`bg-white border border-[#222] rounded-lg px-4 py-3 cursor-pointer flex flex-wrap gap-2 shadow-md outline-none transition-all duration-150 ${
          focused ? "ring-1 ring-[#16a34a] ring-offset-2" : ""
        } ${clicked ? "scale-95 bg-gray-100" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected.length === 0 ? (
          <span className="text-gray-500">Select issue type...</span>
        ) : (
          <span className="text-[#222] px-2 py-1 rounded text-sm">
            {selected[0]}
          </span>
        )}
        <motion.span
          className="ml-auto text-black flex items-center"
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <IoIosArrowDown size={18} />
        </motion.span>
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white border absolute w-full overflow-hidden border-[#222] rounded-lg mt-2 shadow-lg z-10"
            role="listbox"
          >
            {options.map((opt) => (
              <div
                key={opt}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                onClick={() => toggleOption(opt)}
                tabIndex={0}
                role="option"
                aria-selected={selected.includes(opt)}
              >
                <input
                  type="radio"
                  checked={selected[0] === opt}
                  readOnly
                  className="accent-black mr-2"
                />
                <span className="text-black">{opt}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const faqData = [
  {
    question: "How do I reset my password?",
    answer:
      "Go to Account Settings > Security and click 'Reset Password'. Follow the instructions sent to your email.",
  },
  {
    question: "How can I track my support ticket?",
    answer:
      "Use the 'Track Ticket' feature on the Contact page or check your email for ticket updates.",
  },
  {
    question: "What payment methods are accepted?",
    answer:
      "We accept credit/debit cards, PayPal, and UPI. For more details, visit our Payments FAQ.",
  },
  {
    question: "How do I contact live support?",
    answer:
      "Click the 'Live Chat' button on the Contact page to connect instantly with our team.",
  },
  {
    question: "Where can I find product documentation?",
    answer:
      "Documentation is available in the footer links or via the Help Center search above.",
  },
  {
    question: "How do I update my account information?",
    answer:
      "Go to Account Settings and edit your profile details. Changes are saved automatically.",
  },
];

function FAQSection() {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState(null);
  const [category, setCategory] = useState("All");
  const categories = ["All", "Billing", "Technical", "General"];
  // Assign categories to FAQ data
  const faqWithCat = faqData.map((faq, i) => ({
    ...faq,
    category:
      i === 0
        ? "Technical"
        : i === 1
        ? "General"
        : i === 2
        ? "Billing"
        : i === 3
        ? "General"
        : i === 4
        ? "Technical"
        : "General",
  }));
  const filteredFaqs = faqWithCat.filter(
    (faq) =>
      (category === "All" || faq.category === category) &&
      (faq.question.toLowerCase().includes(search.toLowerCase()) ||
        faq.answer.toLowerCase().includes(search.toLowerCase()))
  );

  function highlight(text) {
    if (!search) return text;
    const regex = new RegExp(`(${search})`, "gi");
    return text.split(regex).map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="bg-yellow-200 text-black rounded px-1">
          {part}
        </span>
      ) : (
        part
      )
    );
  }

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="mb-6 flex flex-wrap gap-2 justify-center"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08 } },
        }}
      >
        {categories.map((cat, i) => (
          <motion.button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all border border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 ${
              category === cat
                ? "bg-green-400 text-white shadow-lg scale-105"
                : "bg-white text-green-800 hover:bg-green-50"
            }`}
            aria-pressed={category === cat}
            whileHover={{ scale: 1.07, boxShadow: "0 2px 8px #16a34a22" }}
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.07 }}
          >
            {cat}
          </motion.button>
        ))}
      </motion.div>

      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <div className="relative">
          <motion.input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search FAQs..."
            className="w-full border border-[#222] rounded-lg py-3 px-4 text-[#222] bg-white focus:outline-none focus:ring-2 focus:ring-[#16a34a] placeholder:text-gray-500 text-xl shadow-sm"
            aria-label="Search FAQs"
            whileFocus={{ scale: 1.02, boxShadow: "0 2px 12px #16a34a22" }}
            whileHover={{ scale: 1.01 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-green-800">
            <FaQuestionCircle size={24} />
          </span>
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.09 } },
        }}
      >
        {filteredFaqs.length === 0 ? (
          <motion.div
            className="text-center text-[#444] py-8 text-2xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            No FAQs found.
            <br />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-400 text-black my-10 font-semibold rounded-full shadow-lg hover:bg-green-300 transition"
            >
              Contact Support
            </motion.button>
          </motion.div>
        ) : (
          filteredFaqs.map((faq, idx) => (
            <motion.div
              key={faq.question}
              className="bg-gray-100 rounded-xl shadow-sm overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <motion.button
                className={`w-full text-left px-6 py-6 flex items-center justify-between focus:outline-none focus:ring-1 focus:ring-[#16a34a] transition-all ${
                  openIdx === idx ? "bg-[#f7f8fa]" : ""
                }`}
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                aria-expanded={openIdx === idx}
                whileHover={{ scale: 1.01, backgroundColor: "#f7f8fa" }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="font-bold text-[#222] text-2xl leading-tight">
                  {highlight(faq.question)}
                </span>
                <div className="flex items-center justify-center">
                  <span className="ml-2 px-3 py-1 text-xs rounded-full bg-green-300 text-emerald-700 font-semibold">
                    {faq.category}
                  </span>
                  <motion.span
                    animate={{ rotate: openIdx === idx ? 180 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className={`ml-2 text-[#16a34a]`}
                  >
                    <IoIosArrowDown size={28} />
                  </motion.span>
                </div>
              </motion.button>
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 py-6 text-[#444] text-lg leading-relaxed"
                  >
                    {highlight(faq.answer)}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))
        )}
      </motion.div>
    </motion.div>
  );
}

export default function ContactPage() {
  const [ticketId, setTicketId] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [expand, setExpand] = useState(false);
  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };
  const ticketData = {
    id: ticketId || "SUP-2025-08921",
    status: ticketId === "closed" ? "Closed" : "In Progress",
    createdAt: "2025-08-27",
    issueType: "Billing Issue",
    name: "Marx Carter",
    email: "marx.carter@gmail.com",
    description:
      "I was charged twice for my monthly subscription plan. One payment on Aug 25th and another on Aug 27th. Please refund the duplicate transaction.",
    files: ["invoice-aug25.pdf", "bank-statement.png"],
  };

  return (
    <>
      <motion.nav
        className="w-full px-12 sticky top-0 z-50 py-4 flex items-center justify-between bg-gradient-to-r from-green-100 to-[#e4f7e9] backdrop-blur-lg"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
      >
        <motion.h3
          className="text-2xl font-extrabold text-green-800 tracking-widest flex items-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="bg-gradient-to-r from-[#06431c] via-green-800 to-[#16a34a] bg-clip-text text-transparent">
            CREW
          </span>
          <span className="text-green-500">SPHERE</span>
        </motion.h3>
        <motion.div
          className="flex items-center gap-4"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {[
            { name: "Home", href: "/contact", active: false },
            { name: "Services", href: "/contact", active: false },
            { name: "Contact Us", href: "/contact", active: true },
          ].map((item) => (
            <motion.div
              key={item.name}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <Link
                to={item.href}
                className={`relative font-[Roboto] px-2 py-1 text-lg transition-colors duration-200 ${
                  item.active ? "text-[#16a34a] font-bold" : "text-green-900"
                } group`}
              >
                {item.name}
                <motion.span
                  layoutId="nav-underline"
                  className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-green-500 rounded transition-all duration-300 group-hover:w-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </motion.nav>
      <main>
        {/* hero */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100/10 via-80% via-green-700/20 to-[#e4f7e9] overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.12, scale: 1 }}
            transition={{ duration: 1.2 }}
            className="absolute -top-32 -left-32 w-96 h-96 bg-green-500 rounded-full blur-[1px] z-40"
          />
          <div className="w-full h-full flex flex-col md:flex-row gap-8 relative z-10">
            <div className="flex md:w-[60%] sm:w-full flex-col px-12 justify-center">
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="text-4xl md:text-6xl font-extrabold text-[#222] mb-2 leading-tight"
              >
                We're here to{" "}
                <span className="bg-gradient-to-r from-[#16a34a] via-green-500 to-[#16a34a] bg-clip-text text-transparent">
                  help, anytime.
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-[#444] mb-6 max-w-xl"
              >
                Our support team is always ready to help you troubleshoot,
                answer questions, and guide you toward solutions.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex items-center gap-3 mb-4"
              >
                <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full font-semibold text-base shadow">
                  99% satisfaction rate
                </span>
                <span className="text-gray-400 text-sm">|</span>
                <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-semibold text-base shadow">
                  Avg. response: &lt;24h
                </span>
              </motion.div>
              <motion.div
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.12 } },
                }}
                className="flex flex-wrap gap-4 w-full items-start justify-start"
              >
                <AnimatePresence>
                  {[
                    {
                      icon: (
                        <FaQuestionCircle
                          className="text-green-500"
                          size={24}
                        />
                      ),
                      title: "FAQ",
                      desc: "Browse common questions and quick solutions.",
                      scrollTo: "faq-section",
                    },
                    {
                      icon: <FaComments className="text-green-500" size={24} />,
                      title: "Live Chat",
                      desc: "Chat with our support team in real time.",
                    },
                    {
                      icon: <FaPhoneAlt className="text-green-500" size={24} />,
                      title: "Phone Support",
                      desc: "Call us during business hours for urgent help.",
                    },
                    {
                      icon: <FaUsers className="text-green-500" size={24} />,
                      title: "Community Forum",
                      desc: "Get help from our user community.",
                      scrollTo: "community-section",
                    },
                    {
                      icon: (
                        <FaTicketAlt className="text-green-500" size={24} />
                      ),
                      title: "Track Ticket",
                      desc: "Check the status of your support requests.",
                      scrollTo: "track-section",
                    },
                  ].map((card, idx) => (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                      <div
                        className={card.scrollTo ? "cursor-pointer" : ""}
                        onClick={() => {
                          if (card.scrollTo) {
                            const el = document.getElementById(card.scrollTo);
                            if (el) {
                              el.scrollIntoView({ behavior: "smooth" });
                            }
                          }
                        }}
                      >
                        <SupportCard
                          icon={card.icon}
                          title={card.title}
                          desc={card.desc}
                        />
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <ContactForm />
            </div>
          </div>
        </section>

        {/* FAQ section */}
        <motion.section
          id="faq-section"
          className="w-full min-h-screen flex flex-col items-center justify-start py-12 px-2 relative"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, rotate: 25 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.2, delay: 0.2 }}
            className="absolute w-[20rem] h-[20rem] drop-shadow-[0_5px_4px_#0edc7f] top-1/3 right-12 rotate-12 overflow-hidden pointer-events-none select-none hidden sm:block md:w-[16rem] md:h-[16rem] lg:w-[20rem] lg:h-[20rem]"
          >
            <img
              src="/faq.png"
              className="object-cover w-full h-full"
              alt="faq png"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="max-w-2xl w-full mx-auto"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-5xl text-center font-bold text-[#222] mb-8"
            >
              Frequently Asked Questions (FAQs)
            </motion.h2>
            <FAQSection />
          </motion.div>
        </motion.section>
        <div className="w-[68%] mx-auto rounded-4xl border-b border-green-600"></div>
        <div className="w-[78%] mx-auto rounded-4xl border-b border-green-400 mt-1"></div>

        {/* Track Ticket */}
        <motion.section
          id="track-section"
          className="w-full py-16 px-4"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full mx-auto p-8"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl text-center font-bold text-[#111] mb-4"
            >
              Track Your Ticket
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl text-center text-[#555] mb-6"
            >
              Enter your ticket ID below to check the status of your support
              request.
            </motion.p>

            <motion.form
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              onSubmit={(e) => {
                e.preventDefault();
                setShowResult(true);
                setExpand(false);
              }}
              className="w-full max-w-xl mx-auto mt-12 px-4"
            >
              <div className="relative flex items-center gap-3 bg-white/80 backdrop-blur-lg border border-gray-200 shadow-md rounded-2xl p-2 transition-all">
                <motion.input
                  whileFocus={{ scale: 1.01 }}
                  type="text"
                  value={ticketId}
                  onChange={(e) => setTicketId(e.target.value)}
                  placeholder="Enter your Ticket ID"
                  className="flex-1 bg-transparent placeholder-gray-400 text-gray-800 px-4 py-3 text-lg focus:outline-none"
                  required
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white px-6 py-2.5 rounded-xl font-semibold text-lg shadow-sm hover:bg-[#15803d] transition-all"
                >
                  Check
                </motion.button>
              </div>
            </motion.form>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-10"
              >
                <div
                  onClick={() => setExpand(!expand)}
                  className="w-full cursor-pointer flex items-center justify-between text-center border border-green-800 rounded-xl p-6 shadow-sm"
                >
                  <div>
                    <p className="text-sm text-gray-500">Ticket ID</p>
                    <p className="font-semibold text-xl">{ticketData.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Status</p>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        ticketData.status === "Open"
                          ? "bg-green-100 text-green-700"
                          : ticketData.status === "In Progress"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {ticketData.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-center gap-8">
                    <div>
                      <p className="text-sm text-gray-500">Created At</p>
                      <p className="font-semibold text-xl">
                        {ticketData.createdAt}
                      </p>
                    </div>
                    <motion.span
                      className="ml-auto text-green-500 flex items-center"
                      animate={{ rotate: expand ? 180 : 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                    >
                      <IoIosArrowDown size={18} />
                    </motion.span>
                  </div>
                </div>

                <AnimatePresence>
                  {expand && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="mt-6 bg-white border border-green-700 rounded-2xl shadow-sm p-6 space-y-6"
                    >
                      <div className="flex justify-between items-center border-b pb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            Ticket #{ticketData.id}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Created on {ticketData.createdAt}
                          </p>
                        </div>
                        <span
                          className={`px-4 py-1 text-sm font-medium rounded-full ${
                            ticketData.status === "Open"
                              ? "bg-green-100 text-green-700"
                              : ticketData.status === "In Progress"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {ticketData.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <div>
                          <p className="text-sm text-gray-500">Issue Type</p>
                          <p className="font-medium">{ticketData.issueType}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Customer</p>
                          <p className="font-medium">{ticketData.name}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{ticketData.email}</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 border-l-4 border-emerald-400 p-4 rounded-lg">
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="mt-1 text-gray-700">
                          {ticketData.description}
                        </p>
                      </div>

                      <div>
                        <p className="text-sm text-gray-500 mb-2">
                          Attached Files
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {ticketData.files.length > 0 ? (
                            ticketData.files.map((file, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 text-sm bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300"
                              >
                                {file}
                              </span>
                            ))
                          ) : (
                            <span className="text-gray-400">None</span>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </motion.div>
        </motion.section>

        {/* Community */}
        <motion.section
          id="community-section"
          className="relative w-full py-20 bg-gradient-to-br from-white via-gray-50 to-white text-gray-900"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 80 }}
        >
          <div className="absolute -top-20 -left-20 w-72 h-72 z-20 bg-green-500 rounded-full blur-[100px] opacity-30"></div>
          <div className="absolute inset-0 opacity-100 bg-[url('/dropbg.jpg')] bg-cover bg-top"></div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative text-center max-w-3xl mx-auto mb-16"
          >
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl font-extrabold tracking-tight"
            >
              Join the <span className="text-green-500">Community</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-4 text-gray-500 text-lg"
            >
              Connect with others, find support, and help shape the future of
              our platform.
            </motion.p>
          </motion.div>

          <motion.div
            className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.18 },
              },
            }}
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="p-8 bg-white border border-white/10 rounded-2xl shadow-lg hover:shadow-green-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-green-500/10 text-green-500 text-2xl">
                  <MessageSquare />
                </div>
                <h3 className="text-xl font-semibold">Discussion Forum</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Ask questions, share knowledge, and engage with the community.
              </p>
            </motion.div>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="p-8 bg-white border border-white/10 rounded-2xl shadow-lg hover:shadow-green-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-green-500/10 text-green-500 text-2xl">
                  <BookOpen />
                </div>
                <h3 className="text-xl font-semibold">Knowledge Base</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Browse tutorials, step-by-step guides, and best practices.
              </p>
            </motion.div>

            {/* Feature Requests */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="p-8 bg-white border border-white/10 rounded-2xl shadow-lg hover:shadow-green-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-green-500/10 text-green-500 text-2xl">
                  <Star />
                </div>
                <h3 className="text-xl font-semibold">Feature Requests</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Share your ideas and vote on new features to shape our product.
              </p>
            </motion.div>

            {/* User Stories */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="p-8 bg-white border border-white/10 rounded-2xl shadow-lg hover:shadow-green-500/20"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-full bg-green-500/10 text-green-500 text-2xl">
                  <Users />
                </div>
                <h3 className="text-xl font-semibold">User Stories</h3>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">
                Learn how others use the platform and get inspired.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="relative mt-16 text-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-green-500 text-black font-semibold rounded-full shadow-lg hover:bg-green-400 transition"
            >
              Go to Community
            </motion.button>
          </motion.div>
        </motion.section>

        <footer className="relative w-full bg-gradient-to-br from-black via-gray-950 to-green-950 text-white pt-20 pb-30 px-8 overflow-hidden">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex flex-col justify-between"
            >
              <h2 className="text-2xl font-bold tracking-wide">
                Crewsphere<span className="text-green-400">.</span>
              </h2>
              <p className="mt-4 text-gray-400 text-sm max-w-xs">
                Building tools that empower developers and businesses worldwide.
              </p>
              <div className="flex space-x-5 mt-6">
                <a className="text-gray-400 hover:text-green-400 transition duration-300">
                  <X className="w-6 h-6" />
                </a>
                <a className="text-gray-400 hover:text-green-400 transition duration-300">
                  <LiaLinkedin className="w-6 h-6" />
                </a>
                <a className="text-gray-400 hover:text-green-400 transition duration-300">
                  <BsGithub className="w-6 h-6" />
                </a>
              </div>
            </motion.div>

            {[
              {
                title: "Company",
                links: ["About Us", "Careers", "Contact"],
              },
              {
                title: "Resources",
                links: ["Documentation", "API Reference", "Community Forum"],
              },
              {
                title: "Product",
                links: ["Product Updates", "Pricing", "Changelog"],
              },
            ].map((col) => (
              <motion.div
                key={col.title}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className=""
              >
                <h3 className="text-lg font-semibold text-green-400">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2 text-gray-300">
                  {col.links.map((link, i) => (
                    <motion.li
                      key={link}
                      variants={linkVariants}
                      custom={i}
                      whileHover={{ x: 5 }}
                      className="group"
                    >
                      <a
                        href="#"
                        className="relative inline-block transition-colors duration-300 group-hover:text-green-400"
                      >
                        {link}
                        <span className="absolute left-0 -bottom-0.5 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                      </a>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative z-10 mt-16 border-t border-gray-800 pt-6 text-center text-gray-500 text-sm"
          >
            © {new Date().getFullYear()} Crewsphere. All rights reserved.
          </motion.div>
          <motion.div
            animate={{ opacity: [0.08, 0.15, 0.08], scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-20 -left-20 w-72 h-72 bg-green-500 rounded-full blur-3xl"
          ></motion.div>
          <motion.div
            animate={{ opacity: [0.08, 0.2, 0.08], scale: [1, 1.1, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-green-700 rounded-full blur-3xl"
          ></motion.div>
          <h1 className="text-[13rem] absolute top-60 left-1/2 -translate-x-1/2 z-1 font-[Roboto] tracking-widest font-extrabold bg-gradient-to-b from-[#012907] via-emerald-800/20 to-white/10 bg-clip-text text-transparent">
            CREWSPHERE
          </h1>
        </footer>
      </main>
    </>
  );
}