import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";

const faqData: { id: number; question: string; answer: string; }[] = [];

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