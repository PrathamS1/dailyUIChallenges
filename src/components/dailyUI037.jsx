import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useRef} from 'react';
import {
  Sun,
  CloudRain,
  Wind,
  Droplets,
  Sunrise,
  Bell,
  ChevronDown,
  ChevronUp,
  Cloud,
} from 'lucide-react';
import { faker } from '@faker-js/faker';
import BackToHome from './BackToHome';

const weatherTypes = {
  sunny: {
    name: 'Sunny',
    bgImage: 'https://lh3.googleusercontent.com/rd-gg-dl/AJfQ9KRPZp89wafpvovE4pctj1BvPWbZe361Glxq1ttAqrSupojx2Xs2ibRG9B_wsWB9mUvVx2faIwT-tLhjgDxSntyqHr1QgJM27wT_-kVaFysPlzsURbs7eWT7C3dDBq03ta2hE4P8ZUgLnPoT3qSg4uT3H7XEM7UFGbEGcVmlk3SBQa_CzAm_bf1TRS6XqnwrJXcF3QkO4tXc6w-blveNCjyVePg7uk-dkNEcHF-Xl-Ues_yweLedJVOrFFU8hKzZV_C_4Zgf0fdk9yGiYjbONOi9F3BJ1yyt036vv8oQyySrqW44e4eAtp33hXyd0XMX6jdDutfGIBJuLA1TX8rjLOHV8yTh2wym3W2qIjnkjaw-s_TTfQiHNCeghCRp5CInP8KiuJsrcTFeurKcl6qll8cDeq6QKUBG3xVFOQn-cqdiCUtOS3yf4Cl9_2sDSuVVymGRmuTOx0hLsf77Fb8oC98EjblSZsDt7hCtAvcPCDMhKeFnXQUid0F3HORXqEbyFuyaqsEGN2xsWvmGQpggH3nHvaTefyZlS1OO_5KGFGtnfmNXtMeWsnuhINKXcK6IGCeKATzuAswSZsV6dfFibSRKny5VMcx7dhxk-XVRC54ItJG-iHwmnjMRIQ4VsG79s3iALSQAsecHqIxk8uWRjjh82Shv1ukqSeYuu27qj98Mzyx7CGmeolkrCWLUqvJKaE5MLQ2xyPnD0f6cyA-Y7DYPVU7M8y5ak0Z8JY1gCoQ4zMSuS6So_t28o45XerCs_ouFRaQK9kf_apkCCp7KiSrf0PbKPDfkgDUjDw6oXyydZkWEM_5xh__QwXqE2NvnpRVtHB7OCXijibgsb3_w5FNDFbcPib6FyERtJa-M1OTlCpbs9nqpxDOLBxTaZHLMjgF3aor9GvalKORrk7SXMqW3BAudo_19i2Izkqwc1M7bmxRJORn4VDmg39tewvmsLqslslN3rqW8rfZCZ1_oHwJkM5w45Ihs87Y_-OjST4Tgu1Z-G2p3x-8RhRkaYBQ9P2fLs8xarPXJlN2bj2L2qFT3Ngdmxpws7lG_Fordayps1cWBJch_Xw0mnDOFdPRBhL7LChJ1BxxqDrbQoJGrcC5cFXRgdGBSl0-7Ezqvfe4_BxjlPFFn2qU4sLBSLatMsFYP6FRsmWfjDtm4HZ406tmqrb_ftJ1DN2aSIJuDULCya7zYMJezZPJzZM7TkQ=s1024',
    gradient: 'from-black to-orange-500/80',
    textColor: 'text-amber-100',
    iconColor: 'text-amber-100',
    cardBg: 'bg-amber-500/40',
    temp: { min: 28, max: 35 },
  },
  cloudy: {
    name: 'Cloudy',
    bgImage: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&q=80',
    gradient: 'from-black to-blue-600/80',
    textColor: 'text-blue-50',
    iconColor: 'text-blue-50',
    cardBg: 'bg-blue-300/10',
    temp: { min: 20, max: 28 },
  },
  rainy: {
    name: 'Rainy',
    bgImage: 'https://images.unsplash.com/photo-1706730511764-23a0ff2eecbf?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHJhaW55JTIwd2VhdGhlcnxlbnwwfDF8MHx8fDI%3D',
    gradient: 'from-black to-blue-600/80',
    textColor: 'text-blue-100',
    iconColor: 'text-blue-100',
    cardBg: 'bg-blue-500/10',
    temp: { min: 18, max: 25 },
  },
  stormy: {
    name: 'Stormy',
    bgImage: 'https://images.unsplash.com/photo-1514856841774-b927b221d7c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzZ8fHN0b3JteSUyMHdlYXRoZXJ8ZW58MHwxfDB8fHwy',
    gradient: 'from-gray-900/90 to-purple-900/90',
    textColor: 'text-purple-100',
    iconColor: 'text-purple-100',
    cardBg: 'bg-purple-400/10',
    temp: { min: 16, max: 22 },
  },
};

