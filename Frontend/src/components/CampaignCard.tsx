"use client"

import type React from "react"
import { Edit, Trash2, Users, LinkIcon } from "lucide-react"
import type { Campaign } from "../types/Campaign"

interface CampaignCardProps {
  campaign: Campaign
  onEdit: (campaign: Campaign) => void
  onDelete: (id: string) => void
  onStatusToggle: (campaign: Campaign) => void
}

export const CampaignCard: React.FC<CampaignCardProps> = ({ campaign, onEdit, onDelete, onStatusToggle }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-semibold text-gray-900">{campaign.name}</h3>
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                campaign.status === "ACTIVE" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
              }`}
            >
              {campaign.status}
            </span>
          </div>
          <p className="text-gray-600">{campaign.description}</p>
        </div>

        <div className="flex items-center gap-2 ml-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{campaign.status === "ACTIVE" ? "Active" : "Inactive"}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={campaign.status === "ACTIVE"}
                onChange={() => onStatusToggle(campaign)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <button
            onClick={() => onEdit(campaign)}
            className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>

          <button
            onClick={() => onDelete(campaign._id)}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{campaign.leads.length} leads</span>
        </div>
        <div className="flex items-center gap-2">
          <LinkIcon className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">{campaign.accountIDs.length} accounts</span>
        </div>
      </div>

      {campaign.leads.length > 0 && (
        <div>
          <h4 className="text-sm font-medium mb-2">LinkedIn Leads:</h4>
          <div className="space-y-1">
            {campaign.leads.slice(0, 3).map((lead, index) => (
              <div key={index} className="text-sm text-blue-600 hover:underline">
                <a href={lead} target="_blank" rel="noopener noreferrer">
                  {lead}
                </a>
              </div>
            ))}
            {campaign.leads.length > 3 && (
              <div className="text-sm text-gray-500">+{campaign.leads.length - 3} more leads</div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
