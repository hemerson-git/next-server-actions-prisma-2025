"use server";

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export const sendPromptToGemini = async ({ prompt }: { prompt: string }) => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return response;
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    throw error;
  }
};
