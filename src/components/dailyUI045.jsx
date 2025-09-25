import BackToHome from "./BackToHome";

export default function NFTInfoCard() {
  return (
    <>
      <div className="min-h-screen w-full">
        <BackToHome />
        <img
          src="/nft-info.png"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
    </>
  );
}
