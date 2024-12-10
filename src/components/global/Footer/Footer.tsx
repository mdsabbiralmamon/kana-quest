import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-semibold mb-4">Kana-Quest</h2>
        <p className="text-lg mb-6">
          Learn Japanese in a fun, interactive way. Start your journey with Kana-Quest today!
        </p>

        {/* Links Section */}
        <div className="flex justify-center gap-12 mb-8">
          <a href="/about" className="text-blue-400 hover:text-blue-500 transition duration-300">
            About Us
          </a>
          <a href="/contact" className="text-blue-400 hover:text-blue-500 transition duration-300">
            Contact
          </a>
          <a href="/privacy" className="text-blue-400 hover:text-blue-500 transition duration-300">
            Privacy Policy
          </a>
          <a href="/terms" className="text-blue-400 hover:text-blue-500 transition duration-300">
            Terms of Service
          </a>
        </div>

        {/* Social Media Icons Section */}
        <div className="flex justify-center gap-6">
          <a href="https://twitter.com" target="_blank" className="text-blue-400 hover:text-blue-500 transition duration-300">
            <i className="fab fa-twitter text-2xl"></i>
          </a>
          <a href="https://facebook.com" target="_blank" className="text-blue-400 hover:text-blue-500 transition duration-300">
            <i className="fab fa-facebook text-2xl"></i>
          </a>
          <a href="https://instagram.com" target="_blank" className="text-blue-400 hover:text-blue-500 transition duration-300">
            <i className="fab fa-instagram text-2xl"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" className="text-blue-400 hover:text-blue-500 transition duration-300">
            <i className="fab fa-linkedin text-2xl"></i>
          </a>
        </div>

        {/* Copyright Section */}
        <p className="text-sm mt-8">
          © {new Date().getFullYear()} Kana-Quest. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
