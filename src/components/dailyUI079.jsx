import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plane,
  Hotel,
  MapPin,
  Coffee,
  ChevronRight,
  Calendar,
  Clock,
  Ticket,
  Sun,
  DollarSign,
  Users,
  Backpack,
  AlertCircle,
  Utensils,
  Zap,
  Info,
} from "lucide-react";
import { MdLocationCity } from "react-icons/md";
import BackToHome from "./BackToHome";

const TRIP_DATA = {
  title: "Kyoto Autumn Escape",
  dates: "Oct 12 - Oct 20, 2025",
  location: "Kyoto, Japan",
  image:
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
  totalBudget: "$2,450",
  travelers: 2,
  accommodations: 4,
  daysRemaining: 3,
};

const ITINERARY_NODES = [
  {
    id: 1,
    type: "flight",
    icon: Plane,
    label: "Flight to KIX",
    time: "08:45 AM",
    title: "Flight JL 408",
    details: "Terminal 2 • Gate A4 • Seat 12A",
    status: "Boarding",
    notes: "First class upgrade available",
  },
  {
    id: 2,
    type: "transit",
    icon: Zap,
    label: "Haruka Express",
    time: "04:30 PM",
    title: "Train to Kyoto Stn",
    details: "Car 4 • Seat 2B • 75 mins",
    status: "Scheduled",
    notes: "Fast express train, JR Pass accepted",
  },
  {
    id: 3,
    type: "hotel",
    icon: Hotel,
    label: "Check-in",
    time: "06:00 PM",
    title: "The Mitsui Kyoto",
    details: "Booking #88291 • King Room • ¥450,000/night",
    status: "Upcoming",
    notes: "Early check-in available until 8 PM",
  },
  {
    id: 4,
    type: "dining",
    icon: Utensils,
    label: "Dinner",
    time: "08:00 PM",
    title: "Kichi Kichi Omurice",
    details: "Reservation confirmed • 2 Pax • Private seating",
    status: "Upcoming",
    notes: "Famous omelet rice restaurant, arrive early",
  },
  {
    id: 5,
    type: "sightseeing",
    icon: MdLocationCity,
    label: "Fushimi Inari",
    time: "07:00 AM (Next Day)",
    title: "Morning Hike",
    details: "Iconic red torii gates • 2-3 hour hike",
    status: "Planned",
    notes: "Bring water and comfortable shoes",
  },
];

const TimelineNode = ({ node, isSelected, onClick }) => {
  const Icon = node.icon;
  return (
    <div className="flex flex-col items-center gap-2 relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onClick(node)}
        className={`
          w-16 h-16 rounded-full flex items-center justify-center border-2 shadow-sm transition-all duration-300 z-10
          ${
            isSelected
              ? "bg-amber-700 border-amber-700 text-white shadow-amber-200"
              : "bg-white border-amber-200 text-amber-600 hover:border-amber-400"
          }
        `}
      >
        <Icon size={24} />
      </motion.button>

      <div className="absolute top-8 left-16 w-12 h-0.5 border-t-2 border-dotted border-amber-200 z-0" />

      <span
        className={`text-xs font-medium mt-1 ${
          isSelected ? "text-amber-700" : "text-amber-600"
        }`}
      >
        {node.time.split(" ")[0]}
      </span>
    </div>
  );
};

