import {
  AirVent,
  Bath,
  BedDouble,
  Car,
  CigaretteOff,
  CircleOff,
  Clock,
  Coffee,
  CookingPot,
  CreditCard,
  Dog,
  ForkKnife,
  Heart,
  Heater,
  Info,
  Minus,
  Plus,
  Share,
  Share2,
  Shield,
  ShieldBan,
  Star,
  Tv,
  UsersRound,
  WashingMachine,
  Wifi,
  Mail,
  MapPin,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import BackToHome from "./BackToHome";
import { useState } from "react";
import {
  BsCircleFill,
  BsFacebook,
  BsInstagram,
  BsTwitterX,
} from "react-icons/bs";

const description =
  "Welcome to The Willow House, a stunning beachfront retreat designed for ultimate relaxation and luxury. This contemporary home features floor-to-ceiling windows that frame breathtaking ocean views, an infinity pool that seems to merge with the horizon, and meticulously curated interiors that blend modern comfort with coastal elegance. The open-concept living space flows seamlessly onto multiple outdoor terraces, perfect for sunset gatherings or morning yoga sessions. With three spacious bedrooms, each with en-suite bathrooms, this home comfortably accommodates up to 8 guests. The gourmet kitchen is fully equipped for those who love to cook, while the outdoor BBQ area is ideal for alfresco dining. Located in exclusive Malibu, you're just steps from pristine beaches and minutes from world-class restaurants and shopping.";

import { motion } from "framer-motion";

// Add these container and item variants before your component
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const hoverVariants = {
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};
const navVariants = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
    },
  },
  hover: {
    scale: 1.05,
    color: "#99582a",
    transition: { duration: 0.2 },
  },
};

