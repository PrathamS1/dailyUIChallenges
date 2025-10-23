import BackToHome from "./BackToHome";
import { motion } from "framer-motion";

const userProfiles = [
  {
    name: "Kevin",
    avatar:
      "https://img.freepik.com/free-psd/3d-render-avatar-character_23-2150611762.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Vinesh",
    avatar:
      "https://img.freepik.com/free-vector/flat-design-portrait-with-abstract-shapes_23-2149133364.jpg?semt=ais_hybrid&w=740&q=80",
  },
  {
    name: "Personal",
    avatar:
      "https://images.unsplash.com/photo-1640960543409-dbe56ccc30e2?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8cHJvZmlsZXxlbnwwfDJ8MHx8fDI%3D&auto=format&fit=crop&q=60&w=600",
  },
];
export default function UserSelection() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#151515] gap-10 relative overflow-hidden z-10">
      {/* Animated background overlay */}
      <motion.div
        className="absolute inset-0 opacity-100 -z-1"
        animate={{
          background: [
            "radial-gradient(circle at 0% 0%, #232323 0%, transparent 50%)",
            "radial-gradient(circle at 100% 100%, #232323 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, #232323 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, #232323 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <BackToHome challengeTitle="User Selection" challengeDay="64" />

      <motion.h1
        className="text-5xl font-[Poppins] font-medium bg-gradient-to-b from-white to-white/20 bg-clip-text text-transparent"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Choose User Profile
      </motion.h1>

      <div className="flex items-center justify-center text-white font-[DM_Sans] gap-10">
        {userProfiles.map((user, index) => (
          <motion.div
            key={index}
            className="p-4 flex flex-col items-center justify-center gap-8 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
          >
            <motion.div
              className="w-full h-full relative flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="absolute w-[110%] h-[110%] rounded-full bg-gradient-to-br from-[#101010] via-70% via-white/20 to-[#151515] z-1" />
              <motion.img
                src={user.avatar}
                alt={user.name}
                className="z-10 w-44 h-44 rounded-full cursor-pointer"
                whileHover={{
                  rotateY: 180,
                  scale: 1.1,
                }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  duration: 0.8,
                  bounce: 0.3,
                  rotateZ: {
                    duration: 1,
                    ease: "linear",
                  },
                }}
              />
            </motion.div>

            <motion.div className="relative" whileHover={{ scale: 1.05 }}>
              <p className="font-medium text-2xl">{user.name}</p>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
