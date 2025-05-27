import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, Mail, MapPin, Facebook, Instagram, Twitter, 
  Linkedin, ArrowUpRight, Clock
} from 'lucide-react';
import Logo from './Logo';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer id="contact" className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 items-start">
          {/* Column 1: About */}
          <div>
            <div className="mb-4">
              <Logo className="text-white" />
            </div>
            <p className="mb-6 text-gray-400">
              Premium interior design services for residential and commercial spaces. 
              Transform your environment with our expert designs and quality craftsmanship.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          {/* Column 2: Contact Info */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={20} className="text-primary-400 mt-1 mr-3 flex-shrink-0" />
                <span>367/1F, SNS College Opp,
                        Chinnavedampatti, Thudiyalur Road,
                        Coimbatore - 641049</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="text-primary-400 mr-3 flex-shrink-0" />
                <span>+91 99440 11966, 
                  +91 87540 87940</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="text-primary-400 mr-3 flex-shrink-0" />
                <span>jaymodularfurn@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Clock size={20} className="text-primary-400 mr-3 flex-shrink-0" />
                <span>Mon-Fri: 10:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
          
          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="group flex items-center hover:text-primary-300 transition-colors">
                  <span>Home</span>
                  <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
              <li>
                <a href="#services" className="group flex items-center hover:text-primary-300 transition-colors">
                  <span>Services</span>
                  <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a href="#gallery" className="group flex items-center hover:text-primary-300 transition-colors">
                  <span>Portfolio</span>
                  <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <a href="#about" className="group flex items-center hover:text-primary-300 transition-colors">
                  <span>About Us</span>
                  <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </li>
              <li>
                <Link to="/estimate" className="group flex items-center hover:text-primary-300 transition-colors">
                  <span>Get Estimate</span>
                  <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
              <li>
                <Link to="/admin" className="group flex items-center hover:text-primary-300 transition-colors">
                  <span>Admin</span>
                  <ArrowUpRight size={14} className="ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar with Copyright */}
        <div className="pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-center items-center">
          <p>© {currentYear} Jay Modular Furn. All rights reserved.</p>
          {/* <div className="flex mt-4 md:mt-0">
            <a href="#" className="mr-4 hover:text-gray-400 transition-colors">Privacy Policy</a>
            <a href="#" className="mr-4 hover:text-gray-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Sitemap</a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;