import { Home, TrendingUp, Wallet, BarChart3, Settings } from "lucide-react";

interface MobileBottomNavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export default function MobileBottomNavigation({ activeSection, setActiveSection }: MobileBottomNavigationProps) {
  const navItems = [
    { 
      name: "Dashboard", 
      icon: <Home className="h-5 w-5" />, 
      section: "Dashboard",
      badge: null
    },
    { 
      name: "Markets", 
      icon: <TrendingUp className="h-5 w-5" />, 
      section: "Overview",
      badge: null
    },
    { 
      name: "Trade", 
      icon: <BarChart3 className="h-5 w-5" />, 
      section: "Spot",
      badge: null
    },
    { 
      name: "Wallet", 
      icon: <Wallet className="h-5 w-5" />, 
      section: "Futures",
      badge: "2"
    },
    { 
      name: "More", 
      icon: <Settings className="h-5 w-5" />, 
      section: "Settings",
      badge: null
    }
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-[#181a20] border-t border-[#474d57] z-50 safe-area-bottom">
      <div className="flex items-center justify-around py-2 px-1">
        {navItems.map((item) => (
          <button
            key={item.name}
            onClick={() => setActiveSection(item.section)}
            className={`flex flex-col items-center space-y-1 px-3 py-2 touch-manipulation min-w-[60px] transition-colors ${
              activeSection === item.section
                ? "text-primary"
                : "text-icon-normal"
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.badge && (
                <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </div>
              )}
            </div>
            <span className="text-xs font-medium">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}