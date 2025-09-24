import BackToHome from "./BackToHome";

export default function AutomotiveInterface() {
  return (
    <>
      <div className="min-h-screen w-full">
        <BackToHome />
        <img
          src="/auto-interface.png"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
    </>
  );
}
