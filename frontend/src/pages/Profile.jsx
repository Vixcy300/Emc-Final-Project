import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Shield, Calendar, ArrowLeft, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl shadow-lg text-center border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Access Denied</h2>
        <p className="text-gray-600 mb-6">Please log in to view your profile page.</p>
        <Link to="/login" className="inline-block px-6 py-3 bg-brand-red text-white font-semibold rounded-xl hover:bg-red-700 transition-colors shadow-md shadow-red-200">
          Go to Login
        </Link>
      </div>
    );
  }

  // Get first letter of user's name
  const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-gray-600 hover:text-brand-red font-medium transition-colors">
          <ArrowLeft size={18} className="mr-2" /> Back to Home
        </Link>
      </div>

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        {/* Banner Area */}
        <div className="h-40 bg-gradient-to-r from-brand-red to-brand-orange relative">
          <div className="absolute -bottom-16 left-8">
            <div className="w-32 h-32 rounded-2xl bg-white p-2 shadow-lg border border-gray-100 flex items-center justify-center">
              <div className="w-full h-full rounded-xl bg-brand-red text-white flex items-center justify-center text-5xl font-extrabold font-heading">
                {firstLetter}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Area */}
        <div className="pt-20 px-8 pb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 pb-8 mb-8">
            <div>
              <h1 className="text-3xl font-extrabold font-heading text-gray-900 mb-2">{user.name}</h1>
              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-red-100 text-brand-red' : 'bg-orange-100 text-brand-orange'}`}>
                  <Shield size={12} className="mr-1" /> {user.role === 'admin' ? 'Administrator' : 'Customer'}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-600">
                  <Calendar size={12} className="mr-1" /> Member since May 2026
                </span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex gap-3">
              <Link to="/orders" className="inline-flex items-center px-5 py-2.5 bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 transition-colors">
                <ShoppingBag size={18} className="mr-2" /> View Orders
              </Link>
              {user.role === 'admin' && (
                <Link to="/admin" className="inline-flex items-center px-5 py-2.5 bg-brand-orange text-white font-semibold rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-100">
                  Admin Panel
                </Link>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* User Credentials Column */}
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-xl font-bold font-heading text-gray-800">Account Details</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-3">
                  <div className="p-2.5 bg-white rounded-xl text-brand-red shadow-sm">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Full Name</p>
                    <p className="text-base font-semibold text-gray-800">{user.name}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-3">
                  <div className="p-2.5 bg-white rounded-xl text-brand-red shadow-sm">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Email Address</p>
                    <p className="text-base font-semibold text-gray-800 break-all">{user.email}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-3">
                  <div className="p-2.5 bg-white rounded-xl text-brand-red shadow-sm">
                    <Shield size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account Role</p>
                    <p className="text-base font-semibold text-gray-800 capitalize">{user.role}</p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start space-x-3">
                  <div className="p-2.5 bg-white rounded-xl text-brand-red shadow-sm">
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Account Status</p>
                    <p className="text-base font-semibold text-green-600">Active & Verified</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats Widget */}
            <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold font-heading text-gray-800 mb-4">Order Statistics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Preferred Choice</span>
                    <span className="font-semibold text-gray-800 text-sm">Veggie Delight</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-500 text-sm">Delivery Address</span>
                    <span className="font-semibold text-gray-800 text-sm">Saved Profile</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-500 text-sm">Payment Method</span>
                    <span className="font-semibold text-gray-800 text-sm">Cash on Delivery</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-brand-red/5 rounded-2xl border border-brand-red/10 text-center">
                <p className="text-xs text-brand-red font-bold uppercase tracking-widest mb-1">Loyalty Tier</p>
                <p className="text-lg font-black font-heading text-brand-red">GOLD PIZZA LOVER</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
