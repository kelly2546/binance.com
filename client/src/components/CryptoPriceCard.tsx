import { useCryptoData } from "@/hooks/useCryptoData";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";

export default function CryptoPriceCard() {
  const { data: cryptoData, isLoading: cryptoLoading } = useCryptoData();

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
    <div className="border border-line rounded-2xl p-6 lg:p-8 bg-binance-card h-full flex flex-col">
      {/* Tabs */}
      <div className="flex mb-6 border-b border-line">
        <button className="pb-4 px-1 border-b-2 border-primary text-secondary font-medium text-sm">
          Popular
        </button>
        <button className="pb-4 px-4 text-icon-normal hover:text-secondary font-medium text-sm">
          New Listing
        </button>
        <div className="ml-auto">
          <Button variant="ghost" className="text-icon-normal hover:text-secondary text-sm font-medium p-0">
            View All 350+ Coins <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </div>
      {/* Crypto List */}
      <div className="flex-1 space-y-4">
        {cryptoLoading ? (
          // Loading skeleton
          (Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between py-3">
              <div className="flex items-center">
                <Skeleton className="w-10 h-10 rounded-full mr-4" />
                <div>
                  <Skeleton className="h-4 w-12 mb-2" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
              <div className="text-right">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-3 w-12" />
              </div>
            </div>
          )))
        ) : cryptoData ? (
          cryptoData.slice(0, 6).map((crypto) => (
            <div key={crypto.id} className="flex items-center justify-between py-3 hover:bg-binance transition-colors rounded-lg px-2">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full flex items-center justify-center mr-4 overflow-hidden">
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
                  <div className="font-semibold text-secondary text-base">{crypto.symbol}</div>
                  <div className="text-icon-normal text-sm">{crypto.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-medium text-secondary text-base">
                  {crypto.current_price ? formatPrice(crypto.current_price) : 'N/A'}
                </div>
                <div 
                  className={`text-sm font-medium ${
                    parseFloat(crypto.price_change_percentage_24h || '0') >= 0 
                      ? 'text-success' 
                      : 'text-error'
                  }`}
                >
                  {crypto.price_change_percentage_24h ? formatChange(crypto.price_change_percentage_24h) : 'N/A'}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-icon-normal text-lg font-semibold">
            Failed to load cryptocurrency data
          </div>
        )}
      </div>
    </div>
  );
}
