
import React from 'react';

interface ErrorMessageProps {
  message: string | null;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) {
    return null;
  }
  return (
    <div className="my-6 p-4 bg-red-900/30 border border-red-700/50 text-red-300 rounded-lg text-center shadow-md">
      <p className="font-semibold">Oops! An Error Occurred:</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
};
