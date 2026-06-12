import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Pricing from "@/components/Pricing";
import LeadForm from "@/components/LeadForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <VideoSection />
        <Features />
        <Gallery />
        <Pricing />
        <LeadForm />
      </main>
      <Footer />
    </>
  );
}
