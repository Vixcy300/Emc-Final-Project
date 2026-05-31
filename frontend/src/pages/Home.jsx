import { Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Pizza, Clock, Award } from 'lucide-react';
import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);
  const words = ['Redefined.', 'Perfected.', 'Elevated.'];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  if (user) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)] bg-white animate-fade-in">
      {/* Cinematic Left-Aligned Hero Section */}
      <section className="flex-grow flex items-center min-h-[85vh] px-6 sm:px-12 lg:px-24 bg-[url('/images/4465ab77-1c41-4d24-b96b-cd26bd92df0f_homep.jpg')] bg-cover bg-center relative overflow-hidden">
        {/* Dynamic gradient overlay: left-to-right fade for high-end text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-900/80 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent"></div>
        
        <div className="relative z-10 max-w-2xl text-left">
          <motion.span 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-[10px] font-bold tracking-widest text-brand-orange uppercase bg-orange-500/10 border border-brand-orange/20 px-3 py-1 rounded-md mb-6"
          >
            48-Hour Slow Fermentation
          </motion.span>

          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.1] font-heading"
          >
            Gourmet, <br />
            <span className="relative block h-[1.15em] text-brand-red overflow-hidden mt-2">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[index]}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute left-0 top-0 text-brand-red block w-full"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm sm:text-base lg:text-lg text-gray-300 mb-8 max-w-lg leading-relaxed font-sans"
          >
            Slow-fermented sourdough bases, organic locally-sourced toppings, and master fire-baking. Experience pizza crafted for true connoisseurs.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link 
              to="/login" 
              className="inline-flex items-center px-8 py-4 bg-brand-red text-white text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-red-700 transition-all shadow-lg shadow-brand-red/25 hover:shadow-brand-red/40 transform hover:-translate-y-0.5"
            >
              Order Now <ArrowRight className="ml-2.5" size={14} />
            </Link>
            
            <Link 
              to="/menu" 
              className="inline-flex items-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-widest rounded-xl border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all transform hover:-translate-y-0.5"
            >
              Discover the Menu
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-20">
            <h2 className="text-3xl font-extrabold text-gray-900 font-heading">Our Core Pillars</h2>
            <p className="text-sm text-gray-500 mt-2 font-sans">The philosophy behind every single gourmet preparation we make.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 text-brand-red rounded-xl flex items-center justify-center mb-5 border border-red-100">
                <Pizza size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-heading mb-2">Artisanal Sourdough</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">Every crust is slow-fermented for 48 hours using organic Italian wheat, achieving a signature blistered and airy texture.</p>
            </div>
            
            <div className="p-6 bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 text-brand-red rounded-xl flex items-center justify-center mb-5 border border-red-100">
                <Clock size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-heading mb-2">Thermal Fast Dispatch</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">Dispatched in advanced thermal delivery cases, ensuring your pizza arrives at your table exactly at fire-oven temperatures.</p>
            </div>
            
            <div className="p-6 bg-white rounded-2xl border border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-red-50 text-brand-red rounded-xl flex items-center justify-center mb-5 border border-red-100">
                <Award size={22} />
              </div>
              <h3 className="text-lg font-bold text-gray-900 font-heading mb-2">Master-Class Recipes</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans">Curated and handcrafted by award-winning pizzaiolos using exclusively DOP certified cheeses and fresh organic ingredients.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

// Layout Stability: Sealed hero heights to prevent shift variables.