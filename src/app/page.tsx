import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import BentoSkills from "@/components/sections/BentoSkills";
import Projects from "@/components/sections/Projects";
import CaseStudies from "@/components/sections/CaseStudies";
import Experience from "@/components/sections/Experience";
import Education from "@/components/sections/Education";
import Certifications from "@/components/sections/Certifications";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      {/* Classic Horizontal Sticky Editorial Navbar */}
      <Navbar />

      {/* Main Editorial Content Sections */}
      <div className="min-h-screen flex flex-col relative z-10 bg-offwhite text-warm-dark font-sans">
        <main className="flex-1">
          <Hero />
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
    </>
  );
}
