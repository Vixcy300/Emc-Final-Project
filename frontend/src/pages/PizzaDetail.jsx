import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import toast from 'react-hot-toast';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

const PizzaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);
  
  const [pizza, setPizza] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchPizza = async () => {
      try {
        const { data } = await axios.get(`/api/pizzas/${id}`);
        if (data.success) {
          setPizza(data.data);
        }
        setLoading(false);
      } catch (error) {
        toast.error('Failed to load pizza details');
        setLoading(false);
      }
    };
    fetchPizza();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(pizza, qty);
    toast.success(`${qty}x ${pizza.name} added to cart`);
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-128px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-brand-red"></div>
      </div>
    );
  }

  if (!pizza) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold mb-4">Pizza not found</h2>
        <Link to="/menu" className="text-brand-red hover:underline">Back to Menu</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/menu" className="inline-flex items-center text-gray-600 hover:text-brand-red mb-8 transition-colors">
        <ArrowLeft size={20} className="mr-2" /> Back to Menu
      </Link>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img 
              src={pizza.imageUrl} 
              alt={pizza.name} 
              className="w-full h-full object-cover min-h-[400px]"
            />
          </div>
          
          <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{pizza.name}</h1>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${pizza.category === 'Veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {pizza.category}
              </span>
            </div>
            
            <p className="text-gray-600 text-lg mb-8">{pizza.description}</p>
            
            <div className="text-4xl font-bold text-brand-red mb-8">
              ₹{pizza.price}
            </div>
            
            <div className="flex items-center space-x-6 mb-8">
              <span className="font-medium text-gray-700">Quantity</span>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button 
                  onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-l-lg transition-colors"
                >
                  <Minus size={20} />
                </button>
                <span className="px-4 py-2 font-bold w-12 text-center">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-r-lg transition-colors"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              disabled={!pizza.isAvailable}
              className={`w-full py-4 rounded-xl flex items-center justify-center font-bold text-lg transition-all ${
                pizza.isAvailable 
                  ? 'bg-brand-red text-white hover:bg-red-700 shadow-md hover:shadow-lg' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingCart className="mr-2" />
              {pizza.isAvailable ? `Add to Cart - ₹${pizza.price * qty}` : 'Currently Unavailable'}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PizzaDetail;
