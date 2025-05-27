import React from 'react';
// import { Home, PenLine } from 'lucide-react';

import logo from '../assects/logo.png';
import { color } from 'framer-motion';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img src={logo} alt="Jay Modular Logo" className="w-9 h-9 object-contain" />
      <span className="ml-2 text-xl font-serif font-semibold tracking-tight">
        Jay
        <span className="text-secondary-600" style={{ color: 'rgb(128 52 0)' }}>Modular</span>
      </span>
    </div>
  );
};

export default Logo;