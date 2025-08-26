import { useState } from 'react';
import { motion } from 'framer-motion';
import BackToHome from './BackToHome';

function FinanceAnalytics() {
  const [timeRange, setTimeRange] = useState('Daily');

  const portfolioData = [
    { date: 'Jan 15', value: 285000, change: 2.3 },
    { date: 'Feb 15', value: 298000, change: 4.6 },
    { date: 'Mar 15', value: 275000, change: -7.7 },
    { date: 'Apr 15', value: 310000, change: 12.7 },
    { date: 'May 15', value: 295000, change: -4.8 },
    { date: 'Jun 15', value: 325000, change: 10.2 },
    { date: 'Jul 15', value: 340000, change: 4.6 },
    { date: 'Aug 15', value: 355000, change: 4.4 }
  ];

  const assetData = [
    { name: 'Stocks', percentage: 65, value: '₹2,30,750', color: '#0D9488' },
    { name: 'Bonds', percentage: 20, value: '₹71,000', color: '#14B8A6' },
    { name: 'Crypto', percentage: 10, value: '₹35,500', color: '#5EEAD4' },
    { name: 'Cash', percentage: 5, value: '₹17,750', color: '#99F6E4' }
  ];

  const HeroLineChart = ({ data, height = 300 }) => {
    const [tooltipData, setTooltipData] = useState(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    
    const maxValue = Math.max(...data.map(d => d.value));
    const minValue = Math.min(...data.map(d => d.value));
    const range = maxValue - minValue;
    const padding = 60;
    const width = 800;

    const getY = (value) => {
      return padding + ((maxValue - value) / range) * (height - padding * 2);
    };

    const getX = (index) => {
      return padding + (index / (data.length - 1)) * (width - padding * 2);
    };

    const createSmoothPath = (points) => {
      if (points.length < 2) return '';
      
      let path = `M ${points[0].x} ${points[0].y}`;
      
      for (let i = 1; i < points.length; i++) {
        const prev = points[i - 1];
        const curr = points[i];
        const next = points[i + 1];
        
        const cp1x = prev.x + (curr.x - prev.x) * 0.3;
        const cp1y = prev.y;
        const cp2x = curr.x - (next ? (next.x - curr.x) * 0.3 : 0);
        const cp2y = curr.y;
        
        path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
      }
      
      return path;
    };

    const points = data.map((point, index) => ({
      x: getX(index),
      y: getY(point.value),
      data: point
    }));

    const pathData = createSmoothPath(points);
    const fillPath = `${pathData} L ${getX(data.length - 1)} ${height - padding} L ${getX(0)} ${height - padding} Z`;

    const handleMouseMove = (event, point, index) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setMousePosition({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
      setTooltipData({ ...point.data, index });
    };

    const handleMouseLeave = () => {
      setTooltipData(null);
    };

    const yAxisLabels = [];
    for (let i = 0; i <= 4; i++) {
      const value = minValue + (range * i / 4);
      yAxisLabels.push({
        value: value,
        y: getY(value),
        label: `₹${Math.round(value / 1000)}K`
      });
    }

    return (
      <div className="relative">
        <svg 
          width="100%" 
          height={height} 
          viewBox={`0 0 ${width} ${height}`} 
          className="overflow-visible"
          onMouseLeave={handleMouseLeave}
        >
          <line
            x1={padding}
            y1={padding}
            x2={padding}
            y2={height - padding}
            stroke="#E5E7EB"
            strokeWidth="1"
          />
          
          <line
            x1={padding}
            y1={height - padding}
            x2={width - padding}
            y2={height - padding}
            stroke="#E5E7EB"
            strokeWidth="1"
          />

          {yAxisLabels.map((label, index) => (
            <g key={index}>
              <line
                x1={padding}
                y1={label.y}
                x2={width - padding}
                y2={label.y}
                stroke="#F3F4F6"
                strokeWidth="1"
                strokeDasharray="2,4"
              />
              <text
                x={padding - 10}
                y={label.y + 4}
                textAnchor="end"
                className="text-xs fill-gray-500"
                fontSize="11"
              >
                {label.label}
              </text>
            </g>
          ))}
          
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0D9488" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          <motion.path
            d={fillPath}
            fill="url(#heroGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />
          
          <motion.path
            d={pathData}
            fill="none"
            stroke="#0D9488"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />
          
          {points.map((point, index) => (
            <motion.circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#0D9488"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
              className="hover:scale-150 transition-transform cursor-pointer drop-shadow-sm"
              onMouseMove={(e) => handleMouseMove(e, point, index)}
              style={{ filter: 'drop-shadow(0 2px 4px rgba(13, 148, 136, 0.2))' }}
            />
          ))}
        </svg>
        
        <div className="flex justify-between mt-4 px-15">
          {data.map((point, index) => (
            <span key={index} className="text-xs text-gray-500 font-medium">{point.date}</span>
          ))}
        </div>
        
        {tooltipData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-10 bg-white rounded-lg shadow-lg border border-gray-200 p-3 pointer-events-none"
            style={{
              left: mousePosition.x + 10,
              top: mousePosition.y - 10,
              transform: 'translateY(-100%)'
            }}
          >
            <div className="text-sm font-semibold text-gray-900">{tooltipData.date}</div>
            <div className="text-lg font-bold text-teal-600">₹{tooltipData.value.toLocaleString()}</div>
            <div className={`text-sm ${tooltipData.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {tooltipData.change >= 0 ? '+' : ''}{tooltipData.change}%
            </div>
          </motion.div>
        )}
      </div>
    );
  };

  const AssetDonutChart = ({ data, size = 200 }) => {
    const [hoveredSlice, setHoveredSlice] = useState(null);
    const [tooltipData, setTooltipData] = useState(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    
    const radius = size / 2 - 20;
    const innerRadius = radius * 0.6;
    const centerX = size / 2;
    const centerY = size / 2;
    
    let cumulativePercentage = 0;

    const createArcPath = (startAngle, endAngle, outerR, innerR) => {
      const start = polarToCartesian(centerX, centerY, outerR, endAngle);
      const end = polarToCartesian(centerX, centerY, outerR, startAngle);
      const innerStart = polarToCartesian(centerX, centerY, innerR, endAngle);
      const innerEnd = polarToCartesian(centerX, centerY, innerR, startAngle);
      
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
      
      return [
        "M", start.x, start.y, 
        "A", outerR, outerR, 0, largeArcFlag, 0, end.x, end.y,
        "L", innerEnd.x, innerEnd.y,
        "A", innerR, innerR, 0, largeArcFlag, 1, innerStart.x, innerStart.y,
        "Z"
      ].join(" ");
    };

    const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      };
    };

    const handleMouseMove = (event, item, index) => {
      const rect = event.currentTarget.getBoundingClientRect();
      setMousePos({
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      });
      setTooltipData(item);
      setHoveredSlice(index);
    };

    const handleMouseLeave = () => {
      setTooltipData(null);
      setHoveredSlice(null);
    };

    const totalValue = data.reduce((sum, item) => sum + item.percentage, 0);

    return (
      <div className="relative inline-block">
        <svg width={size} height={size} onMouseLeave={handleMouseLeave}>
          {data.map((item, index) => {
            const startAngle = (cumulativePercentage / totalValue) * 360;
            const endAngle = ((cumulativePercentage + item.percentage) / totalValue) * 360;
            const currentRadius = hoveredSlice === index ? radius + 5 : radius;
            const pathData = createArcPath(startAngle, endAngle, currentRadius, innerRadius);
            
            cumulativePercentage += item.percentage;
            
            return (
              <motion.path
                key={index}
                d={pathData}
                fill={item.color}
                stroke="white"
                strokeWidth="2"
                className="cursor-pointer transition-all duration-200"
                style={{
                  filter: hoveredSlice === index 
                    ? 'brightness(1.1) drop-shadow(0 4px 12px rgba(13, 148, 136, 0.3))' 
                    : 'none'
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                onMouseMove={(e) => handleMouseMove(e, item, index)}
              />
            );
          })}
        </svg>
        
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <motion.div 
              className="text-2xl font-bold text-gray-900"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              ₹3.55L
            </motion.div>
            <motion.div 
              className="text-sm text-gray-600 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              Total Portfolio
            </motion.div>
          </div>
        </div>
        
        {tooltipData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute z-20 bg-white rounded-lg shadow-xl border border-gray-200 p-3 pointer-events-none"
            style={{
              left: mousePos.x + 10,
              top: mousePos.y - 10,
              transform: 'translateY(-100%)'
            }}
          >
            <div className="text-sm font-semibold text-gray-900">{tooltipData.name}</div>
            <div className="text-lg font-bold text-teal-600">{tooltipData.value}</div>
            <div className="text-sm text-gray-600">{tooltipData.percentage}% of portfolio</div>
          </motion.div>
        )}
      </div>
    );
  };


  return (
    <div className="min-h-screen bg-white p-6">
      <BackToHome />
      
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Portfolio Analytics</h1>
              <p className="text-gray-600 mt-2">Monitor your financial growth and investment performance</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['Daily', 'Weekly', 'Monthly'].map((period) => (
                  <button
                    key={period}
                    onClick={() => setTimeRange(period)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                      timeRange === period
                        ? 'bg-teal-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-10">
          <motion.div 
            className="xl:col-span-2 bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-bold text-gray-900">Portfolio Growth Over Time</h3>
                <p className="text-sm text-gray-600 mt-1">Track your investment performance trends</p>
              </div>
              <div className="flex items-center space-x-2 text-sm bg-teal-50 px-3 py-1 rounded-lg">
                <div className="w-3 h-3 bg-teal-600 rounded-full"></div>
                <span className="text-teal-700 font-medium">Portfolio Value</span>
              </div>
            </div>
            
            <HeroLineChart data={portfolioData} height={320} />
          </motion.div>

          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900">Asset Distribution</h3>
              <p className="text-sm text-gray-600 mt-1">Portfolio composition breakdown</p>
            </div>
            
            <div className="flex justify-center mb-6">
              <AssetDonutChart data={assetData} size={220} />
            </div>
            
            <div className="space-y-3">
              {assetData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </div>
  );
}

export default FinanceAnalytics;
