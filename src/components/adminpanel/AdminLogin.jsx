import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3002/adminlogin', {
        email,   
        password
      });
      
      if (response.status === 200) {
        navigate('/adminpanel');
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message || 'Invalid email or password');
      } else {
        setError('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50"> 
      <div className="bg-white shadow-lg p-8 rounded-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">Admin Login</h1> 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-700 font-semibold">Email</label> 
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-blue-700 font-semibold">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-blue-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
