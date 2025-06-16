import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Bell, Globe, Settings, MoreHorizontal, ChevronDown, Copy, QrCode } from "lucide-react";

export default function Withdraw() {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  const [withdrawTo, setWithdrawTo] = useState("Address");
  const [address, setAddress] = useState("");
  const [network, setNetwork] = useState("");
  const [amount, setAmount] = useState("");

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
  };

  return (
    <div className="min-h-screen bg-[#181A20] text-white">
      {/* Header */}
      <header className="bg-[#181A20] h-14 border-b border-[#2b3139]">
        <div className="h-full px-4 flex items-center justify-between max-w-full">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg" 
              alt="Binance" 
              className="h-5 w-auto"
            />
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] text-sm font-medium transition-colors">Buy Crypto</a>
            <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] text-sm font-medium transition-colors">Markets</a>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] text-sm font-medium transition-colors">Trade</a>
              <ChevronDown className="h-3 w-3 text-[#848e9c] group-hover:text-[#FCD535] transition-colors" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] text-sm font-medium transition-colors">Futures</a>
              <ChevronDown className="h-3 w-3 text-[#848e9c] group-hover:text-[#FCD535] transition-colors" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] text-sm font-medium transition-colors">Earn</a>
              <ChevronDown className="h-3 w-3 text-[#848e9c] group-hover:text-[#FCD535] transition-colors" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] text-sm font-medium transition-colors">Square</a>
              <ChevronDown className="h-3 w-3 text-[#848e9c] group-hover:text-[#FCD535] transition-colors" />
            </div>
            <div className="flex items-center space-x-1 cursor-pointer group">
              <a href="#" className="text-[#EAECEF] hover:text-[#FCD535] text-sm font-medium transition-colors">More</a>
              <ChevronDown className="h-3 w-3 text-[#848e9c] group-hover:text-[#FCD535] transition-colors" />
            </div>
          </nav>
          
          {/* Right side */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-[#EAECEF] hover:bg-[#2B3139] h-8 w-8 rounded-sm">
              <Search className="h-4 w-4" />
            </Button>
            <Button className="bg-[#FCD535] text-[#0B0E11] hover:bg-[#e6c230] h-8 px-4 text-sm font-semibold rounded-sm">
              Deposit
            </Button>
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-[#EAECEF] hover:bg-[#2B3139] h-8 w-8 rounded-sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-[#EAECEF] hover:bg-[#2B3139] h-8 w-8 rounded-sm">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-[#EAECEF] hover:bg-[#2B3139] h-8 w-8 rounded-sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-[#EAECEF] hover:bg-[#2B3139] h-8 w-8 rounded-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-[#0b0e11] border-r border-[#2b3139] min-h-[calc(100vh-56px)]">
          <div className="p-4 space-y-3">
            {/* Deposit Crypto */}
            <div className="flex items-center space-x-3 text-[#848e9c] hover:text-white cursor-pointer py-2 px-3 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span className="text-sm">Deposit Crypto</span>
            </div>

            {/* Withdraw Crypto */}
            <div className="flex items-center space-x-3 text-white bg-[#1e2329] cursor-pointer py-2 px-3 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span className="text-sm">Withdraw Crypto</span>
            </div>

            {/* Deposit Fiat */}
            <div className="flex items-center space-x-3 text-[#848e9c] hover:text-white cursor-pointer py-2 px-3 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
              <span className="text-sm">Deposit Fiat</span>
            </div>

            {/* Withdraw Fiat */}
            <div className="flex items-center space-x-3 text-[#848e9c] hover:text-white cursor-pointer py-2 px-3 rounded">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
              </svg>
              <span className="text-sm">Withdraw Fiat</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Withdraw Form */}
          <div className="flex-1 p-6">
            <h1 className="text-white text-xl mb-6 font-medium">Withdraw Crypto</h1>

            <div className="space-y-6">
              {/* Select Coin */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-[#FCD535] rounded-full"></div>
                  <Label className="text-white text-sm font-medium">Select coin</Label>
                </div>
                <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                  <SelectTrigger className="w-full bg-[#1e2329] border-[#2b3139] text-white">
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 bg-[#F7931A] rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">₿</span>
                      </div>
                      <span>BTC</span>
                      <span className="text-[#848e9c]">Bitcoin</span>
                    </div>
                  </SelectTrigger>
                  <SelectContent className="bg-[#1e2329] border-[#2b3139]">
                    <SelectItem value="BTC" className="text-white hover:bg-[#2b3139]">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-[#F7931A] rounded-full"></div>
                        <span>BTC Bitcoin</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="ETH" className="text-white hover:bg-[#2b3139]">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-[#627EEA] rounded-full"></div>
                        <span>ETH Ethereum</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="BNB" className="text-white hover:bg-[#2b3139]">
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-[#F3BA2F] rounded-full"></div>
                        <span>BNB BNB</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Withdraw To */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-[#FCD535] rounded-full"></div>
                  <Label className="text-white text-sm font-medium">Withdraw to</Label>
                </div>
                <div className="flex space-x-1 bg-[#1e2329] rounded p-1">
                  <button
                    onClick={() => setWithdrawTo("Address")}
                    className={`px-4 py-2 text-sm rounded transition-colors ${
                      withdrawTo === "Address"
                        ? "bg-[#FCD535] text-black font-medium"
                        : "text-[#848e9c] hover:text-white"
                    }`}
                  >
                    Address
                  </button>
                  <button
                    onClick={() => setWithdrawTo("Binance user")}
                    className={`px-4 py-2 text-sm rounded transition-colors ${
                      withdrawTo === "Binance user"
                        ? "bg-[#FCD535] text-black font-medium"
                        : "text-[#848e9c] hover:text-white"
                    }`}
                  >
                    Binance user
                  </button>
                </div>

                {withdrawTo === "Address" && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <Input
                        placeholder="Enter Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="bg-[#1e2329] border-[#2b3139] text-white placeholder:text-[#848e9c]"
                      />
                      <div className="flex items-center justify-end space-x-2 mt-2">
                        <button
                          onClick={handleCopyAddress}
                          className="text-[#848e9c] hover:text-white text-xs flex items-center space-x-1"
                        >
                          <Copy className="w-3 h-3" />
                          <span>Paste</span>
                        </button>
                        <button className="text-[#848e9c] hover:text-white text-xs flex items-center space-x-1">
                          <QrCode className="w-3 h-3" />
                          <span>QR</span>
                        </button>
                      </div>
                    </div>

                    <div>
                      <Select value={network} onValueChange={setNetwork}>
                        <SelectTrigger className="w-full bg-[#1e2329] border-[#2b3139] text-white">
                          <SelectValue placeholder="Select network" />
                        </SelectTrigger>
                        <SelectContent className="bg-[#1e2329] border-[#2b3139]">
                          <SelectItem value="bitcoin" className="text-white hover:bg-[#2b3139]">Bitcoin</SelectItem>
                          <SelectItem value="lightning" className="text-white hover:bg-[#2b3139]">Lightning Network</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
              </div>

              {/* Withdraw Amount */}
              <div>
                <div className="flex items-center space-x-2 mb-3">
                  <div className="w-2 h-2 bg-[#FCD535] rounded-full"></div>
                  <Label className="text-white text-sm font-medium">Withdraw amount</Label>
                </div>
                <Input
                  placeholder="0.00000000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-[#1e2329] border-[#2b3139] text-white placeholder:text-[#848e9c] text-right"
                />
                <div className="flex items-center justify-between mt-2 text-xs text-[#848e9c]">
                  <span>Available: 0.00125834 BTC</span>
                  <button className="text-[#FCD535] hover:text-[#e6c230]">Max</button>
                </div>
              </div>

              {/* Submit Button */}
              <Button className="w-full bg-[#FCD535] text-black hover:bg-[#e6c230] font-semibold py-3 mt-8">
                Withdraw
              </Button>
            </div>

            {/* Recent Withdrawals */}
            <div className="mt-12">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white text-lg font-medium">Recent Withdrawals</h3>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2 text-xs text-[#848e9c]">
                    <input type="checkbox" className="rounded border-[#2b3139]" />
                    <span>Hide error notices</span>
                  </label>
                  <button className="text-[#FCD535] text-sm hover:text-[#e6c230]">
                    More {'>'} 
                  </button>
                </div>
              </div>

              <div className="bg-[#1e2329] rounded-lg p-4">
                <div className="flex space-x-1 mb-4">
                  <button className="px-4 py-2 bg-[#FCD535] text-black text-sm rounded font-medium">
                    Address
                  </button>
                  <button className="px-4 py-2 text-[#848e9c] text-sm hover:text-white">
                    Binance user
                  </button>
                </div>
                
                <div className="text-center py-8 text-[#848e9c]">
                  <div className="text-sm">No recent withdrawals</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - FAQ */}
          <div className="w-80 bg-[#0b0e11] border-l border-[#2b3139] p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white text-lg font-medium">FAQ</h3>
              <button className="text-[#FCD535] text-sm hover:text-[#e6c230]">
                More {'>'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-[#848e9c] text-sm hover:text-white cursor-pointer">
                How to withdraw crypto? (Video)
              </div>
              <div className="text-[#848e9c] text-sm hover:text-white cursor-pointer">
                How to Find My Transaction ID (TXID)?
              </div>
              <div className="text-[#848e9c] text-sm hover:text-white cursor-pointer">
                How to Recover My BEP-20 Tokens?
              </div>
              <div className="text-[#848e9c] text-sm hover:text-white cursor-pointer">
                Deposit & Withdrawal Status query
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}