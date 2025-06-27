import Header from '@/components/Header';
import HeroSection from '@/components/Hero';
import About from '@/components/About';
import Menu from '@/components/Menu'; // Import the new component
import Events from '@/components/Events';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg-brewery-dark">
      <Header />
      <main>
        <HeroSection />
        <About />
        <Menu /> {/* Replace your old Menu component with this */}
        <Events />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}