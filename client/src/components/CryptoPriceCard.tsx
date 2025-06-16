import { useCryptoData, useNewsData } from "@/hooks/useCryptoData";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export default function CryptoPriceCard() {
  const { data: cryptoData, isLoading: cryptoLoading } = useCryptoData();
  const { data: newsData, isLoading: newsLoading } = useNewsData();

  const getCryptoIcon = (symbol: string) => {
    switch (symbol) {
      case "BTC":
        return "🟠";
      case "ETH":
        return "🔵";
      case "BNB":
        return "🟡";
      case "XRP":
        return "⚫";
      case "SOL":
        return "🟣";
      default:
        return "⚪";
    }
  };

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (num >= 1000) {
      return `$${num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    }
    return `$${num.toFixed(2)}`;
  };

  const formatChange = (change: string) => {
    const num = parseFloat(change);
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  return (
    <div className="bg-[var(--binance-card)] rounded-lg p-6">
      {/* Tabs */}
      <div className="flex mb-6 border-b border-[var(--binance-border)]">
        <button className="pb-4 px-1 border-b-2 border-[var(--binance-yellow)] text-white font-medium">
          Popular
        </button>
        <button className="pb-4 px-4 text-[var(--binance-gray)] hover:text-white">
          New Listing
        </button>
        <div className="ml-auto">
          <Button variant="ghost" className="text-[var(--binance-gray)] hover:text-white text-sm p-0">
            View All 350+ Coins <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
      
      {/* Crypto List */}
      <div className="space-y-4">
        {cryptoLoading ? (
          // Loading skeleton
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <Skeleton className="w-8 h-8 rounded-full mr-3" />
                <div>
                  <Skeleton className="h-4 w-12 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-4 w-20 mb-1" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          ))
        ) : cryptoData ? (
          cryptoData.map((crypto) => (
            <div key={crypto.id} className="flex items-center justify-between py-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3 overflow-hidden">
                  <img 
                    src={crypto.image || ''} 
                    alt={crypto.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.nextElementSibling!.textContent = getCryptoIcon(crypto.symbol);
                    }}
                  />
                  <span className="text-xl hidden">{getCryptoIcon(crypto.symbol)}</span>
                </div>
                <div>
                  <div className="font-medium">{crypto.symbol}</div>
                  <div className="text-[var(--binance-gray)] text-sm">{crypto.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium">
                  {crypto.current_price ? formatPrice(crypto.current_price) : 'N/A'}
                </div>
                <div 
                  className={`text-sm ${
                    parseFloat(crypto.price_change_percentage_24h || '0') >= 0 
                      ? 'text-[var(--binance-green)]' 
                      : 'text-[var(--binance-red)]'
                  }`}
                >
                  {crypto.price_change_percentage_24h ? formatChange(crypto.price_change_percentage_24h) : 'N/A'}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-[var(--binance-gray)]">
            Failed to load cryptocurrency data
          </div>
        )}
      </div>
      
      {/* News Section */}
      <div className="mt-8 pt-6 border-t border-[var(--binance-border)]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">News</h3>
          <Button variant="ghost" className="text-[var(--binance-gray)] hover:text-white text-sm p-0">
            View All News <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
        <div className="space-y-3">
          {newsLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-4 w-full" />
            ))
          ) : newsData ? (
            newsData.map((news) => (
              <div 
                key={news.id}
                className="text-sm hover:text-[var(--binance-yellow)] cursor-pointer transition-colors"
              >
                {news.title}
              </div>
            ))
          ) : (
            <div className="text-[var(--binance-gray)] text-sm">
              Failed to load news data
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
