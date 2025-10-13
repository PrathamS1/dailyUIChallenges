import { useState } from "react";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("Home");

  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };
  console.log(activeNav);

  return (
    <div className="bg-[#1A1A1A] min-h-screen">
      <div className="absolute inset-0 w-fit h-fit z-1">
        <svg
          width="447"
          height="582"
          viewBox="0 0 447 582"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_f_1078_204)">
            <ellipse
              cx="66.4423"
              cy="36.5002"
              rx="50.0048"
              ry="367.543"
              transform="rotate(-25.8845 66.4423 36.5002)"
              fill="#D9D9D9"
              fill-opacity="0.82"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_1078_204"
              x="-313.442"
              y="-508.102"
              width="759.769"
              height="1089.2"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="BackgroundImageFix"
                result="shape"
              />
              <feGaussianBlur
                stdDeviation="106.6"
                result="effect1_foregroundBlur_1078_204"
              />
            </filter>
          </defs>
        </svg>
      </div>
      <nav className="py-8 flex items-center justify-around font-[Poppins] z-10">
        <div className="px-12">
          <img
            src="/rebound.png"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
        <div className="bg-black p-2 rounded-full shadow-[inset_2px_2px_1px_#ffffff32]">
          <ul className="flex text-md gap-4">
            <li
              className={`px-10 py-3 rounded-full hover:cursor-pointer transition-all ${
                activeNav === "Home"
                  ? "text-white bg-[#1a1a1a] shadow-[inset_1px_-1px_1px_#ffffff28]"
                  : "text-[#696969]"
              }`}
              onClick={() => handleNavClick("Home")}
            >
              Home
            </li>
            <li
              className={`px-10 py-3 rounded-full hover:cursor-pointer transition-all ${
                activeNav === "Services"
                  ? "text-white bg-[#1a1a1a] shadow-[inset_1px_-1px_1px_#ffffff28]"
                  : "text-[#696969]"
              }`}
              onClick={() => handleNavClick("Services")}
            >
              Services
            </li>
            <li
              className={`px-10 py-3 rounded-full hover:cursor-pointer transition-all ${
                activeNav === "About"
                  ? "text-white bg-[#1a1a1a] shadow-[inset_1px_-1px_1px_#ffffff28]"
                  : "text-[#696969]"
              }`}
              onClick={() => handleNavClick("About")}
            >
              About
            </li>
            <li
              className={`px-10 py-3 rounded-full hover:cursor-pointer transition-all ${
                activeNav === "Contact"
                  ? "text-white bg-[#1a1a1a] shadow-[inset_1px_-1px_1px_#ffffff28]"
                  : "text-[#696969]"
              }`}
              onClick={() => handleNavClick("Contact")}
            >
              Contact
            </li>
          </ul>
        </div>
        <div className="bg-black p-2 rounded-full shadow-[inset_2px_2px_1px_#ffffff32]">
          <button className="text-white font-medium px-12 py-3 rounded-full bg-[#1a1a1a] shadow-[inset_1px_-1px_1px_#ffffff28]">
            Login/Sign Up
          </button>
        </div>
      </nav>
      <header></header>
    </div>
  );
}
