import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Home, TrendingUp, Wallet, Settings, LogOut, ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";

interface MobileNavDrawerProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  expandedMenus: { [key: string]: boolean };
  toggleMenu: (menuName: string) => void;
}

export default function MobileNavDrawer({ 
  activeSection, 
  setActiveSection, 
  expandedMenus, 
  toggleMenu 
}: MobileNavDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { logout } = useFirebaseAuth();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setIsOpen(false);
  };

  const menuSections = [
    {
      title: "Dashboard",
      items: [
        { name: "Dashboard", icon: <Home className="h-4 w-4" /> },
        { name: "Overview", icon: <TrendingUp className="h-4 w-4" /> }
      ]
    },
    {
      title: "Wallet",
      items: [
        { name: "Spot", icon: <Wallet className="h-4 w-4" /> },
        { name: "Margin", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Futures", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Options", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Earn", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Funding", icon: <Wallet className="h-4 w-4" /> }
      ]
    },
    {
      title: "Orders",
      items: [
        { name: "Spot Order", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Futures Order", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "P2P Order", icon: <TrendingUp className="h-4 w-4" /> }
      ]
    },
    {
      title: "History",
      items: [
        { name: "Transaction History", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Earn History", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Convert History", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Payment History", icon: <TrendingUp className="h-4 w-4" /> }
      ]
    },
    {
      title: "Security",
      items: [
        { name: "Identification", icon: <Settings className="h-4 w-4" /> },
        { name: "Security", icon: <Settings className="h-4 w-4" /> },
        { name: "Payment", icon: <Settings className="h-4 w-4" /> },
        { name: "API Management", icon: <Settings className="h-4 w-4" /> }
      ]
    },
    {
      title: "More",
      items: [
        { name: "Account Statement", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Financial Reports", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Rewards Hub", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Referral", icon: <TrendingUp className="h-4 w-4" /> },
        { name: "Account", icon: <Settings className="h-4 w-4" /> },
        { name: "Sub Accounts", icon: <Settings className="h-4 w-4" /> },
        { name: "Settings", icon: <Settings className="h-4 w-4" /> }
      ]
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden text-white h-10 w-10 touch-manipulation"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-80 bg-binance-card border-line p-0 custom-scrollbar overflow-y-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-line">
            <div className="flex items-center space-x-3">
              <img 
                src="https://upload.wikimedia.org/wikipedia/commons/1/12/Binance_logo.svg" 
                alt="Binance" 
                className="h-6 w-auto"
              />
              <span className="text-white font-semibold">Menu</span>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 py-4">
            {menuSections.map((section) => (
              <div key={section.title} className="mb-2">
                <button
                  onClick={() => toggleMenu(section.title)}
                  className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-icon-normal hover:text-white hover:bg-binance transition-colors touch-manipulation"
                >
                  <span>{section.title}</span>
                  {expandedMenus[section.title] ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {expandedMenus[section.title] && (
                  <div className="ml-4 space-y-1">
                    {section.items.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => handleSectionChange(item.name)}
                        className={`w-full flex items-center space-x-3 px-4 py-2 text-sm transition-colors touch-manipulation ${
                          activeSection === item.name
                            ? "bg-primary text-black font-medium"
                            : "text-icon-normal hover:text-white hover:bg-binance"
                        }`}
                      >
                        {item.icon}
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Logout Button */}
          <div className="p-4 border-t border-line">
            <Button
              onClick={() => {
                logout();
                setIsOpen(false);
              }}
              variant="ghost"
              className="w-full flex items-center space-x-3 text-icon-normal hover:text-white hover:bg-binance touch-manipulation"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}