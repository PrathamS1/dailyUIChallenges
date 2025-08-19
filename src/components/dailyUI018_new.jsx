import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HiTrendingUp, 
  HiTrendingDown, 
  HiChevronDown,
  HiCalendar
} from 'react-icons/hi';
import BackToHome from './BackToHome';

function FinanceAnalytics() {
  const [timeRange, setTimeRange] = useState('7D');

  // Sample data for custom charts
  const portfolioData = [
    { label: 'Mon', value: 82, change: 2.5 },
    { label: 'Tue', value: 78, change: -4.8 },
    { label: 'Wed', value: 85, change: 8.9 },
    { label: 'Thu', value: 90, change: 5.9 },
    { label: 'Fri', value: 88, change: -2.2 },
    { label: 'Sat', value: 95, change: 8.0 },
    { label: 'Sun', value: 92, change: -3.2 }
  ];

  const sectorData = [
    { name: 'Technology', percentage: 35, value: '₹1,06,750', color: '#3B82F6' },
    { name: 'Healthcare', percentage: 25, value: '₹76,250', color: '#10B981' },
    { name: 'Finance', percentage: 20, value: '₹61,000', color: '#F59E0B' },
    { name: 'Consumer', percentage: 15, value: '₹45,750', color: '#8B5CF6' },
    { name: 'Energy', percentage: 5, value: '₹15,250', color: '#EF4444' }
  ];

  // Custom Line Chart Component
  const CustomLineChart = ({ data, height = 200 }) => {
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue;

    const getY = (value) => {
      return height - ((value - minValue) / range) * (height - 40);
    };

    const getX = (index) => {
      return (index / (data.length - 1)) * 100;
    };

    // Create path for the line
    const pathData = data.map((point, index) => {
      const x = getX(index);
      const y = getY(point.value);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');

    // Create path for the gradient fill
    const fillPath = `${pathData} L 100 ${height} L 0 ${height} Z`;

    return (
      <div className="relative">
        <svg width="100%" height={height} viewBox={`0 0 100 ${height}`} className="overflow-visible">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map(y => (
            <line
              key={y}
              x1="0"
              y1={y * (height / 100)}
              x2="100"
              y2={y * (height / 100)}
              stroke="#f1f5f9"
              strokeWidth="0.5"
            />
          ))}
          
          {/* Gradient fill */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <motion.path
            d={fillPath}
            fill="url(#chartGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {/* Main line */}
          <motion.path
            d={pathData}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
          
          {/* Data points */}
          {data.map((point, index) => (
            <motion.circle
              key={index}
              cx={getX(index)}
              cy={getY(point.value)}
              r="3"
              fill="#3B82F6"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
              className="hover:scale-150 transition-transform cursor-pointer"
            />
          ))}
        </svg>
        
        {/* X-axis labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          {data.map((point, index) => (
            <span key={index}>{point.label}</span>
          ))}
        </div>
      </div>
    );
  };

  // Custom Bar Chart Component
  const CustomBarChart = ({ data }) => {
    return (
      <div className="space-y-4">
        {data.map((item, index) => (
          <motion.div
            key={index}
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                <span className="text-sm text-gray-500">{item.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                />
              </div>
            </div>
            <span className="text-sm font-medium text-gray-900 min-w-[80px] text-right">
              {item.value}
            </span>
          </motion.div>
        ))}
      </div>
    );
  };

  // Custom Donut Chart Component
  const CustomDonutChart = ({ data, size = 120 }) => {
    const radius = size / 2 - 10;
    const centerX = size / 2;
    const centerY = size / 2;
    const circumference = 2 * Math.PI * radius;
    
    let cumulativePercentage = 0;

    return (
      <div className="relative inline-block">
        <svg width={size} height={size}>
          {/* Background circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="none"
            stroke="#f1f5f9"
            strokeWidth="20"
          />
          
          {/* Data segments */}
          {data.map((item, index) => {
            const strokeDasharray = `${(item.percentage / 100) * circumference} ${circumference}`;
            const strokeDashoffset = -cumulativePercentage * (circumference / 100);
            cumulativePercentage += item.percentage;
            
            return (
              <motion.circle
                key={index}
                cx={centerX}
                cy={centerY}
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth="20"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                initial={{ strokeDasharray: `0 ${circumference}` }}
                animate={{ strokeDasharray }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                style={{ transformOrigin: `${centerX}px ${centerY}px`, transform: 'rotate(-90deg)' }}
              />
            );
          })}
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">₹3.05L</div>
            <div className="text-xs text-gray-500">Total</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <BackToHome />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-gray-600 mt-1">Track your portfolio performance and insights</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <select 
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm font-medium text-gray-700 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option>7D</option>
                  <option>1M</option>
                  <option>3M</option>
                  <option>1Y</option>
                </select>
                <HiChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Key Metrics */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <HiTrendingUp className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+12.5%</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">₹3,05,000</p>
              <p className="text-sm text-gray-600">Portfolio Value</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <HiTrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-green-600 text-sm font-medium">+8.2%</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">+₹22,000</p>
              <p className="text-sm text-gray-600">Total Gains</p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <HiCalendar className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-blue-600 text-sm font-medium">Medium</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">6.8/10</p>
              <p className="text-sm text-gray-600">Risk Score</p>
            </div>
          </div>
        </motion.div>

        {/* Main Chart Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio Performance Chart */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Portfolio Performance</h3>
              <div className="flex items-center space-x-2 text-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Weekly Performance</span>
              </div>
            </div>
            
            <CustomLineChart data={portfolioData} height={300} />
          </motion.div>

          {/* Sector Allocation Donut */}
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-sm"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Asset Allocation</h3>
            
            <div className="flex justify-center mb-6">
              <CustomDonutChart data={sectorData} size={160} />
            </div>
            
            {/* Legend */}
            <div className="space-y-3">
              {sectorData.slice(0, 3).map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sector Breakdown */}
        <motion.div 
          className="mt-8 bg-white rounded-xl p-6 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sector Breakdown</h3>
          <CustomBarChart data={sectorData} />
        </motion.div>
      </div>
    </div>
  );
}

export default FinanceAnalytics;