// weather data 
const weatherData = {
  city: 'Kanpur, Uttar Pradesh',
  currentTemp: 32,
  feelsLike: 35,
  condition: 'Mostly Sunny',
  insights: [
    { icon: Wind, label: 'Wind', value: '8 km/h' },
    { icon: Droplets, label: 'Humidity', value: '75%' },
    { icon: Sun, label: 'UV Index', value: '8/10' },
    { icon: Sunrise, label: 'Sunrise', value: '5:45 AM' },
    { icon: CloudRain, label: 'Rain', value: '10%' },
  ],
  hourly: Array(24).fill(null).map((_, i) => ({
    time: `${i}:00`,
    temp: faker.number.int({ min: 20, max: 28 }),
    icon: i % 2 === 0 ? Sun : Cloud,
  })),
  daily: Array(7).fill(null).map((_, i) => ({
    day: faker.date.soon({ days: i+1 }).toLocaleDateString('en-US', { weekday: 'short' }),
    minTemp: faker.number.int({ min: 18, max: 22 }),
    maxTemp: faker.number.int({ min: 23, max: 29 }),
    rainChance: faker.number.int({ min: 0, max: 100 }),
    icon: i % 2 === 0 ? Sun : CloudRain,
  })),
};

export default function WeatherUI() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentWeather, setCurrentWeather] = useState('sunny');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const weather = weatherTypes[currentWeather];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <BackToHome />
      {/* weathers to toggle*/}
      <div className="absolute top-4 right-4 flex gap-2">
        {Object.keys(weatherTypes).map((type) => (
          <button
            key={type}
            onClick={() => setCurrentWeather(type)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all
              ${currentWeather === type 
                ? 'bg-white text-gray-900 border border-black' 
                : 'bg-black/70 text-white hover:bg-black/60'}`}
          >
            {weatherTypes[type].name}
          </button>
        ))}
      </div>

      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`w-full max-w-[420px] rounded-3xl shadow-2xl overflow-hidden relative isolate`}
      >
        <motion.div
          className="absolute inset-0 w-full h-full z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ 
              backgroundImage: `url(${weather.bgImage})`,
              y,
            }}
          />
          <motion.div 
            className={`absolute inset-0 bg-gradient-to-br ${weather.gradient} mix-blend-overlay`}
            style={{ y }}
          />
        </motion.div>
        
        <div className="relative z-10 h-full w-full">
        {/* top */}
        <div className={`p-8 ${weather.textColor} bg-gradient-to-b from-black/40 to-transparent`}>
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{weatherData.city}</h1>
              <p className="opacity-80 mt-1">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                })}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full hover:bg-white/10 ${weather.iconColor}`}
            >
              <Bell size={20} />
            </motion.button>
          </div>

          <div className="mt-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className={`text-7xl font-bold mb-3 ${weather.textColor}`}
            >
              {weatherData.currentTemp}°C
            </motion.div>
            <p className={`text-lg opacity-80 ${weather.textColor}`}>
              Feels like {weatherData.feelsLike}°C • {weatherData.condition}
            </p>
          </div>
        </div>

        {/* middle */}
        <div className="px-8 pb-6">
          <motion.div 
            className="overflow-hidden"
            whileTap={{ cursor: "grabbing" }}
          >
            <motion.div 
              drag="x"
              dragConstraints={{ 
                right: 0,
                left: -((weatherData.insights.length - 2) * 130)
              }}
              className="flex space-x-5 cursor-grab select-none"
            >
              {weatherData.insights.map((insight, index) => (
                <motion.div
                  key={insight.label}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: index * 0.1 }}
                  className={`${weather.cardBg} backdrop-blur-md rounded-2xl p-5 flex flex-col items-center min-w-[130px] select-none`}
                >
                  <insight.icon className={`w-7 h-7 mb-3 ${weather.iconColor}`} />
                  <p className={`text-sm font-medium mb-1 ${weather.textColor}`}>{insight.label}</p>
                  <p className={`opacity-80 text-sm ${weather.textColor}`}>{insight.value}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* bottom */}
        <div className={`${weather.cardBg} backdrop-blur-md mt-6 p-8 rounded-t-3xl`}>
          <div className="mb-6">
            <h3 className={`font-medium mb-4 ${weather.textColor}`}>Hourly Forecast</h3>
            <motion.div 
              className="overflow-hidden"
              whileTap={{ cursor: "grabbing" }}
            >
              <motion.div 
                drag="x"
                dragConstraints={{ 
                  right: 0,
                  left: -((weatherData.hourly.length - 4) * 90)
                }}
                className="flex space-x-8 cursor-grab"
              >
                {weatherData.hourly.map((hour, index) => (
                  <motion.div
                    key={hour.time}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex flex-col items-center select-none min-w-[60px]"
                  >
                    <p className={`opacity-80 text-sm mb-2 ${weather.textColor}`}>{hour.time}</p>
                    <hour.icon className={`w-7 h-7 mb-2 ${weather.iconColor}`} />
                    <p className={`font-medium ${weather.textColor}`}>{hour.temp}°</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* days */}
          <motion.div layout className="mt-8">
            <motion.button
              onClick={() => setIsExpanded(!isExpanded)}
              className={`w-full flex items-center justify-between p-2 ${weather.textColor}`}
            >
              <span className="font-medium">7-Day Forecast</span>
              {isExpanded ? <ChevronUp className={weather.iconColor} /> : <ChevronDown className={weather.iconColor} />}
            </motion.button>

            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="space-y-4 mt-4"
                >
                  {weatherData.daily.map((day) => (
                    <div
                      key={day.day}
                      className={`flex items-center justify-between ${weather.textColor}`}
                    >
                      <p className="w-20">{day.day}</p>
                      <day.icon className={`w-6 h-6 ${weather.iconColor}`} />
                      <p className="flex-1 text-center">
                        {day.minTemp}° - {day.maxTemp}°
                      </p>
                      <p className="w-16 text-right opacity-80">{day.rainChance}%</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
        </div>
      </motion.div>
    </div>
  );
}