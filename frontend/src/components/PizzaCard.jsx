import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';

const PizzaCard = ({ pizza }) => {
  const { addToCart } = useContext(CartContext);

  const handleAddToCart = (e) => {
    e.preventDefault(); // Prevent navigating to detail page if button is inside a link, but it's not
    addToCart(pizza, 1);
    toast.success(`1x ${pizza.name} added to cart`);
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col"
    >
      <Link to={`/pizza/${pizza._id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={pizza.imageUrl} 
            alt={pizza.name} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link to={`/pizza/${pizza._id}`}>
            <h3 className="text-lg font-bold text-gray-900 hover:text-brand-red transition-colors">{pizza.name}</h3>
          </Link>
          <span className={`text-xs px-2 py-1 rounded-full ${pizza.category === 'Veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {pizza.category}
          </span>
        </div>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 flex-grow">{pizza.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-bold text-brand-red">₹{pizza.price}</span>
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={handleAddToCart}
            disabled={!pizza.isAvailable}
            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-colors ${
              pizza.isAvailable
                ? 'bg-brand-red hover:bg-red-700 text-white'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            {pizza.isAvailable ? 'Add to Cart' : 'Unavailable'}
          </button>
          <Link 
            to={`/pizza/${pizza._id}`}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 text-center py-2 rounded-lg text-sm font-bold transition-colors"
          >
            Details
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default PizzaCard;

// Card Polish: Implemented dynamic flex heights for consistent button layouts.