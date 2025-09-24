import BackToHome from "./BackToHome";

export default function CustomizeProduct() {
  return (
    <>
      <div className="min-h-screen w-full">
        <BackToHome />
        <img
          src="/customize-prod.png"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
    </>
  );
}
