import React, { useState } from "react";
import { motion } from "framer-motion";

function Barcode({ width = 200, height = 60, value = "A1234567890" }) {
  const patterns = {
    A: [1, 0, 1, 1, 0, 1],
    1: [1, 1, 0, 1, 0, 0],
    2: [1, 0, 1, 0, 1, 1],
    3: [1, 1, 1, 0, 0, 1],
    4: [0, 1, 1, 1, 0, 1],
    5: [1, 0, 0, 1, 1, 1],
    6: [0, 1, 0, 1, 1, 1],
    7: [1, 1, 0, 0, 1, 1],
    8: [1, 1, 1, 1, 0, 0],
    9: [0, 1, 1, 0, 1, 1],
    0: [1, 0, 1, 1, 1, 0],
  };
  const barWidth = width / (value.length * 6);
  let bars = [];
  let x = 0;
  for (let char of value) {
    const pat = patterns[char] || [1, 0, 1, 0, 1, 0];
    for (let i = 0; i < pat.length; i++) {
      if (pat[i]) {
        bars.push(
          <rect
            key={x}
            x={x}
            y={0}
            width={barWidth}
            height={height}
            fill="#222"
          />
        );
      }
      x += barWidth;
    }
    x += barWidth / 3;
  }
  return (
    <svg width={width} height={height} className="w-full h-auto">
      {bars}
    </svg>
  );
}

