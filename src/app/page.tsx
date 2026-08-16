import Sidebar from "@/components/layout/Sidebar";
import Footer from "@/components/layout/Footer";
import TerminalHero from "@/components/sections/TerminalHero";
import About from "@/components/sections/About";
import BentoSkills from "@/components/sections/BentoSkills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import AiAssistant from "@/components/ui/AiAssistant";
import LiquidBackground from "@/components/ui/LiquidBackground";

export default function Home() {
  return (
    <>
      {/* Root Level Liquid Morphing Shapes Background */}
      <LiquidBackground />

      {/* Fixed Desktop Sidebar & Mobile Top/Drawer Navigation */}
      <Sidebar />

      {/* Main Content Area — Padded on desktop (lg:pl-72 xl:pl-80) to sit beside fixed sidebar */}
      <div className="lg:pl-72 xl:pl-80 min-h-screen flex flex-col transition-all duration-300 relative z-10">
        <main className="flex-1">
          <TerminalHero />
          <About />
          <BentoSkills />
          <Projects />
          <Experience />
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
