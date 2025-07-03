import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import Footer from '../Footer';

export default function AdminPanel() {
  const [categoryName, setCategoryName] = useState('');
  const [message, setMessage] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/categories', {
        categoryName,
      });

      if (response.status === 200) {
        setMessage('Category successfully added!');
        setCategoryName('');
        fetchingCategory();
      }
    } catch (error) {
      setMessage('An error occurred while adding the category.');
    }
  };

  const fetchingCategory = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3002/allcategories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      setMessage('An error occurred while fetching categories.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchingCategory();
  }, []);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleLogout = () => {
    navigate('/adminlogin');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-5xl font-bold mb-6 text-blue-600 animate-pulse">Welcome to the Admin Panel</h1>
      <p className="text-lg mb-4 text-gray-600">
        Add new categories for your platform. Simply enter the category name and click save.
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 max-w-md w-full transition-all duration-300 transform hover:scale-105"
      >
        <div className="mb-4">
          <label htmlFor="categoryName" className="block text-gray-700 font-bold mb-2">
            Category Name
          </label>
          <input
            type="text"
            id="categoryName"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-4 focus:ring-blue-500"
            placeholder="Enter category name"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Save Category
        </button>
        {message && <p className="text-green-500 mt-4">{message}</p>}
      </form>

      <div className="flex space-x-4 mt-6">
        <button
          onClick={handleGoHome}
          className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition-colors transform hover:scale-105"
        >
          Go to Home
        </button>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors transform hover:scale-105"
        >
          Logout
        </button>
      </div>

      <div className="w-full mt-10">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600 animate-fadeIn">Saved Categories</h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full h-max border border-blue-200">
          {loading ? (
            <Loader />
          ) : (
            <ul className="flex w-full gap-5 flex-wrap transition-opacity duration-700 opacity-100">
              {categories.length === 0 ? (
                <li className="text-gray-700 text-center">No categories found.</li>
              ) : (
                categories.map((category) => (
                  <li
                    key={category._id}
                    className="w-[200px] hover:border-gray-700 p-2 border border-gray-300 rounded shadow-lg flex flex-col items-center transition-all transform hover:scale-105 hover:bg-blue-50"
                  >
                    <span className="text-gray-700 font-semibold">{category.categoryName}</span>
                    <span className="text-gray-500">
                      {new Date(category.createdAt).toLocaleDateString()}
                    </span>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
          <Footer />
      </div>
    </div>
  );
}
