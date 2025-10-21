import { BsGithub, BsGoogle, BsLinkedin } from "react-icons/bs";
import BackToHome from "./BackToHome";
import { EyeClosed } from "lucide-react";
import { BiError } from "react-icons/bi";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const leftVariants = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const rightVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
  },
};

export default function SignUpForm() {
  return (
    <motion.div
      className="w-full h-screen flex items-center justify-center"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <BackToHome />
      <motion.div
        className="w-3/4 h-4/5 flex flex-wrap items-center justify-center relative font-[DM_Sans]"
        variants={itemVariants}
      >
        <motion.div
          className="w-full h-full absolute -inset-1 bg-gradient-to-br from-zinc-900 via-5% via-zinc-100 to-white/0 -z-1"
          variants={itemVariants}
        />
        <motion.div
          className="w-1/2 h-full bg-blue-400"
          variants={leftVariants}
        >
          <img
            src="https://img.freepik.com/free-vector/access-control-system-abstract-concept-vector-illustration-security-system-authorize-entry-login-credentials-electronic-access-password-passphrase-pin-verification-abstract-metaphor_335657-5746.jpg?semt=ais_hybrid&w=740&q=80"
            className="w-full h-full object-cover"
            alt=""
          />
        </motion.div>
        <motion.div
          className="w-1/2 h-full bg-zinc-100 flex flex-col items-center"
          variants={rightVariants}
        >
          <motion.div
            className="flex flex-col items-center justify-center w-full pt-10 relative"
            variants={itemVariants}
          >
            <motion.div
              className="absolute inset-10 w-4 h-4 bg-zinc-800"
              variants={itemVariants}
            />
            <motion.div
              className="absolute inset-11 w-4 h-4 bg-zinc-300"
              variants={itemVariants}
            />
            <motion.p
              className="text-sm font-semibold bg-zinc-900 px-5 py-1 text-zinc-200"
              variants={itemVariants}
            >
              Sign up
            </motion.p>
            <motion.h2
              className="text-2xl font-bold"
              variants={itemVariants}
            >
              Create Your Account
            </motion.h2>
          </motion.div>
          <motion.div
            className="w-full p-10 grid grid-cols-1 gap-4"
            variants={containerVariants}
          >
            <motion.div
              className="grid grid-cols-1 gap-2"
              variants={itemVariants}
            >
              <motion.h2
                className="font-regular text-md"
                variants={itemVariants}
              >
                Email
              </motion.h2>
              <motion.input
                type="email"
                className="p-2 border border-gray-400 focus:outline-zinc-500 rounded-lg w-full"
                placeholder="name@example.com"
                variants={itemVariants}
              />
            </motion.div>
            <motion.div
              className="grid grid-cols-1 gap-2 relative"
              variants={itemVariants}
            >
              <EyeClosed size={16} className="absolute right-4 top-11" />
              <motion.h2
                className="font-regular text-md"
                variants={itemVariants}
              >
                Create Password
              </motion.h2>
              <motion.input
                type="password"
                className="p-2 border border-gray-400 focus:outline-zinc-500 rounded-lg w-full"
                placeholder="Create a password"
                variants={itemVariants}
              />
            </motion.div>
            <motion.div
              className="grid grid-cols-1 gap-2 relative"
              variants={itemVariants}
            >
              <EyeClosed size={16} className="absolute right-4 top-11" />
              <BiError size={16} className="absolute right-10 top-11" />
              <motion.h2
                className="font-regular text-md"
                variants={itemVariants}
              >
                Confirm Password
              </motion.h2>
              <motion.input
                type="password"
                className="p-2 border border-gray-400 focus:outline-zinc-500 rounded-lg w-full"
                placeholder="Retype your password"
                variants={itemVariants}
              />
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants}>
            <motion.button
              className="px-12 py-3 bg-gradient-to-br from-30% from-zinc-600 via-65% via-zinc-400 to-zinc-900 font-medium text-white text-xl tracking-widest cursor-pointer"
              whileHover={{
                background: "linear-gradient(to bottom right, #18181b 30%, #a1a1aa 65%, #09090b)",
                scale: 1.01,
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              variants={itemVariants}
            >
              Sign Up
            </motion.button>
          </motion.div>
          <hr
            className="bg-zinc-900 w-3/4 h-px opacity-50 mt-4"
          />
          <motion.div
            className="flex w-full mt-4 items-center justify-center gap-8"
            variants={itemVariants}
          >
            <motion.div
              whileHover={{ y: -4, boxShadow: "0px 4px 1px #ccc" }}
              transition={{ duration: 0.2 }}
            >
              <BsGoogle className="cursor-pointer" size={24} />
            </motion.div>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0px 4px 1px #ccc" }}
              transition={{ duration: 0.2 }}
            >
              <BsGithub className="cursor-pointer" size={24} />
            </motion.div>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0px 4px 1px #ccc" }}
              transition={{ duration: 0.2 }}
            >
              <BsLinkedin className="cursor-pointer" size={24} />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
