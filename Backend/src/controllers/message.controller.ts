import { Request, Response } from "express";
import { generateMessage } from "../services/ai.service";

export const generatePersonalizedMessage = async (req: Request, res: Response): Promise<any> => {
  const { name, job_title, company, location, summary } = req.body;
  try {
    if (!name || !job_title || !company || !location || !summary) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const message = await generateMessage({ name, job_title, company, location, summary });
    res.json({ message });
  } catch (error) {
    console.error("Error generating personalized message:", error);
    res.status(500).json({ error: "Failed to generate personalized message" });
  }
};
