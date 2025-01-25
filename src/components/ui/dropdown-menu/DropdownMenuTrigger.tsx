// import { ChevronDown } from 'lucide-react';
import React from 'react';

interface DropdownMenuTriggerProps {
  children: React.ReactNode;
  isOpen?: boolean;
  toggleDropdown?: () => void;
}

export const DropdownMenuTrigger = ({ children, toggleDropdown }: DropdownMenuTriggerProps) => {
  return (
    <button
      onClick={toggleDropdown}
      className="ml-auto bg-[#EF8450] px-6 py-3 text-md font-semibold text-white shadow-sm hover:bg-[#EF8450]/90 focus:outline-none focus:ring-2 focus:ring-[#EF8450] focus:ring-offset-2"
    >
      {children}
    </button>
  );
};