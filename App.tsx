
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { PromptInput } from './components/PromptInput';
import { StoryDisplay } from './components/StoryDisplay';
import { Button } from './components/Button';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { Footer } from './components/Footer';
import { SEOTips } from './components/SEOTips';
import { ArticleList } from './components/ArticleList';
import {
  generateContent,
  convertContent,
  summarizeContent,
  getSEOTips,
  searchRelatedArticles,
  Article,
} from './services/contentService';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [style, setStyle] = useState<string>('');
  const [references, setReferences] = useState<string>('');
  const [format, setFormat] = useState<'plain' | 'markdown' | 'html'>('plain');
  const [content, setContent] = useState<string | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [seoTips, setSeoTips] = useState<string[] | null>(null);
  const [articles, setArticles] = useState<Article[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateStory = useCallback(async () => {
    if (!prompt.trim()) {
      setError("Please enter a topic or prompt to begin.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setContent(null);
    setSummary(null);
    setSeoTips(null);
    setArticles(null);

    try {
      const baseContent = await generateContent({ topic: prompt, style, references });
      const converted = await convertContent(baseContent, format);
      const summaryResult = await summarizeContent(baseContent);
      const tips = await getSEOTips(baseContent);
      const related = await searchRelatedArticles(prompt);
      setContent(converted);
      setSummary(summaryResult);
      setSeoTips(tips);
      setArticles(related);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred while generating the content.');
      }
    } finally {
      setIsLoading(false);
    }
  }, [prompt, style, references, format]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 sm:px-6 lg:px-8 selection:bg-sky-500 selection:text-white">
      <main className="container mx-auto max-w-3xl py-8 w-full">
        <Header />
        
        <div className="mt-8 p-6 sm:p-8 bg-slate-800 shadow-2xl rounded-xl border border-slate-700">
          <div className="space-y-6">
            <div>
              <label htmlFor="story-prompt" className="block text-lg font-medium text-slate-300 mb-2">
                Topic or Prompt
              </label>
              <PromptInput
                value={prompt}
                onChange={setPrompt}
                placeholder="e.g., The future of AI in writing"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="style" className="block text-lg font-medium text-slate-300 mb-2">Writing Style</label>
              <input
                id="style"
                type="text"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="e.g., Informative, Conversational"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="references" className="block text-lg font-medium text-slate-300 mb-2">References</label>
              <PromptInput
                value={references}
                onChange={setReferences}
                placeholder="Optional references or notes"
                disabled={isLoading}
              />
            </div>

            <div>
              <label htmlFor="format" className="block text-lg font-medium text-slate-300 mb-2">Output Format</label>
              <select
                id="format"
                value={format}
                onChange={(e) => setFormat(e.target.value as 'plain' | 'markdown' | 'html')}
                className="w-full p-3 rounded-lg bg-slate-700 text-slate-100 border border-slate-600 focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                disabled={isLoading}
              >
                <option value="plain">Plain Text</option>
                <option value="markdown">Markdown</option>
                <option value="html">HTML</option>
              </select>
            </div>

            <div className="text-center">
              <Button onClick={handleGenerateStory} disabled={isLoading || !prompt.trim()}>
                {isLoading ? 'Generating...' : 'Generate Content'}
              </Button>
            </div>
          </div>
        </div>

        {error && <ErrorMessage message={error} />}
        
        {isLoading && <LoadingSpinner />}

        <div className="mt-8 space-y-6">
          <StoryDisplay story={content} isLoading={isLoading} />
          {summary && (
            <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
              <h3 className="text-lg font-semibold mb-2 text-sky-400">Summary</h3>
              <p className="text-slate-200 whitespace-pre-wrap">{summary}</p>
            </div>
          )}
          <SEOTips tips={seoTips} />
          <ArticleList articles={articles} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
