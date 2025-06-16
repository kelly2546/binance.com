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
  const { isAuthenticated, user, logout } = useMockAuth();
  const [, setLocation] = useLocation();
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
            <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors text-sm font-medium">
              Buy Crypto
            </a>
            <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors text-sm font-medium">
              Markets
            </a>
            <div className="relative group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors flex items-center text-sm font-medium">
                Trade <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors flex items-center text-sm font-medium">
                Futures <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors flex items-center text-sm font-medium">
                Earn <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors flex items-center text-sm font-medium">
                Square <i className="fas fa-chevron-down ml-1 text-xs"></i>
              </a>
            </div>
            <div className="relative group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] transition-colors flex items-center text-sm font-medium">
                More <i className="fas fa-chevron-down ml-1 text-xs"></i>
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
            
            {isAuthenticated ? (
              <>
                <span className="text-[#EAECEF] text-sm">Welcome, {user?.displayName || 'User'}</span>
                <Button 
                  variant="outline"
                  className="text-[#EAECEF] border-[#2b3139] hover:bg-[#FCD535] hover:text-black text-sm font-medium h-8 px-4"
                  onClick={() => setLocation("/dashboard")}
                >
                  Dashboard
                </Button>
                <Button 
                  variant="ghost"
                  className="text-[#848e9c] hover:text-[#EAECEF] text-sm font-medium h-8 px-4"
                  onClick={logout}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="text-[#EAECEF] hover:text-[#FCD535] border-[#2b3139] hover:border-[#FCD535] bg-transparent text-sm font-medium h-8 px-4"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Log In
                </Button>
                <Button 
                  className="bg-[#FCD535] text-black hover:bg-[#e6c230] font-semibold text-sm h-8 px-4"
                  onClick={() => setIsSignUpModalOpen(true)}
                >
                  Sign Up
                </Button>
              </>
            )}
            
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
