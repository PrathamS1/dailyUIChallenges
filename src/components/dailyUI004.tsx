import React, { useState, useEffect } from 'react';

// Types
interface FormData {
  // Travel
  vehicleType: 'petrol' | 'diesel' | 'electric' | 'none';
  weeklyKm: number;
  shortFlights: number;
  longFlights: number;
  publicTransportHours: number;
  
  // Energy
  electricityUsage: number;
  gasUsage: number;
  heatingMethod: 'gas' | 'electric' | 'solar';
  
  // Diet & Lifestyle
  dietType: 'meat-heavy' | 'mixed' | 'vegetarian' | 'vegan';
  shoppingFrequency: number; // 1-5 scale
  techUsage: 'low' | 'average' | 'heavy';
  
  // Waste
  recycles: boolean;
  composts: boolean;
  foodWaste: number;
}

interface EmissionResult {
  total: number;
  breakdown: {
    travel: number;
    energy: number;
    diet: number;
    waste: number;
  };
  recommendations: string[];
}

const CarbonFootprintCalculator: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    vehicleType: 'none',
    weeklyKm: 0,
    shortFlights: 0,
    longFlights: 0,
    publicTransportHours: 0,
    electricityUsage: 0,
    gasUsage: 0,
    heatingMethod: 'electric',
    dietType: 'mixed',
    shoppingFrequency: 1,
    techUsage: 'low',
    recycles: false,
    composts: false,
    foodWaste: 1
  });

  const [results, setResults] = useState<EmissionResult>({
    total: 0,
    breakdown: { travel: 0, energy: 0, diet: 0, waste: 0 },
    recommendations: []
  });

  const [showTooltip, setShowTooltip] = useState<string | null>(null);
  const [inputErrors, setInputErrors] = useState<Record<string, string>>({});
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  // Emission factors (kg CO2e)
  const emissionFactors = {
    car: {
      petrol: 0.21, // kg/km
      diesel: 0.25,
      electric: 0.07,
      none: 0
    },
    flights: {
      short: 250, // kg per flight
      long: 600
    },
    publicTransport: 2, // kg per hour
    electricity: 0.45, // kg/kWh
    gas: 2.0, // kg/liter
    diet: {
      'meat-heavy': 300,
      'mixed': 200,
      'vegetarian': 160,
      'vegan': 130
    },
    shopping: 20, // kg per frequency point
    tech: {
      low: 10,
      average: 25,
      heavy: 50
    },
    recycling: -30,
    composting: -15,
    foodWasteBase: 10 // kg per waste point
  };

  const calculateEmissions = (data: FormData): EmissionResult => {
    // Travel emissions
    const monthlyKm = data.weeklyKm * 4.33;
    const carEmissions = monthlyKm * emissionFactors.car[data.vehicleType];
    const flightEmissions = 
      data.shortFlights * emissionFactors.flights.short + 
      data.longFlights * emissionFactors.flights.long;
    const publicTransportEmissions = data.publicTransportHours * 4.33 * emissionFactors.publicTransport;
    const travelTotal = carEmissions + flightEmissions + publicTransportEmissions;

    // Energy emissions
    const electricityEmissions = data.electricityUsage * emissionFactors.electricity;
    const gasEmissions = data.gasUsage * emissionFactors.gas;
    const energyTotal = electricityEmissions + gasEmissions;

    // Diet & Lifestyle emissions
    const dietEmissions = emissionFactors.diet[data.dietType];
    const shoppingEmissions = data.shoppingFrequency * emissionFactors.shopping;
    const techEmissions = emissionFactors.tech[data.techUsage];
    const dietTotal = dietEmissions + shoppingEmissions + techEmissions;

    // Waste emissions (negative values for good practices)
    let wasteTotal = data.foodWaste * emissionFactors.foodWasteBase;
    if (data.recycles) wasteTotal += emissionFactors.recycling;
    if (data.composts) wasteTotal += emissionFactors.composting;

    const total = travelTotal + energyTotal + dietTotal + wasteTotal;

    // Generate recommendations
    const recommendations = generateRecommendations(data, {
      travel: travelTotal,
      energy: energyTotal,
      diet: dietTotal,
      waste: wasteTotal
    });

    return {
      total: Math.max(0, total),
      breakdown: {
        travel: travelTotal,
        energy: energyTotal,
        diet: dietTotal,
        waste: wasteTotal
      },
      recommendations
    };
  };

  const generateRecommendations = (data: FormData, breakdown: any): string[] => {
    const recommendations: string[] = [];

    if (data.vehicleType === 'petrol' || data.vehicleType === 'diesel') {
      recommendations.push(`Switching to public transport could reduce ${Math.round(breakdown.travel * 0.6)} kg/month`);
    }

    if (data.dietType === 'meat-heavy') {
      recommendations.push(`Reducing meat intake 2 days a week lowers emissions by 80 kg/month`);
    }

    if (!data.recycles) {
      recommendations.push(`Starting to recycle could save 30 kg/month`);
    }

    if (data.electricityUsage > 300) {
      recommendations.push(`Reducing electricity use by 20% could save ${Math.round(data.electricityUsage * 0.2 * emissionFactors.electricity)} kg/month`);
    }

    return recommendations.slice(0, 3);
  };

  useEffect(() => {
    const newResults = calculateEmissions(formData);
    setResults(newResults);
  }, [formData]);

  const hasAnyData = (data: FormData): boolean => {
    return data.weeklyKm > 0 || 
           data.shortFlights > 0 || 
           data.longFlights > 0 || 
           data.publicTransportHours > 0 ||
           data.electricityUsage > 0 || 
           data.gasUsage > 0 ||
           data.vehicleType !== 'none' ||
           data.recycles || 
           data.composts ||
           data.shoppingFrequency > 1 ||
           data.techUsage !== 'low' ||
           data.foodWaste > 1;
  };

  const updateFormData = (field: keyof FormData, value: any) => {
    // Clear any existing error for this field
    setInputErrors(prev => ({ ...prev, [field]: '' }));
    
    // Validate numeric fields to prevent negative values
    if (typeof value === 'number' && ['weeklyKm', 'shortFlights', 'longFlights', 'publicTransportHours', 'electricityUsage', 'gasUsage'].includes(field)) {
      if (value < 0) {
        setInputErrors(prev => ({ ...prev, [field]: 'Value cannot be negative' }));
        return;
      }
      
      // Add reasonable upper limits for validation
      const limits: Record<string, number> = {
        weeklyKm: 2000, // ~500km per day seems excessive
        shortFlights: 50, // 50 flights per month seems unrealistic
        longFlights: 20, // 20 long flights per month seems unrealistic
        publicTransportHours: 168, // max hours in a week
        electricityUsage: 5000, // very high but possible for large homes
        gasUsage: 1000 // very high usage
      };
      
      if (limits[field] && value > limits[field]) {
        setInputErrors(prev => ({ ...prev, [field]: `Value seems unusually high (max recommended: ${limits[field]})` }));
      }
      
      value = Math.max(0, value);
    }
    
    // Validate range fields (1-5 scale)
    if (field === 'shoppingFrequency' || field === 'foodWaste') {
      value = Math.max(1, Math.min(5, value));
    }
    
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData({
      vehicleType: 'none',
      weeklyKm: 0,
      shortFlights: 0,
      longFlights: 0,
      publicTransportHours: 0,
      electricityUsage: 0,
      gasUsage: 0,
      heatingMethod: 'electric',
      dietType: 'mixed',
      shoppingFrequency: 1,
      techUsage: 'low',
      recycles: false,
      composts: false,
      foodWaste: 1
    });
    setInputErrors({});
  };

  const getComparisonText = (total: number) => {
    const nationalAvg = 500; // kg/month
    const globalAvg = 400;
    const sustainableTarget = 208; // 2.5 tons/year ÷ 12

    if (total <= sustainableTarget) {
      return { text: "You're below the global sustainability target! 🌱", color: "text-green-600" };
    } else if (total <= globalAvg) {
      return { text: "You're below the global average", color: "text-yellow-600" };
    } else if (total <= nationalAvg) {
      return { text: "You're near the national average", color: "text-orange-600" };
    } else {
      const percentAbove = Math.round((total - nationalAvg) / nationalAvg * 100);
      return { text: `You are above the national average by ${percentAbove}%`, color: "text-red-600" };
    }
  };

  const TreesEquivalent = ({ total }: { total: number }) => {
    const trees = Math.round(total / 22); // 22kg CO2 per tree per month
    return (
      <p className="text-gray-600 mt-2">
        That's equivalent to {trees} tree{trees !== 1 ? 's' : ''} worth of absorption
      </p>
    );
  };

  const comparison = getComparisonText(results.total);

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--calc-secondary)' }}>
      {/* Header */}
      <div className="relative" style={{ 
        background: `linear-gradient(135deg, var(--calc-primary) 0%, var(--calc-accent) 100%)` 
      }}>
        {/* Concentric border layers */}
        {/* Outermost border */}
        <div className="absolute inset-0 border-4 border-white/20 rounded-none pointer-events-none"></div>
        
        {/* Second border layer */}
        <div className="absolute inset-2 border-2 border-white/30 rounded-none pointer-events-none"></div>
        
        {/* Third border layer */}
        <div className="absolute inset-4 border border-white/40 rounded-none pointer-events-none"></div>
        
        {/* Innermost border */}
        <div className="absolute inset-6 border border-white/15 rounded-none pointer-events-none"></div>
        
        {/* Top accent line */}
        <div className="absolute top-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        
        {/* Bottom accent line */}
        <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10 relative z-10">
          <div className="text-center text-white">
            {/* Title with enhanced shadows */}
            <h1 className="text-2xl sm:text-3xl font-bold relative"
                style={{ 
                  textShadow: '0 0 20px rgba(255,255,255,0.3), 0 2px 4px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.3)'
                }}>
              Carbon Footprint Calculator
              {/* Text glow effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent blur-sm -z-10"></div>
            </h1>
          </div>
        </div>
        
        {/* Corner accent elements */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-white/30"></div>
        <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-white/30"></div>
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-white/30"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-white/30"></div>
        
        {/* Drop shadow */}
        <div className="absolute -bottom-4 left-0 right-0 h-4 bg-gradient-to-b from-black/15 to-transparent blur-lg"></div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          
          {/* Left Column - Input Form */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 lg:p-8">
              
              {/* Transportation Section */}
              <div className="mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--calc-text)' }}>
                  Transportation
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                      Vehicle Type
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {(['none', 'electric', 'petrol', 'diesel'] as const).map((vehicle) => (
                        <button
                          key={vehicle}
                          onClick={() => updateFormData('vehicleType', vehicle)}
                          className={`p-2 sm:p-3 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all ${
                            formData.vehicleType === vehicle
                              ? 'text-white shadow-md'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ 
                            backgroundColor: formData.vehicleType === vehicle ? 'var(--calc-primary)' : 'transparent',
                            borderColor: formData.vehicleType === vehicle ? 'var(--calc-primary)' : undefined,
                            color: formData.vehicleType === vehicle ? 'white' : 'var(--calc-text)'
                          }}
                        >
                          {vehicle.charAt(0).toUpperCase() + vehicle.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                      Weekly Driving (km)
                    </label>
                    <input 
                      type="number"
                      min="0"
                      step="1"
                      value={formData.weeklyKm}
                      onChange={(e) => updateFormData('weeklyKm', Number(e.target.value))}
                      placeholder="0"
                      className={`w-full p-2 sm:p-3 border-2 rounded-lg focus:outline-none text-base sm:text-lg transition-colors ${
                        inputErrors.weeklyKm 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-300 focus:border-orange-400'
                      }`}
                    />
                    {inputErrors.weeklyKm && (
                      <p className="text-red-500 text-xs mt-1">{inputErrors.weeklyKm}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                      Flights per Month (Short-haul)
                    </label>
                    <input 
                      type="number"
                      min="0"
                      step="1"
                      value={formData.shortFlights}
                      onChange={(e) => updateFormData('shortFlights', Number(e.target.value))}
                      placeholder="0"
                      className={`w-full p-2 sm:p-3 border-2 rounded-lg focus:outline-none text-base sm:text-lg transition-colors ${
                        inputErrors.shortFlights 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-300 focus:border-orange-400'
                      }`}
                    />
                    {inputErrors.shortFlights && (
                      <p className="text-red-500 text-xs mt-1">{inputErrors.shortFlights}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                      Flights per Month (Long-haul)
                    </label>
                    <input 
                      type="number"
                      min="0"
                      step="1"
                      value={formData.longFlights}
                      onChange={(e) => updateFormData('longFlights', Number(e.target.value))}
                      placeholder="0"
                      className={`w-full p-2 sm:p-3 border-2 rounded-lg focus:outline-none text-base sm:text-lg transition-colors ${
                        inputErrors.longFlights 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-300 focus:border-orange-400'
                      }`}
                    />
                    {inputErrors.longFlights && (
                      <p className="text-red-500 text-xs mt-1">{inputErrors.longFlights}</p>
                    )}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                      Public Transport (hours/week)
                    </label>
                    <input 
                      type="number"
                      min="0"
                      step="0.5"
                      value={formData.publicTransportHours}
                      onChange={(e) => updateFormData('publicTransportHours', Number(e.target.value))}
                      placeholder="0"
                      className={`w-full p-2 sm:p-3 border-2 rounded-lg focus:outline-none text-base sm:text-lg transition-colors ${
                        inputErrors.publicTransportHours 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-300 focus:border-orange-400'
                      }`}
                    />
                    {inputErrors.publicTransportHours && (
                      <p className="text-red-500 text-xs mt-1">{inputErrors.publicTransportHours}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Energy Section */}
              <div className="mb-6 sm:mb-8 pt-6 sm:pt-8 border-t border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--calc-text)' }}>
                  Home Energy
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="flex items-center text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                      Electricity Usage (kWh/month)
                      <button 
                        className="ml-2 w-4 h-4 rounded-full bg-blue-100 text-blue-600 text-xs flex items-center justify-center"
                        onMouseEnter={() => setShowTooltip('electricity')}
                        onMouseLeave={() => setShowTooltip(null)}
                      >
                        ?
                      </button>
                    </label>
                    {showTooltip === 'electricity' && (
                      <div className="absolute z-20 bg-gray-900 text-white p-3 rounded-lg text-sm max-w-xs shadow-xl mb-2">
                        Average household: 300-400 kWh/month. Check your electricity bill.
                      </div>
                    )}
                    <input 
                      type="number"
                      min="0"
                      step="10"
                      value={formData.electricityUsage}
                      onChange={(e) => updateFormData('electricityUsage', Number(e.target.value))}
                      placeholder="300"
                      className={`w-full p-2 sm:p-3 border-2 rounded-lg focus:outline-none text-base sm:text-lg transition-colors ${
                        inputErrors.electricityUsage 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-300 focus:border-orange-400'
                      }`}
                    />
                    {inputErrors.electricityUsage && (
                      <p className="text-red-500 text-xs mt-1">{inputErrors.electricityUsage}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                      Gas Usage (liters/month)
                    </label>
                    <input 
                      type="number"
                      min="0"
                      step="5"
                      value={formData.gasUsage}
                      onChange={(e) => updateFormData('gasUsage', Number(e.target.value))}
                      placeholder="0 (Optional)"
                      className={`w-full p-2 sm:p-3 border-2 rounded-lg focus:outline-none text-base sm:text-lg transition-colors ${
                        inputErrors.gasUsage 
                          ? 'border-red-400 focus:border-red-500' 
                          : 'border-gray-300 focus:border-orange-400'
                      }`}
                    />
                    {inputErrors.gasUsage && (
                      <p className="text-red-500 text-xs mt-1">{inputErrors.gasUsage}</p>
                    )}
                  </div>
                  
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                      Primary Heating Method
                    </label>
                    <div className="grid grid-cols-3 gap-2 sm:gap-3">
                      {(['electric', 'gas', 'solar'] as const).map((heating) => (
                        <button
                          key={heating}
                          onClick={() => updateFormData('heatingMethod', heating)}
                          className={`p-2 sm:p-3 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all ${
                            formData.heatingMethod === heating
                              ? 'text-white shadow-md'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ 
                            backgroundColor: formData.heatingMethod === heating ? 'var(--calc-primary)' : 'transparent',
                            borderColor: formData.heatingMethod === heating ? 'var(--calc-primary)' : undefined,
                            color: formData.heatingMethod === heating ? 'white' : 'var(--calc-text)'
                          }}
                        >
                          {heating.charAt(0).toUpperCase() + heating.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Lifestyle Section */}
              <div className="mb-6 sm:mb-8 pt-6 sm:pt-8 border-t border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--calc-text)' }}>
                  Lifestyle & Diet
                </h2>
                
                <div className="space-y-4 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                      Diet Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                      {(['meat-heavy', 'mixed', 'vegetarian', 'vegan'] as const).map((diet) => (
                        <button
                          key={diet}
                          onClick={() => updateFormData('dietType', diet)}
                          className={`p-2 sm:p-3 rounded-lg border-2 text-xs sm:text-sm font-medium transition-all ${
                            formData.dietType === diet
                              ? 'text-white shadow-md'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                          style={{ 
                            backgroundColor: formData.dietType === diet ? 'var(--calc-accent)' : 'transparent',
                            borderColor: formData.dietType === diet ? 'var(--calc-accent)' : undefined,
                            color: formData.dietType === diet ? 'white' : 'var(--calc-text)'
                          }}
                        >
                          {diet.charAt(0).toUpperCase() + diet.slice(1).replace('-', ' ')}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div>
                      <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                        Shopping Frequency: {formData.shoppingFrequency}/5
                      </label>
                      <input 
                        type="range"
                        min="1"
                        max="5"
                        value={formData.shoppingFrequency}
                        onChange={(e) => updateFormData('shoppingFrequency', Number(e.target.value))}
                        className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                        style={{ 
                          background: `linear-gradient(to right, var(--calc-primary) 0%, var(--calc-primary) ${(formData.shoppingFrequency-1)*25}%, #e5e7eb ${(formData.shoppingFrequency-1)*25}%, #e5e7eb 100%)`
                        }}
                      />
                      <div className="flex justify-between text-xs text-gray-500 mt-1">
                        <span>Minimal</span>
                        <span>Frequent</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                        Tech Usage
                      </label>
                      <div className="grid grid-cols-3 gap-1 sm:gap-2">
                        {(['low', 'average', 'heavy'] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => updateFormData('techUsage', level)}
                            className={`p-1 sm:p-2 rounded-lg border-2 text-xs font-medium transition-all ${
                              formData.techUsage === level
                                ? 'text-white shadow-md'
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            style={{ 
                              backgroundColor: formData.techUsage === level ? 'var(--calc-accent)' : 'transparent',
                              borderColor: formData.techUsage === level ? 'var(--calc-accent)' : undefined,
                              color: formData.techUsage === level ? 'white' : 'var(--calc-text)'
                            }}
                          >
                            {level.charAt(0).toUpperCase() + level.slice(1)}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Waste Section */}
              <div className="pt-6 sm:pt-8 border-t border-gray-200">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--calc-text)' }}>
                  Waste Management
                </h2>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-sm sm:text-base" style={{ color: 'var(--calc-text)' }}>Do you recycle regularly?</span>
                    <button
                      onClick={() => updateFormData('recycles', !formData.recycles)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.recycles ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.recycles ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 sm:p-4 bg-gray-50 rounded-lg">
                    <span className="font-semibold text-sm sm:text-base" style={{ color: 'var(--calc-text)' }}>Do you compost organic waste?</span>
                    <button
                      onClick={() => updateFormData('composts', !formData.composts)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.composts ? 'bg-green-500' : 'bg-gray-300'
                      }`}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.composts ? 'translate-x-6' : 'translate-x-1'
                      }`} />
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold mb-3" style={{ color: 'var(--calc-text)' }}>
                      Food Waste Level: {formData.foodWaste}/5
                    </label>
                    <input 
                      type="range"
                      min="1"
                      max="5"
                      value={formData.foodWaste}
                      onChange={(e) => updateFormData('foodWaste', Number(e.target.value))}
                      className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                      style={{ 
                        background: `linear-gradient(to right, #22C55E 0%, #22C55E ${(5-formData.foodWaste)*25}%, var(--calc-accent) ${(5-formData.foodWaste)*25}%, var(--calc-accent) 100%)`
                      }}
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Low Waste</span>
                      <span>High Waste</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
            <div className="lg:sticky lg:top-4 xl:top-6 space-y-4 sm:space-y-6">
              {/* Results Summary */}
              <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--calc-text)' }}>
                  Your Impact
                </h2>
              
              {hasAnyData(formData) ? (
                <>
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="text-3xl sm:text-4xl font-bold mb-2" style={{ color: 'var(--calc-text)' }}>
                      {Math.round(results.total)} kg CO₂e
                    </div>
                    <div className="text-gray-600 mb-3 sm:mb-4">Monthly Footprint</div>
                    <TreesEquivalent total={results.total} />
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                    {[
                      { key: 'travel', label: 'Transportation', color: 'var(--calc-accent)' },
                      { key: 'energy', label: 'Energy', color: 'var(--calc-primary)' },
                      { key: 'diet', label: 'Lifestyle', color: '#22C55E' },
                      { key: 'waste', label: 'Waste', color: '#6B7280' }
                    ].map(({ key, label, color }) => (
                      <div key={key} className="space-y-1 sm:space-y-2">
                        <div className="flex justify-between">
                          <span className="text-xs sm:text-sm font-semibold" style={{ color: 'var(--calc-text)' }}>
                            {label}
                          </span>
                          <span className="text-xs sm:text-sm font-bold" style={{ color: 'var(--calc-text)' }}>
                            {Math.round(results.breakdown[key as keyof typeof results.breakdown])} kg
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-1.5 sm:h-2">
                          <div 
                            className="h-1.5 sm:h-2 rounded-full transition-all duration-500"
                            style={{ 
                              backgroundColor: color,
                              width: `${Math.min(100, Math.abs(results.breakdown[key as keyof typeof results.breakdown]) / results.total * 100)}%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Comparison */}
                  <div className="p-3 sm:p-4 rounded-lg" style={{ backgroundColor: 'var(--calc-secondary)' }}>
                    <p className={`font-semibold text-xs sm:text-sm mb-2 ${comparison.color}`}>
                      {comparison.text}
                    </p>
                    <div className="text-xs text-gray-600 space-y-1">
                      <p>Global average: 400 kg/month</p>
                      <p>Sustainable target: 208 kg/month</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="text-center py-6 sm:py-8">
                  <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🌍</div>
                  <h3 className="text-base sm:text-lg font-bold mb-2" style={{ color: 'var(--calc-text)' }}>
                    Ready to Calculate
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Fill out the form to see your carbon footprint
                  </p>
                </div>
              )}
              </div>

              {/* Recommendations */}
              {hasAnyData(formData) && results.recommendations.length > 0 && (
                <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6">
                  <h2 className="text-xl sm:text-2xl font-bold mb-4" style={{ color: 'var(--calc-text)' }}>
                    Recommendations
                  </h2>
                  
                  <div className="space-y-3">
                    {results.recommendations.map((rec, index) => (
                      <div key={index} className="p-3 rounded-lg border-l-4" 
                           style={{ backgroundColor: 'var(--calc-secondary)', borderColor: 'var(--calc-primary)' }}>
                        <p className="text-sm font-medium" style={{ color: 'var(--calc-text)' }}>{rec}</p>
                      </div>
                    ))}
                  </div>
                  
                  <button 
                    className="w-full mt-4 p-3 rounded-lg font-semibold text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: 'var(--calc-primary)' }}
                  >
                    Learn About Carbon Offsets
                  </button>
                </div>
              )}

              {/* Reset Button */}
              <button
                onClick={resetForm}
                className="reset-button w-full p-3 rounded-lg border-2 font-semibold transition-all duration-300 hover:border-gray-400 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]"
                style={{ 
                  color: 'var(--calc-text)',
                  borderColor: 'var(--calc-primary)',
                  background: 'linear-gradient(135deg, transparent 0%, rgba(75, 93, 82, 0.05) 100%)'
                }}
              >
                Reset Calculator
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* How It's Calculated Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="bg-white rounded-lg shadow-lg p-6 sm:p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4" style={{ color: 'var(--calc-text)' }}>
              How Your Carbon Footprint is Calculated
            </h2>
            <p className="text-gray-600 max-w-4xl mx-auto">
              Your monthly carbon footprint (CO₂e) is calculated by adding emissions from different lifestyle activities. 
              Click each section below to see the formulas:
            </p>
          </div>

          <div className="space-y-3">
            {/* Travel Emissions Accordion */}
            <div className="border border-gray-200 rounded">
              <button
                onClick={() => toggleAccordion('travel')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🚗</span>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--calc-text)' }}>
                    Travel Emissions
                  </h3>
                </div>
                <span className="text-gray-400">
                  {openAccordion === 'travel' ? '−' : '+'}
                </span>
              </button>
              {openAccordion === 'travel' && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-medium mb-2">Car Travel:</h4>
                      <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                        Weekly km × 4.33 × emission factor
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Factors: Petrol (0.21), Diesel (0.25), Electric (0.07) kg CO₂/km
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Flights:</h4>
                      <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                        Short flights × 250 + Long flights × 600
                      </div>
                      <p className="text-xs text-gray-600 mt-1">kg CO₂ per flight</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Public Transport:</h4>
                      <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                        Hours per week × 4.33 × 2
                      </div>
                      <p className="text-xs text-gray-600 mt-1">kg CO₂ per monthly usage</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Energy Emissions Accordion */}
            <div className="border border-gray-200 rounded">
              <button
                onClick={() => toggleAccordion('energy')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">⚡</span>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--calc-text)' }}>
                    Energy Emissions
                  </h3>
                </div>
                <span className="text-gray-400">
                  {openAccordion === 'energy' ? '−' : '+'}
                </span>
              </button>
              {openAccordion === 'energy' && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-medium mb-2">Electricity:</h4>
                      <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                        kWh per month × 0.45
                      </div>
                      <p className="text-xs text-gray-600 mt-1">kg CO₂ per kWh</p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Gas:</h4>
                      <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                        Liters per month × 2.0
                      </div>
                      <p className="text-xs text-gray-600 mt-1">kg CO₂ per liter</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Diet & Lifestyle Accordion */}
            <div className="border border-gray-200 rounded">
              <button
                onClick={() => toggleAccordion('diet')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">�️</span>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--calc-text)' }}>
                    Diet & Lifestyle
                  </h3>
                </div>
                <span className="text-gray-400">
                  {openAccordion === 'diet' ? '−' : '+'}
                </span>
              </button>
              {openAccordion === 'diet' && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-medium mb-2">Diet:</h4>
                      <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                        Base diet emission
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Meat-heavy: 300, Mixed: 200, Vegetarian: 160, Vegan: 130 kg/month
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Shopping & Tech:</h4>
                      <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                        Shopping level × 20 + Tech usage
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Tech: Low (10), Average (25), Heavy (50) kg/month
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Waste Accordion */}
            <div className="border border-gray-200 rounded">
              <button
                onClick={() => toggleAccordion('waste')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">♻️</span>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--calc-text)' }}>
                    Waste Management
                  </h3>
                </div>
                <span className="text-gray-400">
                  {openAccordion === 'waste' ? '−' : '+'}
                </span>
              </button>
              {openAccordion === 'waste' && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-medium mb-2">Formula:</h4>
                      <div className="bg-gray-50 p-3 rounded font-mono text-sm">
                        Food waste level × 10 + Recycling + Composting
                      </div>
                      <p className="text-xs text-gray-600 mt-1">
                        Recycling: -30 kg, Composting: -15 kg (negative = reduces emissions)
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Final Calculation */}
            <div className="border border-gray-200 rounded">
              <button
                onClick={() => toggleAccordion('calculation')}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50"
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">🧮</span>
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--calc-text)' }}>
                    Total Calculation
                  </h3>
                </div>
                <span className="text-gray-400">
                  {openAccordion === 'calculation' ? '−' : '+'}
                </span>
              </button>
              {openAccordion === 'calculation' && (
                <div className="px-4 pb-4 border-t border-gray-100">
                  <div className="space-y-4 pt-4">
                    <div>
                      <h4 className="font-medium mb-2">Monthly Total:</h4>
                      <div className="bg-blue-50 p-3 rounded font-mono text-sm">
                        Travel + Energy + Diet + Waste = Total kg CO₂e
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Annual Total:</h4>
                      <div className="bg-blue-50 p-3 rounded font-mono text-sm">
                        Monthly total × 12 = Annual kg CO₂e
                      </div>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                      <p className="text-sm">
                        <strong>Tip:</strong> Small changes like reducing meat intake or using public transport can significantly lower your footprint.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintCalculator;
