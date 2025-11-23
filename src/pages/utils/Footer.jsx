import React, { useState } from 'react';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaYoutube,
  FaGraduationCap,
  FaChevronRight,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaPaperPlane
} from 'react-icons/fa';

// Import your logo
import logo from '../../assets/logo/logo.svg'; // Adjust path as needed

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    console.log('Subscribed:', email);
    setEmail('');
    alert('Thank you for subscribing!');
  };

  // Your menu items
  const menuItems = [
    { label: "Home", ariaLabel: "Go to home page", link: "/" },
    { label: "About", ariaLabel: "Learn about us", link: "/about" },
    { label: "Contact", ariaLabel: "Get in touch", link: "/contact" },
    { label: "Chat", ariaLabel: "communicate", link: "/Chat" },
    { label: "Courses", ariaLabel: "Learn with us", link: "/courses" },
  ];

  const socialLinks = [
    { icon: FaFacebookF, url: 'https://facebook.com', label: 'Facebook' },
    { icon: FaTwitter, url: 'https://twitter.com', label: 'Twitter' },
    { icon: FaInstagram, url: 'https://instagram.com', label: 'Instagram' },
    { icon: FaLinkedinIn, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FaYoutube, url: 'https://youtube.com', label: 'YouTube' }
  ];

  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Logo & About Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <img 
                  src={logo} 
                  alt="Results Education Logo" 
                  className="w-12 h-12 object-contain"
                  onError={(e) => {
                    // Fallback if logo doesn't load
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <FaGraduationCap className="text-3xl text-blue-900 hidden" />
              </div>
              <h2 className="text-2xl font-bold text-yellow-400">
                ResultsEducation
              </h2>
            </div>
            
            <p className="text-gray-300 text-sm leading-relaxed">
              Empowering students with quality education and helping them achieve 
              outstanding results for a brighter future.
            </p>

            {/* Social Links */}
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  aria-label={social.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center 
                           hover:bg-yellow-400 hover:text-blue-900 transition-all duration-300 
                           hover:-translate-y-1"
                >
                  <social.icon className="text-base" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-3">
              Quick Links
              <span className="absolute left-0 bottom-0 w-12 h-1 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    aria-label={item.ariaLabel}
                    className="text-gray-300 text-sm hover:text-yellow-400 transition-all 
                             duration-300 flex items-center gap-2 group"
                  >
                    <FaChevronRight className="text-xs group-hover:translate-x-1 transition-transform" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-3">
              Contact Us
              <span className="absolute left-0 bottom-0 w-12 h-1 bg-yellow-400"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <FaMapMarkerAlt className="text-yellow-400 mt-1 flex-shrink-0" />
                <span>123 Education Street,<br />Knowledge City, ED 12345</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <FaPhone className="text-yellow-400 flex-shrink-0" />
                <span>+1 (234) 567-8900</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 text-sm">
                <FaEnvelope className="text-yellow-400 flex-shrink-0" />
                <span>info@resultseducation.com</span>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-sm">
                <FaClock className="text-yellow-400 mt-1 flex-shrink-0" />
                <span>Mon - Fri: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-6 relative pb-3">
              Newsletter
              <span className="absolute left-0 bottom-0 w-12 h-1 bg-yellow-400"></span>
            </h3>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Subscribe to get the latest updates and news!
            </p>
            <form onSubmit={handleSubscribe} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 
                         text-white placeholder-gray-400 focus:outline-none focus:ring-2 
                         focus:ring-yellow-400 focus:border-transparent transition-all text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-3 bg-yellow-400 text-blue-900 rounded-lg 
                         font-semibold hover:bg-yellow-300 transition-all duration-300 
                         hover:-translate-y-1 hover:shadow-lg flex items-center justify-center 
                         gap-2 text-sm"
              >
                <FaPaperPlane className="text-sm" />
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-gray-300 text-sm">
            <p>
              &copy; {new Date().getFullYear()}{' '}
              <a href="/" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                ResultsEducation
              </a>
              . All Rights Reserved. |{' '}
              <a href="/privacy" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                Privacy Policy
              </a>{' '}
              |{' '}
              <a href="/terms" className="text-yellow-400 hover:text-yellow-300 transition-colors">
                Terms & Conditions
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;