import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const BackToHome = ({ challengeTitle = "UI Challenge", challengeDay = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link to="/">
        <motion.div
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center space-x-3 bg-white/90 backdrop-blur-lg shadow-lg border border-zinc-200/50 rounded-2xl px-4 py-3 hover:bg-white transition-all"
        >
          <ArrowLeft className="w-4 h-4 text-zinc-600" />
          <div className="hidden sm:block">
            <div className="text-sm font-medium text-zinc-900">Back to Home</div>
            {challengeDay && (
              <div className="text-xs text-zinc-500">Day {challengeDay} - {challengeTitle}</div>
            )}
          </div>
          <Home className="w-4 h-4 text-zinc-600 sm:hidden" />
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default BackToHome;
