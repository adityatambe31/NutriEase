
import { z } from 'zod';

const GROQ_API_URL =
  'https://api.groq.com/openai/v1/chat/completions';

const responseSchema = z.object({
  choices: z.array(
    z.object({
      message: z.object({
        content: z.string().nullable(),
      }),
    }),
  ).min(1),
});

interface GenerateAIOptions {
  prompt: string;
  systemPrompt: string;
  maxTokens?: number;
  jsonMode?: boolean;
}

export class AIProviderError extends Error {
  constructor(message = 'AI provider unavailable') {
    super(message);
    this.name = 'AIProviderError';
  }
}

export async function generateAI({
  prompt,
  systemPrompt,
  maxTokens = 2048,
  jsonMode = false,
}: GenerateAIOptions): Promise<string> {
  if (
    process.env.AI_ENABLED !== 'true' ||
    process.env.AI_PROVIDER !== 'groq'
  ) {
    throw new AIProviderError('AI provider is disabled');
  }

  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    throw new AIProviderError('Groq API key not configured');
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 60_000);

  try {
    const response = await fetch(GROQ_API_URL, {
      method: 'POST',
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        max_completion_tokens: maxTokens,
        reasoning_effort: 'low',
        ...(jsonMode
          ? { response_format: { type: 'json_object' } }
          : {}),
      }),
    });

    if (!response.ok) {
      // Do not expose provider error details or credentials.
      console.error(
        'Groq request failed with status:',
        response.status,
      );

      throw new AIProviderError();
    }

    const result = responseSchema.parse(await response.json());
    const content = result.choices[0].message.content;

    if (!content?.trim()) {
      throw new AIProviderError('Empty AI response');
    }

    if (content.length > 100_000) {
      throw new AIProviderError('AI response too large');
    }

    if (jsonMode) {
      // Ensure the provider returned syntactically valid JSON.
      JSON.parse(content);
    }

    return content;
  } catch (error) {
    if (error instanceof AIProviderError) {
      throw error;
    }

    console.error('AI provider request or response failed');
    throw new AIProviderError();
  } finally {
    clearTimeout(timeout);
  }
}
