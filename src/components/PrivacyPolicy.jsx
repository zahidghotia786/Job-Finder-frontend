import Footer from './Footer';

const PrivacyPolicy = () => {
  return (
    <section className="w-full">
      <div className='mx-auto py-12 bg-white shadow-lg rounded-lg max-w-4xl'>
        <h1 className="text-3xl font-bold mb-8 text-center text-blue-600">Privacy Policy</h1>
        <p className="mb-6 text-gray-700 px-6">
          Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your information when you use our services.
        </p>

        <h2 className="text-2xl font-semibold mb-4 px-6">1. Information We Collect</h2>
        <p className="mb-4 text-gray-700 px-6">We may collect the following types of information:</p>
        <ul className="list-disc list-inside mb-4 text-gray-700 px-6">
          <li>Personal information (e.g., name, email address).</li>
          <li>Account information (e.g., username, password).</li>
          <li>Contact information of booked workers (e.g., email, phone number).</li>
          <li>Usage data (e.g., IP address, browser type).</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 px-6">2. How We Use Your Information</h2>
        <p className="mb-4 text-gray-700 px-6">We use your information for the following purposes:</p>
        <ul className="list-disc list-inside mb-4 text-gray-700 px-6">
          <li>To connect clients with professional workers.</li>
          <li>To communicate booking details and updates.</li>
          <li>To improve our website and services.</li>
          <li>To notify you about changes to our services.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 px-6">3. Data Security</h2>
        <p className="mb-4 text-gray-700 px-6">
          We take data security seriously and implement various security measures to protect your personal information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee its absolute security.
        </p>

        <h2 className="text-2xl font-semibold mb-4 px-6">4. Sharing Your Information</h2>
        <p className="mb-4 text-gray-700 px-6">We do not sell or rent your personal information to third parties. We may share your information with:</p>
        <ul className="list-disc list-inside mb-4 text-gray-700 px-6">
          <li>Service providers who assist us in operating our services.</li>
          <li>Law enforcement or legal authorities if required by law.</li>
          <li>Business partners for promotional purposes with your consent.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 px-6">5. Your Rights</h2>
        <p className="mb-4 text-gray-700 px-6">You have the right to:</p>
        <ul className="list-disc list-inside mb-4 text-gray-700 px-6">
          <li>Access the personal information we hold about you.</li>
          <li>Request correction of any inaccurate information.</li>
          <li>Request deletion of your personal data.</li>
          <li>Withdraw your consent to data processing at any time.</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 px-6">6. Changes to This Privacy Policy</h2>
        <p className="mb-4 text-gray-700 px-6">
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on our website. You are advised to review this Privacy Policy periodically for any changes.
        </p>

        <h2 className="text-2xl font-semibold mb-4 px-6">7. Contact Us</h2>
        <p className="mb-4 text-gray-700 px-6">
          If you have any questions about this Privacy Policy, please contact us at [your-email@example.com].
        </p>
      </div>
      {/* Footer Section */}
      <Footer />
    </section>
  );
};

export default PrivacyPolicy;
