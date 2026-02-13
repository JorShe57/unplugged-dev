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
    <div className="min-h-screen bg-[#1A120E] selection:bg-[#E6B325]/30">
      <Header />
      <main className="relative overflow-hidden">
        {/* Atmospheric Glows */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#E6B325]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#C68642]/10 rounded-full blur-[120px] pointer-events-none" />

        <section className="py-24 md:py-32 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            {/* Back Button */}
            <div className="mb-16">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 text-[#C68642] hover:text-[#E6B325] transition-all duration-300 font-body uppercase tracking-[0.3em] text-[10px]"
              >
                <div className="w-8 h-[1px] bg-[#C68642]/20 group-hover:bg-[#E6B325]/40 transition-colors" />
                <svg
                  className="w-4 h-4 group-hover:-translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Return Home
              </Link>
            </div>

            <div className="text-center mb-20 animate-fade-in">
              <h1 className="text-5xl md:text-8xl font-hero font-bold text-[#E6B325] tracking-tight mb-6 drop-shadow-2xl">
                The Full Menu
              </h1>
              <p className="text-lg md:text-xl font-body font-light text-[#FDF5E6]/60 max-w-2xl mx-auto tracking-wide uppercase">
                Explore our full rotation of small-batch artisanal brews.
              </p>
              <div className="mt-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-[#E6B325]/40 to-transparent mx-auto" />
            </div>

            {/* Glass Container for the menu */}
            <div className="bg-[#1A120E]/40 backdrop-blur-2xl rounded-[3rem] border border-[#E6B325]/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E6B325]/5 to-transparent pointer-events-none" />
              <BeerMenu />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}