import { useQuery } from "@tanstack/react-query";
import type { UserHolding } from "@shared/schema";

export function useUserHoldings(userId?: string) {
  return useQuery({
    queryKey: ["/api/user/test-holdings"],
    refetchInterval: 30000, // Refetch every 30 seconds for real-time updates
  });
}