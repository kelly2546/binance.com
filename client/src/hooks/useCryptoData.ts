import { useQuery } from "@tanstack/react-query";
import type { Cryptocurrency } from "@shared/schema";

export function useCryptoData() {
  return useQuery<Cryptocurrency[]>({
    queryKey: ["/api/crypto"],
    refetchInterval: 30000, // Refetch every 30 seconds
  });
}

export function useNewsData() {
  return useQuery<Array<{ id: number; title: string; url: string }>>({
    queryKey: ["/api/news"],
  });
}
