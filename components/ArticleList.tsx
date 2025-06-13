import React from 'react';
import { Article } from '../services/contentService';

interface ArticleListProps {
  articles: Article[] | null;
}

export const ArticleList: React.FC<ArticleListProps> = ({ articles }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 p-4 bg-slate-800 rounded-lg border border-slate-700">
      <h3 className="text-lg font-semibold mb-2 text-sky-400">Related Articles</h3>
      <ul className="list-disc list-inside space-y-1 text-slate-200">
        {articles.map((article, idx) => (
          <li key={idx}>
            <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">
              {article.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
