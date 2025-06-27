import { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BeerMenu from '@/components/BeerMenu';

export const metadata: Metadata = {
  title: 'Beer Menu | Unplugged Brewing',
  description: 'Explore our full selection of craft beers and seasonal offerings.',
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <main>
        <section className="py-16 px-4 bg-black">
          <div className="container mx-auto">
            {/* Back Button with extra top padding */}
            <div className="pt-8">
              <Link 
                href="/"
                className="inline-flex items-center text-amber-400 hover:text-amber-300 transition-colors duration-200 mb-8 group"
              >
                <svg 
                  className="mr-2 w-5 h-5 group-hover:-translate-x-1 transition-transform duration-200" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Home
              </Link>
            </div>

            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Our Beer Menu
              </h1>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Discover our carefully crafted selection of ales, lagers, and seasonal specialties.
              </p>
            </div>
            
            {/* Rounded container for the menu */}
            <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
              <BeerMenu />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}