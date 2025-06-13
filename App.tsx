
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { StoryDisplay } from './components/StoryDisplay';
import { Button } from './components/Button';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { generateStory as fetchStoryFromAPI } from './services/geminiService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [story, setStory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStory = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Please enter a story prompt to begin.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setStory(null); 

    try {
      const generatedStory = await fetchStoryFromAPI(prompt);
      setStory(generatedStory);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred while generating the story.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 selection:bg-sky-500 selection:text-white">
      <main className="container mx-auto max-w-3xl py-8 w-full">
        <Header />
        
        <div className="mt-8 p-6 sm:p-8 bg-slate-800 shadow-2xl rounded-xl border border-slate-700">
          <div className="space-y-6">
            <div>
              <label htmlFor="story-prompt" className="block text-lg font-medium text-slate-300 mb-2">
                What story shall we weave today?
              </label>
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                placeholder="e.g., A curious fox, an ancient forest, and a forgotten secret..."
                disabled={isLoading}
              />
            </div>
            
            <div className="text-center">
              <Button onClick={handleGenerateStory} disabled={isLoading || !prompt.trim()}>
                {isLoading ? 'Weaving Your Tale...' : 'Weave My Story'}
              </Button>
            </div>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}
        
        {isLoading && <LoadingSpinner />}

        <div className="mt-8">
          <StoryDisplay story={story} isLoading={isLoading} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
