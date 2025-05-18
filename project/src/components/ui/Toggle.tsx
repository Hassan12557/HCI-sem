import React from 'react';
import { COLORS } from '../../theme';

interface ToggleProps {
  isOn: boolean;
  onChange: (value: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Toggle: React.FC<ToggleProps> = ({
  isOn,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center ${className}`}>
      <button
        type="button"
        onClick={() => !disabled && onChange(!isOn)}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full 
          border-2 border-transparent transition-colors duration-200 ease-in-out 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
          ${isOn ? `bg-[${COLORS.primary}]` : 'bg-gray-200'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        role="switch"
        aria-checked={isOn}
        disabled={disabled}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full 
            bg-white shadow ring-0 transition duration-200 ease-in-out
            ${isOn ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      
      {label && (
        <span 
          className="ml-3 text-sm font-medium text-gray-700 cursor-pointer"
          onClick={() => !disabled && onChange(!isOn)}
        >
          {label}
        </span>
      )}
    </div>
  );
};

export default Toggle;