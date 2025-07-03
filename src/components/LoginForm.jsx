import  { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [message , setMessage] = useState('')
  const Navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value, } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3002/login' , formData)
      // console.log(response.data);
      if (response.status === 400) {
        setMessage(response.data.message);
      }else{
        localStorage.setItem('token', response.data.token);
        Navigate('/')
      }
      
    } catch (error) {
      if(error.response){
        setMessage(error.response.data.message)
      }
      
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Login</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              required 
              className="mt-1 block w-full border border-blue-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" 
              placeholder="you@example.com"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              name="password"
              value={formData.password}
              onChange={handleChange}
              required 
              className="mt-1 block w-full border border-blue-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200" 
              placeholder="********"
            />
          </div>

          <div className="mb-6 flex items-center justify-between">
            <div>
              <input 
                type="checkbox" 
                id="remember" 
                name="rememberMe" 
                checked={formData.rememberMe} 
                onChange={handleChange} 
                className="mr-2 text-blue-600"
              />
              <label htmlFor="remember" className="text-sm text-gray-600">Remember Me</label>
            </div>
            <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
          {message ? <h1 className='mt-3 text-red-600 text-center font-medium'>{message}</h1> : null}

        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          Don’t have an account? 
          <a href="/registrationform" className="text-blue-600 hover:underline"> Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
