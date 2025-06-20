import { useState, useEffect } from "react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import CryptoBalanceCard from "@/components/CryptoBalanceCard";

import ProfileEditModal from "@/components/ProfileEditModal";
import { useQuery } from "@tanstack/react-query";
import { useAssetsData } from "@/hooks/useAssetsData";
import { useUserHoldings } from "@/hooks/useUserHoldings";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Bell, Settings, Globe, MoreHorizontal, ChevronDown, TrendingUp, Copy, Edit3 } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLocation } from "wouter";
import CryptoPriceCard from "@/components/CryptoPriceCard";
import NewsSection from "@/components/NewsSection";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Holding");
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [expandedMenus, setExpandedMenus] = useState<{[key: string]: boolean}>({});
  const [assetsViewType, setAssetsViewType] = useState("Coin View");
  const [isProfileEditOpen, setIsProfileEditOpen] = useState(false);
  const [userSticker, setUserSticker] = useState("🦊");
  const [userName, setUserName] = useState("");
  const [, setLocation] = useLocation();

  const toggleMenu = (menuName: string) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuName]: !prev[menuName]
    }));
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };
  
  const { userProfile, loading: isLoading, isAuthenticated, logout } = useFirebaseAuth();

  // Initialize user data from profile
  useEffect(() => {
    if (userProfile) {
      setUserName(userProfile.displayName || '');
      // Extract sticker from localStorage or use default
      const storedSticker = localStorage.getItem(`userSticker_${userProfile.uid}`);
      setUserSticker(storedSticker || '🦊');
    }
  }, [userProfile?.uid, userProfile?.displayName]);

  // Handle profile save
  const handleProfileSave = (newName: string, newSticker: string) => {
    setUserName(newName);
    setUserSticker(newSticker);
    
    // Store sticker in localStorage
    if (userProfile?.uid) {
      localStorage.setItem(`userSticker_${userProfile.uid}`, newSticker);
    }
    
    // Note: In a real implementation, you would also update the backend/Firebase
    // For now, we're just updating the local state and localStorage
  };

  const { data: cryptoData } = useQuery({
    queryKey: ["/api/crypto"],
  }) as { data: any[] | undefined };

  // Fetch assets data for Overview section
  const { data: assetsData, isLoading: assetsLoading } = useAssetsData();

  // Calculate real-time portfolio balance using user's actual crypto balances
  const calculatePortfolioBalance = () => {
    if (!userProfile?.cryptoBalances || !cryptoData) return { totalBalance: 0, todayPnL: 0, pnlPercentage: 0 };
    
    let totalBalance = 0;
    let totalPreviousValue = 0;
    
    userProfile.cryptoBalances.forEach((holding: any) => {
      const crypto = cryptoData.find((c: any) => c.symbol.toLowerCase() === holding.symbol.toLowerCase());
      if (crypto) {
        const currentValue = holding.balance * parseFloat(crypto.current_price);
        const previousPrice = parseFloat(crypto.current_price) / (1 + parseFloat(crypto.price_change_percentage_24h) / 100);
        const previousValue = holding.balance * previousPrice;
        
        totalBalance += currentValue;
        totalPreviousValue += previousValue;
      }
    });
    
    const todayPnL = totalBalance - totalPreviousValue;
    const pnlPercentage = totalPreviousValue > 0 ? (todayPnL / totalPreviousValue) * 100 : 0;
    
    return { totalBalance, todayPnL, pnlPercentage };
  };

  const { totalBalance, todayPnL, pnlPercentage } = calculatePortfolioBalance();

  // Generate portfolio performance data that correlates with PnL
  const generatePortfolioData = () => {
    if (!userProfile?.cryptoBalances || !cryptoData) return [];
    
    const currentTime = Date.now();
    const data = [];
    
    // Calculate current portfolio value and 24h ago value for PnL correlation
    let currentPortfolioValue = 0;
    let portfolioValue24hAgo = 0;
    
    userProfile.cryptoBalances.forEach((holding: any) => {
      const crypto = cryptoData.find((c: any) => c.symbol.toLowerCase() === holding.symbol.toLowerCase());
      if (crypto) {
        const currentPrice = parseFloat(crypto.current_price);
        const priceChange24h = parseFloat(crypto.price_change_percentage_24h || '0');
        const price24hAgo = currentPrice / (1 + priceChange24h / 100);
        
        currentPortfolioValue += holding.balance * currentPrice;
        portfolioValue24hAgo += holding.balance * price24hAgo;
      }
    });
    
    const totalPnLPercentage = portfolioValue24hAgo > 0 ? 
      ((currentPortfolioValue - portfolioValue24hAgo) / portfolioValue24hAgo) * 100 : 0;
    
    // Generate 30 data points that follow the PnL trend
    for (let i = 29; i >= 0; i--) {
      const timeStamp = currentTime - (i * 60 * 60 * 1000);
      const timeProgress = (29 - i) / 29; // 0 to 1 (past to present)
      
      // Calculate the portfolio value at this point in time based on PnL progression
      const pnlProgression = totalPnLPercentage * timeProgress; // Gradual change over time
      const baseValue = portfolioValue24hAgo;
      
      // Add realistic market fluctuations while maintaining PnL correlation
      const marketNoise = Math.sin(timeProgress * Math.PI * 8) * 0.003; // Small variations
      const randomNoise = (Math.random() - 0.5) * 0.002; // Minimal random fluctuation
      
      // Calculate portfolio value that correlates with PnL
      const pnlBasedValue = baseValue * (1 + (pnlProgression + marketNoise + randomNoise) / 100);
      
      data.push({
        time: new Date(timeStamp).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit',
          hour12: false 
        }),
        value: pnlBasedValue,
        timestamp: timeStamp
      });
    }
    
    return data.sort((a, b) => a.timestamp - b.timestamp);
  };

  const chartData = generatePortfolioData();

  // Helper function to get filtered crypto data based on active tab
  const getFilteredCryptoData = () => {
    if (!cryptoData || !Array.isArray(cryptoData)) return [];
    
    switch (activeTab) {
      case "Holding":
        // Show only cryptocurrencies that the user actually holds
        if (!userProfile?.cryptoBalances || !Array.isArray(userProfile.cryptoBalances)) return [];
        return cryptoData.filter((crypto: any) => 
          userProfile.cryptoBalances.some((holding: any) => 
            holding.symbol.toLowerCase() === crypto.symbol.toLowerCase()
          )
        );
      case "Hot":
        return cryptoData.filter((crypto: any) => 
          parseFloat(crypto.price_change_percentage_24h || '0') > 5
        ).slice(0, 5);
      case "New Listing":
        return cryptoData.slice(10, 15); // Show different range for new listings
      case "Favorite":
        return cryptoData.filter((crypto: any) => 
          ["bitcoin", "ethereum", "binancecoin"].includes(crypto.id)
        );
      case "Top Gainers":
        return cryptoData
          .sort((a: any, b: any) => 
            parseFloat(b.price_change_percentage_24h || '0') - 
            parseFloat(a.price_change_percentage_24h || '0')
          )
          .slice(0, 5);
      case "24h Volume":
        return cryptoData
          .sort((a: any, b: any) => 
            parseFloat(b.total_volume || '0') - 
            parseFloat(a.total_volume || '0')
          )
          .slice(0, 5);
      default:
        return cryptoData.slice(0, 5);
    }
  };

  const filteredCryptoData = getFilteredCryptoData();

  // Function to render content based on active section
  const renderMainContent = () => {
    switch (activeSection) {
      case "Overview":
        return (
          <div className="px-6 py-4">
            {/* Estimated Balance Section */}
            <div className="rounded-lg p-6 mb-6 border border-line">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <h2 className="text-secondary text-base font-semibold">Estimated Balance</h2>
                  <svg className="w-4 h-4 text-icon-normal" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="bg-binance-card border-line text-secondary hover:bg-primary hover:text-black text-xs h-7 px-4 rounded font-medium">
                    Deposit
                  </Button>
                  <Button variant="outline" size="sm" className="bg-binance-card border-line text-secondary hover:bg-primary hover:text-black text-xs h-7 px-4 rounded font-medium">
                    Withdraw
                  </Button>
                  <Button variant="outline" size="sm" className="bg-binance-card border-line text-secondary hover:bg-primary hover:text-black text-xs h-7 px-4 rounded font-medium">
                    Transfer
                  </Button>
                </div>
              </div>
              
              <div className="flex items-baseline space-x-2 mb-2">
                <span className="text-secondary text-xl font-semibold">{totalBalance.toFixed(8)}</span>
                <span className="text-icon-normal text-sm">USDT</span>
                <ChevronDown className="h-4 w-4 text-icon-normal mt-1" />
              </div>
              
              <div className="text-icon-normal text-xs mb-3">
                ≈ ${totalBalance.toFixed(2)}
              </div>
              
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-icon-normal text-xs">Today's PnL</span>
                <div className="flex items-center space-x-1">
                  <svg className={`w-3 h-3 ${todayPnL >= 0 ? 'text-success' : 'text-error'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d={todayPnL >= 0 ? "M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" : "M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"} clipRule="evenodd" />
                  </svg>
                  <span className={`text-xs ${todayPnL >= 0 ? 'text-success' : 'text-error'}`}>
                    {todayPnL >= 0 ? '+' : ''}${Math.abs(todayPnL).toFixed(3)} ({pnlPercentage.toFixed(1)}%)
                  </span>
                </div>
              </div>
              
              {/* Chart */}
              <div className="h-12 bg-binance-card rounded-lg relative overflow-hidden">
                <svg className="absolute bottom-0 right-0 w-40 h-full" viewBox="0 0 160 48" preserveAspectRatio="none">
                  <path d="M0,20 L40,35 L80,36 L120,36 L160,36" stroke="var(--color-primary)" strokeWidth="2" fill="none"/>
                </svg>
              </div>
            </div>

            {/* My Assets Section */}
            <div className="rounded-lg p-6 border border-line">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-secondary text-base font-semibold">My Assets</h2>
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="icon" className="text-icon-normal hover:text-white h-8 w-8">
                    <Search className="h-4 w-4" />
                  </Button>
                  <div className="flex items-center space-x-2 text-sm text-icon-normal">
                    <input type="checkbox" className="w-4 h-4 rounded border-line" />
                    <span>Hide assets &lt;1 USD</span>
                  </div>
                </div>
              </div>
              
              {/* Assets Tabs */}
              <div className="flex space-x-8 mb-6 border-b border-line">
                <button 
                  onClick={() => setAssetsViewType("Coin View")}
                  className={`pb-3 text-sm font-medium ${
                    assetsViewType === "Coin View" 
                      ? "text-white border-b-2 border-primary" 
                      : "text-icon-normal hover:text-white"
                  }`}
                >
                  Coin View
                </button>
                <button 
                  onClick={() => setAssetsViewType("Account View")}
                  className={`pb-3 text-sm font-medium ${
                    assetsViewType === "Account View" 
                      ? "text-white border-b-2 border-primary" 
                      : "text-icon-normal hover:text-white"
                  }`}
                >
                  Account View
                </button>
              </div>
              
              {/* Conditional rendering based on view type */}
              {assetsViewType === "Coin View" ? (
                <>
                  {/* Coin View Table Header */}
                  <div className="grid grid-cols-4 gap-4 text-xs font-medium text-icon-normal mb-4 px-0">
                    <div className="flex items-center">
                      <span>Coin</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </div>
                    <div className="flex items-center">
                      <span>Amount</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </div>
                    <div className="flex items-center">
                      <span>Coin Price / Cost Price</span>
                      <svg className="w-3 h-3 ml-1 text-icon-normal" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="flex items-center">
                      <span>Today's PnL</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </div>
                  </div>
                  
                  {/* Coin View Assets Rows */}
                  <div className="space-y-2">
                    {isAuthenticated && userProfile?.cryptoBalances ? (
                      userProfile.cryptoBalances.map((crypto) => (
                        <div key={crypto.symbol} className="grid grid-cols-4 gap-4 items-center py-3 px-0 hover:bg-binance-card rounded">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={crypto.icon} 
                              alt={crypto.name}
                              className="w-6 h-6 rounded-full"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = `https://via.placeholder.com/24/FCD535/000000?text=${crypto.symbol}`;
                              }}
                            />
                            <div>
                              <div className="text-secondary text-sm font-semibold">{crypto.symbol}</div>
                              <div className="text-icon-normal text-xs">{crypto.name}</div>
                            </div>
                          </div>
                          <div>
                            <div className="text-secondary text-sm">{crypto.balance.toFixed(8)}</div>
                            <div className="text-icon-normal text-xs">{crypto.symbol}</div>
                          </div>
                          <div>
                            <div className="text-secondary text-sm">$0.00 / $0.00</div>
                            <div className="text-icon-normal text-xs">0.00%</div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="text-success text-sm">+$0.00</span>
                            <span className="text-success text-xs">(0.00%)</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-icon-normal text-sm">
                          {isAuthenticated ? 'Loading balances...' : 'Please sign in to view your crypto balances'}
                        </div>
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <>
                  {/* Account View Table Header */}
                  <div className="grid grid-cols-4 gap-4 text-xs font-medium text-icon-normal mb-4 px-0">
                    <div className="flex items-center">
                      <span>Account</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </div>
                    <div className="flex items-center">
                      <span>Amount</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </div>
                    <div className="flex items-center">
                      <span>Ratio</span>
                      <ChevronDown className="h-3 w-3 ml-1" />
                    </div>
                    <div className="flex items-center">
                      <span>Action</span>
                    </div>
                  </div>
                  
                  {/* Account View Rows */}
                  <div className="space-y-2">
                    {/* Funding */}
                    <div className="grid grid-cols-4 gap-4 items-center py-3 px-0 hover:bg-binance-card rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center">
                          <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-secondary text-sm font-semibold">Funding</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-secondary text-xs">{totalBalance.toFixed(8)}</div>
                        <div className="text-icon-normal text-xs">${totalBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-secondary text-xs">0.00%</div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="text-icon-normal hover:text-white h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Spot */}
                    <div className="grid grid-cols-4 gap-4 items-center py-3 px-0 hover:bg-binance-card rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center">
                          <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-secondary text-sm font-semibold">Spot</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-secondary text-sm font-medium">{totalBalance.toFixed(8)}</div>
                        <div className="text-icon-normal text-xs">${totalBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-secondary text-sm font-medium">0.00%</div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="text-icon-normal hover:text-white h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Cross Margin */}
                    <div className="grid grid-cols-4 gap-4 items-center py-3 px-0 hover:bg-binance-card rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center">
                          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-secondary text-sm font-semibold">Cross Margin</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-secondary text-sm font-medium">{totalBalance.toFixed(8)}</div>
                        <div className="text-icon-normal text-xs">${totalBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-secondary text-sm font-medium">0.00%</div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="text-icon-normal hover:text-white h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Isolated Margin */}
                    <div className="grid grid-cols-4 gap-4 items-center py-3 px-0 hover:bg-binance-card rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center">
                          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-secondary text-sm font-semibold">Isolated Margin</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-secondary text-sm font-medium">{totalBalance.toFixed(8)}</div>
                        <div className="text-icon-normal text-xs">${totalBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-secondary text-sm font-medium">0.00%</div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="text-icon-normal hover:text-white h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Earn */}
                    <div className="grid grid-cols-4 gap-4 items-center py-3 px-0 hover:bg-[#1e2329] rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#EAECEF]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[#EAECEF] text-sm font-semibold">Earn</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">--</div>
                        <div className="text-[#848e9c] text-xs">${totalBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">0.00%</div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="text-[#848e9c] hover:text-white h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* USD©️-M Futures */}
                    <div className="grid grid-cols-4 gap-4 items-center py-3 px-0 hover:bg-[#1e2329] rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#EAECEF]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[#EAECEF] text-sm font-semibold">USD©️-M Futures</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">--</div>
                        <div className="text-[#848e9c] text-xs">${totalBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">0.00%</div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="text-[#848e9c] hover:text-white h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* COIN-M Futures */}
                    <div className="grid grid-cols-4 gap-4 items-center py-3 px-0 hover:bg-[#1e2329] rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#EAECEF]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[#EAECEF] text-sm font-semibold">COIN-M Futures</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">--</div>
                        <div className="text-[#848e9c] text-xs">${totalBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">0.00%</div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="text-[#848e9c] hover:text-white h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* Options */}
                    <div className="grid grid-cols-4 gap-4 items-center py-3 px-0 hover:bg-[#1e2329] rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#EAECEF]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[#EAECEF] text-sm font-semibold">Options</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">--</div>
                        <div className="text-[#848e9c] text-xs">${totalBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">0.00%</div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="text-[#848e9c] hover:text-white h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    {/* NFT */}
                    <div className="grid grid-cols-4 gap-4 items-center py-3 px-0 hover:bg-[#1e2329] rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-transparent flex items-center justify-center">
                          <svg className="w-4 h-4 text-[#EAECEF]" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div>
                          <div className="text-[#EAECEF] text-sm font-semibold">NFT</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">1 NFTs</div>
                        <div className="text-[#848e9c] text-xs">${totalBalance.toFixed(2)}</div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">--</div>
                      </div>
                      <div>
                        <Button variant="ghost" size="sm" className="text-[#848e9c] hover:text-white h-6 w-6 p-0">
                          <MoreHorizontal className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
            
            
          </div>
        );
      case "Spot":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Spot Trading</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your spot trading assets and balances will be displayed here.</p>
            </div>
          </div>
        );
      case "Margin":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Margin Trading</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your margin trading positions and available margin will be shown here.</p>
            </div>
          </div>
        );
      case "Futures":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Futures Trading</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your futures positions and contract details will appear here.</p>
            </div>
          </div>
        );
      case "Options":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Options Trading</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your options contracts and trading strategies will be displayed here.</p>
            </div>
          </div>
        );
      case "Earn":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Earn Products</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your staking rewards, savings products, and earning opportunities will appear here.</p>
            </div>
          </div>
        );
      case "Funding":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Funding Wallet</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your funding wallet balances and transfer history will be shown here.</p>
            </div>
          </div>
        );
      case "Spot Order":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Spot Orders</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your spot trading orders and open positions will be displayed here.</p>
            </div>
          </div>
        );
      case "Futures Order":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Futures Orders</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your futures contracts and derivative orders will be shown here.</p>
            </div>
          </div>
        );
      case "P2P Order":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">P2P Orders</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your peer-to-peer trading orders and transactions will appear here.</p>
            </div>
          </div>
        );
      case "Transaction History":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Transaction History</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Complete history of all your transactions and trades will be displayed here.</p>
            </div>
          </div>
        );
      case "Earn History":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Earn History</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your staking rewards and earning history will be shown here.</p>
            </div>
          </div>
        );
      case "Convert History":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Convert History</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your cryptocurrency conversion history will appear here.</p>
            </div>
          </div>
        );
      case "Payment History":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Payment History</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your deposit and withdrawal payment history will be displayed here.</p>
            </div>
          </div>
        );
      case "Identification":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Identification</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your identity verification status and documents will be displayed here.</p>
            </div>
          </div>
        );
      case "Security":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Security</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your account security settings including 2FA and login history will appear here.</p>
            </div>
          </div>
        );
      case "Payment":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Payment</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your payment methods and banking information will be shown here.</p>
            </div>
          </div>
        );
      case "API Management":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">API Management</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your API keys and trading bot configurations will be displayed here.</p>
            </div>
          </div>
        );
      case "Account Statement":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Account Statement</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your detailed account statements and balance history will appear here.</p>
            </div>
          </div>
        );
      case "Financial Reports":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Financial Reports</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your comprehensive financial reports and tax documents will be shown here.</p>
            </div>
          </div>
        );
      case "Rewards Hub":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Rewards Hub</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your rewards, bonuses, and promotional offers will appear here.</p>
            </div>
          </div>
        );
      case "Referral":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Referral</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your referral program details and earnings will appear here.</p>
            </div>
          </div>
        );
      case "Account":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Account</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your account settings and profile information will appear here.</p>
            </div>
          </div>
        );
      case "Sub Accounts":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Sub Accounts</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your sub-account management will appear here.</p>
            </div>
          </div>
        );
      case "Settings":
        return (
          <div className="px-6 py-4">
            <h1 className="text-[#EAECEF] text-2xl font-bold mb-6">Settings</h1>
            <div className="rounded-lg p-6 border border-[#2b3139]">
              <p className="text-[#848e9c]">Your application settings and preferences will appear here.</p>
            </div>
          </div>
        );
      default:
        return (
          <>
            {/* User Profile Header */}
            <div className="px-8 py-6 bg-[#181A20]">
              <div className="flex items-center w-full font-semibold text-[16px]">
                <div className="flex items-center space-x-3 min-w-0">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-[#2b3139] flex items-center justify-center text-lg border-2 border-[#474d57]">
                      {userSticker}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <h1 className="text-[#EAECEF] text-base font-semibold">{userName || userProfile?.displayName || 'Anonymous User'}</h1>
                    <svg className="w-3 h-3 text-[#0ECB81]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => setIsProfileEditOpen(true)}
                      className="h-5 w-5 text-[#848e9c] hover:text-[#EAECEF] hover:bg-[#2B3139] rounded-sm"
                      title="Edit Profile"
                    >
                      <Edit3 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between flex-1 ml-16 text-xs">
                  <div className="text-left">
                    <div className="text-[#848e9c] mb-1">UID</div>
                    <div className="flex items-center space-x-1">
                      <span className="text-[#EAECEF] font-medium font-semibold">{userProfile?.uid || 'Not logged in'}</span>
                      <button 
                        onClick={() => copyToClipboard(userProfile?.uid || '')}
                        className="text-[#848e9c] hover:text-[#EAECEF] transition-colors"
                      >
                        <Copy className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-[#848e9c] mb-1">VIP Level</div>
                    <div className="flex items-center space-x-1 cursor-pointer group">
                      <span className="text-[#EAECEF] font-medium font-semibold group-hover:text-[#FCD535] transition-colors">Regular User</span>
                      <ChevronDown className="h-3 w-3 text-[#848e9c] group-hover:text-[#FCD535] transition-colors" />
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-[#848e9c] mb-1">Following</div>
                    <div className="text-[#EAECEF] font-medium font-semibold">0</div>
                  </div>
                  
                  <div className="text-left">
                    <div className="text-[#848e9c] mb-1">Followers</div>
                    <div className="text-[#EAECEF] font-medium font-semibold">0</div>
                  </div>
                </div>
              </div>
            </div>
            {/* Balance Section */}
            <div className="px-6 py-4">
              <div className="rounded-2xl p-6 mb-6 border border-[#2b3139]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-[#EAECEF] text-base font-semibold">Estimated Balance</h2>
                    <svg className="w-4 h-4 text-[#848e9c]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="bg-[#2b3139] border-[#2b3139] text-[#EAECEF] hover:bg-[#3a404a] text-xs h-7 px-4 rounded-xl font-semibold">
                      Deposit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="bg-[#2b3139] border-[#2b3139] text-[#EAECEF] hover:bg-[#3a404a] text-xs h-7 px-4 rounded-xl font-semibold"
                      onClick={() => setLocation("/withdraw")}
                    >
                      Withdraw
                    </Button>
                    <Button variant="outline" size="sm" className="bg-[#2b3139] border-[#2b3139] text-[#EAECEF] hover:bg-[#3a404a] text-xs h-7 px-4 rounded-xl font-semibold">
                      Cash In
                    </Button>
                  </div>
                </div>
                
                {/* Balance info */}
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-[#EAECEF] text-3xl font-bold">{totalBalance.toFixed(8)}</span>
                  <span className="text-[#848e9c] text-base font-medium">USDT</span>
                  <ChevronDown className="h-4 w-4 text-[#848e9c] mt-1" />
                </div>
                
                <div className="text-[#848e9c] text-sm mb-3">≈ ${totalBalance.toFixed(2)}</div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[#848e9c] text-sm">Today's PnL</span>
                    <div className="flex items-center space-x-1">
                      <svg className={`w-3 h-3 ${todayPnL >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d={todayPnL >= 0 ? "M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" : "M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z"} clipRule="evenodd" />
                      </svg>
                      <span className={`text-sm font-medium ${todayPnL >= 0 ? 'text-[#0ecb81]' : 'text-[#f6465d]'}`}>
                        {todayPnL >= 0 ? '+' : ''} ${todayPnL.toFixed(2)}({pnlPercentage.toFixed(2)}%)
                      </span>
                    </div>
                  </div>
                  
                  {/* Chart positioned lower on the right */}
                  <div className="w-48 h-16">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={chartData} margin={{ top: 5, right: 5, left: 5, bottom: 5 }}>
                        <Line 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#FCD535" 
                          strokeWidth={2}
                          dot={false}
                          activeDot={{ r: 3, fill: "#FCD535", strokeWidth: 0 }}
                        />
                        <XAxis 
                          dataKey="time" 
                          axisLine={false} 
                          tickLine={false} 
                          tick={false}
                        />
                        <YAxis 
                          axisLine={false} 
                          tickLine={false} 
                          tick={false}
                        />
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: '#2B3139',
                            border: '1px solid #4B5563',
                            borderRadius: '6px',
                            color: '#EAECEF',
                            fontSize: '12px'
                          }}
                          labelStyle={{ color: '#848E9C', fontSize: '11px' }}
                          formatter={(value: any) => [`$${parseFloat(value).toFixed(2)}`, 'Portfolio Value']}
                          labelFormatter={(label) => `${label}`}
                          cursor={{ stroke: '#FCD535', strokeWidth: 1, strokeDasharray: '3 3' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Markets Section */}
              <div className="rounded-lg p-6 border border-[#2b3139]">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[#EAECEF] text-base font-semibold">Markets</h2>
                  <Button variant="ghost" className="text-[#FCD535] hover:text-[#e6c230] text-sm h-auto p-0 font-semibold">
                    More {'>'}
                  </Button>
                </div>
                
                {/* Tabs */}
                <div className="flex space-x-6 mb-6 border-b border-[#1e2329]">
                  {["Holding", "Hot", "New Listing", "Favorite", "Top Gainers", "24h Volume"].map((tab) => (
                    <button 
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-3 text-sm font-medium transition-colors ${
                        activeTab === tab 
                          ? "text-white border-b-2 border-[#f0b90b]" 
                          : "text-[#848e9c] hover:text-white"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
                
                {/* Table Header */}
                <div className="grid grid-cols-5 gap-4 text-xs text-[#848e9c] mb-4 px-0">
                  <div className="flex items-center">
                    <span>Coin</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </div>
                  <div className="flex items-center">
                    <span>Amount</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </div>
                  <div className="flex items-center">
                    <span>Coin Price / Cost Price</span>
                    <svg className="w-3 h-3 ml-1 text-[#848e9c]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="flex items-center">
                    <span>24H Change</span>
                    <ChevronDown className="h-3 w-3 ml-1" />
                  </div>
                  <div>Trade</div>
                </div>
                
                {/* Cryptocurrency Rows */}
                <div className="space-y-2">
                  {filteredCryptoData.map((crypto: any, index: number) => (
                    <div key={crypto.id} className="grid grid-cols-5 gap-4 items-center py-2 px-0 hover:bg-[#1e2329] rounded">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full flex items-center justify-center overflow-hidden">
                          <img 
                            src={crypto.image} 
                            alt={crypto.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                        <div>
                          <div className="text-[#EAECEF] text-sm font-semibold">{crypto.symbol?.toUpperCase()}</div>
                          <div className="text-[#848e9c] text-xs">{crypto.name}</div>
                        </div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">
                          {activeTab === "Holding" ? 
                            (() => {
                              const userHolding = userProfile?.cryptoBalances?.find(
                                (holding: any) => holding.symbol.toLowerCase() === crypto.symbol.toLowerCase()
                              );
                              return userHolding ? userHolding.balance.toFixed(8) : "0.00000000";
                            })() 
                            : "--"}
                        </div>
                        <div className="text-[#848e9c] text-xs">
                          ${crypto.current_price ? parseFloat(crypto.current_price).toFixed(2) : "0.00"}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#EAECEF] text-sm font-medium">
                          ${crypto.current_price ? parseFloat(crypto.current_price).toFixed(2) : "0.00"}
                        </div>
                        <div className="text-[#848e9c] text-xs">--</div>
                      </div>
                      <div>
                        <span className={`text-sm font-medium ${
                          parseFloat(crypto.price_change_percentage_24h || '0') >= 0 
                            ? 'text-[#0ecb81]' 
                            : 'text-[#f6465d]'
                        }`}>
                          {parseFloat(crypto.price_change_percentage_24h || '0') >= 0 ? '+' : ''}
                          {parseFloat(crypto.price_change_percentage_24h || '0').toFixed(2)}%
                        </span>
                      </div>
                      <div>
                        <button className="text-[#FCD535] hover:text-[#e6c230] text-sm font-bold cursor-pointer">
                          Trade
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#181a20] flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#181A20] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white text-2xl mb-4">Please log in to access your dashboard</h1>
          <Button 
            onClick={() => setLocation("/")}
            className="bg-[#FCD535] text-[#0B0E11] hover:bg-[#e6c230] px-6 py-2"
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#181A20]">
      {/* Header */}
      <header className="bg-[#181A20] h-14">
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
            <Button 
              variant="ghost" 
              onClick={logout}
              className="text-[#848e9c] hover:text-[#EAECEF] hover:bg-[#2B3139] h-8 px-3 text-sm rounded-sm"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <div className="w-48 bg-[#181a20] min-h-[calc(100vh-56px)]">
          <div className="p-4">
            {/* Dashboard */}
            <div className="mb-6">
              <div 
                onClick={() => setActiveSection("Dashboard")}
                className="flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors text-white bg-[#1E2026]"
              >
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
                Dashboard
              </div>
            </div>
            
            {/* Navigation */}
            <nav className="space-y-1">
              <div>
                <div 
                  onClick={() => toggleMenu("Assets")}
                  className={`flex items-center justify-between px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                    expandedMenus["Assets"] 
                      ? "text-white bg-[#474d57]" 
                      : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                    </svg>
                    Assets
                  </div>
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedMenus["Assets"] ? "rotate-180" : ""}`} />
                </div>
                
                {/* Assets Submenu */}
                {expandedMenus["Assets"] && (
                  <div className="ml-4 mt-1 space-y-1">
                    <div 
                      onClick={() => setActiveSection("Overview")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Overview" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Overview
                    </div>
                    <div 
                      onClick={() => setActiveSection("Spot")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Spot" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Spot
                    </div>
                    <div 
                      onClick={() => setActiveSection("Margin")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Margin" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Margin
                    </div>
                    <div 
                      onClick={() => setActiveSection("Futures")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Futures" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Futures
                    </div>
                    <div 
                      onClick={() => setActiveSection("Options")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Options" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Options
                    </div>
                    <div 
                      onClick={() => setActiveSection("Earn")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Earn" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Earn
                    </div>
                    <div 
                      onClick={() => setActiveSection("Funding")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Funding" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Funding
                    </div>
                  </div>
                )}
              </div>
              
              <div>
                <div 
                  onClick={() => toggleMenu("Orders")}
                  className={`flex items-center justify-between px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                    expandedMenus["Orders"] 
                      ? "text-white bg-[#474d57]" 
                      : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    Orders
                  </div>
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedMenus["Orders"] ? "rotate-180" : ""}`} />
                </div>
                
                {/* Orders Submenu */}
                {expandedMenus["Orders"] && (
                  <div className="ml-4 mt-1 space-y-1">
                    <div 
                      onClick={() => setActiveSection("Spot Order")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Spot Order" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Spot Order
                    </div>
                    <div 
                      onClick={() => setActiveSection("Futures Order")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Futures Order" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Futures Order
                    </div>
                    <div 
                      onClick={() => setActiveSection("P2P Order")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "P2P Order" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      P2P Order
                    </div>
                    <div 
                      onClick={() => setActiveSection("Transaction History")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Transaction History" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Transaction History
                    </div>
                    <div 
                      onClick={() => setActiveSection("Earn History")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Earn History" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Earn History
                    </div>
                    <div 
                      onClick={() => setActiveSection("Convert History")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Convert History" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Convert History
                    </div>
                    <div 
                      onClick={() => setActiveSection("Payment History")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Payment History" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Payment History
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                onClick={() => setActiveSection("Rewards Hub")}
                className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                  activeSection === "Rewards Hub" 
                    ? "text-white bg-[#474d57]" 
                    : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                }`}
              >
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                Rewards Hub
              </div>
              
              <div 
                onClick={() => setActiveSection("Referral")}
                className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                  activeSection === "Referral" 
                    ? "text-white bg-[#474d57]" 
                    : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                }`}
              >
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                Referral
              </div>
              
              <div>
                <div 
                  onClick={() => toggleMenu("Account")}
                  className={`flex items-center justify-between px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                    expandedMenus["Account"] 
                      ? "text-white bg-[#474d57]" 
                      : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                  }`}
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                    Account
                  </div>
                  <ChevronDown className={`h-3 w-3 transition-transform ${expandedMenus["Account"] ? "rotate-180" : ""}`} />
                </div>
                
                {/* Account Submenu */}
                {expandedMenus["Account"] && (
                  <div className="ml-4 mt-1 space-y-1">
                    <div 
                      onClick={() => setActiveSection("Identification")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Identification" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Identification
                    </div>
                    <div 
                      onClick={() => setActiveSection("Security")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Security" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Security
                    </div>
                    <div 
                      onClick={() => setActiveSection("Payment")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Payment" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Payment
                    </div>
                    <div 
                      onClick={() => setActiveSection("API Management")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "API Management" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      API Management
                    </div>
                    <div 
                      onClick={() => setActiveSection("Account Statement")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Account Statement" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Account Statement
                    </div>
                    <div 
                      onClick={() => setActiveSection("Financial Reports")}
                      className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                        activeSection === "Financial Reports" 
                          ? "text-white bg-[#474d57]" 
                          : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                      }`}
                    >
                      Financial Reports
                    </div>
                  </div>
                )}
              </div>
              
              <div 
                onClick={() => setActiveSection("Sub Accounts")}
                className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                  activeSection === "Sub Accounts" 
                    ? "text-white bg-[#474d57]" 
                    : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                }`}
              >
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
                Sub Accounts
              </div>
              
              <div 
                onClick={() => setActiveSection("Settings")}
                className={`flex items-center px-3 py-2 rounded text-sm cursor-pointer transition-colors ${
                  activeSection === "Settings" 
                    ? "text-white bg-[#474d57]" 
                    : "text-[#848e9c] hover:text-white hover:bg-[#2b3139]"
                }`}
              >
                <svg className="w-4 h-4 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
                Settings
              </div>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#181A20]">
          {renderMainContent()}
        </div>
      </div>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        isOpen={isProfileEditOpen}
        onClose={() => setIsProfileEditOpen(false)}
        currentName={userName || userProfile?.displayName || ''}
        currentSticker={userSticker}
        onSave={handleProfileSave}
      />
    </div>
  );
}