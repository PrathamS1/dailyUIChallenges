import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Lock,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Bookmark,
  CircleSmall,
} from "lucide-react";
import BackToHome from "./BackToHome";

const CreditCardCheckout = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("card");
  const [showCVV, setShowCVV] = useState(false);
  const [cardFlipped, setCardFlipped] = useState(false);
  const [showSavedCards, setShowSavedCards] = useState(false);

  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
    email: "",
    billingAddress: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");

  // Valid promo codes
  const validPromoCodes = {
    LUXURY20: { discount: 0.2, description: "20% off luxury items" },
    FURNITURE15: { discount: 0.15, description: "15% off furniture" },
    WELCOME10: { discount: 0.1, description: "10% welcome discount" },
  };

  // Order summary data
  const orderSummary = {
    items: [
      {
        name: "Derby Velvet 3 Seater Sofa",
        price: 44999,
        quantity: 1,
        description: "Frame Material: Solid Sal Wood",
      },
      {
        name: "Paloma 6 Seater Dining Table",
        price: 52449,
        quantity: 1,
        description:
          "Paloma 6 Seater Spanish Ceramic Dining Table With Set Of 6 Casey Swivel Dining Chairs",
      },
      {
        name: "Lebowski Manual Recliner",
        price: 16974,
        quantity: 2,
        description:
          "Lebowski Fabric One Seater Manual Recliner in Smoke Fabric",
      },
    ],
    subtotal: 114422,
    gst: 20595.96,
    shipping: 0.0,
  };

  // Calculate total with promo discount
  const calculateTotal = () => {
    let subtotal = orderSummary.subtotal;
    let discount = 0;

    if (appliedPromo) {
      discount = subtotal * appliedPromo.discount;
    }

    return {
      subtotal,
      discount,
      discountedSubtotal: subtotal - discount,
      gst: orderSummary.gst,
      shipping: orderSummary.shipping,
      total: subtotal - discount + orderSummary.gst + orderSummary.shipping,
    };
  };

  const totals = calculateTotal();

  // Handle promo code application
  const handleApplyPromo = () => {
    const upperCasePromo = promoCode.toUpperCase().trim();

    if (!upperCasePromo) {
      setPromoError("Please enter a promo code");
      return;
    }

    if (validPromoCodes[upperCasePromo]) {
      setAppliedPromo({
        code: upperCasePromo,
        ...validPromoCodes[upperCasePromo],
      });
      setPromoError("");
      setPromoCode("");
    } else {
      setPromoError("Invalid promo code. Please try again.");
      setAppliedPromo(null);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  };

  // Saved cards (sample data)
  const savedCards = [
    { id: 1, last4: "4242", brand: "Visa", expiry: "12/26" },
    { id: 2, last4: "5555", brand: "Mastercard", expiry: "09/25" },
  ];

  // Card number formatting
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  };

  // Detect card type
  const getCardType = (number) => {
    const num = number.replace(/\s/g, "");
    if (num.startsWith("4")) return "Visa";
    if (num.startsWith("5") || num.startsWith("2")) return "Mastercard";
    if (num.startsWith("3")) return "Amex";
    if (num.startsWith("6")) return "RuPay";
    return "Unknown";
  };

  // Get card logo path
  const getCardLogo = (cardType) => {
    switch (cardType.toLowerCase()) {
      case "visa":
        return "/visa.png";
      case "mastercard":
        return "/master.png";
      case "amex":
        return "/amex.png";
      case "rupay":
        return "/rupay.png";
      default:
        return null;
    }
  };

  // Handle input changes
  const handleInputChange = (field, value) => {
    let formattedValue = value;

    if (field === "cardNumber") {
      formattedValue = formatCardNumber(value);
    } else if (field === "expiryDate") {
      formattedValue = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2")
        .slice(0, 5);
    } else if (field === "cvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setFormData({ ...formData, [field]: formattedValue });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  // Validation
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = "Email is required";
      if (!formData.cardholderName)
        newErrors.cardholderName = "Name is required";
    } else if (step === 2) {
      if (selectedPaymentMethod === "card") {
        if (
          !formData.cardNumber ||
          formData.cardNumber.replace(/\s/g, "").length < 13
        ) {
          newErrors.cardNumber = "Valid card number is required";
        }
        if (!formData.expiryDate || formData.expiryDate.length !== 5) {
          newErrors.expiryDate = "Valid expiry date is required";
        }
        if (!formData.cvv || formData.cvv.length < 3) {
          newErrors.cvv = "Valid CVV is required";
        }
      }
    } else if (step === 3) {
      if (!formData.billingAddress)
        newErrors.billingAddress = "Address is required";
      if (!formData.city) newErrors.city = "City is required";
      if (!formData.postalCode)
        newErrors.postalCode = "Postal code is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    if (validateStep(3)) {
      setIsProcessing(true);
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsProcessing(false);
      setCurrentStep(4);
    }
  };

  const cardType = getCardType(formData.cardNumber);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-200 to-zinc-100">
      <BackToHome />

      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-zinc-200/50 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-center">
            <h1 className="text-2xl font-bold text-zinc-900">
              Proceed With Checkout
            </h1>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mt-6 space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    currentStep >= step
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-200 text-zinc-500"
                  }`}
                >
                  {currentStep > step ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    step
                  )}
                </div>
                {step < 3 && (
                  <div
                    className={`w-16 h-0.5 transition-all duration-300 ${
                      currentStep > step ? "bg-zinc-900" : "bg-zinc-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 border-r border-zinc-400 pr-8">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-8 shadow-[var(--check-shadow)] border border-zinc-200"
                >
                  <h2 className="text-xl font-semibold text-zinc-900 mb-6">
                    Contact Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                          errors.email
                            ? "border-red-300 focus:border-red-500"
                            : "border-zinc-300 focus:border-zinc-900"
                        } focus:outline-none focus:ring-0`}
                        placeholder="your@email.com"
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.cardholderName}
                        onChange={(e) =>
                          handleInputChange("cardholderName", e.target.value)
                        }
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                          errors.cardholderName
                            ? "border-red-300 focus:border-red-500"
                            : "border-zinc-300 focus:border-zinc-900"
                        } focus:outline-none focus:ring-0`}
                        placeholder="Pratham Singh"
                      />
                      {errors.cardholderName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.cardholderName}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  {/* Payment Method Selection */}
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-200">
                    <h2 className="text-xl font-semibold text-zinc-900 mb-6">
                      Payment Method
                    </h2>

                    <div className="grid gap-4">
                      {/* Saved Cards Accordion */}
                      <div className="border border-zinc-200 rounded-xl">
                        <button
                          onClick={() => setShowSavedCards(!showSavedCards)}
                          className="w-full p-4 flex items-center justify-between hover:bg-zinc-50 transition-all duration-200 rounded-xl"
                        >
                          <div className="flex items-center space-x-3 relative justify-center">
                            <div className="relative">
                              <CreditCard className="w-5 h-5 text-zinc-600" />
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-600 rounded-full flex items-center justify-center">
                                <Bookmark className="w-1.5 h-1.5 text-white fill-white" />
                              </div>
                            </div>
                            <span className="font-medium text-zinc-900">
                              Saved Payment Methods ({savedCards.length})
                            </span>
                          </div>
                          {showSavedCards ? (
                            <ChevronUp className="w-5 h-5 text-zinc-600" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-zinc-600" />
                          )}
                        </button>

                        <AnimatePresence>
                          {showSavedCards && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="border-t border-zinc-200 p-4 space-y-3">
                                {savedCards.map((card) => (
                                  <div
                                    key={card.id}
                                    className="p-3 border border-zinc-100 rounded-lg cursor-pointer hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-200"
                                    onClick={() =>
                                      setSelectedPaymentMethod(
                                        `saved-${card.id}`
                                      )
                                    }
                                  >
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center space-x-3">
                                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center border border-zinc-200 shadow-sm">
                                          {getCardLogo(card.brand) ? (
                                            <img
                                              src={getCardLogo(card.brand)}
                                              alt={`${card.brand} logo`}
                                              className="w-6 h-4 object-contain"
                                            />
                                          ) : (
                                            <CreditCard className="w-4 h-4 text-zinc-600" />
                                          )}
                                        </div>
                                        <div>
                                          <span className="font-medium text-zinc-900">
                                            {card.brand} •••• {card.last4}
                                          </span>
                                          <p className="text-xs text-zinc-500">
                                            Expires {card.expiry}
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                                          selectedPaymentMethod ===
                                          `saved-${card.id}`
                                            ? "border-zinc-900 bg-zinc-900"
                                            : "border-zinc-300"
                                        }`}
                                      >
                                        {selectedPaymentMethod ===
                                          `saved-${card.id}` && (
                                          <div className="w-full h-full rounded-full bg-white scale-50"></div>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* New Credit Card */}
                      <div
                        className={`p-4 border rounded-xl cursor-pointer transition-all duration-200 ${
                          selectedPaymentMethod === "card"
                            ? "border-zinc-900 bg-zinc-50"
                            : "border-zinc-200 hover:border-zinc-900"
                        }`}
                        onClick={() => setSelectedPaymentMethod("card")}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="w-5 h-5 text-zinc-600" />
                            <span className="font-medium text-zinc-900">
                              New Credit Card
                            </span>
                          </div>
                          <div
                            className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                              selectedPaymentMethod === "card"
                                ? "border-zinc-900 bg-zinc-900"
                                : "border-zinc-300"
                            }`}
                          >
                            {selectedPaymentMethod === "card" && (
                              <div className="w-full h-full rounded-full bg-white scale-50"></div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div
                          className={`p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedPaymentMethod === "paypal"
                              ? "border-zinc-900 bg-zinc-50"
                              : "border-zinc-200 hover:border-zinc-900"
                          }`}
                          onClick={() => setSelectedPaymentMethod("paypal")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <img
                                src="/paypal.png"
                                alt="PayPal"
                                className="w-6 h-6 object-contain"
                              />
                              <span className="font-medium text-zinc-900">
                                PayPal
                              </span>
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                                selectedPaymentMethod === "paypal"
                                  ? "border-zinc-900 bg-zinc-900"
                                  : "border-zinc-300"
                              }`}
                            >
                              {selectedPaymentMethod === "paypal" && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                          </div>
                        </div>

                        <div
                          className={`p-3 border rounded-xl cursor-pointer transition-all duration-200 ${
                            selectedPaymentMethod === "google"
                              ? "border-zinc-900 bg-zinc-50"
                              : "border-zinc-200 hover:border-zinc-900"
                          }`}
                          onClick={() => setSelectedPaymentMethod("google")}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <img
                                src="/gpay.png"
                                alt="Google Pay"
                                className="w-6 h-6 object-contain"
                              />
                              <span className="font-medium text-zinc-900">
                                Google Pay
                              </span>
                            </div>
                            <div
                              className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                                selectedPaymentMethod === "google"
                                  ? "border-zinc-900 bg-zinc-900"
                                  : "border-zinc-300"
                              }`}
                            >
                              {selectedPaymentMethod === "google" && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Details */}
                  {selectedPaymentMethod === "card" && (
                    <div className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-200">
                      <h3 className="text-lg font-semibold text-zinc-900 mb-6">
                        Card Details
                      </h3>

                      {/* Card Preview */}
                      <div className="mb-6 perspective-1000">
                        <motion.div
                          className="relative w-full max-w-md mx-auto h-56"
                          animate={{ rotateY: cardFlipped ? 180 : 0 }}
                          transition={{ duration: 0.6 }}
                          style={{ transformStyle: "preserve-3d" }}
                        >
                          {/* Front of card */}
                          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-800 rounded-2xl p-6 text-white shadow-2xl border border-zinc-700">
                            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                              <svg
                                className="absolute inset-0 w-full h-full opacity-10"
                                viewBox="0 0 400 200"
                                fill="none"
                              >
                                <path
                                  d="M0,100 Q100,50 200,80 T400,90 L400,200 L0,200 Z"
                                  fill="white"
                                />
                                <path
                                  d="M0,120 Q150,70 300,100 T400,110 L400,200 L0,200 Z"
                                  fill="white"
                                  opacity="0.5"
                                />
                              </svg>
                              <div className="absolute inset-0">
                                <div className="absolute top-8 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                                <div className="absolute top-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                                <div className="absolute bottom-12 left-0 w-3/4 h-px bg-gradient-to-r from-white/15 to-transparent"></div>
                                <div className="absolute top-0 right-16 w-px h-full bg-gradient-to-b from-transparent via-white/15 to-transparent"></div>
                                <div className="absolute top-0 right-24 w-px h-2/3 bg-gradient-to-b from-white/10 to-transparent"></div>
                              </div>
                              <div className="absolute top-6 right-6 w-2 h-2 bg-white/20 rounded-full"></div>
                              <div className="absolute top-12 right-12 w-1 h-1 bg-white/30 rounded-full"></div>
                              <div className="absolute bottom-8 left-12 w-1.5 h-1.5 bg-white/15 rounded-full"></div>
                              <div className="absolute bottom-16 left-20 w-1 h-1 bg-white/25 rounded-full"></div>
                            </div>

                            <div className="relative z-10 flex justify-between items-start mb-8">
                              {getCardLogo(cardType) ? (
                                <div className="bg-white rounded-lg p-2 shadow-lg">
                                  <img
                                    src={getCardLogo(cardType)}
                                    alt={`${cardType} logo`}
                                    className="w-12 h-8 object-contain"
                                  />
                                </div>
                              ) : (
                                <div className="w-12 h-8 bg-white/10 rounded-lg flex items-center justify-center backdrop-blur-sm border border-white/20">
                                  <CreditCard className="w-6 h-6 text-white" />
                                </div>
                              )}
                              <div className="text-right">
                                <div className="text-xs opacity-90 font-medium tracking-wide">
                                  {cardType}
                                </div>
                              </div>
                            </div>
                            <div className="relative z-10 space-y-4">
                              <div className="text-xl font-mono tracking-[0.2em] font-light drop-shadow-sm">
                                {formData.cardNumber || "•••• •••• •••• ••••"}
                              </div>
                              <div className="flex justify-between items-end">
                                <div>
                                  <div className="text-xs opacity-80 font-medium tracking-wide">
                                    CARDHOLDER
                                  </div>
                                  <div className="font-semibold text-sm tracking-wide drop-shadow-sm">
                                    {formData.cardholderName.toUpperCase() ||
                                      "YOUR NAME"}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-xs opacity-80 font-medium tracking-wide">
                                    EXPIRES
                                  </div>
                                  <div className="font-semibold text-sm tracking-wide drop-shadow-sm">
                                    {formData.expiryDate || "MM/YY"}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Back of card */}
                          <div
                            className="absolute inset-0 backface-hidden bg-gradient-to-br from-zinc-900 via-black to-zinc-800 rounded-2xl text-white shadow-2xl border border-zinc-700"
                            style={{ transform: "rotateY(180deg)" }}
                          >
                            <div className="absolute inset-0 overflow-hidden rounded-2xl">
                              <div className="absolute inset-0">
                                <div className="absolute top-0 left-0 w-full h-full opacity-5">
                                  <div className="absolute top-0 left-0 w-full h-px bg-white transform rotate-45 origin-left"></div>
                                  <div className="absolute top-4 left-0 w-full h-px bg-white transform rotate-45 origin-left"></div>
                                  <div className="absolute top-8 left-0 w-full h-px bg-white transform rotate-45 origin-left"></div>
                                  <div className="absolute top-12 left-0 w-full h-px bg-white transform rotate-45 origin-left"></div>
                                </div>
                              </div>

                              <div className="absolute bottom-0 right-0 w-32 h-32 opacity-5">
                                <svg viewBox="0 0 100 100" fill="none">
                                  <polygon
                                    points="50,0 100,50 50,100 0,50"
                                    fill="white"
                                  />
                                </svg>
                              </div>
                            </div>

                            <div className="h-12 bg-zinc-800 mt-6 relative border-y border-zinc-600">
                              <div className="absolute inset-0 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700"></div>
                              <div className="absolute inset-0 opacity-30">
                                <div className="h-full flex items-center">
                                  <div className="w-full h-px bg-white/20"></div>
                                </div>
                              </div>
                            </div>

                            <div className="p-6 relative z-10">
                              <div className="bg-white/95 h-10 mb-4 rounded-lg flex items-center justify-end pr-4 shadow-inner border border-zinc-300">
                                <span className="text-gray-800 font-mono font-semibold tracking-wider">
                                  {formData.cvv || "•••"}
                                </span>
                              </div>
                              <div className="text-xs opacity-90 text-center font-medium mb-4">
                                For your security, please keep your CVV private
                              </div>

                              <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs opacity-70">
                                  <span>Authorized Signature</span>
                                  <span>Valid Thru</span>
                                </div>
                                <div className="h-px bg-white/20 w-full"></div>
                                <div className="text-center text-xs opacity-60">
                                  Customer Service: 1-800-XXX-XXXX
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-zinc-700 mb-2">
                            Card Number
                          </label>
                          <input
                            type="text"
                            value={formData.cardNumber}
                            onChange={(e) =>
                              handleInputChange("cardNumber", e.target.value)
                            }
                            className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                              errors.cardNumber
                                ? "border-red-300 focus:border-red-500"
                                : "border-zinc-300 focus:border-zinc-900"
                            } focus:outline-none focus:ring-0`}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                          />
                          {errors.cardNumber && (
                            <p className="text-red-500 text-sm mt-1">
                              {errors.cardNumber}
                            </p>
                          )}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              value={formData.expiryDate}
                              onChange={(e) =>
                                handleInputChange("expiryDate", e.target.value)
                              }
                              className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                                errors.expiryDate
                                  ? "border-red-300 focus:border-red-500"
                                  : "border-zinc-300 focus:border-zinc-900"
                              } focus:outline-none focus:ring-0`}
                              placeholder="MM/YY"
                              maxLength="5"
                            />
                            {errors.expiryDate && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.expiryDate}
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-zinc-700 mb-2">
                              CVV
                            </label>
                            <div className="relative">
                              <input
                                type={showCVV ? "text" : "password"}
                                value={formData.cvv}
                                onChange={(e) =>
                                  handleInputChange("cvv", e.target.value)
                                }
                                onFocus={() => setCardFlipped(true)}
                                onBlur={() => setCardFlipped(false)}
                                className={`w-full px-4 py-3 pr-12 rounded-xl border transition-all duration-200 ${
                                  errors.cvv
                                    ? "border-red-300 focus:border-red-500"
                                    : "border-zinc-300 focus:border-zinc-900"
                                } focus:outline-none focus:ring-0`}
                                placeholder="123"
                                maxLength="4"
                              />
                              <button
                                type="button"
                                onClick={() => setShowCVV(!showCVV)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-500 hover:text-zinc-700"
                              >
                                {showCVV ? (
                                  <EyeOff className="w-4 h-4" />
                                ) : (
                                  <Eye className="w-4 h-4" />
                                )}
                              </button>
                            </div>
                            {errors.cvv && (
                              <p className="text-red-500 text-sm mt-1">
                                {errors.cvv}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-200"
                >
                  <h2 className="text-xl font-semibold text-zinc-900 mb-6">
                    Billing Address
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-zinc-700 mb-2">
                        Street Address
                      </label>
                      <input
                        type="text"
                        value={formData.billingAddress}
                        onChange={(e) =>
                          handleInputChange("billingAddress", e.target.value)
                        }
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                          errors.billingAddress
                            ? "border-red-300 focus:border-red-500"
                            : "border-zinc-300 focus:border-zinc-900"
                        } focus:outline-none focus:ring-0`}
                        placeholder="123 Main Street"
                      />
                      {errors.billingAddress && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.billingAddress}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                            errors.city
                              ? "border-red-300 focus:border-red-500"
                              : "border-zinc-300 focus:border-zinc-900"
                          } focus:outline-none focus:ring-0`}
                          placeholder="New York"
                        />
                        {errors.city && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.city}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-zinc-700 mb-2">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          value={formData.postalCode}
                          onChange={(e) =>
                            handleInputChange("postalCode", e.target.value)
                          }
                          className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 ${
                            errors.postalCode
                              ? "border-red-300 focus:border-red-500"
                              : "border-zinc-300 focus:border-zinc-900"
                          } focus:outline-none focus:ring-0`}
                          placeholder="10001"
                        />
                        {errors.postalCode && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors.postalCode}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 4 && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-2xl p-8 shadow-sm border border-zinc-200 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </motion.div>

                  <h2 className="text-2xl font-bold text-zinc-900 mb-4">
                    Order Placed Successfully!
                  </h2>
                  <p className="text-zinc-600 mb-6">
                    Thank you for your furniture purchase from Amazon. Your
                    luxury furniture items will be delivered to your address
                    within 5-7 business days.
                  </p>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="text-blue-800 font-medium text-sm">
                        Order Confirmation
                      </span>
                    </div>
                    <p className="text-blue-700 text-sm">
                      A detailed receipt and tracking information will be sent
                      to your email address shortly.
                    </p>
                  </div>

                  <div className="bg-zinc-50 rounded-xl p-4 mb-6 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-600">Order ID:</span>
                      <span className="font-mono text-zinc-900">
                        #AMZ-{Date.now().toString().slice(-8)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-600">Estimated Delivery:</span>
                      <span className="text-zinc-900">
                        {new Date(
                          Date.now() + 7 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-zinc-600">Total Amount:</span>
                      <span className="font-semibold text-zinc-900">
                        ₹{totals.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step Navigation Buttons */}
            {currentStep < 4 && (
              <div className="flex justify-between mt-8">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
                    currentStep === 1
                      ? "bg-zinc-100 text-zinc-400 cursor-not-allowed"
                      : "bg-white border border-zinc-300 text-zinc-700 hover:border-zinc-900"
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all duration-200"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isProcessing}
                    className="flex items-center space-x-2 px-8 py-3 bg-zinc-900 text-white rounded-xl hover:bg-zinc-800 transition-all duration-200 disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4" />
                        <span>Complete Payment</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            )}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 mt-6">
              <h3 className="text-lg font-semibold text-zinc-900 mb-4">
                Why shop with us?
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CircleSmall className="w-4 h-4 text-zinc-900" />
                  <span className="text-sm text-zinc-700">
                    15 Days Return Policy
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CircleSmall className="w-4 h-4 text-zinc-900" />
                  <span className="text-sm text-zinc-700">2-Year Warranty</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CircleSmall className="w-4 h-4 text-zinc-900" />
                  <span className="text-sm text-zinc-700">
                    Free Delivery & Setup
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            {/* Total Amount Display */}
            <div className="bg-zinc-900 text-white rounded-xl p-4 mb-6">
              <div className="text-center">
                <p className="text-sm opacity-90 mb-1">Total Amount</p>
                <p className="text-2xl font-bold">₹{totals.total.toFixed(2)}</p>
                {totals.discount > 0 && (
                  <p className="text-xs opacity-75 mt-1">
                    You saved ₹{totals.discount.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-zinc-200 sticky top-32">
              <h3 className="text-lg font-semibold text-zinc-900 mb-6">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                {orderSummary.items.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <p className="font-medium text-zinc-900">{item.name}</p>
                        <p className="text-xs text-zinc-500">
                          {item.description}
                        </p>
                        <p className="text-sm text-zinc-500">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <p className="font-medium text-zinc-900">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-zinc-200 pt-4 space-y-2 mb-4">
                <div className="flex justify-between text-zinc-600">
                  <span>Subtotal</span>
                  <span>₹{totals.subtotal.toFixed(2)}</span>
                </div>

                {totals.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedPromo.code})</span>
                    <span>-${totals.discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between text-zinc-600">
                  <span>GST (18%)</span>
                  <span>₹{totals.gst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-zinc-600">
                  <span>Shipping</span>
                  <span>₹{totals.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Total</span>
                  <span>₹{totals.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Promo Code Section */}
              <div className="border-t border-zinc-200 pt-4 mb-4">
                <div className="space-y-3">
                  <h4 className="text-sm font-medium text-zinc-900">
                    Promo Code
                  </h4>

                  {!appliedPromo ? (
                    <div className="space-y-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => {
                            setPromoCode(e.target.value);
                            setPromoError("");
                          }}
                          placeholder="Enter promo code"
                          className="flex-1 px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-all duration-200"
                          onKeyPress={(e) =>
                            e.key === "Enter" && handleApplyPromo()
                          }
                        />
                        <button
                          onClick={handleApplyPromo}
                          className="px-4 py-2 text-sm bg-zinc-900 text-white rounded-lg hover:bg-zinc-800 transition-all duration-200"
                        >
                          Apply
                        </button>
                      </div>

                      {promoError && (
                        <p className="text-red-500 text-xs">{promoError}</p>
                      )}

                      <div className="text-xs text-zinc-500 space-y-1">
                        <p className="font-medium">Test codes:</p>
                        <p>• LUXURY20 (20% off)</p>
                        <p>• FURNITURE15 (15% off)</p>
                        <p>• WELCOME10 (10% off)</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-green-800">
                          {appliedPromo.code}
                        </p>
                        <p className="text-xs text-green-600">
                          {appliedPromo.description}
                        </p>
                      </div>
                      <button
                        onClick={handleRemovePromo}
                        className="text-green-600 hover:text-green-800 text-sm underline"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 p-4 bg-zinc-50 rounded-xl">
                <div className="flex items-center space-x-2 text-sm justify-center text-zinc-600">
                  <Shield className="w-4 h-4 text-green-600" />
                  <span>Secure payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardCheckout;
