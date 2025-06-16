import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { useNewsData } from "@/hooks/useCryptoData";

export default function NewsSection() {
  const { data: newsData, isLoading: newsLoading } = useNewsData();

  return (
    <div className="border border-[#2b3139] rounded-2xl p-6 text-[#1E2026] bg-[#1e2329]">
      {/* News Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-[#EAECEF]">News</h3>
        <Button variant="ghost" className="text-[#848e9c] hover:text-[#EAECEF] text-sm p-0">
          View All News <ChevronRight className="ml-1 h-3 w-3" />
        </Button>
      </div>
      {/* News List */}
      <div className="space-y-3">
        {newsLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))
        ) : newsData ? (
          newsData.map((news) => (
            <div 
              key={news.id}
              className="text-sm text-[#EAECEF] hover:text-[#FCD535] cursor-pointer transition-colors"
            >
              {news.title}
            </div>
          ))
        ) : (
          <div className="text-[#848e9c] text-sm">
            Failed to load news data
          </div>
        )}
      </div>
    </div>
  );
}