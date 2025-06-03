export interface Campaign {
  _id: string
  name: string
  description: string
  status: "active" | "inactive" | "deleted"
  leads: string[]
  accountIDs: string[]
  createdAt: string
  updatedAt: string
}

export interface CampaignFormData {
  name: string
  description: string
  status: "active" | "inactive"
  leads: string[]
  accountIDs: string[]
}
