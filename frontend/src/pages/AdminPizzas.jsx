import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus } from 'lucide-react';

const AdminPizzas = () => {
  const { user } = useContext(AuthContext);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPizzas = async () => {
    try {
      const { data } = await axios.get('/api/pizzas');
      if (data.success) {
        setPizzas(data.data);
      }
      setLoading(false);
    } catch (error) {
      toast.error('Failed to load pizzas');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const toggleAvailability = async (id, currentStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/api/pizzas/${id}`, { isAvailable: !currentStatus }, config);
      toast.success('Pizza status updated');
      fetchPizzas();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const deletePizza = async (id) => {
    if(window.confirm('Are you sure you want to delete this pizza?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/api/pizzas/${id}`, config);
        toast.success('Pizza deleted');
        fetchPizzas();
      } catch (error) {
        toast.error('Failed to delete pizza');
      }
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Manage Pizzas</h2>
        <button className="flex items-center px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors">
          <Plus size={18} className="mr-1" /> Add Pizza
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-y border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-600">Pizza</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Category</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Price</th>
                <th className="py-3 px-4 font-semibold text-gray-600">Status</th>
                <th className="py-3 px-4 font-semibold text-gray-600 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pizzas.map(pizza => (
                <tr key={pizza._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 flex items-center">
                    <img src={pizza.imageUrl} alt={pizza.name} className="w-10 h-10 rounded object-cover mr-3" />
                    <span className="font-medium">{pizza.name}</span>
                  </td>
                  <td className="py-3 px-4">{pizza.category}</td>
                  <td className="py-3 px-4">₹{pizza.price}</td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => toggleAvailability(pizza._id, pizza.isAvailable)}
                      className={`px-3 py-1 rounded-full text-xs font-bold ${pizza.isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                    >
                      {pizza.isAvailable ? 'Available' : 'Hidden'}
                    </button>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-blue-500 hover:text-blue-700 mx-2" title="Edit">
                      <Edit2 size={18} />
                    </button>
                    <button onClick={() => deletePizza(pizza._id)} className="text-red-500 hover:text-red-700" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminPizzas;
