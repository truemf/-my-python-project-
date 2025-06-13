
import React from 'react';

interface StoryDisplayProps {
  story: string | null;
  isLoading: boolean; // Used to determine if placeholder should show, actual spinner is separate
}

export const StoryDisplay: React.FC<StoryDisplayProps> = ({ story, isLoading }) => {
  if (isLoading) {
    // The LoadingSpinner component is rendered directly in App.tsx
    // This component just avoids showing "Your story will appear here" during loading
    return null; 
  }

  if (!story) {
    return (
      <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 min-h-[200px] flex items-center justify-center">
        <p className="text-slate-400 italic text-center">Your content will appear here once generated...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-slate-800/50 rounded-lg border border-slate-700 min-h-[200px] shadow-lg">
      <h3 className="text-2xl font-semibold mb-4 text-sky-400">Generated Content:</h3>
      <p className="text-slate-200 whitespace-pre-wrap leading-relaxed text-left">{story}</p>
    </div>
  );
};
