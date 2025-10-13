import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import ProductivitySignUp from "./components/dailyUI001";
import CreditCardCheckout from "./components/dailyUI002";
import LandingPage from "./components/dailyUI003";
import CarbonFootprintCalculator from "./components/dailyUI004";
import AppIconShowcase from "./components/dailyUI005";
import ProfessionalProfileCard from "./components/dailyUI006";
import CMSSettingsPanel from "./components/dailyUI007";
import Simple404 from "./components/dailyUI008";
import ImmersiveMusicPlayer from "./components/dailyUI009";
import SocialShare from "./components/dailyUI010";
import FlashMessages from "./components/dailyUI011";
import IceCreamShop from "./components/dailyUI012";
import BuyerSellerChat from "./components/dailyUI013";
import RetroGameCountdown from "./components/dailyUI014";
import ServiceToggle from "./components/dailyUI015";
import PremiumContentOverlay from "./components/dailyUI016";
import DigitalReceipt from "./components/dailyUI017";
import PluginManagement from "./components/PluginManagement";
import FinanceAnalytics from "./components/dailyUI018";
import Leaderboard from "./components/dailyUI019";
import LocationTrackerPin from "./components/dailyUI020";
import HomeMonitoringDashboard from "./components/dailyUI021";
import SearchBar from "./components/dailyUI022";
import Onboarding from "./components/dailyUI023";
import BoardingPass from "./components/dailyUI024";
import TVApp from "./components/dailyUI025";
import Subscription from "./components/dailyUI026";
import DropdownShowcase from "./components/dailyUI027";
import ContactPage from "./components/dailyUI028";
import MapDesign from "./components/dailyUI029";
import PricingCard from "./components/dailyUI030";
import FileUpload from "./components/dailyUI031";
import WeatherUI from "./components/dailyUI037";
import Calendar from "./components/dailyUI038";
import Testimonials from "./components/dailyUI039";
import KitchenDisplaySystem from "./components/dailyUI040";
import WorkoutUI from "./components/dailyUI041";
import ToDoTask from "./components/dailyUI042";
import FoodMenu from "./components/dailyUI043";
import FavoriteSection from "./components/dailyUI044";
import StartupFunding from "./components/dailyUI032";
import CustomizeProduct from "./components/dailyUI033";
import AutomotiveInterface from "./components/dailyUI034";
import BlogPost from "./components/dailyUI035";
import SpecialOffer from "./components/dailyUI036";
import NFTInfoCard from "./components/dailyUI045";
import InvoiceCard from "./components/dailyUI046";
import ActivityFeed from "./components/dailyUI047";
import PresPage from "./components/dailyUI051";
import LogoDesign from "./components/dailyUI052";
import Navbar from "./components/dailyUI053";
import VideoPlayer from "./components/dailyUI057";
import ShoppingCartUI from "./components/dailyUI058";

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
        <Route path="/012" element={<IceCreamShop />} />
        <Route path="/013" element={<BuyerSellerChat />} />
        <Route path="/014" element={<RetroGameCountdown />} />
        <Route path="/015" element={<ServiceToggle />} />
        <Route path="/016" element={<PremiumContentOverlay />} />
        <Route path="/017" element={<DigitalReceipt />} />
        <Route path="/018" element={<FinanceAnalytics />} />
        <Route path="/019" element={<Leaderboard />} />
        <Route path="/020" element={<LocationTrackerPin />} />
        <Route path="/021" element={<HomeMonitoringDashboard />} />
        <Route path="/022" element={<SearchBar />} />
        <Route path="/023" element={<Onboarding />} />
        <Route path="/024" element={<BoardingPass />} />
        <Route path="/025" element={<TVApp />} />
        <Route path="/026" element={<Subscription />} />
        <Route path="/027" element={<DropdownShowcase />} />
        <Route path="/028" element={<ContactPage />} />
        <Route path="/029" element={<MapDesign />} />
        <Route path="/030" element={<PricingCard />} />
        <Route path="/031" element={<FileUpload />} />

        {/* figma files only */}
        <Route path="/032" element={<StartupFunding />} />
        <Route path="/033" element={<CustomizeProduct />} />
        <Route path="/034" element={<AutomotiveInterface />} />
        <Route path="/035" element={<BlogPost />} />
        <Route path="/036" element={<SpecialOffer />} />

        <Route path="/037" element={<WeatherUI />} />
        <Route path="/038" element={<Calendar />} />
        <Route path="/039" element={<Testimonials />} />
        <Route path="/040" element={<KitchenDisplaySystem />} />
        <Route path="/041" element={<WorkoutUI />} />
        <Route path="/042" element={<ToDoTask />} />
        <Route path="/043" element={<FoodMenu />} />
        <Route path="/044" element={<FavoriteSection />} />

        {/* figma file */}
        <Route path="/045" element={<NFTInfoCard />} />

        <Route path="/046" element={<InvoiceCard />} />
        <Route path="/047" element={<ActivityFeed />} />

        <Route path="/051" element={<PresPage />} />
        <Route path="/052" element={<LogoDesign />} />
        <Route path="/053" element={<Navbar />} />

        {/* <Route path="/057" element={<VideoPlayer ambientMode="general" />}/> */}
        <Route path="/057" element={<VideoPlayer ambientMode="dark" />} />
        {/* <Route path="/057" element={<VideoPlayer ambientMode="vibrant" />}/> */}
        <Route path="/058" element={<ShoppingCartUI />} />

        <Route path="/plugin-management" element={<PluginManagement />} />

        {/* <Route path="/002" element={<New Element />} /> */}
        {/* Fallback route */}
        <Route path="*" element={<Navigation />} />
      </Routes>
    </Router>
  );
}

export default App;
