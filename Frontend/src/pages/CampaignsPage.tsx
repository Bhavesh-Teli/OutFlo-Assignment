import type React from "react"
import { useState, useEffect } from "react"
import { Plus, Target } from "lucide-react"
import { CampaignForm } from "../components/CampaignForm"
import { CampaignCard } from "../components/CampaignCard"
import { LoadingSpinner } from "../components/LoadingSpinner"
import { EmptyState } from "../components/EmptyState"
import { useToast } from "../context/ToastContext"
import { campaignService } from "@/services/campaignService"
import type { Campaign } from "../types/Campaign"

export const CampaignsPage: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)
  const { showToast } = useToast()

  useEffect(() => {
    fetchCampaigns()
  }, [])

  const fetchCampaigns = async () => {
    try {
      setLoading(true)
      const data = await campaignService.getAllCampaigns()
      setCampaigns(data)
    } catch (err) {
      showToast("Failed to fetch campaigns", "error")
      console.error("Error fetching campaigns:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this campaign?")) return

    try {
      await campaignService.deleteCampaign(id)
      showToast("Campaign deleted successfully", "success")
      await fetchCampaigns()
    } catch (err) {
      showToast("Failed to delete campaign", "error")
      console.error("Error deleting campaign:", err)
    }
  }

  const handleStatusToggle = async (campaign: Campaign) => {
    const newStatus = campaign.status === "active" ? "inactive" : "active"

    try {
      await campaignService.updateCampaign(campaign._id, { status: newStatus })
      showToast(`Campaign ${newStatus === "active" ? "activated" : "deactivated"} successfully`, "success")
      await fetchCampaigns()
    } catch (err) {
      showToast("Failed to update campaign status", "error")
      console.error("Error updating campaign status:", err)
    }
  }

  const handleFormSuccess = () => {
    setShowForm(false)
    setEditingCampaign(null)
    fetchCampaigns()
    showToast(`Campaign ${editingCampaign ? "updated" : "created"} successfully`, "success")
  }

  const handleEdit = (campaign: Campaign) => {
    setEditingCampaign(campaign)
    setShowForm(true)
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Management</h1>
          <p className="text-gray-600 mt-2">Manage your outreach campaigns</p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Campaign
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold mb-4">{editingCampaign ? "Edit Campaign" : "Create New Campaign"}</h2>
            <CampaignForm
              campaign={editingCampaign}
              onSuccess={handleFormSuccess}
              onCancel={() => {
                setShowForm(false)
                setEditingCampaign(null)
              }}
            />
          </div>
        </div>
      )}

      <div className="space-y-6">
        {campaigns.length === 0 ? (
          <EmptyState
            title="No campaigns yet"
            description="Create your first campaign to get started"
            icon={<Target className="h-12 w-12 text-blue-600 mx-auto" />}
            action={
              <button
                onClick={() => setShowForm(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium flex items-center gap-2 mx-auto transition-colors"
              >
                <Plus className="h-4 w-4" />
                Create Campaign
              </button>
            }
          />
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign._id}
              campaign={campaign}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onStatusToggle={handleStatusToggle}
            />
          ))
        )}
      </div>
    </div>
  )
}
