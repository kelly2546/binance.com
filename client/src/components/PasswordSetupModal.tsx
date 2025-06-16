
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Eye, EyeOff } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import { useToast } from "@/hooks/use-toast";

interface PasswordSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string;
}

export default function PasswordSetupModal({ isOpen, onClose, email }: PasswordSetupModalProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const { createEmailAccount, loading } = useFirebaseAuth();
  const { toast } = useToast();

  const validatePassword = (pass: string) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(pass);
    const hasLowerCase = /[a-z]/.test(pass);
    const hasNumbers = /\d/.test(pass);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pass);

    return pass.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar;
  };

  const handleSubmit = async () => {
    setError("");

    if (!validatePassword(password)) {
      setError("Password must be at least 8 characters and contain uppercase, lowercase, number, and special character");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!agreedToTerms) {
      setError("Please agree to the terms and conditions");
      return;
    }

    try {
      await createEmailAccount(email, password);
      // Show success toast notification
      toast({
        title: "🔔 Account created successfully!",
        description: "Please check your email and verify your account before accessing the dashboard.",
        duration: 8000,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to create account");
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
            <div className="flex items-center justify-center mb-4">
              <div className="text-[var(--binance-yellow)] text-3xl font-bold">
                ◆ BINANCE
              </div>
            </div>
            Set up your password
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          <div className="text-center text-[#848e9c] text-sm">
            Email: {email}
          </div>

          {error && (
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
          
          <div>
            <label className="text-sm font-medium mb-2 block">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                className="bg-[#2b3139] border-[#474d57] text-white placeholder:text-[#848e9c] focus:border-[var(--binance-yellow)] focus:ring-0 h-12 pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-12 w-12 text-[#848e9c] hover:text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <div className="mt-2 text-xs text-[#848e9c]">
              Must contain at least 8 characters with uppercase, lowercase, number, and special character
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">
              Confirm Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                className="bg-[#2b3139] border-[#474d57] text-white placeholder:text-[#848e9c] focus:border-[var(--binance-yellow)] focus:ring-0 h-12 pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-12 w-12 text-[#848e9c] hover:text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
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
            disabled={!password || !confirmPassword || !agreedToTerms || loading}
            onClick={handleSubmit}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
