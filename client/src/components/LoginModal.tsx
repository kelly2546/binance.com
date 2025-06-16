import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, QrCode } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");

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
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg" 
                alt="Binance" 
                className="h-8 w-auto mr-2"
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-[#474d57]"
            >
              <QrCode className="h-5 w-5" />
            </Button>
          </div>
          <DialogTitle className="text-3xl font-bold text-left mt-4">
            Log in
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
              className="bg-[#2b3139] border-[#474d57] text-white placeholder:text-[#848e9c] focus:border-[var(--binance-yellow)] focus:ring-0 h-12"
            />
          </div>
          
          <Button
            className="w-full bg-[var(--binance-yellow)] text-black font-medium hover:bg-yellow-400 h-12"
            disabled={!email}
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
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7v10c0 5.55 3.84 9.95 9 11 5.16-1.05 9-5.45 9-11V7l-10-5z"/>
              </svg>
              Continue with Passkey
            </Button>
            
            <Button
              variant="outline"
              className="w-full bg-transparent border-[#474d57] text-white hover:bg-[#474d57] h-12"
            >
              <img 
                src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" 
                alt="Google" 
                className="w-5 h-5 mr-3" 
              />
              Continue with Google
            </Button>
            
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
        </div>
      </DialogContent>
    </Dialog>
  );
}