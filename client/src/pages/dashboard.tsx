import { useEffect } from "react";
import { useTestAuth } from "@/hooks/useTestAuth";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TrendingUp, TrendingDown, Search, Bell, Settings, Globe, MoreHorizontal, ChevronDown } from "lucide-react";
import type { User } from "@shared/schema";

export default function Dashboard() {
  const { toast } = useToast();
  const { isAuthenticated, isLoading, user } = useTestAuth() as { 
    isAuthenticated: boolean; 
    isLoading: boolean; 
    user: User | undefined; 
  };

  // For demo purposes, we'll show the dashboard without auth restrictions

  const { data: holdings } = useQuery({
    queryKey: ["/api/user/holdings"],
    enabled: isAuthenticated,
  });

  const { data: cryptoData } = useQuery({
    queryKey: ["/api/crypto"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[var(--binance-dark)] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  const mockHoldings = [
    {
      symbol: "BANANAS31",
      name: "Banana For Scale",
      amount: "2.22",
      cost: "$0.01",
      change: "+0.67%",
      changeType: "positive" as const
    },
    {
      symbol: "USDT",
      name: "Tether USD",
      amount: "0.00781662",
      cost: "$1.00",
      change: "-0.04%",
      changeType: "negative" as const
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--binance-dark)]">
      {/* Header */}
      <header className="bg-[var(--binance-dark)] border-b border-[var(--binance-border)] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg" 
                alt="Binance" 
                className="h-8 w-auto"
              />
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors">
                Buy Crypto
              </a>
              <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors">
                Markets
              </a>
              <div className="relative group">
                <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors flex items-center">
                  Trade <ChevronDown className="ml-1 h-3 w-3" />
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors flex items-center">
                  Futures <ChevronDown className="ml-1 h-3 w-3" />
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors flex items-center">
                  Earn <ChevronDown className="ml-1 h-3 w-3" />
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors flex items-center">
                  Square <ChevronDown className="ml-1 h-3 w-3" />
                </a>
              </div>
              <div className="relative group">
                <a href="#" className="text-white hover:text-[var(--binance-yellow)] transition-colors flex items-center">
                  More <ChevronDown className="ml-1 h-3 w-3" />
                </a>
              </div>
            </nav>
            
            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-[var(--binance-gray)] hover:text-white">
                <Search className="h-4 w-4" />
              </Button>
              <Button className="bg-[var(--binance-yellow)] text-black hover:bg-yellow-400 font-medium">
                Deposit
              </Button>
              <Button variant="ghost" size="icon" className="text-[var(--binance-gray)] hover:text-white">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[var(--binance-gray)] hover:text-white">
                <Globe className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[var(--binance-gray)] hover:text-white">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="text-[var(--binance-gray)] hover:text-white">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-[#1e2329] min-h-screen border-r border-[var(--binance-border)]">
          <div className="p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-white bg-[#474d57] hover:bg-[#5e6673]"
              >
                <i className="fas fa-home mr-2"></i>
                Dashboard
              </Button>
            </div>
            
            <nav className="space-y-2">
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[var(--binance-gray)] hover:text-white hover:bg-[#474d57]"
              >
                <i className="fas fa-coins mr-2"></i>
                Assets
                <ChevronDown className="ml-auto h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[var(--binance-gray)] hover:text-white hover:bg-[#474d57]"
              >
                <i className="fas fa-list mr-2"></i>
                Orders
                <ChevronDown className="ml-auto h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[var(--binance-gray)] hover:text-white hover:bg-[#474d57]"
              >
                <i className="fas fa-gift mr-2"></i>
                Rewards Hub
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[var(--binance-gray)] hover:text-white hover:bg-[#474d57]"
              >
                <i className="fas fa-user-friends mr-2"></i>
                Referral
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[var(--binance-gray)] hover:text-white hover:bg-[#474d57]"
              >
                <i className="fas fa-user mr-2"></i>
                Account
                <ChevronDown className="ml-auto h-3 w-3" />
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[var(--binance-gray)] hover:text-white hover:bg-[#474d57]"
              >
                <i className="fas fa-users mr-2"></i>
                Sub Accounts
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start text-[var(--binance-gray)] hover:text-white hover:bg-[#474d57]"
              >
                <i className="fas fa-cog mr-2"></i>
                Settings
              </Button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          {/* User Profile Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user?.profileImageUrl || undefined} />
                <AvatarFallback className="bg-[var(--binance-yellow)] text-black text-xl font-bold">
                  {user?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {user?.firstName ? `${user.firstName} ${user.lastName || ''}` : 'Mr_crypto_'}
                </h1>
                <div className="flex items-center space-x-4 text-sm text-[var(--binance-gray)]">
                  <span>UID: 799181588</span>
                  <Badge variant="secondary" className="bg-[#474d57] text-white">
                    VIP Level: {user?.vipLevel || 'Regular User'}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-8 text-sm">
              <div className="text-center">
                <div className="text-white font-medium">Following</div>
                <div className="text-[var(--binance-gray)]">{user?.following || 14}</div>
              </div>
              <div className="text-center">
                <div className="text-white font-medium">Followers</div>
                <div className="text-[var(--binance-gray)]">{user?.followers || 3}</div>
              </div>
            </div>
          </div>

          {/* Balance Card */}
          <Card className="bg-[#1e2329] border-[var(--binance-border)] mb-8">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white flex items-center">
                Estimated Balance
                <i className="fas fa-info-circle ml-2 text-[var(--binance-gray)]"></i>
              </CardTitle>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-[var(--binance-border)] text-white">
                  Deposit
                </Button>
                <Button variant="outline" size="sm" className="border-[var(--binance-border)] text-white">
                  Withdraw
                </Button>
                <Button variant="outline" size="sm" className="border-[var(--binance-border)] text-white">
                  Cash In
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-3xl font-bold text-white">0.02631079</span>
                <span className="text-[var(--binance-gray)]">USDT</span>
                <ChevronDown className="h-4 w-4 text-[var(--binance-gray)]" />
              </div>
              <div className="text-sm text-[var(--binance-gray)] mb-4">
                ≈ $0.03
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-[var(--binance-gray)]">Today's PnL</span>
                <span className="text-sm text-green-400">+ $0.000 (71%)</span>
              </div>
              <div className="mt-4 h-16 bg-[#474d57] rounded flex items-end justify-end p-2">
                <div className="h-8 w-32 bg-[var(--binance-yellow)] rounded-sm"></div>
              </div>
            </CardContent>
          </Card>

          {/* Markets Section */}
          <Card className="bg-[#1e2329] border-[var(--binance-border)]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Markets</CardTitle>
              <Button variant="ghost" size="sm" className="text-[var(--binance-yellow)]">
                More
              </Button>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-8 mb-4 border-b border-[var(--binance-border)]">
                <button className="text-white pb-2 border-b-2 border-[var(--binance-yellow)]">
                  Holding
                </button>
                <button className="text-[var(--binance-gray)] pb-2">
                  Hot
                </button>
                <button className="text-[var(--binance-gray)] pb-2">
                  New Listing
                </button>
                <button className="text-[var(--binance-gray)] pb-2">
                  Favorite
                </button>
                <button className="text-[var(--binance-gray)] pb-2">
                  Top Gainers
                </button>
                <button className="text-[var(--binance-gray)] pb-2">
                  24h Volume
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-5 gap-4 text-sm text-[var(--binance-gray)] pb-2">
                  <div>Coin</div>
                  <div>Amount</div>
                  <div>Coin Price / Cost Price</div>
                  <div>24H Change</div>
                  <div>Trade</div>
                </div>

                {mockHoldings.map((holding, index) => (
                  <div key={index} className="grid grid-cols-5 gap-4 items-center py-3 border-t border-[var(--binance-border)]">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[var(--binance-yellow)] rounded-full flex items-center justify-center">
                        <span className="text-black font-bold text-xs">
                          {holding.symbol.slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{holding.symbol}</div>
                        <div className="text-xs text-[var(--binance-gray)]">{holding.name}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-white font-medium">{holding.amount}</div>
                      <div className="text-xs text-[var(--binance-gray)]">{holding.cost}</div>
                    </div>
                    <div className="text-white">
                      {holding.cost}
                      <div className="text-xs text-[var(--binance-gray)]">--</div>
                    </div>
                    <div className={`flex items-center ${
                      holding.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {holding.changeType === 'positive' ? 
                        <TrendingUp className="h-3 w-3 mr-1" /> : 
                        <TrendingDown className="h-3 w-3 mr-1" />
                      }
                      {holding.change}
                    </div>
                    <div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-[var(--binance-yellow)] text-[var(--binance-yellow)] hover:bg-[var(--binance-yellow)] hover:text-black"
                      >
                        Trade
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}