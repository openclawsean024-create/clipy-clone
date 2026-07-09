import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PlatformsStrip from './components/PlatformsStrip';
import EarningsSlider from './components/EarningsSlider';
import Stats from './components/Stats';
import FeaturesTabs from './components/FeaturesTabs';
import Steps from './components/Steps';
import Powerful from './components/Powerful';
import WhyUs from './components/WhyUs';
import Testimonials from './components/Testimonials';
import PopularContent from './components/PopularContent';
import TiersTable from './components/TiersTable';
import FAQ from './components/FAQ';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';
import AuthModal from './components/AuthModal';
import RequireAuth from './components/RequireAuth';
import DashboardLayout from './pages/DashboardLayout';
import Overview from './pages/Overview';
import Posts from './pages/Posts';
import Earnings from './pages/Earnings';
import Settings from './pages/Settings';

function LandingPage({ openAuth }) {
  return (
    <div className="min-h-screen bg-white text-text-secondary">
      <Navbar openAuth={openAuth}/>
      <main>
        <Hero openAuth={openAuth}/>
        <PlatformsStrip/>
        <EarningsSlider/>
        <Stats/>
        <FeaturesTabs/>
        <Steps/>
        <Powerful/>
        <WhyUs/>
        <Testimonials/>
        <PopularContent/>
        <TiersTable/>
        <FAQ/>
        <CTA/>
      </main>
      <Footer/>
      <CookieBanner/>
    </div>
  );
}

export default function App() {
  const [authModal, setAuthModal] = useState(null);

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage openAuth={setAuthModal}/>}/>
        <Route path="/dashboard" element={
          <RequireAuth>
            <DashboardLayout/>
          </RequireAuth>
        }>
          <Route index element={<Overview/>}/>
          <Route path="posts" element={<Posts/>}/>
          <Route path="earnings" element={<Earnings/>}/>
          <Route path="settings" element={<Settings/>}/>
        </Route>
        <Route path="*" element={<LandingPage openAuth={setAuthModal}/>}/>
      </Routes>
      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)}/>}
    </>
  );
}