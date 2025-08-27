import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoIosArrowDown } from "react-icons/io";
import {
  FiEdit2,
  FiTrash2,
  FiShare2,
  FiDownload,
  FiCopy,
  FiEye,
  FiMoreVertical,
  FiSettings,
} from "react-icons/fi";
import { IoNotificationsOutline, IoHelp } from "react-icons/io5";
import { MdAttachMoney } from "react-icons/md";

function MultiselectDropdown() {
  const options = ["React", "Vue", "Angular", "Django", "React Native"];
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState([]);
  const [focused, setFocused] = useState(false);
  const [clicked, setClicked] = useState(false);

  const toggleOption = (opt) => {
    setSelected((prev) =>
      prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
    );
  };

  return (
    <div className="w-80 mx-auto my-8 relative shadow-2xl h-fit">
      <motion.div
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseDown={() => setClicked(true)}
        onMouseUp={() => setClicked(false)}
        onClick={() => setOpen((o) => !o)}
        className={`bg-white border border-black rounded-lg px-4 py-3 cursor-pointer flex flex-wrap gap-2 shadow-md outline-none transition-all duration-150 ${
          focused ? "ring-1 ring-black ring-offset-2" : ""
        } ${clicked ? "scale-95 bg-gray-100" : ""}`}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selected.length === 0 ? (
          <span className="text-gray-500">Select frameworks...</span>
        ) : (
          selected.map((opt) => (
            <span
              key={opt}
              className="bg-black text-white px-2 py-1 rounded text-xs"
            >
              {opt}
            </span>
          ))
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
            className="bg-white border absolute w-full overflow-hidden border-black rounded-lg mt-2 shadow-lg z-10"
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
                  type="checkbox"
                  checked={selected.includes(opt)}
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

function ActionDropdown() {
  const actions = [
    { label: "Edit", icon: <FiEdit2 /> },
    { label: "Delete", icon: <FiTrash2 /> },
    { label: "Share", icon: <FiShare2 /> },
    { label: "Download", icon: <FiDownload /> },
    { label: "Copy", icon: <FiCopy /> },
    { label: "Preview", icon: <FiEye /> },
  ];
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <div className="w-64 mx-auto my-8 relative shadow-2xl h-fit">
      <button
        className={`"bg-white border w-full border-black rounded-full px-4 py-2 shadow-md flex items-center gap-2" + ${
          focused ? "ring-1 ring-black/50 ring-offset-2" : ""
        } ${clicked ? "scale-95 bg-gray-100" : ""}`}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseDown={() => setClicked(true)}
        onMouseUp={() => setClicked(false)}
      >
        <span className="text-black">
          <FiMoreVertical size={20} />
        </span>
        <span className="ml-2 text-gray-600">Quick Actions</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white border overflow-hidden w-full absolute border-black rounded-lg mt-2 shadow-lg z-10"
            role="menu"
          >
            {actions.map((act) => (
              <div
                key={act.label}
                className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 gap-2"
                role="menuitem"
                tabIndex={0}
              >
                <span className="mr-2 text-lg text-black">{act.icon}</span>
                <span className="text-black">{act.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [clicked, setClicked] = useState(false);
  const menuOptions = [
    { label: "Profile", icon: <FiEye /> },
    { label: "Settings", icon: <FiSettings /> },
    { label: "Notifications", icon: <IoNotificationsOutline /> },
    { label: "Billing", icon: <MdAttachMoney /> },
    { label: "Help", icon: <IoHelp /> },
    { label: "Logout", icon: <FiTrash2 /> },
  ];
  return (
    <div className="w-64 mx-auto my-8 flex flex-col items-center relative shadow-2xl h-fit">
      <motion.div
        className={`flex items-center gap-3 cursor-pointer justify-between border-1 rounded-xl px-4 py-2 w-full outline-none transition-all duration-150 ${
          focused ? "ring-1 ring-black ring-offset-2" : ""
        } ${clicked ? "scale-95 bg-gray-100" : ""}`}
        tabIndex={0}
        onClick={() => setOpen((o) => !o)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onMouseDown={() => setClicked(true)}
        onMouseUp={() => setClicked(false)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white font-bold text-xl">
          P
        </div>
        <span className="text-black font-medium">Pratham Singh</span>
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
            className="bg-white border overflow-hidden absolute top-16 border-black rounded-lg mt-2 shadow-lg w-full z-10"
            role="menu"
          >
            {menuOptions.map((opt, idx) => (
              <div
                key={opt.label}
                className={`flex items-center px-4 py-2 cursor-pointer hover:bg-gray-200 gap-2 ${idx === menuOptions.length - 1 ? "text-red-600" : "text-black"}`}
                role="menuitem"
                tabIndex={0}
              >
                <span className="mr-2 text-lg">{opt.icon}</span>
                <span>{opt.label}</span>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DropdownShowcase() {
  return (
    <div className="w-full h-screen bg-[url('/dropbg.jpg')] bg-cover bg-no-repeat">
      <h1 className="text-5xl font-bold text-black w-full text-center font-[Inter] py-10">
        Dropdowns
      </h1>
      <div className="w-full flex justify-center h-[70%]">
        <MultiselectDropdown />
        <ActionDropdown />
        <ProfileDropdown />
      </div>
    </div>
  );
}