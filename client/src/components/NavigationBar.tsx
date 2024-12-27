import React from 'react';
import { Link } from 'react-router-dom';

const Navigation: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-50">
      <nav className="flex justify-between items-center p-4">
        <ul className="flex space-x-4">
          <li>
            <Link 
              to="/" 
              className="block py-2 px-4 text-blue-500 hover:bg-blue-500 hover:text-white rounded"
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/videos" 
              className="block py-2 px-4 text-blue-500 hover:bg-blue-500 hover:text-white rounded"
            >
              Videos
            </Link>
          </li>
          <li>
            <a 
              href="#" 
              className="block py-2 px-4 text-gray-400 cursor-not-allowed"
            >
              Disabled Item
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
