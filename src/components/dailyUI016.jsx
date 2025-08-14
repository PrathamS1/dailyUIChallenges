import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import BackToHome from "./BackToHome";

const PremiumContentOverlay = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("quarterly");

  const articleContent = {
    title: "The Hidden Economics of Climate Technology Investment",
    author: "Dr. Elena Marchetti",
    readTime: "12 min read",
    excerpt: "Recent developments in carbon capture technology have created unprecedented opportunities for investors. However, the true potential lies not in the obvious solutions, but in the infrastructure that enables them...",
    publishDate: "Aug 12, 2025"
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const plans = {
    monthly: {
      price: 24,
      period: "month",
      savings: null
    },
    quarterly: {
      price: 18,
      period: "month",
      savings: "25% off",
      popular: true
    },
    yearly: {
      price: 12,
      period: "month",
      savings: "50% off"
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 relative overflow-hidden">
      <BackToHome />
      
      <div 
        className={`transition-all duration-700 ${showOverlay ? 'blur-sm scale-105' : ''}`}
        style={{ filter: showOverlay ? 'brightness(0.7)' : 'brightness(1)' }}
      >
        <div className="max-w-4xl mx-auto px-8 py-16">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-sm text-stone-500">
                <span>{articleContent.publishDate}</span>
                <span>•</span>
                <span>{articleContent.readTime}</span>
              </div>
              <h1 className="text-4xl font-light text-stone-900 leading-tight">
                {articleContent.title}
              </h1>
              <p className="text-lg text-stone-600 font-light">
                By {articleContent.author}
              </p>
            </div>

            <div className="space-y-6 text-stone-700 leading-relaxed">
              <p className="text-lg">
                {articleContent.excerpt}
              </p>
              
              <div className="space-y-4">
                <p>
                  The traditional approach to climate investment has focused heavily on renewable energy generation. Solar panels, wind turbines, and battery storage have dominated the conversation—and rightly so. These technologies form the backbone of our transition to sustainable energy.
                </p>
                <p>
                  However, emerging data suggests that the most significant returns, both financial and environmental, may come from the less visible infrastructure that connects these systems. Smart grid technology, advanced materials, and predictive maintenance systems represent a $2.3 trillion market opportunity that remains largely untapped.
                </p>
                <p>
                  Consider the case study of Nordic Energy Solutions, a relatively unknown company that has quietly revolutionized how renewable energy systems communicate with existing power grids. Their proprietary algorithms have reduced energy waste by 34% across their partner networks, generating returns that outpace traditional renewable investments by...
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="absolute inset-0 bg-stone-900/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              onClick={() => setShowOverlay(false)}
            />

            <motion.div
              className="relative bg-white rounded-none shadow-2xl max-w-md w-full mx-4"
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <button
                onClick={() => setShowOverlay(false)}
                className="absolute top-6 right-6 w-8 h-8 text-stone-400 hover:text-stone-600 transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="p-8 pt-12">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-light text-stone-900 mb-3">
                    Continue Reading
                  </h2>
                  <p className="text-stone-600 leading-relaxed">
                    Get unlimited access to expert analysis and in-depth market research
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {Object.entries(plans).map(([key, plan]) => (
                    <motion.button
                      key={key}
                      onClick={() => setSelectedPlan(key)}
                      className={`w-full p-4 border transition-all duration-200 ${
                        selectedPlan === key
                          ? 'border-stone-800 bg-stone-50'
                          : 'border-stone-200 hover:border-stone-300'
                      }`}
                      whileHover={{ scale: selectedPlan === key ? 1 : 1.01 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="text-left">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-stone-900 capitalize">
                              {key}
                            </span>
                            {plan.popular && (
                              <span className="text-xs text-stone-500 bg-stone-100 px-2 py-0.5">
                                Popular
                              </span>
                            )}
                          </div>
                          {plan.savings && (
                            <span className="text-xs text-stone-500">
                              {plan.savings}
                            </span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-light text-stone-900">
                            ${plan.price}
                          </span>
                          <span className="text-sm text-stone-500">
                            /{plan.period}
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  ))}
                </div>

                <motion.button
                  className="w-full bg-stone-900 text-white py-4 font-medium transition-all duration-200 hover:bg-stone-800"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    setShowOverlay(false);
                  }}
                >
                  Start Reading Now
                </motion.button>

                <div className="mt-6 text-center">
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Cancel anytime. No commitments.
                  </p>
                  <button 
                    className="text-xs text-stone-400 hover:text-stone-600 transition-colors mt-2 underline underline-offset-2"
                    onClick={() => setShowOverlay(false)}
                  >
                    Continue with free preview
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showOverlay && (
        <button
          onClick={() => setShowOverlay(true)}
          className="fixed bottom-8 right-8 bg-stone-800 text-white px-4 py-2 text-sm hover:bg-stone-700 transition-colors opacity-0 animate-fade-in"
          style={{ animationDelay: '3s', animationFillMode: 'forwards' }}
        >
          Show Overlay
        </button>
      )}
    </div>
  );
};

export default PremiumContentOverlay;
