import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Eye, EyeOff, QrCode } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const { login, loginWithEmail, error, loading } = useFirebaseAuth();

  const handleLogin = async () => {
    if (isEmailLogin) {
      await loginWithEmail(email, password);
    } else {
      await login();
    }
    onClose();
  };

  const handleGoogleLogin = async () => {
    console.log('LoginModal: Google login button clicked');
    try {
      await login();
      // Only close modal if login succeeds (though with redirect, this may not be reached)
      onClose();
    } catch (err) {
      console.error('LoginModal: Error during Google login:', err);
      // Modal will stay open to show error
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
          <DialogDescription className="text-left text-[#848e9c] mt-2">
            Sign in to your account to access your crypto portfolio
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
              Email
            </label>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsEmailLogin(true);
              }}
              className="bg-[#2b3139] border-[#474d57] text-white placeholder:text-[#848e9c] focus:border-[var(--binance-yellow)] focus:ring-0 h-10"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-[#2b3139] border-[#474d57] text-white placeholder:text-[#848e9c] focus:border-[var(--binance-yellow)] focus:ring-0 h-10"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-2 -translate-y-1/2 text-white hover:bg-[#474d57] h-6 w-6"
              >
                {showPassword ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
              </Button>
            </div>
          </div>

          <Button
            className="w-full bg-[var(--binance-yellow)] text-black font-medium hover:bg-yellow-400 h-10"
            disabled={!email || !password}
            onClick={handleLogin}
          >
            Log In
          </Button>

          <div className="text-center py-1">
            <span className="text-[#848e9c] text-sm">or</span>
          </div>

          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full bg-transparent border-[#474d57] text-white hover:bg-[#474d57] h-9"
              onClick={handleGoogleLogin}
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
              onClick={handleLogin}
              disabled={!email}
            >
              <img 
                src="https://www.svgrepo.com/show/303125/apple-logo.svg" 
                alt="Apple" 
                className="w-4 h-4 mr-2" 
              />
              Continue with Apple
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}