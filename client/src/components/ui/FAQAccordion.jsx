import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <motion.div 
      className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300"
      initial={false}
    >
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset rounded-2xl"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-slate-900 dark:text-slate-100 pr-4">
          {question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400"
        >
          {isOpen ? <Minus size={18} /> : <Plus size={18} />}
        </motion.div>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-5 pt-0 text-slate-600 dark:text-slate-300 leading-relaxed">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQAccordion = ({ faqs = [] }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Default FAQs if none provided
  const defaultFaqs = [
    {
      question: "How do I create an account?",
      answer: "Click the 'Sign Up' button in the top right corner, fill in your details including a valid email and phone number, and verify your account through the confirmation email."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, net banking, and digital wallets like Paytm and PhonePe. All transactions are secured with bank-grade encryption."
    },
    {
      question: "How long does delivery take?",
      answer: "Standard delivery takes 3-5 business days within India. Express delivery (1-2 days) is available for select pin codes at checkout."
    },
    {
      question: "Can I return or exchange items?",
      answer: "Yes! We offer a 7-day return policy for most items. Products must be unused, in original packaging, with tags attached. Initiate returns from your order history."
    },
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking link via SMS and email. You can also view real-time status in your dashboard under 'My Orders'."
    },
    {
      question: "Is my data secure on ShopVerse?",
      answer: "Absolutely. We use SSL encryption, comply with data protection regulations, and never share your personal information with third parties without consent."
    }
  ];

  const items = faqs.length > 0 ? faqs : defaultFaqs;

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Everything you need to know about shopping on ShopVerse. Can't find your answer? 
            <button className="text-primary-600 dark:text-primary-400 hover:underline ml-1">
              Contact support
            </button>
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => toggleItem(index)}
            />
          ))}
        </div>

        {/* Still have questions CTA */}
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Still have questions?
          </p>
          <button className="inline-flex items-center px-6 py-3 rounded-xl font-medium bg-primary-600 hover:bg-primary-700 text-white transition-colors shadow-lg shadow-primary-500/25">
            Chat with us
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQAccordion;