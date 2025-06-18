import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CryptoPriceCard from "./CryptoPriceCard";
import NewsSection from "./NewsSection";
import SignUpModal from "./SignUpModal";

export default function HeroSection() {
  const [userCount, setUserCount] = useState(277373501);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 100));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-binance pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="flex-1 flex flex-col justify-between bg-binance-card border border-line rounded-2xl p-6 lg:p-8">
            {/* Hero Stats */}
            <div className="py-4 mb-6">
              <div className="hero-number mb-4">
                {userCount.toLocaleString()}
              </div>
              <h1 className="hero-text">
                USERS<br />TRUST US
              </h1>
            </div>
            
            {/* Sign Up Form */}
            <div className="mb-6">
              <div className="flex max-w-md gap-2">
                <Input 
                  type="text" 
                  placeholder="Email/Phone number" 
                  className="flex-1 bg-binance border-line rounded-2xl text-secondary placeholder:text-icon-normal focus:border-primary focus:ring-0 h-12 px-4"
                />
                <Button 
                  className="bg-primary text-black rounded-2xl font-semibold hover:bg-primary-hover h-12 px-8 border-0 text-sm"
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Sign Up
                </Button>
              </div>
            </div>
            
            {/* Or Continue With */}
            <div className="mb-6">
              <p className="text-icon-normal mb-4 text-sm">Or Continue With</p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-transparent border-line hover:border-primary text-icon-normal hover:text-secondary"
                >
                  <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" className="w-6 h-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-transparent border-line hover:border-primary text-icon-normal hover:text-secondary"
                >
                  <img src="https://www.svgrepo.com/show/303125/apple-logo.svg" alt="Apple" className="w-6 h-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-transparent border-line hover:border-primary text-icon-normal hover:text-secondary"
                >
                  <img src="https://www.svgrepo.com/show/339458/qr-code.svg" alt="QR Code" className="w-6 h-6" />
                </Button>
              </div>
            </div>
            
            {/* Download App */}
            <div>
              <p className="text-icon-normal mb-4 text-sm">Download App</p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-transparent border-line hover:border-primary text-icon-normal hover:text-secondary"
                >
                  <i className="fab fa-google-play text-xl"></i>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-transparent border-line hover:border-primary text-icon-normal hover:text-secondary"
                >
                  <i className="fab fa-apple text-xl"></i>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Content - Popular Coins */}
          <div className="flex-1">
            <CryptoPriceCard />
          </div>
        </div>
      </div>
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)} 
      />
    </section>
  );
}
