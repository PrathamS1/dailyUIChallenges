import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  MoreVertical,
  Paperclip,
  Smile,
  Mic,
  Send,
  Check,
  CheckCheck,
  Shield,
  Truck,
  Tag,
  RotateCcw,
  Receipt,
  Palette,
} from "lucide-react";

const BuyerSellerChat = () => {
  const [message, setMessage] = useState("");
  const [currentTheme, setCurrentTheme] = useState(0);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const themeRef = useRef(null);

  // Close theme modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (themeRef.current && !themeRef.current.contains(event.target)) {
        setIsThemeOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const themes = [
    {
      primary: "#3B82F6",
      secondary: "#EBF8FF",
      text: "#1F2937",
      background: "#FFFFFF",
      accent: "#10B981",
    },
    {
      primary: "#8B5CF6",
      secondary: "#F3E8FF",
      text: "#374151",
      background: "#FEFEFE",
      accent: "#F59E0B",
    },
    {
      primary: "#EF4444",
      secondary: "#FEF2F2",
      text: "#111827",
      background: "#FFFFFF",
      accent: "#06B6D4",
    },
    {
      primary: "#059669",
      secondary: "#ECFDF5",
      text: "#1F2937",
      background: "#FFFFFF",
      accent: "#DC2626",
    },
    {
      primary: "#DC2626",
      secondary: "#FEF2F2",
      text: "#374151",
      background: "#FFFFFF",
      accent: "#7C3AED",
    },
    {
      primary: "#F97316", 
      secondary: "#FFF7ED", 
      text: "#1E293B", 
      background: "#FFFFFF",
      accent: "#10B981", 
    },
    {
      primary: "#0EA5E9", 
      secondary: "#E0F2FE", 
      text: "#1F2937", 
      background: "#FAFAFA",
      accent: "#FBBF24", 
    },
    {
      primary: "#9333EA", 
      secondary: "#F5F3FF", 
      text: "#2D2D2D",
      background: "#FFFEFC",
      accent: "#14B8A6", 
    },
    {
      primary: "#1E40AF", 
      secondary: "#1E293B", 
      text: "#F3F4F6", 
      background: "#0F172A", 
      accent: "#22D3EE", 
    },
    {
      primary: "#C2410C", 
      secondary: "#3F3F46", 
      text: "#F4F4F5", 
      background: "#1C1917", 
      accent: "#FACC15", 
    },
  ];

  const theme = themes[currentTheme];

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "buyer",
      text: "Hi! Is this 3-seater sofa set still available?",
      timestamp: "2:15 PM",
      status: "seen",
    },
    {
      id: 2,
      type: "seller",
      text: "Yes, it's available! Brand new, never used. Includes 3-seater sofa, 2 armchairs, and coffee table.",
      timestamp: "2:16 PM",
      status: "seen",
    },
    {
      id: 3,
      type: "seller",
      text: "Here are some detailed photos showing the fabric quality and design",
      timestamp: "2:17 PM",
      status: "seen",
      hasImage: true,
    },
    {
      id: 4,
      type: "buyer",
      text: "Looks perfect! What are the dimensions? Will it fit through a standard doorway?",
      timestamp: "2:20 PM",
      status: "seen",
    },
    {
      id: 5,
      type: "seller",
      text: 'Sofa: 84"W x 36"D x 32"H. Armchairs: 32"W x 30"D x 32"H. All pieces are modular and can be disassembled for delivery.',
      timestamp: "2:22 PM",
      status: "seen",
    },
    {
      id: 6,
      type: "buyer",
      text: "Perfect! What's your best price for the complete set?",
      timestamp: "2:25 PM",
      status: "seen",
    },
    {
      id: 7,
      type: "seller",
      text: "Listed at $1,200. I can do $1,050 for the complete set including free white-glove delivery.",
      timestamp: "2:27 PM",
      status: "seen",
    },
    {
      id: 8,
      type: "buyer",
      text: "That works for me! How do we proceed with the order?",
      timestamp: "2:30 PM",
      status: "seen",
    },
    {
      id: 9,
      type: "seller",
      text: "Great! I'll send you a secure payment link. What's your delivery address?",
      timestamp: "2:31 PM",
      status: "seen",
    },
    {
      id: 10,
      type: "buyer",
      text: "Building No. 88, 71 - Koramangala, Karnataka, Bengaluru 560034",
      timestamp: "2:33 PM",
      status: "seen",
    },
    {
      id: 11,
      type: "seller",
      text: "Perfect! Delivery available this Saturday 10 AM - 2 PM or Sunday 1 PM - 5 PM. Which works better?",
      timestamp: "2:35 PM",
      status: "delivered",
    },
    {
      id: 12,
      type: "buyer",
      text: "Saturday works great! Looking forward to it.",
      timestamp: "2:37 PM",
      status: "sent",
    },
  ]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        type: "buyer",
        text: message,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
      };
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const quickActions = [
    { icon: Truck, text: "Ask about delivery" },
    { icon: Tag, text: "Request discount" },
    { icon: RotateCcw, text: "Return policy" },
    { icon: Receipt, text: "Send invoice" },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <Check className="w-3 h-3 text-gray-400" />;
      case "delivered":
        return <CheckCheck className="w-3 h-3 text-gray-400" />;
      case "seen":
        return <CheckCheck className="w-3 h-3 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      {/* Theme Selector - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <div className="relative" ref={themeRef}>
          <button
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className="w-10 h-10 bg-white rounded-lg shadow-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <Palette className="w-5 h-5 text-gray-600" />
          </button>

          <AnimatePresence>
            {isThemeOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 right-0 bg-zinc-200 rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px]"
              >
                <div className="space-y-3">
                  {themes.map((themeItem, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setCurrentTheme(index);
                      }}
                      className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-zinc-700 transition-colors ${
                        currentTheme === index ? "bg-zinc-600" : ""
                      }`}
                    >
                      <span
                        className={`text-sm font-medium text-black w-4 ${
                          currentTheme === index ? "text-white" : "text-black"
                        }`}
                      >
                        {index + 1}
                      </span>
                      <div className="flex space-x-1">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: themeItem.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: themeItem.secondary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: themeItem.text }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: themeItem.background }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: themeItem.accent }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div
        className="w-full max-w-md rounded-2xl shadow-sm border overflow-hidden"
        style={{
          backgroundColor: theme.background,
          borderColor: theme.secondary,
        }}
      >
        {/* Header */}
        <div
          className="border-b p-4"
          style={{
            backgroundColor: theme.background,
            borderColor: theme.secondary,
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button className="p-1">
                <ArrowLeft className="w-5 h-5" style={{ color: theme.text }} />
              </button>
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.primary }}
              >
                <span className="text-white font-medium text-sm">SF</span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold" style={{ color: theme.text }}>
                    Sarah's Furniture
                  </h3>
                  <div
                    className="flex items-center space-x-1 px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: `${theme.accent}20` }}
                  >
                    <Shield
                      className="w-3 h-3"
                      style={{ color: theme.accent }}
                    />
                    <span
                      className="text-xs font-medium"
                      style={{ color: theme.accent }}
                    >
                      Verified
                    </span>
                  </div>
                </div>
                <p className="text-xs text-gray-500">Active 2h ago</p>
              </div>
            </div>
            <button className="p-1">
              <MoreVertical className="w-5 h-5" style={{ color: theme.text }} />
            </button>
          </div>
        </div>

        {/* Product Context Card */}
        <div
          className="border-b p-4"
          style={{
            backgroundColor: theme.secondary,
            borderColor: `${theme.primary}30`,
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1630585308572-f53438fc684f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfDJ8MHx8fDI%3D"
                alt="Product"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h4 className="font-medium text-sm" style={{ color: theme.text }}>
                Modern Sofa Set - 5 Pieces
              </h4>
              <p className="text-sm text-gray-600">
                $1,050.00 • Free white-glove delivery
              </p>
            </div>
            <div
              className="px-2 py-1 rounded-full"
              style={{ backgroundColor: `${theme.accent}20` }}
            >
              <span
                className="text-xs font-medium"
                style={{ color: theme.accent }}
              >
                In Stock
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div
          className="h-96 overflow-y-auto p-4 space-y-4 custom-scrollbar"
          style={{ backgroundColor: theme.background }}
        >
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex ${
                msg.type === "buyer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs ${
                  msg.type === "buyer" ? "order-2" : "order-1"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl ${
                    msg.type === "buyer"
                      ? "rounded-br-md text-white"
                      : "rounded-bl-md"
                  }`}
                  style={{
                    backgroundColor:
                      msg.type === "buyer" ? theme.primary : theme.secondary,
                    color: msg.type === "buyer" ? "#FFFFFF" : theme.text,
                  }}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  {msg.hasImage && (
                    <div className="mt-2 grid grid-cols-2 gap-1">
                      <div className="bg-gray-200 rounded-lg h-20">
                        <img
                          src="https://images.unsplash.com/photo-1630585308572-f53438fc684f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c29mYXxlbnwwfDJ8MHx8fDI%3D"
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="bg-gray-200 rounded-lg h-20">
                        <img
                          src="https://images.unsplash.com/photo-1567016507665-356928ac6679?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8c29mYXxlbnwwfDJ8MHx8fDI%3D"
                          alt="Product"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
                <div
                  className={`flex items-center space-x-1 mt-1 ${
                    msg.type === "buyer" ? "justify-end" : "justify-start"
                  }`}
                >
                  <span className="text-xs text-gray-500">{msg.timestamp}</span>
                  {msg.type === "buyer" && getStatusIcon(msg.status)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div
          className="border-t p-4"
          style={{
            backgroundColor: theme.background,
            borderColor: theme.secondary,
          }}
        >
          <div className="grid grid-cols-2 gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex items-center justify-center space-x-2 px-3 py-2 rounded-lg text-sm transition-colors"
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.text,
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = `${theme.primary}20`;
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = theme.secondary;
                }}
              >
                <action.icon className="w-4 h-4" />
                <span>{action.text}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Message Input */}
        <div
          className="border-t p-4"
          style={{
            backgroundColor: theme.background,
            borderColor: theme.secondary,
          }}
        >
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Type a message..."
                className="w-full px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2 transition-all"
                style={{
                  backgroundColor: theme.secondary,
                  color: theme.text,
                  focusRingColor: theme.primary,
                }}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                <button className="p-1">
                  <Paperclip className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1">
                  <Smile className="w-4 h-4 text-gray-400" />
                </button>
                <button className="p-1">
                  <Mic className="w-4 h-4 text-gray-400" />
                </button>
              </div>
            </div>
            <button
              onClick={handleSendMessage}
              className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
              style={{ backgroundColor: theme.primary }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = `${theme.primary}dd`;
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = theme.primary;
              }}
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Trust Footer */}
        <div
          className="px-4 py-3 text-center"
          style={{ backgroundColor: theme.secondary }}
        >
          <p className="text-xs text-gray-500">
            🔒 This conversation is protected by marketplace policies
          </p>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${theme.primary}40;
          border-radius: 10px;
          transition: background 0.3s ease;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${theme.primary}60;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: ${theme.primary}80;
        }

        /* For Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: ${theme.primary}40 transparent;
        }
      `}</style>
    </div>
  );
};

export default BuyerSellerChat;
