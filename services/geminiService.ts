
import { GoogleGenAI, Type } from "@google/genai";
import { Game } from '../types';
import { GAMES } from '../constants';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGameRecommendations = async (userMood: string): Promise<{ id: string, reason: string }[]> => {
  if (!process.env.API_KEY) return [];

  const gamesContext = GAMES.map(g => `${g.id}: ${g.title} (${g.category}) - ${g.description}`).join('\n');
  
  const prompt = `Based on the following list of games, suggest 2 games that match the user's mood/request: "${userMood}". 
  Provide the result as a JSON array of objects with 'id' and 'reason'.
  
  Available Games:
  ${gamesContext}`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING },
              reason: { type: Type.STRING }
            },
            required: ['id', 'reason']
          }
        }
      }
    });

    const result = JSON.parse(response.text || '[]');
    return result;
  } catch (error) {
    console.error("Gemini recommendation error:", error);
    return [];
  }
};

export const validateSuggestion = async (text: string): Promise<{ valid: boolean; reason: string }> => {
  if (!process.env.API_KEY) return { valid: true, reason: 'No API key' };

  const prompt = `Evaluate if the following text is a legitimate game suggestion for an unblocked games website: "${text}". 
  Check for:
  1. Profanity or offensive language.
  2. Spam or repetitive junk.
  3. Completely off-topic content (not related to games or website feedback).
  
  Return a JSON object with "valid" (boolean) and "reason" (string, explaining why if invalid).`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            valid: { type: Type.BOOLEAN },
            reason: { type: Type.STRING }
          },
          required: ['valid', 'reason']
        }
      }
    });

    return JSON.parse(response.text || '{"valid": true, "reason": ""}');
  } catch (error) {
    console.error("Gemini validation error:", error);
    return { valid: true, reason: 'Validation system bypass due to error' };
  }
};