const InfoCard = ({ node }) => {
  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="bg-linear-to-br from-amber-50 to-orange-50 rounded-2xl p-6 shadow-lg border border-amber-100 w-full"
    >
      <div className="flex justify-between items-start mb-4 relative">
        <div>
          <span className="inline-block px-3 py-1 rounded-full bg-amber-700 text-white text-xs font-bold uppercase tracking-wide mb-2">
            {node.type}
          </span>
          <h2 className="text-2xl font-bold text-amber-950">{node.title}</h2>
          <p className="text-sm text-amber-700 font-medium">{node.status}</p>
        </div>
        <div className="text-right absolute top-0 right-0">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Clock size={16} className="text-amber-700" />
            <p className="text-sm font-semibold text-amber-950">{node.time}</p>
          </div>
        </div>
      </div>

      <div className="h-px w-full bg-amber-200 my-4" />

      <div className="space-y-3">
        <div className="flex items-center gap-3 text-amber-900">
          <Ticket size={18} className="text-amber-700 shrink-0" />
          <p className="text-sm font-medium">{node.details}</p>
        </div>
        {node.notes && (
          <div className="flex items-start gap-3 text-amber-800 py-2 rounded-lg">
            <Info size={16} className="text-amber-700 shrink-0 mt-0.5" />
            <p className="text-sm">{node.notes}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default function ItineraryApp() {
  const [selectedNodeId, setSelectedNodeId] = useState(1);
  const [isScrollMode, setIsScrollMode] = useState(true);
  const [showQuickView, setShowQuickView] = useState(true);
  const scrollRef = useRef(null);
  const lastScrollY = useRef(0);

  const selectedNode =
    ITINERARY_NODES.find((n) => n.id === selectedNodeId) || ITINERARY_NODES[0];

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const currentScrollY = scrollRef.current.scrollTop;

    if (Math.abs(currentScrollY - lastScrollY.current) < 10) return;

    if (currentScrollY > lastScrollY.current) {
      setShowQuickView(false);
    } else {
      setShowQuickView(true);
    }

    lastScrollY.current = currentScrollY;
  };

  return (
    <div className="min-h-screen w-full bg-linear-to-br from-white-50 to-orange-50 flex flex-col items-center justify-center p-8 font-sans">
      <div className="mb-8 p-4 bg-white rounded-xl shadow-sm flex items-center gap-3">
        <div className="h-8 w-px bg-amber-200" />
        <div className="flex items-center gap-3">
          <span
            className={`text-sm ${
              isScrollMode ? "font-bold text-black" : "text-gray-600"
            }`}
          >
            Scroll Mode
          </span>
          <button
            onClick={() => setIsScrollMode(!isScrollMode)}
            className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${
              isScrollMode ? "bg-black" : "bg-amber-600"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-white shadow-sm transform transition-transform duration-300 ${
                isScrollMode ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm ${
              !isScrollMode ? "font-bold text-black" : "text-gray-600"
            }`}
          >
            Full Height
          </span>
        </div>
      </div>

      <div
        className={`
          relative bg-amber-50 w-[390px] rounded-[40px] border-8 border-black shadow-2xl overflow-hidden ring-1 ring-amber-950/50
          transition-all duration-500 ease-in-out
          ${isScrollMode ? "h-[844px]" : "h-auto min-h-[844px]"}
        `}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-7 w-32 bg-black rounded-b-2xl z-50 pointer-events-none" />

        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className={`
            w-full h-full bg-amber-50 relative
            ${
              isScrollMode ? "overflow-y-auto no-scrollbar" : "overflow-visible"
            }
          `}
        >
          <header className="relative h-72 w-full">
            <img
              src={TRIP_DATA.image}
              alt="Destination"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-b from-amber-900/40 via-transparent to-amber-50" />

            <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-white mb-1 text-sm font-medium bg-amber-900/30 backdrop-blur-md px-3 py-1 rounded-full w-fit">
                <Calendar size={14} />
                {TRIP_DATA.dates}
              </div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight leading-tight mb-1">
                {TRIP_DATA.title}
              </h1>
              <div className="flex items-center gap-2 text-zinc-800">
                <MapPin size={16} />
                <span>{TRIP_DATA.location}</span>
              </div>
            </div>
          </header>

          <div className="px-6 py-6 pb-32">
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="bg-linear-to-br from-orange-100 to-orange-50 rounded-xl p-3 border border-orange-200 text-center">
                <div className="flex justify-center mb-2">
                  <DollarSign size={20} className="text-orange-700" />
                </div>
                <p className="text-sm font-bold text-orange-950">
                  {TRIP_DATA.totalBudget}
                </p>
                <p className="text-xs text-orange-700">Total Budget</p>
              </div>
              <div className="bg-linear-to-br from-amber-100 to-amber-50 rounded-xl p-3 border border-amber-200 text-center">
                <div className="flex justify-center mb-2">
                  <Users size={20} className="text-amber-700" />
                </div>
                <p className="text-sm font-bold text-amber-950">
                  {TRIP_DATA.travelers}
                </p>
                <p className="text-xs text-amber-700">Travelers</p>
              </div>
              <div className="bg-linear-to-br from-yellow-100 to-yellow-50 rounded-xl p-3 border border-yellow-200 text-center">
                <div className="flex justify-center mb-2">
                  <Clock size={20} className="text-yellow-700" />
                </div>
                <p className="text-sm font-bold text-yellow-950">
                  {TRIP_DATA.daysRemaining}d
                </p>
                <p className="text-xs text-yellow-700">Days Left</p>
              </div>
            </div>

            <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4 ml-1">
              Current Details
            </p>

            <div className="min-h-[220px] mb-8">
              <AnimatePresence mode="wait">
                <InfoCard node={selectedNode} />
              </AnimatePresence>
            </div>

            <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4 ml-1">
              Timeline Journey
            </p>

            <div className="w-full overflow-x-auto no-scrollbar pb-8 pt-2 -mx-6 px-6">
              <div className="flex items-start gap-8 min-w-max pr-12">
                {ITINERARY_NODES.map((node) => (
                  <TimelineNode
                    key={node.id}
                    node={node}
                    isSelected={node.id === selectedNodeId}
                    onClick={(n) => setSelectedNodeId(n.id)}
                  />
                ))}
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4 ml-1">
                Essential Info
              </p>
              <div className="space-y-3">
                <div className="bg-linear-to-r from-orange-50 to-amber-50 rounded-xl p-4 border border-orange-200 shadow-sm space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-200 p-2 rounded-lg text-orange-700 mt-0.5">
                      <Sun size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-amber-950">
                        Perfect Weather
                      </p>
                      <p className="text-sm text-amber-800">
                        Sunny all week. High 24°C. Pack sunscreen.
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-orange-200" />
                  <div className="flex items-start gap-3">
                    <div className="bg-amber-200 p-2 rounded-lg text-amber-700 mt-0.5">
                      <Backpack size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-amber-950">
                        Packing Tips
                      </p>
                      <p className="text-sm text-amber-800">
                        Comfortable shoes for temples. Light layers.
                      </p>
                    </div>
                  </div>
                  <div className="h-px bg-orange-200" />
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-200 p-2 rounded-lg text-yellow-700 mt-0.5">
                      <AlertCircle size={18} />
                    </div>
                    <div>
                      <p className="font-semibold text-amber-950">Local Tips</p>
                      <p className="text-sm text-amber-800">
                        Cash preferred at local shops. Learn basic phrases.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-sm font-bold text-amber-700 uppercase tracking-wider mb-4 ml-1 mt-6">
                Dining Highlights
              </p>
              <div className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200 shadow-sm space-y-3">
                <div className="flex items-center gap-3">
                  <Utensils
                    size={18}
                    className="text-yellow-700 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-amber-950">
                      Day 1: Kichi Kichi Omurice
                    </p>
                    <p className="text-xs text-amber-700">
                      Famous for hand-fried omelettes. ¥3,500/person
                    </p>
                  </div>
                </div>
                <div className="h-px bg-yellow-200" />
                <div className="flex items-center gap-3">
                  <Coffee
                    size={18}
                    className="text-orange-700 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-amber-950">
                      Day 2: Gion District Tour
                    </p>
                    <p className="text-xs text-amber-700">
                      Traditional kaiseki dining. Reserve ahead.
                    </p>
                  </div>
                </div>
                <div className="h-px bg-yellow-200" />
                <div className="flex items-center gap-3">
                  <Utensils
                    size={18}
                    className="text-yellow-700 mt-0.5 shrink-0"
                  />
                  <div>
                    <p className="font-semibold text-amber-950">
                      Day 3: Street Food & Matcha
                    </p>
                    <p className="text-xs text-amber-700">
                      Nishiki Market exploration. Try fresh tofu.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl border-2 border-dashed border-amber-300 text-center bg-amber-50">
                <p className="text-amber-700 text-sm font-medium">
                  End of Journey
                </p>
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {showQuickView && (
            <motion.div
              initial={{ y: 200 }}
              animate={{ y: 0 }}
              exit={{ y: 200 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="absolute bottom-6 left-4 right-4 z-40"
            >
              <div className="bg-linear-to-r from-amber-900 to-orange-900 backdrop-blur-xl rounded-2xl p-5 shadow-2xl border border-amber-700/50 text-white">
                <div className="flex gap-2 items-center mb-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
                  <p className="text-xs font-bold text-yellow-300 uppercase tracking-wide">
                    Happening Now
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">On route to Kyoto</h3>
                    <p className="text-amber-200 text-sm">
                      Arriving in 45 mins
                    </p>
                  </div>
                  <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors">
                    <ChevronRight size={20} className="text-white" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <BackToHome challengeDay="79" challengeTitle="Itinerary" />
    </div>
  );
}
