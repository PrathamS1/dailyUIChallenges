import BackToHome from "./BackToHome";

export default function JobListing() {
  return (
    <>
      <div className="min-h-screen w-full">
        <BackToHome />
        <img
          src="/jobhire.png"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
    </>
  );
}
