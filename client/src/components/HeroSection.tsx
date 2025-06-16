import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CryptoPriceCard from "./CryptoPriceCard";

export default function HeroSection() {
  const [userCount, setUserCount] = useState(277372927);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 100));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[var(--binance-dark)] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="text-6xl md:text-7xl font-bold text-[var(--binance-yellow)] mb-4">
              {userCount.toLocaleString()}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-8">
              USERS<br />TRUST US
            </h1>
            
            {/* Sign Up Form */}
            <div className="mb-8">
              <div className="flex">
                <Input 
                  type="text" 
                  placeholder="Email/Phone number" 
                  className="flex-1 bg-[var(--binance-card)] border-[var(--binance-border)] rounded-l-md rounded-r-none text-white placeholder:text-[var(--binance-gray)] focus:border-[var(--binance-yellow)]"
                />
                <Button className="bg-[var(--binance-yellow)] text-black rounded-l-none rounded-r-md font-medium hover:bg-yellow-400">
                  Sign Up
                </Button>
              </div>
            </div>
            
            {/* Or Continue With */}
            <div className="mb-8">
              <p className="text-[var(--binance-gray)] mb-4">Or Continue With</p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-[var(--binance-card)] border-[var(--binance-border)] hover:border-[var(--binance-yellow)]"
                >
                  <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" className="w-6 h-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-[var(--binance-card)] border-[var(--binance-border)] hover:border-[var(--binance-yellow)]"
                >
                  <img src="https://www.svgrepo.com/show/303125/apple-logo.svg" alt="Apple" className="w-6 h-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-[var(--binance-card)] border-[var(--binance-border)] hover:border-[var(--binance-yellow)]"
                >
                  <img src="https://www.svgrepo.com/show/339458/qr-code.svg" alt="QR Code" className="w-6 h-6" />
                </Button>
              </div>
            </div>
            
            {/* Download App */}
            <div>
              <p className="text-[var(--binance-gray)] mb-4">Download App</p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-[var(--binance-card)] border-[var(--binance-border)] hover:border-[var(--binance-yellow)]"
                >
                  <i className="fab fa-google-play text-xl"></i>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-[var(--binance-card)] border-[var(--binance-border)] hover:border-[var(--binance-yellow)]"
                >
                  <i className="fab fa-apple text-xl"></i>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Content - Crypto Prices */}
          <CryptoPriceCard />
        </div>
      </div>
    </section>
  );
}
