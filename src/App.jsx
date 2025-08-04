import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProductivitySignUp from './components/dailyUI001';
import CreditCardCheckout from './components/dailyUI002';
import LandingPage from './components/dailyUI003';
import CarbonFootprintCalculator from './components/dailyUI004';
import AppIconShowcase from './components/dailyUI005';
import ProfessionalProfileCard from './components/dailyUI006';
import CMSSettingsPanel from './components/dailyUI007';
import Simple404 from './components/dailyUI008';
import ImmersiveMusicPlayer from './components/dailyUI009';
import SocialShare from './components/dailyUI010';
import FlashMessages from './components/dailyUI011';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/001" element={<ProductivitySignUp />} />
        <Route path="/002" element={<CreditCardCheckout />} />
        <Route path="/003" element={<LandingPage />} />
        <Route path="/004" element={<CarbonFootprintCalculator />} />
        <Route path="/005" element={<AppIconShowcase />} />
        <Route path="/006" element={<ProfessionalProfileCard />} />
        <Route path="/007" element={<CMSSettingsPanel />} />
        <Route path="/008" element={<Simple404 />} />
        <Route path="/009" element={<ImmersiveMusicPlayer />} />
        <Route path="/010" element={<SocialShare />} />
        <Route path="/011" element={<FlashMessages />} />

        {/* <Route path="/002" element={<New Element />} /> */}
        {/* Fallback route */}
        <Route path="*" element={<Navigation />} />
      </Routes>
    </Router>
  );
}

export default App;