/** Cook assistant talks only to our authenticated backend. */
export async function generateRecipeResponse(recipeName: string) {
  const response = await fetch('/api/ai/recipe', {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ recipe: recipeName }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || 'Unable to generate recipe');
  return data.text as string;
}
