import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const links = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#about" },
    { label: "AI Workflows", href: "#ai-workflows" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <footer className="w-full bg-[#f5f5f7] py-16">
      <div className="tile-inner">
        <div className="flex flex-col items-center gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <span className="relative block h-9 w-9 overflow-hidden rounded-full ring-1 ring-black/10">
              <Image src="/profile.png" alt="Aniket Gupta" fill sizes="36px" className="object-cover object-top" />
            </span>
            <span className="caption-strong text-[#1d1d1f]">Aniket Kumar Gupta</span>
          </div>

          <nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="caption text-[#333333] transition-colors hover:text-[#0066cc]">
                {link.label}
              </Link>
            ))}
            <a
              href="/Aniket_Kumar_Gupta_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="caption text-[#333333] transition-colors hover:text-[#0066cc]"
            >
              Resume
            </a>
          </nav>
        </div>

        <div className="mt-10 border-t border-[#e0e0e0] pt-6">
          <p className="fine-print text-center text-[#7a7a7a] md:text-left">
            Copyright © {new Date().getFullYear()} Aniket Kumar Gupta. Engineered in India.
          </p>
        </div>
      </div>
    </footer>
  );
}
