import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff,
  Check, 
  Menu,
  X,
  CheckCircle2,
  Zap,
  Code,
  GitBranch,
  Monitor,
  FileText,
  TrendingUp,
  Users,
  Shield,
  Star,
  Play,
  Sparkles,
  ChevronRight,
  LockKeyhole
} from 'lucide-react';

const ProductivitySignUp = () => {
  // State management
  const [formStep, setFormStep] = useState('email'); // 'email' or 'full'
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    password: '',
    company: '',
    agreeTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [expandedFeature, setExpandedFeature] = useState(null);

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Form handlers
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (formData.email) {
      setFormStep('full');
    }
  };

  const handleFullSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setShowSuccessModal(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const floatingVariants = {
    float: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Features data
  const features = [
    {
      id: 1,
      icon: Code,
      title: "Smart Code Generation",
      subtitle: "AI-powered development",
      description: "Automatically generate production-ready code based on your requirements and specifications.",
      image: "/smart.png"
    },
    {
      id: 2,
      icon: GitBranch,
      title: "Workflow Automation",
      subtitle: "End-to-end pipeline",
      description: "Development lifecycle automation with zero manual intervention.",
      image: "/work.png"
    },
    {
      id: 3,
      icon: FileText,
      title: "Smart Documentation",
      subtitle: "Auto-generated docs",
      description: "Real-time documentation generation that stays synchronized with your codebase changes.",
      image: "/docs.png"
    },
    {
      id: 4,
      icon: TrendingUp,
      title: "Progress Tracking",
      subtitle: "Real-time insights",
      description: "Detailed analytics and progress tracking with predictive timeline estimates.",
      image: "/track.png"
    }
  ];

  // Floating elements data
  const floatingElements = [
    { icon: Zap, position: { top: '20%', left: '10%' }, delay: 0 },
    { icon: Code, position: { top: '30%', right: '15%' }, delay: 1 },
    { icon: GitBranch, position: { bottom: '25%', left: '8%' }, delay: 2 },
    { icon: Monitor, position: { bottom: '35%', right: '12%' }, delay: 0.5 }
  ];

  // Success Modal Component
  const SuccessModal = () => (
    <AnimatePresence>
      {showSuccessModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowSuccessModal(false)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              </motion.div>
              
              <h3 className="text-2xl font-bold text-zinc-900 mb-2">Welcome to FlowAI!</h3>
              <p className="text-zinc-600 mb-6">You're now on the early access list. We'll notify you when your account is ready.</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-sm text-zinc-700">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  Priority access to beta features
                </div>
                <div className="flex items-center text-sm text-zinc-700">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  Free premium trial for 3 months
                </div>
                <div className="flex items-center text-sm text-zinc-700">
                  <Check className="w-4 h-4 text-green-600 mr-2" />
                  Exclusive community access
                </div>
              </div>
              
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-zinc-900 text-white py-3 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                Continue
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen bg-zinc-50 relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements.map((element, index) => (
        <motion.div
          key={index}
          className="absolute hidden lg:block"
          style={element.position}
          variants={floatingVariants}
          animate="float"
          transition={{ delay: element.delay }}
        >
          <div className="w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-zinc-200/50">
            <element.icon className="w-6 h-6 text-zinc-600" />
          </div>
        </motion.div>
      ))}

      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-40"
      >
        <motion.div
          animate={{
            marginTop: isScrolled ? 12 : 0,
            marginLeft: isScrolled ? 24 : 0,
            marginRight: isScrolled ? 24 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`transition-all duration-300 ${
            isScrolled 
              ? 'bg-white/90 backdrop-blur-lg shadow-lg border border-zinc-200/50 rounded-2xl' 
              : 'bg-transparent'
          }`}
        >
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center">
                  <img className='rounded-lg border-1 border-black' src="/logo.png" alt=""/>
                </div>
                <span className="text-xl font-bold text-zinc-900">FlowAI</span>
              </motion.div>
              
              <nav className="hidden lg:flex items-center space-x-8">
                {['Features', 'Pricing', 'About'].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    whileHover={{ y: -1 }}
                    className="text-zinc-700 hover:text-zinc-900 transition-colors font-medium"
                  >
                    {item}
                  </motion.a>
                ))}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors font-medium"
                >
                  Sign In
                </motion.button>
              </nav>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.header>

      <main className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-6 relative">
          {/* Background Image Layer with Filter */}
          <div className="absolute inset-0 bg-[url('/bg.png')] bg-cover bg-center filter invert"></div>
          
          {/* Content Layer (not affected by filter) */}
          <div className="relative z-10">
            <div className="container mx-auto max-w-4xl">
              <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center space-y-8"
            >
              {/* Hero Content */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="inline-flex items-center space-x-2 bg-zinc-100 rounded-full px-4 py-2 text-sm">
                  <Sparkles className="w-4 h-4 text-zinc-600" />
                  <span className="text-zinc-700 font-medium">AI-Powered Development Automation</span>
                </div>
                
                <h1 className="text-5xl lg:text-6xl font-bold text-zinc-900 leading-tight">
                  From Idea to
                  <br />
                  <span className="bg-gradient-to-r from-zinc-500 to-zinc-900 bg-clip-text text-transparent">
                    Production
                  </span>
                  <br />
                  in Minutes
                </h1>
                
                <p className="text-xl text-zinc-800 max-w-2xl mx-auto leading-relaxed">
                  Tell FlowAI what you want to build, and watch as it automates your entire development workflow from planning to deployment with intelligent documentation and progress tracking.
                </p>
              </motion.div>

              {/* Progressive Form */}
              <motion.div variants={itemVariants} className="max-w-lg mx-auto">
                <AnimatePresence mode="wait">
                  {formStep === 'email' ? (
                    <motion.div
                      key="email-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-4"
                    >
                      <form onSubmit={handleEmailSubmit} className="space-y-4">
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email for early access"
                            className="w-full pl-12 pr-4 py-4 border border-zinc-300 rounded-xl focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition-all text-lg"
                            required
                          />
                        </div>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full bg-zinc-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-2"
                        >
                          <span>Get Early Access</span>
                          <ArrowRight className="w-5 h-5" />
                        </motion.button>
                      </form>
                      <p className="text-sm text-zinc-500">
                        Join 500+ developers already on the waitlist
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="full-form"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="bg-white rounded-2xl shadow-xl p-8 border border-zinc-200"
                    >
                      <div className="mb-6 text-center">
                        <h3 className="text-2xl font-bold text-zinc-900 mb-2">Almost there!</h3>
                        <p className="text-zinc-600">Complete your early access registration</p>
                      </div>

                      <form onSubmit={handleFullSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleInputChange}
                              placeholder="Full Name"
                              className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition-all"
                              required
                            />
                          </div>
                          <div className="relative">
                            <input
                              type="text"
                              name="company"
                              value={formData.company}
                              onChange={handleInputChange}
                              placeholder="Company (Optional)"
                              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition-all"
                            />
                          </div>
                        </div>

                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition-all bg-zinc-50"
                            readOnly
                          />
                        </div>

                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-400" />
                          <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Create Password"
                            className="w-full pl-10 pr-12 py-3 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition-all"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>

                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            name="agreeTerms"
                            checked={formData.agreeTerms}
                            onChange={handleInputChange}
                            className="w-4 h-4 mt-1 text-zinc-900 border-zinc-300 rounded focus:ring-zinc-500"
                            required
                          />
                          <label className="text-sm text-zinc-600 leading-relaxed">
                            I agree to the{' '}
                            <a href="#" className="text-zinc-900 hover:underline">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="text-zinc-900 hover:underline">Privacy Policy</a>
                          </label>
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                          whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                          className={`w-full bg-zinc-900 text-white py-3 rounded-lg font-semibold hover:bg-zinc-800 transition-colors flex items-center justify-center space-x-2 ${
                            isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                              />
                              <span>Creating Account...</span>
                            </>
                          ) : (
                            <>
                              <span>Complete Registration</span>
                              <ArrowRight className="w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      </form>

                      <div className="mt-6 text-center">
                        <button
                          onClick={() => setFormStep('email')}
                          className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
                        >
                          ← Back to email step
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Social Proof */}
              <motion.div variants={itemVariants} className="flex items-center justify-center space-x-6 text-sm text-zinc-500">
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>500+ developers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="w-4 h-4" />
                  <span>Enterprise ready</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LockKeyhole  className="w-4 h-4" />
                  <span>Secure Infrastructure</span>
                </div>
              </motion.div>
              </motion.div>
            </div>
          </div>
        </section>        {/* Features Section */}
        <section className="py-20 px-6 bg-white">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-zinc-900 mb-4">
                Everything you need to automate development
              </h2>
              <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
                From initial concept to production deployment, FlowAI handles the entire development lifecycle.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-zinc-50 rounded-2xl p-6 h-full border border-zinc-200 hover:border-zinc-300 transition-all cursor-pointer"
                  >
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="w-12 h-12 bg-zinc-900 rounded-xl flex items-center justify-center flex-shrink-0">
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-zinc-900 mb-2">{feature.title}</h3>
                        <p className="text-sm text-zinc-500 mb-3 font-medium">{feature.subtitle}</p>
                      </div>
                    </div>
                    
                    <p className="text-zinc-600 leading-relaxed mb-4">{feature.description}</p>
                    
                    {/* Image Preview Area */}
                    <motion.div 
                      className="mb-4 relative overflow-hidden"
                      animate={{ 
                        height: hoveredFeature === feature.id ? 256 : 192 
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        onMouseEnter={() => setHoveredFeature(feature.id)}
                        onMouseLeave={() => setHoveredFeature(null)}
                        className="absolute inset-0"
                      >
                        <motion.div
                          animate={{ 
                            scale: hoveredFeature === feature.id ? 1.02 : 1,
                          }}
                          transition={{ duration: 0.3 }}
                          className="bg-zinc-100 rounded-lg h-full border border-zinc-200 relative overflow-hidden"
                        >
                          {/* Display actual image if URL provided, otherwise show placeholder */}
                          {feature.image && !feature.image.includes('PLACEHOLDER') ? (
                            <div className="w-full h-full relative">
                              <img 
                                src={feature.image} 
                                alt={`${feature.title} interface preview`}
                                className="w-full h-full object-cover object-center"
                                onError={(e) => {
                                  // Fallback to placeholder if image fails to load
                                  e.target.style.display = 'none';
                                  e.target.nextSibling.style.display = 'flex';
                                }}
                              />
                              {/* Fallback placeholder (hidden by default) */}
                              <div className="hidden w-full h-full flex-col items-center justify-center absolute inset-0">
                                <div className="text-4xl mb-2">📸</div>
                                <div className="text-xs font-medium text-zinc-600 text-center px-2">
                                  {feature.id === 1 && "AI-powered code generation"}
                                  {feature.id === 2 && "Automated workflow dashboard"}
                                  {feature.id === 3 && "Smart documentation generator"}
                                  {feature.id === 4 && "Real-time analytics dashboard"}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center">
                              <div className="text-4xl mb-2">📸</div>
                              <div className="text-xs font-medium text-zinc-600 mb-1">{feature.image}</div>
                              <div className="text-xs text-zinc-500 text-center px-2">
                                {feature.id === 1 && "AI-powered code generation"}
                                {feature.id === 2 && "Automated workflow dashboard"}
                                {feature.id === 3 && "Smart documentation generator"}
                                {feature.id === 4 && "Real-time analytics dashboard"}
                              </div>
                            </div>
                          )}
                          
                          {hoveredFeature === feature.id && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute bottom-3 left-1/2 transform -translate-x-1/2 inline-flex items-center space-x-2 bg-zinc-900 text-white px-3 py-1.5 rounded-lg text-xs font-medium shadow-lg"
                            >
                              <Play className="w-3 h-3" />
                              <span>View Demo</span>
                            </motion.div>
                          )}
                        </motion.div>
                      </motion.div>
                    </motion.div>

                    {/* Expandable Content */}
                    <AnimatePresence>
                      {expandedFeature === feature.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="overflow-hidden mb-4"
                        >
                          <div className="bg-white rounded-lg p-4 border border-zinc-200 shadow-sm">
                            <h4 className="font-semibold text-zinc-900 mb-3">Key Features:</h4>
                            <ul className="space-y-2 text-sm text-zinc-600">
                              {feature.id === 1 && (
                                <>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>Natural language to code conversion</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>Multi-language support (React, Python, Node.js)</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>Best practices enforcement</span>
                                  </li>
                                </>
                              )}
                              {feature.id === 2 && (
                                <>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>CI/CD pipeline automation</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>Testing and deployment workflows</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>Environment management</span>
                                  </li>
                                </>
                              )}
                              {feature.id === 3 && (
                                <>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>API documentation generation</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>Code comments and explanations</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>Interactive documentation sites</span>
                                  </li>
                                </>
                              )}
                              {feature.id === 4 && (
                                <>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>Real-time progress monitoring</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>Performance metrics and insights</span>
                                  </li>
                                  <li className="flex items-center space-x-2">
                                    <Check className="w-4 h-4 text-green-600 flex-shrink-0" />
                                    <span>Predictive timeline estimates</span>
                                  </li>
                                </>
                              )}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
                      className="flex items-center space-x-2 text-zinc-900 font-medium hover:text-zinc-700 transition-colors"
                    >
                      <span>{expandedFeature === feature.id ? 'Show less' : 'Learn more'}</span>
                      <motion.div
                        animate={{ rotate: expandedFeature === feature.id ? 90 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </motion.div>
                    </motion.button>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section className="py-20 px-6 bg-zinc-900 text-white rounded-t-[3rem] outline-t outline-2 outline-zinc-800 outline-offset-4">
          <div className="container mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                See FlowAI in action
              </h2>
              <p className="text-xl text-zinc-300 mb-8">
                Watch how FlowAI transforms a simple idea into a complete development lifecycle in minutes.
              </p>
              
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative aspect-video bg-zinc-800 rounded-2xl overflow-hidden cursor-pointer group"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 bg-white rounded-full flex items-center justify-center group-hover:bg-zinc-100 transition-colors"
                  >
                    <Play className="w-6 h-6 text-zinc-900 ml-1" />
                  </motion.div>
                </div>
                <div className="absolute bottom-4 left-4 text-zinc-400 text-sm">
                  DEMO VIDEO
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <img className='rounded-lg' src="/logo.png" alt=""/>
                </div>
                <span className="text-xl font-bold">FlowAI</span>
              </div>
              <p className="text-zinc-400 text-sm">
                Automating development workflows with AI-powered intelligence.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-sm text-zinc-400">
                <a href="#" className="hover:text-white transition-colors block">Features</a>
                <a href="#" className="hover:text-white transition-colors block">Pricing</a>
                <a href="#" className="hover:text-white transition-colors block">Documentation</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <div className="space-y-2 text-sm text-zinc-400">
                <a href="#" className="hover:text-white transition-colors block">About</a>
                <a href="#" className="hover:text-white transition-colors block">Blog</a>
                <a href="#" className="hover:text-white transition-colors block">Careers</a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-sm text-zinc-400">
                <a href="#" className="hover:text-white transition-colors block">Help Center</a>
                <a href="#" className="hover:text-white transition-colors block">Contact</a>
                <a href="#" className="hover:text-white transition-colors block">Status</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-sm text-zinc-400">
            <p>&copy; 2025 FlowAI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Success Modal */}
      <SuccessModal />
    </div>
  );
};

export default ProductivitySignUp;
