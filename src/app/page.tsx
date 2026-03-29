import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import InteractiveHero from "../components/InteractiveHero";
import GithubActivity from "../components/GithubActivity";

// Dynamic Imports for below-the-fold content to drastically improve LCP & TTFB
const AboutSection = dynamic(() => import("../components/AboutSection"));
const ProjectsSection = dynamic(() => import("../components/ProjectsSection"));
const SkillsSection = dynamic(() => import("../components/SkillsSection"));
const PerformanceSection = dynamic(() => import("../components/PerformanceSection"));
const ContactSection = dynamic(() => import("../components/ContactSection"));
const Footer = dynamic(() => import("../components/Footer"));

// Purely client-side UI effects that don't need SSR
const CursorGlow = dynamic(() => import("../components/CursorGlow"));
const AIChatBot = dynamic(() => import("../components/AIChatBot"));

export default function Home() {
  return (
    <div className="relative min-h-screen text-white bg-[#030014] overflow-x-hidden selection:bg-primary/30 scroller">
      <CursorGlow />
      
      {/* Background ambient lighting - kept lightweight for LCP */}
      <div className="fixed inset-0 pointer-events-none z-[0]" aria-hidden="true">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.03),transparent_60%)]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.02),transparent_70%)] blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-[radial-gradient(circle_at_center,rgba(217,70,239,0.02),transparent_70%)] blur-[120px] animate-pulse"></div>
      </div>

      <Navbar />

      <main className="px-6 max-w-7xl mx-auto relative z-10 w-full">
        {/* Above the fold (critial) */}
        <InteractiveHero />
        
        {/* Below the fold (lazy loaded) */}
        <GithubActivity />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <PerformanceSection />
        <ContactSection />
      </main>

      <Footer />
      <AIChatBot />
    </div>
  );
}
