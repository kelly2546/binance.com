import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CryptoPriceCard from "./CryptoPriceCard";
import NewsSection from "./NewsSection";
import SignUpModal from "./SignUpModal";

export default function HeroSection() {
  const [userCount, setUserCount] = useState(277373228);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount(prev => prev + Math.floor(Math.random() * 100));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="bg-[#181A20] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="md:text-7xl font-bold text-[#FCD535] mb-4 text-[80px]">
              {userCount.toLocaleString()}
            </div>
            <h1 className="md:text-5xl font-bold mb-8 text-[#EAECEF] text-[91px]">
              USERS<br />TRUST US
            </h1>
            
            {/* Sign Up Form */}
            <div className="mb-8">
              <div className="flex max-w-md gap-2">
                <Input 
                  type="text" 
                  placeholder="Email/Phone number" 
                  className="flex-1 bg-[#181a20] border-[#474d57] rounded-2xl text-[#000000] placeholder:text-[#848e9c] focus:border-[#FCD535] focus:ring-0 h-12 px-4"
                />
                <Button 
                  className="bg-[#FCD535] text-black rounded-2xl font-semibold hover:bg-[#e6c230] h-12 px-8 border-0"
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Sign Up
                </Button>
              </div>
            </div>
            
            {/* Or Continue With */}
            <div className="mb-8">
              <p className="text-[#848e9c] mb-4">Or Continue With</p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-transparent border-[#2b3139] hover:border-[#FCD535] text-[#848e9c] hover:text-[#EAECEF]"
                >
                  <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" alt="Google" className="w-6 h-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-transparent border-[#2b3139] hover:border-[#FCD535] text-[#848e9c] hover:text-[#EAECEF]"
                >
                  <img src="https://www.svgrepo.com/show/303125/apple-logo.svg" alt="Apple" className="w-6 h-6" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-transparent border-[#2b3139] hover:border-[#FCD535] text-[#848e9c] hover:text-[#EAECEF]"
                >
                  <img src="https://www.svgrepo.com/show/339458/qr-code.svg" alt="QR Code" className="w-6 h-6" />
                </Button>
              </div>
            </div>
            
            {/* Download App */}
            <div>
              <p className="text-[#848e9c] mb-4">Download App</p>
              <div className="flex space-x-4">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-transparent border-[#2b3139] hover:border-[#FCD535] text-[#848e9c] hover:text-[#EAECEF]"
                >
                  <i className="fab fa-google-play text-xl"></i>
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="w-12 h-12 bg-transparent border-[#2b3139] hover:border-[#FCD535] text-[#848e9c] hover:text-[#EAECEF]"
                >
                  <i className="fab fa-apple text-xl"></i>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Right Content - Crypto Prices and News */}
          <div className="space-y-6">
            <CryptoPriceCard />
            <NewsSection />
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
