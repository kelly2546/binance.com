import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import MobileAppSection from "@/components/MobileAppSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      <div className="min-h-screen bg-[var(--binance-dark)]">
        <Header />
        <HeroSection />
        <MobileAppSection />
        <FAQSection />
        <Footer />
      </div>
    </>
  );
}
