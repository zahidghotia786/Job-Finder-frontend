import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { HiOutlineMenuAlt3, HiX } from 'react-icons/hi'; // Icons for menu toggle
import Category from './Category';
import Featured from './Featured';
import Testimonial from './Testimonial';
import axios from 'axios';
import Footer from './Footer';

const Home = () => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // For mobile menu
  const [searchTerm, setSearchTerm] = useState('');
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  const getProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await fetch('http://localhost:3002/profile', {
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setUser(data);
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    } catch (error) {
      setIsLogged(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsLogged(false);
  };

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const toggleCategoryDropdown = () => setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const scrollDown = () => window.scrollBy({ top: 350, behavior: 'smooth' });

  const fetchingCategory = async () => {
    try {
      const response = await axios.get('http://localhost:3002/allcategories');
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    } 
  };

  useEffect(() => {
    fetchingCategory();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Section */}
      <header className="bg-blue-600 fixed left-0 top-0 w-full z-50 shadow-lg">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="text-white text-2xl font-bold">ProFinder</Link>

          {/* Mobile Menu Toggle */}
          <button
            className="text-white text-3xl md:hidden focus:outline-none"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? <HiX /> : <HiOutlineMenuAlt3 />}
          </button>

          {/* Links for Desktop and Mobile */}
          <div className={`flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 absolute md:relative bg-blue-600 md:bg-transparent md:flex items-center ${isMobileMenuOpen ? 'top-16 left-0 right-0 py-4 px-4 shadow-lg' : 'hidden md:flex'}`}>
            {/* Category Dropdown */}
            <div className="relative">
              <button
                className="text-white text-lg font-semibold focus:outline-none"
                onClick={toggleCategoryDropdown}
              >
                Categories
              </button>
              {isCategoryDropdownOpen && (
   <div className="absolute left-0 mt-2 w-48 bg-white rounded shadow-lg py-2 z-10">
   {categories.length === 0 ? (
     <p className="px-4 py-2 text-gray-800">No categories available</p>
   ) : (
     categories.map((category) => (
       <div
         key={category._id} // Assuming _id is the unique identifier
         className="block px-4 py-2 text-gray-800 hover:bg-gray-200 cursor-pointer"
         onClick={() => setSearchTerm(category.categoryName)} // Update searchTerm with the clicked category name
       >
         {category.categoryName} {/* Show the category name */}
       </div>
     ))
   )}
 </div>
 

              )}
            </div>
            <Link to="/adminlogin" className="text-white text-lg font-semibold">Admin Panel</Link>
            {isLogged ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="flex items-center text-white text-lg font-semibold focus:outline-none"
                >
                  {user?.profileImage ? (
                    <img
                      src={`http://localhost:3002/${user.profileImage}`}
                      alt="Profile"
                      className="rounded-full w-10 h-10 border-2 border-white"
                    />
                  ) : (
                    <FaUserCircle className="text-2xl mr-2" />
                  )}
                  <span className="ml-2"> {user?.firstName}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg py-2">
                    <Link to="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/registrationform" className="text-white text-lg font-semibold">Register</Link>
                <Link to="/login" className="text-white text-lg font-semibold">Sign In</Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-24 mt-16">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Professional!</h1>
          <p className="mb-6 text-lg md:text-xl">Connecting you with the best plumbers, electricians, mechanics, and more!</p>
          <div className="flex justify-center mb-4">
            <input
              type="text"
              placeholder="Search for professionals..."
              className="p-2 w-full md:w-1/2 rounded text-black"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              onClick={scrollDown}
              className="bg-white text-blue-600 font-bold px-4 py-2 rounded ml-2"
            >
              Search
            </button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12">
        <div className="container mx-auto text-center">
          <Category searchTerm={searchTerm} />
        </div>
      </section>

      {/* Featured Professionals Section */}
      <section className="py-12 bg-gray-200">
        <div className="container mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Featured Professionals</h2>
          <Featured />
        </div>
      </section>

      {/* Testimonials Section */}
      <section>
        <Testimonial />
      </section>

      {/* Call to Action Section */}
      <section className="bg-blue-600 text-white py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Join Our Community Today!</h2>
        <p className="mb-6">Whether you’re a skilled professional or looking for expert services, we’re here to help!</p>
        <a href='/contact' className="bg-white text-blue-600 font-bold px-4 py-2 rounded">
          Get Started
        </a>
      </section>

      {/* Footer Section */}
            <Footer />
    </div>
  );
};

export default Home;