const buttonVariants = {
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  tap: {
    scale: 0.95,
  },
};
const bookingWidgetVariants = {
  hidden: {
    opacity: 0,
    x: 50,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const priceVariants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
      yoyo: Infinity,
    },
  },
};
export default function VacationRentalListing() {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const shouldTruncate = description.length > 300;
  const displayDescription =
    shouldTruncate && !showFullDescription
      ? description.slice(0, 300) + "..."
      : description;
  const [showMap, setShowMap] = useState(false);

  return (
    <div className="bg-[#ffe6a7]/25 font-[Sora]">
      <motion.nav
        className="flex items-center py-4 justify-between px-10 bg-gradient-to-r from-[#432818]/60 via-30% via-white to-[#432818]/40 sticky inset-0 z-50 backdrop-blur-sm shadow-xl font-[DM_sans]"
        variants={navVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
          <div className="flex items-center cursor-pointer">
            <motion.span
              className="font-extrabold text-2xl text-[#ffe6a7] tracking-tight italic font-[Playfair_Display]"
              whileHover={{ textShadow: "0 0 8px rgba(255,230,167,0.3)" }}
            >
              Home
              <motion.span
                className="text-[#ffe6a7] not-italic"
                whileHover={{ textShadow: "0 0 8px rgba(255,230,167,0.3)" }}
              >
                stay
              </motion.span>
              <motion.span
                className="font-sans font-black text-[#99582a] not-italic ml-0.5"
                whileHover={{ textShadow: "0 0 8px rgba(153,88,42,0.3)" }}
              >
                Hub
              </motion.span>
            </motion.span>
          </div>
        </motion.div>

        <motion.ul
          className="flex space-x-6 text-[#432818] font-medium"
          variants={navItemVariants}
          initial="hidden"
          animate="visible"
        >
          {["Home", "Listings", "About", "Contact"].map((item) => (
            <motion.li
              key={item}
              variants={navItemVariants}
              whileHover="hover"
              className="cursor-pointer relative group"
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#99582a] group-hover:w-full"
                transition={{ duration: 0.2 }}
              />
            </motion.li>
          ))}
        </motion.ul>

        <div className="flex items-center space-x-4">
          <motion.button
            className="px-4 py-2 shadow-[inset_2px_2px_1px_#43281832] outline-1 outline-[#432818] rounded-lg relative overflow-hidden"
            variants={buttonVariants}
            whileTap="tap"
            whileHover={{ backgroundColor: "#432818" }}
          >
            <motion.span
              className="relative z-10"
              whileHover={{ color: "#ffe6a7" }}
            >
              Sign Up
            </motion.span>
          </motion.button>

          <motion.button
            className="px-6 py-2 text-[#ffe6a7] rounded-lg bg-[#432818]"
            variants={buttonVariants}
            whileTap="tap"
            whileHover={{
              backgroundColor: "#99582a",
              boxShadow: "0 0 10px rgba(153,88,42,0.3)",
            }}
          >
            Login
          </motion.button>
        </div>
      </motion.nav>
      <header>
        <div className="w-full h-[580px] flex flex-col pt-4 justify-start px-16">
          <motion.div
            className="w-full grid grid-cols-5 grid-rows-5 gap-1 rounded-lg overflow-hidden"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <motion.div
              className="col-span-3 row-span-4"
              variants={itemVariants}
              whileHover={hoverVariants.hover}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1656712193274-d391a185fde6?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHZhY2F0aW9uJTIwcmVudGFsfGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=600"
                className="w-full h-full object-cover"
                alt="house image 1"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={hoverVariants.hover}
              className="col-span-2 col-start-1 row-start-5"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YmVkcm9vbXxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=600"
                className="w-full h-full object-cover"
                alt="house image 2"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={hoverVariants.hover}
              className="col-start-3 row-start-5"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8YmVkcm9vbXxlbnwwfDB8MHx8fDI%3D&auto=format&fit=crop&q=60&w=600"
                className="w-full h-full object-cover"
                alt="house image 3"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={hoverVariants.hover}
              className="row-span-3 col-start-4 row-start-1"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1604629761628-5640ee399e18?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dmFjYXRpb24lMjByZW50YWx8ZW58MHx8MHx8fDI%3D&auto=format&fit=crop&q=60&w=600"
                className="w-full h-full object-cover"
                alt="house image 4"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={hoverVariants.hover}
              className="row-span-2 col-start-5 row-start-1"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1601760561441-16420502c7e0?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBraXRjaGVufGVufDB8fDB8fHwy&auto=format&fit=crop&q=60&w=600"
                className="w-full h-full object-cover"
                alt="house image 5"
              />
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover={hoverVariants.hover}
              className="row-span-2 col-start-5 row-start-3"
            >
              <motion.img
                src="https://images.unsplash.com/photo-1633109956509-5303bda0cd7c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJhY2t5YXJkfGVufDB8MHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=600"
                className="w-full h-full object-cover"
                alt="house image 6"
              />
            </motion.div>
            <motion.div
              className="col-start-5 row-start-5 relative"
              variants={itemVariants}
              whileHover={hoverVariants.hover}
            >
              <motion.div
                className="absolute inset-0 bg-white/20 backdrop-blur-[4px] text-xl font-semibold flex items-center justify-center"
                whileHover={{ backgroundColor: "rgba(255,255,255,0.3)" }}
              >
                10+ More
              </motion.div>
              <motion.img
                src="https://plus.unsplash.com/premium_photo-1683910490876-074a2e18ca10?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZGluaW5nJTIwYXJlYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&q=60&w=600"
                className="w-full h-full object-cover"
                alt="house image 7"
              />
            </motion.div>
            <motion.div
              className="row-span-2 col-start-4 row-start-4"
              variants={itemVariants}
              whileHover={hoverVariants.hover}
            >
              <motion.img
                src="https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8Mg%3D%3D&auto=format&fit=crop&q=60&w=600"
                className="w-full h-full object-cover"
                alt="house image 8"
              />
            </motion.div>
          </motion.div>
        </div>
      </header>
      <div className="w-full px-16 mt-[20px] flex gap-6">
        <motion.div
          className="w-2/3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div className="flex justify-between items-start mt-4">
            <h1 className="text-4xl font-bold">The Willow House</h1>
            <div className="flex items-center justify-center gap-4 font-medium">
              <span className="flex items-center justify-center text-sm gap-2">
                <Share2 size={16} />
                Share
              </span>
              <span className="flex items-center justify-center text-sm gap-2">
                <Heart size={16} />
                Save
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center justify-center gap-1 font-medium">
              <Star fill="gold" stroke="none" size={18} />
              4.3
            </div>
            <p className="tracking-wider">• 322 Reviews</p>
          </div>
          <div className="py-4 border-t border-b border-[#99582a]/40 mt-4 flex items-center font-regular">
            <div className="py-2 flex items-center justify-center gap-1 pr-8 border-r-2 border-[#99582a]">
              <UsersRound size={22} />
              <b>8</b>Guests
            </div>
            <div className="pl-4 py-2 flex items-center justify-center gap-1 pr-8 border-r-2 border-[#99582a]">
              <BedDouble size={22} />
              <b>3</b>Bedrooms
            </div>
            <div className="pl-4 py-2 flex items-center justify-center gap-1 pr-8 border-r-2 border-[#99582a]">
              <CookingPot size={22} />
              <b>1</b>Kitchen
            </div>
            <div className="pl-4 py-2 flex items-center justify-center gap-1 ">
              <Bath size={22} />
              <b>2</b>Bathrooms
            </div>
          </div>
          <div className="border-t border-[#99582a]/40 mt-8 py-6">
            <h3 className="text-2xl font-medium font-[DM_Sans]">About this place</h3>
            <p className="leading-relaxed mt-2" data-testid="text-description">
              {displayDescription}
            </p>
            {shouldTruncate && (
              <button
                className="mt-2 h-auto bg-[#99582a]/20 rounded-full px-2 cursor-pointer hover:bg-[#99582a]/40 font-semibold text-sm opacity-70"
                onClick={() => setShowFullDescription(!showFullDescription)}
                data-testid="button-read-more"
              >
                {showFullDescription ? "Show less" : "Read more"}
              </button>
            )}
          </div>
          <div className="border-t border-[#99582a]/40 mt-4 py-6">
            <h3 className="text-2xl font-medium font-[DM_Sans]">Location</h3>
            <div className="space-y-4">
              <p className="leading-relaxed mt-2">
                Nestled in the heart of Malibu, this beachfront property offers
                the perfect blend of privacy and accessibility. Just steps away
                from pristine beaches and a short 10-minute drive from downtown
                Malibu, you'll find world-class restaurants, boutique shopping,
                and vibrant nightlife. The neighborhood is known for its
                celebrity homes and exclusive oceanfront properties.
              </p>
              <div className="flex items-center gap-2 text-[#432818]/80 text-sm">
                <MapPin size={16} />
                <span>Malibu, California, United States</span>
              </div>
              <button
                onClick={() => setShowMap(!showMap)}
                className="flex items-center gap-2 bg-[#99582a]/20 rounded-lg px-4 py-2 cursor-pointer hover:bg-[#99582a]/40 font-medium text-sm"
              >
                {showMap ? "Hide Map" : "View on Map"}
                {showMap ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {showMap && (
                <div className="w-full h-[300px] rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52859.25941914001!2d-118.80632755136719!3d34.03527799999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80e81da9f908d63f%3A0x93b72d71b2ea8c5a!2sMalibu%2C%20CA%2C%20USA!5e0!3m2!1sen!2sin!4v1699117142317!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              )}
            </div>
          </div>
          <div className="mt-2 border-t border-[#99582a]/40 py-6 space-y-4">
            <h3 className="text-xl font-medium font-[DM_Sans]">Meet Your Host</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center rounded-full w-20 h-20 overflow-hidden">
                <img
                  src="/profPic.jpg"
                  className="w-full h-full object-cover"
                  alt="host picture"
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">Amit Jayesh</h3>
                <p className="text-sm tracking-wider text-black/60">
                  amit@jayesh.com
                </p>
                <p className="text-sm tracking-wider text-black/60">
                  Host since 2021
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 border-t border-b border-[#99582a]/40 py-6 space-y-4">
            <h3 className="text-2xl font-medium font-[DM_Sans]">Amenities Provided</h3>
            <div className="grid grid-cols-2 gap-4 w-full text-base">
              <p className="flex items-center gap-2">
                <Wifi size={18} /> High-speed WiFi
              </p>
              <p className="flex items-center gap-2">
                <AirVent size={18} /> Air Conditioning
              </p>
              <p className="flex items-center gap-2">
                <Heater size={18} /> Heating
              </p>
              <p className="flex items-center gap-2">
                <Tv size={18} /> Smart Television
              </p>
              <p className="flex items-center gap-2">
                <ForkKnife size={18} /> Kitchen
              </p>
              <p className="flex items-center gap-2">
                <Coffee size={18} /> Coffee Machine
              </p>
              <p className="flex items-center gap-2">
                <Car size={18} /> Car Parking
              </p>
              <p className="flex items-center gap-2">
                <WashingMachine size={18} /> Dish and Cloth Washer
              </p>
              <button className="bg-[#432818]/90 w-fit rounded-sm px-4 py-2 cursor-pointer hover:bg-[#432818] font-regular text-sm text-white/80 hover:text-white">
                See all 12 Amenities
              </button>
            </div>
          </div>
          <div className="border-b border-[#99582a]/40 py-6 space-y-4">
            <h3 className="text-2xl font-medium font-[DM_Sans]">Rules</h3>
            <div className="grid grid-cols-2 gap-4 w-full text-base">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <p className="font-medium">
                  Check-in: <span className="font-normal">9 P.M - 9 A.M</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <p className="font-medium">
                  Check-out: <span className="font-normal">11 A.M</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <UsersRound size={18} />
                <p className="font-medium">
                  Maximum Guests: <span className="font-normal">8</span>
                </p>
              </div>
              <div className="flex items-center gap-2">
                <CigaretteOff size={18} />
                <p className="font-medium">
                  <span className="text-red-700">No</span> Smoking Allowed
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Dog size={18} />
                <p className="font-medium">
                  <span className="text-red-700">No</span> Pets Allowed
                </p>
              </div>
              <div className="flex items-center gap-2">
                <ShieldBan size={18} />
                <p className="font-medium">
                  Quiet Hours:{" "}
                  <span className="font-normal">10 P.M - 8 A.M</span>
                </p>
              </div>
            </div>
          </div>

          <div className="border-b border-[#99582a]/40 py-6 space-y-4">
            <h3 className="text-2xl font-medium font-[DM_Sans]">Payment & Security</h3>
            <div className="p-5 rounded-2xl space-y-1.5 bg-[#391a03]/20">
              <h3 className="flex items-center font-medium text-lg gap-2 font-[DM_Sans]">
                <Shield size={20} />
                Security Deposit
              </h3>
              <div className="flex items-baseline gap-2">
                <h3 className="text-2xl font-bold">$100 </h3>
                <p className="font-normal text-sm opacity-80">
                  (held, not charged)
                </p>
              </div>
              <p className="opacity-80">
                A refundable security deposit will be held on your payment
                method. It will be released 7 days after checkout if no damage
                occur.
              </p>
            </div>
            <div className="p-5 rounded-2xl space-y-1.5 bg-[#391a03]/20">
              <h3 className="flex items-center font-medium text-lg gap-2 font-[DM_Sans]">
                <CreditCard size={20} />
                Payment Schedule
              </h3>
              <ul className="opacity-80">
                <li className="flex items-center gap-2">
                  <BsCircleFill size={6} />
                  50% due at booking confirmation
                </li>
                <li className="flex items-center gap-2">
                  <BsCircleFill size={6} />
                  Remaining 50% due 30 days before check-in
                </li>
                <li className="flex items-center gap-2">
                  <BsCircleFill size={6} />
                  Security deposit held at check-in
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl space-y-1.5 bg-[#391a03]/20">
              <h3 className="flex items-center font-medium text-lg gap-2 font-[DM_Sans]">
                <CircleOff size={20} />
                Cancellation Policy
              </h3>
              <p className="opacity-80">
                Free cancellation up to 48 hours before check-in. After that,
                cancel upto 24 hours before check-in and get a 50% refund of the
                nightly rate.
              </p>
            </div>
            <div className="px-5 py-2 rounded-lg bg-[#391a03]/20 flex items-center gap-2">
              <Info size={16} />
              <p className="opacity-80">
                All payments are processed securely. Your payment information is
                never shared with the host.
              </p>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="w-1/3 flex justify-center rounded-2xl overflow-hidden h-fit sticky top-20"
          variants={bookingWidgetVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="w-full bg-[#432818] flex flex-col text-white p-5 gap-6"
            whileHover={{ boxShadow: "0 8px 32px rgba(67,40,24,0.3)" }}
            transition={{ duration: 0.3 }}
          >
            <motion.h2
              className="text-4xl font-bold font-[DM_Sans]"
              variants={priceVariants}
              initial="initial"
              whileHover="hover"
            >
              $230
              <motion.span
                className="text-sm font-normal text-white/60"
                animate={{ opacity: [0.6, 0.8, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {" "}
                / night
              </motion.span>
            </motion.h2>

            <motion.div
              className="w-full flex items-center gap-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="w-1/2 p-2 bg-[#99582a]/20 rounded-lg"
                whileHover={{ backgroundColor: "rgba(153,88,42,0.3)" }}
              >
                <p className="px-1 text-white/80">Check-in</p>
                <motion.input
                  type="date"
                  className="w-full text-white/80 p-1 bg-transparent border border-[#99582a]/20 rounded-md focus:outline-none focus:border-[#ffe6a7]/50"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
              <motion.div
                className="w-1/2 p-2 bg-[#99582a]/20 rounded-lg"
                whileHover={{ backgroundColor: "rgba(153,88,42,0.3)" }}
              >
                <p className="px-1 text-white/80">Check-out</p>
                <motion.input
                  type="date"
                  className="w-full text-white/80 p-1 bg-transparent border border-[#99582a]/20 rounded-md focus:outline-none focus:border-[#ffe6a7]/50"
                  whileFocus={{ scale: 1.02 }}
                />
              </motion.div>
            </motion.div>

            <motion.div
              className="w-full py-2 px-3 flex justify-between items-center bg-[#99582a]/20 rounded-lg"
              whileHover={{ backgroundColor: "rgba(153,88,42,0.3)" }}
            >
              <p>Guests</p>
              <div className="flex items-center gap-2 text-lg">
                <motion.button
                  className="bg-[#99582a]/40 w-6 h-6 flex items-center justify-center rounded-sm"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(153,88,42,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Plus size={12} />
                </motion.button>
                <motion.span
                  className="w-8 h-8 bg-[#432818] text-center rounded-sm flex items-center justify-center"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 0.2 }}
                >
                  2
                </motion.span>
                <motion.button
                  className="bg-[#99582a]/40 w-6 h-6 flex items-center rounded-sm justify-center"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(153,88,42,0.6)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Minus size={12} />
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {[
                { label: "$230 x 4 nights", amount: "$920" },
                { label: "Cleaning Fee", amount: "$80" },
                { label: "Total", amount: "$1,000", isTotal: true },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  className={`flex items-center border-t pt-1 border-[#99582a]/20 justify-between ${
                    item.isTotal ? "font-bold text-lg mt-2" : "text-white/80"
                  }`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <p>{item.label}</p>
                  <p>{item.amount}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.button
              className="w-full bg-[#ffe6a7] text-[#6f1d1b] font-bold text-xl py-3 rounded-lg font-[DM_Sans]"
              whileHover={{ scale: 1.02, backgroundColor: "#fff1cc" }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              Reserve Now
            </motion.button>

            <motion.div
              className="px-1 text-sm flex gap-2 items-center justify-center py-3 opacity-55 bg-[#3c200b] rounded-md"
              whileHover={{ opacity: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Info size={14} />
              <b>Security Deposit: </b>Additional $100 will be held while you
              stay
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
      <footer className="bg-[#432818] text-[#ffe6a7] px-6 py-10 mt-12">
        <div className="mx-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center">
              <span className="font-extrabold text-2xl tracking-tight italic font-[Playfair_Display]">
                Home<span className="text-[#ffe6a7] not-italic">stay</span>
                <span className="font-sans font-black text-[#99582a] not-italic ml-0.5">
                  Hub
                </span>
              </span>
            </div>
            <div className="mt-2 space-y-2.5">
              <p className="text-sm text-[#ffe6a7]/90 font-medium">
                Premium vacation rentals in handpicked locations
              </p>
              <div className="flex items-center gap-1.5 text-xs text-[#ffe6a7]/70">
                <MapPin className="h-3.5 w-3.5" />
                <span>India</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h5 className="font-semibold mb-4 text-[#ffe6a7] font-[DM_Sans]">Quick Links</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/listings"
                    className="hover:text-[#99582a] transition"
                  >
                    All Listings
                  </a>
                </li>
                <li>
                  <a href="/about" className="hover:text-[#99582a] transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/help" className="hover:text-[#99582a] transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-[#99582a] transition"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4 text-[#ffe6a7] font-[DM_Sans]">Legal</h5>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-[#99582a] transition"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-[#99582a] transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/cancellation"
                    className="hover:text-[#99582a] transition"
                  >
                    Cancellation Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h5 className="font-semibold mb-4 text-[#ffe6a7] font-[DM_Sans]">
              Stay Connected
            </h5>
            <div className="flex space-x-4 mb-6">
              <a
                href="https://instagram.com"
                aria-label="Instagram"
                className="hover:text-[#99582a] transition"
              >
                <BsInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://facebook.com"
                aria-label="Facebook"
                className="hover:text-[#99582a] transition"
              >
                <BsFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                aria-label="Twitter"
                className="hover:text-[#99582a] transition"
              >
                <BsTwitterX className="h-5 w-5" />
              </a>
            </div>
            <div className="flex gap-2 items-center text-sm">
              <Mail className="h-4 w-4" />
              <a
                href="mailto:info@homestayhub.com"
                className="hover:text-[#99582a] transition"
              >
                info@homestayhub.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[#99582a] pt-4 flex  md:flex-row items-center justify-center text-xs text-[#ffe6a7]/70">
          <span className="mt-2 md:mt-0">
            &copy; {new Date().getFullYear()} HomestayHub. All rights reserved.
          </span>
        </div>
      </footer>
      <BackToHome challengeDay="67" challengeTitle="Vacation rental"/>
    </div>
  );
}
