import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Cart = () => {
  const { cartItems, updateQty, removeFromCart, cartTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login?redirect=checkout');
    } else {
      navigate('/checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-128px)] py-12 px-4 text-center">
        <div className="bg-brand-red/10 p-6 rounded-full mb-6">
          <ShoppingBag size={64} className="text-brand-red" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-md">Looks like you haven't added any pizzas to your cart yet. Explore our menu to find your favorites!</p>
        <Link 
          to="/menu" 
          className="bg-brand-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition-colors shadow-md"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.pizza._id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex flex-col sm:flex-row items-center py-6 border-b border-gray-100 last:border-0"
                  >
                    <img 
                      src={item.pizza.imageUrl} 
                      alt={item.pizza.name} 
                      className="w-24 h-24 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
                    />
                    <div className="flex-1 flex flex-col items-center sm:items-start text-center sm:text-left mb-4 sm:mb-0">
                      <Link to={`/pizza/${item.pizza._id}`} className="text-lg font-bold hover:text-brand-red transition-colors">
                        {item.pizza.name}
                      </Link>
                      <p className="text-gray-500 text-sm mt-1">{item.pizza.category}</p>
                      <p className="font-bold text-brand-red mt-2">₹{item.pizza.price}</p>
                    </div>
                    
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center border border-gray-200 rounded-lg bg-gray-50">
                        <button 
                          onClick={() => updateQty(item.pizza._id, item.qty > 1 ? item.qty - 1 : 1)}
                          className="p-2 text-gray-500 hover:text-brand-red transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-bold text-sm">{item.qty}</span>
                        <button 
                          onClick={() => updateQty(item.pizza._id, item.qty + 1)}
                          className="p-2 text-gray-500 hover:text-brand-red transition-colors"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      
                      <p className="font-bold w-16 text-right">₹{item.pizza.price * item.qty}</p>
                      
                      <button 
                        onClick={() => removeFromCart(item.pizza._id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-6 pb-4 border-b border-gray-100">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{cartTotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Delivery Fee</span>
                <span>₹{cartTotal > 500 ? '0' : '50'}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>
                <span>₹{Math.round(cartTotal * 0.05)}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-4 mb-8">
              <div className="flex justify-between font-bold text-xl">
                <span>Total</span>
                <span className="text-brand-red">
                  ₹{cartTotal + (cartTotal > 500 ? 0 : 50) + Math.round(cartTotal * 0.05)}
                </span>
              </div>
            </div>
            
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={handleCheckout}
              className="w-full bg-brand-red text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-colors shadow-md"
            >
              Proceed to Checkout
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

// Shopping Cart: Cleaned up spacing blocks inside active item list containers.