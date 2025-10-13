import BackToHome from './BackToHome';
export default function LogoDesign(){
    return(
      <div className="h-screen w-full bg-[#D6D6D6]">
        <BackToHome />
        <img
          src="/logo52.png"
          className="object-contain w-full h-full"
          alt=""
        />
      </div>
    )
}