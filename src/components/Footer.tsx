import Image from "next/image";

export default function Footer() {
  return (
    <footer className="py-20 border-t border-white/5 bg-[#030014]/80 backdrop-blur-sm relative overflow-hidden mt-40">
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/5 blur-[100px] rounded-full pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-10">
        <div className="flex flex-col items-center md:items-start group">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 relative rounded-xl overflow-hidden shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-110 transition-transform">
              <Image src="/profile.png" alt="Aniket Profile" fill className="object-cover object-top" />
            </div>
            <span className="font-black text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 group-hover:from-primary group-hover:to-purple-300 transition-colors">Aniket Kumar Gupta</span>
          </div>
          <p className="text-muted-foreground text-sm flex items-center gap-2">
            © {new Date().getFullYear()} Engineered with <span className="text-primary animate-pulse">♥</span> in India.
          </p>
        </div>

        <div className="flex gap-10 text-xs font-bold uppercase tracking-widest text-muted-foreground">
          <a href="#" className="hover:text-primary transition-colors hover:-translate-y-1 block">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors hover:-translate-y-1 block">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
