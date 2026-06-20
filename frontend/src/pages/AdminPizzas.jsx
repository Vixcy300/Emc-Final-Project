import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { Edit2, Trash2, Plus, X } from 'lucide-react';

const AdminPizzas = () => {
  const { user } = useContext(AuthContext);
  const [pizzas, setPizzas] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [showForm, setShowForm] = useState(false);
  const [editingPizzaId, setEditingPizzaId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Veg',
    imageUrl: '',
    isAvailable: true
  });

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

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleEditClick = (pizza) => {
    setFormData({
      name: pizza.name,
      description: pizza.description,
      price: pizza.price,
      category: pizza.category,
      imageUrl: pizza.imageUrl,
      isAvailable: pizza.isAvailable
    });
    setEditingPizzaId(pizza._id);
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
    setEditingPizzaId(null);
    setFormData({ name: '', description: '', price: '', category: 'Veg', imageUrl: '', isAvailable: true });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (editingPizzaId) {
        await axios.put(`/api/pizzas/${editingPizzaId}`, formData, config);
        toast.success('Pizza updated successfully');
      } else {
        await axios.post('/api/pizzas', formData, config);
        toast.success('Pizza added successfully');
      }
      setShowForm(false);
      setEditingPizzaId(null);
      setFormData({ name: '', description: '', price: '', category: 'Veg', imageUrl: '', isAvailable: true });
      fetchPizzas();
    } catch (error) {
      toast.error(error.response?.data?.message || (editingPizzaId ? 'Failed to update pizza' : 'Failed to add pizza'));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">{showForm ? (editingPizzaId ? 'Edit Pizza' : 'Add New Pizza') : 'Manage Pizzas'}</h2>
        {!showForm ? (
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-brand-red text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Plus size={18} className="mr-1" /> Add Pizza
          </button>
        ) : (
          <button 
            onClick={handleCancelClick}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
          >
            <X size={18} className="mr-1" /> Cancel
          </button>
        )}
      </div>

      {showForm ? (
        <form onSubmit={handleAddSubmit} className="max-w-2xl bg-gray-50 p-6 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Pizza Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-brand-red" />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Price (₹)</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-brand-red" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-gray-700 mb-2 text-sm font-medium">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} required className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-brand-red" rows="2"></textarea>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Category</label>
              <select name="category" value={formData.category} onChange={handleInputChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-brand-red">
                <option value="Veg">Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Specialty">Specialty</option>
              </select>
            </div>
            <div>
              <label className="block text-gray-700 mb-2 text-sm font-medium">Image URL</label>
              <input type="url" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} required placeholder="https://example.com/pizza.jpg" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-brand-red" />
            </div>
            <div className="md:col-span-2 flex items-center mt-2">
              <input type="checkbox" name="isAvailable" id="isAvailable" checked={formData.isAvailable} onChange={handleInputChange} className="w-4 h-4 text-brand-red rounded focus:ring-brand-red" />
              <label htmlFor="isAvailable" className="ml-2 text-gray-700 text-sm font-medium">Available on Menu</label>
            </div>
          </div>
          <button type="submit" className="w-full bg-brand-red text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors mt-4">
            {editingPizzaId ? 'Update Pizza' : 'Save Pizza'}
          </button>
        </form>
      ) : loading ? (
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
                    <button onClick={() => handleEditClick(pizza)} className="text-blue-500 hover:text-blue-700 mx-2" title="Edit">
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

