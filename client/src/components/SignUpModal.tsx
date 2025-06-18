
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import EmailVerificationModal from "./EmailVerificationModal";
import PasswordSetupModal from "./PasswordSetupModal";

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SignUpModal({ isOpen, onClose }: SignUpModalProps) {
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [showPasswordSetup, setShowPasswordSetup] = useState(false);
  const [isValidatingEmail, setIsValidatingEmail] = useState(false);
  const { login, error, loading, createEmailAccount } = useFirebaseAuth();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailSubmit = async () => {
    if (!email || !validateEmail(email)) {
      return;
    }

    if (!agreedToTerms) {
      return;
    }

    setShowPasswordSetup(true);
  };

  const handleGoogleSignUp = async () => {
    console.log('SignUpModal: Google signup button clicked');
    try {
      await login();
      onClose();
    } catch (err) {
      console.error('SignUpModal: Error during Google signup:', err);
    }
  };

  const handleEmailVerificationSuccess = () => {
    setShowEmailVerification(false);
    setShowPasswordSetup(true);
  };

  const handlePasswordSetupClose = () => {
    setShowPasswordSetup(false);
    onClose();
    // Reset form
    setEmail("");
    setAgreedToTerms(false);
  };

  const handleMainModalClose = () => {
    if (!showEmailVerification && !showPasswordSetup) {
      onClose();
      // Reset form
      setEmail("");
      setAgreedToTerms(false);
    }
  };

  return (
    <>
      <Dialog open={isOpen && !showEmailVerification && !showPasswordSetup} onOpenChange={handleMainModalClose}>
        <DialogContent className="bg-[#1e2329] border-[#474d57] text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center mt-4">
              Welcome to Binance
            </DialogTitle>
            <DialogDescription className="text-center text-[#848e9c] mt-2">
              Create your account to start trading cryptocurrencies
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            {error && (
              <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-2">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <div>
              <label className="text-sm font-medium mb-1 block">
                Email/Phone number
              </label>
              <Input
                type="email"
                placeholder="Email/Phone (without country code)"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#2b3139] border-[#474d57] text-white placeholder:text-[#848e9c] focus:border-[var(--binance-yellow)] focus:ring-0 h-10"
              />
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="terms"
                checked={agreedToTerms}
                onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                className="data-[state=checked]:bg-[var(--binance-yellow)] data-[state=checked]:border-[var(--binance-yellow)] border-[#474d57] mt-0.5"
              />
              <label htmlFor="terms" className="text-xs text-[#848e9c] leading-tight">
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
              className="w-full bg-[var(--binance-yellow)] text-black font-medium hover:bg-yellow-400 h-10"
              disabled={!email || !validateEmail(email) || !agreedToTerms || isValidatingEmail}
              onClick={handleEmailSubmit}
            >
              {isValidatingEmail ? "Sending Code..." : "Next"}
            </Button>
            
            <div className="text-center py-1">
              <span className="text-[#848e9c] text-sm">or</span>
            </div>
            
            <div className="space-y-2">
              <Button
                variant="outline"
                className="w-full bg-transparent border-[#474d57] text-white hover:bg-[#474d57] h-9"
                onClick={handleGoogleSignUp}
                disabled={loading}
              >
                <img 
                  src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" 
                  alt="Google" 
                  className="w-4 h-4 mr-2" 
                />
                {loading ? 'Redirecting...' : 'Continue with Google'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full bg-transparent border-[#474d57] text-white hover:bg-[#474d57] h-9"
              >
                <img 
                  src="https://www.svgrepo.com/show/303125/apple-logo.svg" 
                  alt="Apple" 
                  className="w-4 h-4 mr-2" 
                />
                Continue with Apple
              </Button>
            </div>
            
            <div className="text-center pt-2">
              <span className="text-[#848e9c] text-xs">
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

      <EmailVerificationModal
        isOpen={showEmailVerification}
        onClose={() => setShowEmailVerification(false)}
        email={email}
        onVerificationSuccess={handleEmailVerificationSuccess}
      />

      <PasswordSetupModal
        isOpen={showPasswordSetup}
        onClose={handlePasswordSetupClose}
        email={email}
      />
    </>
  );
}
