import { useState } from 'react'
import {
  PlaneTakeoff,
  PlaneLanding,
  Calendar,
  Users,
  Sliders,
  Clock,
  Luggage,
  ChevronRight
} from 'lucide-react'
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { cn } from '../utils/cn'
import { Toaster, toast } from 'react-hot-toast'
import { GiAirplane } from 'react-icons/gi'
import BackToHome from './BackToHome'

export default function FlightSearch() {
  const [tripType, setTripType] = useState('round')
  const [selectedFlight, setSelectedFlight] = useState(null)
  
  const mockFlights = [
    {
      id: 1,
      airline: 'Delta Airlines',
      departure: '08:00',
      arrival: '11:30',
      duration: '3h 30m',
      stops: 0,
      price: 299,
      baggageIncluded: true
    },
    {
      id: 2,
      airline: 'United Airlines',
      departure: '10:15',
      arrival: '14:00',
      duration: '3h 45m',
      stops: 1,
      price: 275,
      baggageIncluded: false
    },
  ]

  const handleSearch = () => {
    toast.success('Searching for the best flights...', {
      icon: <PlaneTakeoff className="h-5 w-5 text-black" />
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 left-0 right-0 z-50 bg-white/70 shadow-lg backdrop-blur-sm w-[90%] mx-auto rounded-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <GiAirplane className="h-8 w-8 text-emerald-600" />
              <span className="ml-2 text-xl font-semibold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent">
                AirWays
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="px-8 outline-1 rounded-full outline-emerald-400 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">Sign In</button>
              <button className="px-6 py-2 text-sm font-medium bg-emerald-700 text-emerald-50 rounded-full border border-emerald-200 hover:bg-emerald-100 transition-colors">
                Register
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative min-h-[600px] flex items-baseline justify-center bg-gradient-to-b from-emerald-50 to-white ">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1536238349444-c05ffb6c9a8c')] bg-cover bg-center opacity-10" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Journey Begins Here
            </h1>
            <p className="text-lg text-gray-600">
              Discover seamless travel experiences with our curated flight selections
            </p>
          </div>

          <ToggleGroup.Root
            className="flex p-1.5 space-x-1 bg-white/80 backdrop-blur-sm rounded-full mb-8 shadow-sm border border-gray-100"
            type="single"
            value={tripType}
            onValueChange={(value) => value && setTripType(value)}
          >
            <ToggleGroup.Item
              value="oneway"
              className={cn(
                "flex-1 px-6 py-2.5 text-sm font-medium rounded-full transition-colors",
                tripType === "oneway" ? "bg-emerald-500 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              )}
            >
              One Way
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="round"
              className={cn(
                "flex-1 px-6 py-2.5 text-sm font-medium rounded-full transition-colors",
                tripType === "round" ? "bg-emerald-500 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Round Trip
            </ToggleGroup.Item>
            <ToggleGroup.Item
              value="multi"
              className={cn(
                "flex-1 px-6 py-2.5 text-sm font-medium rounded-full transition-colors",
                tripType === "multi" ? "bg-emerald-500 text-white shadow-sm" : "text-gray-600 hover:text-gray-900"
              )}
            >
              Multi-City
            </ToggleGroup.Item>
          </ToggleGroup.Root>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PlaneTakeoff className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Departure city or airport"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <PlaneLanding className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Arrival city or airport"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Departure</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
              </div>
              {tripType === 'round' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Return</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Passengers</label>
                <Select.Root>
                  <Select.Trigger className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="h-5 w-5 text-gray-400" />
                    </div>
                    <Select.Value placeholder="Number of travelers" />
                  </Select.Trigger>
                </Select.Root>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Class</label>
                <Select.Root>
                  <Select.Trigger className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Luggage className="h-5 w-5 text-gray-400" />
                    </div>
                    <Select.Value placeholder="Travel class" />
                  </Select.Trigger>
                </Select.Root>
              </div>
            </div>

            <button 
              onClick={handleSearch}
              className="w-full bg-emerald-500 text-white py-4 rounded-xl hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors flex items-center justify-center font-medium text-lg"
            >
              Find Flights
              <ChevronRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Available Flights</h2>
              <p className="text-gray-600 mt-1">12 flights found for your search</p>
            </div>
            <button className="flex items-center px-5 py-2.5 text-sm font-medium bg-white rounded-xl shadow-sm border border-gray-200 hover:border-emerald-500 transition-colors">
              <Sliders className="w-4 h-4 mr-2 text-gray-500" />
              Filters
            </button>
          </div>

          <div className="space-y-6">
            {mockFlights.map((flight) => (
              <div
                key={flight.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:border-emerald-500 hover:shadow-md transition-all"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                        <img 
                          src={`https://logo.clearbit.com/${flight.airline.toLowerCase().replace(' ', '')}.com`}
                          alt={flight.airline}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <div className="text-lg font-medium text-gray-900">{flight.airline}</div>
                        <div className="text-sm text-gray-500">Flight DA {100 + flight.id}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
                      <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                      {flight.duration}
                    </div>
                    {flight.baggageIncluded && (
                      <div className="flex items-center text-gray-500 bg-gray-50 px-3 py-1 rounded-lg">
                        <Luggage className="w-4 h-4 mr-2 text-emerald-500" />
                        Baggage included
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">${flight.price}</div>
                    <div className="text-sm text-gray-500 text-right">per person</div>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-gray-50 rounded-xl p-4">
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">{flight.departure}</div>
                    <div className="text-sm text-gray-500 mt-1">New York (JFK)</div>
                  </div>
                  <div className="flex-1 mx-8">
                    <div className="relative">
                      <div className="border-t-2 border-gray-200 absolute w-full top-3"></div>
                      <div className="absolute inset-y-0 flex items-center justify-center w-full">
                        <div className="px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200">
                          {flight.stops === 0 ? 'Direct Flight' : `${flight.stops} Stop`}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">{flight.arrival}</div>
                    <div className="text-sm text-gray-500 mt-1">London (LHR)</div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-4">
                  <button 
                    className="px-5 py-2.5 text-sm font-medium text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                    onClick={() => setSelectedFlight(flight)}
                  >
                    Flight Details
                  </button>
                  <button className="px-5 py-2.5 text-sm font-medium bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                    Select & Continue
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog.Root open={!!selectedFlight} onOpenChange={() => setSelectedFlight(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
            <Dialog.Title className="text-2xl font-semibold text-gray-900 mb-6">
              Flight Details & Fare Options
            </Dialog.Title>
            {selectedFlight && (
              <div className="space-y-8">
                <div className="bg-gray-50 rounded-xl p-6 grid grid-cols-3 gap-8">
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Airline</div>
                    <div className="text-lg font-medium text-gray-900">{selectedFlight.airline}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Duration</div>
                    <div className="text-lg font-medium text-gray-900">{selectedFlight.duration}</div>
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-500 mb-1">Base Price</div>
                    <div className="text-lg font-medium text-gray-900">${selectedFlight.price}</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Select Your Fare</h4>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 bg-white border-2 border-emerald-500 rounded-xl relative">
                      <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs px-2 py-1 rounded-full">
                        Popular
                      </div>
                      <div className="font-medium text-gray-900">Economy</div>
                      <div className="text-sm text-gray-500 mt-1">Basic fare</div>
                      <div className="mt-4 text-lg font-semibold text-emerald-600">${selectedFlight.price}</div>
                      <ul className="mt-3 space-y-2 text-sm text-gray-600">
                        <li>• Standard seat selection</li>
                        <li>• 1 cabin bag (7kg)</li>
                        <li>• Meal included</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-500 transition-colors">
                      <div className="font-medium text-gray-900">Economy Plus</div>
                      <div className="text-sm text-gray-500 mt-1">Extra comfort</div>
                      <div className="mt-4 text-lg font-semibold text-emerald-600">${selectedFlight.price + 50}</div>
                      <ul className="mt-3 space-y-2 text-sm text-gray-600">
                        <li>• Extra legroom seat</li>
                        <li>• 2 cabin bags (14kg)</li>
                        <li>• Priority boarding</li>
                      </ul>
                    </div>
                    <div className="p-4 bg-white border border-gray-200 rounded-xl hover:border-emerald-500 transition-colors">
                      <div className="font-medium text-gray-900">Business</div>
                      <div className="text-sm text-gray-500 mt-1">Premium experience</div>
                      <div className="mt-4 text-lg font-semibold text-emerald-600">${selectedFlight.price + 200}</div>
                      <ul className="mt-3 space-y-2 text-sm text-gray-600">
                        <li>• Business class seat</li>
                        <li>• Lounge access</li>
                        <li>• Full flexibility</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Baggage Information</h4>
                  <div className="bg-gray-50 rounded-xl divide-y divide-gray-200">
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <span className="font-medium text-gray-900">Cabin Baggage</span>
                        <p className="text-sm text-gray-500 mt-0.5">Carry on luggage</p>
                      </div>
                      <span className="font-medium text-gray-900">7 kg</span>
                    </div>
                    <div className="flex items-center justify-between p-4">
                      <div>
                        <span className="font-medium text-gray-900">Check-in Baggage</span>
                        <p className="text-sm text-gray-500 mt-0.5">Maximum weight per bag</p>
                      </div>
                      <span className="font-medium text-gray-900">23 kg</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <Dialog.Close asChild>
                    <button className="px-6 py-3 text-sm font-medium text-gray-600 hover:text-gray-900">
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button className="px-6 py-3 text-sm font-medium bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors">
                    Continue with Selection
                  </button>
                </div>
              </div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Toaster position="bottom-right" />
      <BackToHome challengeDay='68' challengeTitle='Flight Search'/>
    </div>
  )
}