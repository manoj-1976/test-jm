import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence, color } from 'framer-motion';
import Logo from './Logo';

const NavItem = ({ href, label, isScrolled, isMobile = false, onClick = () => {} }: any) => {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`relative px-2 py-1 font-medium transition-colors duration-300 ${
        isMobile ? 'text-lg py-4' : ''
      } ${
        isScrolled
          ? 'text-gray-800 hover:text-primary-700'
          : 'text-gray-100 hover:text-white'
      }`}
    >
      {label}
    </a>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#', label: 'Home' },
    { href: '#services', label: 'Services' },
    { href: '#gallery', label: 'Projects' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="flex items-center z-50">
          <Logo className={isScrolled ? 'text-gray-900' : 'text-white'} />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <NavItem key={item.label} {...item} isScrolled={isScrolled} />
          ))}
          
          <Link 
            to="/estimate" 
            className={`px-6 py-2 rounded-md font-medium transition-all duration-300 ${
              isScrolled 
                ? 'bg-primary-700 text-white hover:bg-primary-800' 
                : 'bg-white/90 text-primary-800 hover:bg-white'
            }`}
          >
            Get Estimate
          </Link>
          
          <Link 
            to="/admin" 
            className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
              isScrolled 
                ? 'border border-gray-300 text-gray-700 hover:bg-gray-100' 
                : 'border border-white/30 text-white/90 hover:bg-white/10'
            }`}
          >
            Admin
          </Link>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button 
          onClick={toggleMenu} 
          className="md:hidden z-50 p-2"
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? (
            <X size={24} className={isScrolled ? 'text-gray-900' : 'text-white'} />
          ) : (
            <Menu size={24} className={isScrolled ? 'text-gray-900' : 'text-white'} />
          )}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-primary-900/95 flex flex-col items-center justify-center z-40"
          >
            <nav className="flex flex-col items-center space-y-6 py-8">
              {navItems.map((item) => (
                <NavItem key={item.label} {...item} isScrolled={false} isMobile={true} onClick={toggleMenu} />
              ))}
              
              <Link 
                to="/estimate" 
                onClick={toggleMenu}
                className="mt-4 px-8 py-3 rounded-md bg-white text-primary-800 font-medium hover:bg-gray-100"
              >
                Get Estimate
              </Link>
              
              <Link 
                to="/admin" 
                onClick={toggleMenu}
                className="mt-2 px-8 py-3 rounded-md border border-white/30 text-white font-medium hover:bg-white/10"
              >
                Admin
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;