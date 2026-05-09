import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation, useInView } from 'framer-motion';
import { ArrowRight, Shield, Zap, Package, Star, Sparkles } from 'lucide-react';
import HeroScene from '../components/3D/HeroScene';
import FAQAccordion from '../components/ui/FAQAccordion';
import Mascot from '../components/mascot/Mascot';

const FeatureCard = ({ icon: Icon, title, description, delay }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={controls}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm 
                 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg 
                 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 
                      flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Icon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
      </div>
      <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{title}</h3>
      <p className="text-slate-600 dark:text-slate-400">{description}</p>
    </motion.div>
  );
};

const LandingPage = () => {
  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with instant search and seamless checkout experience."
    },
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Bank-grade encryption and secure payment gateways for worry-free transactions."
    },
    {
      icon: Package,
      title: "Easy Returns",
      description: "Hassle-free 7-day return policy with free pickup for eligible items."
    },
    {
      icon: Star,
      title: "Quality Assured",
      description: "Curated products from verified sellers with authentic quality guarantees."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-dark-bg dark:to-slate-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 glass border-b border-slate-200/50 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">ShopVerse</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Features</a>
              <a href="#faq" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">FAQ</a>
              <Link to="/products" className="text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Products</Link>
              <Link to="/login" className="px-4 py-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Sign In
              </Link>
              <Link to="/register" className="px-4 py-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white font-medium transition-colors shadow-lg shadow-primary-500/25">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                New: AI-Powered Recommendations
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white leading-tight">
                Shop Smarter, 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600"> Live Better</span>
              </h1>
              
              <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
                Discover premium products from trusted sellers. Experience seamless shopping with intelligent search, secure payments, and personalized recommendations.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/products" className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium bg-primary-600 hover:bg-primary-700 text-white transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50">
                  Start Shopping
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
                <Link to="/login" className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  Sign In
                </Link>
              </div>
              
              {/* Trust badges */}
              <div className="flex items-center gap-6 pt-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-primary-500" />
                  <span>Free Delivery</span>
                </div>
              </div>
            </motion.div>
            
            {/* 3D Hero */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <HeroScene />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Why Choose ShopVerse?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Built with modern technology to deliver the best shopping experience
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion />

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto text-center text-slate-500 dark:text-slate-400 text-sm">
          <p>© 2026 ShopVerse. All rights reserved. | Thapar Institute DBMS Project</p>
          <p className="mt-2">Group 2Q34 | Animesh Sudhanshu & Ashish Bhagat</p>
        </div>
      </footer>

      {/* Interactive Mascot */}
      <Mascot />
    </div>
  );
};

export default LandingPage;