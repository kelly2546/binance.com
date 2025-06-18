import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, Globe, Moon, Menu } from "lucide-react";
import SignUpModal from "./SignUpModal";
import LoginModal from "./LoginModal";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useLocation } from "wouter";

export default function Header() {
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const { isAuthenticated, userProfile, logout } = useFirebaseAuth();
  const [, setLocation] = useLocation();
  return (
    <header className="bg-binance sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <div className="flex items-center">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg" 
            alt="Binance" 
            className="h-8 w-auto"
          />
        </div>
        
        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
            <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">
              Buy Crypto
            </a>
            <a href="#" className="text-secondary hover:text-primary transition-colors text-sm font-medium">
              Markets
            </a>
            <div className="relative group">
              <a href="#" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
                Trade <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
                Futures <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
                Earn <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
                Square <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-secondary hover:text-primary transition-colors flex items-center text-sm font-medium">
                More <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
        </nav>
        
        {/* Right side */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Button variant="ghost" size="icon" className="hidden sm:flex text-icon-normal hover:text-white h-10 w-10 touch-manipulation">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex text-icon-normal hover:text-white h-10 w-10 touch-manipulation">
            <Globe className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex text-icon-normal hover:text-white h-10 w-10 touch-manipulation">
            <Moon className="h-4 w-4" />
          </Button>
          
          {isAuthenticated ? (
            <>
              <span className="hidden md:inline text-secondary text-sm truncate max-w-20">Welcome, {userProfile?.displayName || 'User'}</span>
              <Button 
                variant="outline"
                className="hidden sm:flex text-secondary border-line hover:bg-primary hover:text-black text-sm font-medium h-10 px-4 touch-manipulation"
                onClick={() => setLocation("/dashboard")}
              >
                Dashboard
              </Button>
              <Button 
                variant="ghost"
                className="hidden sm:flex text-icon-normal hover:text-white text-sm font-medium h-10 px-4 touch-manipulation"
                onClick={logout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="outline" 
                className="hidden sm:flex text-secondary hover:text-primary border-line hover:border-primary bg-transparent text-sm font-medium h-10 px-4 touch-manipulation"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Log In
              </Button>
              <Button 
                className="bg-primary text-black hover:bg-primary-hover font-semibold text-sm h-10 px-4 touch-manipulation"
                onClick={() => setIsSignUpModalOpen(true)}
              >
                Sign Up
              </Button>
            </>
          )}
          
          <Button variant="ghost" size="icon" className="lg:hidden text-white h-10 w-10 touch-manipulation">
            <Menu className="h-4 w-4" />
          </Button>
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
