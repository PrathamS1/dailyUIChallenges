import BackToHome from "./BackToHome";

export default function SpecialOffer() {
  return (
    <>
      <div className="min-h-screen w-full">
        <BackToHome />
        <img
          src="/special-offer.png"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
    </>
  );
}
