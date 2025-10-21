import BackToHome from "./BackToHome";

export default function NotificationUI() {
  return (
    <>
      <div className="min-h-screen w-full flex flex-col pt-20 items-center justify-center gap-4 bg-gradient-to-br from-white via-33% via-[#B9FFD5] to-[#2b97b7]">
        <BackToHome />
        <h1 className="text-5xl font-semibold font-[Lato]">Notification UI</h1>
        <h3 className="text-xl font-[lato] opacity-70">Figma design file showcasing notification ui for mobile screens</h3>
        <img
          src="/notifUIFigma.png"
          className="object-cover w-[30%]"
          alt=""
        />
      </div>
    </>
  );
}
