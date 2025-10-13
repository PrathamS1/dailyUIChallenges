import { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Shuffle,
  Repeat,
  Heart,
  Search,
  Plus,
  X,
  Menu,
  Share2,
  Download,
  Settings,
  ChevronLeft,
  ChevronRight,
  MicVocal,
  LogIn,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ImmersiveMusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(75);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState("off");
  const [showSearch, setShowSearch] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [showMobileSections, setShowMobileSections] = useState(false);
  const [cardStackHovered, setCardStackHovered] = useState(false);
  const [lyricsExpanded, setLyricsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const progressRef = useRef(null);

  // Fallback data (original static data)
  const fallbackTrendingSongs = [
    {
      title: "Midnight Vibes",
      artist: "Luna Eclipse",
      trend: "+12%",
      cover:
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=80&h=80&fit=crop",
      duration: "3:45",
    },
    {
      title: "Digital Dreams",
      artist: "Cyber Soul",
      trend: "+8%",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=80&h=80&fit=crop",
      duration: "4:12",
    },
    {
      title: "Stellar Winds",
      artist: "Space Drift",
      trend: "+15%",
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=80&h=80&fit=crop",
      duration: "3:58",
    },
  ];

  const fallbackSimilarArtists = [
    {
      name: "Aurora Beats",
      followers: "2.1M",
      avatar:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop",
    },
    {
      name: "Cosmic Echo",
      followers: "1.8M",
      avatar:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=60&h=60&fit=crop",
    },
    {
      name: "Neon Dreams",
      followers: "3.2M",
      avatar:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=60&h=60&fit=crop",
    },
  ];

  const fallbackChartsAndMoods = [
    {
      title: "Today's Top Hits",
      subtitle: "Global chart-toppers",
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
      mood: "energetic",
    },
    {
      title: "Chill Vibes",
      subtitle: "Relaxing electronic beats",
      cover:
        "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=400&h=400&fit=crop",
      mood: "calm",
    },
    {
      title: "Synthwave Nights",
      subtitle: "Retro-futuristic sounds",
      cover:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop",
      mood: "nostalgic",
    },
    {
      title: "Deep Focus",
      subtitle: "Ambient concentration",
      cover:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop",
      mood: "focused",
    },
    {
      title: "Cosmic Journey",
      subtitle: "Space ambient exploration",
      cover:
        "https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400&h=400&fit=crop",
      mood: "ethereal",
    },
    {
      title: "Urban Pulse",
      subtitle: "City rhythm and beats",
      cover:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=400&fit=crop",
      mood: "urban",
    },
  ];

  // Enhanced playlist with dominant colors for dynamic backgrounds
  const fallbackPlaylist = [
    {
      id: 1,
      title: "Cosmic Drift",
      artist: "Stellar Waves",
      album: "Nebula Dreams",
      duration: "4:23",
      durationSeconds: 263,
      cover:
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=500&h=500&fit=crop",
      genre: "Ambient Electronic",
      year: "2024",
      isLiked: true,
      plays: "2.1M",
      dominantColor: "#1a1b3e",
      accentColor: "#4c51bf",
      mood: "ethereal",
      lyrics: [
        { time: 0, text: "Drifting through the cosmic void" },
        { time: 15, text: "Stars align in perfect harmony" },
        { time: 30, text: "Waves of sound carry us forward" },
        { time: 45, text: "Into the endless stellar night" },
        { time: 60, text: "Dreams of nebula dance around" },
        { time: 75, text: "Floating through celestial streams" },
        { time: 90, text: "Time becomes a gentle whisper" },
        { time: 105, text: "In this vast cosmic embrace" },
      ],
    },
    {
      id: 2,
      title: "Neon Nights",
      artist: "Synthwave City",
      album: "Retrograde",
      duration: "3:45",
      durationSeconds: 225,
      cover:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=500&h=500&fit=crop",
      genre: "Synthwave",
      year: "2024",
      isLiked: false,
      plays: "1.8M",
      dominantColor: "#2d1b4e",
      accentColor: "#e53e3e",
      mood: "energetic",
      lyrics: [
        { time: 0, text: "Electric city comes alive" },
        { time: 12, text: "Neon lights paint the sky" },
        { time: 24, text: "Synthetic beats pulse through" },
        { time: 36, text: "Retro vibes fill the air" },
        { time: 48, text: "Dancing shadows on the wall" },
        { time: 60, text: "Future past collides tonight" },
        { time: 72, text: "Cybernetic dreams unfold" },
        { time: 84, text: "In this digital paradise" },
      ],
    },
    {
      id: 3,
      title: "Ocean Depths",
      artist: "Deep Blue",
      album: "Aquatic",
      duration: "5:12",
      durationSeconds: 312,
      cover:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop",
      genre: "Ambient",
      year: "2024",
      isLiked: true,
      plays: "3.2M",
      dominantColor: "#1a365d",
      accentColor: "#3182ce",
      mood: "calm",
      lyrics: [
        { time: 0, text: "Beneath the waves we find peace" },
        { time: 20, text: "Current flows in gentle motion" },
        { time: 40, text: "Deep blue mysteries surround" },
        { time: 60, text: "Silent world of aquatic grace" },
        { time: 80, text: "Flowing with the ocean tide" },
        { time: 100, text: "Weightless in the liquid space" },
        { time: 120, text: "Echoes of the deep blue call" },
        { time: 140, text: "In this underwater realm" },
      ],
    },
    {
      id: 4,
      title: "Urban Pulse",
      artist: "City Lights",
      album: "Metropolitan",
      duration: "4:08",
      durationSeconds: 248,
      cover:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&h=500&fit=crop",
      genre: "Electronic Hip Hop",
      year: "2024",
      isLiked: false,
      plays: "4.7M",
      dominantColor: "#2d3748",
      accentColor: "#ed8936",
      mood: "urban",
      lyrics: [
        { time: 0, text: "City rhythm in my veins" },
        { time: 14, text: "Street lights guide the way" },
        { time: 28, text: "Urban jungle comes alive" },
        { time: 42, text: "Concrete dreams and steel desires" },
        { time: 56, text: "Pulse of life in every corner" },
        { time: 70, text: "Metropolitan symphony plays" },
        { time: 84, text: "Beats echo through the alleyways" },
        { time: 98, text: "This is our city anthem" },
      ],
    },
  ];

  // Use Spotify data if available, fallback to static data
  const playlist = fallbackPlaylist;
  const trendingSongs = fallbackTrendingSongs;
  const similarArtists = fallbackSimilarArtists;
  const chartsAndMoods = fallbackChartsAndMoods;

  const currentTrack = playlist[currentSong];
  const duration = currentTrack?.durationSeconds || 0;

  const currentTrackForDisplay = currentTrack || fallbackPlaylist[0];
  const durationForDisplay = currentTrackForDisplay.durationSeconds;

  // Helper function for mood colors
  const getMoodColor = (mood) => {
    const moodColors = {
      energetic: "#ff6b6b",
      calm: "#4ecdc4",
      nostalgic: "#a8e6cf",
      focused: "#ffd93d",
      ethereal: "#6c5ce7",
      urban: "#fd79a8",
    };
    return moodColors[mood] || "#ffffff";
  };

  // Get current lyric line based on playback time
  const getCurrentLyric = () => {
    const lyrics = currentTrack.lyrics;
    if (!lyrics) return "No lyrics available";

    let currentLyric = lyrics[0];
    for (let i = 0; i < lyrics.length; i++) {
      if (currentTime >= lyrics[i].time) {
        currentLyric = lyrics[i];
      } else {
        break;
      }
    }
    return currentLyric.text;
  };

  const nextSong = useCallback(() => {
    setCurrentSong((prev) => (prev + 1) % playlist.length);
    setCurrentTime(0);
  }, [playlist.length]);

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + playlist.length) % playlist.length);
    setCurrentTime(0);
  };

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            nextSong();
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, nextSong]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleProgressClick = (e) => {
    if (progressRef.current) {
      const rect = progressRef.current.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const newTime = (clickX / rect.width) * duration;
      setCurrentTime(Math.floor(newTime));
    }
  };

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);
  const toggleShuffle = () => setIsShuffled(!isShuffled);
  const toggleRepeat = () => {
    const modes = ["off", "one", "all"];
    const currentIndex = modes.indexOf(repeatMode);
    setRepeatMode(modes[(currentIndex + 1) % modes.length]);
  };

  const progress = (currentTime / duration) * 100;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <motion.div
        key={currentTrack.id}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${currentTrack.dominantColor} 0%, ${currentTrack.accentColor}20 50%, #000000 100%)`,
        }}
      />

      {/* Background Image with Blur */}
      <motion.div
        key={currentTrack.id}
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-cover bg-center filter blur-3xl"
        style={{
          backgroundImage: `url(${currentTrack.cover})`,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Floating Particles */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              animate={{
                x: [
                  Math.random() * window.innerWidth,
                  Math.random() * window.innerWidth,
                ],
                y: [
                  Math.random() * window.innerHeight,
                  Math.random() * window.innerHeight,
                ],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 10 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      )}

      {/* Transparent Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-20 p-3 md:p-4 backdrop-blur-md bg-white/5 border-b border-white/10"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl md:text-2xl font-bold text-white bg-gradient-to-r from-white to-white/70 bg-clip-text">
              SoundSphere
            </h1>
          </div>

          <div className="flex items-center space-x-3 md:space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowMobileSections(!showMobileSections)}
              className="p-2 md:hidden rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Menu size={16} />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <Search size={16} className="md:w-[18px] md:h-[18px]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 md:p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors hidden sm:flex"
            >
              <Settings size={16} className="md:w-[18px] md:h-[18px]" />
            </motion.button>

            {/* Auth Button */}

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowAuthModal(true)}
              className="p-2 md:p-2.5 rounded-full bg-green-600/80 hover:bg-green-600 text-white transition-colors"
              title="Login to Spotify"
            >
              <LogIn size={16} className="md:w-[18px] md:h-[18px]" />
            </motion.button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 overflow-hidden"
            >
              <div className="relative">
                <Search
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/60"
                  size={20}
                />
                <input
                  type="text"
                  placeholder={"Search for songs, artists, or albums..."}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                  }}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
                />
              </div>

              {/* Search Results */}
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 bg-black/60 backdrop-blur-xl rounded-xl border border-white/20 overflow-hidden"
                >
                  {searchResults.map((result) => (
                    <motion.div
                      key={result.id}
                      whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                      onClick={() => {
                        // Add song to playlist or play immediately - this is just UI feedback
                        // In a real app, you'd add to queue or start playing
                        setSearchQuery("");
                        setSearchResults([]);
                        setShowSearch(false);
                      }}
                      className="flex items-center p-3 cursor-pointer border-b border-white/10 last:border-b-0"
                    >
                      <img
                        src={result.cover}
                        alt={result.title}
                        className="w-10 h-10 rounded-md object-cover mr-3"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {result.title}
                        </p>
                        <p className="text-xs text-white/70 truncate">
                          {result.artist}
                        </p>
                      </div>
                      <Plus size={16} className="text-white/60" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Mobile Sections Overlay */}
          {showMobileSections && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 overflow-hidden md:hidden "
            >
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 bg-white/10 rounded-xl border border-white/20 text-white text-center"
                  >
                    <div className="text-xs font-medium">Now Playing</div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 bg-white/10 rounded-xl border border-white/20 text-white text-center"
                  >
                    <div className="text-xs font-medium">Trending</div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 bg-white/10 rounded-xl border border-white/20 text-white text-center"
                  >
                    <div className="text-xs font-medium">Artists</div>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="p-3 bg-white/10 rounded-xl border border-white/20 text-white text-center"
                  >
                    <div className="text-xs font-medium">Playlists</div>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Main Bento Grid Layout */}
      <div className="relative z-10 min-h-[calc(100vh-160px)] md:h-[calc(100vh-80px)]">
        <div className="flex flex-col gap-3 md:grid md:grid-cols-12 md:grid-rows-8 md:gap-3 h-full p-2 md:p-3 overflow-y-auto md:overflow-hidden pb-20 md:pb-4">
          {/* Queue Section - Left Column */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="min-h-[300px] md:col-span-3 md:row-span-6 md:h-auto bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-4 overflow-hidden flex flex-col order-2 md:order-1"
          >
            <div className="flex items-center justify-between mb-3 flex-shrink-0">
              <h3 className="text-base font-bold text-white">Now Playing</h3>
              <span className="text-xs text-white/60">4 tracks</span>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-1.5 md:gap-2 mb-3 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleShuffle}
                className={`px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  isShuffled
                    ? "bg-white/20 text-white border-white/30"
                    : "bg-white/10 text-white/80 border-white/20 hover:bg-white/15"
                }`}
              >
                <div className="flex items-center space-x-1 md:space-x-1.5">
                  <Shuffle size={10} className="md:w-3 md:h-3" />
                  <span className="hidden sm:inline">Shuffle</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20 hover:bg-white/15 transition-colors"
                onClick={() => {
                  // Add song functionality
                }}
              >
                <div className="flex items-center space-x-1 md:space-x-1.5">
                  <Plus size={10} className="md:w-3 md:h-3" />
                  <span className="hidden sm:inline">Add Song</span>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-2.5 md:px-3 py-1 md:py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/80 border border-white/20 hover:bg-white/15 transition-colors"
                onClick={() => {
                  // Clear queue functionality
                }}
              >
                <div className="flex items-center space-x-1 md:space-x-1.5">
                  <X size={10} className="md:w-3 md:h-3" />
                  <span className="hidden sm:inline">Clear</span>
                </div>
              </motion.button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2 min-h-0 scrollbar-hide max-h-[200px] md:max-h-none">
              {playlist.map((song, index) => (
                <motion.div
                  key={song.id}
                  whileHover={{ scale: 0.95 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setCurrentSong(index);
                    setCurrentTime(0);
                  }}
                  className={`p-2.5 rounded-lg cursor-pointer transition-colors flex-shrink-0 ${
                    index === currentSong
                      ? "bg-white/10 border border-white/30"
                      : "bg-white/0 hover:bg-white/15"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <div className="relative flex-shrink-0">
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-10 h-10 rounded-md object-cover"
                      />
                      {index === currentSong && isPlaying && (
                        <div className="absolute inset-0 bg-black/40 rounded-md flex items-center justify-center">
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="w-1.5 h-1.5 bg-white rounded-full"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">
                        {song.title}
                      </p>
                      <p className="text-xs text-white/70 truncate">
                        {song.artist}
                      </p>
                    </div>
                    <span className="text-xs text-white/60 flex-shrink-0">
                      {song.duration}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Main Player - Center with Layered Card Stack */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="min-h-[400px] md:col-span-6 md:row-span-6 md:h-auto bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-4 md:p-6 flex flex-col items-center justify-center overflow-hidden relative order-1 md:order-2"
          >
            {/* Left Side - Volume Control */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 flex-col items-center space-y-3 hidden md:flex"
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMute}
                className="p-2 rounded-full text-white hover:scale-110 transition-colors"
              >
                {isMuted || volume === 0 ? (
                  <VolumeX size={16} />
                ) : (
                  <Volume2 size={16} />
                )}
              </motion.button>

              {/* Vertical Volume Slider */}
              <div className="h-24 w-1.5 bg-white/20 rounded-full relative">
                <div
                  className="absolute bottom-0 w-full rounded-full transition-all duration-300"
                  style={{
                    height: `${isMuted ? 0 : volume}%`,
                    background: `linear-gradient(to top, ${currentTrack.accentColor}, white)`,
                  }}
                />
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    setVolume(parseInt(e.target.value));
                    setIsMuted(false);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer vertical-slider"
                  orient="vertical"
                />
              </div>

              <span className="text-xs text-white/60 font-medium">
                {isMuted ? 0 : volume}
              </span>
            </motion.div>

            {/* Right Side - Lyrics Sidebar */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{
                x: 0,
                opacity: 1,
                width: lyricsExpanded ? "240px" : "32px",
              }}
              transition={{ delay: 0.9, duration: 0.4 }}
              className="absolute right-4 top-4 bottom-4 rounded-xl w-[50%] overflow-hidden hidden md:block"
              style={{ width: lyricsExpanded ? "240px" : "24px" }}
            >
              {/* Lyrics Toggle Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setLyricsExpanded(!lyricsExpanded)}
                className="absolute top-2 left-1/2 transform -translate-x-1/2 p-2 rounded-lg z-10"
              >
                <motion.div
                  animate={{ scale: lyricsExpanded ? 1.2 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* <Menu size={12} className="text-white" /> */}
                  <MicVocal
                    size={24}
                    className="text-white hover:scale-110 cursor-pointer"
                  />
                </motion.div>
              </motion.button>

              {/* Collapsed State - Vertical Text */}
              {!lyricsExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex items-center justify-center pt-12"
                >
                  <div
                    className="text-white/90 text-xs font-medium whitespace-nowrap select-none"
                    style={{
                      writingMode: "vertical-rl",
                      textOrientation: "mixed",
                      letterSpacing: "2px",
                      textShadow: "0 2px 8px rgba(0,0,0,0.8)",
                    }}
                  >
                    {getCurrentLyric()}
                  </div>
                </motion.div>
              )}

              {/* Expanded State - Full Lyrics */}
              {lyricsExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: 0.2 }}
                  className="h-full flex flex-col pt-12 pb-4 px-3"
                >
                  {/* Lyrics Content */}
                  <div className="flex-1 overflow-y-auto scrollbar-hide space-y-4 pl-2">
                    {currentTrack.lyrics &&
                      currentTrack.lyrics.map((lyric, index) => (
                        <motion.div
                          key={index}
                          className={`text-sm transition-all duration-500 leading-relaxed ${
                            currentTime >= lyric.time &&
                            (index === currentTrack.lyrics.length - 1 ||
                              currentTime <
                                currentTrack.lyrics[index + 1]?.time)
                              ? "text-white font-medium scale-101"
                              : currentTime >= lyric.time
                              ? "text-white/40"
                              : "text-white/70"
                          }`}
                          animate={{
                            scale:
                              currentTime >= lyric.time &&
                              (index === currentTrack.lyrics.length - 1 ||
                                currentTime <
                                  currentTrack.lyrics[index + 1]?.time)
                                ? 1.05
                                : 1,
                            opacity:
                              currentTime >= lyric.time &&
                              (index === currentTrack.lyrics.length - 1 ||
                                currentTime <
                                  currentTrack.lyrics[index + 1]?.time)
                                ? 1
                                : currentTime >= lyric.time
                                ? 0.4
                                : 0.7,
                          }}
                          transition={{ duration: 0.3 }}
                          style={{
                            textShadow:
                              currentTime >= lyric.time &&
                              (index === currentTrack.lyrics.length - 1 ||
                                currentTime <
                                  currentTrack.lyrics[index + 1]?.time)
                                ? `0 0 12px ${currentTrack.accentColor}60, 0 2px 8px rgba(0,0,0,0.8)`
                                : "0 2px 8px rgba(0,0,0,0.8)",
                            wordWrap: "break-word",
                            overflowWrap: "break-word",
                          }}
                        >
                          {lyric.text}
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Main Player Content - Shrinks when lyrics expand */}
            <motion.div
              className="flex flex-col items-center justify-center w-full h-full min-h-[350px] md:min-h-0"
              animate={{
                scale: lyricsExpanded ? 0.85 : 1,
                marginRight: lyricsExpanded ? "90px" : "0px",
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Layered Card Stack */}
              <div
                className="relative mb-4 w-32 h-32 md:w-40 md:h-40 flex-shrink-0"
                onMouseEnter={() => setCardStackHovered(true)}
                onMouseLeave={() => setCardStackHovered(false)}
              >
                {/* Background Cards (Previous/Next Songs) */}
                {[-2, -1, 1, 2].map((offset) => {
                  const songIndex =
                    (currentSong + offset + playlist.length) % playlist.length;
                  const song = playlist[songIndex];
                  const isNext = offset > 0;
                  const isPrev = offset < 0;

                  return (
                    <motion.div
                      key={`${song.id}-${offset}`}
                      className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
                      style={{
                        background: `linear-gradient(135deg, ${song.dominantColor}40, ${song.accentColor}20)`,
                      }}
                      initial={{
                        scale: 0.8 - Math.abs(offset) * 0.1,
                        rotate: offset * 3,
                        x: offset * 20,
                        y: Math.abs(offset) * 15,
                        zIndex: 10 - Math.abs(offset),
                      }}
                      animate={{
                        scale: cardStackHovered
                          ? 0.85 - Math.abs(offset) * 0.1
                          : 0.8 - Math.abs(offset) * 0.1,
                        rotate: cardStackHovered ? offset * 8 : offset * 3,
                        x: cardStackHovered ? offset * 40 : offset * 20,
                        y: cardStackHovered
                          ? Math.abs(offset) * 25
                          : Math.abs(offset) * 15,
                        opacity: cardStackHovered ? 0.9 : 0.6,
                      }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      onClick={() => {
                        setCurrentSong(songIndex);
                        setCurrentTime(0);
                      }}
                      whileHover={{ scale: cardStackHovered ? 0.9 : 0.85 }}
                    >
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                      {/* Song Info Overlay */}
                      <div className="absolute bottom-4 left-4 right-4 text-white">
                        <p className="text-sm font-medium truncate">
                          {song.title}
                        </p>
                        <p className="text-xs text-white/80 truncate">
                          {song.artist}
                        </p>
                      </div>

                      {/* Direction Indicators */}
                      {(isPrev || isNext) && cardStackHovered && (
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                          <div className="p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                            {isPrev ? (
                              <ChevronLeft size={16} className="text-white" />
                            ) : (
                              <ChevronRight size={16} className="text-white" />
                            )}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Current Song Card (Top Layer) */}
                <motion.div
                  className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20"
                  style={{
                    background: `linear-gradient(135deg, ${currentTrack.dominantColor}60, ${currentTrack.accentColor}30)`,
                    zIndex: 20,
                  }}
                  animate={{
                    scale: cardStackHovered ? 1.05 : 1,
                    rotate: 0,
                    x: 0,
                    y: 0,
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  whileHover={{ scale: cardStackHovered ? 1.08 : 1.02 }}
                >
                  <img
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    className="w-full h-full object-cover"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                  {/* Progress Ring Overlay */}
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 100 100"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="1"
                    />
                    <motion.circle
                      cx="50"
                      cy="50"
                      r="48"
                      fill="none"
                      stroke={currentTrack.accentColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeDasharray="301"
                      strokeDashoffset={301 - (301 * progress) / 100}
                      transition={{ duration: 0.5 }}
                      filter="drop-shadow(0 0 8px currentColor)"
                      style={{
                        transform: "rotate(-90deg)",
                        transformOrigin: "50% 50%",
                      }}
                    />
                  </svg>

                  {/* Glass overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />

                  {/* Floating Action Buttons */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      playlist[currentSong].isLiked =
                        !playlist[currentSong].isLiked;
                    }}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-colors"
                  >
                    <Heart
                      size={16}
                      fill={currentTrack.isLiked ? "currentColor" : "none"}
                    />
                  </motion.button>
                </motion.div>
              </div>

              {/* Song Information */}
              <div className="text-center mb-4 flex-shrink-0 max-w-full px-4 md:px-0">
                <motion.h2
                  key={currentTrack.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-lg md:text-xl font-bold text-white mb-1 truncate"
                >
                  {currentTrack.title}
                </motion.h2>
                <motion.p
                  key={`${currentTrack.id}-artist`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-sm md:text-base text-white/80 mb-2 truncate"
                >
                  {currentTrack.artist}
                </motion.p>
                <div className="flex items-center justify-center space-x-2 text-xs text-white/60 flex-wrap">
                  <span className="truncate">{currentTrack.album}</span>
                  <span className="hidden sm:inline">•</span>
                  <span>{currentTrack.year}</span>
                  <span>•</span>
                  <span>{currentTrack.genre}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full max-w-sm mb-4 flex-shrink-0 px-4 md:px-0">
                <div
                  ref={progressRef}
                  onClick={handleProgressClick}
                  className="relative h-1.5 bg-white/20 rounded-full cursor-pointer overflow-hidden backdrop-blur-sm border border-white/10"
                >
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: `linear-gradient(90deg, ${currentTrack.accentColor}, white)`,
                      filter: `drop-shadow(0 0 4px ${currentTrack.accentColor})`,
                    }}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>

                <div className="flex justify-between text-xs text-white/70 mt-1.5">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center space-x-3 md:space-x-4 flex-shrink-0 px-4 md:px-0">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleShuffle}
                  className={`p-1.5 md:p-2 rounded-full backdrop-blur-md border border-white/30 transition-colors ${
                    isShuffled
                      ? "bg-white/30 text-white"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  <Shuffle size={14} className="md:w-4 md:h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={prevSong}
                  className="p-2 md:p-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-colors"
                >
                  <SkipBack size={16} className="md:w-[18px] md:h-[18px]" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="p-2.5 md:p-3 rounded-full bg-white/30 backdrop-blur-md border border-white/40 text-white hover:bg-white/40 transition-colors shadow-xl"
                  style={{
                    background: `linear-gradient(135deg, ${currentTrack.accentColor}60, white/30)`,
                  }}
                >
                  {isPlaying ? (
                    <Pause size={18} className="md:w-5 md:h-5" />
                  ) : (
                    <Play size={18} className="md:w-5 md:h-5" />
                  )}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={nextSong}
                  className="p-2 md:p-2.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 transition-colors"
                >
                  <SkipForward size={16} className="md:w-[18px] md:h-[18px]" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={toggleRepeat}
                  className={`p-1.5 md:p-2 rounded-full backdrop-blur-md border border-white/30 transition-colors ${
                    repeatMode !== "off"
                      ? "bg-white/30 text-white"
                      : "bg-white/10 text-white/70"
                  }`}
                >
                  <Repeat size={14} className="md:w-4 md:h-4" />
                </motion.button>
              </div>
            </motion.div>
          </motion.div>

          {/* Similar Artists - Right Column */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-3 md:row-span-3 md:h-auto bg-black/20 backdrop-blur-xl rounded-2xl border border-white/20 p-4 flex flex-col overflow-hidden order-3 md:order-3"
          >
            <h3 className="text-base font-bold text-white mb-3 flex-shrink-0">
              Similar Artists
            </h3>
            <div className="flex-1 space-y-2.5 overflow-y-auto min-h-0 scrollbar-hide max-h-[180px] md:max-h-none">
              {similarArtists.map((artist, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02 }}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/15 cursor-pointer transition-colors flex-shrink-0 min-w-0"
                >
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">
                      {artist.name}
                    </p>
                    <p className="text-xs text-white/60 truncate">
                      {artist.followers} followers
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Trending Songs */}
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className=" md:col-span-3 md:row-span-3 md:h-auto bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-4 flex flex-col overflow-hidden order-4 md:order-4"
          >
            <h3 className="text-base font-bold text-white mb-3 flex-shrink-0">
              Trending
            </h3>
            <div className="flex-1 space-y-2.5 overflow-y-auto min-h-0 scrollbar-hide max-h-[180px] md:max-h-none">
              {trendingSongs.map((song, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative flex items-center p-2.5 rounded-lg hover:bg-white/15 cursor-pointer transition-all duration-300 flex-shrink-0 min-w-0 overflow-hidden"
                >
                  {/* Ranking Number */}
                  <div className="flex-shrink-0 w-6 text-center mr-3">
                    <span className="text-sm font-bold text-white/80 group-hover:text-white transition-colors">
                      #{index + 1}
                    </span>
                  </div>

                  {/* Album Art with Hover Effects */}
                  <div className="relative flex-shrink-0 mr-3">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      className="relative w-10 h-10 rounded-md overflow-hidden"
                    >
                      <img
                        src={song.cover}
                        alt={song.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0 overflow-hidden pr-2">
                    <p className="text-sm font-medium text-white truncate group-hover:text-white transition-colors">
                      {song.title}
                    </p>
                    <p className="text-xs text-white/60 truncate group-hover:text-white/80 transition-colors">
                      {song.artist} • {song.duration}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex-shrink-0 flex items-center space-x-2">
                    {/* Main Play Button - Shows on hover */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 text-white hover:text-white/80"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Play action
                      }}
                    >
                      <Play size={16} className="ml-0.5" />
                    </motion.button>

                    {/* Quick Add to Queue Button */}
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="opacity-0 group-hover:opacity-100 transition-all duration-300 p-2 text-white hover:text-white/80"
                      onClick={(e) => {
                        e.stopPropagation();
                        // Add to queue action
                      }}
                    >
                      <Plus size={14} />
                    </motion.button>
                  </div>

                  {/* Hover Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Charts & Moods - Extended */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="md:col-span-9 md:row-span-2 md:h-auto bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-3 overflow-hidden order-5 md:order-5"
          >
            <div className="grid grid-cols-2 md:grid-cols-6 gap-2 h-full min-h-[150px] md:min-h-0">
              {chartsAndMoods.map((chart, index) => (
                <motion.div
                  key={index}
                  className="relative h-full min-h-[132px] md:min-h-0 group cursor-pointer overflow-hidden rounded-xl"
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${chart.cover})` }}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 md:from-black/90 md:via-black/30 md:to-black/10 opacity-80 md:opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                  {/* Text Content - Always visible but enhanced on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-3 text-white">
                    <div className="transform transition-all duration-500 ease-out group-hover:translate-y-0 translate-y-2">
                      <h4 className="text-xs md:text-sm font-bold mb-1 leading-tight opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-100">
                        {chart.title}
                      </h4>
                      <p className="text-xs text-white/80 mb-2 leading-tight opacity-80 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-200 hidden sm:block">
                        {chart.subtitle}
                      </p>

                      {/* Mood Indicator */}
                      <div className="flex items-center space-x-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 delay-300">
                        <div
                          className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full"
                          style={{ backgroundColor: getMoodColor(chart.mood) }}
                        />
                        <span className="text-xs text-white/70 capitalize">
                          {chart.mood}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Play Button on Hover */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 delay-150">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 hover:bg-white/30 transition-colors"
                    >
                      <Play size={12} className="text-white ml-0.5" />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Album Info - Extended */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="md:col-span-3 md:row-span-2 md:h-auto bg-black/40 backdrop-blur-xl rounded-2xl border border-white/20 p-4 flex flex-col justify-center overflow-hidden order-6 md:order-6"
          >
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={currentTrack.cover}
                alt={currentTrack.album}
                className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="text-base font-medium text-white truncate">
                  {currentTrack.album}
                </h4>
                <p className="text-sm text-white/60 truncate">
                  {currentTrack.year} • {currentTrack.plays} plays
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <Share2 size={14} />
                <span className="text-sm text-white">Share</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center space-x-2 p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              >
                <Download size={14} />
                <span className="text-sm text-white">Save</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Mobile Mini Player - Fixed at bottom */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-black/95 backdrop-blur-xl border-t border-white/20 p-3 safe-area-pb"
      >
        <div className="flex items-center space-x-3">
          <img
            src={currentTrack.cover}
            alt={currentTrack.title}
            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {currentTrack.title}
            </p>
            <p className="text-xs text-white/70 truncate">
              {currentTrack.artist}
            </p>
          </div>
          <div className="flex items-center space-x-2 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSong}
              className="p-2 text-white/80 hover:text-white"
            >
              <SkipBack size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={togglePlay}
              className="p-2.5 bg-white/20 rounded-full text-white"
            >
              {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSong}
              className="p-2 text-white/80 hover:text-white"
            >
              <SkipForward size={18} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Progress Bar */}
        <div className="mt-2">
          <div
            onClick={handleProgressClick}
            className="relative h-1 bg-white/20 rounded-full cursor-pointer"
          >
            <motion.div
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                width: `${progress}%`,
                background: `linear-gradient(90deg, ${currentTrack.accentColor}, white)`,
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Custom Styles */}
      <style jsx>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        input[type="range"]::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .vertical-slider {
          writing-mode: bt-lr; /* IE */
          writing-mode: vertical-lr; /* Standard syntax */
          transform: rotate(180deg);
          width: 1.5rem;
          height: 6rem;
        }

        .vertical-slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: white;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .scrollbar-hide {
          /* Hide scrollbar for Chrome, Safari and Opera */
          -webkit-overflow-scrolling: touch;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
      `}</style>
    </div>
  );
};

export default ImmersiveMusicPlayer;
