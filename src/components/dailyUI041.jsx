import { motion } from "framer-motion";
import {
  Activity,
  Flame,
  Play,
  Clock,
  ChevronRight,
  Dumbbell,
  Search,
  Home,
  ArrowLeft,
  Bookmark,
  MoreVertical,
  Minus,
  Plus,
  SkipBack,
  SkipForward,
  HeartPulse,
  Eye,
  Check,
} from "lucide-react";
import { PiPersonSimpleTaiChiBold } from "react-icons/pi";
import BackToHome from "./BackToHome";

function HomeDashboard() {
  const weeklyWorkouts = [
    { day: "M", duration: 45, completed: true },
    { day: "T", duration: 30, completed: true },
    { day: "W", duration: 60, completed: true },
    { day: "T", duration: 75, completed: true },
    { day: "F", duration: 0, completed: false },
    { day: "S", duration: 0, completed: false },
    { day: "S", duration: 0, completed: false },
  ];
  const maxDuration = Math.max(...weeklyWorkouts.map((d) => d.duration));

  return (
    <div className=" flex flex-col gap-6 bg-gradient-to-b from-[#4A0404] to-[#0A0A0C] relative">
      <div className="relative bg-black flex flex-col gap-18 p-6 h-88">
        <div className="absolute top-0 left-0 z-1 h-100 w-full">
          <div className="relative">
            <svg
              viewBox="0 0 375 350"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="backgroundImage"
                  patternUnits="userSpaceOnUse"
                  width="100%"
                  height="100%"
                >
                  <image
                    href="https://images.unsplash.com/photo-1641337221253-fdc7237f6b61?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTAyfHx3b3Jrb3V0fGVufDB8fDB8fHww"
                    width="100%"
                    height="100%"
                    preserveAspectRatio="xMidYMid slice"
                  />
                </pattern>
              </defs>

              <path
                d="M375 334C375 342.837 367.837 350 359 350H239C230.163 350 223.32 342.475 219.413 334.549C213.706 322.968 201.784 315 188 315C174.216 315 162.294 322.968 156.587 334.549C152.68 342.475 145.837 350 137 350H16C7.16344 350 0 342.837 0 334V16C0 7.16343 7.16344 0 16 0H359C367.837 0 375 7.16344 375 16V334Z"
                fill="url(#backgroundImage)"
              />

              <path
                className="fill-black/60"
                d="M375 334C375 342.837 367.837 350 359 350H239C230.163 350 223.32 342.475 219.413 334.549C213.706 322.968 201.784 315 188 315C174.216 315 162.294 322.968 156.587 334.549C152.68 342.475 145.837 350 137 350H16C7.16344 350 0 342.837 0 334V16C0 7.16343 7.16344 0 16 0H359C367.837 0 375 7.16344 375 16V334Z"
              />
            </svg>
            <div className="absolute left-1/2 -bottom-8 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-red-700 to-orange-500 border-4 border-[#0A0A0C] flex items-center justify-center">
              <Play size={24} className="text-white" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center z-2">
          <div>
            <h1 className="text-2xl font-bold text-white">Hi, Pratham!</h1>
            <p className="text-gray-400">Let's crush today's goals</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-red-500/20 to-orange-500/20 p-0.5">
            <div className="h-full w-full rounded-full bg-[#171717] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1657800188036-ba8cdef25efa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bXVzY2xlfGVufDB8MnwwfHx8MA%3D%3D"
                className="rounded-full w-full h-full object-cover"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-b from-red-800/20 via-red-600/20 to-[#4A0404] rounded-3xl p-6 text-white relative overflow-hidden z-2">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Today's Progress</h2>
              <HeartPulse size={24} className="text-red-300" />
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-3xl font-bold">425</p>
                <p className="text-sm text-red-200">Calories Burned</p>
              </div>
              <div>
                <p className="text-3xl font-bold">32</p>
                <p className="text-sm text-red-200">Minutes Active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black px-12 py-2 mx-auto mt-2 rounded-2xl flex flex-col items-center w-fit">
        <h3 className="font-semibold text-white">Quick Start</h3>
        <p className="text-sm text-gray-400">Begin a new workout</p>
      </div>

      <div className="space-y-4 px-6 ">
        <h2 className="text-lg font-semibold text-white">Weekly Overview</h2>
        <div className="flex justify-between h-32 items-end">
          {weeklyWorkouts.map((day, i) => {
            const height = day.duration
              ? (day.duration / maxDuration) * 100
              : 0;

            return (
              <div
                key={i}
                className="flex flex-col items-center justify-end gap-2 group relative h-full"
              >
                <div
                  style={{ height: `${height}%` }}
                  className={`w-6 rounded-xl transition-all duration-300 ${
                    day.completed
                      ? "bg-gradient-to-t from-red-600 via-red-500 to-red-400/50"
                      : "bg-gradient-to-t from-gray-800 to-gray-700"
                  } hover:scale-105`}
                />
                <span className="text-sm text-gray-400">{day.day}</span>
                {day.duration > 0 && (
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gradient-to-r from-red-600 to-orange-500 px-3 py-1.5 rounded-lg text-white text-sm whitespace-nowrap shadow-lg relative">
                      {day.duration} mins
                      {/* Tooltip Arrow */}
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-orange-500 transform rotate-45" />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="space-y-4 px-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Upcoming Workout</h2>
          <button className="text-red-500 text-sm font-medium hover:text-red-400 transition-colors">
            View All
          </button>
        </div>

        <div className="bg-[#1A1A1F] rounded-2xl flex items-center justify-between border border-red-500/5 hover:border-red-500/20 transition-all duration-300 overflow-hidden">
          <div className="flex items-center gap-5 p-5">
            <Dumbbell size={28} className="text-red-500" strokeWidth={1.5} />
            <div>
              <h3 className="font-semibold text-white mb-1">
                Upper Body Strength
              </h3>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Clock size={14} strokeWidth={1.5} />
                <span>40 mins • Today 6:00 PM</span>
              </div>
            </div>
          </div>
          <button className="text-red-500 hover:text-white hover:bg-gradient-to-r from-red-600 to-orange-800 py-8 px-4 rounded-l-2xl text-sm border border-red-500/20 transition-all duration-300 ">
            Start
          </button>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-red-500/10">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1">
            <Home size={24} className="text-red-500" />
            <span className="text-xs text-red-500">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Dumbbell size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Workouts</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <PiPersonSimpleTaiChiBold size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Exercises</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Activity size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Tracking</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function WorkoutCategories() {
  const categories = [
    {
      id: 1,
      name: "Strength Training",
      description: "Build muscle and increase strength",
      workouts: 24,
      difficulty: "Intermediate",
      icon: "/w1.png",
    },
    {
      id: 2,
      name: "Cardio",
      description: "Improve endurance and burn fat",
      workouts: 18,
      difficulty: "Beginner",
      icon: "/w2.png",
    },
    {
      id: 3,
      name: "HIIT",
      description: "High intensity interval training",
      workouts: 12,
      difficulty: "Advanced",
      icon: "/w3.png",
    },
    {
      id: 4,
      name: "Core Workouts",
      description: "Strengthen your core muscles",
      workouts: 15,
      difficulty: "Intermediate",
      icon: "/w4.png",
    },
    {
      id: 5,
      name: "Yoga",
      description: "Flexibility and mindfulness",
      workouts: 20,
      difficulty: "All Levels",
      icon: "/w5.png",
    },
  ];

  return (
    <div className="p-6 flex flex-col gap-6 bg-gradient-to-b from-[#4A0404] to-[#0A0A0C] min-h-screen">
      <div className="mb-2">
        <h1 className="text-2xl font-medium text-white tracking-tight">
          Workout Categories
        </h1>
        <p className="text-gray-400 text-sm">Choose your workout type</p>
      </div>

      <div className="relative mb-2">
        <Search
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-700/50"
          size={18}
          strokeWidth={2}
        />
        <input
          type="text"
          placeholder="Search workouts..."
          className="w-full bg-[#0A0A0C]/50 pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:bg-[#1A1A1F] focus:ring-1 focus:ring-red-700/20 border border-red-950/20 text-sm transition-all"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-[#0A0A0C]/80 hover:bg-[#1A1A1F] rounded-xl border border-red-950/10 flex items-stretch group transition-all duration-300"
          >
            {/* Image Section */}
            <div className="w-24 relative rounded-l-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 to-transparent z-10" />
              <img
                src={category.icon}
                alt={category.name}
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>

            <div className="flex-1 p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white text-base">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-400 mt-0.5">
                    {category.description}
                  </p>
                </div>
                <ChevronRight
                  size={18}
                  className="text-red-700/70 group-hover:text-red-600 transition-colors"
                  strokeWidth={2.5}
                />
              </div>

              <div className="flex gap-2 mt-2.5">
                <span className="text-xs px-2.5 py-1 rounded-full bg-red-950/30 text-red-200/70">
                  {category.workouts} workouts
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-red-950/50 text-red-200">
                  {category.difficulty}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-auto border-t border-red-500/10">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1">
            <Home size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Dumbbell size={24} className="text-red-500" />
            <span className="text-xs text-red-500">Workouts</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <PiPersonSimpleTaiChiBold size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Exercises</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Activity size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Tracking</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function ExerciseDetails() {
  const exerciseData = {
    name: "Barbell Bench Press",
    category: "Strength Training",
    difficulty: "Intermediate",
    duration: "15-20 mins",
    equipment: ["Barbell", "Bench", "Weight Plates"],
    muscles: ["Chest", "Shoulders", "Triceps"],
    sets: 4,
    reps: "8-12",
    restTime: "90 sec",
  };

  const instructions = [
    "Lie on the bench with feet flat on the ground",
    "Grip the barbell slightly wider than shoulder width",
    "Lower the bar to mid-chest level",
    "Press the bar up while maintaining proper form",
    "Lock elbows at the top of the movement",
    "Control the descent on each rep",
  ];

  return (
    <div className="flex flex-col bg-gradient-to-b from-[#4A0404] to-[#0A0A0C] min-h-screen">
      <div className="p-6 flex items-center gap-4 sticky top-0 bg-gradient-to-b from-[#4A0404] to-transparent backdrop-blur-sm z-20">
        <button className="p-2.5 rounded-xl bg-black/20 backdrop-blur-sm border border-red-500/10 hover:bg-black/30 transition-colors">
          <ArrowLeft size={20} className="text-white" />
        </button>
        <h1 className="text-2xl font-medium text-white tracking-tight">
          Exercise Details
        </h1>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="relative aspect-[4/3] bg-[#1A1A1F]">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfwagKnFx63uxxAI_rPgYBQIsFE3EFnfa4wQ&s"
            alt="Exercise demonstration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-black/50 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-white leading-tight">
                  {exerciseData.name}
                </h2>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-red-200">{exerciseData.category}</span>
                  <span className="text-red-200/30">•</span>
                  <span className="text-red-200">{exerciseData.duration}</span>
                </div>
              </div>
              <button className="p-2.5 rounded-full bg-black/20 backdrop-blur-sm border border-red-500/10">
                <Bookmark size={20} className="text-red-500" />
              </button>
            </div>
          </div>

          <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-black/30 transition-all group">
            <Play
              size={24}
              className="text-white ml-1 group-hover:scale-110 transition-transform"
              fill="white"
            />
          </button>
        </div>

        <div className="flex-1 px-6">
          <div className="flex justify-between mt-4 mb-6 relative z-10">
            {[
              { label: "Sets", value: exerciseData.sets },
              { label: "Reps", value: exerciseData.reps },
              { label: "Rest", value: exerciseData.restTime },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-[#0A0A0C] px-4 py-3 rounded-2xl border border-red-500/10 flex-1 mx-1"
              >
                <p className="text-sm text-red-200 mb-1">{stat.label}</p>
                <p className="text-lg font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <section>
              <h3 className="text-sm uppercase tracking-wider text-white mb-3">
                Muscles Targeted
              </h3>
              <div className="flex gap-2 flex-wrap">
                {exerciseData.muscles.map((muscle, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-red-950/30 text-red-200 text-sm"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-sm uppercase tracking-wider text-white mb-3">
                Equipment Needed
              </h3>
              <div className="flex gap-2 flex-wrap">
                {exerciseData.equipment.map((item, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-lg bg-[#0A0A0C] text-gray-300 text-sm border border-red-500/5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>

            <section className="pb-6">
              <h3 className="text-sm uppercase tracking-wider text-white mb-4">
                Instructions
              </h3>
              <div className="space-y-5">
                {instructions.map((instruction, index) => (
                  <div key={index} className="flex gap-4 items-start group">
                    <div className="w-6 flex-shrink-0 text-center">
                      <span className="text-sm font-medium text-gray-400">
                        {(index + 1).toString().padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex-1">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {instruction}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-[#0A0A0C] to-transparent pt-6">
        <div className="px-6 pb-6">
          <button className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white py-4 rounded-xl font-semibold hover:from-red-600 hover:to-red-500 transition-all focus:ring-2 focus:ring-red-500/20 active:scale-[0.99]">
            Start Exercise
          </button>
        </div>
      </div>
      <div className="mt-auto p-6 border-t border-red-500/10">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1">
            <Home size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Dumbbell size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Workouts</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <PiPersonSimpleTaiChiBold size={24} className="text-red-500" />
            <span className="text-xs text-red-500">Exercises</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Activity size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Tracking</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function WorkoutTracking() {
  const workoutData = {
    name: "Upper Body Strength",
    currentExercise: {
      name: "Barbell Bench Press",
      currentSet: 2,
      totalSets: 4,
      targetReps: "8-12",
      weight: "60kg",
      restTime: 90,
    },
    progress: {
      completed: 3,
      total: 8,
      timeElapsed: "24:15",
      caloriesBurned: 186,
    },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#4A0404] to-[#0A0A0C]">
      <div className="sticky top-0 z-20 bg-gradient-to-b from-[#4A0404] to-transparent backdrop-blur-sm">
        <div className="p-6 flex items-center justify-between">
          <button className="p-2.5 rounded-xl bg-black/20 backdrop-blur-sm border border-red-500/10">
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-lg font-semibold text-white">
            {workoutData.name}
          </h1>
          <button className="p-2.5 rounded-xl bg-black/20 backdrop-blur-sm border border-red-500/10">
            <MoreVertical size={20} className="text-white" />
          </button>
        </div>

        <div className="px-6 pb-4">
          <div className="flex justify-between items-end mb-2 text-sm">
            <div className="text-gray-400">
              <span className="text-gray-100 font-medium">
                {workoutData.progress.completed}
              </span>
              {" / "}
              <span>{workoutData.progress.total}</span> exercises
            </div>
            <div className="text-gray-400 flex items-center">
              <Clock size={14} className="inline mr-1.5 text-red-200" />
              {workoutData.progress.timeElapsed}
            </div>
          </div>
          <div className="h-1.5 bg-[#1A1A1F] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full transition-all duration-300"
              style={{
                width: `${
                  (workoutData.progress.completed /
                    workoutData.progress.total) *
                  100
                }%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-1">
            {workoutData.currentExercise.name}
          </h2>
          <p className="text-gray-400 text-sm">
            Set {workoutData.currentExercise.currentSet} of{" "}
            {workoutData.currentExercise.totalSets}
          </p>
        </div>

        <div className="relative aspect-[4/3] bg-[#1A1A1F] rounded-2xl mb-8 overflow-hidden group">
          <img
            src="https://www.barbellmedicine.com/wp-content/uploads/2023/10/The-Bench-Press.jpg"
            alt="Exercise form"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <button className="absolute bottom-4 right-4 px-4 py-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg text-sm text-white flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Eye size={16} />
            Check Form
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-[#0A0A0C] p-4 rounded-xl border border-red-500/10">
            <label className="text-sm text-gray-400 mb-3 block">Weight</label>
            <div className="flex items-center justify-between">
              <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-black/40 text-red-500 hover:bg-black/60 transition-colors">
                <Minus size={14} strokeWidth={2.5} />
              </button>
              <div className="flex items-center">
                <h3 className="text-lg text-white font-medium">60 kg</h3>
              </div>
              <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-black/40 text-red-500 hover:bg-black/60 transition-colors">
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="bg-[#0A0A0C] p-4 rounded-xl border border-red-500/10">
            <label className="text-sm text-gray-400 mb-3 block">Reps</label>
            <div className="flex items-center justify-between">
              <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-black/40 text-red-500 hover:bg-black/60 transition-colors">
                <Minus size={14} strokeWidth={2.5} />
              </button>
              <h3 className="text-lg text-white font-medium">12</h3>
              <button className="h-8 w-8 flex items-center justify-center rounded-lg bg-black/40 text-red-500 hover:bg-black/60 transition-colors">
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Sets Progress</h3>
            <span className="text-sm text-gray-400">Rest: 90s</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`relative p-4 rounded-xl flex flex-col items-center justify-center gap-1 ${
                  i === 1
                    ? "bg-gradient-to-b from-red-900 to-red-700"
                    : "bg-[#0A0A0C] border border-red-500/10"
                }`}
              >
                <span
                  className={`text-sm ${
                    i === 1 ? "text-white font-semibold" : "text-gray-400"
                  }`}
                >
                  Set {i + 1}
                </span>

                {i < 1 && (
                  <div className="absolute inset-0 rounded-xl bg-[#0A0A0C] border border-red-500/10 flex flex-col items-center justify-center">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center mb-1">
                      <Check
                        size={14}
                        className="text-green-500"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="text-xs text-gray-400">12 × 60kg</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-[#0A0A0C] p-4 rounded-xl border border-red-500/10">
            <div className="flex items-center gap-2 mb-1">
              <Flame size={14} className="text-red-500" />
              <span className="text-sm text-gray-400">Calories</span>
            </div>
            <p className="text-xl font-bold text-white">
              {workoutData.progress.caloriesBurned}
            </p>
          </div>
          <div className="bg-[#0A0A0C] p-4 rounded-xl border border-red-500/10">
            <div className="flex items-center gap-2 mb-1">
              <Activity size={14} className="text-red-500" />
              <span className="text-sm text-gray-400">Heart Rate</span>
            </div>
            <p className="text-xl font-bold text-white">142 bpm</p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 bg-gradient-to-t from-[#0A0A0C] to-transparent pt-6">
        <div className="px-6 pb-6 flex justify-between items-center">
          <button className="w-12 h-12 rounded-xl bg-[#0A0A0C] border border-red-500/10 flex items-center justify-center">
            <SkipBack size={20} className="text-red-500" />
          </button>
          <button className="px-12 py-4 bg-gradient-to-r from-red-700 to-red-800 rounded-xl text-white font-medium hover:from-red-600 hover:to-red-500 transition-colors">
            Complete Set
          </button>
          <button className="w-12 h-12 rounded-xl bg-[#0A0A0C] border border-red-500/10 flex items-center justify-center">
            <SkipForward size={20} className="text-red-500" />
          </button>
        </div>
      </div>

      <div className="mt-auto p-6 border-t border-red-500/10">
        <div className="flex justify-around items-center">
          <button className="flex flex-col items-center gap-1">
            <Home size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Home</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Dumbbell size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Workouts</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <PiPersonSimpleTaiChiBold size={24} className="text-gray-400" />
            <span className="text-xs text-gray-400">Exercises</span>
          </button>
          <button className="flex flex-col items-center gap-1">
            <Activity size={24} className="text-red-500" />
            <span className="text-xs text-red-500">Tracking</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function WorkoutUI() {
  const oddScreenVariants = {
    hidden: { 
      opacity: 0,
      y: -100,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  const evenScreenVariants = {
    hidden: { 
      opacity: 0,
      y: 100,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100
      }
    },
    hover: {
      scale: 1.02,
      y: -5,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }
  };

  return (
    <div className="bg-[#13100F] min-h-screen flex items-center justify-center">
      <BackToHome />
      <div className="flex gap-6 py-12 scale-95">
        {/* Screen 1 */}
        <motion.div 
          className="w-[375px] rounded-[20px] overflow-hidden shadow-2xl shadow-black/20"
          variants={oddScreenVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <HomeDashboard />
        </motion.div>

        {/* Screen 2 */}
        <motion.div 
          className="w-[375px] rounded-[20px] mt-40 overflow-hidden shadow-2xl shadow-black/20"
          variants={evenScreenVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <WorkoutCategories />
        </motion.div>

        {/* Screen 3 */}
        <motion.div 
          className="w-[375px] rounded-[20px] overflow-hidden shadow-2xl shadow-black/20"
          variants={oddScreenVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <ExerciseDetails />
        </motion.div>

        {/* Screen 4 */}
        <motion.div 
          className="w-[375px] rounded-[20px] mt-40 overflow-hidden shadow-2xl shadow-black/20"
          variants={evenScreenVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <WorkoutTracking />
        </motion.div>
      </div>
    </div>
  );
}