import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ProductivitySignUp from './components/dailyUI001';
import CreditCardCheckout from './components/dailyUI002';
import LandingPage from './components/dailyUI003';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />} />
        <Route path="/001" element={<ProductivitySignUp />} />
        <Route path="/002" element={<CreditCardCheckout />} />
        <Route path="/003" element={<LandingPage />} />
        {/* <Route path="/002" element={<New Element />} /> */}
        {/* Fallback route */}
        <Route path="*" element={<Navigation />} />
      </Routes>
    </Router>
  );
}

export default App;