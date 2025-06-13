
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ onClick, disabled, children, className }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-8 py-3 rounded-lg font-semibold text-white
        bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700
        focus:outline-none focus:ring-4 focus:ring-sky-300 dark:focus:ring-sky-800
        transform transition-all duration-200 ease-in-out
        hover:scale-105 active:scale-95
        disabled:from-slate-500 disabled:to-slate-600 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:scale-100
        ${className || ''}
      `}
    >
      {children}
    </button>
  );
};