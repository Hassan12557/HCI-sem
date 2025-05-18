import React, { ReactNode } from 'react';
import { SHADOWS } from '../../theme';

interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  shadow?: 'sm' | 'md' | 'lg' | 'none';
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  className = '',
  onClick,
  hoverable = false,
  shadow = 'md',
}) => {
  const shadowClass = shadow === 'none' 
    ? '' 
    : shadow === 'sm' 
      ? `shadow-[${SHADOWS.sm}]` 
      : shadow === 'md' 
        ? `shadow-[${SHADOWS.md}]` 
        : `shadow-[${SHADOWS.lg}]`;
  
  const hoverClass = hoverable 
    ? 'hover:shadow-lg transition-shadow duration-200 cursor-pointer' 
    : '';
  
  return (
    <div 
      className={`bg-white rounded-xl p-4 ${shadowClass} ${hoverClass} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="mb-3">
          {title && <h3 className="text-lg font-semibold text-gray-800">{title}</h3>}
          {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default Card;