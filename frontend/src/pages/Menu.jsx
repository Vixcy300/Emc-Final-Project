import { useState, useEffect } from 'react';
import axios from 'axios';
import PizzaCard from '../components/PizzaCard';
import { motion } from 'framer-motion';

const Menu = () => {
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const { data } = await axios.get('/api/pizzas');
        if (data.success) {
          setPizzas(data.data.filter(p => p.isAvailable));
        }
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch pizzas", error);
        setLoading(false);
      }
    };
    fetchPizzas();
  }, []);

  const filteredPizzas = pizzas.filter(pizza => {
    const matchesCategory = filter === 'All' || pizza.category === filter;
    const matchesSearch = pizza.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-128px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-red"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
      
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
        <div className="flex space-x-2 bg-white p-1 rounded-lg shadow-sm border border-gray-100">
          {['All', 'Veg', 'Non-Veg'].map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${
                filter === category 
                  ? 'bg-brand-red text-white shadow-sm' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        
        <div className="relative w-full md:w-64">
          <input 
            type="text" 
            placeholder="Search pizzas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-red/50 shadow-sm"
          />
        </div>
      </div>

      {filteredPizzas.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-xl text-gray-500">No pizzas found matching your criteria.</p>
        </div>
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          {filteredPizzas.map(pizza => (
            <PizzaCard key={pizza._id} pizza={pizza} />
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Menu;
