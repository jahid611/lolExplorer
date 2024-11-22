import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder }) => {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-yellow-500/70" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search..."}
        className="w-full pl-12 pr-4 py-4 bg-gray-900/60 backdrop-blur-sm border border-gray-700/30 rounded-2xl
                 text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 
                 focus:ring-yellow-500/50 focus:border-transparent transition-all duration-200
                 shadow-xl"
      />
    </div>
  );
};

export default SearchBar;