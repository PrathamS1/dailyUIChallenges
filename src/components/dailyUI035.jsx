import BackToHome from "./BackToHome";

export default function BlogPost() {
  return (
    <>
      <div className="min-h-screen w-full">
        <BackToHome />
        <img
          src="/blog-post.png"
          className="object-cover w-full h-full"
          alt=""
        />
      </div>
    </>
  );
}
