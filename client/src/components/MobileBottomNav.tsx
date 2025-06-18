import { Button } from "@/components/ui/button";
import { Home, TrendingUp, Wallet, BarChart3, Settings } from "lucide-react";

interface MobileBottomNavProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function MobileBottomNav({ activeSection, setActiveSection }: MobileBottomNavProps) {
  const navItems = [
    { name: "Dashboard", icon: <Home className="h-5 w-5" />, section: "Dashboard" },
    { name: "Overview", icon: <BarChart3 className="h-5 w-5" />, section: "Overview" },
    { name: "Spot", icon: <Wallet className="h-5 w-5" />, section: "Spot" },
    { name: "Futures", icon: <TrendingUp className="h-5 w-5" />, section: "Futures" },
    { name: "Settings", icon: <Settings className="h-5 w-5" />, section: "Settings" }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-binance-card border-t border-line z-40">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Button
            key={item.name}
            variant="ghost"
            size="sm"
            onClick={() => setActiveSection(item.section)}
            className={`flex flex-col items-center space-y-1 px-2 py-3 touch-manipulation min-w-[64px] ${
              activeSection === item.section
                ? "text-primary"
                : "text-icon-normal hover:text-white"
            }`}
          >
            {item.icon}
            <span className="text-xs font-medium">{item.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}