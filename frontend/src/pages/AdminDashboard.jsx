import { useContext } from 'react';
import { Link, Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, Pizza, ShoppingBag } from 'lucide-react';

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);

  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-[calc(100vh-128px)]">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r border-gray-100 p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-8 text-gray-800">Admin Panel</h2>
        
        <nav className="flex-1 space-y-2">
          <Link to="/admin" className="flex items-center space-x-3 px-4 py-3 bg-brand-red/10 text-brand-red rounded-lg font-medium transition-colors">
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </Link>
          <Link to="/admin/pizzas" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <Pizza size={20} />
            <span>Manage Pizzas</span>
          </Link>
          <Link to="/admin/orders" className="flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg font-medium transition-colors">
            <ShoppingBag size={20} />
            <span>Manage Orders</span>
          </Link>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-50 p-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
           <h3 className="text-2xl font-bold mb-4">Welcome back, Admin</h3>
           <p className="text-gray-500 mb-8">Select an option from the sidebar to manage the Pizza Palace platform.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
             <Link to="/admin/pizzas" className="p-6 border border-gray-200 rounded-xl hover:border-brand-red hover:shadow-md transition-all group">
               <Pizza size={40} className="mx-auto text-gray-400 group-hover:text-brand-red mb-4" />
               <h4 className="font-bold text-lg">Pizzas Catalogue</h4>
               <p className="text-sm text-gray-500 mt-2">Add, edit or remove pizzas</p>
             </Link>
             <Link to="/admin/orders" className="p-6 border border-gray-200 rounded-xl hover:border-brand-red hover:shadow-md transition-all group">
               <ShoppingBag size={40} className="mx-auto text-gray-400 group-hover:text-brand-red mb-4" />
               <h4 className="font-bold text-lg">Incoming Orders</h4>
               <p className="text-sm text-gray-500 mt-2">Update order statuses</p>
             </Link>
           </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminDashboard;
