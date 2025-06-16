import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "What is a cryptocurrency exchange?",
    answer: "A cryptocurrency exchange is a digital marketplace where users can buy, sell, and trade cryptocurrencies. Binance is one of the world's largest cryptocurrency exchanges, offering a secure platform for trading hundreds of digital assets."
  },
  {
    id: 2,
    question: "What products does Binance provide?",
    answer: "Binance offers a comprehensive suite of cryptocurrency services including spot trading, futures trading, options, savings products, staking, NFT marketplace, Binance Pay, and much more. We provide tools for both beginners and advanced traders."
  },
  {
    id: 3,
    question: "How to buy Bitcoin and other cryptocurrencies on Binance",
    answer: "You can buy Bitcoin and other cryptocurrencies on Binance through several methods: using a credit/debit card, bank transfer, P2P trading, or by depositing existing cryptocurrencies. Simply create an account, complete verification, and choose your preferred payment method."
  },
  {
    id: 4,
    question: "How to track cryptocurrency prices",
    answer: "Binance provides real-time price tracking for all listed cryptocurrencies. You can monitor prices through our website, mobile app, or API. We offer advanced charting tools, price alerts, and market analysis to help you stay informed about market movements."
  },
  {
    id: 5,
    question: "How to trade cryptocurrencies on Binance",
    answer: "Trading on Binance is simple: deposit funds into your account, navigate to the trading interface, select your trading pair, choose between market or limit orders, and execute your trade. We offer both basic and advanced trading interfaces to suit your experience level."
  },
  {
    id: 6,
    question: "How to earn from crypto on Binance",
    answer: "Binance offers multiple ways to earn from crypto including staking, savings products, liquidity farming, Launchpool, and trading. You can earn passive income through our various earn products or actively trade to generate profits."
  }
];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <section className="bg-[#181A20] py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#EAECEF]">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4">
          {faqData.map((faq) => (
            <div 
              key={faq.id}
              className="bg-transparent border border-[#2b3139] rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[#2b3139] transition-colors"
              >
                <div className="flex items-center">
                  <span className="text-[#848e9c] text-lg font-medium mr-4">
                    {faq.id}
                  </span>
                  <span className="text-[#EAECEF] text-lg font-medium">
                    {faq.question}
                  </span>
                </div>
                <Plus 
                  className={`h-5 w-5 text-[#EAECEF] transition-transform duration-200 ${
                    openItems.includes(faq.id) ? 'rotate-45' : ''
                  }`}
                />
              </button>
              
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-5">
                  <div className="pl-12">
                    <p className="text-[#848e9c] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}