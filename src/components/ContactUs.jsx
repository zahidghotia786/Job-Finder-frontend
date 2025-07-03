import { useState } from 'react';
import Footer from './Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      setError('All fields are required.');
      return;
    }

    setError('');

    const whatsappMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/923082769473?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');

    setSuccess(true);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section className="w-full mx-auto pt-12 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center text-blue-600">Contact Us</h1>
        <p className="mb-6 text-gray-700 text-center">
          We value your feedback and inquiries. Please fill out the form below, and our team will get back to you as soon as possible.
        </p>

        {success && <p className="mb-4 text-green-600 text-center">Your message has been sent successfully!</p>}
        {error && <p className="mb-4 text-red-600 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Your Name"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              placeholder="Your Email"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700" htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
              rows="4"
              placeholder="Your Message"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-blue-600 hover:bg-blue-700 rounded transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Footer Section */}
       <Footer />
    </section>
  );
};

export default ContactUs;
