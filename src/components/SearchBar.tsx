import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: React.ReactNode;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, icon }) => {
  return (
    <div className="relative flex-grow max-w-md">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[#1E2328] text-white placeholder-gray-400 rounded-md py-3 pl-12 pr-4 
                   focus:outline-none focus:ring-2 focus:ring-[#C89B3C] transition-all duration-200
                   uppercase tracking-wider text-sm border border-[#3C3C41]
                   shadow-inner shadow-black/20"
      />
      {icon && (
        <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
          {icon}
        </span>
      )}
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;

