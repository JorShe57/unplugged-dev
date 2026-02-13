export default function Footer() {
  return (
    <footer className="w-full py-16 bg-[#1A120E] border-t border-[#E6B325]/10 text-center relative overflow-hidden">
      {/* Subtle Glow Background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#E6B325]/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10 relative z-10">
        <h2 className="text-3xl md:text-5xl font-hero font-bold text-[#E6B325] tracking-tight drop-shadow-2xl">
          Come get unplugged.
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
          <p className="text-[#C68642] font-body font-medium tracking-[0.2em] uppercase text-xs">
            &copy; {new Date().getFullYear()} Unplugged Brewing Company
          </p>

          <div className="hidden md:block w-1 h-1 rounded-full bg-[#E6B325]/20" />

          <a
            href="https://www.elev8dig.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-[#FDF5E6]/40 hover:text-[#E6B325] transition-all duration-300"
          >
            <span className="text-xs font-body tracking-widest uppercase">Powered by</span>
            <span className="text-sm font-body font-bold tracking-tight">Elev8 Digital</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}