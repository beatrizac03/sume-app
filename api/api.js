import Constants from 'expo-constants';

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: Constants.expoConfig.extra.API_URL });

export async function sendChatPrompt(history) {
  try {
    const contents = history.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: contents,
    });

    return response.text; 

  } catch (error) {
    console.error("Erro ao chamar a API Gemini:", error);
    return "Ocorreu um erro na API Gemini.";
  }
}
