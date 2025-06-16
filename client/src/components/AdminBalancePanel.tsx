import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateUserCryptoBalance } from "@/lib/firebase";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

export default function AdminBalancePanel() {
  const { userProfile } = useFirebaseAuth();
  const [selectedCrypto, setSelectedCrypto] = useState("");
  const [newBalance, setNewBalance] = useState("");
  const [updating, setUpdating] = useState(false);

  const handleUpdateBalance = async () => {
    if (!userProfile?.uid || !selectedCrypto || !newBalance) return;
    
    setUpdating(true);
    try {
      const success = await updateUserCryptoBalance(
        userProfile.uid, 
        selectedCrypto, 
        parseFloat(newBalance)
      );
      
      if (success) {
        setNewBalance("");
        alert("Balance updated successfully!");
      } else {
        alert("Failed to update balance");
      }
    } catch (error) {
      console.error("Error updating balance:", error);
      alert("Error updating balance");
    } finally {
      setUpdating(false);
    }
  };

  if (!userProfile) {
    return (
      <Card className="bg-[#1e2329] border-[#474d57] text-white">
        <div className="p-6">
          <p className="text-center text-[#848e9c]">Please sign in to access admin panel</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="bg-[#1e2329] border-[#474d57] text-white">
      
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Select Cryptocurrency</label>
            <select 
              value={selectedCrypto}
              onChange={(e) => setSelectedCrypto(e.target.value)}
              className="w-full p-2 bg-[#181a20] border border-[#474d57] rounded text-white"
            >
              <option value="">Select crypto...</option>
              {userProfile.cryptoBalances?.map((crypto) => (
                <option key={crypto.symbol} value={crypto.symbol}>
                  {crypto.symbol} - {crypto.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">New Balance</label>
            <Input
              type="number"
              step="0.00000001"
              value={newBalance}
              onChange={(e) => setNewBalance(e.target.value)}
              placeholder="Enter new balance amount"
              className="bg-[#181a20] border-[#474d57] text-white"
            />
          </div>
          
          <Button
            onClick={handleUpdateBalance}
            disabled={!selectedCrypto || !newBalance || updating}
            className="w-full bg-[#FCD535] text-black hover:bg-[#e6c230]"
          >
            {updating ? "Updating..." : "Update Balance"}
          </Button>
          
          <div className="text-xs text-[#848e9c] mt-4">
            <p>• Changes will appear in real-time across all user interfaces</p>
            <p>• Balances are stored in Firebase Firestore</p>
            <p>• All updates are automatically synchronized</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}