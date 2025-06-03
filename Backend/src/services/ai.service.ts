import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export const generateMessage = async ({ name, job_title, company, location, summary }: any) => {
  try {
    const prompt = `Write a friendly LinkedIn outreach message to ${name}, a ${job_title} at ${company} in ${location}. They're experienced in: ${summary}. Keep it under 40 words.`;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = result.response;

    return response.text().trim();
  } catch (error: any) {
    console.error("Error generating message:", error.message);
    throw error;
  }
};
