import dynamic from "next/dynamic";
import NetworkNavigation from "@/components/layout/NetworkNavigation";
import Footer from "@/components/layout/Footer";
import TerminalHero from "@/components/sections/TerminalHero";
import About from "@/components/sections/About";
import BentoSkills from "@/components/sections/BentoSkills";
import Projects from "@/components/sections/Projects";
import CaseStudies from "@/components/sections/CaseStudies";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import LiquidBackground from "@/components/ui/LiquidBackground";

const AiAssistant = dynamic(() => import("@/components/ui/AiAssistant"), {
  ssr: false,
});

export default function Home() {
  return (
    <>
      {/* Root Level Liquid Morphing Shapes & Network Background */}
      <LiquidBackground />

      {/* Interactive Network Topology Map Navigation */}
      <NetworkNavigation />

      {/* Main Content Area */}
      <div className="min-h-screen flex flex-col transition-all duration-300 relative z-10">
        <main className="flex-1">
          <TerminalHero />
          <About />
          <BentoSkills />
          <Projects />
          <CaseStudies />
          <Experience />
          <Education />
          <Certifications />
          <Contact />
        </main>

        <Footer />
      </div>

      {/* Interactive AI Assistant Floating Widget */}
      <AiAssistant />
    </>
  );
}
