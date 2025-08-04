import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  Crown,
  CreditCard,
  LogIn,
  X,
} from "lucide-react";
import BackToHome from "./BackToHome";

const FlashMessage = ({ message, onDismiss }) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (!message || isPaused) return;

    const duration =
      message.type === "error"
        ? 6000
        : message.category === "subscription"
        ? 5000
        : 4000;
    const interval = 50;
    const decrement = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= 0) {
          onDismiss();
          return 0;
        }
        return prev - decrement;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [message, isPaused, onDismiss]);

  useEffect(() => {
    if (message) {
      setProgress(100);
    }
  }, [message]);

  if (!message) return null;

  const getIcon = () => {
    const iconClass = "w-5 h-5";

    if (message.category === "login") {
      return message.type === "success" ? (
        <LogIn className={iconClass} />
      ) : (
        <AlertTriangle className={iconClass} />
      );
    } else if (message.category === "upload") {
      return message.type === "success" ? (
        <CheckCircle className={iconClass} />
      ) : (
        <XCircle className={iconClass} />
      );
    } else if (message.category === "subscription") {
      return message.type === "success" ? (
        <Crown className={iconClass} />
      ) : (
        <CreditCard className={iconClass} />
      );
    }

    return message.type === "success" ? (
      <CheckCircle className={iconClass} />
    ) : (
      <XCircle className={iconClass} />
    );
  };

  const getThemeClasses = () => {
    const baseClasses = "bg-white shadow-lg";

    if (message.category === "login") {
      return message.type === "success"
        ? `${baseClasses} border-l-4 border-l-blue-400 border border-blue-100`
        : `${baseClasses} border-l-4 border-l-orange-400 border border-red-100`;
    } else if (message.category === "upload") {
      return message.type === "success"
        ? `${baseClasses} border-l-4 border-l-green-400 border border-green-100`
        : `${baseClasses} border-l-4 border-l-red-400 border border-red-100`;
    } else if (message.category === "subscription") {
      return message.type === "success"
        ? `${baseClasses} border-l-4 border-l-purple-400 border border-purple-100`
        : `${baseClasses} border-l-4 border-l-pink-400 border border-red-100`;
    }

    return message.type === "success"
      ? `${baseClasses} border border-green-200`
      : `${baseClasses} border border-red-200`;
  };

  const getProgressColor = () => {
    if (message.category === "login") {
      return message.type === "success" ? "bg-blue-400" : "bg-red-400";
    } else if (message.category === "upload") {
      return message.type === "success" ? "bg-green-400" : "bg-red-400";
    } else if (message.category === "subscription") {
      return message.type === "success" ? "bg-purple-400" : "bg-red-400";
    }

    return message.type === "success" ? "bg-green-400" : "bg-red-400";
  };

  const getIconBackgroundClasses = () => {
    if (message.category === "login") {
      return message.type === "success"
        ? "bg-blue-100 text-blue-600"
        : "bg-orange-100 text-orange-600";
    } else if (message.category === "upload") {
      return message.type === "success"
        ? "bg-green-100 text-green-600"
        : "bg-red-100 text-red-600";
    } else if (message.category === "subscription") {
      return message.type === "success"
        ? "bg-purple-100 text-purple-600"
        : "bg-pink-100 text-pink-600";
    }

    return message.type === "success"
      ? "bg-green-100 text-green-600"
      : "bg-red-100 text-red-600";
  };

  const getCategoryTitleColor = () => {
    if (message.category === "login") {
      return message.type === "success" ? "text-blue-800" : "text-orange-800";
    } else if (message.category === "upload") {
      return message.type === "success" ? "text-green-800" : "text-red-800";
    } else if (message.category === "subscription") {
      return message.type === "success" ? "text-purple-800" : "text-pink-800";
    }

    return message.type === "success" ? "text-green-800" : "text-red-800";
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.95 }}
      transition={{ type: "spring", damping: 20, stiffness: 300 }}
      className={`fixed top-6 right-6 z-50 max-w-xs w-full`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`rounded-lg p-3 ${getThemeClasses()}`}>
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 h-1 bg-gray-100 rounded-b-lg w-full overflow-hidden">
          <motion.div
            className={`h-full ${getProgressColor()}`}
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Content */}
        <div className="flex items-start gap-3">
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: "spring", damping: 15 }}
            className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${getIconBackgroundClasses()}`}
          >
            {getIcon()}
          </motion.div>

          {/* Message Content */}
          <div className="flex-1 min-w-0">
            <motion.h4
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={`font-medium text-sm ${getCategoryTitleColor()}`}
            >
              {message.title.replace(/✅|❌|📁|⚠️|💎|💳/g, "").trim()}
            </motion.h4>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-gray-600 text-xs mt-1"
            >
              {message.text}
            </motion.p>
          </div>

          {/* Close Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onDismiss}
            className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const FlashMessages = () => {
  const [currentMessage, setCurrentMessage] = useState(null);

  // Message definitions
  const messages = {
    login: {
      success: {
        category: "login",
        type: "success",
        title: "✅ Login Success",
        text: "Welcome back! You've successfully logged in.",
      },
      error: {
        category: "login",
        type: "error",
        title: "❌ Login Error",
        text: "Login failed. Please check your email and password and try again.",
      },
    },
    upload: {
      success: {
        category: "upload",
        type: "success",
        title: "📁 Upload Success",
        text: "File uploaded successfully.",
      },
      error: {
        category: "upload",
        type: "error",
        title: "⚠️ Upload Error",
        text: "Upload failed. Unsupported file format or size too large.",
      },
    },
    subscription: {
      success: {
        category: "subscription",
        type: "success",
        title: "💎 Subscription Success",
        text: "You're now a Premium member. Enjoy exclusive features!",
      },
      error: {
        category: "subscription",
        type: "error",
        title: "💳 Subscription Error",
        text: "Payment failed. Please try another payment method.",
      },
    },
  };

  const showMessage = (category, type) => {
    setCurrentMessage(messages[category][type]);
  };

  const dismissMessage = () => {
    setCurrentMessage(null);
  };

  return (
    <div className="min-h-screen bg-gray-200 text-gray-900">
      <BackToHome />

      <AnimatePresence mode="wait">
        <FlashMessage
          key={currentMessage?.title}
          message={currentMessage}
          onDismiss={dismissMessage}
        />
      </AnimatePresence>

      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-3xl font-semibold text-gray-800 mb-2">
              Flash Messages
            </h1>
            <p className="text-gray-600">
              Click any button to see the flash message
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => showMessage("login", "success")}
              className="p-4 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Login Success
            </button>

            <button
              onClick={() => showMessage("login", "error")}
              className="p-4 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Login Error
            </button>

            <button
              onClick={() => showMessage("upload", "success")}
              className="p-4 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Upload Success
            </button>

            <button
              onClick={() => showMessage("upload", "error")}
              className="p-4 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Upload Error
            </button>

            <button
              onClick={() => showMessage("subscription", "success")}
              className="p-4 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Subscription Success
            </button>

            <button
              onClick={() => showMessage("subscription", "error")}
              className="p-4 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              Subscription Error
            </button>
          </div>
        </div>
        {/* Showcase Section */}
        <div className="mt-20 w-full">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Message Designs Showcase
            </h2>
            <p className="text-gray-600">
              Preview of all flash message variations
            </p>
          </div>

          <div className="flex items-center gap-24 justify-center p-8">
            <div className="mb-12">
              <h3 className="text-lg font-medium text-gray-700 mb-6">
                Success Messages
              </h3>
              <div className="space-y-4">
                <div className="bg-white shadow-lg border-l-4 border-l-blue-400 border border-blue-100 rounded-lg p-3 max-w-xs">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-blue-100 text-blue-600">
                      <LogIn className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-blue-800">
                        Login Success
                      </h4>
                      <p className="text-gray-600 text-xs mt-1">
                        Welcome back! You've successfully logged in.
                      </p>
                    </div>
                    <button className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>

                <div className="bg-white shadow-lg border-l-4 border-l-green-400 border border-green-100 rounded-lg p-3 max-w-xs relative">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-green-100 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-green-800">
                        Upload Success
                      </h4>
                      <p className="text-gray-600 text-xs mt-1">
                        File uploaded successfully.
                      </p>
                    </div>
                    <button className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 bg-gray-100 rounded-b-lg w-full overflow-hidden">
                    <div className="h-full bg-green-400 w-1/2" />
                  </div>
                </div>

                <div className="bg-white shadow-lg border-l-4 border-l-purple-400 border border-purple-100 rounded-lg p-3 max-w-xs relative">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-purple-100 text-purple-600">
                      <Crown className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-purple-800">
                        Subscription Success
                      </h4>
                      <p className="text-gray-600 text-xs mt-1">
                        You're now a Premium member. Enjoy exclusive features!
                      </p>
                    </div>
                    <button className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 bg-gray-100 rounded-b-lg w-full overflow-hidden">
                    <div className="h-full bg-purple-400 w-2/3" />
                  </div>
                </div>
              </div>
            </div>

            {/* Error Messages */}
            <div className="mb-12">
              <h3 className="text-lg font-medium text-gray-700 mb-6">
                Error Messages
              </h3>
              <div className="space-y-4">
                {/* Login Error */}
                <div className="bg-white shadow-lg border-l-4 border-l-orange-400 border border-red-100 rounded-lg p-3 max-w-xs relative">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-orange-100 text-orange-600">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-orange-800">
                        Login Error
                      </h4>
                      <p className="text-gray-600 text-xs mt-1">
                        Login failed. Please check your email and password and
                        try again.
                      </p>
                    </div>
                    <button className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 bg-gray-100 rounded-b-lg w-full overflow-hidden">
                    <div className="h-full bg-red-400 w-5/6" />
                  </div>
                </div>

                {/* Upload Error */}
                <div className="bg-white shadow-lg border-l-4 border-l-red-400 border border-red-100 rounded-lg p-3 max-w-xs relative">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-red-100 text-red-600">
                      <XCircle className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-red-800">
                        Upload Error
                      </h4>
                      <p className="text-gray-600 text-xs mt-1">
                        Upload failed. Unsupported file format or size too
                        large.
                      </p>
                    </div>
                    <button className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 bg-gray-100 rounded-b-lg w-full overflow-hidden">
                    <div className="h-full bg-red-400 w-1/3" />
                  </div>
                </div>

                {/* Subscription Error */}
                <div className="bg-white shadow-lg border-l-4 border-l-pink-400 border border-red-100 rounded-lg p-3 max-w-xs relative">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center bg-pink-100 text-pink-600">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm text-pink-800">
                        Subscription Error
                      </h4>
                      <p className="text-gray-600 text-xs mt-1">
                        Payment failed. Please try another payment method.
                      </p>
                    </div>
                    <button className="flex-shrink-0 w-5 h-5 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 bg-gray-100 rounded-b-lg w-full overflow-hidden">
                    <div className="h-full bg-red-400 w-1/4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default FlashMessages;
