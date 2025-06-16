
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface EmailVerificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
  onVerificationSuccess: () => void;
}

export default function EmailVerificationModal({ 
  isOpen, 
  onClose, 
  email, 
  onVerificationSuccess 
}: EmailVerificationModalProps) {
  const [verificationCode, setVerificationCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleSubmit = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      setError("Please enter a valid 6-digit code");
      return;
    }

    // Simulate verification (replace with actual verification logic)
    if (verificationCode === "123456") {
      onVerificationSuccess();
      onClose();
    } else {
      setError("Invalid verification code. Please try again.");
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    setError("");
    
    // Simulate sending code (replace with actual send code logic)
    setTimeout(() => {
      setIsResending(false);
      setTimeLeft(30 * 60); // Reset timer
    }, 2000);
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
            <div className="flex items-center justify-center mb-4">
              <div className="text-[var(--binance-yellow)] text-3xl font-bold">
                ◆ BINANCE
              </div>
            </div>
            Verify your email
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <DialogDescription className="text-[#848e9c] text-center">
            A 6-digit code has been sent to {email}. Please enter it within the next {formatTime(timeLeft)}.
          </DialogDescription>

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              Verification Code
            </label>
            <div className="relative">
              <Input
                type="text"
                placeholder="Code Sent"
                value={verificationCode}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setVerificationCode(value);
                  setError("");
                }}
                className="bg-[#2b3139] border-[#474d57] text-white placeholder:text-[#848e9c] focus:border-[var(--binance-yellow)] focus:ring-0 h-12"
                maxLength={6}
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#848e9c] text-sm flex items-center">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1L9 7V9C9 10 8 11 7 11V13H17V11C16 11 15 10 15 9Z"/>
                </svg>
              </div>
            </div>
          </div>
          
          <Button
            className="w-full bg-[var(--binance-yellow)] text-black font-medium hover:bg-yellow-400 h-12"
            disabled={!verificationCode || verificationCode.length !== 6}
            onClick={handleSubmit}
          >
            Next
          </Button>
          
          <div className="text-center">
            <button
              onClick={handleResendCode}
              disabled={isResending || timeLeft > 0}
              className="text-[var(--binance-yellow)] hover:underline text-sm disabled:text-[#848e9c] disabled:no-underline"
            >
              {isResending ? "Sending..." : timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Didn't receive the code?"}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
