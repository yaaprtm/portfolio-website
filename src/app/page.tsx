import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import dynamic from "next/dynamic";

// Lazy load komponen yang tidak immediately visible untuk faster initial page load
const BentoSkills = dynamic(() => import("@/components/sections/BentoSkills"), {
  loading: () => <div className="min-h-screen" />,
});
const Projects = dynamic(() => import("@/components/sections/Projects"), {
  loading: () => <div className="min-h-screen" />,
});
const CaseStudies = dynamic(() => import("@/components/sections/CaseStudies"), {
  loading: () => <div className="min-h-screen" />,
});
const Experience = dynamic(() => import("@/components/sections/Experience"), {
  loading: () => <div className="min-h-screen" />,
});
const Education = dynamic(() => import("@/components/sections/Education"), {
  loading: () => <div className="min-h-screen" />,
});
const Certifications = dynamic(() => import("@/components/sections/Certifications"), {
  loading: () => <div className="min-h-screen" />,
});
const Contact = dynamic(() => import("@/components/sections/Contact"), {
  loading: () => <div className="min-h-screen" />,
});
const Footer = dynamic(() => import("@/components/layout/Footer"));

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
