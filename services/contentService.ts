import { GoogleGenerativeAI } from '@google/genai';

export interface ContentRequest {
  topic: string;
  style: string;
  references: string;
}

function getModel() {
  const apiKey = (globalThis as any).GEMINI_API_KEY as string | undefined;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is not set');
  }
  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({ model: 'gemini-pro' });
}

export async function generateContent({ topic, style, references }: ContentRequest): Promise<string> {
  const model = getModel();
  const prompt = `Write a ${style || 'general'} article about ${topic}.` +
    (references ? ` Use the following references: ${references}.` : '');
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function convertContent(content: string, format: 'plain' | 'markdown' | 'html'): Promise<string> {
  switch (format) {
    case 'markdown':
      return `**${content}**`;
    case 'html':
      return `<p>${content}</p>`;
    default:
      return content;
  }
}

export async function getSEOTips(content: string): Promise<string[]> {
  const model = getModel();
  const prompt = `Provide three SEO tips for the following article:\n\n${content}`;
  const result = await model.generateContent(prompt);
  return result.response.text().split(/\n+/).map(t => t.trim()).filter(Boolean);
}

export async function summarizeContent(content: string): Promise<string> {
  const model = getModel();
  const prompt = `Summarize the following article in a single paragraph:\n\n${content}`;
  const result = await model.generateContent(prompt);
  return result.response.text();
}

export interface Article {
  title: string;
  url: string;
}

export async function searchRelatedArticles(topic: string): Promise<Article[]> {
  const model = getModel();
  const prompt = `Suggest two article titles and URLs related to ${topic}. Format each as 'Title - URL'.`;
  const result = await model.generateContent(prompt);
  const lines = result.response.text().split(/\n+/).filter(Boolean);
  return lines.map(l => {
    const [title, url] = l.split(' - ');
    return { title: title?.trim() || l, url: url?.trim() || '#' };
  });
}
