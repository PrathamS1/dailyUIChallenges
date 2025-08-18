import { useState } from "react";
import { motion } from "framer-motion";
import BackToHome from "./BackToHome";
import { 
  HiMail, 
  HiDownload, 
  HiPrinter, 
  HiShare, 
  HiClipboardCopy,
  HiQrcode,
  HiHeart,
  HiSparkles
} from "react-icons/hi";

const DigitalReceipt = () => {
  const [showQR, setShowQR] = useState(false);
  const receiptData = {
    receiptNumber: "123456",
    date: "Aug 18, 2025",
    time: "12:32 PM",
    storeName: "GoodyTech Electronics",
    storeLocation: "Building 42, Rajiv Chowk, Delhi 120022",
    storePhone: "1100-244-000",
    storeWebsite: "www.goodytech.com",
    items: [
      {
        id: 1,
        name: "Wireless Mouse",
        quantity: 1,
        price: 799,
        icon: (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      },
      {
        id: 2,
        name: "Notebook",
        quantity: 2,
        price: 250,
        icon: (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.168 18.477 18.582 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        )
      },
      {
        id: 3,
        name: "USB Cable",
        quantity: 1,
        price: 299,
        icon: (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
          </svg>
        )
      },
      {
        id: 4,
        name: "Phone Case",
        quantity: 1,
        price: 450,
        icon: (
          <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        )
      }
    ],
    subtotal: 1798,
    taxRate: 0.05,
    paymentMethod: "Visa ****5678"
  };

  const tax = Math.round(receiptData.subtotal * receiptData.taxRate);
  const total = receiptData.subtotal + tax;

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      <BackToHome />
      
      <motion.div
        className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl border border-red-100"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="relative pt-8 pb-6 px-6 bg-white"
          variants={itemVariants}
        >
          <div className="text-center">
            <div className="mb-6">
              <motion.div 
                className="w-16 h-16 mx-auto bg-gradient-to-br from-red-600 to-red-700 rounded-2xl flex items-center justify-center shadow-lg mb-4 overflow-hidden"
                whileHover={{ scale: 1.05, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <img src="/gtech.png" className="w-full h-full object-cover" alt="" />
              </motion.div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {receiptData.storeName}
              </h1>
              <p className="text-gray-600 text-sm mb-1">{receiptData.storeLocation}</p>
              <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                <span>{receiptData.storePhone}</span>
                <span>•</span>
                <span>{receiptData.storeWebsite}</span>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Receipt #</div>
                  <div className="font-semibold text-gray-900">{receiptData.receiptNumber}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Date</div>
                  <div className="font-semibold text-gray-900">{receiptData.date}</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Time</div>
                  <div className="font-semibold text-gray-900">{receiptData.time}</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-red-100 mx-6"></div>

        <motion.div 
          className="px-6 py-6"
          variants={itemVariants}
        >
          <div className="space-y-4">
            {receiptData.items.map((item, index) => (
              <motion.div
                key={item.id}
                className="flex justify-between items-center"
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-2 h-2 bg-red-600 rounded-full relative z-10" />
                    
                    <motion.div
                      className="absolute inset-0 w-2 h-2 bg-red-500 rounded-full"
                      animate={{
                        scale: [1, 3],
                        opacity: [0.6, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: index * 0.3
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 w-2 h-2 bg-red-400 rounded-full"
                      animate={{
                        scale: [1, 2.5],
                        opacity: [0.4, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: (index * 0.3) + 0.2
                      }}
                    />
                    <motion.div
                      className="absolute inset-0 w-2 h-2 bg-red-300 rounded-full"
                      animate={{
                        scale: [1, 2],
                        opacity: [0.3, 0]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeOut",
                        delay: (index * 0.3) + 0.4
                      }}
                    />
                  </div>
                  <div>
                    <span className="text-gray-800 font-medium">
                      {item.name} <span className="text-red-600 font-semibold">({item.quantity}x)</span>
                    </span>
                  </div>
                </div>
                <span className="text-gray-800 font-medium">₹{item.price}</span>
              </motion.div>
            ))}
          </div>

          <div className="border-t border-red-100 mt-6 pt-4 space-y-2">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal</span>
              <span>₹{receiptData.subtotal}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (5%)</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-red-600 pt-2 border-t border-red-100">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-600">
            Paid via {receiptData.paymentMethod}
          </div>
        </motion.div>

        <motion.div 
          className="px-6 py-6 bg-red-50/50"
          variants={itemVariants}
        >
          <div className="text-center">
            {showQR ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4"
              >
                <div className="w-24 h-24 mx-auto mb-3 bg-white rounded-lg shadow-sm flex items-center justify-center border-2 border-gray-200">
                  <img 
                    src="/myqr.png" 
                    alt="QR Code for order tracking" 
                    className="w-20 h-20 rounded"
                  />
                </div>
                <p className="text-sm text-gray-700 mb-3">
                  Scan to track your order or download invoice
                </p>
                <button
                  onClick={() => setShowQR(false)}
                  className="text-xs text-red-600 hover:text-red-800 transition-colors underline"
                >
                  Hide QR Code
                </button>
              </motion.div>
            ) : (
              <div className="mb-4 flex flex-col items-center space-y-2">
                <motion.button
                  onClick={() => setShowQR(true)}
                  className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full text-sm font-medium transition-colors mb-3 flex items-center justify-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <HiQrcode className="w-6 h-6" />
                </motion.button>
                <p className="text-sm text-gray-700">
                  Track your order or download invoice
                </p>
              </div>
            )}
            
            <div className="text-xs text-gray-600">
              Need help? support@goodytech.com | {receiptData.storePhone}
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="px-6 py-6 text-center border-t border-red-100"
          variants={itemVariants}
        >
          <div className="text-red-600 font-medium mb-4 italic flex items-center justify-center space-x-2">
            <HiSparkles className="w-4 h-4" />
            <span>Use code SAVE10 for 10% off your next purchase</span>
            <HiSparkles className="w-4 h-4" />
          </div>

          <div className="text-sm text-gray-600 flex items-center justify-center space-x-2">
            <span>Thanks for shopping with us</span>
            <HiHeart className="w-4 h-4 text-red-500" />
          </div>
        </motion.div>

        <motion.div 
          className="px-6 py-8 bg-white border-t border-gray-100"
          variants={itemVariants}
        >
          <div className="space-y-3 mb-6">
            <motion.button
              className="w-full flex items-center justify-center space-x-3 bg-red-600 hover:bg-red-700 text-white py-4 px-6 rounded-xl font-medium transition-colors shadow-sm hover:shadow-md"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <HiMail className="w-5 h-5" />
              <span>Email Receipt</span>
            </motion.button>
            
            <motion.button
              className="w-full flex items-center justify-center space-x-3 bg-gray-50 hover:bg-gray-100 text-gray-800 py-4 px-6 rounded-xl font-medium transition-colors border border-gray-200"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <HiDownload className="w-5 h-5" />
              <span>Download PDF</span>
            </motion.button>
          </div>
          
          <div className="pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-600">More options</span>
              <div className="flex space-x-2">
                <motion.button
                  className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Print Receipt"
                >
                  <HiPrinter className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                </motion.button>
                
                <motion.button
                  className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Share Receipt"
                >
                  <HiShare className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                </motion.button>
                
                <motion.button
                  className="w-10 h-10 bg-gray-50 hover:bg-gray-100 rounded-lg flex items-center justify-center transition-colors group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title="Copy Link"
                >
                  <HiClipboardCopy className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
                </motion.button>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Your receipt will be available for 90 days
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default DigitalReceipt;