import type { APIRoute } from 'astro';
import { Groq } from 'groq-sdk';

export const POST: APIRoute = async ({ request }) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  try {
    // 1. Parse JSON body and extract niche
    let body;
    try {
      body = await request.json();
    } catch (err) {
      return new Response(
        JSON.stringify({ error: 'Invalid JSON body' }),
        { status: 400, headers }
      );
    }

    const niche = typeof body?.niche === 'string' ? body.niche.trim() : '';

    if (!niche) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameter: niche' }),
        { status: 400, headers }
      );
    }

    // 2. Initialize Groq client
    const apiKey = process.env.GROQ_API_KEY || import.meta.env.GROQ_API_KEY;
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'Server configuration error: GROQ_API_KEY is not defined' }),
        { status: 500, headers }
      );
    }

    const groq = new Groq({ apiKey });

    // 3. System and User Prompt setup
    const systemPrompt = `You are a professional market research analyst.
Output a raw, valid JSON object analyzing the requested business niche.
Your output must be strictly valid JSON and contain ONLY the JSON object. Do NOT wrap the JSON in markdown code blocks (e.g. do not use \`\`\`json ... \`\`\`), do not include introductory text, explanations, or notes.
The JSON object must contain these exact keys:
- targetDemographics: An array of strings representing primary user demographics.
- corePainPoints: An array of strings describing main customer pain points.
- marketTrends: An array of strings summarizing current industry trends.
- swotAnalysis: An object with exactly these keys:
  - strengths: An array of strings.
  - weaknesses: An array of strings.
  - opportunities: An array of strings.
  - threats: An array of strings.`;

    const userPrompt = `Analyze the market for the following niche: "${niche}"`;

    // 4. Call model
    const completion = await groq.chat.completions.create({
      model: 'openai/gpt-oss-120b',
      temperature: 0.2,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
    });

    const aiResponseText = completion.choices[0]?.message?.content || '';

    // Clean any accidental markdown format wraps if the model ignores the instruction
    let cleanedText = aiResponseText.trim();
    if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/^```(json)?/, '').replace(/```$/, '').trim();
    }

    // 5. Verify JSON validity on the server side
    let parsedData;
    try {
      parsedData = JSON.parse(cleanedText);
    } catch (parseErr: any) {
      console.error("Failed to parse Groq AI response as JSON:", aiResponseText);
      return new Response(
        JSON.stringify({ 
          error: 'AI response was not valid JSON',
          rawResponse: aiResponseText
        }),
        { status: 500, headers }
      );
    }

    // Return successfully parsed JSON object
    return new Response(
      JSON.stringify(parsedData),
      { status: 200, headers }
    );

  } catch (error: any) {
    console.error('Market analysis API error:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'An unexpected error occurred during market analysis.' }),
      { status: 500, headers }
    );
  }
};
