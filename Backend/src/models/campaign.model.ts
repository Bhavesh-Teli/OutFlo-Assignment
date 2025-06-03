import mongoose from "mongoose";

const CampaignSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active"
    },
    leads: [{ type: String }], // LinkedIn URLs
    accountIDs: [{ type: Number }]
  },
  { timestamps: true }
);

export default mongoose.model("Campaign", CampaignSchema);
