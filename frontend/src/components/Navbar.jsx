import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Pizza, ShoppingCart, User as UserIcon, LogOut } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartCount, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

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
            
            {user ? (
              <>
                <Link to="/orders" className="text-gray-700 hover:text-brand-red font-medium transition-colors">Orders</Link>
                {user.role === 'admin' && (
                  <Link to="/admin" className="text-gray-700 hover:text-brand-orange font-medium transition-colors">Admin</Link>
                )}
                <button onClick={handleLogout} className="flex items-center text-gray-700 hover:text-brand-red transition-colors">
                  <LogOut size={20} className="mr-1"/> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="flex items-center text-gray-700 hover:text-brand-red font-medium transition-colors">
                <UserIcon size={20} className="mr-1"/> Login
              </Link>
            )}
            
            <Link to="/cart" className="relative text-gray-700 hover:text-brand-red transition-colors">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-orange text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
