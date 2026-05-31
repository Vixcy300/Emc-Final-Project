import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { User, Mail, Shield, ShieldCheck, Key, MapPin, CreditCard, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return (
      <div className="max-w-md mx-auto my-16 p-8 bg-white rounded-2xl shadow-sm text-center border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-2">Authentication Required</h2>
        <p className="text-gray-500 mb-6 text-sm">Please sign in to access your personal account settings.</p>
        <Link to="/login" className="inline-block px-5 py-2.5 bg-brand-red text-white text-sm font-semibold rounded-lg hover:bg-red-700 transition-colors shadow-sm">
          Sign In
        </Link>
      </div>
    );
  }

  const initial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      {/* Navigation */}
      <div className="mb-8">
        <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 font-medium transition-colors">
          <ArrowLeft size={16} className="mr-2" /> Back to dashboard
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden">
        {/* Header Block */}
        <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 rounded-full bg-brand-red text-white flex items-center justify-center text-2xl font-bold select-none shadow-inner">
              {initial}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 leading-tight">{user.name}</h1>
              <p className="text-sm text-gray-500 mt-1">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold ${user.role === 'admin' ? 'bg-red-50 text-brand-red border border-brand-red/10' : 'bg-gray-100 text-gray-700 border border-gray-200'}`}>
              <Shield size={12} className="mr-1.5" />
              {user.role === 'admin' ? 'Administrator' : 'Customer Account'}
            </span>
          </div>
        </div>

        {/* Settings Grid */}
        <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Account Settings */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-1">Personal Details</h2>
              <p className="text-xs text-gray-400">Your core login credentials and account identifications.</p>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-200/80 flex items-start space-x-3.5">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                    <User size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Full Name</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">{user.name}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-200/80 flex items-start space-x-3.5">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Email Address</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5 truncate">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-900 uppercase tracking-wider mb-1">Security & Permissions</h2>
              <p className="text-xs text-gray-400">Settings governing authorization levels and access controls.</p>
              
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-gray-200/80 flex items-start space-x-3.5">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                    <ShieldCheck size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Role Clearance</p>
                    <p className="text-sm font-semibold text-gray-800 mt-0.5 capitalize">{user.role}</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-gray-200/80 flex items-start space-x-3.5">
                  <div className="p-2 bg-gray-50 rounded-lg text-gray-400">
                    <Key size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Two-Factor Auth</p>
                    <p className="text-sm font-semibold text-gray-500 mt-0.5">Not Configured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preferences and Metadata */}
          <div className="space-y-6">
            <div className="p-6 rounded-2xl border border-gray-200 bg-gray-50/30">
              <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4">Billing & Delivery</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-white border border-gray-200 rounded text-gray-400 mt-0.5">
                    <MapPin size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-700">Default Address</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Configured during checkout</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="p-1.5 bg-white border border-gray-200 rounded text-gray-400 mt-0.5">
                    <CreditCard size={14} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-700">Preferred Method</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Cash on Delivery (COD)</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200/60">
                <div className="flex justify-between items-center text-xs text-gray-400">
                  <span>System Status</span>
                  <span className="font-semibold text-green-600 flex items-center">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5 animate-pulse"></span>
                    Verified
                  </span>
                </div>
              </div>
            </div>
            
            <div className="text-center p-4 rounded-xl border border-dashed border-gray-200">
              <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Session Token</p>
              <p className="text-xs font-mono text-gray-500 mt-1 truncate">Active Session (JWT Secured)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

// Loading Transition: Streamlined initial view checks to prevent layout shifts during assembly.