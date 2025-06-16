import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Globe, Moon, Menu } from "lucide-react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

export default function Header() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <header className="bg-[#181A20] border-b border-[#2b3139] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg" 
              alt="Binance" 
              className="h-8 w-auto"
            />
          </div>
          
          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors text-lg font-bold">
              Buy Crypto
            </a>
            <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors text-lg font-bold">
              Markets
            </a>
            <div className="relative group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors flex items-center text-lg font-bold">
                Trade <i className="fas fa-chevron-down ml-1 text-sm"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors flex items-center text-lg font-bold">
                Futures <i className="fas fa-chevron-down ml-1 text-sm"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors flex items-center text-lg font-bold">
                Earn <i className="fas fa-chevron-down ml-1 text-sm"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors flex items-center text-lg font-bold">
                Square <i className="fas fa-chevron-down ml-1 text-sm"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors flex items-center text-lg font-bold">
                More <i className="fas fa-chevron-down ml-1 text-sm"></i>
              </a>
            </div>
          </nav>
          
          {/* Right side */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-[#EAECEF] h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-[#EAECEF] h-8 w-8">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-[#EAECEF] h-8 w-8">
              <Moon className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="text-[#EAECEF] hover:text-[#FCD535] border-[#2b3139] hover:border-[#FCD535] bg-transparent text-lg font-bold h-10 px-6"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log In
            </Button>
            <Button 
              className="bg-[#FCD535] text-black hover:bg-[#e6c230] font-bold text-lg h-10 px-6"
              onClick={() => setIsSignUpModalOpen(true)}
            >
              Sign Up
            </Button>
            <Button 
              variant="outline"
              className="text-[#EAECEF] border-[#2b3139] hover:bg-[#FCD535] hover:text-black text-lg font-bold h-10 px-6"
              onClick={() => window.location.href = "/dashboard"}
            >
              Dashboard
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-[#EAECEF] h-8 w-8">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
      
      <SignUpModal 
        isOpen={isSignUpModalOpen} 
        onClose={() => setIsSignUpModalOpen(false)} 
      />
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
    </header>
  );
}
