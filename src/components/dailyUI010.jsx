import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Bookmark,
  MoreHorizontal,
  Verified,
  Calendar,
  MapPin,
  Twitter,
  Instagram,
  Camera
} from 'lucide-react';
import BackToHome from './BackToHome';

// Custom Animated Share Icon Component
const AnimatedShareIcon = ({ className, isAnimating = false }) => {
  return (
    <svg 
      className={className} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Main sharing node (center circle) */}
      <motion.circle
        cx="12"
        cy="12"
        r="2"
        fill="currentColor"
        animate={isAnimating ? {
          scale: [1, 1.3, 1],
          opacity: [1, 0.8, 1]
        } : {}}
        transition={{
          duration: 0.6,
          repeat: isAnimating ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      
      {/* Top node */}
      <motion.circle
        cx="18"
        cy="6"
        r="2"
        fill="currentColor"
        animate={isAnimating ? {
          scale: [1, 1.2, 1],
          y: [0, -2, 0]
        } : {}}
        transition={{
          duration: 0.8,
          repeat: isAnimating ? Infinity : 0,
          ease: "easeInOut",
          delay: 0.1
        }}
      />
      
      {/* Bottom node */}
      <motion.circle
        cx="6"
        cy="18"
        r="2"
        fill="currentColor"
        animate={isAnimating ? {
          scale: [1, 1.2, 1],
          y: [0, 2, 0]
        } : {}}
        transition={{
          duration: 0.8,
          repeat: isAnimating ? Infinity : 0,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
      
      {/* Connecting lines with animation */}
      <motion.path
        d="M10.5 10.5L7.5 15.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isAnimating ? {
          pathLength: [0, 1, 0],
          opacity: [0, 1, 0]
        } : {
          pathLength: 1,
          opacity: 1
        }}
        transition={{
          duration: 1.2,
          repeat: isAnimating ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
      
      <motion.path
        d="M13.5 10.5L16.5 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={isAnimating ? {
          pathLength: [0, 1, 0],
          opacity: [0, 1, 0]
        } : {
          pathLength: 1,
          opacity: 1
        }}
        transition={{
          duration: 1.2,
          repeat: isAnimating ? Infinity : 0,
          ease: "easeInOut",
          delay: 0.3
        }}
      />
      
      {/* Pulsing effect around center */}
      <motion.circle
        cx="12"
        cy="12"
        r="6"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
        animate={isAnimating ? {
          scale: [1, 1.5, 1],
          opacity: [0.3, 0, 0.3]
        } : {}}
        transition={{
          duration: 1.5,
          repeat: isAnimating ? Infinity : 0,
          ease: "easeInOut"
        }}
      />
    </svg>
  );
};

const SocialShare = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isRetweeted, setIsRetweeted] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isScreenshotting, setIsScreenshotting] = useState(false);
  const [likeCount, setLikeCount] = useState(2847);
  const [retweetCount, setRetweetCount] = useState(892);
  const [replyCount] = useState(156);
  
  const postRef = useRef(null);
  const shareButtonRef = useRef(null);

  // Sample X post data
  const post = {
    author: {
      name: "Pratham Singh",
      username: "pratham_s1",
      avatar: "/me.jpg",
      verified: true,
      bio: "Frontend Developer & UI/UX Designer"
    },
    content: "Just shipped a new Daily UI Challenge! 🚀\n\nBuilding a social share component with some mind-blowing animations and effects. The screenshot capture feature is absolutely insane! 🤯\n\n#DailyUI #React #WebDev #Frontend",
    timestamp: "2h",
    date: "Aug 3, 2025",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    ]
  };

  // Drawer share options (only 3 platforms)
  const drawerShareOptions = [
    {
      name: "X",
      icon: Twitter,
      color: "text-white"
    },
    {
      name: "Instagram", 
      icon: Instagram,
      color: "text-white"
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      color: "text-white"
    }
  ];

  // Share functions
  const shareToTwitter = () => {
    const text = encodeURIComponent(post.content);
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  const shareToInstagram = () => {
    // Instagram doesn't have direct URL sharing, so we'll copy the content
    navigator.clipboard.writeText(post.content);
    alert("Content copied! Open Instagram and paste in your story or post.");
  };

  const shareToWhatsApp = () => {
    const text = encodeURIComponent(`${post.content}\n\nCheck this out: ${window.location.href}`);
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Screenshot animation sequence
  const handleShareClick = async () => {
    if (isScreenshotting) return;
    
    setIsScreenshotting(true);
    
    // Step 1: Flash effect
    setTimeout(() => {
      // Step 2: Screenshot grab animation completes
    }, 600);
    
    // Step 3: Show drawer after animation
    setTimeout(() => {
      setIsDrawerOpen(true);
    }, 1200);
  };

  const handleShare = (platform) => {
    switch (platform) {
      case 'X':
        shareToTwitter();
        break;
      case 'Instagram':
        shareToInstagram();
        break;
      case 'WhatsApp':
        shareToWhatsApp();
        break;
      default:
        break;
    }
    setIsDrawerOpen(false);
    setIsScreenshotting(false);
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shareButtonRef.current && !shareButtonRef.current.contains(event.target)) {
        setIsDrawerOpen(false);
        setIsScreenshotting(false);
      }
    };

    if (isDrawerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDrawerOpen]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleRetweet = () => {
    setIsRetweeted(!isRetweeted);
    setRetweetCount(prev => isRetweeted ? prev - 1 : prev + 1);
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <BackToHome />

      <div className="container mx-auto px-4 py-12 max-w-lg">
        {/* X Post Replica */}
        <motion.div
          ref={postRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`bg-black border border-gray-800 rounded-2xl p-4 relative overflow-hidden ${
            isScreenshotting ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
          }`}
        >
          {/* Screenshot Flash Overlay - Only over the post */}
          <AnimatePresence>
            {isScreenshotting && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, times: [0, 0.5, 1] }}
                className="absolute inset-0 bg-white z-30 pointer-events-none rounded-2xl"
              />
            )}
          </AnimatePresence>
          {/* Screenshot Capture Effect */}
          <AnimatePresence>
            {isScreenshotting && (
              <>
                {/* Scanning line */}
                <motion.div
                  initial={{ top: '-2px', opacity: 0 }}
                  animate={{ top: '100%', opacity: [0, 1, 1, 0] }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent z-20"
                />
                
                {/* Corner brackets */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute inset-0 z-10"
                >
                  {/* Top-left bracket */}
                  <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-blue-400"></div>
                  {/* Top-right bracket */}
                  <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-blue-400"></div>
                  {/* Bottom-left bracket */}
                  <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-blue-400"></div>
                  {/* Bottom-right bracket */}
                  <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-blue-400"></div>
                </motion.div>
              </>
            )}
          </AnimatePresence>

          {/* Post Header */}
          <div className="flex items-start space-x-3 mb-3">
            <div className="relative">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full"
              />
              {post.author.verified && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                  <Verified className="w-2.5 h-2.5 text-white fill-current" />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h3 className="font-bold text-white text-sm">{post.author.name}</h3>
                <span className="text-gray-500 text-sm">@{post.author.username}</span>
                <span className="text-gray-500 text-sm">·</span>
                <span className="text-gray-500 text-sm">{post.timestamp}</span>
              </div>
              <p className="text-xs text-gray-400">{post.author.bio}</p>
            </div>
            
            <button className="text-gray-500 hover:text-gray-300 transition-colors">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>

          {/* Post Content */}
          <div className="mb-3">
            <p className="text-white text-sm leading-relaxed whitespace-pre-line">
              {post.content}
            </p>
          </div>

          {/* Post Image */}
          {post.images.length > 0 && (
            <div className="mb-3 rounded-xl overflow-hidden">
              <img
                src={post.images[0]}
                alt="Post content"
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* Post Meta */}
          <div className="flex items-center text-xs text-gray-500 mb-3 space-x-3">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>{post.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-3 h-3" />
              <span>India</span>
            </div>
          </div>

          {/* Engagement Stats */}
          <div className="flex items-center space-x-4 py-2 border-t border-gray-800 text-xs text-gray-500">
            <span><strong className="text-white">{replyCount}</strong> Replies</span>
            <span><strong className="text-white">{retweetCount}</strong> Reposts</span>
            <span><strong className="text-white">{likeCount}</strong> Likes</span>
            <span><strong className="text-white">47</strong> Bookmarks</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-800">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-1 text-gray-500 hover:text-blue-400 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{replyCount}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleRetweet}
              className={`flex items-center space-x-1 transition-colors ${
                isRetweeted ? 'text-green-400' : 'text-gray-500 hover:text-green-400'
              }`}
            >
              <Repeat2 className="w-4 h-4" />
              <span className="text-xs">{retweetCount}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleLike}
              className={`flex items-center space-x-1 transition-colors ${
                isLiked ? 'text-red-400' : 'text-gray-500 hover:text-red-400'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-xs">{likeCount}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleBookmark}
              className={`transition-colors ${
                isBookmarked ? 'text-blue-400' : 'text-gray-500 hover:text-blue-400'
              }`}
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-current' : ''}`} />
            </motion.button>
          </div>
        </motion.div>

        {/* Sliding Drawer Share Button */}
        <div className="flex justify-center mt-16 mb-12">
          <div className="relative" ref={shareButtonRef}>
            {/* Main Share Button Container */}
            <motion.div className="relative">
              {/* Background Button (always visible) */}
              <div className="px-8 py-4 bg-zinc-900/50 backdrop-blur-sm border border-zinc-600/30 rounded-xl text-white font-semibold tracking-wide shadow-lg">
                <div className="flex items-center gap-2 opacity-30">
                  <span>{isScreenshotting ? 'CAPTURING...' : 'SHARE'}</span>
                  {isScreenshotting ? <Camera className="w-5 h-5" /> : <AnimatedShareIcon className="w-5 h-5" />}
                </div>
              </div>

              {/* Sliding Button Parts */}
              <motion.button
                onClick={handleShareClick}
                disabled={isScreenshotting}
                className="absolute inset-0 overflow-hidden bg-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 rounded-xl px-8 py-4 text-white font-semibold tracking-wide shadow-lg hover:shadow-xl transition-all duration-300"
                animate={{
                  scale: isDrawerOpen ? 1.05 : 1
                }}
                transition={{
                  duration: isDrawerOpen ? 0.5 : 0.2, // Fast scale-down when closing
                  delay: isDrawerOpen ? 0 : 0 // No delay when scaling down
                }}
                whileHover={!isDrawerOpen ? { scale: 1.02 } : {}}
                whileTap={{ scale: 0.98 }}
              >
                {/* Single Sliding Lid */}
                <motion.div
                  className="absolute inset-0 bg-zinc-800/90 backdrop-blur-sm border border-zinc-700/50 rounded-xl hover:border-white hover:border-2 flex items-center justify-center gap-2 z-10"
                  animate={{ 
                    x: isDrawerOpen ? "100%" : "0%"
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: "easeInOut",
                    delay: isDrawerOpen ? 0 : 0.5
                  }}
                >
                  <motion.span
                    animate={{ 
                      opacity: isDrawerOpen ? 0 : 1 
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {isScreenshotting ? 'CAPTURING...' : 'SHARE'}
                  </motion.span>
                  <motion.div
                    animate={{ 
                      opacity: isDrawerOpen ? 0 : 1 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {isScreenshotting ? <Camera className="w-5 h-5" /> : <AnimatedShareIcon className="w-5 h-5 ml-2" isAnimating={!isDrawerOpen} />}
                  </motion.div>
                </motion.div>

                {/* Screenshot capture effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-white/30 rounded-xl z-20"
                  animate={isScreenshotting ? { opacity: [0, 0.8, 0] } : { opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
              </motion.button>

              {/* Floating Icons Layer - Single set that moves up */}
              <AnimatePresence>
                {isDrawerOpen && (
                  <div className="absolute inset-0 flex items-center justify-center gap-6 pointer-events-none z-40">
                    {drawerShareOptions.map((option, index) => (
                      <motion.div
                        key={`floating-${option.name}`}
                        initial={{ y: 0, scale: 1 }}
                        animate={{ 
                          y: -50,
                          scale: 1.3,
                          transition: { 
                            delay: 0.2 + (index * 0.1),
                            duration: 0.4, 
                            ease: "easeOut" 
                          }
                        }}
                        exit={{ 
                          y: 0,
                          scale: 1,
                          transition: { 
                            delay: (2 - index) * 0.1, // Reverse order for retraction
                            duration: 0.3, 
                            ease: "easeIn" 
                          }
                        }}
                        className="pointer-events-auto"
                      >
                        <motion.button
                          whileHover={{ 
                            scale: 1.5,
                            transition: { duration: 0.2 }
                          }}
                          onClick={() => handleShare(option.name)}
                          className="p-3 hover:shadow-2xl hover:shadow-white/20 transition-all duration-200 group"
                          whileTap={{ scale: 0.95 }}
                        >
                          <option.icon className={`w-5 h-5 ${option.color} drop-shadow-lg group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-200`} />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialShare;