function WebBoardingPass({
  airline = "IndiGo",
  logo = "https://download.logo.wine/logo/IndiGo/IndiGo-Logo.wine.png",
  passenger = "Marx",
  flight = "6E-2001",
  origin = "BOM",
  originCity = "Mumbai",
  destination = "EDI",
  destinationCity = "Scotland",
  gate = "A12",
  seat = "14C",
  classType = "Economy",
  departure = "2025-08-24",
  departureTime = "09:45",
  boardingTime = "09:15",
  barcodeValue = "A1234567890",
  destinationImage = "https://images.unsplash.com/photo-1506377585622-bedcbb027afc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHNjb3RsYW5kfGVufDB8fDB8fHwy",
}) {
  const [hovered, setHovered] = useState(false);
  const [cardVisible, setCardVisible] = useState(false);
  return (
    <div
      className="relative w-[50rem] mx-auto my-6 h-[320px]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-lg overflow-hidden z-0"
        style={{ transformOrigin: "left center" }}
        initial={{ opacity: 0 }}
        animate={
          cardVisible
            ? hovered
              ? {
                  opacity: 1,
                  rotateZ: -10,
                  x: -20,
                  y: 10,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
                }
              : {
                  opacity: 1,
                  rotateZ: 0,
                  x: 0,
                  y: 0,
                  boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
                }
            : { opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        <img
          src={destinationImage}
          alt="destination"
          className="w-full h-full object-cover"
        />
      </motion.div>

      <motion.div
        className="boarding-pass-web flex flex-row bg-white rounded-2xl shadow-lg overflow-hidden w-full h-full font-sans z-10 relative"
        style={{ transformOrigin: "left center" }}
        initial={{ opacity: 0, scale: 0.95, rotateZ: 0, x: 0, y: 0 }}
        animate={
          hovered
            ? {
                opacity: 1,
                scale: 1,
                rotateZ: 6,
                x: 10,
                y: -6,
                boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
              }
            : {
                opacity: 1,
                scale: 1,
                rotateZ: 0,
                x: 0,
                y: 0,
                boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
              }
        }
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onAnimationComplete={() => setCardVisible(true)}
      >
        {/* Left*/}
        <motion.div
          className="flex flex-col items-center justify-between bg-gray-100 py-8"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img src={logo} alt="airline logo" className="w-24 mb-4" />
          <div className="flex flex-col items-center h-full justify-center">
            <span className="text-xl font-bold tracking-widest rotate-270 writing-vertical-ltr">
              {airline}
            </span>
          </div>
        </motion.div>
        {/* Center */}
        <motion.div
          className="flex-1 flex flex-col justify-center py-8 px-10 min-w-[0]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <motion.div
            className="flex justify-between mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <div className="font-semibold text-lg break-words max-w-[220px]">
              {passenger}
            </div>
            <div className="font-medium text-base break-words max-w-[180px]">
              Flight: {flight}
            </div>
          </motion.div>
          <motion.div
            className="flex items-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            <div className="text-4xl font-bold break-words max-w-[120px]">
              {origin}
            </div>
            <span className="text-2xl mx-4">→</span>
            <div className="text-4xl font-bold break-words max-w-[120px]">
              {destination}
            </div>
          </motion.div>
          <motion.div
            className="flex justify-between mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <div className="text-sm text-gray-500 break-words max-w-[120px]">
              {originCity}
            </div>
            <div className="text-sm text-gray-500 break-words max-w-[120px]">
              {destinationCity}
            </div>
          </motion.div>
          <motion.div
            className="flex justify-between mt-6 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.4 }}
          >
            <div>
              <div className="text-xs text-gray-500">Date</div>
              <div className="font-medium break-words max-w-[100px]">
                {departure}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Departure</div>
              <div className="font-medium break-words max-w-[100px]">
                {departureTime}
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Boarding</div>
              <div className="font-medium break-words max-w-[100px]">
                {boardingTime}
              </div>
            </div>
          </motion.div>
          <motion.div
            className="w-full mt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <Barcode width={600} height={60} value={barcodeValue} />
          </motion.div>
        </motion.div>
        {/* Right*/}
        <motion.div
          className="flex flex-col items-end justify-center py-8 px-6 min-w-[120px] relative shadow-lg"
          style={{
            background:
              "linear-gradient(135deg, #232946 0%, #3e497a 40%, #5c5470 80%, #16161a 100%)",
          }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <div className="absolute top-0 h-full justify-center -left-5 flex flex-col items-center gap-2">
            <div className=" w-8 h-8 bg-white rounded-full"></div>
            <div className=" w-8 h-8 bg-white rounded-full"></div>
            <div className=" w-8 h-8 bg-white rounded-full"></div>
            <div className=" w-8 h-8 bg-white rounded-full"></div>
            <div className=" w-8 h-8 bg-white rounded-full"></div>
            <div className=" w-8 h-8 bg-white rounded-full"></div>
            <div className=" w-8 h-8 bg-white rounded-full"></div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-200">Gate</div>
            <div className="font-semibold text-lg break-words max-w-[80px] text-white">
              {gate}
            </div>
          </div>
          <div className="mb-4">
            <div className="text-xs text-gray-200">Seat</div>
            <div className="font-semibold text-lg break-words max-w-[80px] text-white">
              {seat}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-200">Class</div>
            <div className="font-semibold text-lg break-words max-w-[80px] text-white">
              {classType}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MobileBoardingPass({
  airline = "IndiGo",
  logo = "https://download.logo.wine/logo/IndiGo/IndiGo-Logo.wine.png",
  passenger = "Marx",
  flight = "6E-2001",
  origin = "BOM",
  originCity = "Mumbai",
  destination = "EDI",
  destinationCity = "Scotland",
  gate = "A12",
  seat = "14C",
  classType = "Economy",
  departure = "2025-08-24",
  departureTime = "09:45",
  boardingTime = "09:15",
  barcodeValue = "A1234567890",
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <motion.div
      className="boarding-pass-mobile flex flex-col bg-white rounded-2xl shadow-lg overflow-hidden w-[340px] mx-auto my-6 font-sans"
      style={{
        transition: 'box-shadow 0.3s',
        boxShadow: hovered
          ? '0 12px 40px rgba(44, 62, 80, 0.35), 0 2px 8px rgba(44, 62, 80, 0.18)'
          : '0 4px 24px rgba(44, 62, 80, 0.18)'
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
    >
      <motion.div
        className="bg-[url('/airw.jpg')] bg-cover bg-no-repeat bg-center py-6 flex flex-col items-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <img src={logo} alt="airline logo" className="w-24 mb-2" />
        <div className="font-bold text-xl">{airline}</div>
      </motion.div>

      <motion.div
        className="px-6 pt-4 flex items-center justify-between"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <div className="font-semibold text-base">{passenger}</div>
        <div className="font-medium text-sm">Flight: {flight}</div>
      </motion.div>
      
      <motion.div
        className="flex items-center justify-center my-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <div className="text-3xl font-bold">{origin}</div>
        <span className="text-xl mx-3">→</span>
        <div className="text-3xl font-bold">{destination}</div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <InfoCard
          originCity={originCity}
          destinationCity={destinationCity}
          gate={gate}
          seat={seat}
          classType={classType}
          departure={departure}
          departureTime={departureTime}
          boardingTime={boardingTime}
        />
      </motion.div>

      <motion.div
        className="bg-blue-50 flex items-center justify-center py-4 px-10 w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.4 }}
      >
        <div className="w-full flex items-center justify-center">
          <Barcode width={260} height={50} value={barcodeValue} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function InfoCard({
  originCity = "Mumbai",
  destinationCity = "Scotland",
  gate = "A12",
  seat = "14C",
  classType = "Economy",
  departure = "2025-08-24",
  departureTime = "09:45",
  boardingTime = "09:15",
}) {
  return (
    <div
      className="rounded-xl shadow-lg p-6 w-full max-w-md mx-auto my-8 text-white scale-95"
      style={{
        background:
          "linear-gradient(120deg, #232946 0%, #3e497a 40%, #5c5470 80%, #16161a 100%)",
      }}
    >
      <div className="flex justify-between mb-4">
        <div className="font-semibold text-lg">{originCity}</div>
        <span className="text-2xl">→</span>
        <div className="font-semibold text-lg">{destinationCity}</div>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <div className="text-xs text-gray-300">Gate</div>
          <div className="font-bold text-base">{gate}</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Seat</div>
          <div className="font-bold text-base">{seat}</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Class</div>
          <div className="font-bold text-base">{classType}</div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <div className="text-xs text-gray-300">Date</div>
          <div className="font-bold text-base">{departure}</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Departure</div>
          <div className="font-bold text-base">{departureTime}</div>
        </div>
        <div>
          <div className="text-xs text-gray-300">Boarding</div>
          <div className="font-bold text-base">{boardingTime}</div>
        </div>
      </div>
    </div>
  );
}

export default function BoardingPass() {
  return (
    <div className="flex flex-row justify-center items-center gap-12 flex-wrap py-8 bg-[url('/airways.jpg')] bg-cover bg-center bg-no-repeat">
      <WebBoardingPass />
      <MobileBoardingPass />
    </div>
  );
}
