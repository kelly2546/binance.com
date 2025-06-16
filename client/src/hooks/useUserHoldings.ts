import { useQuery } from "@tanstack/react-query";
import type { UserHolding } from "@shared/schema";

export function useUserHoldings(userId?: string) {
  return useQuery({
    queryKey: ["/api/user/holdings"],
    refetchInterval: 30000,
    enabled: !!userId,
  });
}