import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Bell,
  Settings,
  ChefHat,
  Check,
  Timer,
  ChevronRight,
  AlertTriangle,
  FileText,
  Users,
  Utensils,
  X,
} from "lucide-react";

// Mock Data
const mockOrders = {
  newOrders: [
    {
      id: 1,
      orderNumber: "ORD-001",
      table: "Table 12",
      timestamp: "2025-09-18T14:45:00.000Z",
      items: [
        { name: "Grilled Salmon", quantity: 2 },
        { name: "Caesar Salad", quantity: 1 },
      ],
      priority: "high",
      specialInstructions: "No onions in salad",
      hasRecipe: false,
    },
    {
      id: 2,
      orderNumber: "ORD-002",
      table: "Takeaway",
      timestamp: "2025-09-18T14:42:00.000Z",
      items: [
        { name: "Margherita Pizza", quantity: 1 },
        { name: "Garlic Bread", quantity: 2 },
      ],
      priority: "medium",
      specialInstructions: "Extra crispy pizza",
      hasRecipe: false,
    },
    {
      id: 3,
      orderNumber: "ORD-003",
      table: "Table 15",
      timestamp: "2025-09-18T14:40:00.000Z",
      items: [
        { name: "Beef Steak", quantity: 1 },
        { name: "Mashed Potatoes", quantity: 1 },
      ],
      priority: "low",
      specialInstructions: "Medium rare",
      hasRecipe: false,
    },
  ],
  inPreparation: [
    {
      id: 4,
      orderNumber: "ORD-004",
      table: "Table 8",
      timestamp: "2025-09-18T14:35:00.000Z",
      items: [{ name: "Spaghetti Carbonara", quantity: 2 }],
      priority: "medium",
      specialInstructions: "Extra parmesan",
      hasRecipe: true,
      recipe: {
        name: "Spaghetti Carbonara",
        servings: 2,
        prepTime: "10 mins",
        cookTime: "20 mins",
        ingredients: [
          "400g spaghetti",
          "200g pancetta",
          "4 large eggs",
          "100g parmesan cheese",
          "2 cloves garlic",
          "Black pepper to taste",
        ],
        steps: [
          {
            step: 1,
            description:
              "Boil water and cook spaghetti according to package instructions",
            time: "10-12 mins",
          },
          {
            step: 2,
            description: "Meanwhile, cook pancetta until crispy",
            time: "5-7 mins",
          },
          {
            step: 3,
            description: "Whisk eggs, cheese, and pepper in a bowl",
            time: "2 mins",
          },
          {
            step: 4,
            description: "Combine pasta with egg mixture and pancetta",
            time: "3 mins",
          },
        ],
      },
    },
    {
      id: 5,
      orderNumber: "ORD-005",
      table: "Table 20",
      timestamp: "2025-09-18T14:32:00.000Z",
      items: [{ name: "Risotto", quantity: 1 }],
      priority: "high",
      specialInstructions: "No mushrooms",
      hasRecipe: true,
      recipe: {
        name: "Mushroom Risotto",
        servings: 1,
        prepTime: "15 mins",
        cookTime: "25 mins",
        ingredients: [
          "300g arborio rice",
          "1L vegetable stock",
          "200g mushrooms",
          "1 onion",
          "2 cloves garlic",
          "50g parmesan cheese",
          "White wine",
          "Butter",
        ],
        steps: [
          {
            step: 1,
            description: "Sauté onions and garlic until translucent",
            time: "5 mins",
          },
          {
            step: 2,
            description: "Add rice and toast lightly",
            time: "2 mins",
          },
          {
            step: 3,
            description: "Add wine and let it absorb",
            time: "3 mins",
          },
          {
            step: 4,
            description: "Gradually add stock while stirring",
            time: "18-20 mins",
          },
          {
            step: 5,
            description: "Finish with butter and parmesan",
            time: "2 mins",
          },
        ],
      },
    },
  ],
  qualityCheck: [
    {
      id: 6,
      orderNumber: "ORD-006",
      table: "Table 3",
      timestamp: "2025-09-18T14:28:00.000Z",
      items: [
        { name: "Fish and Chips", quantity: 2 },
        { name: "Tartar Sauce", quantity: 2 },
      ],
      priority: "medium",
      specialInstructions: "Extra crispy",
      hasRecipe: false,
    },
  ],
  readyToServe: [
    {
      id: 7,
      orderNumber: "ORD-007",
      table: "Table 5",
      timestamp: "2025-09-18T14:25:00.000Z",
      items: [
        { name: "Chicken Caesar Salad", quantity: 1 },
        { name: "Iced Tea", quantity: 1 },
      ],
      priority: "low",
      specialInstructions: "Dressing on the side",
      hasRecipe: false,
    },
  ],
};

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: { scale: 1.02 },
};

