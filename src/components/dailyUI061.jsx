import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Tag, DollarSign } from "lucide-react";
import BackToHome from "./BackToHome";

export default function RedeemCouponModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);

  const subtotal = 100.0;
  const discountPercentage = 10;
  const discountAmount = isApplied ? (subtotal * discountPercentage) / 100 : 0;
  const total = subtotal - discountAmount;

  const handleApplyCoupon = () => {
    if (couponCode.toLowerCase() === "save10") {
      setIsApplied(true);
    } else {
      alert('Invalid coupon code. Try "SAVE10"');
    }
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setCouponCode("");
    setIsApplied(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#d5fae1] to-[#fdfdfd] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Checkout</h1>
        <p className="text-gray-600 mb-8">Ready to redeem your coupon?</p>

        {/* Redeem Coupon Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsModalOpen(true)}
          className="bg-teal-900 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-teal-700 transition-colors flex items-center justify-center space-x-2 mx-auto"
        >
          <Tag className="w-5 h-5" />
          <span>Redeem Coupon</span>
        </motion.button>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={handleClose}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white rounded-xl shadow-2xl p-6 max-w-sm w-full mx-4 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>

              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Redeem Coupon
              </h2>

              {!isApplied ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Enter Coupon Code
                    </label>
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="e.g., SAVE10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                  <ul className="p-2 rounded-lg bg-teal-200/20 flex flex-col gap-4 h-30 overflow-auto">
                    <li>
                      <h4 className="text-sm font-medium opacity-80">TRYNEWFIRST</h4>
                      <p className="text-xs font-regular opacity-75">Save 5% with this code • Min. Order: $20</p>
                    </li>
                    <li>
                      <h4 className="text-sm font-medium opacity-80">DUOBUY</h4>
                      <p className="text-xs font-regular opacity-75">Save 15% with this code • Min. Order: $220</p>
                    </li>
                    <li>
                      <h4 className="text-sm font-medium opacity-80">MEGAFIRSTBUY</h4>
                      <p className="text-xs font-regular opacity-75">Save 45% with this code • Min. Order: $520</p>
                    </li>
                  </ul>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleApplyCoupon}
                    className="w-full bg-teal-600 text-white py-2 rounded-lg font-semibold hover:bg-teal-700 transition-colors"
                  >
                    Apply Coupon
                  </motion.button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 text-green-700 mb-2">
                      <Tag className="w-5 h-5" />
                      <span className="font-semibold">Coupon Applied!</span>
                    </div>
                    <p className="text-sm text-green-600">
                      Discount: {discountPercentage}% off
                    </p>
                  </div>

                  <div className="space-y-2 text-left">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discountPercentage}%):</span>
                      <span>-${discountAmount.toFixed(2)}</span>
                    </div>
                    <hr className="my-2" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-1" />$
                        {total.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClose}
                    className="w-full bg-gray-600 text-white py-2 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <BackToHome challengeTitle="Redeem Coupon Modal" challengeDay="061" />
    </div>
  );
}
