import { GoogleGenAI } from "@google/genai";

export const generateText = async (prompt: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text || '';
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    // Re-throw a more user-friendly error to be handled by the calling component
    throw new Error(`Failed to generate content. Please try again. Details: ${error instanceof Error ? error.message : String(error)}`);
  }
};