import React from 'react';
import { Link,} from 'react-router-dom';
import { Home, Sword, Shield, Users } from 'lucide-react';

const Header: React.FC = () => {
  

  return (
    <header className="bg-transparent py-4">
      <nav className="max-w-[1920px] mx-auto px-8">
        <div className="flex items-center justify-between h-12">
          <Link to="/" className="flex items-center space-x-2 ml-4">
            <div className="p-1.5 bg-yellow-500/10 rounded">
              <Sword className="w-5 h-5 text-yellow-500" />
            </div>
            <span className="text-base font-medium text-yellow-500">
              LoL Explorer
            </span>
          </Link>
          <ul className="flex items-center space-x-6 mr-4">
            <li>
              <Link 
                to="/" 
                className="flex items-center gap-2 text-sm text-gray-400/80 hover:text-yellow-500"
              >
                <Home className="w-4 h-4" />
                Accueil
              </Link>
            </li>
            <li>
              <Link 
                to="/champions" 
                className="flex items-center gap-2 text-sm text-gray-400/80 hover:text-yellow-500"
              >
                <Shield className="w-4 h-4" />
                Champions
              </Link>
            </li>
            <li>
              <Link 
                to="/items" 
                className="flex items-center gap-2 text-sm text-gray-400/80 hover:text-yellow-500"
              >
                <Sword className="w-4 h-4" />
                Items
              </Link>
            </li>
            <li>
              <Link 
                to="/players" 
                className="flex items-center gap-2 text-sm text-gray-400/80 hover:text-yellow-500"
              >
                <Users className="w-4 h-4" />
                Players
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

