import Footer from "./Footer";


// Animated SVGs (you can replace these with your custom animations)
const AnimatedCheckIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-500 mr-4 animate-pulse"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" />
  </svg>
);

const AnimatedInfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-500 mr-4 animate-bounce"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11h-2v-2h2v2zm0-4h-2V7h2v2z" />
  </svg>
);

const AnimatedWarningIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-blue-500 mr-4 animate-ping"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11h-2v-2h2v2zm0-4h-2V7h2v2z" />
  </svg>
);

const Terms = () => {
  return (
    <section className="full mx-auto pt-12 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Terms of Service</h1>
      <p className="mb-6 text-gray-700 text-lg text-center px-4">
        Welcome to our platform! By accessing or using our services, you agree to comply with and be bound by the following terms and conditions. Please read them carefully.
      </p>

      <div className="space-y-8  px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
          <AnimatedCheckIcon />
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">1. Acceptance of Terms</h2>
            <p className="text-gray-600 mb-4">
              By using our platform, you agree to these Terms of Service and our Privacy Policy. If you do not agree, please do not use our services.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
          <AnimatedInfoIcon />
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">2. Service Description</h2>
            <p className="text-gray-600 mb-4">
              Our platform connects clients with skilled professionals in various fields, including but not limited to healthcare, plumbing, and electrical services. We strive to provide a reliable and safe environment for both clients and professionals.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
          <AnimatedWarningIcon />
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">3. User Responsibilities</h2>
            <p className="text-gray-600 mb-4">As a user, you agree to:</p>
            <ul className="list-disc list-inside text-gray-600 mb-4">
              <li>Provide accurate and truthful information.</li>
              <li>Respect the privacy and rights of other users.</li>
              <li>Use the platform for lawful purposes only.</li>
              <li>Not engage in any activity that could harm or disrupt our services.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
          <AnimatedCheckIcon />
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">4. Limitation of Liability</h2>
            <p className="text-gray-600 mb-4">
              Our platform is not liable for any direct, indirect, incidental, or consequential damages arising from your use of our services. We make no guarantees regarding the quality or reliability of the services provided by professionals on our platform.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
          <AnimatedWarningIcon />
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">5. Termination</h2>
            <p className="text-gray-600 mb-4">
              We reserve the right to terminate or suspend your access to our services at any time, without prior notice, for conduct that we believe violates these terms or is harmful to other users or our platform.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
          <AnimatedInfoIcon />
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">6. Changes to Terms</h2>
            <p className="text-gray-600 mb-4">
              We may update our Terms of Service from time to time. We will notify you of any changes by posting the new terms on our website. You are advised to review these terms periodically for any changes.
            </p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg flex items-start">
          <AnimatedCheckIcon />
          <div>
            <h2 className="text-2xl font-semibold text-blue-500 mb-4">7. Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions or concerns about our Terms of Service, please contact us at <a href="mailto:your-email@example.com" className="text-blue-600 underline">your-email@example.com</a>.
            </p>
          </div>
        </div>
      </div>



      {/* Footer Section */}
         <Footer />
    </section>
  );
};

export default Terms;
