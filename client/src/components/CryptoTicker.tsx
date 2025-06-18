
import { useCryptoData } from "@/hooks/useCryptoData";
import { useEffect, useState } from "react";

export default function CryptoTicker() {
  const { data: cryptoData, isLoading } = useCryptoData();
  const [tickerText, setTickerText] = useState("");

  useEffect(() => {
    if (cryptoData && cryptoData.length > 0) {
      const tickerItems = cryptoData.slice(0, 10).map(crypto => {
        const price = crypto.current_price ? 
          `$${parseFloat(crypto.current_price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` : 
          '$0.00';
        return `${crypto.symbol.toUpperCase()}${crypto.name}${price}`;
      });
      setTickerText(tickerItems.join(' • '));
    }
  }, [cryptoData]);

  if (isLoading || !tickerText) {
    return (
      <div className="bg-binance-card border-t border-b border-line py-3 overflow-hidden">
        <div className="animate-pulse text-icon-normal text-sm">
          Loading cryptocurrency data...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-binance-card border-t border-b border-line py-3 overflow-hidden relative">
      <div className="animate-scroll whitespace-nowrap text-secondary text-sm font-medium">
        <span className="inline-block">{tickerText} • {tickerText}</span>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  );
}
