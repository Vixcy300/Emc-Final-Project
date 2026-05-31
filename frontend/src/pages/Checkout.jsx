import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { MapPin, CreditCard } from 'lucide-react';

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);

  // Calculate final amounts
  const deliveryFee = cartTotal > 500 ? 0 : 50;
  const taxes = Math.round(cartTotal * 0.05);
  const finalTotal = cartTotal + deliveryFee + taxes;

  const placeOrder = async (e) => {
    e.preventDefault();
    if (!address.trim()) {
      toast.error('Please enter delivery address');
      return;
    }

    setLoading(true);
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
      };

      const orderData = {
        items: cartItems.map(item => ({
          pizza: item.pizza._id,
          qty: item.qty
        })),
        deliveryAddress: address,
        totalAmount: finalTotal
      };

      const { data } = await axios.post('/api/orders', orderData, config);

      if (data.success) {
        toast.success('Order placed successfully!');
        clearCart();
        navigate('/orders');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    }
    setLoading(false);
  };

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row">
        
        <div className="md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <CreditCard className="mr-2" /> Order Summary
          </h2>
          
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
            {cartItems.map((item) => (
              <div key={item.pizza._id} className="flex justify-between text-sm">
                <div className="flex items-center">
                  <span className="font-bold mr-2 text-gray-500">{item.qty}x</span>
                  <span className="font-medium text-gray-800">{item.pizza.name}</span>
                </div>
                <span className="text-gray-600">₹{item.pizza.price * item.qty}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-gray-200 pt-4 space-y-2 text-sm text-gray-600 mb-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{cartTotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes (5%)</span>
              <span>₹{taxes}</span>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-4 flex justify-between font-bold text-lg">
            <span>Total Amount</span>
            <span className="text-brand-red">₹{finalTotal}</span>
          </div>
        </div>

        <div className="md:w-1/2 p-8">
          <h2 className="text-xl font-bold mb-6 flex items-center">
            <MapPin className="mr-2" /> Delivery Details
          </h2>
          
          <form onSubmit={placeOrder}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input 
                type="text" 
                value={user?.name || ''} 
                disabled 
                className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Complete Delivery Address
              </label>
              <textarea 
                id="address"
                rows="4"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Flat No, Street Name, Landmark, City, Pincode"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red/50 focus:border-brand-red"
                required
              ></textarea>
            </div>
            

            
            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white transition-all ${
                loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-brand-red hover:bg-red-700 shadow-md'
              }`}
            >
              {loading ? 'Processing...' : 'Confirm Order (COD)'}
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
};

export default Checkout;
