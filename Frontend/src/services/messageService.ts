import type { ProfileData, MessageResponse } from "../types/ProfileData"
import axios from "axios"
import { API_END_POINT } from "../utils/constants"
const API_BASE_URL = API_END_POINT + "personalized-message"



export const messageService = {
  async generatePersonalizedMessage(profileData: ProfileData): Promise<MessageResponse> {
    console.log(profileData)
    const response = await axios.post(`${API_BASE_URL}`,profileData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    return response.data
  },
}
