import { useRef, useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  SkipBack,
  SkipForward,
  Maximize,
  Minimize,
  Settings,
} from "lucide-react";
import { cn } from "../utils/cn";

const AMBIENT_MODES = {
  DARK: "dark",
  VIBRANT: "vibrant",
  GENERAL: "general",
};

export default function VideoPlayer({ ambientMode = AMBIENT_MODES.GENERAL }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.addEventListener("loadedmetadata", () => {
        setDuration(video.duration);
      });
    }
  }, []);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(!isMuted);
  };

  const handleVolume = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    if (videoRef.current) {
      videoRef.current.volume = vol;
      setIsMuted(vol === 0);
    }
  };

  const handleProgress = () => {
    const video = videoRef.current;
    if (video) {
      setCurrentTime(video.currentTime);
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent);
    }
  };

  const seek = (e) => {
    const video = videoRef.current;
    if (video) {
      const time = (e.target.value / 100) * video.duration;
      video.currentTime = time;
      setProgress(e.target.value);
    }
  };

  const skip = (seconds) => {
    const video = videoRef.current;
    if (video) video.currentTime += seconds;
  };

  const toggleFullscreen = () => {
    const player = videoRef.current.parentElement;
    if (!document.fullscreenElement) {
      player.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };
  const getAmbientColors = (mode) => {
    switch (mode) {
      case AMBIENT_MODES.DARK:
        return "animate-ambient-dark";
      case AMBIENT_MODES.VIBRANT:
        return "animate-ambient-vibrant";
      default:
        return "animate-ambient-general";
    }
  };
  return (
    <div className="relative flex items-center justify-center h-screen">
      <div
        className={cn(  
          "absolute inset-0 mx-auto my-auto rounded-2xl opacity-75 max-w-5xl h-[42rem] blur-md transition-opacity duration-300",
          getAmbientColors(ambientMode),
          showControls ? "opacity-100" : "opacity-40"
        )}
      />
      <div
        className="relative w-full h-[40rem] max-w-5xl group overflow-hidden rounded-2xl shadow-xl bg-black"
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
      >
        <video
          ref={videoRef}
          onTimeUpdate={handleProgress}
          className="w-full h-full object-cover"
          src="/vid.mp4"
          onClick={togglePlay}
        />

        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent 
        transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
        />

        <div
          className={`absolute bottom-0 left-0 right-0 p-6 space-y-4 
        transition-transform duration-300 ${
          showControls ? "translate-y-0" : "translate-y-full"
        }`}
        >
          <div className="relative group/progress w-full h-1 bg-white/30">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={seek}
              className="absolute inset-0 w-full appearance-none bg-transparent cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 
            [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:opacity-0 
            hover:[&::-webkit-slider-thumb]:opacity-100"
            />
            <div
              className="absolute h-full bg-white/80 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-6">
              <button
                onClick={togglePlay}
                className="hover:scale-110 transition-transform"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6" />
                ) : (
                  <Play className="w-6 h-6" />
                )}
              </button>

              <button
                onClick={() => skip(-10)}
                className="hover:scale-110 transition-transform"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => skip(10)}
                className="hover:scale-110 transition-transform"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button onClick={toggleMute}>
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolume}
                  className="w-20 h-1 appearance-none bg-white/30 rounded-full
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-white"
                />
              </div>

              <span className="text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <button className="hover:scale-110 transition-transform">
                <Settings className="w-5 h-5" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="hover:scale-110 transition-transform"
              >
                {isFullscreen ? (
                  <Minimize className="w-5 h-5" />
                ) : (
                  <Maximize className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {!isPlaying && (
          <button
            onClick={togglePlay}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-white/20 rounded-full p-6 backdrop-blur-sm
          hover:bg-white/30 transition-all duration-300"
          >
            <Play className="w-12 h-12 text-white" fill="white" />
          </button>
        )}
      </div>
    </div>
  );
}