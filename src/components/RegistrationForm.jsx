import { useEffect, useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const [isProfessional, setIsProfessional] = useState(false);
  const [formData, setFormData] = useState({
    userType: 'client',
    firstName: '',
    lastName: '',
    province: '',
    city: '',
    zone: '',
    email: '',
    phone: '',
    professionalCategory: '',
    aboutMe: '',
    costPerHour: '',
    password: '',
    confirmPassword: '',
    workAtHome: ''
  });

  const [message, setMessage] = useState('')
  const [categories, setCategories] = useState([]);
  const Navigate = useNavigate()

  const handleToggle = (e) => {
    const selectedType = e.target.value;
    setIsProfessional(selectedType === 'professional');
    setFormData({
      ...formData,
      userType: selectedType,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {

      const response = await axios.post("http://localhost:3002/register", formData)
      // console.log(response.data);
      if (response.status === 400) {
        setMessage(response.data.message);
      } else {
        Navigate('/login')
      }

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || 'An error occurred');
      } else if (error.request) {
        setMessage('No response from the server. Please try again.');
      } else {
        setMessage('An unexpected error occurred.');
      }
    }
  }

  const cities = {
    "Buenos Aires": ["La Plata", "Mar del Plata", "Bahía Blanca", "Tandil"],
    "Catamarca": ["San Fernando del Valle", "Belén", "Santa María"],
    "Chaco": ["Resistencia", "Presidencia Roque Sáenz Peña", "Villa Ángela"],
    "Chubut": ["Rawson", "Trelew", "Puerto Madryn", "Comodoro Rivadavia"],
    "Córdoba": ["Córdoba", "Villa Carlos Paz", "Río Cuarto", "Villa María"],
    "Corrientes": ["Corrientes", "Goya", "Paso de los Libres", "Ituzaingó"],
    "Entre Ríos": ["Paraná", "Concordia", "Gualeguaychú", "Colón"],
    "Formosa": ["Formosa", "Clorinda", "El Colorado", "Pirané"],
    "Jujuy": ["San Salvador de Jujuy", "Palpalá", "Perico"],
    "La Pampa": ["Santa Rosa", "General Pico", "Toay", "Realicó"],
    "La Rioja": ["La Rioja", "Chilecito", "Aimogasta", "Villa Unión"],
    "Mendoza": ["Mendoza", "San Rafael", "San Martín", "Luján de Cuyo"],
    "Misiones": ["Posadas", "Oberá", "Eldorado", "Puerto Iguazú"],
    "Neuquén": ["Neuquén", "San Martín de los Andes", "Zapala"],
    "Río Negro": ["Viedma", "Bariloche", "General Roca", "Cipolletti"],
    "Salta": ["Salta", "San Ramón de la Nueva Orán", "Tartagal", "Cafayate"],
    "San Juan": ["San Juan", "Rawson", "Chimbas", "Pocito"],
    "San Luis": ["San Luis", "Villa Mercedes", "Merlo"],
    "Santa Cruz": ["Río Gallegos", "Caleta Olivia", "Puerto Deseado"],
    "Santa Fe": ["Santa Fe", "Rosario", "Rafaela", "Venado Tuerto"],
    "Santiago del Estero": ["Santiago del Estero", "La Banda", "Termas de Río Hondo"],
    "Tierra del Fuego": ["Ushuaia", "Río Grande", "Tolhuin"],
    "Tucumán": ["San Miguel de Tucumán", "Tafí Viejo", "Concepción", "Yerba Buena"]
  };

  const provinces = Object.keys(cities);

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
    <div className="min-h-screen flex items-center bg-gray-200 justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Registration</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">I am a:</label>
            <div className="flex items-center">
              <input
                type="radio"
                name="userType"
                value="professional"
                onChange={handleToggle}
                className="mr-2 text-blue-600 focus:ring-blue-500"
              />
              <label className="mr-4 text-gray-700">Professional</label>
              <input
                type="radio"
                name="userType"
                value="client"
                onChange={handleToggle}
                className="mr-2 text-blue-600 focus:ring-blue-500"
                defaultChecked
              />
              <label className="text-gray-700">Client</label>
            </div>
          </div>

          {/* Professional Form Fields */}
          {isProfessional && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 outline-none rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 outline-none rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Province</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 outline-none rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option>Select Province</option>
                  {provinces.map(province => (
                    <option key={province} value={province}>{province}</option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">City</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 outline-none rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  disabled={!formData.province}
                >
                  <option>Select City</option>
                  {formData.province &&
                    cities[formData.province].map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Zone</label>
                <input
                  type="text"
                  name="zone"
                  value={formData.zone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 outline-none rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 outline-none rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 outline-none rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Professional Category</label>
                <select
                  name="professionalCategory"
                  value={formData.professionalCategory}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 outline-none rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                >
                  <option>Select Category</option>

                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <option key={category._id} value={category.categoryName}>
                        {category.categoryName}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Plumber">Plumber</option>
                      <option value="Electrician">Electrician</option>
                      <option value="Mechanic">Mechanic</option>
                    </>
                  )}
                </select>

              </div>


              <div className='mb-4'>
                <label className="block text-sm font-medium text-gray-700">Will you work at the client's home?</label>
                <input type="text"
                  name="workAtHome"
                  value={formData.workAtHome}
                  onChange={handleChange}
                  placeholder='Yes or No?'
                  className="mt-1 block w-full border border-blue-300 outline-none rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">About Me</label>
                <textarea
                  name="aboutMe"
                  value={formData.aboutMe}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 outline-none rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  maxLength={256}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Cost per Hour</label>
                <input
                  type="number"
                  name="costPerHour"
                  value={formData.costPerHour}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </>
          )}

          {/* Client Form Fields */}
          {!isProfessional && (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-blue-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
            </>
          )}

          {/* Password Fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full border border-blue-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-blue-300 rounded p-2 focus:border-blue-500 focus:ring focus:ring-blue-200"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Register
          </button>
          {message ? <h1 className='mt-3 text-red-600 text-center font-medium'>{message}</h1> : null}
        </form>
      </div>
    </div>
  );
};

export default Form;
