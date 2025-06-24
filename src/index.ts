import { genkit, z } from 'genkit';
import { googleAI } from '@genkit-ai/googleai';
import { startFlowServer } from '@genkit-ai/express';

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash'),
});

const helloFlow = ai.defineFlow(
  {
    name: 'helloFlow',
    inputSchema: z.object({ name: z.string() }),
    outputSchema: z.object({ greeting: z.string() }),
  },
  async (input) => {
    const { text } = await ai.generate('Say hello to ${input.name}');
    return { greeting: text };
  },
);

startFlowServer({
  flows: [helloFlow],
    port: 3000,
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
});