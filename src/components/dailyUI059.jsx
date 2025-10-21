import BackToHome from "./BackToHome";

export default function BackgroundPattern() {
  return (
    <>
      <div className="h-screen w-full">
        <BackToHome />
        <img
          src="/bgpattern.png"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
    </>
  );
}
