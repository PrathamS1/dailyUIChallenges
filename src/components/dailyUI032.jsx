import BackToHome from "./BackToHome";

export default function StartupFunding() {
  return (
    <>
      <div className="min-h-screen w-full">
        <BackToHome />
        <img
          src="/Startupfunding.png"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
    </>
  );
}
