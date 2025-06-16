import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Call to Action */}
      <section className="bg-[var(--binance-card)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">Start earning today</h2>
          <Button className="bg-[var(--binance-yellow)] text-black px-8 py-4 text-lg font-medium hover:bg-yellow-400">
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[var(--binance-dark)] border-t border-[var(--binance-border)] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Community */}
            <div>
              <h3 className="text-lg font-medium mb-4">Community</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: "fab fa-discord", name: "Discord" },
                  { icon: "fab fa-telegram", name: "Telegram" },
                  { icon: "fab fa-tiktok", name: "TikTok" },
                  { icon: "fab fa-facebook", name: "Facebook" },
                  { icon: "fab fa-twitter", name: "Twitter" },
                  { icon: "fab fa-reddit", name: "Reddit" },
                  { icon: "fab fa-instagram", name: "Instagram" },
                  { icon: "fab fa-youtube", name: "YouTube" },
                  { icon: "fas fa-phone", name: "Phone" }
                ].map((social) => (
                  <Button
                    key={social.name}
                    variant="outline"
                    size="icon"
                    className="w-8 h-8 bg-[var(--binance-card)] border-[var(--binance-border)] hover:bg-[var(--binance-yellow)] hover:text-black hover:border-[var(--binance-yellow)]"
                  >
                    <i className={social.icon}></i>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* About Us */}
            <div>
              <h3 className="text-lg font-medium mb-4">About Us</h3>
              <ul className="space-y-2 text-[var(--binance-gray)]">
                {[
                  "About", "Careers", "Announcements", "News", "Press", 
                  "Legal", "Terms", "Privacy", "Building Trust"
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Products */}
            <div>
              <h3 className="text-lg font-medium mb-4">Products</h3>
              <ul className="space-y-2 text-[var(--binance-gray)]">
                {[
                  "Exchange", "Buy Crypto", "Pay", "Academy", "Live",
                  "Tax", "Gift Card", "Launchpool", "Auto-Invest"
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Business */}
            <div>
              <h3 className="text-lg font-medium mb-4">Business</h3>
              <ul className="space-y-2 text-[var(--binance-gray)]">
                {[
                  "P2P Merchant Application",
                  "P2Pro Merchant Application",
                  "Listing Application",
                  "Institutional & VIP Services",
                  "Labs",
                  "Binance Connect"
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Learn & Service */}
            <div>
              <h3 className="text-lg font-medium mb-4">Learn</h3>
              <ul className="space-y-2 text-[var(--binance-gray)] mb-6">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Learn & Earn
                  </a>
                </li>
              </ul>
              
              <h3 className="text-lg font-medium mb-4">Service</h3>
              <ul className="space-y-2 text-[var(--binance-gray)]">
                {[
                  "Affiliate", "Referral", "BNB", "OTC Trading",
                  "Historical Market Data", "Trading Insight", "Proof of Reserves"
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-lg font-medium mb-4">Support</h3>
              <ul className="space-y-2 text-[var(--binance-gray)]">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    24/7 Chat Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[var(--binance-border)]">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-2 cursor-pointer">
                <i className="fas fa-globe text-[var(--binance-gray)]"></i>
                <span className="text-[var(--binance-gray)]">English</span>
                <ChevronDown className="h-3 w-3 text-[var(--binance-gray)]" />
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <span className="text-[var(--binance-gray)]">USD-$</span>
                <ChevronDown className="h-3 w-3 text-[var(--binance-gray)]" />
              </div>
            </div>
            <div className="text-[var(--binance-gray)] text-sm">
              © 2024 BAM Trading Services Inc. d.b.a. Binance.US - All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
