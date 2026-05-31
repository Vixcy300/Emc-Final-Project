import { Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Pizza, Clock, Heart } from 'lucide-react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const { user } = useContext(AuthContext);

  if (user) {
    return <Navigate to="/menu" replace />;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-128px)]">
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-24 bg-[url('https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-6xl md:text-8xl font-extrabold text-white mb-6 tracking-tight drop-shadow-xl"
          >
            Pizza <span className="text-brand-red">Palace</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-3xl text-gray-200 mb-10 max-w-2xl mx-auto drop-shadow-md font-medium"
          >
            Experience the authentic taste of freshly baked pizzas, delivered straight to your door.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Link 
              to="/menu" 
              className="inline-flex items-center px-10 py-5 bg-brand-red text-white text-xl font-bold rounded-full hover:bg-red-700 transition-all shadow-[0_0_20px_rgba(229,57,53,0.5)] hover:shadow-[0_0_30px_rgba(229,57,53,0.8)] transform hover:-translate-y-1"
            >
              Explore Menu <ArrowRight className="ml-3" size={24} />
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-16 text-gray-900">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-20 h-20 mx-auto bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mb-6">
                <Pizza size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Fresh Ingredients</h3>
              <p className="text-gray-600 text-lg">We source only the freshest and highest quality ingredients for every pizza.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-20 h-20 mx-auto bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mb-6">
                <Clock size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Fast Delivery</h3>
              <p className="text-gray-600 text-lg">Hot and fresh pizzas delivered to your doorstep in record time.</p>
            </div>
            <div className="p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
              <div className="w-20 h-20 mx-auto bg-brand-red/10 text-brand-red rounded-full flex items-center justify-center mb-6">
                <Heart size={40} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-800">Made with Love</h3>
              <p className="text-gray-600 text-lg">Every pizza is handcrafted by our expert chefs with passion.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
