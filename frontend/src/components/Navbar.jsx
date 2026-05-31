import { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pizza, ShoppingCart, User as UserIcon, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount, clearCart } = useContext(CartContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  const handleLogout = () => {
    logout();
    clearCart();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2 text-brand-red">
            <Pizza size={32} />
            <span className="font-bold text-xl tracking-tight">Pizza Palace</span>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/menu" className="text-gray-700 hover:text-brand-red font-medium transition-colors">Menu</Link>
            
            {user && (
              <Link to="/orders" className="text-gray-700 hover:text-brand-red font-medium transition-colors">Orders</Link>
            )}
            
            <Link to="/cart" className="relative text-gray-700 hover:text-brand-red transition-colors mr-2">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)} 
                  className="w-9 h-9 rounded-full bg-brand-red text-white flex items-center justify-center font-bold text-base cursor-pointer hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-orange focus:ring-offset-2"
                >
                  {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 py-3 z-50 transform origin-top-right transition-all duration-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-800 break-all">{user.name}</p>
                      <p className="text-xs text-gray-400 break-all">{user.email}</p>
                      <span className={`inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${user.role === 'admin' ? 'bg-red-100 text-brand-red' : 'bg-orange-100 text-brand-orange'}`}>
                        {user.role === 'admin' ? 'Admin' : 'Customer'}
                      </span>
                    </div>
                    
                    <div className="py-2">
                      <Link 
                        to="/profile" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-red transition-colors"
                      >
                        <UserIcon size={16} className="mr-2.5 text-gray-400" /> My Profile
                      </Link>
                      <Link 
                        to="/orders" 
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-red transition-colors"
                      >
                        <ShoppingCart size={16} className="mr-2.5 text-gray-400" /> Order History
                      </Link>
                      {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          onClick={() => setDropdownOpen(false)}
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-brand-red transition-colors"
                        >
                          <Pizza size={16} className="mr-2.5 text-gray-400" /> Admin Dashboard
                        </Link>
                      )}
                    </div>
                    
                    <div className="border-t border-gray-100 pt-2 px-2">
                      <button 
                        onClick={() => {
                          setDropdownOpen(false);
                          handleLogout();
                        }}
                        className="w-full flex items-center px-3 py-2 text-sm text-red-600 rounded-xl hover:bg-red-50 hover:text-red-700 transition-colors"
                      >
                        <LogOut size={16} className="mr-2.5" /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center text-gray-700 hover:text-brand-red font-medium transition-colors">
                <UserIcon size={20} className="mr-1"/> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// UI Adjustment: Optimized mobile layouts by applying fluid responsive padding blocks.