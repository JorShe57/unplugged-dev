import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import Menu from '../components/Menu';
import Events from '../components/Events';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="bg-brewery-dark min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col">
        <Hero />
        {/* Section Divider: Hero -> Menu */}
        <div aria-hidden="true" className="section-divider-hero-menu">
          <svg width="100%" height="60" viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 30C120 60 360 0 720 0C1080 0 1320 60 1440 30V60H0V30Z" fill="#DAA520" fillOpacity="0.18" />
            <path d="M0 40C120 55 360 10 720 10C1080 10 1320 55 1440 40" stroke="#8B4513" strokeWidth="4" strokeLinecap="round" fill="none" />
          </svg>
        </div>
        <Menu />
        <Events />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
