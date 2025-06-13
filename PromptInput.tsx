
import React from 'react';

interface PromptInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const PromptInput: React.FC<PromptInputProps> = ({ value, onChange, placeholder, disabled }) => {
  return (
    <textarea
      id="story-prompt"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Describe the beginning of your story, a character, or a magical place..."}
      disabled={disabled}
      rows={5}
      className="
        w-full p-4 rounded-lg bg-slate-700 text-slate-100 border border-slate-600
        focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-colors duration-200
        placeholder-slate-400 resize-none
        disabled:bg-slate-600 disabled:text-slate-400 disabled:cursor-not-allowed
      "
    />
  );
};