const badgeVariants = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
};

export default function KitchenDisplaySystem() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRecipeOpen, setIsRecipeOpen] = useState(false);

  const handleOrderSelect = (order) => {
    setSelectedOrder(order);
    setIsRecipeOpen(true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const stats = {
    totalActive: Object.values(mockOrders).flat().length,
    avgPrepTime: "24 mins",
    completedToday: 15,
    delayed: 2,
  };

  return (
    <div className="min-h-screen bg-slate-100 font-[Inter]">
      {/* header nav */}
      <header className="bg-white shadow-sm">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ChefHat className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-[Poppins] font-bold text-gray-900">
              Roydish KDS
            </h1>
          </div>

          <div className="flex items-center space-x-8">
            <div className="text-lg font-semibold text-gray-700">
              {currentTime.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* quick status bar */}
        <div className="border-t border-gray-200 px-6 py-3 bg-white flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <Timer className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">Active Orders</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-sm font-medium text-gray-900">
              {stats.totalActive}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">Avg. Time</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-sm font-medium text-gray-900">
              {stats.avgPrepTime}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <Check className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">Completed</span>
            <span className="px-2 py-0.5 bg-gray-100 rounded-full text-sm font-medium text-gray-900">
              {stats.completedToday}
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600">Delayed</span>
            <span
              className={`px-2 py-0.5 rounded-full text-sm font-medium ${
                stats.delayed > 0
                  ? "bg-red-50 text-red-600"
                  : "bg-gray-100 text-gray-900"
              }`}
            >
              {stats.delayed}
            </span>
          </div>
        </div>
      </header>

      {/* main */}
      <div className="flex h-screen p-6 space-x-6 overflow-hidden [&_::-webkit-scrollbar]:w-2 [&_::-webkit-scrollbar]:h-2 [&_::-webkit-scrollbar-thumb]:rounded-full [&_::-webkit-scrollbar-thumb]:bg-gray-300/50 [&_::-webkit-scrollbar-track]:transparent">
        {/* Kanban Board */}

        <div className="flex-1 flex space-x-6 overflow-x-auto pb-4 px-1">
          {/* New Orders */}
          <motion.div
            className="flex-1 min-w-[320px] bg-gradient-to-b from-red-200/60 to-red-100/30 rounded-lg flex flex-col border border-red-100/30"
            variants={columnVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0,
            }}
          >
            {" "}
            <div className="p-4 border-b border-red-100/30">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-gray-800">
                  New Orders
                </h2>
                <motion.span
                  className="px-2.5 py-0.5 bg-white shadow-sm rounded-full text-sm font-medium text-gray-900"
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  key={mockOrders.newOrders.length}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {" "}
                  {mockOrders.newOrders.length}
                </motion.span>
              </div>
            </div>
            <motion.div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence>
                {mockOrders.newOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                  >
                    <OrderCard
                      order={order}
                      onClick={() => handleOrderSelect(order)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* In Preparation Column */}
          <motion.div
            className="flex-1 min-w-[320px] bg-gradient-to-b from-orange-200/60 to-orange-50/30 rounded-lg flex flex-col border border-orange-100/30 hover:border-orange-500/50 transition-colors"
            variants={columnVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.3,
            }}
          >
            <div className="p-4 border-b border-orange-100/30">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-gray-800">
                  In Preparation
                </h2>
                <motion.span
                  className="px-2.5 py-0.5 bg-white shadow-sm rounded-full text-sm font-medium text-gray-900"
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  key={mockOrders.inPreparation.length}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {mockOrders.inPreparation.length}
                </motion.span>
              </div>
            </div>
            <motion.div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence>
                {mockOrders.inPreparation.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                  >
                    <OrderCard
                      order={order}
                      onClick={() => handleOrderSelect(order)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Quality Check Column */}
          <motion.div
            className="flex-1 min-w-[320px] bg-gradient-to-b from-yellow-200/60 to-yellow-50/30 rounded-lg flex flex-col border border-yellow-100/30 hover:border-yellow-500/50 transition-colors"
            variants={columnVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.6,
            }}
          >
            <div className="p-4 border-b border-yellow-100/30">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-gray-800">
                  Quality Check
                </h2>
                <motion.span
                  className="px-2.5 py-0.5 bg-white shadow-sm rounded-full text-sm font-medium text-gray-900"
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  key={mockOrders.qualityCheck.length}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {mockOrders.qualityCheck.length}
                </motion.span>
              </div>
            </div>
            <motion.div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence>
                {mockOrders.qualityCheck.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                  >
                    <OrderCard
                      order={order}
                      onClick={() => handleOrderSelect(order)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Ready to Serve Column */}
          <motion.div
            className="flex-1 min-w-[320px] bg-gradient-to-b from-green-200/60 to-green-50/30 rounded-lg flex flex-col border border-green-100/30 hover:border-green-500/50 transition-colors"
            variants={columnVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              delay: 0.9,
            }}
          >
            <div className="p-4 border-b border-green-100/30">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg text-gray-800">
                  Ready to Serve
                </h2>
                <motion.span
                  className="px-2.5 py-0.5 bg-white shadow-sm rounded-full text-sm font-medium text-gray-900"
                  variants={badgeVariants}
                  initial="hidden"
                  animate="visible"
                  key={mockOrders.readyToServe.length}
                  transition={{ type: "spring", stiffness: 500, damping: 25 }}
                >
                  {mockOrders.readyToServe.length}
                </motion.span>
              </div>
            </div>
            <motion.div
              className="flex-1 overflow-y-auto p-4 space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AnimatePresence>
                {mockOrders.readyToServe.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ type: "spring", damping: 25 }}
                  >
                    <OrderCard
                      order={order}
                      onClick={() => handleOrderSelect(order)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>

        {/* Recipe Sidebar */}
        <motion.div
          className="fixed right-0 top-0 h-full w-[480px] bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.08)] z-50 border-l border-gray-100"
          initial={{ x: "100%" }}
          animate={{
            x: isRecipeOpen ? 0 : "100%",
            transition: { type: "spring", damping: 30, stiffness: 300 },
          }}
        >
          <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full">
            <motion.button
              onClick={() => setIsRecipeOpen(!isRecipeOpen)}
              className="bg-white py-2 px-4 rounded-l-full flex flex-col items-center shadow-lg border border-r-0 border-gray-200 cursor-pointer hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isRecipeOpen ? 180 : 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </motion.div>
              Recipe
            </motion.button>
          </div>
          <motion.div
            className="h-full flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="p-6 border-b border-gray-100 flex justify-between items-center bg-white/70"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.h2
                className="font-semibold text-xl text-gray-800 flex items-center gap-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <FileText className="w-5 h-5 text-gray-900" />
                Recipe Details
              </motion.h2>
              <motion.button
                onClick={() => setIsRecipeOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-5 h-5 text-gray-600 hover:text-gray-900" />
              </motion.button>
            </motion.div>
            <motion.div
              className="flex-1 overflow-y-auto p-6 custom-scrollbar"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatePresence mode="wait">
                {selectedOrder ? (
                  selectedOrder.hasRecipe ? (
                    <motion.div
                      className="space-y-6"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative">
                        <motion.div
                          className="mb-8"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          <motion.h3
                            className="text-2xl font-semibold text-gray-900 mb-4"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 }}
                          >
                            {selectedOrder.recipe.name}
                          </motion.h3>
                          <div className="grid grid-cols-3 gap-4">
                            {/* Stats Cards */}
                            {[
                              {
                                icon: (
                                  <Users className="w-5 h-5 mx-auto mb-2 text-gray-900" />
                                ),
                                label: "Serves",
                                value: selectedOrder.recipe.servings,
                                valueClass: "text-2xl",
                              },
                              {
                                icon: (
                                  <Clock className="w-5 h-5 mx-auto mb-2 text-gray-900" />
                                ),
                                label: "Prep Time",
                                value: selectedOrder.recipe.prepTime,
                                valueClass: "text-lg",
                              },
                              {
                                icon: (
                                  <Timer className="w-5 h-5 mx-auto mb-2 text-gray-900" />
                                ),
                                label: "Cook Time",
                                value: selectedOrder.recipe.cookTime,
                                valueClass: "text-lg",
                              },
                            ].map((stat, index) => (
                              <motion.div
                                key={index}
                                className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{
                                  delay: 0.4 + index * 0.1,
                                  type: "spring",
                                }}
                                whileHover={{
                                  scale: 1.05,
                                  transition: { duration: 0.2 },
                                }}
                              >
                                {stat.icon}
                                <span className="text-sm block text-gray-900 font-medium">
                                  {stat.label}
                                </span>
                                <motion.span
                                  className={`font-semibold text-gray-900 mt-1 ${stat.valueClass}`}
                                  key={stat.value}
                                  initial={{ scale: 0.5 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 500,
                                  }}
                                >
                                  {stat.value}
                                </motion.span>
                              </motion.div>
                            ))}
                          </div>
                        </motion.div>

                        {/* Ingredients Section */}
                        <motion.div
                          className="mb-8"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <motion.div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <motion.h4
                              className="font-medium text-gray-900 mb-5 flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.8 }}
                            >
                              <motion.span
                                className="bg-gray-100 w-8 h-8 rounded-lg flex items-center justify-center mr-2"
                                whileHover={{ rotate: 10 }}
                              >
                                <Utensils className="w-4 h-4 text-gray-900" />
                              </motion.span>
                              Ingredients
                            </motion.h4>
                            <motion.ul className="space-y-3">
                              {selectedOrder.recipe.ingredients.map(
                                (ingredient, index) => (
                                  <motion.li
                                    key={index}
                                    className="flex items-center space-x-3 text-gray-600 group pl-2"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.9 + index * 0.05 }}
                                    whileHover={{ x: 5 }}
                                  >
                                    <motion.div
                                      className="w-2 h-2 rounded-full bg-gray-900 opacity-75"
                                      whileHover={{ scale: 1.5, opacity: 1 }}
                                    />
                                    <span className="text-sm font-medium">
                                      {ingredient}
                                    </span>
                                  </motion.li>
                                )
                              )}
                            </motion.ul>
                          </motion.div>
                        </motion.div>

                        {/* Preparation Steps Section */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1 }}
                        >
                          <motion.div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                            <motion.h4
                              className="font-medium text-gray-900 mb-5 flex items-center"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 1.1 }}
                            >
                              <motion.span
                                className="bg-gray-100 w-8 h-8 rounded-lg flex items-center justify-center mr-2"
                                whileHover={{ rotate: -10 }}
                              >
                                <ChefHat className="w-4 h-4 text-gray-900" />
                              </motion.span>
                              Preparation Steps
                            </motion.h4>
                            <motion.div className="space-y-6">
                              {selectedOrder.recipe.steps.map((step, index) => (
                                <motion.div
                                  key={index}
                                  className="relative pl-12 group"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 1.2 + index * 0.1 }}
                                  whileHover={{ x: 5 }}
                                >
                                  <motion.div
                                    className="absolute left-0 top-0 w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-200"
                                    whileHover={{
                                      scale: 1.1,
                                      backgroundColor: "#f3f4f6",
                                    }}
                                  >
                                    <span className="text-sm font-semibold text-gray-900">
                                      {step.step}
                                    </span>
                                  </motion.div>
                                  <div className="space-y-2">
                                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                                      {step.description}
                                    </p>
                                    <motion.div
                                      className="inline-flex items-center px-3 py-1 rounded-lg bg-gray-50 text-gray-600"
                                      whileHover={{ scale: 1.05 }}
                                    >
                                      <Clock className="w-4 h-4 mr-1.5 text-gray-500" />
                                      <span className="text-sm font-medium">
                                        {step.time}
                                      </span>
                                    </motion.div>
                                  </div>
                                </motion.div>
                              ))}
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      className="flex flex-col items-center justify-center h-full text-gray-500 p-8"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className="bg-gray-50 w-24 h-24 rounded-2xl flex items-center justify-center mb-6"
                        animate={{
                          scale: [1, 1.05, 1],
                          rotate: [0, 5, 0],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      >
                        <ChefHat className="w-12 h-12 text-gray-400" />
                      </motion.div>
                      <motion.p
                        className="text-xl font-semibold text-gray-800 mb-2"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        Recipe Coming Soon
                      </motion.p>
                      <motion.p
                        className="text-sm text-center max-w-xs text-gray-500"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        Our chefs are working on documenting this recipe. Check
                        back soon!
                      </motion.p>
                    </motion.div>
                  )
                ) : (
                  <motion.div
                    className="flex flex-col items-center justify-center h-full text-gray-500 p-8"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="bg-gray-50 w-24 h-24 rounded-2xl flex items-center justify-center mb-6"
                      whileHover={{ scale: 1.1, rotate: -5 }}
                    >
                      <FileText className="w-12 h-12 text-gray-400" />
                    </motion.div>
                    <motion.p
                      className="text-xl font-semibold text-gray-800 mb-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      No Recipe Selected
                    </motion.p>
                    <motion.p
                      className="text-sm text-center max-w-xs text-gray-500"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Select an order from the board to view its recipe and
                      preparation details
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

const OrderCard = ({ order, onClick }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-50 text-red-700 border-red-200";
      case "medium":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "low":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getTimeDiff = (timestamp) => {
    const mockCurrentTime = new Date("2025-09-18T14:45:00.000Z");
    const diff = mockCurrentTime - new Date(timestamp);
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m`;
    return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
  };

  return (
    <div
      onClick={() => onClick(order)}
      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-200 hover:scale-[1.02]"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className="text-lg font-semibold text-gray-900">
            {order.orderNumber}
          </span>
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
              order.priority
            )} border`}
          >
            {order.priority.charAt(0).toUpperCase() + order.priority.slice(1)}
          </span>
        </div>
        <div className="flex items-center space-x-2 text-gray-500">
          <Clock className="w-4 h-4" />
          <span className="text-sm">{getTimeDiff(order.timestamp)}</span>
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center space-x-2 text-gray-700 mb-2">
          <Users className="w-4 h-4" />
          <span className="text-sm font-medium">{order.table}</span>
        </div>
        <div className="space-y-1">
          {order.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Utensils className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600">
                {item.quantity}x {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {order.specialInstructions && (
        <div className="mt-3 p-2 bg-gray-50 rounded-md">
          <div className="flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" />
            <p className="text-sm text-gray-600">{order.specialInstructions}</p>
          </div>
        </div>
      )}

      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {order.hasRecipe ? (
            <span className="flex items-center space-x-1 text-blue-600 text-sm">
              <FileText className="w-4 h-4" />
              <span>View Recipe</span>
            </span>
          ) : null}
        </div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};