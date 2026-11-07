/** Calls our authenticated server API. Secrets must never enter the browser bundle. */
export const chatSession = {
  sendMessage: async (prompt: string) => {
    const response = await fetch('/api/ai/meal-plan', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'AI request failed');
    return { response: { text: () => data.text as string } };
  },
};
