"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X, Plus } from "lucide-react"
import { LoadingSpinner } from "./LoadingSpinner"
import { useToast } from "../context/ToastContext"
import { campaignService } from "../services/campaignService"
import type { Campaign, CampaignFormData } from "../types/Campaign"

interface CampaignFormProps {
  campaign?: Campaign | null
  onSuccess: () => void
  onCancel: () => void
}

export const CampaignForm: React.FC<CampaignFormProps> = ({ campaign, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    description: "",
    status: "active",
    leads: [],
    accountIDs: [],
  })
  const [newLead, setNewLead] = useState("")
  const [newAccountID, setNewAccountID] = useState("")
  const [loading, setLoading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
  const { showToast } = useToast()

  useEffect(() => {
    if (campaign) {
      setFormData({
        name: campaign.name,
        description: campaign.description,
        status: campaign.status === "active" || campaign.status === "inactive" ? campaign.status : "active",
        leads: campaign.leads,
        accountIDs: campaign.accountIDs,
      })
    }
  }, [campaign])

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = "Campaign name is required"
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required"
    }

    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      showToast("Please fix the validation errors", "error")
      return
    }

    setLoading(true)

    try {
      if (campaign) {
        await campaignService.updateCampaign(campaign._id, formData)
      } else {
        await campaignService.createCampaign(formData)
      }
      onSuccess()
    } catch (err) {
      showToast("Failed to save campaign. Please try again.", "error")
      console.error("Error saving campaign:", err)
    } finally {
      setLoading(false)
    }
  }

  const addLead = () => {
    if (newLead.trim() && !formData.leads.includes(newLead.trim())) {
      // Basic URL validation
      if (!newLead.startsWith("http")) {
        showToast("Please enter a valid URL starting with http:// or https://", "error")
        return
      }

      setFormData((prev) => ({
        ...prev,
        leads: [...prev.leads, newLead.trim()],
      }))
      setNewLead("")
    }
  }

  const removeLead = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      leads: prev.leads.filter((_, i) => i !== index),
    }))
  }

  const addAccountID = () => {
    if (newAccountID.trim() && !formData.accountIDs.includes(newAccountID.trim())) {
      setFormData((prev) => ({
        ...prev,
        accountIDs: [...prev.accountIDs, newAccountID.trim()],
      }))
      setNewAccountID("")
    }
  }

  const removeAccountID = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      accountIDs: prev.accountIDs.filter((_, i) => i !== index),
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Name *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => {
              setFormData((prev) => ({ ...prev, name: e.target.value }))
              if (validationErrors.name) {
                setValidationErrors((prev) => ({ ...prev, name: "" }))
              }
            }}
            placeholder="Enter campaign name"
            className={`w-full px-3 py-2 border ${
              validationErrors.name ? "border-red-500" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
          />
          {validationErrors.name && <p className="mt-1 text-sm text-red-600">{validationErrors.name}</p>}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            id="status"
            value={formData.status}
            onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value as "active" | "inactive" }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description *
        </label>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, description: e.target.value }))
            if (validationErrors.description) {
              setValidationErrors((prev) => ({ ...prev, description: "" }))
            }
          }}
          placeholder="Describe your campaign"
          rows={3}
          className={`w-full px-3 py-2 border ${
            validationErrors.description ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
        />
        {validationErrors.description && <p className="mt-1 text-sm text-red-600">{validationErrors.description}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Leads</label>
        <div className="flex gap-2 mb-2">
          <input
            type="url"
            value={newLead}
            onChange={(e) => setNewLead(e.target.value)}
            placeholder="https://linkedin.com/in/profile-name"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addLead())}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addLead}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.leads.map((lead, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-sm"
            >
              <span className="truncate max-w-[200px]">{lead}</span>
              <button
                type="button"
                onClick={() => removeLead(index)}
                className="ml-1 hover:bg-blue-200 rounded-full p-1 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Account IDs</label>
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newAccountID}
            onChange={(e) => setNewAccountID(e.target.value)}
            placeholder="Enter account ID"
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addAccountID())}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="button"
            onClick={addAccountID}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {formData.accountIDs.map((accountID, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm"
            >
              {accountID}
              <button
                type="button"
                onClick={() => removeAccountID(index)}
                className="ml-1 hover:bg-gray-200 rounded-full p-1 transition-colors"
              >
                <X className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center gap-2 transition-colors"
        >
          {loading ? (
            <>
              <LoadingSpinner size="sm" color="text-white" />
              Saving...
            </>
          ) : campaign ? (
            "Update Campaign"
          ) : (
            "Create Campaign"
          )}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
