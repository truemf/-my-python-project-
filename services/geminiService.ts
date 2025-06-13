export async function generateStory(prompt: string): Promise<string> {
  // Placeholder implementation: in a real app, call the Gemini API here.
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate story');
  }

  const data = (await response.json()) as { story: string };
  return data.story;
}
