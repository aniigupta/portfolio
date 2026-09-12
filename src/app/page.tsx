import dynamic from "next/dynamic";
import Navbar from "../components/Navbar";
import InteractiveHero from "../components/InteractiveHero";
import PageLoader from "../components/PageLoader";


// Dynamic Imports for below-the-fold content to drastically improve LCP & TTFB
const AboutSection = dynamic(() => import("../components/AboutSection"));
const ProjectsSection = dynamic(() => import("../components/ProjectsSection"));
const AIWorkflowsSection = dynamic(() => import("../components/AIWorkflowsSection"));
const SkillsSection = dynamic(() => import("../components/SkillsSection"));
const PerformanceSection = dynamic(() => import("../components/PerformanceSection"));
const ContactSection = dynamic(() => import("../components/ContactSection"));
const Footer = dynamic(() => import("../components/Footer"));

// Purely client-side UI effects that don't need SSR
const CursorGlow = dynamic(() => import("../components/CursorGlow"));
const AIChatBot = dynamic(() => import("../components/AIChatBot"));
const VisitorTracker = dynamic(() => import("../components/VisitorTracker"));

export default function Home() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-white text-[#1d1d1f] selection:bg-[#0066cc]/15 scroller">
      <PageLoader />
      <VisitorTracker />
      <CursorGlow />

      <Navbar />

      {/* Edge-to-edge tiles: each section owns its surface, and the surface
          change between them is the only divider. */}
      <main className="w-full">
        {/* Above the fold (critial) */}
        <InteractiveHero />

        {/* Below the fold (lazy loaded) */}

        <AboutSection />
        <ProjectsSection />
        <AIWorkflowsSection />
        <SkillsSection />
        <PerformanceSection />
        <ContactSection />
      </main>

      <Footer />
      <AIChatBot />
    </div>
  );
}
