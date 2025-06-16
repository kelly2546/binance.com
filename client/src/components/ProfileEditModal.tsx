import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { X, Edit3 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentName: string;
  currentSticker: string;
  onSave: (name: string, sticker: string) => void;
}

// Pre-made sticker collection
const STICKERS = [
  "🦊", "🐱", "🐶", "🐰", "🐸", "🐝", "🐧", "🦁",
  "🐯", "🐻", "🐼", "🐨", "🦄", "🐲", "🦋", "🐢",
  "🦉", "🐺", "🐹", "🐷"
];

export default function ProfileEditModal({ 
  isOpen, 
  onClose, 
  currentName, 
  currentSticker, 
  onSave 
}: ProfileEditModalProps) {
  const [name, setName] = useState(currentName);
  const [selectedSticker, setSelectedSticker] = useState(currentSticker);
  const { toast } = useToast();

  const handleSave = () => {
    if (!name.trim()) {
      toast({
        title: "Name required",
        description: "Please enter a valid name.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    if (name.trim().length < 2) {
      toast({
        title: "Name too short",
        description: "Name must be at least 2 characters long.",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    onSave(name.trim(), selectedSticker);
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
      duration: 3000,
    });
    onClose();
  };

  const handleReset = () => {
    setName(currentName);
    setSelectedSticker(currentSticker);
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
          <DialogTitle className="text-xl font-semibold text-center mt-4">
            Edit Profile
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pt-4">
          {/* Current Preview */}
          <div className="flex items-center space-x-3 p-4 bg-[#2b3139] rounded-lg">
            <div className="text-2xl">{selectedSticker}</div>
            <div>
              <div className="text-[#EAECEF] font-medium">{name || "Enter your name"}</div>
              <div className="text-[#848e9c] text-sm">Preview</div>
            </div>
          </div>

          {/* Name Input */}
          <div>
            <label className="text-sm font-medium mb-2 block text-[#EAECEF]">
              Display Name
            </label>
            <Input
              type="text"
              placeholder="Enter your display name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={20}
              className="bg-[#2b3139] border-[#474d57] text-white placeholder:text-[#848e9c] focus:border-[var(--binance-yellow)] focus:ring-0"
            />
            <div className="text-xs text-[#848e9c] mt-1">
              {name.length}/20 characters
            </div>
          </div>

          {/* Sticker Selection */}
          <div>
            <label className="text-sm font-medium mb-3 block text-[#EAECEF]">
              Choose Your Sticker
            </label>
            <div className="grid grid-cols-8 gap-2">
              {STICKERS.map((sticker, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedSticker(sticker)}
                  className={`
                    text-2xl p-2 rounded-lg transition-all hover:bg-[#474d57]
                    ${selectedSticker === sticker 
                      ? 'bg-[var(--binance-yellow)] ring-2 ring-[var(--binance-yellow)] ring-opacity-50' 
                      : 'bg-[#2b3139]'
                    }
                  `}
                >
                  {sticker}
                </button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-2">
            <Button
              onClick={handleReset}
              variant="outline"
              className="flex-1 bg-[#2b3139] border-[#474d57] text-[#EAECEF] hover:bg-[#474d57]"
            >
              Reset
            </Button>
            <Button
              onClick={handleSave}
              className="flex-1 bg-[var(--binance-yellow)] text-black hover:bg-yellow-400 font-medium"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}