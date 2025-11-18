import { GoogleGenAI } from "@google/genai";

export const generateText = async (prompt: string): Promise<string> => {
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    // This error will now be caught by the component and displayed in the UI
    // instead of crashing the entire application on load.
    throw new Error("Gemini API key is not configured. Please ensure it is set up correctly.");
  }

  const ai = new GoogleGenAI({ apiKey: API_KEY });

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating text with Gemini:", error);
    // Re-throw a more user-friendly error to be handled by the calling component
    throw new Error(`Failed to generate content. Please try again. Details: ${error instanceof Error ? error.message : String(error)}`);
  }
};