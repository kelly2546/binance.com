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
        
        <div className="text-center py-12">
          <p className="text-[#848e9c] text-lg">
            FAQ content is not currently available. Please check back later.
          </p>
        </div>
      </div>
    </section>
  );
}