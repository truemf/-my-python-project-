
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500">
        AI Content Writer
      </h1>
      <p className="mt-2 text-md sm:text-lg text-slate-300">Create custom articles and summaries with AI.</p>
    </header>
  );
};
