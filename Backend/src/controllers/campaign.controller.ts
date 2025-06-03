import { Request, Response } from "express";
import Campaign from "../models/campaign.model";

export const getAllCampaigns = async (req: Request, res: Response) => {
  const campaigns = await Campaign.find({ status: { $ne: "deleted" } });
  res.json(campaigns);
};

export const getCampaignById = async (req: Request, res: Response): Promise<any> => {
  const campaign = await Campaign.findById(req.params.id);
  if (!campaign || campaign.status === "deleted") {
    return res.status(404).json({ message: "Campaign not found" });
  }
  res.json(campaign);
};

export const createCampaign = async (req: Request, res: Response) => {
  const campaign = new Campaign(req.body);
  const saved = await campaign.save();
  res.status(201).json(saved);
};

export const updateCampaign = async (req: Request, res: Response) => {
  const updated = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

export const deleteCampaign = async (req: Request, res: Response) => {
  const deleted = await Campaign.findByIdAndUpdate(req.params.id, { status: "deleted" }, { new: true });
  res.json(deleted);
};
