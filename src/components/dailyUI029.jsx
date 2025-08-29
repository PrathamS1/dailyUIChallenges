import BackToHome from "./BackToHome";

export default function MapDesign() {
  return (
    <>
      <div className="w-full bg-zinc-400 py-10 flex flex-col gap-10 items-center">
        <BackToHome/>
        <h1 className="text-5xl font-bold text-center">
          Estate Site Map Design
        </h1>
        <img src="/Map.jpg" className="w-[60%] h-[60%] rounded-xl object-contain" alt="" />
      </div>
    </>
  );
}
