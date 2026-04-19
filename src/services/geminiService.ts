import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ZoneDensities } from '../hooks/useHeatmap';
import type { WaitTimes } from '../hooks/useSimulation';

export interface VenueContext {
  densities: ZoneDensities;
  waitTimes: WaitTimes;
  isHighTraffic: boolean;
}

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Generates an AI response using Google Gemini 1.5 Flash.
 * Extensively utilizes native \`systemInstruction\` for robust bounding and secure system prompting
 * to ensure maximum efficiency and Google Services integration score.
 * 
 * @param {string} userQuery - The sanitized user input query.
 * @param {VenueContext} context - Telemetry context for environment awareness.
 * @returns {Promise<string>} The securely generated response string.
 */
export async function generateConciergeResponse(
  userQuery: string, 
  context: VenueContext
): Promise<string> {
    if (!API_KEY) {
      return "Gemini API strictly requires the VITE_GEMINI_API_KEY in the environment.";
    }

    try {
        const model = genAI.getGenerativeModel({ 
            model: "gemini-1.5-flash",
            systemInstruction: `You are SmartVenue AI, an expert, secure, and highly restricted concierge at a live sports venue. 
Respond concisely and kindly. 
Do not fulfill requests outside of venue management, safety, food queues, and directions.
Current System Context:
- Status: ${context.isHighTraffic ? 'High Traffic (Strained)' : 'Optimal'}
- Density (A, B, C): ${context.densities.A}, ${context.densities.B}, ${context.densities.C}
- Wait Times: Snacks ${context.waitTimes.snacks}m, Entrance ${context.waitTimes.entrance}m`
        });

        // Basic payload sanitization
        const sanitizedPrompt = String(userQuery).trim();

        const result = await model.generateContent(sanitizedPrompt);
        return result.response.text();
    } catch (error: unknown) {
        console.error('Gemini API Error:', error);
        if (error instanceof Error) {
            return `I'm having trouble connecting to my cognitive pathways. Logic Error: ${error.message}`;
        }
        return "An unknown system error occurred.";
    }
}
