import React, { useState } from 'react';
import { Field, FieldProps } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { COLORS } from '../../theme';

interface InputProps {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  helperText?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  type = 'text',
  placeholder,
  helperText,
  required = false,
  disabled = false,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={`mb-4 ${className}`}>
          {label && (
            <label 
              htmlFor={name} 
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </label>
          )}
          
          <div className="relative">
            <input
              {...field}
              id={name}
              type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
              placeholder={placeholder}
              disabled={disabled}
              className={`
                w-full px-4 py-2.5 min-h-[44px] rounded-lg 
                bg-[${COLORS.background.input}] border 
                focus:ring-2 focus:ring-blue-300 focus:border-blue-500 
                transition-colors duration-200
                ${meta.touched && meta.error 
                  ? `border-[${COLORS.error}] focus:border-[${COLORS.error}] focus:ring-red-100` 
                  : `border-[${COLORS.border}]`}
                ${disabled ? 'opacity-60 cursor-not-allowed' : ''}
              `}
            />
            
            {type === 'password' && (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            )}
          </div>
          
          {meta.touched && meta.error ? (
            <div className={`mt-1 text-sm text-[${COLORS.error}]`}>{meta.error}</div>
          ) : helperText ? (
            <div className="mt-1 text-sm text-gray-500">{helperText}</div>
          ) : null}
        </div>
      )}
    </Field>
  );
};

export default Input;