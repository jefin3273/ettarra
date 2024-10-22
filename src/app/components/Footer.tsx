import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-orange-500 text-white py-10">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          
          {/* Ettarra Coffee House Info */}
          <div className="flex flex-col items-center">
            <h3 className="text-white text-2xl font-bold mb-4">Ettarra Coffee House</h3>
            <p className="text-sm mb-4">
              At Ettarra, we believe coffee is more than just a drink – it’s an experience. Step into our world of rich aromas, cozy atmosphere, and artisanal blends that make every visit memorable.
            </p>
            <p className="text-sm">&copy; 2024 Ettarra Coffee House. All rights reserved.</p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-white text-2xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#about" className="hover:text-white transition duration-300">About Us</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition duration-300">Our Menu</a>
              </li>
              <li>
                <a href="#events" className="hover:text-white transition duration-300">Events &amp; Workshops</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition duration-300">Contact Us</a>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition duration-300">Careers</a>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col items-center">
            <h3 className="text-white text-2xl font-bold mb-4">Contact Us</h3>
            <p className="text-sm">123 Coffee Lane, Brewtown, USA</p>
            <p className="text-sm mt-2">Phone: +1 (555) 123-4567</p>
            <p className="text-sm">Email: contact@ettarracoffee.com</p>
            <div className="flex justify-center mt-4 space-x-4">
              <a href="https://facebook.com" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="https://instagram.com" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="https://youtube.com" className="text-gray-400 hover:text-white transition duration-300">
                <i className="fab fa-youtube fa-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
