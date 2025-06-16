import { useQuery } from "@tanstack/react-query";

export interface AssetData {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  total_volume: number;
}

export function useAssetsData() {
  return useQuery({
    queryKey: ['/api/assets-data'],
    queryFn: async (): Promise<AssetData[]> => {
      // Use CoinGecko's public API to fetch specific assets data
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,the-open-network,binancecoin,solana,cardano,dogecoin,polygon,avalanche-2&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h'
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch assets data');
      }
      
      return response.json();
    },
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  });
}