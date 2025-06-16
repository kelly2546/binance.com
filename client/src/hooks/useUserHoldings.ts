import { useQuery } from "@tanstack/react-query";

interface CryptoBalance {
  symbol: string;
  name: string;
  balance: number;
  icon: string;
}

export function useUserHoldings(userId?: string) {
  return useQuery<CryptoBalance[]>({
    queryKey: ["/api/user/holdings"],
    refetchInterval: 30000,
    enabled: !!userId,
  });
}