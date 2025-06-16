import { useQuery } from "@tanstack/react-query";

export function useTestAuth() {
  const { data: user, isLoading } = useQuery({
    queryKey: ["/api/auth/test-user"],
    retry: false,
  });

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
  };
}