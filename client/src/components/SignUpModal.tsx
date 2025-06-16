import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { login, loading, error } = useFirebaseAuth();

  const handleGoogleSignUp = async () => {
    console.log('Google Sign Up clicked');
    try {
      console.log('Attempting to login...');
      await login();
      console.log('Login call completed');
      onClose();
    } catch (err) {
      console.error('Sign up failed:', err);
      // Show error to user
      if (err instanceof Error) {
        alert(`Sign up failed: ${err.message}`);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#1e2329] border-[#474d57] text-white max-w-md">
        <DialogHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute -top-4 -right-4 text-white hover:bg-[#474d57]"
          >
            <X className="h-4 w-4" />
          </Button>
          <DialogTitle className="text-2xl font-bold text-center mt-4">
            Welcome to Binance
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Email/Phone number
            </label>
            <Input
              type="text"
              placeholder="Email/Phone (without country code)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#2b3139] border-[#474d57] text-white placeholder:text-[#848e9c] focus:border-[var(--binance-yellow)] focus:ring-0"
            />
          </div>
          
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
              className="data-[state=checked]:bg-[var(--binance-yellow)] data-[state=checked]:border-[var(--binance-yellow)] border-[#474d57] mt-1"
            />
            <label htmlFor="terms" className="text-sm text-[#848e9c] leading-relaxed">
              By creating an account, I agree to Binance's{" "}
              <a href="#" className="text-[var(--binance-yellow)] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[var(--binance-yellow)] hover:underline">
                Privacy Notice
              </a>
              .
            </label>
          </div>
          
          <Button
            className="w-full bg-[var(--binance-yellow)] text-black font-medium hover:bg-yellow-400 h-12"
            disabled={!email || !agreedToTerms}
            onClick={() => window.location.href = "/api/login"}
          >
            Next
          </Button>
          
          <div className="text-center">
            <span className="text-[#848e9c]">or</span>
          </div>
          
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full bg-transparent border-[#474d57] text-white hover:bg-[#474d57] h-12"
              onClick={handleGoogleSignUp}
              disabled={loading}
            >
              <img 
                src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" 
                alt="Google" 
                className="w-5 h-5 mr-3" 
              />
              {loading ? 'Signing up...' : 'Continue with Google'}
            </Button>
            
            {error && (
              <div className="text-red-400 text-sm text-center mt-2">
                {error}
              </div>
            )}
            
            <Button
              variant="outline"
              className="w-full bg-transparent border-[#474d57] text-white hover:bg-[#474d57] h-12"
            >
              <img 
                src="https://www.svgrepo.com/show/303125/apple-logo.svg" 
                alt="Apple" 
                className="w-5 h-5 mr-3" 
              />
              Continue with Apple
            </Button>
            
            <Button
              variant="outline"
              className="w-full bg-transparent border-[#474d57] text-white hover:bg-[#474d57] h-12"
            >
              <svg className="w-5 h-5 mr-3 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
              </svg>
              Continue with Telegram
            </Button>
          </div>
          
          <div className="text-center pt-4">
            <span className="text-[#848e9c] text-sm">
              <a href="#" className="text-[var(--binance-yellow)] hover:underline">
                Sign up as an entity
              </a>
              {" "}or{" "}
              <a href="#" className="text-[var(--binance-yellow)] hover:underline">
                Log in
              </a>
            </span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}