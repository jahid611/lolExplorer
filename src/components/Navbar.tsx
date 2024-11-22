import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sword, Users, Shield } from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="bg-transparent border-b border-gray-800/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-1.5 bg-yellow-500/10 rounded-lg">
              <Sword className="w-5 h-5 text-yellow-500" />
            </div>
            <span className="font-bold text-lg bg-gradient-to-r from-yellow-300 to-yellow-600 bg-clip-text text-transparent">
              LoL Explorer
            </span>
          </Link>
          <div className="flex space-x-6">
            <Link 
              to="/" 
              className={`flex items-center gap-2 text-sm transition-colors ${
                location.pathname === '/' 
                  ? 'text-yellow-500 border-b border-yellow-500' 
                  : 'text-gray-400/80 hover:text-yellow-500'
              }`}
            >
              <Sword className="w-4 h-4" />
              Items
            </Link>
            <Link 
              to="/champions" 
              className={`flex items-center gap-2 text-sm transition-colors ${
                location.pathname === '/champions' 
                  ? 'text-yellow-500 border-b border-yellow-500' 
                  : 'text-gray-400/80 hover:text-yellow-500'
              }`}
            >
              <Shield className="w-4 h-4" />
              Champions
            </Link>
            <Link 
              to="/players" 
              className={`flex items-center gap-2 text-sm transition-colors ${
                location.pathname === '/players' 
                  ? 'text-yellow-500 border-b border-yellow-500' 
                  : 'text-gray-400/80 hover:text-yellow-500'
              }`}
            >
              <Users className="w-4 h-4" />
              Players
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;