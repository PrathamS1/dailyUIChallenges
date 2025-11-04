import BackToHome from "./BackToHome";

export default function StatisticsUI(){
  return (
    <>
    <div className="w-full min-h-screen flex items-center justify-center">
      <img src="/statistics.png" className="w-full h-full object-cover" alt="Statistics UI" />
    </div>
    <BackToHome challengeDay="66" challengeTitle="Statistics"/>
    </>
  )
}