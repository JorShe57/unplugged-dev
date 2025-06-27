import Link from 'next/link';

export default function Menu() {
  return (
    <section className="relative py-16 bg-gray-900 overflow-hidden">
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          View Our Amazing Selection Here
        </h2>
        
        <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          Discover our carefully crafted selection of ales, lagers, and seasonal specialties.
        </p>

        <Link 
          href="/menu"
          className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 text-black font-bold text-lg px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          View Full Beer Menu
          <svg 
            className="ml-2 w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}