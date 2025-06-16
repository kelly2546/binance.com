import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

const faqData = [
  {
    id: 1,
    question: "What is cryptocurrency trading?",
    answer: "Cryptocurrency trading involves buying and selling digital currencies on an exchange platform. Traders can profit from price movements by purchasing cryptocurrencies when prices are low and selling when prices are high."
  },
  {
    id: 2,
    question: "How do I get started with crypto trading?",
    answer: "To start crypto trading, create an account on a reputable exchange, complete identity verification, deposit funds, and begin with small trades while learning market dynamics and risk management strategies."
  },
  {
    id: 3,
    question: "What are the risks of cryptocurrency trading?",
    answer: "Crypto trading involves significant risks including market volatility, potential total loss of investment, regulatory changes, security breaches, and technical issues. Never invest more than you can afford to lose."
  },
  {
    id: 4,
    question: "What is the difference between spot and futures trading?",
    answer: "Spot trading involves immediate buying/selling of cryptocurrencies at current market prices. Futures trading involves contracts to buy/sell assets at predetermined prices on future dates, often with leverage."
  },
  {
    id: 5,
    question: "How do I secure my cryptocurrency investments?",
    answer: "Use strong passwords, enable two-factor authentication, store large amounts in hardware wallets, never share private keys, and only use reputable exchanges with strong security measures."
  },
  {
    id: 6,
    question: "What factors affect cryptocurrency prices?",
    answer: "Crypto prices are influenced by market demand and supply, regulatory news, technological developments, institutional adoption, market sentiment, and macroeconomic factors."
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