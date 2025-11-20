import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini client
// The API key must be obtained exclusively from the environment variable process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const askAITutor = async (query: string, context?: string): Promise<string> => {
  try {
    const systemInstruction = `You are VulBot, an elite cybersecurity AI tutor living in a terminal. 
    Your goal is to help students understand vulnerabilities, concepts, and defense mechanisms.
    Keep your answers concise, technical but accessible, and formatted for a terminal output (plain text, no markdown bolding if possible, or minimal markdown).
    Do not give direct answers to flags or solve the challenges for them. Guide them.
    Context: The user is in a gamified platform called VulHub.`;

    const prompt = context 
      ? `Context: ${context}\n\nStudent Question: ${query}`
      : `Student Question: ${query}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        // maxOutputTokens removed to avoid issues with thinking budget as per guidelines
      }
    });

    return response.text || "Connection interrupted. No response from neural link.";
  } catch (error) {
    console.error("VulBot Error:", error);
    return "Error: Neural link unstable. Unable to reach VulBot mainframe. (Check API Key)";
  }
};