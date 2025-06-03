import type { Campaign, CampaignFormData } from "../types/Campaign"
import { API_END_POINT } from "@/utils/constants"
import axios from "axios"
const API_BASE_URL = API_END_POINT + "campaigns"





export const campaignService = {

  async getAllCampaigns(): Promise<Campaign[]> {
    const response = await axios.get(`${API_BASE_URL}`,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(API_BASE_URL)
    return response.data
  },

  async getCampaignById(id: string): Promise<Campaign> {
    const response = await axios.get(`${API_BASE_URL}/${id}`,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  },

  async createCampaign(campaignData: CampaignFormData): Promise<Campaign> {
    console.log(campaignData)
    const response = await axios.post(`${API_BASE_URL}`, campaignData,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(campaignData)
    console.log(response.data)
    return response.data
  },

  async updateCampaign(id: string, campaignData: Partial<CampaignFormData>): Promise<Campaign> {
    const response = await axios.put(`${API_BASE_URL}/${id}`, campaignData,{
      headers: {
        "Content-Type": "application/json",
      },
    })
    console.log(campaignData)
    console.log(response.data)
    return response.data
  },  

  async deleteCampaign(id: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${id}`,{
      headers: {
        "Content-Type": "application/json",
      },
    })
  },
}
      
   


