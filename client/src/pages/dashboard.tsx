import { useTestAuth } from "@/hooks/useTestAuth";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, Settings, Globe, MoreHorizontal, ChevronDown, TrendingUp } from "lucide-react";
import type { User } from "@shared/schema";

export default function Dashboard() {
  const { isLoading, user } = useTestAuth() as { 
    isAuthenticated: boolean; 
    isLoading: boolean; 
    user: User | undefined; 
  };

  const { data: cryptoData } = useQuery({
    queryKey: ["/api/crypto"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#181a20] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181a20]">
      {/* Header */}
      <header className="bg-[#181a20] border-b border-[#2b3139] h-16">
        <div className="h-full px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg" 
              alt="Binance" 
              className="h-6 w-auto"
            />
          </div>
          
          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <a href="#" className="text-white hover:text-[#f0b90b] text-sm">Buy Crypto</a>
            <a href="#" className="text-white hover:text-[#f0b90b] text-sm">Markets</a>
            <div className="flex items-center space-x-1">
              <a href="#" className="text-white hover:text-[#f0b90b] text-sm">Trade</a>
              <ChevronDown className="h-3 w-3 text-[#848e9c]" />
            </div>
            <div className="flex items-center space-x-1">
              <a href="#" className="text-white hover:text-[#f0b90b] text-sm">Futures</a>
              <ChevronDown className="h-3 w-3 text-[#848e9c]" />
            </div>
            <div className="flex items-center space-x-1">
              <a href="#" className="text-white hover:text-[#f0b90b] text-sm">Earn</a>
              <ChevronDown className="h-3 w-3 text-[#848e9c]" />
            </div>
            <div className="flex items-center space-x-1">
              <a href="#" className="text-white hover:text-[#f0b90b] text-sm">Square</a>
              <ChevronDown className="h-3 w-3 text-[#848e9c]" />
            </div>
            <div className="flex items-center space-x-1">
              <a href="#" className="text-white hover:text-[#f0b90b] text-sm">More</a>
              <ChevronDown className="h-3 w-3 text-[#848e9c]" />
            </div>
          </nav>
          
          {/* Right side */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-white h-8 w-8">
              <Search className="h-4 w-4" />
            </Button>
            <Button className="bg-[#f0b90b] text-black hover:bg-[#d9a709] h-8 px-4 text-sm font-medium">
              Deposit
            </Button>
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-white h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-white h-8 w-8">
              <Globe className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-white h-8 w-8">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-[#848e9c] hover:text-white h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-[#181a20] min-h-[calc(100vh-64px)] border-r border-[#2b3139]">
          <div className="p-4">
            {/* Dashboard */}
            <div className="mb-6">
              <div className="flex items-center px-3 py-2 text-white bg-[#474d57] rounded text-sm">
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Dashboard
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1">
              <div className="flex items-center justify-between px-3 py-2 text-[#848e9c] hover:text-white hover:bg-[#2b3139] rounded text-sm cursor-pointer">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                  </svg>
                  Assets
                </div>
                <ChevronDown className="h-3 w-3" />
              </div>
              
              <div className="flex items-center justify-between px-3 py-2 text-[#848e9c] hover:text-white hover:bg-[#2b3139] rounded text-sm cursor-pointer">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                  Orders
                </div>
                <ChevronDown className="h-3 w-3" />
              </div>
              
              <div className="flex items-center px-3 py-2 text-[#848e9c] hover:text-white hover:bg-[#2b3139] rounded text-sm cursor-pointer">
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Rewards Hub
              </div>
              
              <div className="flex items-center px-3 py-2 text-[#848e9c] hover:text-white hover:bg-[#2b3139] rounded text-sm cursor-pointer">
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                Referral
              </div>
              
              <div className="flex items-center justify-between px-3 py-2 text-[#848e9c] hover:text-white hover:bg-[#2b3139] rounded text-sm cursor-pointer">
                <div className="flex items-center">
                  <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                  Account
                </div>
                <ChevronDown className="h-3 w-3" />
              </div>
              
              <div className="flex items-center px-3 py-2 text-[#848e9c] hover:text-white hover:bg-[#2b3139] rounded text-sm cursor-pointer">
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                Sub Accounts
              </div>
              
              <div className="flex items-center px-3 py-2 text-[#848e9c] hover:text-white hover:bg-[#2b3139] rounded text-sm cursor-pointer">
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
                Settings
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#181a20]">
          {/* User Profile Header */}
          <div className="px-6 py-4 border-b border-[#2b3139]">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=crypto" />
                  <AvatarFallback className="bg-[#f0b90b] text-black font-bold">
                    M
                  </AvatarFallback>
                </Avatar>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4 text-[#848e9c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <svg className="w-4 h-4 text-[#848e9c]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-white text-lg font-medium">Mr_crypto_</h1>
                </div>
              </div>
              
              <div className="flex items-center space-x-12 text-sm">
                <div className="text-center">
                  <div className="text-[#848e9c]">UID</div>
                  <div className="text-[#848e9c]">799181588</div>
                </div>
                <div className="text-center">
                  <div className="text-[#848e9c]">VIP Level</div>
                  <div className="flex items-center space-x-1">
                    <span className="text-[#848e9c]">Regular User</span>
                    <ChevronDown className="h-3 w-3 text-[#848e9c]" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-[#848e9c]">Following</div>
                  <div className="text-white">14</div>
                </div>
                <div className="text-center">
                  <div className="text-[#848e9c]">Followers</div>
                  <div className="text-white">3</div>
                </div>
              </div>
            </div>
          </div>

          {/* Balance Section */}
          <div className="px-6 py-6">
            <div className="bg-[#1e2329] rounded-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-2">
                  <h2 className="text-white text-lg font-medium">Estimated Balance</h2>
                  <svg className="w-4 h-4 text-[#848e9c]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="bg-[#474d57] border-[#474d57] text-white hover:bg-[#5a616b] text-xs h-7 px-3">
                    Deposit
                  </Button>
                  <Button variant="outline" size="sm" className="bg-[#474d57] border-[#474d57] text-white hover:bg-[#5a616b] text-xs h-7 px-3">
                    Withdraw
                  </Button>
                  <Button variant="outline" size="sm" className="bg-[#474d57] border-[#474d57] text-white hover:bg-[#5a616b] text-xs h-7 px-3">
                    Cash In
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-white text-2xl font-bold">0.02631079</span>
                <span className="text-[#848e9c] text-sm">USDT</span>
                <ChevronDown className="h-4 w-4 text-[#848e9c]" />
              </div>
              
              <div className="text-[#848e9c] text-sm mb-4">≈ $0.03</div>
              
              <div className="flex items-center space-x-4 mb-4">
                <span className="text-[#848e9c] text-sm">Today's PnL</span>
                <div className="flex items-center space-x-1">
                  <svg className="w-3 h-3 text-[#0ecb81]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-[#0ecb81] text-sm">$0.000 (71%)</span>
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-20 bg-[#2b3139] rounded relative">
                <svg className="absolute bottom-0 right-0 w-32 h-16" viewBox="0 0 128 64">
                  <path d="M0,60 L20,50 L40,45 L60,35 L80,30 L100,25 L128,20" stroke="#f0b90b" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>

            {/* Markets Section */}
            <div className="bg-[#1e2329] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white text-lg font-medium">Markets</h2>
                <Button variant="ghost" className="text-[#f0b90b] hover:text-[#d9a709] text-sm h-auto p-0">
                  More
                </Button>
              </div>
              
              {/* Tabs */}
              <div className="flex space-x-8 mb-6 border-b border-[#2b3139]">
                <button className="text-white pb-3 border-b-2 border-[#f0b90b] text-sm">Holding</button>
                <button className="text-[#848e9c] pb-3 text-sm hover:text-white">Hot</button>
                <button className="text-[#848e9c] pb-3 text-sm hover:text-white">New Listing</button>
                <button className="text-[#848e9c] pb-3 text-sm hover:text-white">Favorite</button>
                <button className="text-[#848e9c] pb-3 text-sm hover:text-white">Top Gainers</button>
                <button className="text-[#848e9c] pb-3 text-sm hover:text-white">24h Volume</button>
              </div>
              
              {/* Table Header */}
              <div className="grid grid-cols-5 gap-4 text-xs text-[#848e9c] mb-4 px-2">
                <div>Coin</div>
                <div>Amount</div>
                <div>Coin Price / Cost Price</div>
                <div>24H Change</div>
                <div>Trade</div>
              </div>
              
              {/* BANANAS31 Row */}
              <div className="grid grid-cols-5 gap-4 items-center py-3 px-2 hover:bg-[#2b3139] rounded">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-[#f0b90b] rounded-full flex items-center justify-center">
                    <span className="text-black font-bold text-xs">🍌</span>
                  </div>
                  <div>
                    <div className="text-white text-sm font-medium">BANANAS31</div>
                    <div className="text-[#848e9c] text-xs">Banana For S...</div>
                  </div>
                </div>
                <div>
                  <div className="text-white text-sm">2.22</div>
                  <div className="text-[#848e9c] text-xs">$0.01</div>
                </div>
                <div>
                  <div className="text-white text-sm">$0.01</div>
                  <div className="text-[#848e9c] text-xs">--</div>
                </div>
                <div className="flex items-center space-x-1">
                  <TrendingUp className="h-3 w-3 text-[#0ecb81]" />
                  <span className="text-[#0ecb81] text-sm">+0.64%</span>
                </div>
                <div>
                  <Button variant="outline" size="sm" className="border-[#f0b90b] text-[#f0b90b] hover:bg-[#f0b90b] hover:text-black text-xs h-6 px-3">
                    Trade
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}