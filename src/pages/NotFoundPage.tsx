import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <h1 className="text-6xl font-serif text-primary-700 mb-4">404</h1>
      <h2 className="text-2xl font-medium mb-6 text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 transition-colors"
      >
        <Home size={18} />
        Return Home
      </Link>
    </div>
  );
};

export default NotFoundPage;