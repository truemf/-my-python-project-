import React from 'react';

interface SEOTipsProps {
  tips: string[] | null;
}

export const SEOTips: React.FC<SEOTipsProps> = ({ tips }) => {
  if (!tips || tips.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
      <h3 className="text-lg font-semibold mb-2 text-sky-400">SEO Tips</h3>
      <ul className="list-disc list-inside space-y-1 text-slate-200">
        {tips.map((tip, idx) => (
          <li key={idx}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};
