import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Globe, Moon, Menu } from "lucide-react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";

export default function Header() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  return (
    <header className="bg-[var(--binance-dark)] border-b border-[var(--binance-border)] sticky top-0 z-50">
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
            <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors">
              Buy Crypto
            </a>
            <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors">
              Markets
            </a>
            <div className="relative group">
              <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors flex items-center">
                Trade <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors flex items-center">
                Futures <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors flex items-center">
                Earn <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors flex items-center">
                Square <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors flex items-center">
                More <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
          </nav>
          
          {/* Right side */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-[var(--binance-gray)] hover:text-white">
              <Search className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[var(--binance-gray)] hover:text-white">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[var(--binance-gray)] hover:text-white">
              <Moon className="h-4 w-4" />
            </Button>
            <Button 
              variant="outline" 
              className="text-white hover:text-[var(--binance-yellow)] border-[var(--binance-border)] hover:border-[var(--binance-yellow)] bg-transparent"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Log In
            </Button>
            <Button 
              className="bg-[var(--binance-yellow)] text-black hover:bg-yellow-400 font-medium"
              onClick={() => setIsSignUpModalOpen(true)}
            >
              Sign Up
            </Button>
            <Button 
              variant="outline"
              className="text-white border-[var(--binance-border)] hover:bg-[var(--binance-yellow)] hover:text-black"
              onClick={() => window.location.href = "/dashboard"}
            >
              Dashboard
            </Button>
            <Button variant="ghost" size="icon" className="md:hidden text-white">
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
