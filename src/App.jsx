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
import CTA from './components/CTA';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import CookieBanner from './components/CookieBanner';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-text-secondary">
      <Navbar />
      <main>
        <Hero />
        <PlatformsStrip />
        <EarningsSlider />
        <Stats />
        <FeaturesTabs />
        <Steps />
        <Powerful />
        <WhyUs />
        <Testimonials />
        <PopularContent />
        <TiersTable />
        <FAQ />
        <CTA />
      </main>
      <Footer />
      <CookieBanner />
    </div>
  );
}