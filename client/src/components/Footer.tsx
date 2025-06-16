import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

export default function Footer() {
  return (
    <>
      {/* Call to Action */}
      <section className="bg-transparent border border-[#2b3139] rounded-lg mx-4 sm:mx-6 lg:mx-8 my-20 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-[#EAECEF]">Start earning today</h2>
          <Button className="bg-[#FCD535] text-black px-8 py-4 text-lg font-semibold hover:bg-[#e6c230]">
            Sign Up Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#181A20] border-t border-[#2b3139] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
            {/* Community */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-[#EAECEF]">Community</h3>
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
                    className="w-8 h-8 bg-transparent border-[#2b3139] hover:bg-[#FCD535] hover:text-black hover:border-[#FCD535] text-[#848e9c]"
                  >
                    <i className={social.icon}></i>
                  </Button>
                ))}
              </div>
            </div>
            
            {/* About Us */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-[#EAECEF]">About Us</h3>
              <ul className="space-y-2 text-[#848e9c]">
                {[
                  "About", "Careers", "Announcements", "News", "Press", 
                  "Legal", "Terms", "Privacy", "Building Trust"
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#EAECEF] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Products */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-[#EAECEF]">Products</h3>
              <ul className="space-y-2 text-[#848e9c]">
                {[
                  "Exchange", "Buy Crypto", "Pay", "Academy", "Live",
                  "Tax", "Gift Card", "Launchpool", "Auto-Invest"
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#EAECEF] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Business */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-[#EAECEF]">Business</h3>
              <ul className="space-y-2 text-[#848e9c]">
                {[
                  "P2P Merchant Application",
                  "P2Pro Merchant Application",
                  "Listing Application",
                  "Institutional & VIP Services",
                  "Labs",
                  "Binance Connect"
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#EAECEF] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Learn & Service */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-[#EAECEF]">Learn</h3>
              <ul className="space-y-2 text-[#848e9c] mb-6">
                <li>
                  <a href="#" className="hover:text-[#EAECEF] transition-colors">
                    Learn & Earn
                  </a>
                </li>
              </ul>
              
              <h3 className="text-lg font-medium mb-4 text-[#EAECEF]">Service</h3>
              <ul className="space-y-2 text-[#848e9c]">
                {[
                  "Affiliate", "Referral", "BNB", "OTC Trading",
                  "Historical Market Data", "Trading Insight", "Proof of Reserves"
                ].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-[#EAECEF] transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Support */}
            <div>
              <h3 className="text-lg font-medium mb-4 text-[#EAECEF]">Support</h3>
              <ul className="space-y-2 text-[#848e9c]">
                <li>
                  <a href="#" className="hover:text-[#EAECEF] transition-colors">
                    24/7 Chat Support
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-[#2b3139]">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="flex items-center space-x-2 cursor-pointer">
                <i className="fas fa-globe text-[#848e9c]"></i>
                <span className="text-[#848e9c]">English</span>
                <ChevronDown className="h-3 w-3 text-[#848e9c]" />
              </div>
              <div className="flex items-center space-x-2 cursor-pointer">
                <span className="text-[#848e9c]">USD-$</span>
                <ChevronDown className="h-3 w-3 text-[#848e9c]" />
              </div>
            </div>
            <div className="text-[#848e9c] text-sm">
              © 2024 BAM Trading Services Inc. d.b.a. Binance.US - All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
