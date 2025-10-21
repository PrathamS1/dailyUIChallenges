import { ChevronRight } from "lucide-react";
import { BsInstagram, BsTwitterX } from "react-icons/bs";
import BackToHome from "./BackToHome";

function gradientBG() {
  return (
    <div className="absolute inset-0 -z-1">
      <svg
        width="full"
        height="720"
        viewBox="0 0 1280 720"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_f_1034_322)">
          <circle cx="133" cy="135" r="193" fill="#099DDC" />
        </g>
        <g filter="url(#filter1_f_1034_322)">
          <ellipse cx="460.5" cy="110" rx="208.5" ry="304" fill="#67F951" />
        </g>
        <g filter="url(#filter2_f_1034_322)">
          <ellipse cx="876" cy="150.5" rx="368" ry="256.5" fill="#FF47B2" />
        </g>
        <g filter="url(#filter3_f_1034_322)">
          <ellipse cx="1234.5" cy="210.5" rx="85.5" ry="256.5" fill="#FFCC00" />
        </g>
        <defs>
          <filter
            id="filter0_f_1034_322"
            x="-360"
            y="-358"
            width="986"
            height="986"
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
              stdDeviation="150"
              result="effect1_foregroundBlur_1034_322"
            />
          </filter>
          <filter
            id="filter1_f_1034_322"
            x="-48"
            y="-494"
            width="1017"
            height="1208"
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
              stdDeviation="150"
              result="effect1_foregroundBlur_1034_322"
            />
          </filter>
          <filter
            id="filter2_f_1034_322"
            x="208"
            y="-406"
            width="1336"
            height="1113"
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
              stdDeviation="150"
              result="effect1_foregroundBlur_1034_322"
            />
          </filter>
          <filter
            id="filter3_f_1034_322"
            x="849"
            y="-346"
            width="771"
            height="1113"
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
              stdDeviation="150"
              result="effect1_foregroundBlur_1034_322"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

export default function ComingSoon() {
  return (
    <>
      <div className="w-full min-h-screen relative">
        <BackToHome />
        {gradientBG()}
        <div className="absolute border-2 w-full h-full flex items-center justify-center -z-1">
          <img src="/arrow.png" className="w-[80%] h-[80%]" alt="" />
        </div>
        <div className="w-full h-full absolute inset-0 backdrop-blur-5xl -z-1 bg-white/40" />

        <nav className="w-full fixed py-8 flex items-center justify-center">
          <div className="absolute top-1/2 -translate-y-1/2 left-16">
            <img src="/colorway.png" className="h-8" alt="" />
          </div>
          <ul className="flex gap-10 font-[Lato] font-medium text-md py-3 px-16 bg-[#F9FEFA]/28 shadow-[0px_4px_18px_#66666625]">
            <li>Demo</li>
            <li>Blogs</li>
            <li>About Us</li>
          </ul>
        </nav>
        <header className="h-screen w-full flex flex-col items-center justify-center gap-1">
          <h3 className="font-medium font-[Lato] text-lg text-black/70 bg-[#ffffff]/40 backdrop-blur-2xl px-8 py-1">
            Coming Soon
          </h3>
          <h1 className="font-bold font-[poppins] text-5xl text-center tracking-wider leading-16">
            Turn The <span className="italic font-medium">Default</span> Web
            into
            <br />
            <span className="italic font-medium">Your</span> Designed Web{" "}
          </h1>
          <p className="font-[lato] text-xl tracking-wide text-center mt-4">
            A New Way To{" "}
            <span className="font-semibold bg-[#E7307B] text-white px-1 py-1">
              Re-Imagine
            </span>{" "}
            Your Website
            <br />
            In Any Theme
          </p>
          <button className="flex items-center justify-between relative mt-10 w-fit">
            <div className="absolute w-[100%] h-[100%] -z-1 blur-xs bg-[radial-gradient(circle,#FB8DCA_0%,#B4E0A7_17%,#97E0D0_35%,#BCD9AA_56%,#FFCCB3_100%)]"></div>
            <div className="m-1 p-1 bg-white flex items-center justify-center gap-6">
              <div className="w-12 h-12 bg-[#E7307B] flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.25 0.75H4.75C3.49022 0.75 2.28204 1.25045 1.39124 2.14124C0.500445 3.03204 0 4.24022 0 5.5V14.5C0 15.1238 0.122862 15.7415 0.361572 16.3177C0.600282 16.894 0.950164 17.4177 1.39124 17.8588C2.28204 18.7496 3.49022 19.25 4.75 19.25H15.25C16.509 19.2474 17.7156 18.7461 18.6058 17.8558C19.4961 16.9656 19.9974 15.759 20 14.5V5.5C19.9974 4.24103 19.4961 3.03439 18.6058 2.14416C17.7156 1.25394 16.509 0.752642 15.25 0.75ZM11.6 9.07C11.108 9.35059 10.5514 9.49815 9.985 9.49815C9.41861 9.49815 8.862 9.35059 8.37 9.07L1.52 5.14C1.60857 4.3453 1.98701 3.61115 2.58292 3.07797C3.17883 2.54478 3.95038 2.25 4.75 2.25H15.25C16.049 2.25219 16.8194 2.54773 17.4148 3.0805C18.0103 3.61327 18.3893 4.34616 18.48 5.14L11.6 9.07Z"
                    fill="white"
                  />
                </svg>
              </div>
              <h2 className="font-medium text-xl font-[poppins]">Notify Me</h2>
              <ChevronRight />
            </div>
          </button>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center justify-center gap-1">
            <h3 className="font-[Poppins] text-lg font-medium">Follow Us</h3>
            <div className="flex items-center justify-center gap-4">
              <BsTwitterX size={36} className="p-2 bg-[#C6E8BE]" />
              <BsInstagram size={36} className="p-2 bg-[#FED5C3]" />
            </div>
          </div>
        </header>
      </div>
    </>
  );
}
