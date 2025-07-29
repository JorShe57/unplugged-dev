export default function Footer() {
  return (
    <footer className="w-full py-10 bg-brewery-dark border-t-2 border-brewery-gold/30 text-center">
      <div className="max-w-6xl mx-auto px-4 flex flex-col items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-bold text-brewery-gold drop-shadow-md">Come Get Unplugged!!!</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-2 md:gap-6 text-white/80">
          <p className="text-brewery-gold">&copy; {new Date().getFullYear()} Unplugged Brewery</p>
          <span className="hidden md:inline text-brewery-gold/50">•</span>
          <a 
            href="https://www.elev8dig.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-brewery-gold/80 hover:text-brewery-primary transition-colors flex items-center gap-1"
          >
            <span>Powered by</span>
            <span className="font-semibold">Elev8 Digital</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}