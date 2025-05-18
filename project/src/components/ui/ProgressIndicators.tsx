import React from 'react';
import { COLORS } from '../../theme';

// Password Strength Meter
interface PasswordStrengthMeterProps {
  strength: 'weak' | 'medium' | 'strong' | 'none';
  className?: string;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({
  strength,
  className = '',
}) => {
  const getColor = () => {
    switch (strength) {
      case 'weak':
        return COLORS.error;
      case 'medium':
        return COLORS.warning;
      case 'strong':
        return COLORS.success;
      default:
        return COLORS.border;
    }
  };

  const getWidth = () => {
    switch (strength) {
      case 'weak':
        return '33%';
      case 'medium':
        return '66%';
      case 'strong':
        return '100%';
      default:
        return '0%';
    }
  };

  const getMessage = () => {
    switch (strength) {
      case 'weak':
        return 'Weak password';
      case 'medium':
        return 'Medium strength';
      case 'strong':
        return 'Strong password';
      default:
        return '';
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className="h-full transition-all duration-300 ease-out"
          style={{ 
            width: getWidth(), 
            backgroundColor: getColor() 
          }}
        />
      </div>
      <p className="text-xs mt-1 text-gray-500">{getMessage()}</p>
    </div>
  );
};

// Sparkline for quick data visualization
interface SparklineProps {
  data: number[];
  color?: string;
  height?: number;
  width?: number;
  className?: string;
}

export const Sparkline: React.FC<SparklineProps> = ({
  data,
  color = COLORS.primary,
  height = 30,
  width = 100,
  className = '',
}) => {
  if (!data.length) return null;
  
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((value - min) / range) * height;
    return `${x},${y}`;
  }).join(' ');
  
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      className={className}
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};