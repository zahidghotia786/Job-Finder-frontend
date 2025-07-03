import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white pt-10 pb-1 rounded-b-lg">
      <div className="container mx-auto text-center">
        <p className="mb-4">© {new Date().getFullYear()} ProFinder. All rights reserved.</p>
        <p>
          <a href="/policy" className="hover:text-blue-400 mx-2">Privacy Policy</a> |
          <a href="/contact" className="hover:text-blue-400 mx-2">Contact Us</a> |
          <a href="/termsofservices" className="hover:text-blue-400 mx-2">Terms of Service</a>
        </p>
        <div className="flex justify-center mt-2 space-x-4 pt-3">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaFacebook className="h-6 w-6" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaTwitter className="h-6 w-6" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
            <FaInstagram className="h-6 w-6" />
          </a>
        </div>
        {/* Add the developer credit */}
        <div className="mt-10">
          <a 
            href="https://www.facebook.com/zahidghotia" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-sm hover:text-blue-400"
          >
            Developed by: Ghotia Developer
          </a>
        </div>
      </div>
    </footer>
  );
}
