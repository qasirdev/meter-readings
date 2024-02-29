import React, { useState, ChangeEvent } from 'react';

interface DropdownProps {
  options: string[];
  label?: string;
  selectedValue: string;
  onValueChange: (value: string) => void;
}

export const Dropdown = ({ options, label, selectedValue, onValueChange }:DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {label && <label className="block mb-1 text-lg font-bold">{label}</label>}

      <div
        data-testid="dropdown-wrapper"
        className="relative border border-gray-300 w-64 rounded-md cursor-pointer hover:bg-gray-100 focus:outline-none focus:border-blue-500"
        onClick={() => setIsOpen(!isOpen)} 
      >
        {/* Display the selected value */}
        <div className="px-3 py-2 flex items-center">
          {selectedValue}
          <svg className="ml-2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        <div 
          className={`absolute z-10 mt-1 w-64 bg-white border border-gray-300 rounded-md shadow-lg ${isOpen ? 'block' : 'hidden'}`}
        >
          {options.map((option) => (
            <div
              key={option} 
              className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                onValueChange(option);
                setIsOpen(false); // Close the dropdown after selection
              }}
            >
              {option}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
