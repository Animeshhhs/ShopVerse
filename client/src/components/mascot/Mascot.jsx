import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Sparkles, HelpCircle } from 'lucide-react';

const MascotTooltip = ({ message, position }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className={`absolute ${position} z-50 max-w-xs p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700`}
      style={{ bottom: '100%', right: '0', marginBottom: '12px' }}
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-4 h-4 text-primary-600 dark:text-primary-400" />
        </div>
        <p className="text-sm text-slate-700 dark:text-slate-300">{message}</p>
      </div>
      {/* Arrow */}
      <div className="absolute bottom-[-6px] right-6 w-3 h-3 bg-white dark:bg-slate-800 border-r border-b border-slate-200 dark:border-slate-700 rotate-45" />
    </motion.div>
  );
};

const Mascot = () => {
  const [state, setState] = useState('idle'); // idle, active, helping
  const [showTooltip, setShowTooltip] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');

  // Mascot messages based on state
  const messages = {
    idle: "👋 Hi! I'm Shop, your shopping assistant!",
    active: "✨ Click anywhere to explore features!",
    helping: "💡 Need help? Ask me anything!"
  };

  // Change state based on user interaction
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) {
        setState('active');
        setCurrentMessage(messages.active);
      } else {
        setState('idle');
        setCurrentMessage(messages.idle);
      }
    };

    const handleClick = () => {
      setState('helping');
      setCurrentMessage(messages.helping);
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 4000);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('click', handleClick);

    // Initial message
    setCurrentMessage(messages.idle);
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  // Mascot animation variants
  const mascotVariants = {
    idle: { 
      y: [0, -8, 0],
      rotate: [0, 2, -2, 0],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    },
    active: { 
      scale: [1, 1.05, 1],
      transition: { duration: 0.3 }
    },
    helping: { 
      scale: 1.1,
      y: -5,
      transition: { type: "spring", stiffness: 300 }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && currentMessage && (
          <MascotTooltip message={currentMessage} position="bottom-right" />
        )}
      </AnimatePresence>

      {/* Mascot Character */}
      <motion.button
        variants={mascotVariants}
        animate={state}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setState('helping');
          setCurrentMessage("🎯 Pro tip: Use the search bar to find products instantly!");
          setShowTooltip(true);
          setTimeout(() => setShowTooltip(false), 4000);
        }}
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 
                   shadow-lg shadow-primary-500/40 flex items-center justify-center cursor-pointer
                   border-4 border-white dark:border-slate-800 overflow-hidden group"
        aria-label="Chat with Shop assistant"
      >
        {/* Mascot Face */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Eyes */}
          <div className="absolute top-1/3 left-1/4 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full">
            <div className="absolute top-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-800 rounded-full" />
          </div>
          <div className="absolute top-1/3 right-1/4 w-3 h-3 md:w-4 md:h-4 bg-white rounded-full">
            <div className="absolute top-1 right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-slate-800 rounded-full" />
          </div>
          
          {/* Smile */}
          <motion.div 
            className="absolute bottom-1/4 w-8 h-4 md:w-10 md:h-5 border-b-4 border-white rounded-b-full"
            animate={{ 
              scaleY: state === 'helping' ? 1.2 : 1,
              scaleX: state === 'helping' ? 1.1 : 1
            }}
          />
          
          {/* Sparkle effect when helping */}
          {state === 'helping' && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-2 -right-2"
            >
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </motion.div>
          )}
        </div>

        {/* Hover glow effect */}
        <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
      </motion.button>

      {/* Quick action button */}
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-3 px-4 py-2 rounded-full bg-white dark:bg-slate-800 text-sm font-medium 
                   text-slate-700 dark:text-slate-300 shadow-lg border border-slate-200 dark:border-slate-700
                   hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors flex items-center gap-2"
        onClick={() => {
          setCurrentMessage("🛍️ Browse our featured products below!");
          setShowTooltip(true);
          setTimeout(() => {
            setShowTooltip(false);
            document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
          }, 3000);
        }}
      >
        <MessageCircle className="w-4 h-4" />
        Ask Shop
      </motion.button>
    </div>
  );
};

export default Mascot;