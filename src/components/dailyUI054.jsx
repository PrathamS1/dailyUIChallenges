import BackToHome from "./BackToHome";

export default function Confirmation(){
  return(
    <>
    <div className="w-full flex items-center justify-center">
      <img src="/confirmation.png" className="w-full h-full object-cover" alt="" />
    </div>
    <BackToHome challengeDay="54" challengeTitle="Confirmation"/>
    </>
  )
}