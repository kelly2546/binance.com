import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import { useNewsData } from "@/hooks/useCryptoData";

export default function NewsSection() {
  const { data: newsData, isLoading: newsLoading } = useNewsData();

  return (
    <div className="border border-line rounded-2xl p-6 bg-binance-card ml-[16px] mr-[16px] pt-[25px] pb-[25px] pl-[25px] pr-[25px] mt-[17px] mb-[17px] text-[20px] font-medium">
      {/* News Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-secondary">News</h3>
        <Button variant="ghost" className="text-icon-normal hover:text-secondary text-sm font-medium p-0">
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
            <a 
              key={news.id}
              href={news.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-secondary hover:text-primary cursor-pointer transition-colors"
            >
              {news.title}
            </a>
          ))
        ) : (
          <div className="text-icon-normal text-sm">
            No news available at the moment.
          </div>
        )}
      </div>
    </div>
  );
}